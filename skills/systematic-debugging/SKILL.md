---
name: systematic-debugging
description: Diagnose and fix bugs, failing tests, crashes, and regressions by reproducing the failure, testing a hypothesis about its cause, and verifying the correction. Use when something behaves differently than expected. Not for new features or review-only requests.
license: MIT
---

# Systematic debugging

Find the cause of the reported failure and verify a focused correction. Use the project's existing tools and keep the procedure proportional to the defect.

## Establish the failure

Identify expected behavior, actual behavior, and the smallest useful reproduction. Read relevant project instructions and existing tests before choosing checks. Distinguish a product failure from unavailable credentials, services, dependencies, or test infrastructure.

When the report lacks a critical input, inspect available evidence first and ask a focused question if needed. If reproduction remains unavailable, record the observed facts and remaining hypotheses. Do not present a suspected cause as established.

## Test a cause

Trace the failing behavior through relevant code and runtime evidence. Form a falsifiable hypothesis and use a targeted check to distinguish it from plausible alternatives. Avoid changing several independent things at once; that obscures which change corrected the failure.

For intermittent or environment-specific failures, use the [diagnostic reference](references/difficult-reproductions.md) only when the ordinary reproduction path is insufficient.

## Correct and verify

Implement a correction supported by the evidence. Add or update a regression check when it can reliably distinguish the original behavior from the expected behavior. Repeat the reproduction and run relevant surrounding checks; broaden testing when the change or new failures justify it.

Preserve unrelated changes and the project's established behavior outside the request. A dependency installation, tool activation, or external mutation still follows the user's authorization and host permissions.

## Report the outcome

State the cause and evidence, the correction, checks and observed results, and remaining uncertainty. If blocked, identify the missing input or environment and the next useful diagnostic step. Stop repeating an approach that produces no new evidence.

Completion requires the original failure to be resolved by an observed check, relevant regression coverage or a stated limitation, and an honest report of unverified behavior.
