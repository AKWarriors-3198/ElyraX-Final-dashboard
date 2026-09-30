"use client";

import React, { useEffect, useState } from "react";
import { ElyraXLogo } from "./elyrax-logo";
import { cn } from "@/lib/utils";

interface ElyraXLoadingProps {
  onComplete?: () => void;
  duration?: number;
}

export function ElyraXLoading({ onComplete, duration = 1800 }: ElyraXLoadingProps) {
  const [phase, setPhase] = useState<"particles" | "logo" | "sweep" | "done">("particles");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("done");
      onComplete?.();
      return;
    }

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 0.3) setPhase("particles");
      else if (p < 0.7) setPhase("logo");
      else if (p < 1) setPhase("sweep");
      else {
        setPhase("done");
        onComplete?.();
        return;
      }

      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Particle dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: phase === "particles" ? 0.6 : 0,
              transition: `opacity ${0.5}s ease ${i * 0.02}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div
        className={cn(
          "relative transition-all duration-700 ease-out",
          phase === "particles" && "opacity-0 scale-75",
          phase === "logo" && "opacity-100 scale-100",
          phase === "sweep" && "opacity-100 scale-100"
        )}
      >
        <ElyraXLogo size="xl" />
        {/* Light sweep */}
        {phase === "sweep" && (
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                animation: "shimmer 0.8s ease-out forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div
        className={cn(
          "mt-8 flex flex-col items-center gap-3 transition-all duration-500",
          phase === "particles" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        )}
      >
        <p className="text-white font-display font-semibold text-lg tracking-tight">
          ElyraX
        </p>
        <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          Loading ElyraX...
        </p>
        {/* Progress bar */}
        <div className="w-48 h-px bg-white/10 mt-2 overflow-hidden rounded-full">
          <div
            className="h-full bg-white/60 transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
