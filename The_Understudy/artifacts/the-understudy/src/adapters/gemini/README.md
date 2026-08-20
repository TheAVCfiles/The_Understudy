# Gemini Adapter Boundary

This directory is reserved for the Gemini-backed implementation.

## Contract

The adapter must preserve the same I/O shape as the deterministic demo agents:

- `directorWithGemini(brief)` -> `DirectorOutput`
- `producerWithGemini(director)` -> `ProducerOutput`
- `evaluatorWithGemini(director, producer)` -> `EvaluatorOutput`

## Rules

- Do not commit API keys.
- Read secrets from environment variables or Replit Secrets.
- Keep demo mode as a fallback.
- Validate model outputs against the schema before returning them to the UI.
