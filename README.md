# OhMyClaw

Deploy OpenClaw under 1 minute — landing page, model/channel selection, Sign in with Google, and deployment flow.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind — `apps/web`
- **Backend**: NestJS, TypeScript, Supabase (PostgreSQL) — `apps/api`
- **Shared**: Types and constants — `packages/shared`

## Setup

```bash
pnpm install
```

If the app won’t start, run `pnpm install` from the repo root (or `pnpm install --no-frozen-lockfile` if the lockfile is out of date). Then run the web app from the root with `pnpm dev:web` or from `apps/web` with `pnpm run dev`.

## Commands

| Command | Description |
|--------|-------------|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm dev:web` | Next.js only (default port 3000) |
| `pnpm dev:api` | NestJS only (default port 3001) |
| `pnpm build` | Build all packages and apps |

## Deploy frontend (Cloudflare)

The web app is set up for [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/cloudflare).

### One-time setup (Cloudflare)

1. **Log in**: `pnpm --filter web exec wrangler login`
2. **Create R2 bucket**: `pnpm --filter web exec wrangler r2 bucket create ohmyclaw-web-next-cache`
3. **Account ID**: In [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Overview, copy your **Account ID**.

### Deploy from your machine

From repo root: `pnpm deploy:web` (or from `apps/web`: `pnpm run deploy`).

### Deploy via CI/CD (GitHub Actions)

Push to `main` (or run the workflow manually) to deploy.

**Required repo secrets** (GitHub → repo → Settings → Secrets and variables → Actions):

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_API_TOKEN` | API token with “Edit Cloudflare Workers” (Create Token → Edit Cloudflare Workers template) |
| `NEXT_PUBLIC_API_URL` | (Optional) API base URL for the frontend, e.g. `https://api.ohmyclaw.com` |

Workflow file: [.github/workflows/deploy-cloudflare.yml](.github/workflows/deploy-cloudflare.yml).

### Env vars in Cloudflare

After deploy, you can override env (e.g. `NEXT_PUBLIC_API_URL`) in Dashboard → Workers & Pages → **ohmyclaw-web** → Settings → Variables.

See [OpenNext Cloudflare get started](https://opennext.js.org/cloudflare/get-started) for details.

## Project layout

```
apps/
  web/     # Next.js landing + dashboard
  api/     # NestJS REST API, auth, deployments
packages/
  shared/  # ModelId, ChannelId, shared types
.cursor/
  rules/   # Cursor rules (project.mdc, typescript-standards.mdc)
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup and PR guidelines.

## License

This project is open source under the [MIT License](LICENSE).
