export interface SemanticDocument {
  id: string;
  text: string;
  hosts?: readonly string[];
}

export type SemanticRequest =
  | { kind: "load"; documents: SemanticDocument[] }
  | { kind: "search"; sequence: number; query: string; hosts: string[] };

export type SemanticResponse =
  | { kind: "download"; percent: number }
  | { kind: "index"; completed: number; total: number }
  | { kind: "ready" }
  | { kind: "results"; sequence: number; ids: string[] }
  | { kind: "error" };
