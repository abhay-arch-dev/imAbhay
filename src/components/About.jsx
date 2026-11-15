import profile from '../config/profile.json';
import Section from './Section.jsx';
export default function About() {
  return (
    <Section id="about">
      <p className="lead">{profile.summary}</p>
      <div className="stats">
        {profile.stats.map((s, i) => (
          <div key={s.label} className="card stat">
            <span className="mono">TX-00{i + 1}</span>
            <strong>{s.value}</strong><span className="muted">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
