import profile from '../config/profile.json';
import labels from '../config/labels.json';
import Section from './Section.jsx';
export default function Contact() {
  return (
    <Section id="contact">
      <p className="lead">{labels.contactText}</p>
      <a className="btn big" href={`mailto:${profile.email}`}>{labels.contactCta}</a>
      <div className="contact-links mono">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={`tel:${profile.phone}`}>{profile.phone}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <footer className="mono muted">© {new Date().getFullYear()} {profile.name} · End of transmission</footer>
    </Section>
  );
}
