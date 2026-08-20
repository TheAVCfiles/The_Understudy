import { generateDirectorPlan } from '../agents/director';
import { evaluateReadiness } from '../agents/evaluator';
import { generateProductionPlan } from '../agents/producer';
import { DemoOutputSchema, type DemoOutput } from '../schemas/agentOutput';

export function runUnderstudyDemo(brief: string): DemoOutput {
  const director = generateDirectorPlan(brief);
  const producer = generateProductionPlan(director);
  const evaluator = evaluateReadiness(director, producer);

  return DemoOutputSchema.parse({
    brief,
    director,
    producer,
    evaluator,
  });
}
