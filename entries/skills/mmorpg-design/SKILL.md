---
name: mmorpg-design
description: Design or critique MMORPG progression, combat loops, social systems and virtual economies, including MapleStory-like games. Use for mechanic proposals, competing design choices and research-backed design reviews; not routine gameplay advice, build guides or server implementation alone.
---

# MMORPG design

Translate a desired player experience into connected mechanics, explicit tradeoffs and a testable proposal. Preserve the game's intended audience and identity; MapleStory is a case study, not a template every MMO should follow.

## Frame the decision

Use the existing brief to identify the player fantasy, audience, session budget, progression stage and system being changed. Ask only for missing constraints that would change the recommendation; otherwise state assumptions and proceed. For an existing game, establish region, era, world rules and patch when consequential.

Describe what the player does moment to moment, what a session accomplishes and what they anticipate over weeks. Check whether these loops reinforce one another. Do not expand a focused mechanic review into a complete game design document.

## Follow the consequences

Choose the lenses relevant to the decision. For each consequential proposal, trace **rule → incentive → player behavior → effect on other players → long-term consequence**. Include a plausible failure mode or competing explanation.

### Capability and combat

- Name the playable change an upgrade enables: a new route, tactic, role, enemy, encounter or meaningful efficiency breakpoint. Distinguish character power from player mastery and cosmetic status.
- In platform-based combat, examine movement, attack coverage, spawn layout and route execution together. Check whether growth changes decisions or merely shortens an unchanged routine.
- Consider both ordinary repeatable play and demanding encounters. A relaxed farming loop and a high-attention boss can serve different needs; neither must inherit the other's intensity.
- Examine whether faster leveling or catch-up skips learning, empties intermediate areas or separates friends. Slower leveling is not inherently deeper.

### Social continuity

- Separate meeting, cooperating, recognizing contributions, reconnecting and belonging. A group finder solves only part of this sequence.
- Examine repeated encounters, population density, channels, instance boundaries, party rewards and tools for playing together again. More simultaneous players does not guarantee more relationships.
- Ask whether another player's arrival improves or harms the experience. Inspect resource competition, kill credit, reward division, contribution recognition and opportunities to help.
- Assess level gaps, schedules, class scarcity and support roles. Preserve meaningful interdependence without making ordinary participation depend on an unavailable specialist.
- Distinguish friction that creates coordination from queues, travel or repetition that merely consume time. Predict what removing it changes before recommending preservation or removal.

### Economy and acquisition

- Track currency and item creation, transfers and removal separately. Player-to-player payment transfers currency; a tax removes it. Item destruction need not remove currency.
- Compare trading and self-acquisition: unwanted-drop value, specialization, unlucky streaks, market access and the meaning of personal milestones. Removing trade changes progression as well as the economy.
- Identify the actual target of a sink: currency supply, a particular item's abundance, replacement demand or another measurable outcome. Do not assume any sink fixes inflation.
- For random upgrades, assess cost and time distributions, failure or regression, recovery and unlucky-player outcomes. State assumptions for calculations; average cost is not a promised budget. Consider protection or alternate acquisition where variance blocks desired play.

### Account growth and time

- Account bonuses can reward trying classes while making unwanted alts feel mandatory. Identify how much core participation depends on side-character work and what alternatives exist.
- Distinguish dependable accumulation, random rewards and calendar gates. Examine total recurring work as more regions, characters and systems unlock, rather than evaluating each daily in isolation.
- Consider missed sessions, returning players, new entrants and friends progressing at different rates. Catch-up, rested progress and banked tasks are options with tradeoffs, not universal requirements.
- Where monetization is in scope, trace how purchases affect power, convenience, trade and group eligibility. Evaluate sustained enjoyment and agency separately from login frequency or spending.

## Use evidence at its actual strength

For real-game comparisons, distinguish documented mechanics, developer intentions, observed player behavior and your own causal hypothesis. Verify mutable rules against region-appropriate publisher documentation or patch notes when tools permit. If verification is unavailable, label uncertainty instead of inventing current rules.

Do not transfer mechanics between PC MapleStory, MapleStory M, Classic recreations or regional versions without checking. Official-hosted player posts remain player reports; a manifesto is not an outcome evaluation. Nostalgic testimony can suggest a mechanism but does not establish causality. Observational retention correlations do not prove that forcing social interaction improves retention.

Read [the case-study reference](references/maplestory-and-comparisons.md) when MapleStory, historical pacing, trade restrictions, or comparison sources would materially help. It includes source limitations and research leads; it is not a current balance guide.

## Produce a decision that can be tested

Scale the output to the request. Give the recommended mechanic, why it supports the intended experience, the consequential alternative and tradeoff, and the smallest useful prototype or observation that could change the decision.

Choose behavioral evidence rather than engagement alone: repeat voluntary grouping, successful reconnection, useful contributions, capability milestones, progression disparity, reward variance or the experience after a missed week. Specify the cohort and observation window when proposing a study. Label suggested measures and thresholds as proposals, not measured results.

For example, test a party-reward change by observing whether comparable players choose to group again and whether rewards disadvantage solo play or encourage passive participation. A faster first clear alone does not establish better social design. Separate prototype findings from claims about a mature world with veterans, markets and established guilds.
