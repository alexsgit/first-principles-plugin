# First Principles Thinking — Core Methodology

This document defines the 5-step escalation engine used across all First Principles skills. Each step strips another layer of inherited thinking until you reach bedrock truth.

## The 5-Step Stack

### Step 1: Assumption Stripping

Identify every assumption people commonly make about the topic. Then strip each assumption away one by one and ask: what is fundamentally, provably true here? Rebuild the concept from only what remains.

The key operation is distinguishing **assumed** from **proven**. Most "knowledge" is inherited from conventional wisdom — pattern-matched explanations that sound right because they're familiar, not because they're fundamental.

**Output format:**
```
## Assumptions Identified
1. [Assumption] — [Why people believe it] — [Is it provably true? Yes/No/Partially]
2. ...

## Bedrock Truths
After stripping assumptions, what remains provably true:
- [Truth 1]
- [Truth 2]

## Rebuilt Understanding
Starting from only the bedrock truths, here is what [topic] actually is:
[Rebuilt explanation]
```

### Step 2: Feynman Simplification

Explain the rebuilt concept as if the reader is a 12-year-old who has never heard any of these ideas before. No jargon. No assumed knowledge.

The principle: if you can't explain it simply, there's still hidden complexity that hasn't been broken down. The gaps in the simple explanation are exactly where understanding breaks down.

Keep simplifying until the explanation genuinely holds without relying on any technical terms or prior knowledge.

### Step 3: Field Assumption Audit

Identify the 5 core assumptions the field/domain makes that beginners just accept as true. For each one, assess:
- Why is this assumed?
- Is it actually proven or just convention?
- What would change if this assumption were wrong?

### Step 4: Stress Test

Take the 3 most important assumptions and ask: if these turned out to be wrong, what happens? This reveals which assumptions are load-bearing (everything collapses without them) versus cosmetic (things would just look different).

### Step 5: Build From Zero (The "Musk Test")

Starting from zero — no existing industry, no conventional wisdom, no inherited approach — using only the fundamental truths established in Steps 1-4, how would you build the solution from scratch? What would look completely different from how it's done today?

The gap between the current approach and the from-zero approach is exactly where opportunity lives.

---

## Optional Thinking Framework Add-Ons

These can be layered on top of the 5-step stack when the user requests deeper analysis.

### Inversion Thinking (Munger Method)

Instead of asking "how do I succeed at X?", ask "how would I guarantee failure at X?" Then avoid those things.

**When to apply:** After Step 5, when the user wants to stress-test their rebuilt understanding or solution.

**Prompt pattern:**
> "Now invert the problem. Instead of asking how to achieve [goal], ask: what would guarantee failure? List every way this rebuilt solution could fail. Which failure modes are the ones nobody talks about?"

### Second-Order Effects

Most people think one step ahead. Second-order thinking asks: "And then what?" repeatedly.

**When to apply:** After Step 5, when the user wants to understand downstream consequences of the from-zero solution.

**Prompt pattern:**
> "For each major element of this from-zero solution, ask 'and then what?' three times. What are the second and third-order effects that aren't obvious at first glance? Which of these effects would surprise most people?"

### Pre-Mortem Analysis

Imagine the solution has already failed. Work backward to figure out why.

**When to apply:** When evaluating a specific plan or solution that came out of the first principles analysis.

**Prompt pattern:**
> "Imagine it's one year from now and this approach has completely failed. What went wrong? Write the post-mortem. Focus on the failure modes that seem unlikely now but would be obvious in hindsight."
