# Gameplay playtesting

Use when preparing a player study, examining supplied gameplay observations or testing a playable build to inform a design decision. Scale to the question; do not require a studio framework, fixed participant count or a complete game design document.

## Choose the evidence needed

Name the decision and hypothesis: control readability, tutorial discovery, encounter fairness, route variety, reward pacing or another bounded question. Identify the relevant build, audience, progression state, input method and session conditions.

Separate three forms of evidence:

- **Implementation checks:** an agent or automation exercises controls, state transitions and recovery.
- **Design inspection:** a reviewer predicts a problem from rules, layout or presentation.
- **Player observations:** real people attempt gameplay tasks and describe their experience.

Choose the form that can answer the question. Automated success is not a human playtest, and a player preference is not by itself a bug. If a build or participants are unavailable, prepare the useful plan or analyze supplied evidence and state what was not run.

## Prepare a focused session

Use existing project research before recruiting or collecting new data. When actual sessions are requested and authorized, select participants for the decision: newcomers for discovery, experienced players for mastery or balance, and relevant access needs for those questions. Do not make population claims from a convenience sample.

Choose a session length and scenarios that expose the uncertainty. A first encounter, repeated farming loop and long-term guild relationship cannot be evaluated through the same observation window. Mark any setup shortcuts, pre-equipped accounts or simulated partners that change interpretation.

Give participants a meaningful goal without revealing the solution under test. Preserve intended discovery and teaching. Agree how assistance, critical bugs, distress or time limits are handled. Follow existing consent and privacy arrangements for notes or recording; preparing a plan does not authorize contacting people, starting recording or publishing their data.

## Observe attempts and recovery

Record build/variant, scenario, time or location, player action, outcome and any assistance. Keep direct statements and observed behavior separate from inferred feelings or explanations. A pause might mean thought, confusion, distraction or a technical problem; do not assign a cause without evidence.

Capture question-relevant events such as first successful action, missed information, retry choices, failure locations, abandoned routes or repeated voluntary cooperation. When screenshots or input traces help, associate them with the tested build and context. Use the project's available tools without introducing a recording service or engine integration unnecessarily.

Test failure, retry and interruption as well as the successful path. For browser games, inspect canvas/render state alongside DOM state, camera/menu input handoffs, viewport changes and focus-related pause behavior. A screenshot cannot establish responsive controls; an input script cannot establish visual clarity by itself.

## Interpret evidence without manufacturing certainty

Distinguish implementation defects, usability problems, balance hypotheses, preferences and presentation issues. Preserve contradictory observations and segment them by relevant experience or conditions. A single severe blocker can warrant action; repeated minor preferences do not become universal requirements because they cross an arbitrary count or percentage.

Trace findings back to attempts, notes or supplied recordings. Offer causal alternatives where the observation allows several explanations: repeated boss deaths could reflect unreadable tells, missed teaching, input latency, tuning or an intended challenge. Choose the next test that would separate them.

Report the observed issue, who/what was tested, supporting evidence, consequence, confidence and proposed response. Use “not assessed” for gaps. Do not invent quotes, counts, participant emotions or improvement claims to fill a template.

## Close the decision loop

Prioritize by impact, frequency in the actual sample, affected audience and cost of recovery. Make the smallest justified design or implementation proposal, with a retest that preserves enough conditions for comparison. A changed build, more practiced participants or different equipment can confound the result.

Stop at the requested plan, analysis or authorized change and verification. Do not spawn reviewer agents, open bug trackers, contact participants or start another study merely because a report suggests them. State what the evidence supports and what longer-term or different-player observation is still needed.
