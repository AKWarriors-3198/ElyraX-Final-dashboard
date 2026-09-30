"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "error" | "warning";
  label?: string;
  className?: string;
}

const statusConfig = {
  active: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/[0.06]",
    border: "border-emerald-400/10",
  },
  inactive: {
    dot: "bg-zinc-500",
    text: "text-zinc-500",
    bg: "bg-zinc-500/[0.06]",
    border: "border-zinc-500/10",
  },
  pending: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/[0.06]",
    border: "border-amber-400/10",
  },
  error: {
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/[0.06]",
    border: "border-red-400/10",
  },
  warning: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/[0.06]",
    border: "border-amber-400/10",
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {displayLabel}
    </span>
  );
}
