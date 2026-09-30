"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { MagneticButton } from "./magnetic-button";

export function CTASection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto relative rounded-2xl p-16 md:p-24 overflow-hidden bg-[#0a0a0a] border border-white/[0.06] text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-6">
              Ready to upgrade
              <br />
              <span className="text-zinc-500">your server?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-base text-zinc-500 max-w-xl mx-auto mb-10">
              Bring powerful moderation, automation and community tools to your Discord server.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <Button
                  onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                  variant="default"
                  size="lg"
                  className="gap-2.5 h-12 px-8"
                >
                  Add ElyraX
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2.5 h-12 px-8"
                  asChild
                >
                  <a href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Open Dashboard
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
