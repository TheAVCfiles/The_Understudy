import type { DirectorOutput, EvaluatorOutput, ProducerOutput } from '../../schemas/agentOutput';

export async function directorWithGemini(_brief: string): Promise<DirectorOutput> {
  throw new Error('Gemini adapter is intentionally not implemented in v0.1. Keep demo mode deterministic.');
}

export async function producerWithGemini(_director: DirectorOutput): Promise<ProducerOutput> {
  throw new Error('Gemini adapter is intentionally not implemented in v0.1. Keep demo mode deterministic.');
}

export async function evaluatorWithGemini(
  _director: DirectorOutput,
  _producer: ProducerOutput,
): Promise<EvaluatorOutput> {
  throw new Error('Gemini adapter is intentionally not implemented in v0.1. Keep demo mode deterministic.');
}
