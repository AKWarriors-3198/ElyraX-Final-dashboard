"use client";

import React from "react";
import { Users, Star, MessageSquare, Ticket, TrendingUp, Heart, Sparkles, UserPlus } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const FEATURES = [
  { name: "Leveling", desc: "XP, ranks, and rewards", icon: TrendingUp, stat: "42 Levels" },
  { name: "Welcome", desc: "Custom entry messages", icon: Sparkles, stat: "Active" },
  { name: "Reaction Roles", desc: "Self-assignable roles", icon: Heart, stat: "8 Roles" },
  { name: "Tickets", desc: "Support system", icon: Ticket, stat: "3 Open" },
  { name: "Invites", desc: "Growth tracking", icon: UserPlus, stat: "1.2K Invites" },
  { name: "Join DM", desc: "Personal welcomes", icon: MessageSquare, stat: "Configured" },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              Build communities
              <br />
              <span className="text-zinc-500">people stay in.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base text-zinc-500 max-w-2xl mx-auto">
              Engagement tools that keep members active, rewarded, and connected.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.name} delay={i * 80}>
              <div className="group p-6 rounded-xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden">
                {/* Light sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                      <feature.icon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/[0.06] px-2 py-0.5 rounded-full border border-emerald-400/10">
                      {feature.stat}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{feature.name}</h3>
                  <p className="text-sm text-zinc-500">{feature.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
