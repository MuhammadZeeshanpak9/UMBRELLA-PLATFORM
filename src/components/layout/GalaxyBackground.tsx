"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
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
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 0.2;
      const z = (Math.random() - 0.5) * 400;

      positions.set([x, y, z], i * 3);

      // Bright space colors mapping
      const choice = Math.random();
      if (choice < 0.4) color.set("#9F81B9"); // Primary Purple
      else if (choice < 0.6) color.set("#C6B3D9"); // Accent
      else if (choice < 0.8) color.set("#FFD6E8"); // Pink
      else color.set("#D6F1FF"); // Cyan

      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = Math.random() * 2;
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

function ChakraOverlay() {
  // Using exactly requested text and a dull, non-shiny, matte color palette
  const chakras = [
    { id: "crown", color: "#A47ACC", cy: 90 }, 
    { id: "third-eye", color: "#5E6C9E", cy: 145 },
    { id: "throat", color: "#6AB6E0", cy: 200 },
    { id: "heart", color: "#93C67C", cy: 255 },
    { id: "solar", color: "#E5B84B", cy: 310 },
    { id: "sacral", color: "#EF965A", cy: 365 },
    { id: "root", color: "#DA5055", cy: 420 },
  ];

  return (
    <div className="fixed inset-0 z-[3] pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Deep Blue radial opacity shield to separate from background noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,15,45,0.75)_0%,rgba(5,10,30,0.4)_40%,transparent_70%)] pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,15,45,0.6)_0%,transparent_60%)] pointer-events-none" />

      {/* Wrapping layer scaled up considerably */}
      {/* Breathing wrapper — the whole figure slowly inhales & exhales */}
      <motion.div
        className="w-full max-w-[1000px] h-[95vh] flex items-center justify-center opacity-[0.95] relative scale-[1.0] md:scale-[0.8] transform origin-center"
        animate={{ scale: [0.95, 1.07, 0.95] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" preserveAspectRatio="xMidYMid meet">
           
           {/* ─── REALISTIC MEDITATION FIGURE ─── */}
           {/* Each body part is its own path for anatomical precision */}
           
           {/* HEAD — slightly elongated oval, human proportions */}
           <path
             d="M 400,38 C 418,38 432,48 436,62 C 440,76 438,92 432,103 C 426,113 416,120 408,122 C 404,123 402,126 402,130 L 398,130 C 398,126 396,123 392,122 C 384,120 374,113 368,103 C 362,92 360,76 364,62 C 368,48 382,38 400,38 Z"
             stroke="rgba(200,200,255,0.55)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />

           {/* NECK */}
           <path
             d="M 395,128 C 392,130 389,138 388,148 L 412,148 C 411,138 408,130 405,128 Z"
             stroke="rgba(200,200,255,0.5)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />

           {/* SHOULDERS & UPPER TORSO — wide trapezoid with natural deltoid curves */}
           <path
             d="M 388,146
                C 375,146 355,148 335,155
                C 308,165 290,180 280,197
                C 274,208 272,218 278,225
                C 284,232 294,230 302,224
                C 312,216 318,205 330,198
                C 342,191 360,188 375,187
                C 385,186 393,186 400,186
                C 407,186 415,186 425,187
                C 440,188 458,191 470,198
                C 482,205 488,216 498,224
                C 506,230 516,232 522,225
                C 528,218 526,208 520,197
                C 510,180 492,165 465,155
                C 445,148 425,146 412,146 Z"
             stroke="rgba(200,200,255,0.5)" strokeWidth="6" fill="rgba(200,200,255,0.03)"
             className="blur-[16px]"
           />

           {/* TORSO — chest down to hips, anatomical taper */}
           <path
             d="M 302,218
                C 298,240 296,265 298,288
                C 300,310 308,328 320,338
                C 332,348 350,352 365,352
                L 400,352
                L 435,352
                C 450,352 468,348 480,338
                C 492,328 500,310 502,288
                C 504,265 502,240 498,218
                C 488,225 478,230 468,232
                C 452,236 432,238 415,238
                C 408,238 400,239 400,239
                C 400,239 392,238 385,238
                C 368,238 348,236 332,232
                C 322,230 312,225 302,218 Z"
             stroke="rgba(200,200,255,0.45)" strokeWidth="6" fill="rgba(200,200,255,0.03)"
             className="blur-[16px]"
           />

           {/* LEFT ARM — natural drape from shoulder down to resting hand on knee */}
           <path
             d="M 290,205
                C 278,215 262,230 248,252
                C 236,272 228,295 225,318
                C 222,338 224,355 230,365
                C 236,375 244,380 252,378
                C 260,376 268,368 274,356
                C 280,344 282,328 285,312
                C 288,296 292,278 298,262
                C 302,250 306,238 304,222 Z"
             stroke="rgba(200,200,255,0.5)" strokeWidth="6" fill="rgba(200,200,255,0.03)"
             className="blur-[16px]"
           />

           {/* RIGHT ARM */}
           <path
             d="M 510,205
                C 522,215 538,230 552,252
                C 564,272 572,295 575,318
                C 578,338 576,355 570,365
                C 564,375 556,380 548,378
                C 540,376 532,368 526,356
                C 520,344 518,328 515,312
                C 512,296 508,278 502,262
                C 498,250 494,238 496,222 Z"
             stroke="rgba(200,200,255,0.5)" strokeWidth="6" fill="rgba(200,200,255,0.03)"
             className="blur-[16px]"
           />

           {/* LEFT HAND resting lightly on left knee */}
           <path
             d="M 228,362
                C 224,370 222,380 225,388
                C 228,396 236,400 244,400
                C 252,400 262,396 268,388
                C 272,382 272,374 268,366 Z"
             stroke="rgba(200,200,255,0.45)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />

           {/* RIGHT HAND */}
           <path
             d="M 572,362
                C 576,370 578,380 575,388
                C 572,396 564,400 556,400
                C 548,400 538,396 532,388
                C 528,382 528,374 532,366 Z"
             stroke="rgba(200,200,255,0.45)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />

           {/* LOTUS LEGS — wide crossed form, left shin over right */}
           {/* Left Leg */}
           <path
             d="M 320,345
                C 300,352 270,362 248,375
                C 226,388 210,402 205,418
                C 200,432 206,445 218,452
                C 230,458 248,458 268,452
                C 290,446 315,434 338,424
                C 358,415 376,408 388,406
                L 400,406
                C 390,400 375,390 360,378
                C 348,368 335,356 320,345 Z"
             stroke="rgba(200,200,255,0.45)" strokeWidth="7" fill="rgba(200,200,255,0.03)"
             className="blur-[18px]"
           />

           {/* Right Leg */}
           <path
             d="M 480,345
                C 500,352 530,362 552,375
                C 574,388 590,402 595,418
                C 600,432 594,445 582,452
                C 570,458 552,458 532,452
                C 510,446 485,434 462,424
                C 442,415 424,408 412,406
                L 400,406
                C 410,400 425,390 440,378
                C 452,368 465,356 480,345 Z"
             stroke="rgba(200,200,255,0.45)" strokeWidth="7" fill="rgba(200,200,255,0.03)"
             className="blur-[18px]"
           />

           {/* LEFT FOOT peeking out from under right leg */}
           <path
             d="M 200,418 C 192,428 192,442 200,452 C 208,462 222,466 234,462 C 246,458 254,448 252,436 C 250,424 238,416 224,416 Z"
             stroke="rgba(200,200,255,0.4)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />
           {/* RIGHT FOOT */}
           <path
             d="M 600,418 C 608,428 608,442 600,452 C 592,462 578,466 566,462 C 554,458 546,448 548,436 C 550,424 562,416 576,416 Z"
             stroke="rgba(200,200,255,0.4)" strokeWidth="5" fill="rgba(200,200,255,0.03)"
             className="blur-[14px]"
           />

           {/* Chakras — sequential energy pulse cascading Crown → Root */}
           {chakras.map((c, i) => (
             <g key={c.id}>

               {/* Ripple ring — expands outward on each pulse */}
               <motion.circle
                 cx="400" cy={c.cy} r="15"
                 fill="transparent"
                 stroke={c.color}
                 strokeWidth="1.5"
                 animate={{ r: [15, 34, 15], opacity: [0.6, 0, 0.6] }}
                 transition={{
                   duration: 3,
                   repeat: Infinity,
                   delay: i * 0.5,
                   ease: "easeOut",
                 }}
               />

               {/* Core orb — brightens and slightly scales on its turn */}
               <motion.circle
                 cx="400" cy={c.cy} r="15"
                 fill={c.color}
                 animate={{
                   opacity: [0.6, 1, 0.6],
                   r: [14, 17, 14],
                 }}
                 transition={{
                   duration: 3,
                   repeat: Infinity,
                   delay: i * 0.5,
                   ease: "easeInOut",
                 }}
                 style={{ filter: `drop-shadow(0 0 12px ${c.color})` }}
               />

               {/* Inner highlight ring */}
               <circle cx="400" cy={c.cy} r="11" fill="transparent" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
               <circle cx="400" cy={c.cy} r="7" fill="transparent" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
             </g>
           ))}
        </svg>
      </motion.div>
    </div>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none bg-[#030008]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Increased scale to 6 to fully stretch across the screen edges */}
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

      {/* Galaxy 3D Overlay */}
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 8, 24], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={2} />
          <FlatUniverse />
        </Canvas>
      </div>

      {/* Subtle deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#030008]/80 z-[2]"></div>
      
      {/* Diagram & Chakra Layer */}
      <ChakraOverlay />
    </div>
  );
}
