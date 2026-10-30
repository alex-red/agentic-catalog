# Frontend design options

The catalog offers eight design sources as twelve separately selectable entries. Choose by task and existing project conventions. These are alternatives and focused companions, not an install-all collection. All start at evidence level `reviewed`; eleven are experimental because their source caveats, operational dependencies or unmeasured outcomes deserve an explicit trial.

## Choose the job

| Entry | Select for | Main qualification |
| --- | --- | --- |
| [frontend-design](../entries/skills/frontend-design/entry.yaml) | A compact baseline for new visual direction | Check whether the host already supplies it; installed versions differ |
| [impeccable](../entries/skills/impeccable/entry.yaml) | Scoped refinement, polish, critique or variants | Experimental native-engine workflow; full commands need additional setup |
| [emil-design-eng](../entries/skills/emil-design-eng/entry.yaml) | Product interaction details and motion decisions | Experimental craft policy; verify version-sensitive performance claims |
| [remove-animations](../entries/skills/remove-animations/entry.yaml) | Reducing motion while checking dependency hazards | Experimental frequency/keyboard policies; preserve documented exceptions |
| [design-taste-frontend](../entries/skills/design-taste-frontend/entry.yaml) | Strict art direction and browser gates | Experimental house style, with marketing motion quotas and separate app mode |
| [ui-ux-pro-max](../entries/skills/ui-ux-pro-max/entry.yaml) | Searching palettes, product patterns, fonts and stack guidance | Experimental retrieval library; check relevance before applying or persisting results |
| [interface-design](../entries/skills/interface-design/entry.yaml) | Dashboards, tokens and persistent product design decisions | Experimental; known target-size and native-control wording errors |
| [better-typography](../entries/skills/better-typography/entry.yaml) | Font loading, text rendering, wrapping and type-scale review | Experimental; copy the complete reference subtree |
| [interface-review](../entries/skills/interface-review/entry.yaml) | Introduced and regressed interface problems in a diff | Experimental eight-skill review bundle; render coverage is explicit |
| [baseline-ui](../entries/skills/baseline-ui/entry.yaml) | An explicit React/Tailwind house policy | Experimental, stack-specific and restrictive |
| [fixing-accessibility](../entries/skills/fixing-accessibility/entry.yaml) | A compact HTML accessibility pass | Experimental; composite widgets need appropriate arrow-key/Tab behavior |
| [fixing-motion-performance](../entries/skills/fixing-motion-performance/entry.yaml) | Janky animation and rendering-cost review | Experimental; preserve layout semantics and confirm with profiling |

Project components, accepted tokens, real user tasks and supported input methods remain authoritative. Native controls and common patterns may be exactly right for the product. A new design policy should not replace them merely to make the output look different.

For an independently written cross-platform method, choose [human-interface-design](../entries/skills/human-interface-design/SKILL.md). Its Apple-inspired principles guide task structure, state, recovery, hierarchy and platform adaptation while retaining the product's visual identity. It is a separate adapted entry with local references, rather than another linked source in the table above; see [the research](research/2026-10-29-apple-inspired-interface-skill.md).

For our standalone approach, choose the adapted experimental [reference-to-interface workflow](../entries/workflows/reference-to-interface/WORKFLOW.md). It covers exact screen recreation, reference-inspired style transfer and observed interaction recreation, using only the stages needed. It gathers actual references for title-only requests, tracks measurements separately from estimates and inferences, maps visual rules to the target's tasks, and checks corresponding rendered regions and interactions. Its [author assessment](reviews/2026-10-29-reference-to-interface.md) is source-based, not a measured accuracy claim. The workflow is complete inside its directory and requires no other design entry or integration.

For reference-driven style transfer, choose [design-dna](../entries/skills/design-dna/entry.yaml), a separate linked experimental option. It extracts tokens, qualitative character and effects from actual screenshots or URLs, then applies the profile to new content. It is the selected fit for requests such as “inspired by Cyberpunk 2077,” once the intended reference family is established. A title alone supplies no measured values. Record estimates and unknowns, and compare rendered regions, typography, states and interactions separately from its palette score. See the [assessment](reviews/2026-10-29-design-dna.md).

## Complete, bounded installation

These entries are linked, not vendored. Their `entry.yaml` files give the exact upstream repository, artifact path, full commit, license and installation boundaries. Fetch that revision rather than a moving branch or an unversioned installer. Preserve existing skills and local changes. Catalog admission does not install any of them in this checkout or a consumer project.

For ordinary skill copies, preserve the complete subtree under `.claude/skills/<name>` or `.agents/skills/<name>`, retaining references, scripts, assets and agent metadata. Keep the applicable license beside it. Anthropic carries its own Apache-2.0 `LICENSE.txt`; other entries retain the upstream root license. Impeccable also needs `NOTICE.md`. Runtime and media licenses are separate: a code license does not grant rights to every font, icon, photograph or generated reference asset.

