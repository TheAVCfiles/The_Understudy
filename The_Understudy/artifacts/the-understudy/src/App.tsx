import { useMemo, useState } from 'react';
import { Clapperboard, ClipboardList, Gauge, Sparkles } from 'lucide-react';
import { runUnderstudyDemo } from './lib/runDemo';
import type { DemoOutput } from './schemas/agentOutput';

const sampleBrief = 'A ballet dancer discovers a hidden archive beneath a theater and realizes she is the understudy for a machine-made prophecy.';

export function App() {
  const [brief, setBrief] = useState(sampleBrief);
  const [output, setOutput] = useState<DemoOutput>(() => runUnderstudyDemo(sampleBrief));

  const scoreLabel = useMemo(() => {
    if (output.evaluator.average >= 4.5) return 'Stage ready';
    if (output.evaluator.average >= 3.5) return 'Workshop ready';
    return 'Needs rehearsal';
  }, [output.evaluator.average]);

  function runAgents() {
    setOutput(runUnderstudyDemo(brief));
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Gemini Hackathon v0.1 / Demo Mode</p>
        <h1>The Understudy</h1>
        <p className="subtitle">
          Hidden agents wait in the wings. A cinematic brief enters. Director, Producer,
          and Evaluator agents return a scene plan, production plan, and readiness score.
        </p>
      </section>

      <section className="panel input-panel">
        <label htmlFor="brief">Cinematic brief</label>
        <textarea
          id="brief"
          value={brief}
          onChange={(event) => setBrief(event.target.value)}
        />
        <button onClick={runAgents}>
          <Sparkles size={18} />
          Run the agent loop
        </button>
      </section>

      <section className="grid">
        <article className="card">
          <header>
            <Clapperboard />
            <h2>Director Agent</h2>
          </header>
          <p className="card-note">{output.director.visualStyle}</p>
          <ol>
            {output.director.camera.map((shot) => (
              <li key={shot.shot}>
                <strong>Shot {shot.shot}: {shot.instruction}</strong>
                <span>{shot.action}</span>
              </li>
            ))}
          </ol>
          <p className="audio">Audio: {output.director.audioMood}</p>
        </article>

        <article className="card">
          <header>
            <ClipboardList />
            <h2>Producer Agent</h2>
          </header>
          <p className="card-note">Assets and tasks prepared for the next production pass.</p>
          <div className="chips">
            {output.producer.assets.slice(0, 10).map((asset) => (
              <span key={`${asset.name}-${asset.type}`}>{asset.name} / {asset.type}</span>
            ))}
          </div>
          <ol>
            {output.producer.tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.id}: {task.action}</strong>
                <span>{task.assigned} / {task.eta}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="card score-card">
          <header>
            <Gauge />
            <h2>Evaluator Agent</h2>
          </header>
          <div className="score">{output.evaluator.average}</div>
          <p className="score-label">{scoreLabel}</p>
          <dl>
            <div>
              <dt>Coherence</dt>
              <dd>{output.evaluator.scores.coherence}/5</dd>
            </div>
            <div>
              <dt>Innovation</dt>
              <dd>{output.evaluator.scores.innovation}/5</dd>
            </div>
            <div>
              <dt>Technical</dt>
              <dd>{output.evaluator.scores.technical}/5</dd>
            </div>
          </dl>
          <p className="notes">{output.evaluator.notes}</p>
        </article>
      </section>

      <section className="panel">
        <h2>Raw structured output</h2>
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </section>
    </main>
  );
}
