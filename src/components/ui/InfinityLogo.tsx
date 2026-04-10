"use client";

import React from "react";
import { motion } from "framer-motion";

// Portrait viewBox (50x100) draws the path as a vertical figure-8 / number 8
const EIGHT_PATH = "M 25,50 C 35,50 42,40 42,27 A 17,17 0 1,0 8,27 C 8,40 15,50 25,50 C 15,50 8,60 8,73 A 17,17 0 1,0 42,73 C 42,60 35,50 25,50 Z";

export function InfinityLogo({ className = "", animated = false }: { className?: string, animated?: boolean }) {
  return (
    <motion.svg 
      viewBox="0 0 50 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      animate={{ y: [0, -2, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="eightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9f81b9" />
          <stop offset="50%" stopColor="#FFD6E8" />
          <stop offset="100%" stopColor="#a3e6ff" />
        </linearGradient>
        <filter id="eightGlow" x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Glow layer */}
      <path 
        d={EIGHT_PATH}
        stroke="url(#eightGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#eightGlow)"
        opacity="0.5"
      />
      
      {/* Main crisp layer */}
      <motion.path 
        d={EIGHT_PATH}
        stroke="url(#eightGrad)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export function Elev8LogoText({ 
  className = "", 
  textClassName = "", 
  iconClassName = "", 
  animated = false 
}: { 
  className?: string, 
  textClassName?: string, 
  iconClassName?: string, 
  animated?: boolean 
}) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <span className={textClassName}>ELEV</span>
      <InfinityLogo 
        className={`inline-block flex-shrink-0 ${iconClassName}`} 
        animated={animated} 
      />
    </span>
  );
}

