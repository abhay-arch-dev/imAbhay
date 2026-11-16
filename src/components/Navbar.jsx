import { useState } from 'react';
import nav from '../config/navigation.json';
import profile from '../config/profile.json';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <a href="#top" className="logo">{profile.initials}</a>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <nav className={open ? 'open' : ''}>
        {nav.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <a className="btn btn-outline" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
      </nav>
    </header>
  );
}
