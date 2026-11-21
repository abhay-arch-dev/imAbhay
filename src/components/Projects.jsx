import { useEffect, useState } from 'react';
import projects from '../config/projects.json';
import content from '../config/content.json';
import Section from './Section.jsx';

function Slides({ images, title }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="preview">
      {images.map((src, n) => (
        <img key={src} src={src} alt={`${title} screenshot ${n + 1}`} loading="lazy" className={n === i ? 'on' : ''} />
      ))}
      <div className="dots">
        {images.map((src, n) => <button key={src} aria-label={`Screenshot ${n + 1}`} className={n === i ? 'on' : ''} onClick={() => setI(n)} />)}
      </div>
    </div>
  );
}

function Glimpse({ url, title }) {
  return (
    <a className="preview glimpse" href={url} target="_blank" rel="noreferrer" aria-label={`${title} ${content.projects.previewLabel}`}>
      <iframe src={url} title={`${title} preview`} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" />
    </a>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <div className="grid">
        {projects.map((p) => (
          <div key={p.title} className="card project">
            {p.screenshots ? <Slides images={p.screenshots} title={p.title} /> : p.live && <Glimpse url={p.live} title={p.title} />}
            <h4>{p.icon} {p.title}</h4>
            <p className="muted">{p.description}</p>
            <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <div className="project-links">
              <a className="accent" href={p.repo} target="_blank" rel="noreferrer">{content.projects.linkLabel}</a>
              {p.live && <a className="accent" href={p.live} target="_blank" rel="noreferrer">{content.projects.liveLabel}</a>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
