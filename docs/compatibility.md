# Compatibility

Status: **not tested in agent hosts**. Local schema and bundle tests do not establish host discovery, activation, or effectiveness.

Codex and Claude Code are the first targets. Record exact host and model versions, OS, surface, and source revision for every observation. Test cases should run in disposable projects with the same installed content.

| Host | Clean project | Existing instructions | Nested working directory | Git worktree |
| --- | --- | --- | --- | --- |
| Codex | Not run | Not run | Not run | Not run |
| Claude Code | Not run | Not run | Not run | Not run |

For each cell, check instruction loading, skill discovery, explicit invocation, a representative implicit trigger, and availability of bundled references. Link an evidence record before replacing “Not run” with a result.

Codex documents project skills in `.agents/skills/` and layered `AGENTS.md` discovery. [Skills](https://learn.chatgpt.com/docs/build-skills), [project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

Claude Code documents project skills in `.claude/skills/`. Its direct `AGENTS.md` behavior varies with version and existing instruction files; test the `@AGENTS.md` import path as well. [Skills](https://code.claude.com/docs/en/skills), [project instructions](https://code.claude.com/docs/en/memory)

Cloud, remote, Windows, and other agents remain outside the tested scope. Supporting filenames alone is insufficient for a compatibility claim.
