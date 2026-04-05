"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

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
    </div>
  );
}
