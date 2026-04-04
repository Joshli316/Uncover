# Uncover

Visual conversation tool for facilitators who work with international students. 30 photos, 4 IFS-inspired questions, printable session kit.

## Current Focus
Photos replaced with Angelo set (30 local images in public/photos/). Landing page polished (photo strip, testimonial, simplified cards). Expert panel review applied (security, a11y, performance fixes). Facilitator guide moved to session kit page 7. Spec and plan at `docs/superpowers/specs/` and `docs/superpowers/plans/`.

## Tech Stack
- Hono on Cloudflare Workers (`src/worker.ts`)
- D1 database (`uncover-db`), static assets in `public/`
- TypeScript
- Repo: github.com/Joshli316/Uncover
- Live: https://uncover.yellow-longitudinal.workers.dev

## Commands
- `npm run dev` -- Local dev server
- `npm run deploy` -- Deploy to Cloudflare Workers
- `npm run db:migrate:local` -- Apply migrations locally
- `npm run db:migrate` -- Apply migrations to remote D1
