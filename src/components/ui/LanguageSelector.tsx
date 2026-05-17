"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useDynamicTranslation } from "@/components/providers/DynamicTranslationProvider";
import { useT } from "@/hooks/useT";
import { CORE_LOCALES, type CoreLocale } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, Check, ChevronDown } from "lucide-react";

type LangEntry = { code: string; name: string; nativeName: string };

const ALL_LANGUAGES: LangEntry[] = [
  { code: "en", name: "English",    nativeName: "English" },
  { code: "es", name: "Spanish",    nativeName: "Español" },
  { code: "fr", name: "French",     nativeName: "Français" },
  { code: "ar", name: "Arabic",     nativeName: "العربية" },
  { code: "zh", name: "Chinese",    nativeName: "中文" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "de", name: "German",     nativeName: "Deutsch" },
  { code: "ja", name: "Japanese",   nativeName: "日本語" },
  { code: "hi", name: "Hindi",      nativeName: "हिन्दी" },
  { code: "sw", name: "Swahili",    nativeName: "Kiswahili" },
  { code: "it", name: "Italian",    nativeName: "Italiano" },
  { code: "nl", name: "Dutch",      nativeName: "Nederlands" },
  { code: "pl", name: "Polish",     nativeName: "Polski" },
  { code: "ru", name: "Russian",    nativeName: "Русский" },
  { code: "tr", name: "Turkish",    nativeName: "Türkçe" },
  { code: "ko", name: "Korean",     nativeName: "한국어" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "th", name: "Thai",       nativeName: "ภาษาไทย" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "uk", name: "Ukrainian",  nativeName: "Українська" },
  { code: "cs", name: "Czech",      nativeName: "Čeština" },
  { code: "ro", name: "Romanian",   nativeName: "Română" },
  { code: "hu", name: "Hungarian",  nativeName: "Magyar" },
  { code: "sv", name: "Swedish",    nativeName: "Svenska" },
  { code: "da", name: "Danish",     nativeName: "Dansk" },
  { code: "fi", name: "Finnish",    nativeName: "Suomi" },
  { code: "nb", name: "Norwegian",  nativeName: "Norsk" },
  { code: "el", name: "Greek",      nativeName: "Ελληνικά" },
  { code: "bg", name: "Bulgarian",  nativeName: "Български" },
  { code: "hr", name: "Croatian",   nativeName: "Hrvatski" },
  { code: "sk", name: "Slovak",     nativeName: "Slovenčina" },
  { code: "sl", name: "Slovenian",  nativeName: "Slovenščina" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių" },
  { code: "lv", name: "Latvian",    nativeName: "Latviešu" },
  { code: "et", name: "Estonian",   nativeName: "Eesti" },
  { code: "ms", name: "Malay",      nativeName: "Bahasa Melayu" },
  { code: "he", name: "Hebrew",     nativeName: "עברית" },
];

const CORE_SET = new Set<string>(CORE_LOCALES);

export default function LanguageSelector() {
  const t = useT("language");
  const [open, setOpen]           = useState(false);
  const [search, setSearch]       = useState("");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const [mounted, setMounted]     = useState(false);

  const router        = useRouter();
  const pathname      = usePathname();
  const currentLocale = useLocale();
  const { dynamicLocale, setDynamicLocale, clearDynamic, isLoading } = useDynamicTranslation();

  const buttonRef  = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const activeCode = dynamicLocale ?? currentLocale;
  const activeLang = ALL_LANGUAGES.find((l) => l.code === activeCode);

  const filtered = useMemo(() =>
    ALL_LANGUAGES.filter((lang) =>
      search.length === 0 ||
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase())
    ),
  [search]);

  const calcPos = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
  };

  const handleToggle = () => {
    if (!open) calcPos();
    setOpen((p) => !p);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonRef.current?.contains(t) && !dropdownRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", calcPos, true);
    window.addEventListener("resize", calcPos);
    return () => {
      window.removeEventListener("scroll", calcPos, true);
      window.removeEventListener("resize", calcPos);
    };
  }, [open]);

  const handleSelect = (lang: LangEntry) => {
    setOpen(false);
    setSearch("");
    if (CORE_SET.has(lang.code)) {
      clearDynamic();
      router.replace(pathname, { locale: lang.code as CoreLocale });
    } else {
      setDynamicLocale(lang.code);
    }
  };

  /* ─── split into two sections for rendering ─── */
  const coreFiltered    = filtered.filter((l) =>  CORE_SET.has(l.code));
  const dynamicFiltered = filtered.filter((l) => !CORE_SET.has(l.code));

  const dropdown = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.92, y: -12 }}
          animate={{ opacity: 1, scale: 1,    y: 0   }}
          exit={{   opacity: 0, scale: 0.92,  y: -12 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{
            position: "fixed",
            top:   dropdownPos.top,
            right: dropdownPos.right,
            zIndex: 99999,
            width: 300,
            background: "rgba(5, 1, 12, 0.97)",
            border: "1px solid rgba(159,129,185,0.15)",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(0,0,0,0.85), 0 0 40px rgba(159,129,185,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Top glow bar */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(159,129,185,0.5), transparent)" }} />

          {/* Header */}
          <div className="px-4 pt-4 pb-3">
            <p className="text-[8px] tracking-[0.35em] uppercase font-semibold mb-3"
               style={{ color: "rgba(159,129,185,0.5)" }}>
              {t("select")}
            </p>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <Search size={11} className="flex-shrink-0" style={{ color: "rgba(159,129,185,0.5)" }} />
              <input
                autoFocus
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 tracking-wide"
                style={{ fontSize: 11, color: "#e5e7eb" }}
              />
            </div>
          </div>

          {/* Language list */}
          <div className="overflow-y-auto pb-3" style={{ maxHeight: 260 }}>

            {/* Core section */}
            {coreFiltered.length > 0 && (
              <>
                {!search && (
                  <p className="px-4 pb-1 text-[8px] tracking-[0.3em] uppercase"
                     style={{ color: "rgba(255,255,255,0.2)" }}>Core</p>
                )}
                {coreFiltered.map((lang, i) => (
                  <LangRow
                    key={lang.code}
                    lang={lang}
                    isActive={lang.code === activeCode}
                    isDynamic={false}
                    index={i}
                    onSelect={handleSelect}
                  />
                ))}
              </>
            )}

            {/* AI section divider */}
            {dynamicFiltered.length > 0 && (
              <>
                <div className="mx-4 my-2 flex items-center gap-2">
                  <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.05)" }} />
                  {!search && (
                    <span className="text-[8px] tracking-[0.25em] uppercase px-1"
                          style={{ color: "rgba(159,129,185,0.35)" }}>AI Powered</span>
                  )}
                  <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
                {dynamicFiltered.map((lang, i) => (
                  <LangRow
                    key={lang.code}
                    lang={lang}
                    isActive={lang.code === activeCode}
                    isDynamic={true}
                    index={coreFiltered.length + i}
                    onSelect={handleSelect}
                  />
                ))}
              </>
            )}

            {filtered.length === 0 && (
              <p className="text-center py-8 text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                No languages found
              </p>
            )}
          </div>

          {/* Bottom glow bar */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(159,129,185,0.3), transparent)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ─── Trigger button ─── */}
      <motion.button
        ref={buttonRef}
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
        style={{
          background: open ? "rgba(159,129,185,0.12)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? "rgba(159,129,185,0.35)" : "rgba(255,255,255,0.09)"}`,
          backdropFilter: "blur(8px)",
        }}
        aria-label={t("select")}
        aria-expanded={open}
      >
        {isLoading ? (
          <span className="w-3.5 h-3.5 rounded-full border-t-transparent animate-spin flex-shrink-0"
                style={{ border: "1.5px solid rgba(159,129,185,0.8)" }} />
        ) : (
          <Globe size={13} className="flex-shrink-0 transition-colors duration-300"
                 style={{ color: open ? "#9f81b9" : "#6b7280" }} />
        )}

        <span className="hidden sm:inline text-[10px] uppercase tracking-[0.15em] font-medium max-w-[72px] truncate transition-colors duration-300"
              style={{ color: open ? "#9f81b9" : "#9ca3af" }}>
          {activeLang?.nativeName ?? t("select")}
        </span>

        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
          <ChevronDown size={11} style={{ color: open ? "rgba(159,129,185,0.7)" : "#4b5563" }} />
        </motion.span>
      </motion.button>

      {mounted && createPortal(dropdown, document.body)}
    </>
  );
}

