import { useEffect, useRef } from 'react';
import profile from '../config/profile.json';

const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];

// Drag (mouse or touch) to spin; flicks keep spinning with inertia,
// then the cube eases back to a slow idle spin.
export default function Cube() {
  const sceneRef = useRef();
  const cubeRef = useRef();

  useEffect(() => {
    const scene = sceneRef.current, cube = cubeRef.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const idle = reduce ? 0 : 0.25;
    let rx = -20, ry = 0, vx = 0, vy = idle, drag = false, lx = 0, ly = 0, raf;

    const down = (e) => {
      drag = true; lx = e.clientX; ly = e.clientY; vx = vy = 0;
      scene.setPointerCapture(e.pointerId); scene.classList.add('grabbing');
    };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      vy = dx * 0.5; vx = -dy * 0.5;
      ry += vy; rx += vx;
    };
    const up = () => { drag = false; scene.classList.remove('grabbing'); };
    const dbl = () => { rx = -20; ry = 0; vx = 0; vy = idle; };

    scene.addEventListener('pointerdown', down);
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerup', up);
    scene.addEventListener('pointercancel', up);
    scene.addEventListener('dblclick', dbl);

    const tick = () => {
      if (!drag) {
        rx += vx; ry += vy;
        vx *= 0.95;
        vy += (idle - vy) * 0.03;
      }
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      scene.removeEventListener('pointerdown', down);
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerup', up);
      scene.removeEventListener('pointercancel', up);
      scene.removeEventListener('dblclick', dbl);
    };
  }, []);

  return (
    <div className="cube-wrap">
      <div ref={sceneRef} className="cube-scene" title="Drag to spin · double-click to reset">
        <div ref={cubeRef} className="cube">
          {profile.cubeFaces.slice(0, 6).map((f, i) => (
            <div key={f} className={`face ${sides[i]}`}>{f}</div>
          ))}
        </div>
      </div>
      <p className="cube-hint">Drag to spin</p>
    </div>
  );
}
