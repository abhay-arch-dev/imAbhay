import profile from '../config/profile.json';
import Cube from './Cube.jsx';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="hero-hi">Hi, my name is</p>
        <h1>{profile.name}.</h1>
        <h3>{profile.title}</h3>
        <p className="hero-tag">{profile.tagline} · {profile.location}</p>
        <div className="hero-actions">
          <a className="btn" href="#contact">Get In Touch</a>
          <a className="btn btn-outline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <Cube />
    </section>
  );
}
