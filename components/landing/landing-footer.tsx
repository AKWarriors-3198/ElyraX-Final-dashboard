"use client";

import React from "react";
import Link from "next/link";
import { ElyraXLogo } from "@/components/elyrax-logo";

export function LandingFooter() {
  return (
    <footer className="py-16 border-t border-white/[0.04] relative">
      {/* Subtle glow behind logo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/[0.01] blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ElyraXLogo size="sm" />
              <span className="text-lg font-display font-semibold text-white">ElyraX</span>
            </div>
            <p className="text-sm text-zinc-600 max-w-sm leading-relaxed">
              The high-performance Discord engine for communities that demand excellence.
              Secure, fast, and infinitely scalable.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#security" className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#community" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 ElyraX Development. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
