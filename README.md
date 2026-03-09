# OpenMind — by Open Dev Society

> **The free, open-source Case Study Engine for deep, topic-specific analysis of history, business, and science.**

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Open Dev Society](https://img.shields.io/badge/OpenDevSociety-Initiative-gold)](https://opendevsociety.vercel.app)
[![Built With](https://img.shields.io/badge/Built%20With-Next.js%20%2B%20Siray.ai-black)](https://nextjs.org)

---

```
INIT_OPENMIND // KERNEL_MODULE: CASE_STUDY_ENGINE
STATUS: ACTIVE_DEPLOYMENT_V2.1
MISSION: DEEP CAUSAL ANALYSIS. NO GENERIC ADVICE.
```

---

## // WHAT_IS_OPENMIND

**OpenMind** is a specialized analytical tool that goes beyond search engines. Instead of giving you a list of links, it uses AI to generate deep, structured case studies on demand. 

Most AI tools provide generic advice. OpenMind is forced by its architecture to be **specific**. Use it to understand:

- **Business Strategy**: Why did a company succeed or fail? What were the key decision pivot points?
- **Historical Causality**: What structural conditions made an event possible? What were the triggers?
- **Scientific Uncertainty**: What does the data actually say vs. how is it framed in public debate?

Inspired by [Dan Williams' *How AI Will Reshape Public Opinion*](https://www.conspicuouscognition.com/p/how-ai-will-reshape-public-opinion) at Conspicuous Cognition.

---

## // FEATURES

- **Intelligent Classification**: Automatically detects if your input is a business, historical, or scientific question.
- **Progressive Streaming**: Content appears progressively using Edge Runtime for near-instant responses.
- **Causal Focus**: Drills into decision loops, actor incentives, and empirical gaps rather than simple pro/con lists.
- **Transparency Mode**: Every analysis includes a custom "Transparency Note" explaining where analysts or researchers disagree.

---

## // TECH_STACK

OpenMind is built with the same stack used across Open Dev Society projects — TypeScript, Next.js, and Tailwind CSS.

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router + Edge Runtime) |
| Language | TypeScript (Strict Mode) |
| Styling | Vanilla CSS + Integrated Tokens |
| AI Engine | Siray.ai API (`google/gemini-2.5-flash-lite`) |
| Fonts | Playfair Display + IBM Plex (Google Fonts) |
| Deployment | Vercel |

---

## // QUICK_START

### Prerequisites

You'll need Node.js 18+ and an Siray.ai API key. Get one at [console.siray.ai](https://console.siray.ai).

### 1. Clone & Install

```bash
git clone https://github.com/Open-Dev-Society/openmind.git
cd openmind
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Add your key to `.env.local`:
```
SIRAY_API_TOKEN=your_api_key_here
```

### 3. Run Development

```bash
npm run dev
```

---

## // PROJECT_STRUCTURE

```
openmind/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── classify/       # Mode detection logic
│   │   │   └── analyze/        # Streaming analysis engine
│   │   └── page.tsx            # Redesigned Home + Stream interface
│   ├── components/
│   │   ├── Masthead.tsx        # ODS-styled editorial header
│   │   ├── TopicInput.tsx      # Unified search field
│   │   ├── Section.tsx         # Collapsible analysis blocks
│   │   └── Resources.tsx       # External verification links
│   └── lib/
│       ├── prompts.ts          # v2.1 Prompt Architecture
│       └── types.ts            # Analytical data structures
```

---

## // ROADMAP

**v1.0 — Manipulation Detector** *(Completed)*  
**v2.0 — Case Study Engine** *(Completed)*  
**v2.1 — Streamlined Analytical Focus** *(Current)*  

**Future: v3.0 — Multilingual Support**  
Full i18n support. Deep analysis shouldn't be locked to English speakers.

---

## // CONTRIBUTING

Read the full [CONTRIBUTING.md](CONTRIBUTING.md) to get started. Look for issues tagged `good first issue` or drop a message in the [ODS Discord](https://discord.gg/9xywA3pj).

---

## // LICENSE

OpenMind is released under the **AGPL-3.0 License**.

```
OPEN_DEV_SOCIETY — EST. 2024
DEFAULT_TO_OPEN // PERMISSIONLESS_ACCESS // RAPID_ITERATION
```
