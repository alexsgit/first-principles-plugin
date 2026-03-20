---
name: first-principles-code
description: >
  First principles analysis applied to code architecture, system design, and technical decisions.
  Strips away inherited patterns, cargo-culted best practices, and convention-driven architecture
  to find what the system actually needs to do and the simplest way to do it.
  Use this skill when users ask "why is our architecture this way", "should we use [pattern/framework]",
  "optimize [system/module]", "simplify this codebase", "is [microservices/monolith/etc] right for us",
  "redesign [component]", "we're over-engineering this", or any question about technical decisions
  that would benefit from questioning inherited patterns. Also trigger for tech stack evaluation,
  "build vs buy" decisions, performance optimization strategy, and "why is this so complex" questions.
  Do NOT use for general topic exploration (use first-principles-explore),
  business strategy (use first-principles-business), or study prep (use first-principles-learn).
---

# First Principles Code

You are running a first principles analysis on a code architecture, system design, or technical decision. Your job is to strip away cargo-culted patterns, inherited conventions, and "best practices" that may not apply, to find what the system actually needs to do and the simplest way to do it.

## Why this matters for code

Software engineering accumulates conventions faster than almost any other field. Microservices, clean architecture, design patterns, framework choices — these become defaults that teams adopt without asking whether they're the right fit. The result is systems that are complex not because the problem is complex, but because the solution inherited complexity from conventions.

First principles thinking in code asks: what does this system actually need to do, and what is the simplest architecture that accomplishes that?

## How to run the analysis

Read `references/core-methodology.md` for the full 5-step engine. Copy it from the `first-principles-explore/references/` directory if not present locally. Here's how to apply it to technical contexts:

### Phase 1: Requirements Stripping

Start with the system, module, or technical decision in question. Identify every architectural assumption being made:

Common categories of technical assumptions to check:
- **Pattern assumptions**: "We need microservices", "We should use MVC", "This needs a message queue"
- **Scale assumptions**: "We need to handle millions of users" (do you? right now?)
- **Technology assumptions**: "We need Kubernetes", "We should use [framework]", "This needs a database"
- **Process assumptions**: "We need CI/CD pipelines for this", "We need staging environments"
- **Complexity assumptions**: "This is inherently complex", "We need abstraction layers"
- **"Best practice" assumptions**: Patterns adopted because they're considered "correct" regardless of context

For each assumption, ask: is this driven by an actual requirement, or by convention/resume-driven-development/fear?

### Phase 2: Core Function Analysis

Strip the system down to its fundamental function. What inputs does it take? What outputs does it produce? What transformation happens in between?

Express the system's core purpose in one sentence. If you can't, the system might be trying to do too many things — that's a finding in itself.

**The simplicity test:**
```
CORE FUNCTION: [One sentence — what this system actually does]

INPUTS: [What goes in]
TRANSFORMATION: [What happens to it]
OUTPUTS: [What comes out]

CURRENT IMPLEMENTATION LAYERS:
[List every layer, service, abstraction between input and output]

JUSTIFIED LAYERS: [Which ones exist because of actual requirements]
INHERITED LAYERS: [Which ones exist because of convention]
```

### Phase 3: Architecture from Zero

If you were building this system from scratch today, knowing only the actual requirements (not the inherited architecture), what would you build?

Ground rules for the from-zero design:
- Start with the simplest thing that could work
- Add complexity only when a specific, current requirement demands it
- "We might need it later" is not a requirement — it's speculation
- Prefer boring technology over exciting technology unless there's a specific reason
- Every layer of abstraction must justify its existence with a concrete benefit

The from-zero design often looks shockingly simple compared to the current architecture. That gap is where refactoring opportunity lives.

### Phase 4: Migration Reality Check

The from-zero design is an ideal. The current system exists and has constraints. Bridge the gap:

- **Quick wins**: Which inherited conventions can be stripped without major refactoring?
- **Strategic simplifications**: Which architectural changes would dramatically reduce complexity but require planned effort?
- **Load-bearing complexity**: Which parts look complex but are actually handling real edge cases that the from-zero design would eventually need to handle too?
- **Technical debt vs. deliberate design**: Not all complexity is debt. Some of it is handling real-world messiness that a clean design ignores.

### Phase 5: Optional Extensions

- **Inversion**: "What technical decisions would guarantee this system becomes unmaintainable? Are any of those already present?"
- **Second-order effects**: "If we simplify this architecture, what breaks downstream? What gets easier? What new problems emerge?"
- **Pre-mortem**: "It's a year from now and this redesign has made things worse. What happened?"

The inversion is particularly powerful for code — it often surfaces existing anti-patterns that the team has normalized.

## Output format

Produce a structured markdown document with:
1. System/problem description
2. Assumption audit (every pattern and convention being used, with justification assessment)
3. Core function analysis (the one-sentence purpose + input/transformation/output)
4. From-zero architecture (the simplest design that meets actual requirements)
5. Gap analysis (current vs. from-zero, categorized by quick wins / strategic / load-bearing)
6. Recommended action plan (ordered by impact/effort ratio)

Save as `[system-slug]-first-principles-code.md` in the workspace folder.

## What makes a good code analysis

- **Question specific patterns, not "complexity" in general**: "You're using an event bus between two services that could share a function call" is useful. "The system is over-engineered" is not.
- **Respect real constraints**: Not all complexity is accidental. Some systems are complex because they handle genuinely complex domains. The analysis should distinguish the two.
- **The one-sentence test**: If the system's core purpose can't be stated in one sentence, that's a finding — it suggests the system is trying to do too many things or its boundaries are wrong.
- **Pragmatism over purity**: The goal isn't architectural perfection. It's finding where inherited convention is creating unnecessary work, bugs, or cognitive load, and offering a simpler alternative.
