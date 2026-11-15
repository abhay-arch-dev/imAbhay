import awards from '../config/awards.json';
import Section from './Section.jsx';
export default function Awards() {
  return (
    <Section id="awards">
      <div className="grid">
        {awards.map((a) => (
          <div key={a.title} className="card">
            <div className="icon">{a.icon}</div>
            <h4>{a.title}</h4>
            <p className="muted">{a.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
