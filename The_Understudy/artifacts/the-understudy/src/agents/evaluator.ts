import type { DirectorOutput, EvaluatorOutput, ProducerOutput } from '../schemas/agentOutput';

export function evaluateReadiness(
  director: DirectorOutput,
  producer: ProducerOutput,
): EvaluatorOutput {
  const coherence = scoreCoherence(director);
  const innovation = scoreInnovation(director);
  const technical = scoreTechnical(producer);
  const average = Number(((coherence + innovation + technical) / 3).toFixed(2));

  return {
    scores: {
      coherence,
      innovation,
      technical,
    },
    average,
    notes: [
      `Coherence: ${coherence}/5 — scene beats and camera instructions were evaluated for continuity.`,
      `Innovation: ${innovation}/5 — theatrical and cinematic specificity was considered.`,
      `Technical: ${technical}/5 — assets, tasks, and timeline completeness were checked.`,
      'Demo-mode evaluator: replace with Gemini-backed evaluator after schema tests are locked.',
    ].join(' '),
  };
}

function scoreCoherence(director: DirectorOutput): number {
  const beatCount = director.beats.length;
  const cameraMatchesBeats = director.camera.length === beatCount;

  if (beatCount >= 4 && cameraMatchesBeats) return 5;
  if (beatCount >= 3) return 4;
  if (beatCount >= 2) return 3;

  return 2;
}

function scoreInnovation(director: DirectorOutput): number {
  const style = director.visualStyle.toLowerCase();
  const audio = director.audioMood.toLowerCase();

  if (style.includes('chiaroscuro') || style.includes('theatrical') || audio.includes('footfall')) {
    return 5;
  }

  if (style.includes('moody') || style.includes('high-contrast')) return 4;

  return 3;
}

function scoreTechnical(producer: ProducerOutput): number {
  const hasAssets = producer.assets.length >= 5;
  const hasTasks = producer.tasks.length >= 3;
  const hasTimeline = producer.timeline.length === producer.tasks.length;

  if (hasAssets && hasTasks && hasTimeline) return 5;
  if (hasTasks && hasTimeline) return 4;
  if (hasTasks) return 3;

  return 2;
}
