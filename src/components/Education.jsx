import education from '../config/education.json';
import Section from './Section.jsx';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid">
        {education.map((e) => (
          <div key={e.degree} className="card">
            <h4>{e.degree}</h4>
            <p>{e.institute}</p>
            <p className="muted">{e.period}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
