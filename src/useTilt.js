import { useEffect } from 'react';
// Adds a 3D tilt + glare to every .card based on mouse position
export default function useTilt() {
  useEffect(() => {
    const move = (e) => {
      const c = e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(800px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) translateZ(10px)`;
      c.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      c.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
    };
    const out = (e) => {
      const c = e.target.closest('.card');
      if (c && !c.contains(e.relatedTarget)) c.style.transform = '';
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseout', out);
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseout', out); };
  }, []);
}
