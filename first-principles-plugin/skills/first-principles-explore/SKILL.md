---
name: first-principles-explore
description: >
  Deep-dive analysis of any topic using first principles thinking. Strips away inherited assumptions
  layer by layer until only provably true foundations remain, then rebuilds understanding from scratch.
  Use this skill whenever the user asks to "break down", "really understand", "think deeply about",
  or "analyze from scratch" any concept, idea, or topic. Also trigger when users say things like
  "explain [X] from first principles", "what is [X] really", "strip away the BS about [X]",
  "I want to truly understand [X]", or ask "why does everyone assume [Y] about [X]".
  Works on any domain — science, philosophy, technology, economics, culture, systems.
  Do NOT use for business-specific problems (use first-principles-business),
  codebase analysis (use first-principles-code), or pre-study preparation (use first-principles-learn).
---

# First Principles Explore

You are running a structured first principles analysis on a topic the user wants to deeply understand. Your job is not to summarize conventional wisdom — it's to dismantle it assumption by assumption and rebuild from what's provably true.

## Why this matters

When people ask Claude to "explain" something, they typically get a well-organized version of the best existing explanation. That's useful, but it's pattern-matching, not thinking. This skill forces a fundamentally different cognitive operation: separating what's **assumed** from what's **proven**, then rebuilding only from what survives scrutiny.

The result is often a dramatically simpler and more powerful understanding than the conventional one.

## How to run the analysis

Read `references/core-methodology.md` for the full 5-step engine. Here's how to apply it for general topic exploration:

### Phase 1: Strip (Steps 1-2)

Run Steps 1 and 2 from the core methodology on the user's topic. Be thorough with assumption identification — most topics have 8-15 assumptions that people treat as facts. For each assumption, explicitly state whether it's provably true, partially true, or just convention.

After stripping, apply the Feynman test: explain the rebuilt concept so simply that a curious 12-year-old would get it. If the explanation still needs jargon or prior knowledge, you haven't gone deep enough — keep stripping.

**Example of the difference:**

Topic: "How does machine learning work?"

Conventional explanation: Training data, gradient descent, loss functions, backpropagation, neural network architectures...

First principles version: "A machine learning model is a function that takes inputs and produces outputs. We adjust its internal numbers until the outputs match what we want. That's the complete picture. Everything else is a method for doing the adjustment more efficiently."

The first principles version is one sentence. It captures the actual truth without the accumulated jargon that makes ML seem more complex than its core idea actually is.

### Phase 2: Audit (Steps 3-4)

Identify the field's foundational assumptions and stress-test them. This is where the analysis gets genuinely interesting — you'll often find that 1-2 "obvious" truths in a field are actually just inherited conventions that nobody questions.

For the stress test, don't just list what would change — explain the *cascade*. When a load-bearing assumption fails, everything built on top of it shifts. Trace those shifts.

### Phase 3: Rebuild (Step 5)

The "Musk Test" — if you were starting from zero with only the bedrock truths, what would you build? This is where genuine insight emerges. The gap between "how it's done" and "how you'd do it from scratch" is the most valuable part of the analysis.

### Phase 4: Optional Extensions

If the user asks for deeper analysis, or if the topic warrants it, offer these add-ons from the core methodology:

- **Inversion thinking**: "Want me to invert this — figure out how you'd guarantee failure/misunderstanding of this topic?"
- **Second-order effects**: "Want me to trace the downstream consequences that aren't obvious at first?"
- **Pre-mortem**: "Want me to imagine this understanding has failed and work backward to find the blind spots?"

Only offer these if they'd genuinely add value — don't pad the analysis.

## Output format

Produce a structured markdown document with clear sections for each phase. The document should be self-contained — someone reading it should be able to follow the entire reasoning chain from conventional understanding → assumption stripping → bedrock truths → rebuilt understanding → from-zero reconstruction.

Save the output as `[topic-slug]-first-principles.md` in the workspace folder.

## What makes a good analysis

- **Specificity over abstraction**: Name the actual assumptions. "People assume X because Y" is useful. "There are many assumptions" is not.
- **Genuine simplicity**: The Feynman explanation should be genuinely simple, not just shorter. If a smart 12-year-old wouldn't get it, simplify further.
- **Surprising rebuilds**: If the from-zero version looks identical to the conventional approach, you probably haven't stripped deeply enough. The best analyses produce at least one "huh, I never thought of it that way" moment.
- **Intellectual honesty**: Some assumptions ARE true. Don't strip things away just for the sake of it. The power of this method is in accurately distinguishing proven from assumed — that means acknowledging when the conventional wisdom is actually correct.
