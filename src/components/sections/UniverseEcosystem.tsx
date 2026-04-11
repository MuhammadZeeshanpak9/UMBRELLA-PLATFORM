"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useMotionTemplate, useSpring } from "framer-motion";
import { BRANDS, Brand, UniverseCategory } from "@/config/brands";
import { ArrowUpRight } from "lucide-react";
import { Elev8LogoText, ReplaceElev8, InfinityLogo } from "@/components/ui/InfinityLogo";

type FilterType = UniverseCategory | "CREATIONS";

function EcosystemCard({ brand }: { brand: Brand }) {
  // 3D Hover & Flashlight Effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLAnchorElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1000px] h-full"
    >
      <motion.a 
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMouseMove}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group flex flex-col h-full bg-[#0a0514]/30 backdrop-blur-md border border-white/5 rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,214,232,0.15)] hover:border-white/20 transition-all duration-700 relative overflow-hidden"
      >
        {/* Flashlight Hover Layer */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[#9f81b9]/10 to-[var(--complement-cyan)]/10"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        />

        <div className="p-8 flex flex-col flex-1 relative z-10 w-full h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--complement-cyan)]">
                {brand.universeCategory}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#9f81b9] flex-shrink-0 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <ArrowUpRight size={14} className="text-gray-400 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <h4 className="text-xl font-light tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#9f81b9] transition-all duration-300 pr-4 mb-4 uppercase">
              <ReplaceElev8 text={brand.name} iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em]" />
            </h4>
            
            <p className="text-sm font-light text-gray-400 mb-8 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-500">
              <ReplaceElev8 text={brand.description} iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" />
            </p>
          </div>
          
          <div className="mt-auto border-t border-white/5 pt-5 group-hover:border-[#9f81b9]/30 transition-colors duration-500">
            <span className="relative text-xs tracking-[0.2em] uppercase font-semibold text-gray-400 group-hover:text-[#9f81b9] transition-colors inline-block overflow-hidden">
              <ReplaceElev8 text={brand.ctaText} iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em]" />
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#9f81b9] to-[var(--complement-cyan)] transition-all duration-700 ease-out group-hover:w-full"></span>
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function UniverseEcosystem() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<FilterType>("CREATIONS");

  useEffect(() => {
    const filterParam = searchParams.get("filter")?.toUpperCase();
    if (filterParam && ["SOUL", "MIND", "BODY", "CREATIONS"].includes(filterParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveFilter(filterParam as FilterType);
    }
  }, [searchParams]);

  const filters: FilterType[] = ["CREATIONS", "SOUL", "MIND", "BODY"];

  // Group by category order (SOUL, MIND, BODY) then by priority
  const categoryOrder: UniverseCategory[] = ["SOUL", "MIND", "BODY"];
  const sortedBrands = [...BRANDS].sort((a, b) => {
    const categoryA = categoryOrder.indexOf(a.universeCategory);
    const categoryB = categoryOrder.indexOf(b.universeCategory);
    
    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }
    
    return a.priority - b.priority;
  });
  
  const filteredBrands = sortedBrands.filter(
    brand => activeFilter === "CREATIONS" || brand.universeCategory === activeFilter
  );

  return (
    <section id="ecosystem" className="py-20 md:py-32 lg:py-48 relative z-10 w-full min-h-screen">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header & Filter System */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center text-4xl sm:text-5xl md:text-7xl font-sans font-light tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-8 md:mb-12 uppercase"
          >
            <span className="inline-flex items-center leading-none justify-center">
              <span className="text-white">ELEV</span>
              <InfinityLogo 
                className="inline-block flex-shrink-0 w-[0.65em] h-[1em] opacity-90 ml-0 mr-[0.1em]" 
              />
            </span>
            <span className="mx-2 md:mx-4">UNIVERSE</span>
            <span className="text-[var(--primary)] text-[#9f81b9]">ECOSYSTEM</span>
          </motion.h2>

          {/* Interactive Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white/5 p-2 rounded-full backdrop-blur-xl border border-white/10 mx-4 sm:mx-0"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-500 ${
                  activeFilter === filter 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#9f81b9]/80 to-[var(--complement-cyan)]/60 rounded-full shadow-[0_0_20px_rgba(159,129,185,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Animated Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => (
              <EcosystemCard key={brand.id} brand={brand} />
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
