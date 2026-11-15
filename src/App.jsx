import { useEffect } from 'react';
import theme from './config/theme.json';
import SpaceBackground from './components/SpaceBackground.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Awards from './components/Awards.jsx';
import Contact from './components/Contact.jsx';
import useTilt from './useTilt.js';

export default function App() {
  useTilt();
  useEffect(() => {
    Object.entries(theme).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k}`, v));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <SpaceBackground />
      <Navbar />
      <main>
        <Hero /><About /><Skills /><Experience /><Education /><Awards /><Contact />
      </main>
    </>
  );
}
