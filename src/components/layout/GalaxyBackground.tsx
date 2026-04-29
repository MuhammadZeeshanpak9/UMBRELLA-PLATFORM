"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

function FlatUniverse() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors, sizes, resetX] = useMemo(() => {
    const particleCount = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 8000 : 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const resetX = new Float32Array(particleCount);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // eslint-disable-next-line react-hooks/purity
      const x = (Math.random() - 0.5) * 400;
      // eslint-disable-next-line react-hooks/purity
      const y = (Math.random() - 0.5) * 0.2;
      // eslint-disable-next-line react-hooks/purity
      const z = (Math.random() - 0.5) * 400;

      positions.set([x, y, z], i * 3);

      // eslint-disable-next-line react-hooks/purity
      const choice = Math.random();
      if (choice < 0.4) color.set("#9F81B9");
      else if (choice < 0.6) color.set("#C6B3D9");
      else if (choice < 0.8) color.set("#FFD6E8");
      else color.set("#D6F1FF");

      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = Math.random() * 2; // eslint-disable-line react-hooks/purity
      // Pre-compute reset X positions — eliminates Math.random() from the hot useFrame loop
      resetX[i] = (Math.random() - 0.5) * 400; // eslint-disable-line react-hooks/purity
    }
    return [positions, colors, sizes, resetX];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;

      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sizes.length; i++) {
        const i3 = i * 3;
        positions[i3 + 2] += 0.05 + (sizes[i] * 0.02);

        if (positions[i3 + 2] > 200) {
          positions[i3 + 2] = -200;
          positions[i3] = resetX[i]; // pre-computed — no Math.random() in hot path
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── UNIFIED STAR GATHER + CHAKRA COMPONENT ───────────────────────────────
// Nothing is visible on load. Stars fly in from all edges and BUILD
// both the figure silhouette (white dots) and the 7 chakras (colored orbs).
function StarGatherFigure() {
  // ── Figure Image ──
  // The client requested using an exact image instead of SVG curves
  // We will load this image from the public/Assets folder.

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Enhanced Bluish Blur Effect for Visibility */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2.5 }}
      >
        <div className="w-[600px] h-[800px] bg-blue-900/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute w-[400px] h-[600px] bg-indigo-500/20 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,20,60,0.8)_0%,rgba(5,10,30,0.5)_40%,transparent_70%)] pointer-events-none mix-blend-multiply" />
      </motion.div>

      {/* Breathing wrapper — CSS animation, zero Framer Motion RAF cost */}
      <div className="w-full max-w-[1000px] h-[95vh] scale-[1.0] md:scale-[0.8] transform origin-center figure-breathe relative flex items-center justify-center">
        
        {/* ── Exact Meditating Figure Image ── */}
        <motion.img
          src="/Assets/meditation-figure.png"
          alt="Meditating Figure"
          initial={{ 
            opacity: 0, 
            scale: 0.85,
            y: 40,
            // Starts as a bright, desaturated burst of pure light with a heavy blur
            filter: "hue-rotate(0deg) saturate(0) brightness(2.5) drop-shadow(0 0 80px rgba(255, 255, 255, 0.8)) blur(30px)"
          }}
          animate={{ 
            opacity: 0.45, 
            scale: 1,
            y: 0,
            // Settles into the deep indigo/purple theme
            filter: "hue-rotate(45deg) saturate(1.2) brightness(1.2) drop-shadow(0 0 40px rgba(160, 130, 210, 0.4)) blur(0px)"
          }}
          transition={{ 
            delay: 1.0, 
            duration: 8, 
            ease: "easeInOut" 
          }}
          className="w-full h-full object-contain pointer-events-none mix-blend-screen"
        />
        
      </div>
    </div>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none bg-[#030008]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Flat universe video — perspective tilted to look like a surface */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: "perspective(1200px) rotateX(75deg) scale(6) translateY(-10%)", transformOrigin: "center center" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
            style={{ filter: "hue-rotate(150deg) saturate(1.2)", willChange: "transform" }}
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Three.js star field */}
      <div className="absolute inset-0 z-[1] galaxy-canvas" style={{ position: "relative" }}>
        <Canvas
          camera={{ position: [0, 8, 24], fov: 60 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          onCreated={() => {
            const originalWarn = console.warn.bind(console);
            console.warn = (...args: unknown[]) => {
              if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
              originalWarn(...args);
            };
          }}
        >
          <ambientLight intensity={2} />
          <FlatUniverse />
        </Canvas>
      </div>

      {/* Deep gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#030008]/80 z-[2]"></div>

      {/* ✨ Stars gather to form figure + chakra colors — nothing visible on load */}
      <StarGatherFigure />
    </div>
  );
}

