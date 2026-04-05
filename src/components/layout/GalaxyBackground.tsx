"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function WhiteGalaxy() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const particleCount = 8000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const armIndex = i % 4; 
      const theta = (2 * Math.PI * armIndex) / 4 + 2 * Math.PI * Math.random();
      const radius = Math.pow(Math.random(), 1.5) * 20; 
      const spinAngle = radius * 0.4; 

      const spread = (20 - radius) * 0.1 * (Math.random() - 0.5);

      const x = Math.cos(theta + spinAngle) * radius + spread * 8;
      const y = (Math.random() - 0.5) * 4 * (Math.random() > 0.5 ? 1 : -1) * (1 - radius / 20) + spread * 3;
      const z = Math.sin(theta + spinAngle) * radius + spread * 8;

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
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
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
      {/* Background Loop Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
      </video>

      {/* Galaxy 3D Overlay */}
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 8, 24], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={2} />
          <WhiteGalaxy />
        </Canvas>
      </div>

      {/* Subtle deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#030008]/80 z-[2]"></div>
    </div>
  );
}
