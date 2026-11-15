import { useState } from 'react';
import experience from '../config/experience.json';
import Section from './Section.jsx';
export default function Experience() {
  const [i, setI] = useState(0);
  const job = experience[i], n = experience.length;
  return (
    <Section id="experience">
      <div className="constellation">
        {experience.map((e, k) => (
          <button key={e.company} className={`star ${k === i ? 'active' : ''}`} onClick={() => setI(k)}>
            <i /><span className="mono">{e.period.split(' - ')[0]}</span><b>{e.company}</b>
          </button>
        ))}
      </div>
      <article key={i} className="card job">
        <div className="job-top mono">
          <span>{job.period} · {job.location}</span>
          <span className="pager">
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous">←</button>
            {i + 1} of {n}
            <button onClick={() => setI((i + 1) % n)} aria-label="Next">→</button>
          </span>
        </div>
        <h3>{job.role} <em>at {job.company}</em></h3>
        {job.client && <p className="muted mono small">Client · {job.client}</p>}
        <ul className="bullets">{job.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        <div className="chips">{job.tags.map((t) => <span key={t} className="chip mono">{t}</span>)}</div>
      </article>
    </Section>
  );
}
