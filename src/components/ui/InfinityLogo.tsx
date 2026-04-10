"use client";

import React from "react";
import { motion } from "framer-motion";

export function InfinityLogo({ className = "", animated = false }: { className?: string, animated?: boolean }) {
  return (
    <svg 
      viewBox="0 0 100 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9f81b9" />
          <stop offset="50%" stopColor="#FFD6E8" />
          <stop offset="100%" stopColor="#a3e6ff" />
        </linearGradient>
        <filter id="infinityGlow" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="2" result="blur" />
           <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background glow layer */}
      <path 
        d="M 25, 40 A 15, 15 0 1, 1 25, 10 C 45, 10 55, 40 75, 40 A 15, 15 0 1, 0 75, 10 C 55, 10 45, 40 25, 40 Z" 
        stroke="url(#infinityGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        filter="url(#infinityGlow)"
        opacity="0.6"
      />
      
      {/* Main sharp layer */}
      <motion.path 
        d="M 25, 40 A 15, 15 0 1, 1 25, 10 C 45, 10 55, 40 75, 40 A 15, 15 0 1, 0 75, 10 C 55, 10 45, 40 25, 40 Z" 
        stroke="url(#infinityGrad)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Elev8LogoText({ className = "", textClassName = "", iconClassName = "", animated = false }: { className?: string, textClassName?: string, iconClassName?: string, animated?: boolean }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className={textClassName}>ELEV</span>
      <InfinityLogo className={`w-[1.2em] h-[0.6em] ml-[0.05em] flex-shrink-0 relative ${iconClassName}`} animated={animated} />
    </span>
  );
}
