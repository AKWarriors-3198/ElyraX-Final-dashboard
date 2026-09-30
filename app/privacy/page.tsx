"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { ElyraXBackground } from "@/components/elyrax-background";

export default function PrivacyPage() {
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
            <ShieldCheck className="h-3 w-3" />
            Privacy Policy
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-10">
            Privacy Policy
          </h1>

          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-8 md:p-10 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <Eye className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">Data Collection</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                ElyraX collects only the minimum necessary data to function within Discord.
                This includes your Discord User ID, Server (Guild) ID, and configuration
                settings provided during setup. We do not store message content unless
                explicitly configured for logging purposes by server administrators.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <Lock className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">Data Integrity</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                All configuration data is AES-256 encrypted at rest. Our vaults are
                distributed across global edge nodes, ensuring that your server settings
                are both secure and instantly available. We never sell or distribute your
                data to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <FileText className="h-4 w-4 text-zinc-400" />
                </div>
                <h2 className="text-base font-semibold">User Rights</h2>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You have the right to request a full dump of your data or immediate
                deletion of all configurations associated with your Discord account or
                guild. These requests can be initialized through our support channels or
                directly within the dashboard settings.
              </p>
            </section>

            <div className="pt-6 border-t border-white/[0.04]">
              <p className="text-[11px] text-zinc-600">
                Last Modified: 2026 // ElyraX Development
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
