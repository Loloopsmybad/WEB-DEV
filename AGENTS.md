# AGENTS.md

## Repo Structure

This is **not** a monorepo. Each top-level directory is an independent project or artifact with its own dependencies. Do not assume shared tooling or config across directories.

## Key Projects

### `export-client/` — AN-Infratech Corporate Website (PRIMARY)

- **Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui (New York style)
- **Router:** App Router (`app/` directory)
- **Deployed to Vercel** (`.vercel/` present)

```bash
cd export-client
npm install
npm run dev      # next dev
npm run build    # next build
npm run lint     # eslint
```

- React Compiler is enabled via `babel-plugin-react-compiler` — this is non-default behavior
- Components use `components.json` (shadcn) — run `npx shadcn@latest add <component>` to add UI components
- Smooth scroll via Lenis, WebGL effects via OGL

### `typescript/learning type script/` — Glyph Dashboard

- **Stack:** React 19, Vite 8, TypeScript 6, Supabase (realtime)
- Nothing-Phone-inspired monochrome dashboard with real-time data from Supabase

```bash
cd "typescript/learning type script"
npm install
npm run dev       # vite
npm run build     # tsc && vite build
```

- Supabase URL and anon key are hardcoded in `src/supabase.ts`

### `diac -copy/` — DIAC CMS Templates (HTML)

- Saved copies of a case management system UI. Vanilla HTML/CSS/JS with Bootstrap, jQuery.
- No build step. Open HTML files directly in a browser.

### `typescript/export-client/` — Duplicate

- Exact copy of the top-level `export-client/`. Edit the top-level copy; ignore this one.

## What's NOT Here

- No CI/CD (no `.github/workflows/`, no pipeline config)
- No test framework (no Jest, Vitest, Playwright)
- No Prettier config (only ESLint in the Next.js project)
- No `.env` files or environment setup docs
- No Makefile, Dockerfile, or deployment scripts beyond Vercel

## Working Conventions

- Commit messages are terse ("no message", "lol", "RAT") — do not infer meaning from them
- The `web dev/`, `web graphics/`, `webdev-localllm/`, `my cv/`, `step parser/` directories are standalone HTML experiments — no build required
- Files with spaces in directory names exist (`typescript/learning type script/`) — quote paths in shell commands
