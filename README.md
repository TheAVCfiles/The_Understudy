# The Understudy

**The Understudy** is a clean-room agentic cinema demo for the Gemini / Google Cloud Agent Builder hackathon.

The premise is theatrical and technical: hidden agents wait in the wings, interpret a cinematic brief, generate a scene plan, organize production tasks, and evaluate readiness before the main model/API takes the stage.

## v0.1 proof

The first milestone proves the deterministic agent loop without API keys:

```text
Human cinematic intent
  -> Director Agent
  -> Producer Agent
  -> Evaluator Agent
  -> Readiness report
```

## Run locally

```bash
pnpm install
pnpm --filter @workspace/the-understudy run dev
```

Open the Replit/Vite URL or local Vite URL.

## Build

```bash
pnpm --filter @workspace/the-understudy run build
```

## Source-of-truth rule

GitHub is canonical. Replit is the live stage. Codex/Copilot can safely work from this repo after the first commit.

## IP and compliance boundary

This repository is a clean-room public hackathon scaffold. Proprietary Global AVC Systems, StagePort, DeCrypt, MythOS, legal/evidence, client, investor, and patent-sensitive materials are intentionally excluded. See `IP_BOUNDARY.md`, `NOTICE.md`, and `HACKATHON_COMPLIANCE.md`.

The v0.1 demo is deterministic and safe to run without secrets. A future v0.2 compliance layer must add runtime Gemini / Google Cloud usage for final hackathon submission.
