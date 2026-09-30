"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  ChevronLeft,
  Search,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Search as SearchIcon,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { ElyraXBackground } from "@/components/elyrax-background";

const DOCS_NAV = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", description: "Learn about ElyraX." },
      { name: "Quick Start", description: "Deploy in 30 seconds." },
      { name: "Architecture", description: "Deep dive into our engine." },
    ],
  },
  {
    title: "Security Modules",
    items: [
      { name: "Anti-Nuke", description: "Absolute lockdown protocols." },
      { name: "Verification", description: "Captcha & checks." },
      { name: "Automod", description: "Context-aware filtering." },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Join to Create", description: "Dynamic voice channels." },
      { name: "Leveling", description: "Rank generation." },
      { name: "Tickets", description: "Enterprise helpdesk." },
    ],
  },
];

export default function DocsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Introduction");

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <ElyraXBackground />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-black/70 backdrop-blur-xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <ElyraXLogo size="sm" />
            <span className="text-sm font-semibold text-white font-display tracking-tighter hidden md:block">
              ElyraX Docs
            </span>
          </Link>

          <div className="hidden lg:flex items-center w-72 relative">
            <SearchIcon className="absolute left-3 h-3.5 w-3.5 text-zinc-600" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/15 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 text-zinc-400"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white gap-2">
              <ChevronLeft className="h-3.5 w-3.5" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex pt-16">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 bg-black border-r border-white/[0.04] pt-16 transition-transform lg:translate-x-0 lg:static lg:bg-transparent",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full p-6 overflow-y-auto no-scrollbar">
            {DOCS_NAV.map((section) => (
              <div key={section.title} className="mb-8">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-3">
                  {section.title}
                </h4>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex flex-col items-start gap-0.5 p-3 rounded-lg transition-all text-left",
                        activeTab === item.name
                          ? "bg-white/[0.06] border border-white/[0.08]"
                          : "hover:bg-white/[0.02] border border-transparent"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm font-medium",
                          activeTab === item.name ? "text-white" : "text-zinc-400"
                        )}
                      >
                        {item.name}
                      </span>
                      <span className="text-[11px] text-zinc-600">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 lg:p-12 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 text-[11px] font-medium mb-6">
            <BookOpen className="h-3 w-3" />
            ElyraX Documentation
          </div>

          <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-6">
            {activeTab}
          </h1>

          <div className="space-y-6">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Welcome to the {activeTab} section of the ElyraX documentation.
              ElyraX is designed for communities that demand absolute performance
              and premium management tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-white/[0.06] bg-[#0a0a0a] space-y-3">
                <Zap className="h-5 w-5 text-zinc-500" />
                <h3 className="text-sm font-semibold text-white">Fast Dispatch</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Commands are dispatched via our global edge network in under 12ms.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-white/[0.06] bg-[#0a0a0a] space-y-3">
                <ShieldCheck className="h-5 w-5 text-zinc-500" />
                <h3 className="text-sm font-semibold text-white">Secure Node</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Every module runs in a dedicated sandbox with AES-256 encryption.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0a0a] border border-white/[0.06] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                <Layers className="h-24 w-24 text-white" />
              </div>
              <h2 className="text-base font-semibold text-white mb-3">Architecture</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                ElyraX utilizes a decentralized event stream processing model.
                When a Discord event is received, it is instantly routed to the
                nearest edge cluster.
              </p>
              <div className="bg-black/40 p-4 rounded-lg border border-white/[0.06] font-mono text-xs text-zinc-500">
                $ elyrax initialize --cluster-shard [edge_07] --mode enterprise
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.04] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase text-zinc-600 tracking-wider mb-1">
                Reference
              </p>
              <p className="text-xs text-zinc-500">DOC-ID: EX_2026_A</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-zinc-500">Live</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
