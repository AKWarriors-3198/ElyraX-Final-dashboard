"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 600,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const directionStyles = {
    up: { initial: `translateY(${distance}px)`, final: "translateY(0)" },
    down: { initial: `translateY(-${distance}px)`, final: "translateY(0)" },
    left: { initial: `translateX(${distance}px)`, final: "translateX(0)" },
    right: { initial: `translateX(-${distance}px)`, final: "translateX(0)" },
    none: { initial: "none", final: "none" },
  };

  const { initial, final } = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out will-change-transform", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? final : initial,
        filter: isVisible ? "blur(0)" : "blur(8px)",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
