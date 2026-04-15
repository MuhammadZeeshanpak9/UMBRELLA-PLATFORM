"use client";

import { motion } from "framer-motion";
import { Elev8LogoText } from "@/components/ui/InfinityLogo";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 z-10 overflow-hidden">
      {/* Background ambient glow matching the theme */}
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-sans font-bold tracking-tighter text-white uppercase leading-[1.1] mb-4 md:mb-6 drop-shadow-xl">
              GREATEST, <br className="hidden lg:block"/> SAY HELLO
            </h2>
            <p className="text-lg md:text-xl text-white font-semibold tracking-wide uppercase mb-3">
              I AM THE GREATEST.
            </p>
            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-3">
              Together, we will <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> the universe within and the world in the physical reality.
            </p>
            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Send a message to <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> for universal collaborations, partnerships, or general information.
            </p>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-xl"
          >
            <div className="liquid-glass-strong p-8 md:p-10 rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(159,129,185,0.15)] bg-white/[0.03]">
              <form className="flex flex-col gap-4 md:gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full bg-[#030008]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:bg-[#030008]/80 transition-all backdrop-blur-md"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone#" 
                    className="w-full bg-[#030008]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:bg-[#030008]/80 transition-all backdrop-blur-md"
                    required
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-[#030008]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:bg-[#030008]/80 transition-all backdrop-blur-md"
                  required
                />
                <textarea 
                  placeholder="Message" 
                  rows={5}
                  className="w-full bg-[#030008]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:bg-[#030008]/80 transition-all backdrop-blur-md resize-none"
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="mt-2 w-full py-4 md:py-5 rounded-xl bg-[var(--primary)] hover:bg-[var(--complement-cyan)] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_20px_rgba(159,129,185,0.4)] hover:shadow-[0_0_30px_rgba(157,219,255,0.6)]"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
