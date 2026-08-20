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

## Product

A user enters a cinematic idea. The Understudy turns it into a scene plan, production plan, and readiness evaluation.

## Gotchas

- Do not commit Gemini API keys.
- Do not add OpenAI, Anthropic, AWS AI, Microsoft AI, or other non-permitted AI APIs.
- Keep GitHub canonical; use Replit as the hosted demo surface.
