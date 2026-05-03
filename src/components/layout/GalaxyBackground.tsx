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
// Stars fly in and BUILD the figure silhouette and the 7 chakras.

function CustomConstellationFigure() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.2;
      return {
        pathLength: 1,
        opacity: [0, 0.9, 0.7], // Increased opacity for better visibility
        transition: {
          pathLength: { delay, type: "tween", duration: 5, ease: "easeInOut" },
          opacity: { delay, duration: 3 }
        }
      };
    }
  };

  // Chakras positioned down the center axis (X=200)
  const chakras = [
    { id: 'root', cy: 360, color: '#ff3333' },
    { id: 'sacral', cy: 310, color: '#ff9933' },
    { id: 'solar', cy: 260, color: '#ffff66' },
    { id: 'heart', cy: 200, color: '#33ff77' },
    { id: 'throat', cy: 135, color: '#33ccff' },
    { id: 'thirdeye', cy: 90, color: '#9933ff' },
    { id: 'crown', cy: 50, color: '#e6ccff' }
  ];

  return (
    <svg viewBox="0 0 400 450" className="w-[600px] max-w-[90vw] h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-visible">
      <defs>
        <filter id="chakra-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Adjusted blur to maintain human shape while still looking like a soft cloud */}
        <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>

      {/* Exact Stylized Geometric Figure - FAINT CLOUD BLUR */}
      <motion.g 
        stroke="rgba(200, 220, 255, 0.8)" 
        strokeWidth="35" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#line-glow)"
      >
        {/* Head (Oval) */}
        <motion.ellipse 
          cx="200" cy="80" rx="35" ry="45"
          custom={1} variants={draw} initial="hidden" animate="visible" 
        />
        
        {/* Neck Bell */}
        <motion.path 
          d="M 190 125 C 190 135, 185 140, 185 140 L 215 140 C 215 140, 210 135, 210 125 Z" 
          custom={1.5} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Upper Chest Arc */}
        <motion.path 
          d="M 110 190 Q 200 100 290 190" 
          custom={2} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Shoulder Joints */}
        <motion.circle cx="110" cy="190" r="16" custom={2.5} variants={draw} initial="hidden" animate="visible" />
        <motion.circle cx="290" cy="190" r="16" custom={2.5} variants={draw} initial="hidden" animate="visible" />

        {/* Inner Chest Line */}
        <motion.path 
          d="M 125 195 Q 200 220 275 195" 
          custom={3} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Belly U-Shape */}
        <motion.path 
          d="M 125 195 C 100 330, 150 360, 200 360 C 250 360, 300 330, 275 195" 
          custom={3.5} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Left Arm (Double Lines for 2D Volume - Straighter natural drape) */}
        <motion.path 
          d="M 95 190 C 85 250, 65 320, 55 380" 
          custom={4} variants={draw} initial="hidden" animate="visible" 
        />
        <motion.path 
          d="M 125 190 C 115 250, 95 320, 85 380" 
          custom={4.2} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Right Arm (Double Lines for 2D Volume - Straighter natural drape) */}
        <motion.path 
          d="M 305 190 C 315 250, 335 320, 345 380" 
          custom={4} variants={draw} initial="hidden" animate="visible" 
        />
        <motion.path 
          d="M 275 190 C 285 250, 305 320, 315 380" 
          custom={4.2} variants={draw} initial="hidden" animate="visible" 
        />

        {/* Hand/Knee Joints */}
        <motion.circle cx="70" cy="380" r="16" custom={4.5} variants={draw} initial="hidden" animate="visible" />
        <motion.circle cx="330" cy="380" r="16" custom={4.5} variants={draw} initial="hidden" animate="visible" />

        {/* Legs (Lotus Position with Foot Loops & Diamond Center) */}
        <motion.path 
          d="M 200 330 L 70 380 C 30 400, 50 440, 90 420 L 200 390" 
          custom={5} variants={draw} initial="hidden" animate="visible" 
        />
        <motion.path 
          d="M 200 330 L 330 380 C 370 400, 350 440, 310 420 L 200 390" 
          custom={5.5} variants={draw} initial="hidden" animate="visible" 
        />
      </motion.g>

      {/* Chakras */}
      <motion.g>
        {chakras.map((chakra, i) => (
          <motion.circle
            key={chakra.id}
            cx={200}
            cy={chakra.cy}
            r={3} // Very small solid circles aligned precisely on the body
            fill={chakra.color}
            stroke="none"
            // No blur filter to keep them crisp and elegant like the image
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.6, 1, 0.6], 
              scale: [0.8, 1.2, 0.8] 
            }}
            transition={{ 
              delay: 3 + (6 - i) * 0.2, // Animate from root up to crown
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

function StarGatherFigure() {
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
        <CustomConstellationFigure />
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

