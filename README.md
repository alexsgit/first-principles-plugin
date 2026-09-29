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
/plugin marketplace add alexsgit/first-principles-plugin
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

Built by Aleksandar @ Several Agents VCC

## First Principles Learning App

The repository also contains an independent browser-based learning app in `app/`. It is a separate React, Vite, and Three.js project; the Claude/Cowork plugin and its skills remain unchanged.

### Run locally

```bash
cd app
npm install
npm run dev
```

Create a production build with `npm run build` from `app/`, or preview one with `npm run preview`.

### Content, scenes, and sources

- The first-release catalog in `app/src/data/topics.js` is a curated starter set spanning physics, neuroscience, biology, chemistry, engineering, and everyday objects. Add topics there as the catalog grows; the app does not claim exhaustive coverage.
- A topic provides its own guided explanations, component descriptions, Wikipedia article title, and scene primitives. Scene dimensions and shapes are teaching aids, not automatically extracted article data or scientific geometry. Keep conceptual visualizations and analogies explicitly labeled.
- Wikipedia's public search API supports topic discovery. Article background summaries are fetched separately and link back to the source article. When reusing or adapting Wikipedia text, preserve attribution and the applicable CC BY-SA terms.
- Curated explanations and visual interpretations are distinct from fetched Wikipedia background. Do not imply Wikipedia generated or verified a scene.

The app requires an internet connection for Wikipedia search/summaries and Google Fonts. If the Wikipedia API is unavailable, search and article panels show an error while the curated catalog and scenes remain usable.
