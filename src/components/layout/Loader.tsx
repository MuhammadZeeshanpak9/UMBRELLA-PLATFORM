"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Elev8LogoText } from "@/components/ui/InfinityLogo";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Short minimal loading duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center p-4 bg-transparent"
          >
            <Elev8LogoText 
              textClassName="text-4xl font-sans font-medium tracking-[0.2em] text-[var(--primary)] uppercase"
              iconClassName="w-[4.0em] h-[5.5em] ml-[0.05em] mr-[0.15em]"
              animated={true}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
