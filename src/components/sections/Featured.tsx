"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { BRANDS } from "@/config/brands";
import { ArrowRight } from "lucide-react";

function FeaturedCard({ brand, index }: { brand: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Advanced Parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [250, -250]);
  
  // 3D Hover & Flashlight Effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      style={{ y: index % 2 === 0 ? yParallax : yParallaxFast }}
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 perspective-[1000px]"
    >
      <motion.a 
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMouseMove}
        whileHover={{ scale: 1.02, rotateY: index % 2 === 0 ? 2 : -2, rotateX: 2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group block relative rounded-2xl bg-[#0a0514]/40 backdrop-blur-xl overflow-hidden border border-white/5 transition-all duration-700 hover:shadow-[0_20px_100px_rgba(159,129,185,0.3)] hover:border-white/20"
      >
        {/* Animated Flashlight Layer inside Card */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--complement-cyan)]/20"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        />

        <div className="aspect-[4/3] w-full relative overflow-hidden bg-black/20 border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent z-0"></div>
          
          {/* Card Cosmos Blobs */}
          <motion.div 
            className="absolute top-1/3 left-1/4 w-40 h-40 bg-[var(--primary)]/50 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[var(--complement-pink)]/40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="p-10 bg-gradient-to-t from-black/60 to-transparent relative z-20">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--complement-cyan)] mb-4 block drop-shadow-[0_0_10px_rgba(159,129,185,0.5)]">
            {brand.category}
          </span>
          <h3 className="text-3xl font-light tracking-tighter text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--complement-pink)] transition-all duration-500">
            {brand.name}
          </h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm mb-10">
            {brand.description}
          </p>
          
          <div className="flex items-center text-sm font-medium tracking-wide uppercase text-white group-hover:text-[var(--complement-cyan)] transition-colors">
            <span className="relative overflow-hidden inline-block">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{brand.ctaText}</span>
              <span className="absolute inset-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0">{brand.ctaText}</span>
            </span>
            <ArrowRight size={16} className="ml-3 transition-transform duration-500 group-hover:translate-x-3 drop-shadow-[0_0_10px_rgba(214,241,255,0.8)]" />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Featured() {
  const featuredBrands = BRANDS.filter((b) => b.featured);

  return (
    <section id="creations" className="py-48 relative z-10 w-full">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-40 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-sans font-light tracking-tighter text-[#9f81b9] drop-shadow-[0_0_40px_rgba(159,129,185,0.2)]"
          >
            MIND CREATIONS
          </motion.h2>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "150px", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mt-10 shadow-[0_0_20px_var(--primary)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 perspective-[1000px]">
          {featuredBrands.map((brand, i) => (
            <FeaturedCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
