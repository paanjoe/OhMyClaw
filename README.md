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

## Commands

| Command | Description |
|--------|-------------|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm dev:web` | Next.js only (default port 3000) |
| `pnpm dev:api` | NestJS only (default port 3001) |
| `pnpm build` | Build all packages and apps |

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
