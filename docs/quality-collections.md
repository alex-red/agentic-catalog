# Frontend quality and focused security review

These small collections group existing catalog entries for two distinct jobs. They complement [project initialization](project-initialization.md); they do not introduce another development framework or run as automatic orchestrators. Selecting catalog content does not install it in a consumer project or authorize additional services, external writes or hooks.

## Frontend quality

The [frontend-quality collection](../collections/frontend-quality.yaml) contains four entries:

| Entry | Job | Use and prerequisites |
| --- | --- | --- |
| [react-best-practices](../entries/skills/react-best-practices/entry.yaml) | React and Next.js performance guidance | Read applicable rules rather than importing every recommendation. For other frameworks, select matching guidance instead. This linked entry has its own upstream installation requirements. |
| [webapp-testing](../entries/skills/webapp-testing/entry.yaml) | Observe and verify browser behavior | Use native browser tools if they cover the task. The scriptable option needs Python Playwright; its server helper starts processes, so existing project authorization still applies. |
| [ux-critique](../entries/skills/ux-critique/entry.yaml) | Review interfaces and flows against evidence | Install the complete skill, repository-root knowledge base and all required license notices described in its metadata. A copy of SKILL.md alone is incomplete. Expert critique is not a study of real users. |
| [verification-before-completion](../entries/skills/verification-before-completion/SKILL.md) | Check the final result before claiming success | Run relevant checks against the final changes and state what was actually verified. |

Start with the requested screen, flow and acceptance criteria. Apply relevant performance guidance during implementation, observe the rendered behavior at the sizes and states that matter, critique concrete findings, then fix and verify the result. Skip procedures that do not affect the task; do not add a second frontend-design skill if the host already supplies one.

For visual direction and focused design engineering, select from the separate [frontend design options](frontend-design-options.md). They are alternatives with explicit experimental and dependency limits; the collection does not install or activate them together.

For UX critique, begin with the documented Standard review in chat. The entry discloses local citation-count recording and its disable switch. Figma writes require a separately authorized connection; experimental Apply Mode and the incomplete HTML output are not implied by this collection. Prefer the documented serial option when additional workers are not wanted.

Example after selecting the appropriate entries:

```text
Review this React flow using the frontend-quality collection. Ground findings
in the actual interface and code, test the important states and viewport sizes,
and distinguish observed behavior from inference. Fix the agreed issues within
scope, then verify the final result and report any remaining limitations.
```

## Focused security review

The [security-review collection](../collections/security-review.yaml) groups three conditional methods:

| Entry | Use when | Boundary |
| --- | --- | --- |
| [security-threat-model](../entries/skills/security-threat-model/entry.yaml) | A threat model or abuse-path analysis is explicitly requested | Map trust boundaries, assets, attacker capabilities and mitigations; do not automatically run a whole-system analysis for each diff. |
| [secret-serialization](../entries/skills/secret-serialization/entry.yaml) | Credential-bearing objects may reach serializers, logs or response helpers | Trace the holder and sink together. This is a narrow leak mechanism, not a general secret scanner. |
| [variant-analysis](../entries/skills/variant-analysis/entry.yaml) | A known defect has a root cause worth searching for elsewhere | Start with the seed instance and expand carefully. It does not discover the first vulnerability. |

Choose the method whose prerequisites are present. A confirmed finding from one review may become the seed for variant analysis, but running every method is not required. Keep speculative risks separate from demonstrated paths and report relevant exclusions. Implementation fixes and external testing still follow the user's scope and project authorization.

Variant analysis is linked under CC-BY-SA-4.0; retain its complete resources, attribution and share-alike terms as described in the entry. The upstream parallel workflow requires plugin packaging and is distinct from the core method; CodeQL and Semgrep are optional. Selecting this collection does not install those tools or activate a plugin, scanner or hook.

Example for a known defect:

```text
Using the security-review collection's variant-analysis method, investigate
whether this confirmed bug occurs elsewhere. First identify its root cause
and exact seed match, then broaden the search incrementally. Report evidence
for each credible variant and state what was outside the investigation.
```

The [source review](research/2026-10-28-catalog-scout-4.md) explains why these entries were grouped and which popular libraries remain under review. The collections preserve existing ratings and evidence levels; source inspection and structural checks do not establish improved outcomes or comprehensive security coverage.
