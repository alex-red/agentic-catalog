# Sources and review criteria

## Discovery sources

These are seed sources, not a permanent ranking or an exhaustive allowlist. Verify current locations, displayed metric definitions, and source access on every run. Prefer connected read-only tools when sufficient, otherwise browse public upstream pages or APIs. If a source is unavailable, report the gap and use independent sources; never substitute remembered counts.

| Lane | Starting points | What to extract |
| --- | --- | --- |
| Established popularity | [skills.sh all-time](https://www.skills.sh/); GitHub repository/topic search for agent skills, agent rules, and coding-agent guidance | Exact artifact links; displayed installs and stars with observation dates and metric scope |
| Recent momentum | [skills.sh trending](https://www.skills.sh/trending), [hot](https://www.skills.sh/hot); upstream releases and commits | Displayed time window, recent changes, and new projects; do not infer velocity from a single cumulative count |
| Rules and scoped instructions | [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules), [awesome-copilot](https://github.com/github/awesome-copilot), [Liran Tal's agent-rules](https://github.com/lirantal/agent-rules) | Named rule files, scope/globs, language or framework versions, portability, and provenance |
| Curated discovery | [VoltAgent's awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills), upstream cross-links, relevant community discussions | Leads to original authors; directory inclusion and discussion are not proof of quality or adoption |
| Specialist maintainers | [Trail of Bits](https://github.com/trailofbits/skills), [Sentry](https://github.com/getsentry/skills), [Cloudflare](https://github.com/cloudflare/skills), [Supabase](https://github.com/supabase/agent-skills), [HashiCorp](https://github.com/hashicorp/agent-skills) | Focused expertise and concrete catalog gaps, even with modest popularity |
| Focused authors and platform teams | [Matt Pocock](https://github.com/mattpocock/skills), [Anthropic](https://github.com/anthropics/skills), [Vercel](https://github.com/vercel-labs/agent-skills), relevant framework maintainers | Individual artifacts, supporting resources, published evaluations, and overlap with host-provided guidance |

Expand with queries for the run's year/date, underrepresented jobs, alternate host formats, and recently published skills or rules. Check the existing catalog before spending review time on a seed source. For adoption claims, seek primary installation metrics, actual repositories using the artifact, or published usage records; distinguish independent adoption from forks, copies, and author promotion.

[skills.sh's FAQ](https://www.skills.sh/docs/faq) describes its ranking as aggregated CLI installation telemetry. Verify that definition when using it. Keep all-time and trending counts separate, preserve rounded display values as rounded, and do not treat bundled installs as unique users. Search snippets can identify leads, but use the primary page for shortlisted claims. Label cached observations and unavailable figures explicitly.

## Source inspection and admission path

Before recommending an addition, answer these questions with source links and an explicit inspection scope:

- **Job and quality:** What concrete task or failure does this improve? Are instructions actionable and current? Check consequential technical examples against authoritative documentation; if uncertain, make verification a named blocker rather than silently accepting the example.
- **Overlap:** Which existing entry IDs, host tools, skills, commands, or ordinary model behavior cover the same job? What incremental value justifies another entry? Would this replace something or serve a clearly labelled alternative?
- **Closure and effects:** Which references, scripts, sibling skills, repository-root resources, tools, packages, services, hooks, telemetry, or writes are required? Separate optional integrations from required ones. Read required content, including scripts, before claiming full source review. Downloaded or enumerated files are not automatically inspected files.
- **Provenance and licensing:** Resolve a full commit and exact path; check actual applicable license and notice files, including file-specific terms and copied ancestry. A README badge or repository license label is insufficient. Missing or restrictive licenses may require a linked entry; they do not authorize copying or adaptation.
- **Maintenance:** Look at changes relevant to the artifact, version assumptions, issue/release evidence, archival status, and dependency drift. A repository's recent unrelated commit does not demonstrate maintenance of the skill.
- **Instruction loading:** Reject unpinned remote instruction loading under catalog policy. Distinguish it from ordinary lookups of current product documentation. State any host coupling or broad trigger that could make the artifact a poor fit.
- **Evidence:** Attribute author benchmarks, inspect their scope where possible, and distinguish them from independent results. Popularity, source review, schema checks, and a curator recommendation never establish behavioral evaluation.

An immutable link such as `https://github.com/OWNER/REPO/blob/FULL_COMMIT/path/SKILL.md` identifies the reviewed artifact. Record repository HEAD separately if useful. At admission, catalog pins use the last commit touching `source.path`; do not blindly promote a discovery HEAD into entry metadata.

Prefer vendoring only complete, unmodified, permissively licensed content that can be packaged inside its entry directory. Consider linked entries for restrictive licenses, large bundles, or host-specific workflows when usable installation requirements can be described. An adapted proposal needs cited inspiration and an independent implementation consistent with source rights. This report proposes a path; it does not perform admission.

## Report format

Use these sections in each dated report. Write actual findings, not empty scaffolding. The top-level recommendation table provides a quick review list; candidate records supply the evidence without an unreadably wide table.

1. **Scope and baseline:** As-of date, research date/timezone, requested focus, baseline report links, relevant decisions, and current catalog gaps. Say whether this is live research or a historical reconstruction.
2. **Coverage and observations:** Sources and queries, pages/result ranges sampled, popularity observations with units/windows and checked dates, unavailable sources, and limits. Do not describe a sampled survey as exhaustive or universally representative.
3. **Recommend adding:** Rank, candidate link, concrete gap, reason to prefer it, and proposed admission mode (`vendored`, `linked`, or `adapted`). Include only candidates that cleared source inspection.
4. **Review next:** Promising candidates with their decisive unanswered question and the exact next inspection needed.
5. **Watch / hold / skip:** Disposition, reason, prior decision link if any, and what new evidence would justify reopening it. Distinguish an emerging project from an excluded one.
6. **Revisit existing entries:** Entry ID, upstream change or replacement, overlap or maintenance issue, and recommended follow-up. Upstream movement alone is a review signal, not a reason to repin.
7. **Changes since baseline:** New discoveries, admitted items removed from the candidate pool, resolved blockers with evidence, carried holds, and recommendation changes. Link outstanding prior queues not repeated here.
8. **Top priorities:** Up to five ranked actions, distinguishing addition recommendations from further research. Explain the choice over close alternatives and identify what still needs human review.

For each shortlisted candidate, provide a compact record with these fields (combine fields where clearer):

| Field | Required content |
| --- | --- |
| Identity | Owner/repository, exact artifact path and type, immutable link, full reviewed commit; aliases or fork ancestry when relevant |
| Signals | Adoption/popularity observations, units and time windows, checked dates, source links; unknowns explicitly marked |
| Inspection | Files read, resources/scripts followed, uninspected scope, technical claims checked, and sources supporting findings |
| Fit | Concrete user job, catalog gap, existing entry IDs and host overlap, qualitative usefulness/quality/portability/novelty |
| Admission path | Proposed source kind, applicable license/notice links, required packaging and dependencies, optional integrations and effects |
| Decision | Disposition, reason, prior status/decision link, changed evidence if reopening, and exact next step or blocker |

Broad discoveries that do not make the shortlist can use a brief linked disposition rather than a complete candidate record. Preserve existing reports as historical observations; later corrections and changed decisions belong in the new report.
