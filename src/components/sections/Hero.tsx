"use client";

import { motion } from "framer-motion";
import { Sparkles, Download, Wand2, BookOpen, ArrowRight, Menu } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen z-10 flex p-4 lg:p-6 pb-24 lg:pb-6 font-sans">
      
      {/* Container simulating the two-panel split */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-[52%] flex flex-col min-h-[90vh] lg:min-h-0 bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(159,129,185,0.1)] overflow-hidden">
          {/* Top Nav inside Left Panel */}
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--complement-cyan)]" />
              <span className="font-semibold text-xl tracking-tighter text-[var(--foreground)] uppercase">ELEV8</span>
            </div>
            <button className="liquid-glass rounded-full p-3 hover:scale-105 transition-transform">
              <Menu size={20} className="text-[var(--foreground)]" />
            </button>
          </div>

          {/* Hero Center */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-16 h-16 md:w-20 md:h-20 mb-10 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] shadow-[0_0_30px_rgba(159,129,185,0.5)] flex items-center justify-center p-0.5"
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Sparkles className="text-[var(--primary)]" size={24} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-xs md:text-sm tracking-[0.6em] font-bold text-[#9f81b9] uppercase mb-8 flex flex-col gap-3 opacity-90">
                <span>MIND <span className="font-serif italic text-[var(--complement-pink)] normal-case mx-1">+</span> BODY</span>
                <span>SPIRITUALITY <span className="font-serif italic text-[var(--complement-pink)] normal-case mx-1">+</span> SCIENCE</span>
                <span>CONSCIOUSNESS <span className="font-serif italic text-[var(--complement-pink)] normal-case mx-1">+</span> GODLY LIVING</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-medium tracking-tight text-[#9f81b9] leading-[1.05] max-w-3xl">
                WELCOME TO <br />
                <span className="font-serif italic text-gray-400 font-light mix-blend-multiply">ELEV8</span> UNIVERSE
              </h1>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 liquid-glass-strong flex items-center gap-4 px-8 py-4 rounded-full text-[var(--foreground)] font-medium text-sm transition-all shadow-md group border border-white/60 hover:border-white"
            >
              Explore Now 
              <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                <Download size={14} className="text-[var(--primary)] group-hover:text-white" />
              </div>
            </motion.button>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["Artistic Gallery", "AI Generation", "3D Structures"].map((tag, i) => (
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
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[var(--primary)] opacity-80 block mb-4">Visionary Design</span>
            <p className="text-xl md:text-2xl text-gray-700 max-w-md mx-auto leading-relaxed">
              "We imagined a realm with <span className="font-serif italic text-gray-400">no ending</span>."
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-8 bg-gray-300"></div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">ELEV8 CORPORATION</span>
              <div className="h-[1px] w-8 bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Desktop) */}
        <div className="hidden lg:flex w-[48%] flex-col h-full gap-6">
          
          {/* Top Bar Right */}
          <div className="flex justify-end gap-4 h-20 items-center px-4">
            <div className="liquid-glass flex items-center gap-4 px-6 py-3 rounded-full">
              {["Twitter", "LinkedIn", "Insta"].map((social) => (
                <a key={social} href="#" className="text-xs font-medium text-gray-600 hover:text-[var(--primary)] transition-colors">{social}</a>
              ))}
              <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
              <a href="#creations" className="text-[var(--foreground)] hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex justify-end px-4">
             <div className="liquid-glass-strong w-64 p-6 rounded-3xl flex flex-col gap-3">
               <h3 className="font-semibold text-lg text-[var(--foreground)] tracking-tight">Enter our ecosystem</h3>
               <p className="text-sm text-gray-500 font-light leading-relaxed">A seamless integration between spiritual awareness and technical scaling.</p>
             </div>
          </div>

          {/* Bottom Features Container */}
          <div className="mt-auto p-2">
            <div className="liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-4 shadow-xl shadow-[var(--primary)]/5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Processing", icon: Wand2, color: "text-[var(--complement-cyan)]", bg: "bg-[var(--complement-cyan)]/10" },
                  { title: "Growth Archive", icon: BookOpen, color: "text-[var(--complement-pink)]", bg: "bg-[var(--complement-pink)]/10" }
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
                    <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">Advanced Brand Sculpting</h4>
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
