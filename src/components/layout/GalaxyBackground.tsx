"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

function FlatUniverse() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const particleCount = 20000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Generate a wide, endless flat surface to cover the dark edges fully
      // eslint-disable-next-line react-hooks/purity
      const x = (Math.random() - 0.5) * 400;
      // eslint-disable-next-line react-hooks/purity
      const y = (Math.random() - 0.5) * 0.2;
      // eslint-disable-next-line react-hooks/purity
      const z = (Math.random() - 0.5) * 400;

      positions.set([x, y, z], i * 3);

      // Bright space colors mapping
      // eslint-disable-next-line react-hooks/purity
      const choice = Math.random();
      if (choice < 0.4) color.set("#9F81B9"); // Primary Purple
      else if (choice < 0.6) color.set("#C6B3D9"); // Accent
      else if (choice < 0.8) color.set("#FFD6E8"); // Pink
      else color.set("#D6F1FF"); // Cyan

      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = Math.random() * 2; // eslint-disable-line react-hooks/purity
    }
    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Rotate the flat plane at the original speed
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Animate individual stars moving forward at normal speed
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sizes.length; i++) {
        const i3 = i * 3;
        // Move Z forward (towards the camera)
        positions[i3 + 2] += 0.05 + (sizes[i] * 0.02);

        // If a star passes behind the camera, reset it to the far distance
        if (positions[i3 + 2] > 200) {
          positions[i3 + 2] = -200;
          positions[i3] = (Math.random() - 0.5) * 400;
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Figure outline dots (white) ──
  const outlinePoints: { x: number; y: number; color: string; size: number }[] = [
    // HEAD
    ...[  [400,38],[416,40],[428,48],[436,62],[440,76],[438,92],[432,103],[422,115],
          [408,122],[400,124],[392,122],[378,115],[368,103],[362,92],[360,76],
          [364,62],[372,48],[384,40],
          // NECK
          [392,126],[408,126],[412,148],[388,148],
          // SHOULDERS LEFT
          [380,147],[360,150],[340,155],[318,162],[300,172],[285,185],[278,200],[278,215],
          // SHOULDERS RIGHT
          [420,147],[440,150],[460,155],[482,162],[500,172],[515,185],[522,200],[522,215],
          // TORSO LEFT
          [302,222],[298,245],[296,268],[298,290],[305,315],[318,335],[320,342],
          // TORSO RIGHT
          [498,222],[502,245],[504,268],[502,290],[495,315],[482,335],[480,342],
          // LEFT ARM outer
          [288,208],[275,220],[260,235],[246,255],[235,275],[228,298],[224,322],[228,348],[232,368],
          // LEFT ARM inner
          [304,222],[300,248],[292,278],[284,308],[276,340],[270,362],
          // RIGHT ARM outer
          [512,208],[525,220],[540,235],[554,255],[565,275],[572,298],[576,322],[572,348],[568,368],
          // RIGHT ARM inner
          [496,222],[500,248],[508,278],[516,308],[524,340],[530,362],
          // LEFT HAND
          [226,365],[222,378],[228,392],[240,400],[252,396],[264,386],[270,372],
          // RIGHT HAND
          [574,365],[578,378],[572,392],[560,400],[548,396],[536,386],[530,372],
          // LEFT LEG
          [320,348],[302,355],[272,365],[250,378],[228,392],[212,408],[205,422],
          [208,440],[218,452],[235,458],[255,454],[278,446],[305,435],[330,424],[350,415],[368,408],[388,406],
          // RIGHT LEG
          [480,348],[498,355],[528,365],[550,378],[572,392],[588,408],[595,422],
          [592,440],[582,452],[565,458],[545,454],[522,446],[495,435],[470,424],[450,415],[432,408],[412,406],
          // LEFT FOOT
          [200,422],[195,436],[200,452],[212,462],[226,465],[238,460],[248,450],[248,436],
          // RIGHT FOOT
          [600,422],[605,436],[600,452],[588,462],[574,465],[562,460],[552,450],[552,436],
    // eslint-disable-next-line react-hooks/purity
    ].map(([x, y]) => ({ x, y, color: "rgba(210,208,255,0.85)", size: Math.random() > 0.7 ? 2.2 : 1.5 })),
  ];

  // ── Chakra dots (large, colored, land ON the spine) ──
  const chakraPoints: { x: number; y: number; color: string; size: number; isChakra: boolean }[] = [
    { x: 400, y: 90,  color: "#A47ACC", size: 13, isChakra: true },
    { x: 400, y: 145, color: "#5E6C9E", size: 13, isChakra: true },
    { x: 400, y: 200, color: "#6AB6E0", size: 13, isChakra: true },
    { x: 400, y: 255, color: "#93C67C", size: 13, isChakra: true },
    { x: 400, y: 310, color: "#E5B84B", size: 13, isChakra: true },
    { x: 400, y: 365, color: "#EF965A", size: 13, isChakra: true },
    { x: 400, y: 420, color: "#DA5055", size: 13, isChakra: true },
  ];

  // Merge: outline first, then chakras on top
  const allPoints = [...outlinePoints, ...chakraPoints];

  // Pre-compute random start positions on all 4 screen edges — stable via useMemo
  const startPositions = useMemo<[number, number][]>(() =>
    allPoints.map(() => {
      // eslint-disable-next-line react-hooks/purity
      const edge = Math.floor(Math.random() * 4);
      switch (edge) {
        // eslint-disable-next-line react-hooks/purity
        case 0: return [-120 - Math.random() * 160, Math.random() * 600];
        // eslint-disable-next-line react-hooks/purity
        case 1: return [ 920 + Math.random() * 160, Math.random() * 600];
        // eslint-disable-next-line react-hooks/purity
        case 2: return [Math.random() * 800, -120 - Math.random() * 160];
        // eslint-disable-next-line react-hooks/purity
        default:return [Math.random() * 800,  720 + Math.random() * 160];
      }
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Enhanced Bluish Blur Effect for Visibility — fades in after stars arrive */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 2.5 }}
      >
        <div className="w-[600px] h-[800px] bg-blue-900/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute w-[400px] h-[600px] bg-indigo-500/20 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,20,60,0.8)_0%,rgba(5,10,30,0.5)_40%,transparent_70%)] pointer-events-none mix-blend-multiply" />
      </motion.div>

      {/* Breathing wrapper — starts after stars have assembled */}
      <motion.div
        className="w-full max-w-[1000px] h-[95vh] scale-[1.0] md:scale-[0.8] transform origin-center"
        initial={{ scale: 0.97 }}
        animate={{ scale: [0.95, 1.07, 0.95] }}
        transition={{ delay: 5, duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          
          {/* ── Blurred soft silhouette fades in AFTER stars land ── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 2.5 }}
            stroke="rgba(200,200,255,0.5)" strokeLinecap="round" strokeLinejoin="round" fill="rgba(200,200,255,0.02)"
          >
            {/* Head */}
            <path d="M 400,38 C 418,38 432,48 436,62 C 440,76 438,92 432,103 C 426,113 416,120 408,122 C 404,123 402,126 402,130 L 398,130 C 398,126 396,123 392,122 C 384,120 374,113 368,103 C 362,92 360,76 364,62 C 368,48 382,38 400,38 Z"
              strokeWidth="5" className="blur-[14px]" />
            {/* Neck */}
            <path d="M 395,128 C 392,130 389,138 388,148 L 412,148 C 411,138 408,130 405,128 Z"
              strokeWidth="5" className="blur-[14px]" />
            {/* Shoulders */}
            <path d="M 388,146 C 375,146 355,148 335,155 C 308,165 290,180 280,197 C 274,208 272,218 278,225 C 284,232 294,230 302,224 C 312,216 318,205 330,198 C 342,191 360,188 375,187 C 385,186 393,186 400,186 C 407,186 415,186 425,187 C 440,188 458,191 470,198 C 482,205 488,216 498,224 C 506,230 516,232 522,225 C 528,218 526,208 520,197 C 510,180 492,165 465,155 C 445,148 425,146 412,146 Z"
              strokeWidth="6" className="blur-[16px]" />
            {/* Torso */}
            <path d="M 302,218 C 298,240 296,265 298,288 C 300,310 308,328 320,338 C 332,348 350,352 365,352 L 400,352 L 435,352 C 450,352 468,348 480,338 C 492,328 500,310 502,288 C 504,265 502,240 498,218 C 488,225 478,230 468,232 C 452,236 432,238 415,238 C 408,238 400,239 400,239 C 400,239 392,238 385,238 C 368,238 348,236 332,232 C 322,230 312,225 302,218 Z"
              strokeWidth="6" className="blur-[16px]" />
            {/* Left Arm */}
            <path d="M 290,205 C 278,215 262,230 248,252 C 236,272 228,295 225,318 C 222,338 224,355 230,365 C 236,375 244,380 252,378 C 260,376 268,368 274,356 C 280,344 282,328 285,312 C 288,296 292,278 298,262 C 302,250 306,238 304,222 Z"
              strokeWidth="6" className="blur-[16px]" />
            {/* Right Arm */}
            <path d="M 510,205 C 522,215 538,230 552,252 C 564,272 572,295 575,318 C 578,338 576,355 570,365 C 564,375 556,380 548,378 C 540,376 532,368 526,356 C 520,344 518,328 515,312 C 512,296 508,278 502,262 C 498,250 494,238 496,222 Z"
              strokeWidth="6" className="blur-[16px]" />
            {/* Left Hand */}
            <path d="M 228,362 C 224,370 222,380 225,388 C 228,396 236,400 244,400 C 252,400 262,396 268,388 C 272,382 272,374 268,366 Z"
              strokeWidth="5" className="blur-[14px]" />
            {/* Right Hand */}
            <path d="M 572,362 C 576,370 578,380 575,388 C 572,396 564,400 556,400 C 548,400 538,396 532,388 C 528,382 528,374 532,366 Z"
              strokeWidth="5" className="blur-[14px]" />
            {/* Left Leg */}
            <path d="M 320,345 C 300,352 270,362 248,375 C 226,388 210,402 205,418 C 200,432 206,445 218,452 C 230,458 248,458 268,452 C 290,446 315,434 338,424 C 358,415 376,408 388,406 L 400,406 C 390,400 375,390 360,378 C 348,368 335,356 320,345 Z"
              strokeWidth="7" className="blur-[18px]" />
            {/* Right Leg */}
            <path d="M 480,345 C 500,352 530,362 552,375 C 574,388 590,402 595,418 C 600,432 594,445 582,452 C 570,458 552,458 532,452 C 510,446 485,434 462,424 C 442,415 424,408 412,406 L 400,406 C 410,400 425,390 440,378 C 452,368 465,356 480,345 Z"
              strokeWidth="7" className="blur-[18px]" />
            {/* Left Foot */}
            <path d="M 200,418 C 192,428 192,442 200,452 C 208,462 222,466 234,462 C 246,458 254,448 252,436 C 250,424 238,416 224,416 Z"
              strokeWidth="5" className="blur-[14px]" />
            {/* Right Foot */}
            <path d="M 600,418 C 608,428 608,442 600,452 C 592,462 578,466 566,462 C 554,458 546,448 548,436 C 550,424 562,416 576,416 Z"
              strokeWidth="5" className="blur-[14px]" />
          </motion.g>

          {/* ── Star particles ── */}
          {allPoints.map((pt, i) => {
            const [sx, sy] = startPositions[i];
            const delay    = 2 + i * 0.011;
            const isChakra = (pt as { isChakra?: boolean }).isChakra ?? false;
            return (
              <g key={i}>
                {/* Ripple ring for chakra dots only */}
                {isChakra && (
                  <motion.circle
                    cx={pt.x} cy={pt.y} r={pt.size}
                    fill="transparent"
                    stroke={pt.color}
                    strokeWidth="1.5"
                    initial={{ opacity: 0 }}
                    animate={{ r: [pt.size, pt.size + 20, pt.size], opacity: [0, 0.5, 0] }}
                    transition={{ delay: 5 + i * 0.1, duration: 3, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* The star particle itself */}
                <motion.circle
                  r={pt.size}
                  fill={pt.color}
                  initial={{ cx: sx, cy: sy, opacity: 0 }}
                  animate={{
                    cx: pt.x,
                    cy: pt.y,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    cx:      { delay, duration: 2.2, ease: "easeInOut" },
                    cy:      { delay, duration: 2.2, ease: "easeInOut" },
                    opacity: {
                      delay,
                      duration: 5,
                      times: [0, 0.45, 1],
                      ease: "easeInOut",
                    },
                  }}
                  style={isChakra ? { filter: `drop-shadow(0 0 8px ${pt.color})` } : undefined}
                />
              </g>
            );
          })}
        </svg>
      </motion.div>
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
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
            style={{ filter: "hue-rotate(150deg) saturate(1.2)" }}
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Three.js star field */}
      <div className="absolute inset-0 z-[1]" style={{ position: "relative" }}>
        <Canvas
          camera={{ position: [0, 8, 24], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={() => {
            // Suppress the deprecated THREE.Clock warning from r3f internals
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

