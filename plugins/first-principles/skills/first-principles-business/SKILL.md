---
name: first-principles-business
description: >
  First principles analysis applied to business problems, startup ideas, market opportunities,
  and industry disruption. Strips away industry conventions and inherited business assumptions
  to find the most direct path from problem to outcome.
  Use this skill when users ask about business ideas, startup validation, market analysis,
  "why does [industry] work this way", "how to disrupt [market]", "what's wrong with my
  business model", "validate my idea", "find opportunities in [space]", "why do businesses fail at [X]",
  or any question about business strategy that would benefit from questioning conventional wisdom.
  Also trigger for pricing strategy, go-to-market analysis, competitive positioning, and
  "should I build [product/service]" questions.
  Do NOT use for general topic exploration (use first-principles-explore),
  code optimization (use first-principles-code), or study preparation (use first-principles-learn).
---

# First Principles Business

You are running a first principles analysis on a business problem, idea, or market opportunity. Your job is to strip away industry conventions and inherited business assumptions to find what's fundamentally true about the problem and the most direct path to solving it.

## Why this approach works for business

Every industry accumulates layers of "how things are done" that nobody questions. Dealerships in auto sales. Agents in real estate. Semesters in education. These aren't laws of physics — they're inherited conventions that persist because questioning them is uncomfortable, not because they're optimal.

The most valuable business insights come from identifying which conventions are load-bearing (actually necessary) and which are cosmetic (just tradition). First principles thinking is the systematic way to do that.

## How to run the analysis

Read `references/core-methodology.md` for the full 5-step engine. Copy it from the `first-principles-explore/references/` directory if not present locally. Here's how to apply it to business contexts:

### Phase 1: Problem Decomposition

Start by clearly stating the business problem or opportunity. Then identify every assumption the user (and the industry) is making about how this problem should be solved.

Common categories of business assumptions to check:
- **Customer assumptions**: Who the customer is, what they want, how they buy
- **Value chain assumptions**: Which intermediaries are "necessary", what the supply chain must look like
- **Pricing assumptions**: How pricing should work, what customers will pay, cost structures
- **Distribution assumptions**: How the product/service reaches customers
- **Competition assumptions**: Who the real competitors are, what "competitive advantage" means here
- **Regulatory assumptions**: What's actually legally required vs. what the industry just does

For each assumption, explicitly assess: is this provably necessary, or is it just how the industry has always done it?

### Phase 2: Direct Path Analysis

Ask the core question: if none of these assumptions existed, what would be the most direct path from the problem to the outcome?

This is the Musk question applied to business: customer wants X, you can provide X — what's the shortest, simplest path between those two points? Every intermediary, every process, every convention that sits between the problem and the solution needs to justify its existence.

**Output a "direct path" diagram:**
```
PROBLEM: [What the customer actually needs]
    ↓
MINIMUM VIABLE PATH: [The simplest possible way to deliver it]
    ↓
OUTCOME: [Customer need met]

CURRENT INDUSTRY PATH: [All the steps the industry takes]
    ↓ ↓ ↓ ↓ ↓
[Show all the intermediaries, processes, conventions]
    ↓
SAME OUTCOME (but slower, more expensive, more complex)
```

### Phase 3: Opportunity Mapping

The gap between the direct path and the current industry path is where opportunity lives. For each gap:

- **Size**: How much value (time, money, complexity) does this convention add?
- **Defensibility**: If you remove this convention, can someone else easily copy you?
- **Feasibility**: What would it actually take to go direct? What are the real obstacles (not the assumed ones)?
- **Risk**: What could go wrong if you bypass this convention? Are there hidden reasons it exists?

### Phase 4: Solution Architecture

Based on the fundamental truths and the opportunity gaps, design the simplest possible version of a solution that works. Not the best version — the simplest one that actually delivers the core value.

This is important: the first principles solution should be surprisingly simple. If it's complex, you probably haven't stripped enough assumptions. Complexity in business usually comes from inherited process, not from inherent difficulty.

### Phase 5: Optional Extensions

Offer these when they'd add genuine value:

- **Inversion**: "What would guarantee this business fails? What are the ways this opportunity is actually a trap?"
- **Second-order effects**: "If you disrupt this convention, what happens downstream? Who benefits, who loses, and how do they react?"
- **Pre-mortem**: "It's 18 months from now and this venture has failed. What went wrong?"

The inversion and pre-mortem are particularly valuable for business analysis — they catch the blind spots that enthusiasm creates.

## Output format

Produce a structured markdown document with:
1. Problem statement and context
2. Assumption audit (the full list with assessments)
3. Direct path vs. current path comparison
4. Opportunity map with size/defensibility/feasibility/risk for each gap
5. Simplest viable solution design
6. Risk factors and failure modes (if extensions were applied)

Save as `[business-topic-slug]-first-principles-business.md` in the workspace folder.

## What makes a good business analysis

- **Name the specific conventions**: "The industry assumes you need retail locations" is useful. "There are industry conventions" is not.
- **Quantify where possible**: "This intermediary adds ~30% to the cost" is more actionable than "this adds cost."
- **Be honest about real constraints**: Some "conventions" exist because of regulation, physics, or human psychology — not tradition. Don't pretend those away.
- **The simplest solution test**: If your proposed solution has more than 5 core components, you probably haven't simplified enough. The best first principles business insights are almost embarrassingly simple.
