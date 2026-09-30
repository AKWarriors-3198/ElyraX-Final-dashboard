"use client";

import React from "react";
import { Shield, Users, Zap, Wrench, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const CATEGORIES = [
  {
    name: "Security",
    icon: Shield,
    features: ["Anti-Nuke", "AutoMod", "Verification", "Protection"],
  },
  {
    name: "Community",
    icon: Users,
    features: ["Leveling", "Welcome", "Reaction Roles", "Invites"],
  },
  {
    name: "Automation",
    icon: Zap,
    features: ["Auto Role", "Auto React", "Join DM", "Tracking"],
  },
  {
    name: "Utility",
    icon: Wrench,
    features: ["Tickets", "Join to Create", "Custom Roles", "Voice Roles"],
  },
];

export function FeatureMatrix() {
  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              Everything your
              <br />
              <span className="text-zinc-500">server needs.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base text-zinc-500 max-w-2xl mx-auto">
              Powerful tools designed to work together.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 100}>
              <div className="group p-6 rounded-xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden h-full">
                {/* Light sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>

                <div className="relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:bg-white/[0.06] transition-colors">
                    <cat.icon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-4">{cat.name}</h3>
                  <div className="space-y-2">
                    {cat.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="text-sm text-zinc-400">{feature}</span>
                        <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
