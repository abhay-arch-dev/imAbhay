import content from '../config/content.json';
export default function Section({ id, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title">{content.sections[id]}</h2>
      {children}
    </section>
  );
}
