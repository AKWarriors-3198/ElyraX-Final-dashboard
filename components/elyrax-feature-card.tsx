"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  status?: "active" | "inactive";
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  status,
  className,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a]",
        "hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-200",
        className
      )}
    >
      <div className="h-10 w-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.06] transition-colors">
        <Icon className="h-4.5 w-4.5 text-zinc-400 group-hover:text-white transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white truncate">{title}</h3>
          {status && (
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full shrink-0",
                status === "active" ? "bg-emerald-400" : "bg-zinc-600"
              )}
            />
          )}
        </div>
        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
    </Link>
  );
}
