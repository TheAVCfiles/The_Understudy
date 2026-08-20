# Architecture v0.1

## Core principle

The Understudy separates orchestration from intelligence.

- UI calls a single local demo runner.
- Demo runner orchestrates Director -> Producer -> Evaluator.
- Each agent returns structured output.
- Schema validation protects the shape of the artifact.
- Gemini later replaces the agent implementations, not the entire app.

## Boundaries

- `src/agents/` — deterministic demo implementations
- `src/lib/runDemo.ts` — orchestration
- `src/schemas/` — output contract
- `src/adapters/gemini/` — future Gemini swap-in layer

## Deployment

Use GitHub as the source of truth. Use Replit as the live demo stage.
