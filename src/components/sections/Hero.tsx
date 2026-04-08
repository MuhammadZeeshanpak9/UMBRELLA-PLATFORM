"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Wand2, BookOpen, ArrowRight, Menu, X } from "lucide-react";
import AudioPlayer from "@/components/layout/AudioPlayer";

const SacredGeometryLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle and Yin Yang */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />
    <path d="M 50 2 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 98 A 48 48 0 0 1 50 2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
    <path d="M 50 2 A 48 48 0 0 1 50 98 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
    
    {/* Flower of Life elements (Seed of Life inner pattern) */}
    <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6">
      <circle cx="50" cy="50" r="16" />
      <circle cx="50" cy="34" r="16" />
      <circle cx="50" cy="66" r="16" />
      <circle cx="36" cy="42" r="16" />
      <circle cx="64" cy="42" r="16" />
      <circle cx="36" cy="58" r="16" />
      <circle cx="64" cy="58" r="16" />
    </g>
    
    {/* Yin Yang Dots */}
    <circle cx="50" cy="26" r="6" fill="currentColor" />
    <circle cx="50" cy="74" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section id="home" className="relative min-h-screen z-10 flex p-4 lg:p-6 pb-24 lg:pb-6 font-sans">
      
      {/* Container simulating the two-panel split */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-[52%] flex flex-col min-h-[90vh] lg:min-h-0 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(159,129,185,0.1)] overflow-hidden">
          {/* Top Nav inside Left Panel */}
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex items-center gap-4 relative z-10">
              <div className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(159,129,185,0.8)]">
                <SacredGeometryLogo className="w-10 h-10" />
              </div>
              <span className="font-semibold text-xl tracking-tighter text-[var(--foreground)] uppercase">ELEV8</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="liquid-glass rounded-full p-3 hover:scale-105 transition-transform relative z-10"
            >
              <Menu size={20} className="text-[var(--foreground)]" />
            </button>
          </div>

          {/* Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 z-50 bg-[#030008]/95 backdrop-blur-3xl flex flex-col p-6 md:p-8 border border-white/10 rounded-3xl overflow-hidden"
              >
                <div className="flex justify-between items-center mb-12 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(159,129,185,0.8)]">
                       <SacredGeometryLogo className="w-10 h-10" />
                    </div>
                    <span className="font-semibold text-xl tracking-tighter text-[var(--foreground)] uppercase">ELEV8</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="liquid-glass rounded-full p-3 hover:scale-105 transition-transform text-[var(--foreground)] hover:text-[var(--primary)]"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-8 items-center justify-center flex-1 relative z-10">
                  {['ELEV8 ALL', 'SOUL', 'MIND', 'BODY', 'SAY HELLO'].map((item, i) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="text-2xl md:text-3xl font-extralight tracking-[0.2em] uppercase text-gray-300 hover:text-[var(--primary)] hover:scale-105 transition-all text-center"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Center */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10 text-[var(--primary)] drop-shadow-[0_0_20px_rgba(159,129,185,0.8)] hover:scale-105 transition-transform duration-700"
            >
              <SacredGeometryLogo className="w-20 h-20 md:w-24 md:h-24" />
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col items-center text-center w-full"
            >
              <AudioPlayer />
              
              <div className="text-[10px] md:text-sm tracking-[0.4em] md:tracking-[0.6em] font-light text-[var(--primary)] uppercase mb-8 grid grid-cols-[1fr_auto_1fr] gap-x-4 md:gap-x-6 gap-y-3 opacity-80 w-full max-w-[300px] md:max-w-xl mx-auto">
                <span className="text-right whitespace-nowrap">MIND</span><span className="opacity-40 text-center">+</span><span className="text-left whitespace-nowrap">BODY</span>
                <span className="text-right whitespace-nowrap">SPIRITUALITY</span><span className="opacity-40 text-center">+</span><span className="text-left whitespace-nowrap">SCIENCE</span>
                <span className="text-right whitespace-nowrap">CONSCIOUSNESS</span><span className="opacity-40 text-center">+</span><span className="text-left whitespace-nowrap">GODLY LIVING</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-sans font-extralight tracking-[0.15em] text-[var(--primary)] leading-[1.2] max-w-4xl uppercase">
                WELCOME TO <br />
                <span className="font-sans font-medium tracking-[0.05em] text-[var(--foreground)] opacity-80">ELEV8</span> UNIVERSE
              </h1>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 liquid-glass-strong flex items-center gap-4 px-8 py-4 rounded-full text-[var(--foreground)] font-light tracking-[0.2em] text-[10px] transition-all shadow-md group border border-white/40 hover:border-white uppercase"
            >
              Explore Now 
              <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                <Download size={14} className="text-[var(--primary)] group-hover:text-white" />
              </div>
            </motion.button>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["SOUL", "MIND", "BODY"].map((tag, i) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="liquid-glass px-5 py-2 rounded-full text-xs font-medium text-gray-600"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="p-8 pb-10 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[var(--primary)] opacity-80 block mb-4">THE GRAND DESIGN. LIFE</span>
            <p className="text-lg md:text-xl text-[var(--primary)] max-w-md mx-auto leading-relaxed font-extralight tracking-[0.1em] uppercase">
              THE GRAND DESIGNER. <span className="font-light opacity-50">I AM YOU.</span>
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-8 bg-gray-300"></div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">ELEV8 INCORPORATION</span>
              <div className="h-[1px] w-8 bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Desktop) */}
        <div className="hidden lg:flex w-[48%] flex-col h-full gap-6">
          
          {/* Top Bar Right */}
          <div className="flex justify-end gap-4 h-20 items-center px-4">
            <div className="liquid-glass flex items-center gap-4 px-6 py-3 rounded-full">
              {[
                { label: "ELEV8 ALL", href: "#creations" },
                { label: "YOUTUBE", href: "https://youtube.com/@theworldsgreatestwater111?si=Y8Uz6sBWkmKln2cI" },
                { label: "TIKTOK", href: "https://www.tiktok.com/@theworldsgreatestwater?_r=1&_t=ZP-95MUNoMMi11" },
                { label: "INSTAGRAM", href: "https://www.instagram.com/theworldsgreatestwater?igsh=MWY5NnptdW5uM3NzZQ==" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs font-medium text-gray-600 hover:text-[var(--primary)] transition-colors tracking-wider"
                >
                  {social.label}
                </a>
              ))}
              <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
              <a href="#creations" className="text-[var(--foreground)] hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex justify-end px-4">
             <div className="liquid-glass-strong w-64 p-6 rounded-3xl flex flex-col gap-3">
               <h3 className="font-semibold text-lg text-[var(--primary)] tracking-tight uppercase">ENTER ELEV8 ECOSYSTEM</h3>
               <p className="text-sm text-gray-500 font-light leading-relaxed">A seamless integration between spiritual innerstanding and physical manifestation.</p>
             </div>
          </div>

          {/* Bottom Features Container */}
          <div className="mt-auto p-2">
            <div className="liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-4 shadow-xl shadow-[var(--primary)]/5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "SYSTEMS", icon: Wand2, color: "text-[var(--complement-cyan)]", bg: "bg-[var(--complement-cyan)]/10" },
                  { title: "ACCOUNTABILITY", icon: BookOpen, color: "text-[var(--complement-pink)]", bg: "bg-[var(--complement-pink)]/10" }
                ].map((card) => (
                  <div key={card.title} className="liquid-glass-strong p-6 rounded-3xl group cursor-pointer hover:border-white transition-colors">
                    <div className={`w-10 h-10 rounded-full ${card.bg} flex items-center justify-center mb-6 overflow-hidden`}>
                      <card.icon size={18} className={card.color} />
                    </div>
                    <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{card.title}</span>
                  </div>
                ))}
              </div>

              <div className="liquid-glass-strong p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-white transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] overflow-hidden shadow-inner">
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors uppercase tracking-widest text-sm md:text-base">RESULTS</h4>
                    <p className="text-xs text-gray-500 mt-1">Discover dynamic scaling</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[var(--primary)] group-hover:scale-105 transition-all">
                  +
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
