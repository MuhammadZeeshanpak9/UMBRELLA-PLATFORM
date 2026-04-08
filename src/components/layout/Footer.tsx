import Link from "next/link";
import { BRANDS } from "@/config/brands";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#030008]/20 backdrop-blur-xl border-t border-white/5 py-24 mt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="md:w-1/3">
          <Link href="/" className="group inline-block">
            <span className="text-2xl font-semibold tracking-[0.3em] uppercase text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-500">ELEV8</span>
          </Link>
          <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-sm tracking-wide">
            A universe of interconnected creations designed to ELEV8 human awareness, potential and experiences in this beautiful GRAND DESIGN called LIFE.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-16 md:w-2/3 md:justify-end">
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-8 text-[var(--foreground)]">MIND CREATIONS</h4>
            <ul className="space-y-6">
              {BRANDS.slice().sort((a, b) => a.priority - b.priority).slice(0, 5).map((brand) => (
                <li key={brand.id}>
                  <a href={brand.url} target="_blank" rel="noreferrer" className="group flex items-center text-sm text-gray-500 hover:text-[var(--foreground)] transition-all duration-300">
                    <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300 h-[1px] bg-[var(--primary)] inline-block mr-0 group-hover:mr-3"></span>
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-8 text-[var(--foreground)]">Communicate</h4>
            <ul className="space-y-6">
              <li>
                <a href="#" className="group flex items-center text-sm text-gray-500 hover:text-[var(--primary)] transition-all duration-300">
                  <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300 h-[1px] bg-[var(--primary)] inline-block mr-0 group-hover:mr-3"></span>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-sm text-gray-500 hover:text-[var(--primary)] transition-all duration-300">
                  <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300 h-[1px] bg-[var(--primary)] inline-block mr-0 group-hover:mr-3"></span>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-sm text-gray-500 hover:text-[var(--foreground)] transition-all duration-300">
                  <span className="w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-300 h-[1px] bg-[var(--foreground)] inline-block mr-0 group-hover:mr-3"></span>
                  SAY HELLO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs tracking-wider text-gray-400 uppercase">© {new Date().getFullYear()} ELEV8 INCORPORATION. Universal License.</p>
        <div className="flex gap-8 text-xs tracking-wider text-gray-400 uppercase">
          <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
