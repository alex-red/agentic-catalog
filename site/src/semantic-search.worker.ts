import type { SemanticDocument, SemanticRequest, SemanticResponse } from "./semantic-search";

const RUNTIME_URL = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js";
const MODEL = "mixedbread-ai/mxbai-embed-xsmall-v1";
const REVISION = "7678b021fbdd4ae21327ed2854833fa56ffaf30f";
const DIMENSIONS = 384;
const BATCH_SIZE = 8;
const INDEX_CACHE = "agentic-catalog-semantic-index-v1";

type Extractor = (texts: string[]) => Promise<{ data: Float32Array }>;
let extract: Extractor;
let documents: SemanticDocument[];
let vectors: Float32Array<ArrayBuffer>;
let pending: Extract<SemanticRequest, { kind: "search" }> | undefined;
let searching = false;

function send(message: SemanticResponse) {
  self.postMessage(message);
}

function fail(error: unknown) {
  console.error("Semantic search failed", error);
  send({ kind: "error" });
}

async function load(input: SemanticDocument[]) {
  documents = input;
  const { env, pipeline } = await import(/* @vite-ignore */ RUNTIME_URL);
  env.remoteHost = "https://huggingface.co/";
  // The runtime's file enumeration also uses the template, including when it omits revision.
  env.remotePathTemplate = `{model}/resolve/${REVISION}/`;
  env.allowLocalModels = false;
  env.cacheKey = "agentic-catalog-semantic-model";
  env.useWasmCache = true;
  env.backends.onnx.wasm.numThreads = 1;
  const embed = await pipeline("feature-extraction", MODEL, {
    revision: REVISION,
    device: "wasm",
    dtype: "q8",
    progress_callback(event: { status: string; file?: string; progress?: number }) {
      if (event.status === "progress" && event.file?.endsWith(".onnx") && event.progress !== undefined) {
        send({ kind: "download", percent: Math.floor(event.progress) });
      }
    },
  });
  extract = (texts) => embed(texts, { pooling: "mean", normalize: true });

  // Keep one cached index per origin and replace it when the public catalog changes.
  const key = new URL("/semantic-index", self.location.origin).href;
  const signature = new TextEncoder().encode(JSON.stringify([MODEL, REVISION, documents]));
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", signature))
    .reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
  const cache = typeof caches === "undefined" ? undefined : await caches.open(INDEX_CACHE).catch(() => undefined);
  const cached = await cache?.match(key).catch(() => undefined);
  const bytes = cached?.headers.get("X-Catalog-Index") === hash
    ? await cached.arrayBuffer().catch(() => undefined)
    : undefined;
  if (bytes?.byteLength === documents.length * DIMENSIONS * Float32Array.BYTES_PER_ELEMENT) {
    vectors = new Float32Array(bytes);
  } else {
    vectors = new Float32Array(documents.length * DIMENSIONS);
    send({ kind: "index", completed: 0, total: documents.length });
    for (let start = 0; start < documents.length; start += BATCH_SIZE) {
      const batch = documents.slice(start, start + BATCH_SIZE);
      const { data } = await extract(batch.map((document) => document.text));
      vectors.set(data, start * DIMENSIONS);
      send({ kind: "index", completed: start + batch.length, total: documents.length });
    }
    await cache?.put(key, new Response(vectors, { headers: { "X-Catalog-Index": hash } })).catch(() => {});
  }
  send({ kind: "ready" });
}

async function search() {
  if (searching) return;
  searching = true;
  while (pending) {
    const { sequence, query, hosts } = pending;
    pending = undefined;
    const { data } = await extract([query]);
    const matches = documents.flatMap((document, index) => {
      if (hosts.length && document.hosts && !document.hosts.includes("any") &&
          !hosts.some((host) => document.hosts?.includes(host))) return [];
      let score = 0;
      for (let i = 0; i < DIMENSIONS; i++) score += data[i] * vectors[index * DIMENSIONS + i];
      return score >= 0.4 ? [{ id: document.id, score }] : [];
    });
    matches.sort((a, b) => b.score - a.score);
    send({ kind: "results", sequence, ids: matches.slice(0, 8).map(({ id }) => id) });
  }
  searching = false;
}

self.addEventListener("message", (event: MessageEvent<SemanticRequest>) => {
  const request = event.data;
  if (request.kind === "load") void load(request.documents).catch(fail);
  else {
    pending = request;
    void search().catch(fail);
  }
});
