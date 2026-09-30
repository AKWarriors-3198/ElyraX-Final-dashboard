"use client";

import React, { useState, useEffect } from "react";
import { Shield, ShieldCheck, Zap, CheckCircle2, FileText, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

const MODULES = [
  { name: "Anti-Nuke", status: "Protected", icon: Shield, color: "text-emerald-400" },
  { name: "AutoMod", status: "Active", icon: Zap, color: "text-emerald-400" },
  { name: "Verification", status: "Enabled", icon: CheckCircle2, color: "text-emerald-400" },
  { name: "Logging", status: "Active", icon: FileText, color: "text-emerald-400" },
];

const EVENTS = [
  { type: "security", text: "Anti-Nuke protection triggered", time: "2m ago" },
  { type: "security", text: "Raid attempt blocked", time: "15m ago" },
  { type: "moderation", text: "AutoMod removed spam message", time: "23m ago" },
  { type: "security", text: "New admin verified", time: "1h ago" },
];

export function SecuritySection() {
  const [scanLine, setScanLine] = useState(0);
  const [visibleModules, setVisibleModules] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = MODULES.map((_, i) =>
      setTimeout(() => setVisibleModules(i + 1), 400 * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="security" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-medium mb-6">
                <Shield className="h-3 w-3" />
                Security
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-6">
                Built to protect
                <br />
                <span className="text-zinc-500">your community.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-base text-zinc-500 leading-relaxed mb-8 max-w-lg">
                Advanced security modules work together to detect, prevent, and respond to threats
                in real-time. Your server stays protected so you can focus on building your community.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="space-y-3">
                {MODULES.map((mod, i) => (
                  <div
                    key={mod.name}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] transition-all duration-500",
                      i < visibleModules ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <mod.icon className={cn("h-4 w-4", mod.color)} />
                      <span className="text-sm font-medium text-white">{mod.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-medium text-emerald-400">{mod.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Security Panel */}
          <ScrollReveal delay={200} direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[32px] blur-2xl" />
              <div className="relative bg-[#050505] border border-white/[0.08] rounded-2xl overflow-hidden">
                {/* Scan line */}
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10"
                  style={{ top: `${scanLine}%` }}
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                        <Shield className="h-5 w-5 text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">Security Center</h3>
                        <p className="text-[11px] text-zinc-500">Real-time protection status</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/[0.06] border border-emerald-400/10">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-medium text-emerald-400">Protected</span>
                    </div>
                  </div>

                  {/* Protection layers */}
                  <div className="space-y-2 mb-6">
                    {[
                      { name: "Anti-Nuke", desc: "Mass-ban & kick protection", active: true },
                      { name: "AutoMod", desc: "Spam & mention filtering", active: true },
                      { name: "Verification", desc: "Bot & alt detection", active: true },
                      { name: "Role Guard", desc: "Role hierarchy protection", active: true },
                    ].map((layer) => (
                      <div
                        key={layer.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Lock className="h-3.5 w-3.5 text-zinc-500" />
                          <div>
                            <span className="text-xs font-medium text-white">{layer.name}</span>
                            <p className="text-[10px] text-zinc-600">{layer.desc}</p>
                          </div>
                        </div>
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      </div>
                    ))}
                  </div>

                  {/* Activity */}
                  <div>
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                      Recent Events
                    </span>
                    <div className="mt-2 space-y-1.5">
                      {EVENTS.map((event, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/[0.03]"
                        >
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-amber-400/60" />
                            <span className="text-[11px] text-zinc-400">{event.text}</span>
                          </div>
                          <span className="text-[10px] text-zinc-600">{event.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
