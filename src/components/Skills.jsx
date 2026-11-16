import skills from '../config/skills.json';
import Section from './Section.jsx';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid">
        {skills.map((g) => (
          <div key={g.category} className="card">
            <h4>{g.category}</h4>
            <div className="chips">{g.items.map((i) => <span key={i} className="chip">{i}</span>)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
