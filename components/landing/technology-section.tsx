"use client";

import React from "react";
import { Zap, Shield, RefreshCw, Lock, Globe, Cpu } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const FEATURES = [
  { icon: Zap, title: "Fast Dashboard", desc: "Sub-second load times" },
  { icon: RefreshCw, title: "Real-time Config", desc: "Instant synchronization" },
  { icon: Globe, title: "Discord Integration", desc: "Native API connection" },
  { icon: Lock, title: "Secure Auth", desc: "NextAuth + OAuth2" },
  { icon: Cpu, title: "Modern Stack", desc: "Next.js + TypeScript" },
  { icon: Shield, title: "Encrypted Data", desc: "AES-256 at rest" },
];

export function TechnologySection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[32px] blur-2xl" />
              <div className="relative bg-[#050505] border border-white/[0.08] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Built for speed.</h3>
                    <p className="text-[11px] text-zinc-500">Technical architecture</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map((f) => (
                    <div
                      key={f.title}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                    >
                      <f.icon className="h-4 w-4 text-zinc-500 mb-2" />
                      <h4 className="text-xs font-medium text-white">{f.title}</h4>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-medium mb-6">
                <Zap className="h-3 w-3" />
                Technology
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-6">
                Built for
                <br />
                <span className="text-zinc-500">speed.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-base text-zinc-500 leading-relaxed mb-8 max-w-lg">
                A modern stack designed for performance, reliability, and scale.
                Every interaction is optimized for speed.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="space-y-3">
                {[
                  "Next.js 14 with App Router",
                  "TypeScript for type safety",
                  "Tailwind CSS for styling",
                  "NextAuth for authentication",
                  "Real-time Discord integration",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
