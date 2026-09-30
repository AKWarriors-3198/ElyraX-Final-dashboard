"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { MagneticButton } from "./magnetic-button";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["features", "security", "community", "docs"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ElyraXLogo size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white font-display leading-none">
              ElyraX
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-500 mt-0.5">
              Dashboard
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-medium text-zinc-500">
          {[
            { name: "Features", href: "#features" },
            { name: "Security", href: "#security" },
            { name: "Community", href: "#community" },
            { name: "Docs", href: "/docs" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "hover:text-white transition-colors relative py-1",
                activeSection === item.name.toLowerCase() && "text-white"
              )}
            >
              {item.name}
              {activeSection === item.name.toLowerCase() && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-white/60" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton strength={0.15}>
            <Button
              onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
              variant="default"
              size="sm"
              className="gap-2 h-9"
            >
              <LogIn className="h-3.5 w-3.5" />
              Get Started
            </Button>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
