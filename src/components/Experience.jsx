import content from '../config/content.json';
import { useState } from 'react';
import experience from '../config/experience.json';
import Section from './Section.jsx';

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];
  return (
    <Section id="experience">
      <div className="tabs">
        <div className="tab-list">
          {experience.map((e, i) => (
            <button key={e.company} className={i === active ? 'active' : ''} onClick={() => setActive(i)}>{e.company}</button>
          ))}
        </div>
        <div className="tab-panel" key={active}>
          <h3>{job.role} <span className="accent">{content.experience.companyPrefix} {job.company}</span></h3>
          <p className="muted">{job.period} · {job.location}</p>
          {job.client && <p className="muted"><em>{content.experience.clientLabel} {job.client}</em></p>}
          <ul className="bullets">{job.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <div className="chips">{job.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        </div>
      </div>
    </Section>
  );
}
