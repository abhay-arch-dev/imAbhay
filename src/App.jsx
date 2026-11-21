import { useEffect } from 'react';
import theme from './config/theme.json';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Projects from './components/Projects.jsx';
import Awards from './components/Awards.jsx';
import Contact from './components/Contact.jsx';
import useTilt from './useTilt.js';

export default function App() {
  useTilt();
  useEffect(() => {
    Object.entries(theme).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k}`, v));
  }, []);
  return (
    <>
      <div className="bg-grid" aria-hidden />
      <Navbar />
      <main>
        <Hero /><About /><Skills /><Experience /><Projects /><Education /><Awards /><Contact />
      </main>
    </>
  );
}
