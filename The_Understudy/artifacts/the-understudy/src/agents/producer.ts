import type { DirectorOutput, ProducerOutput } from '../schemas/agentOutput';

export function generateProductionPlan(director: DirectorOutput): ProducerOutput {
  const combinedText = director.beats.join(' ');
  const candidates = extractCandidates(combinedText).slice(0, 7);

  const assets = [
    ...candidates.map((candidate, index) => ({
      name: candidate.toLowerCase(),
      type: assetTypeFor(candidate, index),
    })),
    { name: 'cue-light-reference', type: 'visual' },
    { name: 'ambient-soundpack', type: 'audio' },
    { name: 'shot-board-template', type: 'production' },
  ];

  const tasks = [
    {
      id: 'T1',
      action: 'Create visual moodboard and color key from Director plan',
      assigned: 'Producer Agent',
      eta: '2h',
    },
    {
      id: 'T2',
      action: 'Generate shot references for first three camera beats',
      assigned: 'Renderer / Gemini adapter',
      eta: '4h',
    },
    {
      id: 'T3',
      action: 'Prepare sound-mood stems from audio descriptor',
      assigned: 'Audio pass',
      eta: '3h',
    },
    {
      id: 'T4',
      action: 'Assemble judge-facing demo sequence and readiness report',
      assigned: 'Evaluator Agent',
      eta: '2h',
    },
  ];

  const timeline = tasks.map((task, index) => ({
    taskId: task.id,
    startInHours: index * 2,
  }));

  return {
    assets,
    tasks,
    timeline,
  };
}

function extractCandidates(text: string): string[] {
  const ignored = new Set([
    'with',
    'from',
    'that',
    'this',
    'into',
    'beneath',
    'discovers',
    'their',
    'where',
    'while',
  ]);

  const frequency: Record<string, number> = {};

  for (const word of text.split(/\W+/)) {
    const lower = word.toLowerCase();
    if (lower.length < 4 || ignored.has(lower)) continue;
    frequency[lower] = (frequency[lower] ?? 0) + 1;
  }

  return Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
}

function assetTypeFor(token: string, index: number): string {
  const lower = token.toLowerCase();

  if (lower.includes('sound') || lower.includes('music') || lower.includes('piano')) return 'audio';
  if (lower.includes('light') || lower.includes('stage') || lower.includes('archive')) return 'visual';
  if (index % 3 === 0) return 'visual';

  return 'reference';
}
