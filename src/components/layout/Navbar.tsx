"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Elev8LogoText } from "@/components/ui/InfinityLogo";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "ELEV8 ALL", href: "?filter=CREATIONS#ecosystem" },
    { name: "Vision", href: "#vision" },
    { name: "YOUTUBE", href: "https://youtube.com/@theworldsgreatestwater111?si=Y8Uz6sBWkmKln2cI", external: true },
    { name: "TIKTOK", href: "https://www.tiktok.com/@theworldsgreatestwater?_r=1&_t=ZP-95MUNoMMi11", external: true },
    { name: "INSTAGRAM", href: "https://www.instagram.com/theworldsgreatestwater?igsh=MWY5NnptdW5uM3NzZQ==", external: true },
    { name: "TWITTER", href: "#", external: true },
    { name: "SAY HELLO", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out",
        scrolled ? "glass-panel py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative z-50 group">
          <Elev8LogoText 
            textClassName="font-sans font-semibold tracking-[0.2em] text-lg uppercase transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary)] group-hover:to-[var(--complement-cyan)]"
            iconClassName="w-[0.8em] h-[1.15em] mx-[0.1em]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-[#9f81b9] transition-colors duration-300 group"
            >
              <span className="relative z-10">
                {link.name === "ELEV8 ALL" ? (
                  <span className="flex items-center">
                    <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> ALL
                  </span>
                ) : link.name}
              </span>
              {/* Animated Glowing Underline */}
              {!link.external && (
                <span className="absolute left-1/2 bottom-[-4px] -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent transition-all duration-500 ease-out group-hover:w-[150%] opacity-0 group-hover:opacity-100" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-gray-300 hover:text-[#9f81b9]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-[#030008]/90 backdrop-blur-2xl z-40 flex flex-col justify-center items-center gap-10"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-xl font-light tracking-[0.3em] uppercase text-gray-300 hover:text-[var(--primary)] transition-colors"
                    >
                      {link.name === "ELEV8 ALL" ? (
                        <span className="flex items-center">
                          <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> ALL
                        </span>
                      ) : link.name}
                    </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
