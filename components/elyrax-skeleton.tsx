"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/[0.03]",
        "after:absolute after:inset-0 after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent after:via-white/[0.04] after:to-transparent",
        className
      )}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}

export function GuildPageSkeleton() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
