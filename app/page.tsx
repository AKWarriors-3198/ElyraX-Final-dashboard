"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { LayoutDashboard, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { MouseParticles } from "@/components/landing/mouse-particles";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { FeatureMatrix } from "@/components/landing/feature-matrix";
import { SecuritySection } from "@/components/landing/security-section";
import { CommunitySection } from "@/components/landing/community-section";
import { TechnologySection } from "@/components/landing/technology-section";
import { CTASection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { MagneticButton } from "@/components/landing/magnetic-button";
import { cn } from "@/lib/utils";

function StatusSection() {
  return (
    <section className="py-8 px-6 border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              ElyraX System
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/[0.06] border border-emerald-400/10">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-400">Operational</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {[
              { name: "Discord API", status: "Operational" },
              { name: "Dashboard", status: "Operational" },
              { name: "Security", status: "Operational" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-zinc-500">{item.name}</span>
                <span className="text-[11px] text-emerald-400">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative z-10 pt-40 pb-24 px-6 overflow-hidden">
      <MouseParticles />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <ScrollReveal delay={100}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-medium mb-12 group relative">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            ElyraX Engine v2 Active
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[#0d0d0d] border border-white/[0.08] text-[11px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ElyraX systems are operational.
            </div>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-8">
          <ScrollReveal delay={200}>
            <span className="block">Powering smarter</span>
          </ScrollReveal>
          <ScrollReveal delay={350}>
            <span className="block text-zinc-500">Discord communities.</span>
          </ScrollReveal>
        </h1>

        <ScrollReveal delay={500}>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Advanced moderation, automation, security and community tools
            unified in one powerful Discord bot.
          </p>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal delay={650}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton strength={0.2}>
              <Button
                onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                variant="default"
                size="lg"
                className="gap-2.5 h-12 px-8"
              >
                <LayoutDashboard className="h-4 w-4" />
                Get Started
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="outline" size="lg" className="gap-2.5 h-12 px-8" asChild>
                <a href="/dashboard">
                  Dashboard
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>

      {/* Dashboard Preview */}
      <div className="mt-24 relative z-10">
        <ScrollReveal delay={800} direction="up" distance={40}>
          <DashboardPreview />
        </ScrollReveal>
      </div>
    </header>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-200 overflow-x-hidden">
      <LandingNavbar />

      <HeroSection />
      <StatusSection />
      <FeatureMatrix />
      <SecuritySection />
      <CommunitySection />
      <TechnologySection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
