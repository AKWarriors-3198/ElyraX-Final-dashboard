"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showHome?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this page. Please try again.",
  onRetry,
  showHome = true,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="h-14 w-14 rounded-xl bg-red-500/[0.06] border border-red-500/10 flex items-center justify-center mb-5">
        <AlertTriangle className="h-6 w-6 text-red-400/60" />
      </div>

      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="default"
            className="flex-1 gap-2 h-10"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </Button>
        )}
        {showHome && (
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full gap-2 h-10">
              <Home className="h-3.5 w-3.5" />
              Go Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
