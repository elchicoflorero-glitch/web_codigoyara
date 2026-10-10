import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js orbital core — layered wireframe geometries
 * rotating on multiple axes with a glowing bloom effect.
 */
export default function OrbitalThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 260;
    const H = mount.clientHeight || 260;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 4.2;

    // Materials
    const mats = [
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.55 }),
      new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.25 }),
    ];

    // Geometries
    const icosa  = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), mats[0]);
    const torus  = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.04, 8, 64), mats[1]);
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(1.1,  0.03, 8, 48), mats[2]);
    const octa   = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), mats[1]);

    torus.rotation.x  = Math.PI / 2.2;
    torus2.rotation.x = Math.PI / 3.5;
    torus2.rotation.z = Math.PI / 4;

    scene.add(icosa, torus, torus2, octa);

    // Particles inside
    const pGeo = new THREE.BufferGeometry();
    const pCount = 280;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 0.5 + Math.random() * 0.9;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8b5cf6, size: 0.032,
      transparent: true, opacity: 0.7,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top)  / H - 0.5) * 2;
    };
    mount.addEventListener("mousemove", onMove);

    // Animation
    let frame = 0;
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame += 0.008;

      icosa.rotation.x  += 0.004;
      icosa.rotation.y  += 0.006;
      octa.rotation.x   -= 0.005;
      octa.rotation.z   += 0.004;
      torus.rotation.z  += 0.003;
      torus2.rotation.y += 0.005;

      // Subtle parallax
      scene.rotation.y += (mouse.x * 0.3 - scene.rotation.y) * 0.05;
      scene.rotation.x += (-mouse.y * 0.2 - scene.rotation.x) * 0.05;

      // Pulse opacity
      mats[0].opacity = 0.45 + Math.sin(frame * 1.2) * 0.1;
      mats[1].opacity = 0.3  + Math.sin(frame * 0.9 + 1) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const ro = new ResizeObserver(() => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener("mousemove", onMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="orbital-three" aria-hidden="true" />;
}
