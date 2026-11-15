import education from '../config/education.json';
import Section from './Section.jsx';
export default function Education() {
  return (
    <Section id="education">
      <div className="grid">
        {education.map((e) => (
          <div key={e.degree} className="card">
            <span className="mono">{e.period}</span>
            <h4>{e.degree}</h4>
            <p className="muted">{e.institute}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
