# First Principles Thinking Plugin

A structured first principles thinking toolkit for Claude Code and Cowork. Strips inherited assumptions layer by layer until only provably true foundations remain, then rebuilds understanding from scratch.

Inspired by the thinking methodologies of Elon Musk and Richard Feynman.

## Skills Included

| Skill | Command | Use For |
|-------|---------|---------|
| **Explore** | `/first-principles:first-principles-explore` | Deep-dive analysis of any topic |
| **Business** | `/first-principles:first-principles-business` | Business ideas, market disruption, startup validation |
| **Code** | `/first-principles:first-principles-code` | Architecture analysis, tech debt, over-engineering |
| **Learn** | `/first-principles:first-principles-learn` | Pre-study primers, active learning frameworks |

## The 5-Step Engine

Every skill runs the same core methodology:

1. **Strip** — Identify and remove every inherited assumption
2. **Simplify** — Explain using only bedrock truths (Feynman Technique)
3. **Audit** — Surface the field's hidden foundational assumptions
4. **Stress Test** — What breaks if the top 3 assumptions are wrong?
5. **Build From Zero** — The "Musk Test": redesign from only fundamentals

## Optional Add-On Frameworks

Each skill also supports these on request:

- **Inversion Thinking** (Munger Method) — "How would I guarantee failure?"
- **Second-Order Effects** — "And then what?" repeated three times
- **Pre-Mortem Analysis** — "It failed. Work backward to find out why."

## Installation

```bash
# From a marketplace
/plugin install first-principles@marketplace-name

# From GitHub
/plugin marketplace add your-username/first-principles-plugin
/plugin install first-principles

# Local testing
claude --plugin-dir ./first-principles-plugin
```

## Examples

```
"Break down how social media algorithms actually work using first principles"
→ Triggers first-principles-explore

"I want to start a tutoring marketplace — what assumptions am I inheriting?"
→ Triggers first-principles-business

"We have 12 microservices for 500 users. Are we cargo-culting Netflix?"
→ Triggers first-principles-code

"I'm about to learn economics. What should I question, not just memorize?"
→ Triggers first-principles-learn
```

## Author

Built by Aleksandar @ Team Codery
