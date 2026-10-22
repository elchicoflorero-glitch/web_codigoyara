import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useBg } from "@/lib/BgContext";
import { getBgVariant } from "@/lib/bgVariants";

/* ── Three.js hero background (original) ─────────────────── */
function ThreeHero({ mountRef }: { mountRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color("#7c3aed"), new THREE.Color("#4f46e5"),
      new THREE.Color("#0ea5e9"), new THREE.Color("#8b5cf6"),
      new THREE.Color("#06b6d4"),
    ];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Floating wireframe geometries
    const meshes: THREE.Mesh[] = [];
    const geos = [
      new THREE.IcosahedronGeometry(0.45, 1),
      new THREE.TorusGeometry(0.35, 0.12, 12, 40),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TorusKnotGeometry(0.3, 0.1, 64, 8),
    ];
    const positions3D = [[-3.2,1.8,-1],[3.0,-1.5,-2],[-2.5,-2.0,0.5],[2.8,1.6,-0.5]] as const;
    geos.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#7c3aed"), wireframe: true, transparent: true, opacity: 0.18 });
      const mesh = new THREE.Mesh(geo, mat);
      const [x, y, z] = positions3D[i];
      mesh.position.set(x, y, z);
      scene.add(mesh); meshes.push(mesh);
    });

    // Grid lines
    const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color("#4f46e5"), transparent: true, opacity: 0.06 });
    for (let i = -5; i <= 5; i++) {
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-11,i*1.2,-3),new THREE.Vector3(11,i*1.2,-3)]), lineMat));
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i*2,-7,-3),new THREE.Vector3(i*2,7,-3)]), lineMat));
    }

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = (e.clientX/window.innerWidth-0.5)*2; mouse.y = (e.clientY/window.innerHeight-0.5)*2; };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const animId = { current: 0 };
    const loop = () => {
      animId.current = requestAnimationFrame(loop);
      frame += 0.004;
      particles.rotation.y = frame * 0.06; particles.rotation.x = frame * 0.02;
      meshes.forEach((m, i) => { m.rotation.x += 0.003 + i * 0.001; m.rotation.y += 0.004 + i * 0.001; });
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.25 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [mountRef]);

  return null;
}

/* ── Canvas 2D background (all other variants) ───────────── */
function CanvasBg({ mountRef, bgId }: { mountRef: React.RefObject<HTMLDivElement | null>; bgId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mount  = mountRef.current;
    if (!canvas || !mount) return;

    // Append canvas to mount div
    canvas.style.position = "absolute";
    canvas.style.inset     = "0";
    canvas.style.width     = "100%";
    canvas.style.height    = "100%";
    mount.appendChild(canvas);

    const resize = () => {
      canvas.width  = mount.clientWidth;
      canvas.height = mount.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const variant = getBgVariant(bgId as any);
    const ctx = canvas.getContext("2d")!;

    // Clear for matrix on first frame
    if (bgId === "matrix") { ctx.fillStyle = "#000500"; ctx.fillRect(0, 0, canvas.width, canvas.height); }

    const loop = () => {
      tRef.current += 0.016;
      variant.draw(ctx, canvas.width, canvas.height, tRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
  }, [bgId, mountRef]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

/* ── Main component ──────────────────────────────────────── */
export default function ThreeBackground() {
  const { activeBg } = useBg();
  const mountRef = useRef<HTMLDivElement>(null);
  const variant = getBgVariant(activeBg);
  const { customVideoId } = useBg();

  // YouTube video background (lofi preset or custom)
  const ytId = variant.type === "youtube"
    ? variant.youtubeId
    : activeBg === "custom"
    ? (customVideoId ?? null)
    : null;

  if (ytId) {
    return (
      <div className="three-bg" aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "177.78vh", height: "100vh",
            minWidth: "100%", minHeight: "56.25vw",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
            opacity: 0.6,
          }}
          title="bg-video"
        />
      </div>
    );
  }

  return (
    <div ref={mountRef} className="three-bg" aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {activeBg === "hero"
        ? <ThreeHero mountRef={mountRef} />
        : <CanvasBg  mountRef={mountRef} bgId={activeBg} />
      }
    </div>
  );
}
