import profile from '../config/profile.json';

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="accent">What's Next?</p>
      <h2>Get In Touch</h2>
      <p className="muted">Open to Solution Architect and Senior Software Engineering opportunities. My inbox is always open.</p>
      <a className="btn" href={`mailto:${profile.email}`}>Say Hello</a>
      <div className="contact-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={`tel:${profile.phone}`}>{profile.phone}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <footer className="muted">© {new Date().getFullYear()} {profile.name}</footer>
    </section>
  );
}
