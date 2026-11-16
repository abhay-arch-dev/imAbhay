import profile from '../config/profile.json';
import Section from './Section.jsx';

export default function About() {
  return (
    <Section id="about" title="About Me">
      <p className="lead">{profile.summary}</p>
      <div className="stats">
        {profile.stats.map((s) => (
          <div key={s.label} className="card stat"><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </div>
    </Section>
  );
}
