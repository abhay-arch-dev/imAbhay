import { useMemo, useState } from 'react';
import skills from '../config/skills.json';
import labels from '../config/labels.json';
import Section from './Section.jsx';
import SkillsGlobe from './SkillsGlobe.jsx';
export default function Skills() {
  const [cat, setCat] = useState('All');
  const items = useMemo(
    () => (cat === 'All' ? skills.flatMap((g) => g.items).slice(0, 60) : skills.find((g) => g.category === cat).items),
    [cat]
  );
  return (
    <Section id="skills">
      <div className="filters">
        {['All', ...skills.map((g) => g.category)].map((c) => (
          <button key={c} className={`filter mono ${c === cat ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <SkillsGlobe items={items} />
      <p className="mono hint">{labels.sections.skills.hint}</p>
    </Section>
  );
}
