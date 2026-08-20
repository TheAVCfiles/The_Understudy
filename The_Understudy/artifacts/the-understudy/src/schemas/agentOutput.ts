import { z } from 'zod';

export const DirectorOutputSchema = z.object({
  beats: z.array(z.string()).min(1),
  camera: z.array(
    z.object({
      shot: z.number().int().positive(),
      instruction: z.string(),
      action: z.string(),
    }),
  ),
  visualStyle: z.string(),
  audioMood: z.string(),
});

export const ProducerOutputSchema = z.object({
  assets: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
    }),
  ),
  tasks: z.array(
    z.object({
      id: z.string(),
      action: z.string(),
      assigned: z.string(),
      eta: z.string(),
    }),
  ),
  timeline: z.array(
    z.object({
      taskId: z.string(),
      startInHours: z.number(),
    }),
  ),
});

export const EvaluatorOutputSchema = z.object({
  scores: z.object({
    coherence: z.number().min(0).max(5),
    innovation: z.number().min(0).max(5),
    technical: z.number().min(0).max(5),
  }),
  average: z.number(),
  notes: z.string(),
});

export const DemoOutputSchema = z.object({
  brief: z.string(),
  director: DirectorOutputSchema,
  producer: ProducerOutputSchema,
  evaluator: EvaluatorOutputSchema,
});

export type DirectorOutput = z.infer<typeof DirectorOutputSchema>;
export type ProducerOutput = z.infer<typeof ProducerOutputSchema>;
export type EvaluatorOutput = z.infer<typeof EvaluatorOutputSchema>;
export type DemoOutput = z.infer<typeof DemoOutputSchema>;
