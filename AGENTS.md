# Repository Guidelines

## Project Structure & Module Organization
- app/: Next.js App Router entry (layout.tsx, page.tsx) and global styles in app/globals.css.
- components/: Reusable React components. UI primitives live in components/ui (shadcn/ui).
- hooks/: Custom React hooks (e.g., use-toast, useIsMobile).
- lib/: Utilities and shared helpers (e.g., lib/utils.ts with class name merger).
- public/: Static assets served from the site root.
- styles/: Additional CSS (legacy/global overrides if needed).
- Aliases: Use `@/` for repo‑root imports (see tsconfig paths).

## Build, Test, and Development Commands
- Install deps: `pnpm install`
- Local dev (HMR): `pnpm dev`
- Type‑checked production build: `pnpm build`
- Start production server: `pnpm start` (after build)
- Lint codebase: `pnpm lint`

Requirements: Node 18+ and pnpm. Next.js 16, React 19, Tailwind CSS v4 are in use.

## Coding Style & Naming Conventions
- Language: TypeScript with `strict` mode; prefer explicit types for public APIs/props.
- React: Server Components by default; add `'use client'` at top for interactive components.
- Files: Components `.tsx` (PascalCase for component files), hooks `use-*.ts`, utilities `.ts`.
- Imports: Prefer `@/components/...`, `@/lib/...`, `@/hooks/...`.
- Styling: Tailwind CSS; use semantic tokens from CSS variables in `app/globals.css`. Prefer `cn(...)` from `lib/utils.ts` for class merging.
- Linting: ESLint (Next.js defaults). Run `pnpm lint` before pushing.

## Testing Guidelines
- No test runner is configured yet. Recommended setup:
  - Unit: Vitest + React Testing Library; files `*.test.ts(x)` colocated with source.
  - E2E: Playwright in `e2e/` with `*.spec.ts`.
- Aim for meaningful coverage on components with logic (hooks, utils). Keep UI snapshot tests minimal.

## Commit & Pull Request Guidelines
- Commits: Use Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`, `chore:`). Keep scope focused; reference files/areas when helpful.
- PRs must include: clear description of changes, motivation/issue link, screenshots or GIFs for UI changes, and test plan (commands run, affected areas).
- Keep diffs small and cohesive. Prefer follow‑up PRs over mixed concerns.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for runtime config; document required keys in `.env.example`.
- Place large/static assets in `public/` and import via `/path.ext`.
- Run `pnpm build` locally before merging to catch type/lint errors.

