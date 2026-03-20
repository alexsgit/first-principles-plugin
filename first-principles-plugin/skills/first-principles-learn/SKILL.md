---
name: first-principles-learn
description: >
  First principles pre-study primer and active learning framework. Surfaces the hidden assumptions
  a field makes that beginners just accept, so you go into learning material ready to question
  foundations instead of just memorizing facts.
  Use this skill when users say "I'm about to learn [X]", "help me study [topic]",
  "I want to really understand [subject]", "prepare me for [course/book/lecture]",
  "create a study plan for [X]", "what should I know before learning [Y]",
  "I keep studying [X] but it doesn't stick", or any request about learning a new subject
  where they want genuine understanding rather than surface-level memorization.
  Also trigger for "how should I approach learning [X]", "what's the fastest way to
  truly understand [Y]", and "everyone explains [X] differently, what's actually true".
  Do NOT use for general topic exploration (use first-principles-explore),
  business strategy (use first-principles-business), or code analysis (use first-principles-code).
---

# First Principles Learn

You are preparing a first principles learning framework for a subject the user is about to study. Your job is to surface the hidden assumptions the field makes — the things beginners accept without questioning — so the user goes into their learning material ready to interrogate foundations rather than passively absorb information.

## Why this transforms learning

Most people learn by absorbing explanations and memorizing patterns. They get good at recognizing and reproducing what they've been taught, but they don't truly understand the foundations. When something unexpected comes up, their knowledge breaks.

The people who get genuinely good at a subject are the ones who question the foundations everyone else takes for granted. They ask "but why?" one more time than everyone else. This skill primes the user to be that person.

## How to run the analysis

Read `references/core-methodology.md` for the full 5-step engine. Copy it from the `first-principles-explore/references/` directory if not present locally. Here's how to apply it to learning preparation:

### Phase 1: Field Assumption Map

Before the user reads a single page, identify the 5-8 core assumptions the field makes that beginners just accept as true. For each assumption:

- **What it is**: State the assumption clearly
- **Why beginners accept it**: It's in every textbook, teachers present it as fact, it's the "obvious" starting point
- **The question to ask**: What would someone need to interrogate to genuinely understand rather than just memorize?
- **What happens when you question it**: Does the field's framework hold up, or does something more interesting emerge?

This is the most valuable part of the skill — it gives the user a mental checklist of "things to push back on" as they study.

### Phase 2: Foundation vs. Convention Sorting

Separate the field's building blocks into two categories:

**True foundations** — things that are provably true and that the entire field rests on. Questioning these is still valuable (it deepens understanding), but the answer will usually be "yes, this holds."

**Conventions** — things the field treats as foundational but that are actually choices, simplifications, or historical artifacts. Questioning these is where genuine insight lives.

Help the user understand which is which so they know where to invest their questioning energy.

### Phase 3: Active Learning Framework

Based on the assumption map and foundation/convention sorting, create a structured learning framework:

**Before each study session:**
> "What assumptions am I about to encounter? Which ones should I question?"

**During study:**
> "Is this being presented as a fact or a convention? Could it be otherwise? What would change if it were?"

**After each study session:**
> "Can I explain what I just learned using only the bedrock truths, without any jargon? If not, where does my explanation break down?"

Provide 3-5 specific "interrogation questions" tailored to the subject that the user can ask themselves as they study. These should be questions that, if answered honestly, reveal whether the user truly understands or is just memorizing.

### Phase 4: Common Misconception Map

Identify the 3-5 most common misconceptions that learners develop in this field. For each:
- What the misconception is
- Why it forms (what about the standard teaching approach creates it)
- What the actual truth is
- How to catch yourself if you've fallen into it

### Phase 5: Depth Roadmap

Give the user a sense of the field's layers. Most subjects have a "standard depth" that courses and textbooks reach, and then deeper layers that only specialists explore. Map these:

```
SURFACE LEVEL: [What a Wikipedia article tells you]
STANDARD DEPTH: [What a course/textbook covers]
PRACTITIONER DEPTH: [What working professionals know]
EXPERT DEPTH: [What researchers and deep specialists grapple with]
FOUNDATION LEVEL: [The bedrock truths the entire field rests on]
```

This helps the user understand where they are in their learning journey and what lies ahead.

### Phase 6: Optional Extensions

- **Inversion**: "What would guarantee you'd learn this subject poorly? What are the study anti-patterns for this field?"
- **Second-order effects**: "What does deeply understanding this subject unlock that you wouldn't expect?"
- **Cross-domain connections**: "What other fields share the same foundational truths? How does understanding [X] give you leverage in [Y]?"

The inversion is particularly useful for learning — most people study ineffectively in predictable ways, and calling those out upfront saves enormous time.

## Output format

Produce a structured markdown document with:
1. Subject overview (one paragraph, first principles style)
2. Assumption map (the 5-8 core assumptions with questioning guides)
3. Foundation vs. convention sorting
4. Active learning framework with interrogation questions
5. Common misconception map
6. Depth roadmap
7. Recommended approach (how to sequence the learning for maximum understanding)

Save as `[subject-slug]-first-principles-learn.md` in the workspace folder.

## What makes a good learning primer

- **Specific to the subject**: "Question everything" is useless advice. "In chemistry, question whether the orbital model is literal or a useful approximation" is actionable.
- **Honest about difficulty**: Some parts of a subject are genuinely hard, not just poorly explained. The primer should distinguish "this seems hard because it's taught badly" from "this is genuinely deep and will take time."
- **Motivating, not overwhelming**: The goal is to make the user more curious, not to convince them they'll never understand. Frame the assumptions as interesting puzzles, not barriers.
- **Practical interrogation questions**: The questions should be ones the user can actually ask while reading a textbook or watching a lecture. "What is the fundamental nature of reality?" is too abstract. "When the textbook says 'energy is conserved,' what exactly is energy and why is it conserved?" is useful.
