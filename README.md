# OpenMind

**A specialized, open-source AI engine for deep, causal analysis of business, history, and science.**

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Open Dev Society](https://img.shields.io/badge/OpenDevSociety-Initiative-gold)](https://opendevsociety.vercel.app)
[![Built With](https://img.shields.io/badge/Built%20With-Next.js%20%2B%20Siray.ai-black)](https://siray.ai)

---

## Overview

**OpenMind** is an analytical tool engineered to go beyond traditional search. Rather than returning a list of links or providing generic AI-generated summaries, OpenMind performs structured, topic-specific case studies on demand.

Designed to force specificity, OpenMind is ideal for exploring complex topics:

- **Business Strategy**: Analyze why companies succeed or fail, and identify critical decision pivot points.
- **Historical Causality**: Examine the structural conditions that allowed events to occur and the specific triggers that set them in motion.
- **Scientific Uncertainty**: Distinguish between empirical data and the narratives that frame public debate.

*Inspired by [Dan Williams' "How AI Will Reshape Public Opinion"](https://www.conspicuouscognition.com/p/how-ai-will-reshape-public-opinion).*

---

## Features

- **Intelligent Classification**: Automatically detects whether your query requires a business, historical, or scientific analytical framework.
- **Progressive Streaming**: Utilizes the Edge Runtime to stream content progressively, providing near-instant responses.
- **Causal Focus**: Drills into decision loops, actor incentives, and empirical gaps, avoiding superficial pro/con lists.
- **Transparency Mode**: Every analysis includes a dedicated "Transparency Note" that outlines areas of disagreement among analysts or researchers.

---

## Technology Stack

OpenMind is built with a modern, performant web stack:

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router + Edge Runtime) |
| Language | TypeScript (Strict Mode) |
| Styling | Vanilla CSS + Integrated Tokens |
| AI Engine | Siray.ai API (`google/gemini-2.5-flash-lite`) |
| Fonts | Playfair Display + IBM Plex (Google Fonts) |
| Deployment | Vercel |

---

## Quick Start

### Prerequisites

- Node.js 18 or higher
- A Siray.ai API key (obtainable at [console.siray.ai](https://console.siray.ai))

### 1. Clone & Install

```bash
git clone https://github.com/Open-Dev-Society/openmind.git
cd openmind
npm install
```

### 2. Configure Environment

Create your local environment file:

```bash
cp .env.example .env.local
```

Add your Siray.ai token to `.env.local`:
```
SIRAY_API_TOKEN=your_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

---

## Project Structure

```text
openmind/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── classify/       # Query mode detection logic
│   │   │   └── analyze/        # Streaming analysis generator
│   │   └── page.tsx            # Main application interface
│   ├── components/
│   │   ├── Masthead.tsx        # Application header
│   │   ├── TopicInput.tsx      # Unified search and input field
│   │   ├── Section.tsx         # Collapsible analysis content blocks
│   │   └── Resources.tsx       # External verification links rendering
│   └── lib/
│       ├── prompts.ts          # AI prompt architecture
│       └── types.ts            # Core data structures and interfaces
```

---

## License

OpenMind is open-source software released under the **AGPL-3.0 License**. Developed and maintained by the Open Dev Society.