/* ─── Individual row ─── */
function LangRow({
  lang, isActive, isDynamic, index, onSelect,
}: {
  lang: LangEntry;
  isActive: boolean;
  isDynamic: boolean;
  index: number;
  onSelect: (l: LangEntry) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.018, duration: 0.2 }}
      onClick={() => onSelect(lang)}
      className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-all duration-150 group"
      style={{ background: isActive ? "rgba(159,129,185,0.08)" : "transparent" }}
      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isActive ? "rgba(159,129,185,0.08)" : "transparent"; }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[12px] font-medium leading-tight transition-colors duration-150"
              style={{ color: isActive ? "#9f81b9" : "#d1d5db" }}>
          {lang.nativeName}
        </span>
        <span className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.25)" }}>
          {lang.name}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isDynamic && (
          <span className="text-[8px] px-1.5 py-0.5 rounded-md tracking-widest font-medium"
                style={{
                  background: "linear-gradient(135deg, rgba(159,129,185,0.15), rgba(214,241,255,0.08))",
                  color: "rgba(159,129,185,0.7)",
                  border: "1px solid rgba(159,129,185,0.18)",
                }}>
            AI
          </span>
        )}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(159,129,185,0.25)" }}
          >
            <Check size={9} style={{ color: "#9f81b9" }} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
