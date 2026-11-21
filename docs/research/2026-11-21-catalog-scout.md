# Art-direction skills for Creating Novel Designs

Live research on November 21, 2026, America/Edmonton. The task was to improve the existing [Creating Novel Designs skill](../../entries/skills/novel-design/SKILL.md) with transferable ideas. Compared against the [frontend design survey](2026-10-28-catalog-scout-9.md), the [reference-driven UI survey](2026-10-29-catalog-scout-5.md), and the [initial author assessment](../reviews/2026-11-21-novel-design.md). Those surveys retain their original recommendations and holds.

## Coverage

Sampled public GitHub and web results for agent skills on visual originality, concept-first UI, creative direction, and brand design. Used the maintainers' skill files or command guides for selected ideas. The links identify the reviewed paths on public branches or sites. Immutable revisions and complete package contents were outside this review. No adoption ranking was made. No upstream code, install steps, or tools were run.

## Selected for distillation

| Source inspected | What it adds | Scope of the adaptation |
| --- | --- | --- |
| [Zach Stevens's Creative Direction](https://github.com/zstvns/design-skills/blob/main/skills/creative-direction/SKILL.md) and [repository MIT license](https://github.com/zstvns/design-skills/blob/main/LICENSE) | Abstract a useful feature from a reference, express the product's own work through it, and judge the direction on an applied surface. | Borrow one communication principle when a literal treatment stalls. Check the applied concept on a demanding surface or state. The upstream workflow expects brand strategy, companion skills, mockup kits, and persistent records. |
| [SpellbourneDZ's UI Art Direction](https://github.com/SpellbourneDZ/ui-design-skill/blob/main/skills/ui-art-direction/SKILL.md) and [repository MIT license](https://github.com/SpellbourneDZ/ui-design-skill/blob/main/LICENSE) | Explore concepts through content, relationships, or interaction. Set the amount of expression by the job and test whether a signature flourish earns its space. | Use those mechanisms as prompts for exploration and keep repeated or consequential tasks predictable. The original also covers implementation and joint use with `ui-design`. |
| [LangChain's Brand Design](https://github.com/langchain-ai/design-agent/blob/main/skills/brand-design/SKILL.md) and [repository Apache-2.0 license](https://github.com/langchain-ai/design-agent/blob/main/LICENSE) | Make the concept explainable in one sentence before laying it out, and use the focal element to carry the real message. | Connect the source detail, visible decision, and audience outcome. The original uses a local brand pack, companion skills, and lint tools. |
| [Paul Bakaus's Impeccable bolder guide](https://impeccable.style/docs/bolder/) | Strengthen one section through emphasis, proportions, or placement within its visual system. | Try this when a brief asks for more expression from an existing direction. The separately cataloged `impeccable` entry covers command execution. |

## Other candidates

- [Anthropic's Canvas Design](https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md) uses a subject reference as a compositional thread in static artwork. Its useful abstraction overlaps Creative Direction. Its manifesto, text-ratio and output requirements are specific to its canvas workflow.
- [Bartosz Arendt's Frontend Design](https://github.com/bartoszarendt/agent-skills/blob/main/skills/frontend-design/SKILL.md) reinforces subject-specific units and document conventions, existing component patterns, and visual checks. The current skill already had these fundamentals.
- [TrueSpace's Anti-Slop Design Director](https://truespaceai.ru/design/) is a concept-first poster prompt and an inspiration acknowledged by UI Art Direction. Its print styling and immediate image generation make it a narrower fit for this multi-medium skill.
- [linkxzhou's Design Taste](https://github.com/linkxzhou/design-taste) was sampled through its README. Its scoring workflows are peripheral to developing an original concept. Its benchmarks and runtime remain outside this review.

The three most useful additions, in order, were reference abstraction with an applied check, expression scaled to task frequency and consequence, and the one-sentence concept check. The update keeps the package prose-only and host-neutral. Evidence remains at author review. There is no admission or installation recommendation for the upstream packages from this comparison.
