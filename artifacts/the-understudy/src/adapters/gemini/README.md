# Gemini Adapter Boundary

This directory is reserved for the Gemini-backed implementation.

## Contract

The future Gemini adapter must preserve the same public demo shape:

- user brief in;
- Director output;
- Producer output;
- Evaluator output;
- validated structured response out.

## Rules

- Do not commit API keys.
- Read secrets from environment variables or Replit Secrets.
- Keep deterministic demo mode as fallback.
- Validate model outputs before returning them to the UI.
- Do not import proprietary Global AVC Systems, StagePort, DeCrypt, MythOS, client, legal, evidence, or patent-sensitive code.
