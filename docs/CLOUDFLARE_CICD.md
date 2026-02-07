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

## 4. Variables and secrets (required)

Add these in **Settings** → **Variables and Secrets** for the Worker:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_API_URL` | `https://your-api-url.com` | **Required.** Your production API URL (no trailing slash). If missing or wrong, the deployed app will call `localhost:3001` and auth will fail. Set this, then **trigger a new build** so it’s baked in. |
| `NODE_VERSION` | `20` | If the build image doesn’t use `.nvmrc`. |

- `NEXT_PUBLIC_*` values are embedded at **build time**. Changing them in the dashboard alone is not enough — you must **redeploy** (run a new build) after setting or changing `NEXT_PUBLIC_API_URL`.
- Use **Secrets** for anything sensitive; normal variables can appear in build logs.

## 5. R2 bucket

- Ensure the R2 bucket **ohmyclaw-web-next-cache** exists in the same Cloudflare account.
- Create it once (e.g. from your machine):  
  `pnpm --filter web exec wrangler r2 bucket create ohmyclaw-web-next-cache`

## 6. Sign-in redirects to localhost

After you deploy the **web** app to Cloudflare, Sign in must send users back to your Cloudflare URL, not localhost. That redirect is controlled by the **API** (backend).

On the server where the **API** runs (Railway, Render, Fly.io, etc.), set:

| Variable | Value |
|----------|--------|
| `FRONTEND_URL` | Your Cloudflare app URL, e.g. `https://ohmyclaw-web.xxx.workers.dev` (no trailing slash) |

Then restart the API. After Google sign-in, users will be redirected to this URL instead of localhost.

**API `.env` (production):** Set `OAUTH_CALLBACK_URL` to your **public** API URL + `/auth/callback`, e.g. `https://your-api.com/auth/callback` (or your ngrok URL if the API is local). This must match the URL you add in Google Cloud Console.

**Google Cloud Console** → your OAuth client → **Authorized redirect URIs**: add that same callback URL (e.g. `https://d79a-xxx.ngrok-free.app/auth/callback` or your deployed API URL).

## 7. If the build still fails

- Open **“View build”** for the failed run and check the log.
- Typical issues:
  - **pnpm not found:** ensure **Build command** starts with `corepack enable &&`.
  - **opennextjs-cloudflare not found:** `pnpm install` must run from repo root so `apps/web` has its deps.
  - **wrangler deploy can’t find .open-next:** Build command must finish with `pnpm run build:web:cf` (no `deploy` in the build step).
