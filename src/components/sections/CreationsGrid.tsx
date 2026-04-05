"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { BRANDS } from "@/config/brands";
import { ArrowUpRight } from "lucide-react";

function GridCard({ brand, index }: { brand: any, index: number }) {
  // 3D Hover & Flashlight Effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  
  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)", rotateY: 10 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1000px] h-full"
    >
      <motion.a 
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMouseMove}
        whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group flex flex-col h-full bg-[#0a0514]/30 backdrop-blur-md border border-white/5 rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,214,232,0.15)] hover:border-white/20 transition-all duration-700 relative overflow-hidden"
      >
        {/* Flashlight Hover Layer */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-[var(--complement-cyan)]/10 to-[var(--primary)]/10"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        />

        <div className="p-8 flex flex-col flex-1 relative z-10 w-full h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-12">
              <h4 className="text-xl font-light tracking-wide text-[#9f81b9] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary)] group-hover:to-[var(--complement-cyan)] transition-all duration-300 pr-4">
                {brand.name}
              </h4>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--primary)] flex-shrink-0 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#9f81b9] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <p className="text-sm font-light text-gray-400 mb-8 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-500">
              {brand.description}
            </p>
          </div>
          
          <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-[var(--primary)]/30 transition-colors duration-500">
            <span className="relative text-xs tracking-[0.2em] uppercase font-semibold text-gray-400 group-hover:text-[#9f81b9] transition-colors inline-block overflow-hidden">
              {brand.ctaText}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--complement-pink)] to-[var(--complement-cyan)] transition-all duration-700 ease-out group-hover:w-full"></span>
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}


export default function CreationsGrid() {
  const secondaryBrands = BRANDS.filter((b) => !b.featured);
  
  const grouped = secondaryBrands.reduce((acc, brand) => {
    if (!acc[brand.category]) acc[brand.category] = [];
    acc[brand.category].push(brand);
    return acc;
  }, {} as Record<string, typeof secondaryBrands>);

  return (
    <section className="py-40 relative z-10 border-y border-white/5 mt-20">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tighter text-[#9f81b9] drop-shadow-[0_0_20px_rgba(159,129,185,0.2)]"
            >
              Discover The <br className="hidden md:block" /> Sub-Systems
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="flex items-center gap-4 text-sm text-[var(--primary)] uppercase tracking-[0.2em] font-medium"
          >
            <span>All Entities</span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[var(--primary)] to-transparent"></div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-32">
          {Object.entries(grouped).map(([category, brands], categoryIndex) => (
            <div key={category} className="relative">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#9f81b9]/20 via-[#9f81b9]/5 to-transparent origin-left"
              />
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm tracking-[0.3em] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[#9f81b9] mt-12 mb-16 drop-shadow-md"
              >
                {category}
              </motion.h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {brands.map((brand, i) => (
                  <GridCard key={brand.id} brand={brand} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
