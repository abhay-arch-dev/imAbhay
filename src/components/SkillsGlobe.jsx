import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const makeLabel = (text, color) => {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = '500 44px "Inter Tight", sans-serif';
  c.width = Math.ceil(ctx.measureText(text).width) + 40; c.height = 70;
  ctx.font = '500 44px "Inter Tight", sans-serif';
  ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.fillText(text, 20, 36);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  s.scale.set(c.width / 140, c.height / 140, 1);
  return s;
};

// Draggable 3D sphere of skill labels (Fibonacci distribution)
export default function SkillsGlobe({ items }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 14;
    const globe = new THREE.Group();
    globe.add(new THREE.Mesh(new THREE.IcosahedronGeometry(4.6, 2),
      new THREE.MeshBasicMaterial({ color: 0x3b86ff, wireframe: true, transparent: true, opacity: 0.12 })));
    const R = 5.2, n = items.length;
    items.forEach((t, i) => {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2, r = Math.sqrt(1 - y * y), th = i * Math.PI * (3 - Math.sqrt(5));
      const s = makeLabel(t, i % 3 ? '#eef4ff' : '#8fcaff');
      s.position.set(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R);
      globe.add(s);
    });
    scene.add(globe);

    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    resize(); addEventListener('resize', resize);

    let drag = false, lx = 0, ly = 0, vx = 0.004, vy = 0.0015;
    const down = (e) => { drag = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); };
    const move = (e) => { if (!drag) return; vy = (e.clientX - lx) * 0.005; vx = (e.clientY - ly) * 0.005; lx = e.clientX; ly = e.clientY; };
    const up = () => { drag = false; };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);

    let raf;
    const tick = () => {
      globe.rotation.y += vy; globe.rotation.x += vx;
      if (!drag) { vy += (0.004 - vy) * 0.02; vx += (0.0015 - vx) * 0.02; }
      globe.children.forEach((c) => { if (c.isSprite) { const z = c.getWorldPosition(new THREE.Vector3()).z; c.material.opacity = 0.25 + ((z + R) / (2 * R)) * 0.75; } });
      renderer.render(scene, camera); raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', resize);
      globe.traverse((o) => { o.geometry?.dispose(); o.material?.map?.dispose(); o.material?.dispose(); });
      renderer.dispose(); el.innerHTML = '';
    };
  }, [items]);
  return <div ref={ref} className="globe" />;
}
