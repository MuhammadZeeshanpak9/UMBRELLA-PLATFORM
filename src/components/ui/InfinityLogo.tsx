"use client";

import React from "react";
import { motion } from "framer-motion";

// Portrait viewBox (50x100) draws the path as a vertical figure-8 / number 8
// Energy flows from bottom (Root) through center crossover, loops top to bottom.
const EIGHT_PATH = "M 25,90 A 17,17 0 0,1 8,73 C 8,60 15,50 25,50 C 35,50 42,40 42,27 A 17,17 0 1,0 8,27 C 8,40 15,50 25,50 C 35,50 42,60 42,73 A 17,17 0 0,1 25,90 Z";

export function InfinityLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 50 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        {/* Base Gradient - Swapped for more obvious contrast at top */}
        <linearGradient id="eightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a3e6ff" />
          <stop offset="40%" stopColor="#FFD6E8" />
          <stop offset="100%" stopColor="#9f81b9" />
        </linearGradient>

        {/* Chakra Energy Gradient */}
        <linearGradient id="chakraGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF4D4D" /> {/* Root */}
          <stop offset="15%" stopColor="#FFA34D" /> {/* Sacral */}
          <stop offset="30%" stopColor="#FFE64D" /> {/* Solar */}
          <stop offset="45%" stopColor="#4DFF4D" /> {/* Heart */}
          <stop offset="60%" stopColor="#4DFFFF" /> {/* Throat */}
          <stop offset="75%" stopColor="#A34DFF" /> {/* Third Eye */}
          <stop offset="100%" stopColor="#9f81b9" /> {/* Crown */}
        </linearGradient>

        <filter id="eightGlow" x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="chakraPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
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
        opacity="0.3"
      />
      
      {/* Main crisp layer */}
      <path 
        d={EIGHT_PATH}
        stroke="url(#eightGrad)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Chakra Energy Flow Layer */}
      <motion.path 
        d={EIGHT_PATH}
        stroke="url(#chakraGrad)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#chakraPulseGlow)"
        initial={{ pathLength: 1, pathOffset: 0, opacity: 0.7 }}
        animate={{ 
          opacity: 0.8,
          pathLength: 1
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Secondary sharper energy highlight - keeping it subtle and steady */}
      <motion.path 
        d={EIGHT_PATH}
        stroke="white" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={{ pathLength: 1, opacity: 0.2 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.svg>
  );
}

export function Elev8LogoText({ 
  className = "", 
  textClassName = "", 
  iconClassName = ""
}: { 
  className?: string, 
  textClassName?: string, 
  iconClassName?: string
}) {
  // Strip any old margin classes to universally control the spacing here safely
  const strippedIconClass = iconClassName.replace(/\bm[lxyr]?-\[[^\]]+\]\b/g, "").trim();

  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <span className={textClassName}>ELEV</span>
      <InfinityLogo 
        className={`inline-block flex-shrink-0 -ml-[0.10em] mr-[0.02em] ${strippedIconClass}`} 
      />
    </span>
  );
}

export function ReplaceElev8({ 
  text, 
  className = "", 
  textClassName = "", 
  iconClassName = ""
}: { 
  text: string, 
  className?: string, 
  textClassName?: string, 
  iconClassName?: string
}) {
  if (!text.includes("ELEV8")) return <>{text}</>;
  
  const parts = text.split("ELEV8");
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <Elev8LogoText 
              className={className} 
              textClassName={textClassName} 
              iconClassName={iconClassName} 
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

