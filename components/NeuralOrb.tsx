"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function NeuralOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 4.5;

    // —— Outer particle shell ——
    const PARTICLE_COUNT = 420;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 0.7;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00dcff, size: 0.022, transparent: true, opacity: 0.85 });
    const particleCloud = new THREE.Points(pGeo, pMat);
    scene.add(particleCloud);

    // —— Inner wireframe sphere ——
    const wMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 22, 22),
      new THREE.MeshBasicMaterial({ color: 0x00dcff, wireframe: true, transparent: true, opacity: 0.045 })
    );
    scene.add(wMesh);

    // —— Core glow sphere ——
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.18 })
    );
    scene.add(coreMesh);

    // —— Orbital rings ——
    const RING_CONFIGS = [
      { radius: 1.45, tube: 0.004, color: 0x00dcff, opacity: 0.45, rx: 0, ry: 0 },
      { radius: 1.65, tube: 0.003, color: 0x0066ff, opacity: 0.3, rx: Math.PI / 3, ry: 0.4 },
      { radius: 1.85, tube: 0.002, color: 0x7c3aed, opacity: 0.2, rx: Math.PI / 1.8, ry: 0.9 },
    ];
    const rings = RING_CONFIGS.map(({ radius, tube, color, opacity, rx, ry }) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 6, 140),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      ring.rotation.x = rx;
      ring.rotation.y = ry;
      scene.add(ring);
      return ring;
    });

    // —— Neural connection lines between nearest particles ——
    const LINE_COUNT = 60;
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0080ff, transparent: true, opacity: 0.12 });
    for (let i = 0; i < LINE_COUNT; i++) {
      const a = Math.floor(Math.random() * PARTICLE_COUNT);
      const b = Math.floor(Math.random() * PARTICLE_COUNT);
      const pts = [
        new THREE.Vector3(pPositions[a*3], pPositions[a*3+1], pPositions[a*3+2]),
        new THREE.Vector3(pPositions[b*3], pPositions[b*3+1], pPositions[b*3+2]),
      ];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    // —— Mouse reactivity ——
    let targetX = 0, targetY = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // —— Animation loop ——
    let rafId: number;
    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.007;

      particleCloud.rotation.y += 0.003;
      particleCloud.rotation.x += 0.0008;
      wMesh.rotation.y -= 0.005;
      wMesh.rotation.z += 0.001;
      rings[0].rotation.z += 0.004;
      rings[1].rotation.z -= 0.003;
      rings[2].rotation.z += 0.002;

      // Smooth mouse tracking
      scene.rotation.y += (targetX * 0.3 - scene.rotation.y) * 0.03;
      scene.rotation.x += (targetY * 0.2 - scene.rotation.x) * 0.03;

      // Core breathe
      const breathe = 1 + Math.sin(t * 1.5) * 0.1;
      coreMesh.scale.setScalar(breathe);
      (coreMesh.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(t) * 0.08;

      // Particle shimmer
      pMat.opacity = 0.7 + Math.sin(t * 0.8) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pGeo.dispose(); pMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden
      style={{ display: "block" }}
    />
  );
}
