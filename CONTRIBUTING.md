# Contributing to OpenMind

```
INIT_CONTRIBUTOR_PROTOCOL
STATUS: OPEN // NO_GATEKEEPING // ALL_LEVELS_WELCOME
```

First off — thank you. OpenMind exists because people like you take time to make public knowledge tools better. Whether this is your first open-source PR or your hundredth, you belong here.

---

## // THE_BASICS

OpenMind follows the same contribution philosophy as all Open Dev Society projects:

- **You always own your work.** Contributions you make are yours — list them on your portfolio, resume, and LinkedIn.
- **No permission required.** Fork, experiment, and open a PR. You don't need to ask first.
- **All skill levels welcome.** We have issues tagged `good first issue` specifically for newcomers.

---

## // HOW_TO_CONTRIBUTE

### Report a Bug

Open an issue using the **Bug Report** template. Include:
- What you expected to happen
- What actually happened
- Steps to reproduce it
- Your browser and OS

### Suggest a Feature

Open an issue using the **Feature Request** template. Describe what you want and why it serves the mission of making epistemic tools more accessible.

### Add Topics to the Library *(easiest contribution!)*

One of the most impactful contributions is expanding the curated topic library that ships with the app. To suggest a new pre-analyzed topic, open a PR that adds it to `src/lib/topics.ts`. No deep technical knowledge required — just an understanding of the topic and why it's epistemically interesting.

### Fix a Bug or Build a Feature

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run the dev server locally and verify everything works: `npm run dev`
5. Commit with a clear message: `git commit -m "feat: add comparison mode"`
6. Push and open a Pull Request against `main`

---

## // CODE_STANDARDS

OpenMind is a TypeScript + Next.js project. To keep the codebase consistent:

- **TypeScript strictly** — no `any` types without a comment explaining why
- **Components in `src/components/`** — one component per file, named with PascalCase
- **Prompts in `src/lib/prompts.ts`** — all Claude system prompts live here so they're easy to find, review, and improve
- **API calls server-side only** — never expose `ANTHROPIC_API_KEY` to the client; all Claude calls go through `src/app/api/analyze/route.ts`
- **Tailwind for styling** — avoid inline styles except for dynamic values

---

## // COMMIT_MESSAGE_FORMAT

We follow a simple conventional commits style:

```
feat: add multilingual support
fix: handle empty topic input gracefully
docs: update contributing guide
style: improve dark panel contrast
refactor: extract prompt logic to lib/prompts.ts
```

---

## // GETTING_HELP

Stuck? Not sure if your idea fits? Come talk to us:

- **Discord**: [discord.gg/9xywA3pj](https://discord.gg/9xywA3pj) — drop a message in `#openmind` or `#general`
- **GitHub Discussions**: Open a discussion thread in this repo
- **Email**: [opendevsociety@gmail.com](mailto:opendevsociety@gmail.com)

---

## // CODE_OF_CONDUCT

Be kind. Be constructive. We are here for impact, not ego.  
OpenMind is a space for learning and building together — everyone deserves to feel safe contributing, regardless of their background or experience level.

---

```
OPEN_DEV_SOCIETY — We amplify impact. We don't take credit.
Your project. Your vision. Our community. Our support.
```
