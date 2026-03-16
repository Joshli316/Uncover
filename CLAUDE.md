# Uncover

Visual conversation tool with 30 photos and IFS-inspired layers for self-discovery.

## Tech Stack
- Hono on Cloudflare Workers (`src/worker.ts`)
- D1 database (`uncover-db`), static assets in `public/`
- TypeScript
- Repo: github.com/fc-us/uncover

## Commands
- `npm run dev` -- Local dev server
- `npm run deploy` -- Deploy to Cloudflare Workers
- `npm run db:migrate:local` -- Apply migrations locally
- `npm run db:migrate` -- Apply migrations to remote D1
