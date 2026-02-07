# Cloudflare CI/CD (Workers & Pages) setup

Use these settings in **Cloudflare Dashboard** → **Workers & Pages** → **ohmyclaw-web** → **Settings** so the build succeeds.

## 1. Root directory

- **Root directory:** `/` (leave as repo root so the monorepo installs correctly)

## 2. Build and deploy commands

The web app uses **OpenNext for Cloudflare**, not a plain Next.js build. Use:

| Field | Value |
|-------|--------|
| **Build command** | `corepack enable && pnpm install && pnpm run build:web:cf` |
| **Deploy command** | `pnpm run deploy:web:cf` |
| **Version command** | *(leave default or blank)* |

- `corepack enable` turns on pnpm (from `packageManager` in root `package.json`).
- `build:web:cf` runs the OpenNext Cloudflare build and writes `.open-next/` in `apps/web`.
- `deploy:web:cf` runs `wrangler deploy` from the web package.

## 3. Node version

- In **Settings** → **Environment variables** (or your build env), set **NODE_VERSION** = `20` if your provider uses it to choose the Node version.
- The repo includes a `.nvmrc` with `20` for environments that read it.

## 4. Variables and secrets

Add at least:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_API_URL` | `https://your-api-url.com` | Your API base URL (no trailing slash). Used at **build** time. |
| `NODE_VERSION` | `20` | If the build image doesn’t use `.nvmrc`. |

- **Variables** are visible in the dashboard and in build logs; use **Secrets** for anything sensitive.
- Add these under **Settings** → **Variables and Secrets** for the Worker/Pages project.

## 5. R2 bucket

- Ensure the R2 bucket **ohmyclaw-web-next-cache** exists in the same Cloudflare account.
- Create it once (e.g. from your machine):  
  `pnpm --filter web exec wrangler r2 bucket create ohmyclaw-web-next-cache`

## 6. If the build still fails

- Open **“View build”** for the failed run and check the log.
- Typical issues:
  - **pnpm not found:** ensure **Build command** starts with `corepack enable &&`.
  - **opennextjs-cloudflare not found:** `pnpm install` must run from repo root so `apps/web` has its deps.
  - **wrangler deploy can’t find .open-next:** Build command must finish with `pnpm run build:web:cf` (no `deploy` in the build step).
