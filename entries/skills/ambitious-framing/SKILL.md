---
name: ambitious-framing
description: Reframe a request into a more ambitious version before doing it, by raising the outcome (altitude), working like a field-leading expert (depth), or drawing on other disciplines (range). Use when the user asks to be more ambitious, go deeper, think bigger, or "what would an expert do here", or wants a stronger prompt for a substantial task. Not for small, fixed-scope edits.
license: MIT
---

# Ambitious framing

Most requests ask for less than the model can deliver: fill this template, fix this crash, summarize this file. This skill turns a literal request into a stronger one along three axes, then lets the person choose how far to go. Doing the same work faster is assumed and not covered here.

| Axis | Question | Moves the work from |
| --- | --- | --- |
| Altitude | What should happen after this is done? | Task to outcome |
| Depth | What would the best practitioner in this field actually do? | Digested summaries to raw material, real methods and outside checks |
| Range | Which other fields have solved the underlying problem? | One discipline to several |

## Boundaries

- **Propose, then act.** A reframe changes scope. Present it and get the person's choice before doing expanded work, unless they have already asked for the ambitious version. Never silently swap their task for a bigger one.
- **Stay proportional.** A typo fix needs no reframe. Use this for work worth a meeting, a decision or a multi-hour effort.
- **Altitude fits outcome-driven work.** It helps less with open creative work, where the artifact is the point. A sign that it fits: people would hold meetings about this work.
- **Ambition is not a license to claim success.** Hard targets are for effort, not reporting. Report what was actually achieved and verified.

## Procedure

### 1. Restate the literal request

One sentence: what was asked, for whom, and what "done" currently means.

### 2. Climb in altitude

Ask "what do you want to happen next?" repeatedly, two or three rungs:

1. **Artifact**: produce the thing asked for, using as much real data as is available rather than filling a template.
2. **Decision**: work out what the artifact is for. Identify the most urgent decisions it should drive, and draft options with the case for and against each.
3. **Process**: question the format itself. State why the work exists, design a better mechanism for that purpose, test it against the organization's own history (would it have caught past problems sooner?), and propose running it alongside the current process before replacing it.

The highest rungs often become standing workflows that need no human in the loop ("keep the app crash-free" instead of "fix this crash"). List what those require before promising them: data access (reports, logs, metrics), mappings (versions to commits, customers to events), and environments to reproduce and verify (machines, operating systems, staging data). Missing access is the real blocker; name it.

### 3. Go a level deeper

Answer these four questions before writing the deeper task:

1. What would a top professional do here that the request does not ask for?
2. What is the rawest material they would start from, rather than the summarized version at hand?
3. Which specific methods and tools would they use? Prefer the field's actual instruments (a database, a statistical model, a profiler, a test harness) over prose and markdown tables. Changing vocabulary without changing methods is not depth.
4. What, other than the person or the model doing the work, would show the result is right?

Then apply these moves where they fit:

- **Set a hard, specific target.** If the request implies "a bit better", propose an order-of-magnitude goal and treat it as solvable. When progress stalls, keep working on the hardest constraint instead of declaring it impossible. Report the actual result honestly either way.
- **Attack the current belief.** Take the stated assumption ("churn is an onboarding problem") and try to reproduce it from raw data. Report whether it holds.
- **Produce new knowledge.** Once inside the data, look for what nobody knows yet: build a model or simulation that reproduces history, find the earliest signal of the outcome, and test it on held-out data.
- **Use an outside judge.** Do not grade your own work. Prefer a check that can be run repeatedly: tests, benchmarks, held-out data, a reproduction on a real machine, a second independent analysis, or a domain expert. If no outside check is available, say so plainly.

### 4. Widen the range

- **Turn nouns into verbs.** Restate the deliverable as what it must accomplish. "A quarterly review deck" becomes "get busy people to believe a cause-and-effect story and decide under uncertainty in 30 minutes." Each verb points to fields that do it well.
- **Assemble the crew.** For each verb, name the discipline and the specific technique it contributes: an analyst for the numbers, a journalist for the story, an editor for finish, a designer if it is presented, and a red team (a short seller, a forensic accountant, an attacker) to find what is wrong. Where the host supports subagents and the person approves the cost, give each discipline its own worker with its own method and output.
- **Borrow methods, not voices.** Role-play changes tone without improving results. Do not "write like a short seller"; do what a short seller does: research the position and build the case against it.

### 5. Present the reframe

Give the person a short menu, not a lecture:

```markdown
**Literal:** <the request as asked>

**Altitude:** <outcome-level version> — needs: <access/data/environment>
**Depth:** <expert-level version> — raw material: <…>; methods: <…>; outside check: <…>
**Range:** <fields and the technique each contributes>

**Recommended:** <one combined rewritten prompt, ready to run>
**Gaps:** <missing access, tools or checks that limit the above>
```

Recommend one option. When the person picks, run the chosen version, verify it with the named outside check, and report what remained out of reach.

## Requirements and limits

Depth and range usually need a working environment: the ability to install software, run code and reach the relevant data through files, connectors or APIs. Without them, the reframe is still useful as a plan, but say which parts cannot be executed. This method raises the ceiling of a request; it does not by itself make the result correct. Verification does that.
