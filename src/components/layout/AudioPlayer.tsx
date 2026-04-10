"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Attempt to autoplay
    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        console.warn("Autoplay prevented by browser. Audio will start on first interaction.");
      }
    };

    tryPlay();

    const handleInteraction = () => {
      if (!hasInteracted && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(console.error);
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="mb-8 z-50">
      <audio ref={audioRef} src="/Assets/THE GREATEST.mp3" loop />
      
      <button 
        onClick={toggleMute}
        className="liquid-glass-strong rounded-full px-6 py-2.5 flex items-center justify-center gap-3 text-[#9F81B9] text-xs tracking-[0.2em] uppercase font-bold hover:bg-white/10 transition-all border border-[#9F81B9]/30 hover:border-[#9F81B9] shadow-[0_0_20px_rgba(159,129,185,0.1)] hover:shadow-[0_0_30px_rgba(159,129,185,0.3)] hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            <span>PAUSE MUSIC</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span>PLAY NOW</span>
          </>
        )}
      </button>
    </div>
  );
}
