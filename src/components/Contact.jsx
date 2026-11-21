import content from '../config/content.json';
import profile from '../config/profile.json';

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="accent">{content.contact.kicker}</p>
      <h2>{content.contact.title}</h2>
      <p className="muted">{content.contact.text}</p>
      <a className="btn" href={`mailto:${profile.email}`}>{content.contact.button}</a>
      <div className="contact-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={`tel:${profile.phone}`}>{profile.phone}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">{content.contact.linkedinLabel}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">{content.contact.githubLabel}</a>
      </div>
      <footer className="muted">© {new Date().getFullYear()} {profile.name}</footer>
    </section>
  );
}
