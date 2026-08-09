# AGENTS.md

React 19 + React Router (framework mode, SSR on) + Vite + Redux Toolkit + Tailwind v4 + i18next. Frontend for simon-neidig.eu; backend is a separate FastAPI repo.

## Commands

- `npm run dev` — dev server on http://localhost:5173
- `npm run build` — SSR production build → `build/`
- `npm run start` — serve built app (port 3000)
- `npm run test` — Jest; `npm run test:ci` adds coverage + JUnit/JSON reports
- `npm run typecheck` — runs `react-router typegen && tsc` (must stay as this exact order)
- **There is no lint or format script/config.** Do not run `npm run lint`.

Run a single test: `npx jest src/path/to/file.test.tsx` (or `npm run test -- <file>`). Tests are colocated as `<name>.test.tsx` next to the component.

## Architecture

- Path alias: `@/*` → `app/*`. Wired in `tsconfig.json`, vite (`vite-tsconfig-paths`), and Jest `moduleNameMapper`. Always import with `@/…`.
- Routes are declared in `app/routes.ts` (React Router framework route config) → files in `app/routes/`. Adding a route rewrites generated types under `.react-router/types/` (gitignored); re-run `npm run typecheck` to regenerate before compiling.
- Networking: all API calls go through `http()` in `app/networking/httpRequest.ts` (wraps axios; use `withCredentials`, optional `language` header). Never call axios directly in components.
- Redux: slices live in `app/store/slices/`; a new slice must also be registered in `app/store/store.tsx`. Components use `useAppSelector`/`useAppDispatch` from `@/store/hooks`.
- i18n: locales in `app/assets/locales/{en,de,fr}/translation.json`, statically imported by `app/i18n.tsx` (fallback `en`). Adding a translation key means updating **all three** files.
- Icons: Heroicons only, via the dynamic `Icon` component (`@/components/general/icon`) taking a string name — don't import heroicons directly.
- Styling: Tailwind v4 (`@tailwindcss/vite`), `darkMode: "class"`. Minimal hand-written CSS lives in `app/assets/css/` (mirrors app tree) and is pulled in through `main.css`.

## Environment & deploy

- `.env` (gitignored) must define `VITE_BACKEND_URL`; copy from `.env.example` (default `http://127.0.0.1:8000`). Without it `http()` builds `undefined` base URLs.
- Dev vite proxy forwards `/api` → `http://localhost`; prod Docker build sets `VITE_BACKEND_URL=/api`.
- Deployment: GitHub Actions builds a Docker image (`Dockerfile`: SSR on port 3000 behind nginx on 80) pushed to `ghcr.io/neidigsi/simonneidig_react:latest` on pushes to `main`. Tests run on PRs only.
- Backend SDK: FastAPI repo at github.com/neidigsi/simonneidig_fastapi.

## Verified docs

`app/README.md`, `app/store/README.md`, `app/networking/README.md`, `app/assets/css/README.md`, and `.github/workflows/README.md` describe conventions that hold.