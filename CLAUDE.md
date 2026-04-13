# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build (outputs to /dist)
npm run lint       # ESLint
npm run test       # Run tests once (Vitest)
npm run test:watch # Run tests in watch mode
```

## Architecture

This is Rafael de Mattos's personal portfolio site — a terminal-style interactive UI where visitors type commands to learn about him.

**Framework stack:** [Vinext](https://github.com/nicholasgasior/vinext) (Next.js App Router semantics on top of Vite) + React 19 + TypeScript. The build produces a static export to `/dist` via `output: "export"` in `next.config.js`.

**Entry point:** `app/page.tsx` renders a single `<Terminal>` component. Almost all site content lives inside `src/components/Terminal.tsx` — it is one large component that holds all command definitions, their JSX output, and the input/history state machine.

**Adding a new command** requires three steps in `Terminal.tsx`:
1. Define a `function showX()` that calls `addLine(<JSX>)`.
2. Register it in the `commands` array (used by both the command dispatcher and the `help` output).
3. No routing or separate files needed — all content is inline JSX inside the same file.

**Styling:** Tailwind CSS with CSS variables for theming (dark/light via `next-themes`). Terminal-specific color classes (`terminal-prompt`, `terminal-command`, `terminal-highlight`, `terminal-blue`, `terminal-gray`, `terminal-error`, `terminal-success`, `terminal-comment`, `terminal-output`) are defined in `app/globals.css` and used throughout `Terminal.tsx`. Shadcn/ui components live in `src/components/ui/` but are not used by the terminal itself — they exist as a UI library baseline.

**Environment variable:** `NEXT_PUBLIC_RESUME_URL` — the Cloudflare R2 public URL for the resume PDF. Required for the `resume` command to work. See `.env.example`.

**Tests:** `tests/` mirrors the `app/` and `src/components/` structure. Uses Vitest + `@testing-library/react` with jsdom. Setup in `vitest.config.ts` and `tests/setup.ts`.

**Hosting:** Cloudflare Pages. Every push to the `terminal` branch triggers a new Cloudflare Pages deployment automatically.

**Path alias:** `@/*` maps to the project root (covers both `app/` and `src/`).
