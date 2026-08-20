# The Understudy

Agentic cinema demo for the Gemini hackathon.

## Run & Operate

- `pnpm --filter @workspace/the-understudy run dev` — run the Vite demo app
- `pnpm --filter @workspace/the-understudy run build` — typecheck and build the demo app
- `pnpm run typecheck` — full workspace typecheck

## Stack

- pnpm workspaces
- TypeScript
- React + Vite
- Deterministic demo agents
- Gemini adapter boundary, not wired to secrets in v0.1

## Where things live

- `artifacts/the-understudy/src/agents/` — Director, Producer, Evaluator demo agents
- `artifacts/the-understudy/src/adapters/gemini/` — future Gemini adapter boundary
- `artifacts/the-understudy/prompts/` — Gemini workflow prompt templates
- `artifacts/the-understudy/schemas/` — JSON schema for agent outputs
- `artifacts/the-understudy/evaluation/` — scoring rubric
- `artifacts/the-understudy/docs/` — architecture notes

## Architecture decisions

- Demo mode is deterministic and requires no API keys.
- The UI calls local TypeScript agent functions so judges can see the loop instantly.
- Gemini integration should replace agent implementations through the adapter boundary, not rewrite the UI.
- Response shape is preserved through a shared schema contract.

## Product

A user enters a cinematic idea. The Understudy turns it into a scene plan, production plan, and readiness evaluation.

## Gotchas

- Do not commit Gemini API keys.
- Keep `artifacts/the-understudy` as the hackathon app package.
- Keep GitHub canonical; use Replit as the hosted demo surface.
