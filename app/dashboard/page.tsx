import React from "react";
import {
  Users,
  MessageSquare,
  Zap,
  Activity,
  Server as ServerIcon,
  ShieldAlert,
  Settings,
  LifeBuoy,
  FileText,
  ArrowRight,
} from "lucide-react";
import { ElyraXLogo } from "@/components/elyrax-logo";
import { RetryStatsButton } from "@/components/elyrax-retry-stats";

export default async function DashboardPage() {
  let botInfo;
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/bot-info`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch bot info");
    botInfo = await res.json();
  } catch (err: any) {
    console.error("Failed to fetch bot info:", err);
    error = err.message || "Failed to connect to the bot API.";
    botInfo = null;
  }

  const stats = botInfo
    ? [
        { name: "Total Guilds", value: botInfo.guilds.toLocaleString(), icon: ServerIcon },
        { name: "Total Users", value: botInfo.users.toLocaleString(), icon: Users },
        { name: "Commands", value: botInfo.commands.toLocaleString(), icon: Zap },
        { name: "API Latency", value: botInfo.latency, icon: Activity },
      ]
    : [];

  return (
    <div className="space-y-8 p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ElyraXLogo size="sm" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
              ElyraX Dashboard
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your Discord communities with ElyraX.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/[0.06] border border-red-500/10 text-red-400 text-xs">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      {botInfo ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="group relative p-5 rounded-xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-display font-bold text-white mt-1 tracking-tight">
                    {stat.value}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                  <stat.icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-white/[0.06] bg-[#0a0a0a] flex flex-col items-center justify-center text-center"
            >
              <ShieldAlert className="h-6 w-6 text-red-400/60 mb-2" />
              <p className="text-xs text-zinc-500">Unable to load stats</p>
              <RetryStatsButton />
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Quick Actions</h2>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              ElyraX
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Manage Servers", desc: "View and configure your Discord guilds.", icon: ServerIcon, href: "/dashboard/guilds" },
              { title: "Documentation", desc: "Learn how to master ElyraX.", icon: FileText, href: "/docs" },
              { title: "Support", desc: "Get help from our team.", icon: LifeBuoy, href: "#" },
              { title: "Settings", desc: "Adjust your dashboard preferences.", icon: Settings, href: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.04] group hover:bg-white/[0.04] hover:border-white/[0.08] transition-all"
              >
                <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                  <p className="text-[11px] text-zinc-600 truncate">{item.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Module Status */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
          <h2 className="text-sm font-semibold text-white mb-1">System Status</h2>
          <p className="text-xs text-zinc-600 mb-5">ElyraX operational health</p>

          <div className="space-y-3">
            {[
              { name: "Gateway", status: "Operational" },
              { name: "Database", status: "Synchronized" },
              { name: "Edge Network", status: "Operational" },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-xs font-medium text-zinc-400">{service.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-medium text-emerald-400">{service.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-zinc-500">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
