import type { DirectorOutput } from '../schemas/agentOutput';

export function generateDirectorPlan(brief: string): DirectorOutput {
  const cleanBrief = brief.trim() || 'A performer waits in the wings for her cue.';

  const sentences = cleanBrief
    .split(/[.!?;]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 6);

  const beats = sentences.length > 1 ? sentences : splitIntoBeats(cleanBrief, 4);

  const camera = beats.map((beat, index) => ({
    shot: index + 1,
    instruction: shotInstruction(index, cleanBrief),
    action: beat,
  }));

  return {
    beats,
    camera,
    visualStyle: detectVisualStyle(cleanBrief),
    audioMood: detectAudioMood(cleanBrief),
  };
}

function splitIntoBeats(text: string, targetCount: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunkSize = Math.max(1, Math.ceil(words.length / targetCount));
  const beats: string[] = [];

  for (let index = 0; index < words.length; index += chunkSize) {
    beats.push(words.slice(index, index + chunkSize).join(' '));
  }

  return beats.slice(0, targetCount).filter(Boolean);
}

function shotInstruction(index: number, brief: string): string {
  const lower = brief.toLowerCase();

  if (index === 0) return 'Establishing wide shot';
  if (lower.includes('ballet') || lower.includes('dance') || lower.includes('stage')) {
    return index % 2 === 0 ? 'Tracking dolly across the stage picture' : 'Slow-motion medium close-up';
  }

  return index % 2 === 0 ? 'Handheld medium shot' : 'Close-up with shallow depth of field';
}

function detectVisualStyle(brief: string): string {
  const lower = brief.toLowerCase();

  if (lower.includes('understudy') || lower.includes('wings')) {
    return 'Backstage chiaroscuro, velvet shadows, cue-light glow';
  }

  if (lower.includes('ballet') || lower.includes('dance') || lower.includes('stage')) {
    return 'High-contrast theatrical light, slow-motion movement detail, soft backlight';
  }

  if (lower.includes('hidden') || lower.includes('archive')) {
    return 'Moody low-key lighting, dust in projector beam, archival texture';
  }

  return 'Naturalistic cinematic light with controlled contrast';
}

function detectAudioMood(brief: string): string {
  const lower = brief.toLowerCase();

  if (lower.includes('hidden') || lower.includes('archive')) {
    return 'Sub-bass rumble, distant piano, paper and machinery texture';
  }

  if (lower.includes('ballet') || lower.includes('dance') || lower.includes('stage')) {
    return 'Sparse piano, soft strings, breath and footfall detail';
  }

  return 'Low ambient pad with restrained pulse';
}
