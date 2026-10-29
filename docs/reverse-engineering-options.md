# Reverse-engineering options

Six explicitly selected linked experiments share the exact `reverse_engineering` tag. Each starts at evidence level `reviewed`; the ratings are curator judgments. The [research](research/2026-10-29-reverse-engineering-research.md) and [admission record](research/2026-10-29-reverse-engineering-admission.md) retain source inspection limits and known defects.

| Entry | Type | Choose for | Required setup and limits |
| --- | --- | --- | --- |
| [Reverse engineering (Encid)](../entries/skills/reverse-engineering/entry.yaml) | Skill | Broad shell-first artifact triage and platform routing | Complete skill resources; external tools by task. Helpers remain partly unaudited; Apache-labelled license text is noncanonical. |
| [ReVa](../entries/mcps/reva/entry.yaml) | MCP | Ghidra navigation, cross-references and analysis database refinement | Matching Ghidra extension and JDK; local MCP endpoint or headless CLI. Some skill examples overstate algorithm identification. |
| [Official IDA MCP](../entries/mcps/ida-mcp/entry.yaml) | MCP | IDA-based analysis with vendor-maintained access | IDA 9.4+, idalib, Python 3.11+ and suitable entitlement. Python execution can mutate databases. Host plugin hooks are a separate choice. |
| [REA](../entries/mcps/reverse-engineer-anything/entry.yaml) | MCP | Investigation across native, managed and packaged application artifacts | Compatible Node/npm and selected providers. Large runtime/resource review remains incomplete; source and published package capabilities can differ. |
| [Cerberus RE](../entries/mcps/cerberus-re/entry.yaml) | MCP | Apple metadata and Ghidra/LLDB/Frida evidence correlation | Python workbench, matching Ghidra/JDK and conditional runtime tools. Mission companion remains optional. |
| [Cynthion investigation](../entries/skills/cynthion-reverse-engineer/entry.yaml) | Skill | USB protocol experiments from contrasting captures | Complete sibling decoder; hardware for live capture. Replay/emulation is conditional, and generated scaffolds do not prove protocol equivalence. |

Use the smallest useful combination. Encid supplies a method and routing; a database bridge supplies access; a workbench adds its own runtime and evidence conventions. Ordinary source-repository onboarding remains the job of `repo-research`. These alternatives are not an install-all collection.

Follow a question through artifact identification, relevant code/data, an explicit hypothesis, a discriminating check, and evidence-linked conclusions. Preserve uncertainty when inferring structures, algorithms, message fields and runtime behavior. Decompiler readability is not an independent correctness check. The research includes a proposed portable workflow; this admission does not create that additional entry.

Copying a skill does not connect an MCP server or install its engines. Review complete resource chains, retain licenses and preserve existing destinations. Integration setup stays within the user's selected scope; do not enable marketplace bundles, host hooks, remote exposure, runtime probes or hardware replay merely because upstream documentation mentions them.

The requested tag is searchable through existing catalog tag/search facilities. It is not a new entry type or a separate browser category. No changes to the existing Game design category are needed.
