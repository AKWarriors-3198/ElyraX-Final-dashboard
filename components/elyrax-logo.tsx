"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ElyraXLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

export function ElyraXLogo({ size = "md", animated = false, className }: ElyraXLogoProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          sizeMap[size],
          animated && "animate-scale-in"
        )}
      >
        <Image
          src="/elyrax-logo.jpg"
          alt="ElyraX"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
      </div>
    </div>
  );
}

export function ElyraXLogoWithText({
  size = "md",
  animated = false,
  className,
}: ElyraXLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ElyraXLogo size={size} animated={animated} />
      <div className="flex flex-col">
        <span className="font-display font-bold text-white tracking-tight leading-none">
          ElyraX
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
          Dashboard
        </span>
      </div>
    </div>
  );
}
