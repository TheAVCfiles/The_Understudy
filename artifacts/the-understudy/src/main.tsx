import React from 'react';
import ReactDOM from 'react-dom/client';
import { Clapperboard, ClipboardList, Gauge, Sparkles } from 'lucide-react';
import './styles.css';

type DirectorOutput = {
  beats: string[];
  camera: Array<{ shot: number; instruction: string; action: string }>;
  visualStyle: string;
  audioMood: string;
};

type ProducerOutput = {
  assets: Array<{ name: string; type: string }>;
  tasks: Array<{ id: string; action: string; assigned: string; eta: string }>;
  timeline: Array<{ taskId: string; startInHours: number }>;
};

type EvaluatorOutput = {
  scores: { coherence: number; innovation: number; technical: number };
  average: number;
  notes: string;
};

const sampleBrief = 'A ballet dancer discovers a hidden archive beneath a theater and realizes she is the understudy for a machine-made prophecy.';

function director(brief: string): DirectorOutput {
  const cleanBrief = brief.trim() || 'A performer waits in the wings for her cue.';
  const words = cleanBrief.split(/\s+/).filter(Boolean);
  const chunkSize = Math.max(1, Math.ceil(words.length / 4));
  const beats = [0, 1, 2, 3]
    .map((i) => words.slice(i * chunkSize, (i + 1) * chunkSize).join(' '))
    .filter(Boolean);

  return {
    beats,
    camera: beats.map((beat, i) => ({
      shot: i + 1,
      instruction: i === 0 ? 'Establishing wide shot' : i % 2 === 0 ? 'Tracking dolly across the stage picture' : 'Slow-motion medium close-up',
      action: beat,
    })),
    visualStyle: 'Backstage chiaroscuro, velvet shadows, cue-light glow',
    audioMood: 'Sparse piano, soft strings, breath and footfall detail',
  };
}

function producer(plan: DirectorOutput): ProducerOutput {
  const assets = [
    { name: 'cue-light-reference', type: 'visual' },
    { name: 'stage-archive-moodboard', type: 'visual' },
    { name: 'understudy-shot-board', type: 'production' },
    { name: 'ambient-soundpack', type: 'audio' },
  ];
  const tasks = [
    { id: 'T1', action: 'Create visual moodboard and color key', assigned: 'Producer Agent', eta: '2h' },
    { id: 'T2', action: `Generate references for ${Math.min(3, plan.camera.length)} camera beats`, assigned: 'Renderer / Gemini adapter', eta: '4h' },
    { id: 'T3', action: 'Prepare sound-mood stems', assigned: 'Audio pass', eta: '3h' },
    { id: 'T4', action: 'Assemble judge-facing readiness report', assigned: 'Evaluator Agent', eta: '2h' },
  ];
  return { assets, tasks, timeline: tasks.map((task, i) => ({ taskId: task.id, startInHours: i * 2 })) };
}

function evaluator(plan: DirectorOutput, production: ProducerOutput): EvaluatorOutput {
  const coherence = plan.beats.length >= 4 && plan.camera.length === plan.beats.length ? 5 : 4;
  const innovation = 5;
  const technical = production.tasks.length >= 4 && production.timeline.length === production.tasks.length ? 5 : 4;
  const average = Number(((coherence + innovation + technical) / 3).toFixed(2));
  return {
    scores: { coherence, innovation, technical },
    average,
    notes: 'Demo-mode evaluator: deterministic v0.1 scaffold. Replace through the Gemini adapter boundary in v0.2 without exposing proprietary engine-room IP.',
  };
}

function runDemo(brief: string) {
  const d = director(brief);
  const p = producer(d);
  const e = evaluator(d, p);
  return { brief, director: d, producer: p, evaluator: e };
}

function App() {
  const [brief, setBrief] = React.useState(sampleBrief);
  const [output, setOutput] = React.useState(() => runDemo(sampleBrief));

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Gemini Hackathon v0.1 / Clean-room Demo Mode</p>
        <h1>The Understudy</h1>
        <p className="subtitle">A cinematic brief enters. Director, Producer, and Evaluator agents return a scene plan, production plan, and readiness score.</p>
      </section>

      <section className="panel input-panel">
        <label htmlFor="brief">Cinematic brief</label>
        <textarea id="brief" value={brief} onChange={(event) => setBrief(event.target.value)} />
        <button onClick={() => setOutput(runDemo(brief))}><Sparkles size={18} /> Run the agent loop</button>
      </section>

      <section className="grid">
        <article className="card"><header><Clapperboard /><h2>Director Agent</h2></header><p>{output.director.visualStyle}</p><ol>{output.director.camera.map((shot) => <li key={shot.shot}><strong>Shot {shot.shot}: {shot.instruction}</strong><span>{shot.action}</span></li>)}</ol><p>Audio: {output.director.audioMood}</p></article>
        <article className="card"><header><ClipboardList /><h2>Producer Agent</h2></header><div className="chips">{output.producer.assets.map((asset) => <span key={asset.name}>{asset.name} / {asset.type}</span>)}</div><ol>{output.producer.tasks.map((task) => <li key={task.id}><strong>{task.id}: {task.action}</strong><span>{task.assigned} / {task.eta}</span></li>)}</ol></article>
        <article className="card score-card"><header><Gauge /><h2>Evaluator Agent</h2></header><div className="score">{output.evaluator.average}</div><p className="score-label">Stage ready</p><p>{output.evaluator.notes}</p></article>
      </section>

      <section className="panel"><h2>Raw structured output</h2><pre>{JSON.stringify(output, null, 2)}</pre></section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
