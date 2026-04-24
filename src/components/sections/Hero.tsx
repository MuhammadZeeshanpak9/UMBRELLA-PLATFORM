"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Wand2, BookOpen, ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import AudioPlayer from "@/components/layout/AudioPlayer";
import { Elev8LogoText, InfinityLogo } from "@/components/ui/InfinityLogo";

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
  const [showAccountabilityModal, setShowAccountabilityModal] = useState(false);
  const [showResultsOverlay, setShowResultsOverlay] = useState(false);

  // Lock/unlock body scroll when any modal is open
  useEffect(() => {
    const anyModalOpen = showAccountabilityModal || showResultsOverlay;
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showAccountabilityModal, showResultsOverlay]);

  const openAccountability = () => setShowAccountabilityModal(true);
  const closeAccountability = () => setShowAccountabilityModal(false);
  const openResults = () => setShowResultsOverlay(true);
  const closeResults = () => setShowResultsOverlay(false);

  const handleSystemsClick = () => {
    const el = document.getElementById('ecosystem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Briefly highlight the section
      setTimeout(() => {
        el.classList.add('ring-2', 'ring-[var(--primary)]', 'ring-offset-2', 'transition-all');
        setTimeout(() => el.classList.remove('ring-2', 'ring-[var(--primary)]', 'ring-offset-2'), 1500);
      }, 600);
    }
  };

  return (
    <section id="home" className="relative min-h-screen z-10 flex p-3 sm:p-4 lg:p-6 pb-6 font-sans">
      
      {/* Container simulating the two-panel split */}
      <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-[52%] flex flex-col lg:min-h-[90vh] bg-white/[0.03] backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_20px_60px_rgba(159,129,185,0.1)] overflow-visible sm:overflow-hidden">
          {/* Top Nav inside Left Panel */}
          <div className="flex justify-between items-center p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-4 relative z-10">
              <div className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(159,129,185,0.8)]">
                <SacredGeometryLogo className="w-10 h-10" />
              </div>
              <Elev8LogoText textClassName="font-semibold text-xl tracking-tighter text-[var(--foreground)] uppercase" iconClassName="w-[0.8em] h-[1.15em] mx-[0.1em]" />
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
                className="absolute inset-0 z-50 bg-[#030008]/95 backdrop-blur-3xl flex flex-col p-4 sm:p-6 md:p-8 border border-white/10 rounded-3xl overflow-hidden"
              >
                <div className="flex justify-between items-center mb-8 md:mb-12 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="text-[var(--primary)] drop-shadow-[0_0_8px_rgba(159,129,185,0.8)]">
                       <SacredGeometryLogo className="w-10 h-10" />
                    </div>
                    <Elev8LogoText textClassName="font-semibold text-xl tracking-tighter text-[var(--foreground)] uppercase" iconClassName="w-[0.8em] h-[1.15em] mx-[0.1em]" />
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="liquid-glass rounded-full p-3 hover:scale-105 transition-transform text-[var(--foreground)] hover:text-[var(--primary)]"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-8 items-center justify-center flex-1 relative z-10">
                  {[
                    { label: 'ELEV8 ALL', filter: 'CREATIONS' },
                    { label: 'SOUL', filter: 'SOUL' },
                    { label: 'MIND', filter: 'MIND' },
                    { label: 'BODY', filter: 'BODY' },
                    { label: 'SAY HELLO', href: '#contact' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={item.href || `?filter=${item.filter}#ecosystem`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl md:text-3xl font-extralight tracking-[0.2em] uppercase text-gray-300 hover:text-[var(--primary)] hover:scale-105 transition-all text-center block"
                      >
                        {item.label === "ELEV8 ALL" ? (
                          <span className="flex items-center justify-center">
                            <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> ALL
                          </span>
                        ) : item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Center */}
          <div className="flex flex-col items-center text-center px-5 py-8 sm:p-6 md:p-8 relative z-10 w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-6 md:mb-10 text-[var(--primary)] drop-shadow-[0_0_20px_rgba(159,129,185,0.8)] hover:scale-105 transition-transform duration-700"
            >
              <SacredGeometryLogo className="w-16 h-16 md:w-24 md:h-24" />
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col items-center text-center w-full"
            >
              <AudioPlayer />
              
              {/* Primary Vision Statement Grid — from user image */}
              <div className="grid items-center text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] font-semibold text-[var(--primary)] uppercase mb-10 grid-cols-[1fr_auto_1fr] gap-x-2 sm:gap-x-3 gap-y-1 opacity-90 w-full max-w-[320px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] mx-auto transition-all duration-700">
                <Link href="?filter=MIND#ecosystem" className="text-right whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">MIND</Link>
                <span className="text-center font-bold text-sm sm:text-base md:text-lg px-1 sm:px-2 text-[var(--primary)]">+</span>
                <Link href="?filter=BODY#ecosystem" className="text-left whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">BODY</Link>

                <Link href="#vision" className="text-right whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">SPIRITUALITY</Link>
                <span className="text-center font-bold text-sm sm:text-base md:text-lg px-1 sm:px-2 text-[var(--primary)]">+</span>
                <Link href="#vision" className="text-left whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">SCIENCE</Link>

                <Link href="#vision" className="text-right whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">CONSCIOUSNESS</Link>
                <span className="text-center font-bold text-sm sm:text-base md:text-lg px-1 sm:px-2 text-[var(--primary)]">+</span>
                <Link href="?filter=BODY#ecosystem" className="text-left whitespace-nowrap hover:text-white transition-all drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">GODLY LIVING</Link>
              </div>

              <h1 className="text-[2rem] sm:text-4xl md:text-6xl lg:text-[5rem] font-sans font-extralight tracking-[0.1em] md:tracking-[0.15em] text-[var(--primary)] leading-[1.1] md:leading-[1.2] max-w-full px-2 md:px-0 md:max-w-4xl uppercase flex flex-col items-center">
                <span>WELCOME TO</span> 
                <span className="inline-flex items-center leading-none justify-center">
                  <span className="font-sans font-medium tracking-[0.05em] text-[var(--foreground)] opacity-80">ELEV</span>
                  <InfinityLogo 
                    className="inline-block flex-shrink-0 w-[1.8em] sm:w-[1.5em] h-[2.4em] sm:h-[2em] opacity-90 -ml-[0.12em] mr-[-0.05em] drop-shadow-[0_0_20px_rgba(159,129,185,0.5)] transition-all duration-700 hover:scale-105" 
                  />
                </span>
                <span>YOUNIVERSE</span>
              </h1>
            </motion.div>

            <motion.a
              href="?filter=CREATIONS#ecosystem"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 md:mt-10 liquid-glass-strong flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold tracking-[0.2em] text-xs sm:text-sm text-white transition-all shadow-[0_0_20px_rgba(159,129,185,0.3)] group border border-[var(--primary)]/40 hover:border-[var(--primary)] hover:shadow-[0_0_30px_rgba(159,129,185,0.5)] uppercase bg-[var(--primary)]/20 backdrop-blur-sm"
            >
              EXPLORE NOW
              <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Download size={13} className="text-white" />
              </div>
            </motion.a>

            <div className="hidden sm:flex mt-6 md:mt-10 flex-wrap justify-center gap-2 md:gap-3">
              {["SOUL", "MIND", "BODY"].map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Link 
                    href={`?filter=${tag}#ecosystem`}
                    className="liquid-glass px-5 py-2 rounded-full text-xs font-medium text-gray-600 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all block"
                  >
                    {tag}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Quote — hidden on mobile to keep layout clean */}
          <div className="hidden sm:block p-4 sm:p-6 md:p-8 pb-6 md:pb-10 text-center">
            <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-[var(--primary)] opacity-80 block mb-2 md:mb-4">THE GRAND DESIGN. LIFE</span>
            <p className="text-sm md:text-xl text-[var(--primary)] max-w-md mx-auto leading-relaxed font-extralight tracking-[0.05em] md:tracking-[0.1em] uppercase">
              THE GRAND DESIGNER. <span className="font-light opacity-50">I AM YOU.</span>
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-8 bg-gray-300"></div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] ml-[0.02em] mr-[0.1em] opacity-80" /> INCORPORATION
              </span>
              <div className="h-[1px] w-8 bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex lg:flex w-full lg:w-[48%] flex-col h-full gap-4 sm:gap-6 lg:mt-0 lg:h-full">
          
          {/* Top Bar Right */}
          <div className="flex justify-start lg:justify-end gap-4 lg:h-20 items-center px-2 sm:px-4">
            <div className="liquid-glass flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 rounded-full w-full lg:w-auto justify-center">
              {[
                { label: "ELEV8 ALL", href: "?filter=CREATIONS#ecosystem" },
                { label: "YOUTUBE", href: "https://youtube.com/@theworldsgreatestwater111?si=Y8Uz6sBWkmKln2cI" },
                { label: "TIKTOK", href: "https://www.tiktok.com/@theworldsgreatestwater?_r=1&_t=ZP-95MUNoMMi11" },
                { label: "INSTAGRAM", href: "https://www.instagram.com/theworldsgreatestwater?igsh=MWY5NnptdW5uM3NzZQ==" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[10px] sm:text-xs font-medium text-gray-600 hover:text-[var(--primary)] transition-colors tracking-wider"
                >
                  {social.label === "ELEV8 ALL" ? (
                    <span className="flex items-center">
                      <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> ALL
                    </span>
                  ) : social.label}
                </a>
              ))}
              <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
              <a href="#creations" className="text-[var(--foreground)] hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end px-2 sm:px-4">
             <a href="?filter=CREATIONS#ecosystem" className="liquid-glass-strong w-full lg:w-64 p-4 md:p-6 rounded-[2rem] flex flex-col gap-2 md:gap-3 text-center lg:text-left cursor-pointer hover:border-white/30 hover:shadow-[0_0_30px_rgba(159,129,185,0.3)] transition-all duration-500 group">
               <h3 className="font-semibold text-lg text-[var(--primary)] tracking-tight uppercase group-hover:text-white transition-colors duration-300">ENTER <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em]" /> ECOSYSTEM</h3>
               <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors duration-300">A seamless integration between spiritual innerstanding and physical manifestation.</p>
             </a>
          </div>

          {/* Bottom Features Container */}
          <div className="mt-auto p-2">
            <div className="liquid-glass rounded-[2.5rem] p-4 flex flex-col gap-4 shadow-xl shadow-[var(--primary)]/5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "SYSTEMS", icon: Wand2, color: "text-[var(--complement-cyan)]", bg: "bg-[var(--complement-cyan)]/10", onClick: handleSystemsClick },
                  { title: "ACCOUNTABILITY", icon: BookOpen, color: "text-[var(--complement-pink)]", bg: "bg-[var(--complement-pink)]/10", onClick: openAccountability }
                ].map((card) => (
                  <div key={card.title} onClick={card.onClick} className="liquid-glass-strong p-4 md:p-6 rounded-3xl group cursor-pointer hover:border-white transition-colors flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${card.bg} flex items-center justify-center mb-4 md:mb-6 overflow-hidden`}>
                      <card.icon size={16} className={card.color} />
                    </div>
                    <span className="font-medium text-[9px] sm:text-[10px] md:text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors tracking-tight break-words">{card.title}</span>
                  </div>
                ))}
              </div>

              <div onClick={openResults} className="liquid-glass-strong p-4 md:p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-white transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] overflow-hidden shadow-inner"></div>
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

      {/* ─── ACCOUNTABILITY MODAL ─── */}
      <AnimatePresence>
        {showAccountabilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#030008]/80 backdrop-blur-lg touch-none"
            onClick={closeAccountability}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#030008]/95 border border-white/10 rounded-3xl p-10 shadow-[0_30px_80px_rgba(159,129,185,0.2)] text-center"
            >
              <button
                onClick={closeAccountability}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <div className="w-12 h-12 rounded-full bg-[var(--complement-pink)]/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen size={20} className="text-[var(--complement-pink)]" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white uppercase mb-3">Connect with the Ecosystem</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                Connect with the <Elev8LogoText textClassName="uppercase" iconClassName="w-[1.1em] h-[1.5em] mx-[0.15em] opacity-80" /> ALL movement to create positive & balanced coexisting with other spirit beings having physical life experiences in the mind.
              </p>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                It&apos;s always a WIN WIN, collaborating, partnering, and elevating the universal consciousness.
              </p>
              <a
                href="#contact"
                onClick={closeAccountability}
                className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-[var(--primary)] hover:bg-[var(--complement-cyan)] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_20px_rgba(159,129,185,0.4)]"
              >
                <Elev8LogoText textClassName="uppercase text-sm" iconClassName="w-[1.2em] h-[1.7em] mx-[0.15em]" /> <span className="ml-2">NOW</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── RESULTS OVERLAY ─── */}
      <AnimatePresence>
        {showResultsOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#030008]/80 backdrop-blur-lg touch-none"
            onClick={closeResults}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#030008]/95 border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_rgba(159,129,185,0.2)]"
            >
              <button
                onClick={closeResults}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <h3 className="text-xl font-semibold tracking-tight text-white uppercase mb-2">Experience the Results</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">Explore the full range of premium experiences, creations, and E-learning from the <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.9em] h-[1.3em] mx-[0.1em] opacity-80" /> universe.</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: "Experiences", color: "from-[var(--primary)] to-[var(--complement-pink)]" },
                  { label: "Creations", color: "from-[var(--complement-cyan)] to-[var(--primary)]" },
                  { label: "E-learning", color: "from-[var(--complement-pink)] to-[var(--complement-cyan)]" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.color} p-[1px]`}>
                    <div className="rounded-2xl bg-[#030008]/80 p-4 h-full flex flex-col items-center justify-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} bg-opacity-60 flex items-center justify-center text-white/90 shadow-inner`}>
                        <SacredGeometryLogo className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-300 font-medium tracking-wide text-center whitespace-nowrap">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://theworldsgreatestwater.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeResults}
                className="inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--complement-cyan)] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:opacity-90 shadow-[0_0_20px_rgba(159,129,185,0.4)] gap-[0.5em]"
              >
                EXPLORE <Elev8LogoText textClassName="uppercase" iconClassName="w-[1.1em] h-[1.5em] mx-[0.1em]" /> YOUNIVERSE
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
