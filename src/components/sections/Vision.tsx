"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scalePulse = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 0.8]);
  const opacityPulse = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]);
  const rotatePulse = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yMove = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="vision" ref={containerRef} className="relative py-48 md:py-[30vh] z-10 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Animated Breathing Cosmos Singularity Orbs */}
      <motion.div 
        style={{ scale: scalePulse, rotate: rotatePulse, opacity: opacityPulse }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] h-[600px] md:h-[1200px] rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-screen"
      >
        {/* Complex Gradient representation of a Singularity */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9F81B9]/80 via-[#FFD6E8]/40 to-[#D6F1FF]/60 rotate-45" />
        <div className="absolute inset-10 rounded-full bg-black/50 blur-3xl" />
      </motion.div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.p
          style={{ y: yMove }}
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base tracking-[0.4em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9f81b9] to-[var(--complement-cyan)] mb-12 block drop-shadow-[0_0_20px_rgba(159,129,185,0.5)]"
        >
          Our Universal Vision
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-light tracking-tighter text-[#9f81b9] max-w-6xl mx-auto leading-[1.1] drop-shadow-2xl"
        >
          MIND CREATIONS designed to express the unlimited nature of consciousness in the human experience. <br /><br />
          <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--complement-pink)] to-[var(--complement-cyan)] shadow-white/30">I AM YOU.</span>
        </motion.h2>
        
        <motion.div
           initial={{ opacity: 0, y: 60 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12"
        >
          <a href="#contact" className="group relative inline-flex items-center justify-center px-12 py-6 bg-white outline outline-1 outline-white/20 text-xs font-bold uppercase tracking-[0.2em] text-[#030008] overflow-hidden transition-all duration-700 hover:bg-transparent hover:text-white hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] rounded-full">
            <span className="relative z-10 transition-colors duration-500">Collaborate With Us</span>
          </a>
          <a href="#creations" className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#030008]/40 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-[0.2em] text-white overflow-hidden transition-all duration-700 hover:border-transparent hover:shadow-[0_0_60px_rgba(255,214,232,0.3)] rounded-full">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#030008] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:drop-shadow-none">Join the Movement</span>
            <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-white via-[var(--complement-cyan)] to-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full z-0"></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
