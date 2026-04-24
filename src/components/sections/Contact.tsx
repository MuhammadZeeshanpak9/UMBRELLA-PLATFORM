"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Elev8LogoText } from "@/components/ui/InfinityLogo";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });

      if (!res.ok) throw new Error("Send failed");

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#030008]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:bg-[#030008]/80 transition-all backdrop-blur-md";

  return (
    <section id="contact" className="relative py-24 md:py-32 z-10 overflow-hidden">
      <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-sans font-bold tracking-tighter text-white uppercase leading-[1.1] mb-4 md:mb-6 drop-shadow-xl">
              GREATEST, <br className="hidden lg:block" /> SAY HELLO
            </h2>
            <p className="text-lg md:text-xl text-white font-semibold tracking-wide uppercase mb-3">
              I AM THE GREATEST.
            </p>
            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-3">
              Together, we will <Elev8LogoText textClassName="uppercase" iconClassName="w-[0.55em] h-[0.85em] mx-[0.1em] opacity-80" /> the youniverse within and the world in the physical reality.
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

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <CheckCircle size={48} className="text-[var(--primary)]" />
                  <p className="text-white font-semibold tracking-[0.15em] uppercase text-sm">Message Sent!</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We&apos;ll be in touch soon, Greatest.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)] hover:text-white transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-4 md:gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      required
                      disabled={status === "loading"}
                    />
                    <input
                      type="tel"
                      placeholder="Phone#"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      disabled={status === "loading"}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                    disabled={status === "loading"}
                  />
                  <textarea
                    placeholder="Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    required
                    disabled={status === "loading"}
                  />

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-xs tracking-wide">
                      <AlertCircle size={14} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 w-full py-4 md:py-5 rounded-xl bg-[var(--primary)] hover:bg-[var(--complement-cyan)] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_20px_rgba(159,129,185,0.4)] hover:shadow-[0_0_30px_rgba(157,219,255,0.6)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      "SEND MESSAGE"
                    )}
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
