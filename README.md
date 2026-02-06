# OhMyClaw

Replicate [SimpleClaw](https://www.simpleclaw.com/): deploy OpenClaw under 1 minute — landing page, model/channel selection, Sign in with Google, and deployment flow.

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

1. **Install deps** (from repo root): `pnpm install`
2. **Log in to Cloudflare** (from root): `pnpm --filter web exec wrangler login` — or from `apps/web`: `pnpm exec wrangler login`
3. **Create R2 bucket** (one-time): `pnpm --filter web exec wrangler r2 bucket create ohmyclaw-web-next-cache`
4. **Deploy**: from root `pnpm deploy:web` or from `apps/web` run `pnpm run deploy`
5. **Env vars** (optional): Set `NEXT_PUBLIC_API_URL` in [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → your worker → Settings → Variables, or in `.dev.vars` for local preview.

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