### Impeccable

Start with the pinned manual skill copy and a scoped refinement task. This path intentionally omits design hooks and named subagents. It does not provide the complete new-work, critique or live-variant setup. Select and review those dependencies separately before using commands that require them; do not pretend an incomplete workflow was run successfully.

The launcher may download a versioned native engine into its cache. Remote roll requests are part of some design workflows, and source defaults enable roll/choice telemetry. `IMPECCABLE_NO_TELEMETRY=1` opts out of telemetry, but does not make roll operations offline. The entire engine and live mutation path have not been audited. An engine/manual-context fallback and successful detector scan do not establish equivalent workflow coverage or improved visual quality.

The linked entry preserves upstream command behavior rather than silently simplifying it. A request to add a catalog entry authorizes none of its runtime setup, hook activation, external calls or additional workers in a consumer project.

### UI/UX Pro Max

Copy the complete pinned `.claude/skills/ui-ux-pro-max` subtree, including `data`, `scripts` and `references`, into the selected host's skill directory. Use the absolute installed `scripts/search.py` path when running searches. The source prompt's `CLAUDE_PLUGIN_ROOT` expression assumes Claude plugin packaging; manually installed skills and Codex should resolve the installed path directly. This command-path adapter leaves upstream files unchanged.

Searches require Python 3. Keep dataset provenance and font/icon license metadata. Treat relevance ranks and confidence fields as recommendations to inspect. The default upstream CLI generator also installs unrelated sibling design skills and removes some legacy paths; the bounded manual route avoids those additional changes. No installer was executed during admission.

### Interface review

The complete bundle has eight sibling skill directories at the entry's same source pin:

- `interface-review`
- `better-interface`
- `better-accessibility`
- `better-layout`
- `better-writing`
- `better-typography`
- `better-colors`
- `better-ui`

Keep each directory's references and agent metadata. Put each directly under the host's `skills` root, not inside `interface-review`. Retain the MIT license with each copied skill. If `better-typography` is already installed, reconcile its version and local changes rather than creating a second copy. Selection of this entry is selection of this disclosed review bundle; no other repository skills or plugin configuration are implied.

The upstream change-review entrypoint is user-invoked. It delegates reporting and domain rules to siblings and must disclose unreviewed domains. Its rendered verification is opt-in; source findings alone cannot establish interaction or visual behavior. Review requests remain read-only unless implementation is requested too.

### Taste and focused prompts

Taste's source folder is `taste-skill`, but its frontmatter name is `design-taste-frontend`; use the latter as the installed directory name. Keep its complete library, scripts, references and assets. Full inspection needs Node 22+ and Chrome-family browser tooling. It writes `.taste-skill` artifacts and may retrieve media whose license and credits need separate checks. Passing its style gates demonstrates compliance with those gates.

Emil's core and the Ibelick prompts can be selected individually. Referrals to another animation skill do not install that sibling. The typography entry includes its six local reference files; cross-domain skills remain optional unless selecting the full interface-review bundle.

### Design DNA

Use the pinned manual copy in its entry metadata, preserving `SKILL.md`, both references, the complete scripts subtree and MIT license. Measurement requires Node >=18.17 and sharp; copying the skill does not install those dependencies. Resolve scripts from the installed skill directory. Dependency setup writes into that directory and remains a separate consumer action.

Preserve project conventions and use pinned project dependencies instead of the generation guide's floating CDN examples. Keep measured, estimated, inferred and unknown properties in an accompanying record: the upstream's required schema completion is not evidence that every field was observed. Palette PASS checks color distance and coverage only; it does not validate layout, typography, motion or usability. This entry complements implementation and UX guidance without installing them, fetching assets or activating workflows implicitly.

## Conflicts and verification

Taste's marketing policy requires motion across the page. Baseline UI forbids new motion unless requested, and Emil's policies remove it from frequent interactions. Baseline UI forbids custom easing and tracking while other sources prescribe them. Those choices need one governing project policy, not simultaneous mandatory instructions.

Known source statements remain caveats rather than catalog rules: WCAG target size depends on criterion, level and exceptions; native controls can have styling options; composite widgets commonly use one Tab stop with arrow navigation; opacity, transforms and layout changes are not interchangeable; acceleration depends on API, version and browser.

Use [frontend-quality](quality-collections.md#frontend-quality) for complementary performance, evidence-grounded critique and verification methods. Observe the final rendered path, keyboard/focus behavior, small-screen and zoom layouts, loading/error states and reduced motion. Source review, schema validation and a style scan do not certify accessibility or prove better design outcomes.

The [research comparison](research/2026-10-28-catalog-scout-9.md) records the ranking and unresolved questions. The [admission record](research/2026-10-28-design-admission.md) explains why these options were admitted with limitations after the user selected all eight ranked sources.
