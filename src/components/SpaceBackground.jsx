import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Full-page starfield + glowing ringed planet, parallax on mouse and scroll
export default function SpaceBackground() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
    camera.position.z = 30;

    const makeStars = (count, size, spread, color) => {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * spread;
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(g, new THREE.PointsMaterial({ size, color, transparent: true, opacity: 0.9, sizeAttenuation: true }));
    };
    const stars = new THREE.Group();
    stars.add(makeStars(2500, 0.25, 400, 0xffffff), makeStars(600, 0.5, 300, 0x8fcaff));
    scene.add(stars);

    const planet = new THREE.Group();
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(7, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x1e3f8f, roughness: 0.8, emissive: 0x0a1a40 }));
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(7.6, 64, 64), new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending,
      vertexShader: 'varying vec3 n; void main(){ n=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'varying vec3 n; void main(){ float i=pow(0.7-dot(n,vec3(0,0,1.)),3.); gl_FragColor=vec4(0.56,0.79,1.,1.)*i; }',
    }));
    const ring = new THREE.Mesh(new THREE.RingGeometry(9.5, 13, 128),
      new THREE.MeshBasicMaterial({ color: 0x8fcaff, side: THREE.DoubleSide, transparent: true, opacity: 0.25 }));
    ring.rotation.x = Math.PI / 2.3;
    planet.add(sphere, atmo, ring);
    planet.position.set(14, 2, -10);
    scene.add(planet);
    scene.add(new THREE.AmbientLight(0x404a66, 0.6));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(-20, 10, 15); scene.add(sun);

    const resize = () => {
      const w = innerWidth, h = innerHeight;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      planet.position.x = w < 768 ? 4 : 14; planet.position.y = w < 768 ? 9 : 2;
    };
    resize(); addEventListener('resize', resize);
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
    addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      const s = scrollY / innerHeight;
      stars.rotation.y += 0.0003; stars.rotation.x = s * 0.15;
      sphere.rotation.y += 0.002;
      planet.position.z = -10 - s * 12; planet.rotation.z = s * 0.3;
      camera.position.x += (mouse.x * 4 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', onMove);
      renderer.dispose(); el.innerHTML = '';
    };
  }, []);
  return <div ref={ref} className="space-bg" aria-hidden />;
}
