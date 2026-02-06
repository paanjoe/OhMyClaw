# Contributing to OhMyClaw

Thanks for your interest in contributing. Here’s how to get started.

## Development setup

1. **Fork and clone** the repo.
2. **Install dependencies**: `pnpm install`
3. **Run locally**:
   - `pnpm dev:web` — Next.js at http://localhost:3000
   - `pnpm dev:api` — NestJS at http://localhost:3001
4. Copy `.env.example` files to `.env` in the relevant app and fill in values (no secrets in the repo).

## Code standards

- **TypeScript**: Strict mode; shared types live in `packages/shared`.
- **Frontend**: Next.js App Router, React functional components, Tailwind.
- **Backend**: NestJS, REST API. Put business logic in the API, not in Next.js.
- **Commits**: Prefer clear, conventional messages (e.g. `feat: add model selector`, `fix: auth redirect`).

## Pull requests

1. Open an issue or comment on an existing one to align on the change.
2. Branch from `main`, make your changes, and run `pnpm build` and `pnpm lint`.
3. Open a PR with a short description and, if relevant, a link to the issue.
4. Maintainers will review and may request changes.

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers this project.
