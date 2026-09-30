"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Scale, Terminal, ShieldAlert, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { ElyraXBackground } from "@/components/elyrax-background";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <ElyraXBackground />

      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-black/70 backdrop-blur-xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <ElyraXLogo size="sm" />
          <span className="text-sm font-semibold text-white font-display tracking-tighter">
            ElyraX
          </span>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white gap-2">
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Home
          </Button>
        </Link>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-medium mb-6">
            <Scale className="h-3 w-3" />
            Terms of Service
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-10">
            Terms of Service
          </h1>

          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-8 md:p-10 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">Acceptance of Terms</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                By integrating ElyraX into your Discord server, you agree to abide by
                these terms. The bot is provided &quot;as is,&quot; and while we strive for
                100% uptime through our edge clusters, we are not liable for any data
                loss resulting from third-party API disruptions.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">Usage Constraints</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You may not use ElyraX for any illicit activities, including but not
                limited to: automated harassment, token logging, or raid coordination.
                Violation of these constraints will result in immediate deauthorization
                and blacklisting from the global cluster network.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">API & Scaling</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We reserve the right to throttle or limit API access for guilds that
                exceed disproportionate resource allocations. High-scale enterprise
                clusters are available for communities requiring dedicated shards.
              </p>
            </section>

            <div className="pt-6 border-t border-white/[0.04]">
              <p className="text-[11px] text-zinc-600">
                2026 // ElyraX Development
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
