import content from '../config/content.json';
import profile from '../config/profile.json';
import Cube from './Cube.jsx';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="hero-hi">{content.hero.greeting}</p>
        <h1>{profile.name}.</h1>
        <h3>{profile.title}</h3>
        <p className="hero-tag">{profile.tagline} · {profile.location}</p>
        <div className="hero-actions">
          <a className="btn" href="#contact">{content.hero.contactButton}</a>
          <a className="btn btn-outline" href={profile.linkedin} target="_blank" rel="noreferrer">{content.hero.linkedinButton}</a>
          <a className="btn btn-outline" href={profile.github} target="_blank" rel="noreferrer">{content.hero.githubButton}</a>
        </div>
      </div>
      <Cube />
    </section>
  );
}
