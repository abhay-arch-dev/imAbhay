import { useState } from 'react';
import nav from '../config/navigation.json';
import profile from '../config/profile.json';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <a href="#top" className="logo">{profile.name}</a>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <nav className={open ? 'open' : ''}>
        {nav.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{n.label}</a>
        ))}
        <a className="btn btn-ghost sm" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
      </nav>
    </header>
  );
}
