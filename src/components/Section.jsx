import labels from '../config/labels.json';
export default function Section({ id, children }) {
  const l = labels.sections[id];
  return (
    <section id={id} className="section reveal">
      <div className="section-head">
        <span className="mono">{l.code} — {l.kicker}</span>
        <h2>{l.title}</h2>
      </div>
      {children}
    </section>
  );
}
