import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ModelViewerProps {
  modelUrl: string;
  textureUrl?: string;
  height?: number;
  autoRotate?: boolean;
  enableControls?: boolean;
  scale?: number;
}

export default function ModelViewer({
  modelUrl,
  textureUrl,
  height = 520,
  autoRotate = true,
  enableControls = true,
  scale,
}: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight || height;
    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ─────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 3.5);

    // ── Lights ─────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 5, 3);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffd21f, 0.8);
    fill.position.set(-3, 2, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x88aaff, 0.5);
    rim.position.set(0, -2, -3);
    scene.add(rim);

    // ── Controls ───────────────────────────────────────────
    let controls: OrbitControls | null = null;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enableZoom = true;
      controls.minDistance = 1.5;
      controls.maxDistance = 8;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;
      controls.target.set(0, 0, 0);
    }

    // ── Load texture ───────────────────────────────────────
    let texture: THREE.Texture | null = null;
    if (textureUrl) {
      const texLoader = new THREE.TextureLoader();
      texture = texLoader.load(textureUrl);
      texture.colorSpace = THREE.SRGBColorSpace;
    }

    // ── Load GLTF model ────────────────────────────────────
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;

        // Apply texture to all meshes
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = true;
            mesh.receiveShadow = true;
            if (texture) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                  if ((m as THREE.MeshStandardMaterial).map !== undefined) {
                    (m as THREE.MeshStandardMaterial).map = texture;
                    m.needsUpdate = true;
                  }
                });
              } else if ((mesh.material as THREE.MeshStandardMaterial).map !== undefined) {
                (mesh.material as THREE.MeshStandardMaterial).map = texture;
                mesh.material.needsUpdate = true;
              }
            }
          }
        });

        // Center + scale model
        const box    = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const autoScale = scale ?? (2.2 / maxDim);

        model.scale.setScalar(autoScale);
        model.position.sub(center.multiplyScalar(autoScale));

        scene.add(model);

        // Play animations if any
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer!.clipAction(clip).play();
          });
        }
      },
      undefined,
      (err) => console.error("[ModelViewer] Error loading model:", err)
    );

    // ── Animate ─────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId   = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer?.update(delta);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nW = mount.clientWidth;
      const nH = mount.clientHeight || height;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls?.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [height, autoRotate, enableControls, modelUrl, textureUrl, scale]);

  return (
    <div
      ref={mountRef}
      className="model-viewer"
      style={{ height }}
      aria-label="Modelo 3D interactivo"
    />
  );
}
