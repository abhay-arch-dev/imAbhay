import profile from '../config/profile.json';
import labels from '../config/labels.json';
export default function Hero() {
  return (
    <section id="top" className="hero">
      <span className="mono kicker"><i className="dot" /> {labels.heroKicker}</span>
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-title">{profile.title}</p>
      <p className="hero-tag mono">{profile.tagline} · {profile.location}</p>
      <div className="hero-actions">
        <a className="btn" href="#contact">Get in touch</a>
        <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <a href="#about" className="scroll-cue mono">{labels.heroScroll}<span /></a>
    </section>
  );
}
