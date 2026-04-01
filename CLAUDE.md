# Uncover

Visual conversation tool for facilitators who work with international students. 30 photos, 4 IFS-inspired questions, printable session kit.

## Current Focus
Facilitator pivot — reframing from self-discovery app to facilitator tool. General mode being removed. Spec and plan at `docs/superpowers/specs/` and `docs/superpowers/plans/`.

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
