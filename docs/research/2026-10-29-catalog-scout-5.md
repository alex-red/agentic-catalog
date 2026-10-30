# Reference-driven UI recreation and style transfer

As of and researched: October 29, 2026 (America/Edmonton). AI curator source review; no implementation or behavioral evaluation.

## Scope and baseline

User request: find a skill/workflow for accurately recreating existing UI/UX, including a brief such as “I want the UI inspired by Cyberpunk 2077.” This contains two jobs: reproducing a particular screen, and transferring an observed design language to different content and tasks.

Baseline: [PLAN](../../PLAN.md), [contribution policy](../../CONTRIBUTING.md), [decisions](../decisions.md), [frontend options](../frontend-design-options.md), and [UX options](../ux-workflow-options.md). Existing `frontend-design` provides creative art direction; `ui-ux-pro-max` retrieves design suggestions; `interface-design` captures product tokens; `human-interface-design` covers structure and interactions. None of those descriptions supplies the complete reference acquisition, uncertainty tracking, extraction and fidelity loop sought here. The installed host `frontend-design` was read directly: it encourages creative interpretation rather than requiring reference fidelity. Installed image and browser tools can support the work but do not themselves supply this procedure. No claim is made about every host's current built-ins.

Existing decisions and unresolved queues remain in force, including the [design admission caveats](2026-10-28-design-admission.md) and [UX admission record](2026-10-29-ux-admission.md). This report neither admits nor installs entries.

## Coverage and observations

Focused live web searches sampled screenshot recreation, reference/style extraction, design-system extraction, and Cyberpunk-related skills. Results included UXKIN, Design DNA, Daymade, Pixel, clone-ui, mobile-ui-replicator, screenshot-to-design-system, image-to-code, visual-design-system-extractor, sleek-ui design-extractor, and vibe-to-ui. Directory results were discovery leads only. Five repositories were inventoried through GitHub's API; three received close source review. This is a focused sample, not an ecosystem census.

Whole-repository GitHub stars observed October 29: `zanwei/design-dna` 2,051; `daymade/claude-code-skills` 1,503; `uxkin/agent` 7; `Neilander/mobile-ui-replicator` 4; `WCF900905/screenshot-to-design-system` 6. Sources: each repository's public `https://api.github.com/repos/OWNER/REPO` endpoint. All five reported `archived: false`. These are attention signals, not usage or quality evidence. Comparable growth observations, verified skills.sh install figures, and independent outcome evidence were not collected.

Public GitHub API/raw access succeeded through the shell network permission path; the initial sandbox could not resolve hosts. The web reader could retrieve Design DNA's pinned page, but returned cache misses for two other pinned pages; their raw files were read through GitHub instead. Temporary downloads remained under `/tmp/ui-reference-scout`. No upstream installer, package script, image generator, MCP integration or implementation task was run.

## Recommend adding

These are source-reviewed proposals for later admission, not evaluated recommendations of visual accuracy.

| Priority | Candidate | Proposed mode | Concrete value |
| --- | --- | --- | --- |
| 1 for the example | [design-dna](https://github.com/zanwei/design-dna/blob/593e39bc9e3652734653bd75544a333d7d43615e/SKILL.md) | Linked, experimental | Extracts tokens, qualitative style and effects, then applies the profile to new content |
| 1 for exact screens | [ui-from-screenshot](https://github.com/uxkin/agent/blob/693e43207465c6b70d636e0531f60d12eb2ed932/.agents/skills/ui-from-screenshot/SKILL.md) | Vendored alternative, initially experimental | Small measure/build/compare workflow with existing project components and a bounded correction loop |

### Design DNA

- **Identity:** `zanwei/design-dna`, root `SKILL.md`; reviewed repository HEAD and latest entrypoint commit `593e39bc9e3652734653bd75544a333d7d43615e` (August 28, 2026). A future entry covering the whole repository must resolve the last commit affecting its chosen source path, not assume the entrypoint pin covers every packaging choice.
- **Inspection:** Fully read `SKILL.md`, `references/schema.md`, `references/generation-guide.md`, `scripts/package.json`, `scripts/color-math.mjs`, `scripts/measure-colors.mjs`, `scripts/verify.mjs`, and root `LICENSE`. Test source was downloaded but not read; localized READMEs and examples were not reviewed. Required runtime source was read, but third-party dependencies were not audited or installed.
- **Fit:** Best of the closely inspected sources for transferring a visual identity. Its three-part profile captures more than a palette, and separates observable motion from static inspection in parts of the method. It can complement `frontend-design`, with the extracted reference taking precedence over creative defaults.
- **Dependability limits:** The instruction to fill every schema field by extraction or inference can manufacture certainty about unseen states and motion. Require an external evidence/uncertainty record when trying it. Palette verification compares clustered color distances and coverage; it does not inspect spatial arrangement, typography, navigation, task completion or motion. Rearranging pixels while retaining a palette illustrates why this cannot establish UI fidelity. This is a deduction from source, not an executed test. Global color coverage can also penalize valid style transfer when content or layout changes. Cluster colors and role assignments remain approximations: the largest cluster is labelled background heuristically.
- **Control and cognitive cost:** Inspectable JSON is useful, but the broad mandatory schema adds attention cost. The skill inserts a review question after extraction. Source asset fetching must follow the user's authorized task and available asset rights. Nothing here authorizes installing dependencies or fetching assets in a consumer project.
- **Adoption/compatibility/upkeep:** Node >=18.17 and `sharp` via npm for measurement; npm writes dependency files in the installed skill's scripts directory. The generation guide defaults to single-file HTML, permits a requested framework, and contains floating `@latest` CDN examples for effects libraries. Use project dependencies and pinned versions in a trial; verify examples before relying on them. The runtime scripts read local images/files and emit JSON; `verify.mjs` invokes the adjacent measurement script using `execFileSync`. No remote instruction loader was found in the required files read.
- **License/packaging:** [MIT](https://github.com/zanwei/design-dna/blob/593e39bc9e3652734653bd75544a333d7d43615e/LICENSE). Preserve the skill, both references, scripts, package metadata and license. A bounded linked experiment avoids presenting its generated effects recipes or palette score as validated implementation guidance.
- **Next step:** Admission review followed by a small reference-transfer trial, with separate region/layout, typography, state and interaction checks. Do not claim accurate Cyberpunk reproduction from the name alone.

### UI from screenshot

- **Identity:** `uxkin/agent`, `.agents/skills/ui-from-screenshot/`; reviewed HEAD `693e43207465c6b70d636e0531f60d12eb2ed932`; last directory-changing commit `4bfc51f8bacb0b16e5d1ab6f5fb4a53115b16734` (October 12, 2026). Confirm identical directory contents at that pin during admission.
- **Inspection:** Fully read the complete `SKILL.md`, directory `LICENSE`, and root license. No required scripts or local supporting resources are referenced by the standalone route.
- **Fit:** Strongest simpler baseline for a provided screenshot: record structure, measurements, type, colors and components; reuse project primitives; render at the reference width; compare side by side or overlay; fix up to three rounds and disclose differences. Adds a concrete comparison procedure beyond `frontend-design` without a large schema.
- **Dependability/control:** Clearly states that matching cannot be claimed without rendering and comparison. Accessibility and unseen states are implementation requirements, not evidence that the source's UX was recovered. Estimated measurements and subjective stopping criteria limit accuracy. Preserving existing tokens can intentionally reduce exact fidelity; distinguish those accepted differences from defects.
- **Adoption/compatibility/upkeep:** Compact and stack-neutral, low setup burden, no account required for the core path. Optional UXKIN MCP search requires separate connection/account/plan; the skill explicitly forbids autonomous setup. It contains service promotion and library-size claims that were not independently checked. Optional tools were not connected or audited.
- **License/packaging:** [Directory MIT license](https://github.com/uxkin/agent/blob/693e43207465c6b70d636e0531f60d12eb2ed932/.agents/skills/ui-from-screenshot/LICENSE); preserve the two-file directory with license renamed only as required by catalog packaging. Never edit the vendored skill text. The optional service remains optional.
- **Next step:** Review for experimental admission as the exact-screen alternative, then try one representative screen at matched viewport dimensions. No observed improvement is claimed.

## Review next

**An adapted reference-to-interface workflow** is the strongest longer-term fit for title-only requests. This is a proposed composition, not an upstream skill found and tested:

1. Resolve what reference surface the user means: in-game menus, HUD, website, promotional graphics, or another source. A franchise name alone is insufficient evidence for exact values.
2. Gather a small coherent set of actual screens; record source, resolution and product/version when known. Obtain video or inspect interactions for behavioral claims. Keep screen families separate until shared rules are demonstrated.
3. Extract a reference dossier: palette by semantic role, type characteristics, hierarchy, spacing/density, panel geometry, icon treatment, imagery, component states and observed motion. Mark each value measured, estimated, inferred or unknown, with its source.
4. Map those rules onto the target product's real tasks and platform. Distinguish visual motifs being transferred from interaction patterns being preserved or deliberately changed. Do not infer an entire UX from screenshots.
5. Implement a representative screen and its key states. Render at fixed reference dimensions for recreation; use a component/style comparison for transfer to different content. Correct layout and typography before decorative effects.
6. Compare region by region, check keyboard/focus, responsive layouts and reduced motion, and record remaining differences. For motion, compare observable sequences rather than static images. Use palette metrics only as one limited diagnostic.

For “inspired by Cyberpunk 2077,” the workflow should first establish the intended reference family, then derive its rules from actual material. No specific Cyberpunk palette, typography or interaction behavior was verified in this scouting pass. A useful trigger would cover recreating a reference interface and transferring a named work's observed design language; it should remain distinct from generic “make a beautiful UI” requests.

**Further research leads:** [Pixel](https://github.com/simota/agent-skills/tree/main/pixel) for property-level verification, [visual-design-system-extractor](https://github.com/srinitude/skills) for evidence-grounded extraction, and [clone-ui](https://github.com/santowilem/skills/tree/main/skills/clone-ui) for richer URL/DOM inputs. Entrypoint leads were found but dependencies, full pins and licenses were not inspected; none is cleared for addition here.

## Watch / hold / skip

- **[Daymade ui-designer](https://github.com/daymade/claude-code-skills/blob/9b4bf0cebeefcaff6a23041b1194255d5faaf5c3/ui-designer/SKILL.md): hold as an install recommendation.** Reviewed HEAD `9b4bf0cebeefcaff6a23041b1194255d5faaf5c3`, latest directory commit `878f947e9301c92e74000e2afc5aabba6ca152b9` (September 6). Fully read entrypoint, all three `assets/*.md` templates and root MIT license. Useful extraction-to-brief shape, but its final template imposes minimalism, whitespace, gradients, React/Tailwind/Lucide and multiple variants. Those can override the reference. Setup examples use Create React App and an unversioned Tailwind init sequence; no compatibility check was performed. A template requests private reasoning disclosure; do not follow that request. It lacks a required rendered reference-comparison loop. Would reconsider with a newer revision addressing these issues; not a better choice than the two above for this task.
- **[mobile-ui-replicator](https://github.com/Neilander/mobile-ui-replicator/blob/b6ad621eb0f2b47a0cfd6f611c8dc2b580b43d20/SKILL.md): hold.** Entrypoint read at HEAD `b6ad621eb0f2b47a0cfd6f611c8dc2b580b43d20`; required prompts/scripts were downloaded but not audited, and the example HTML was not read. No license file was found in the recursive tree. Mandatory Gemini-key setup and a painted-asset/phone-frame workflow are a poor default for general UI fidelity. Its separation of layout and style is useful as a research lead, not permission to copy or run it.
- **[screenshot-to-design-system](https://github.com/WCF900905/screenshot-to-design-system/blob/030e3007a82991113a04b9e0454824b4ad2ef9c7/SKILL.md): skip for this request.** Entrypoint read at HEAD `030e3007a82991113a04b9e0454824b4ad2ef9c7`; explicitly excludes full-page layout, backgrounds and icons. Supporting resources and scripts were downloaded but not fully reviewed. Could fit a future component-library extraction survey; it cannot cover this job alone.

## Revisit existing entries

No repins or replacements proposed. Keep `frontend-design` for implementation and original direction, `human-interface-design` for task/state/platform decisions, and `webapp-testing` for functional verification. Their roles are complementary; loading every design entry would add conflicting policies and overhead. A source-fidelity workflow should state when its reference rules supersede a creative skill's aesthetic preferences.

## Changes since baseline and top priorities

The newly identified gap is explicit reference fidelity and style transfer; existing frontend and UX admissions remain existing coverage. Prior holds are retained in the linked baseline reports. No ratings, evidence levels, catalog pins, manifests or generated files were changed.

1. **For the user's example:** trial Design DNA with an evidence/uncertainty record and visual/interaction checks beyond its palette verifier.
2. **For an exact screenshot:** trial UI from screenshot as the low-cost baseline before choosing a larger pipeline.
3. **For catalog development:** consider the adapted workflow above if a trial shows the title-to-reference and uncertainty gaps cause failures. Add only after a concrete admission review; start at `reviewed`.

Human review should choose the desired reference family and acceptable differences. Source inspection alone does not establish which skill produces the most faithful result.
