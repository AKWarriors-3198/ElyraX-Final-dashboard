import React from "react";
import {
  Plus,
  Settings2,
  Terminal,
  Database,
  Search,
  Zap,
  ShieldCheck,
  Ticket,
  BarChart3,
  FileText,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function GuildOverviewPage({ params }: { params: { guildId: string } }) {
  const modules = [
    { title: "Auto Moderation", desc: "Anti-spam, bad words, and links protection.", icon: ShieldCheck, href: `/dashboard/guild/${params.guildId}/automod`, status: "Active" },
    { title: "Ticket System", desc: "Helpdesk for user support and inquiries.", icon: Ticket, href: `/dashboard/guild/${params.guildId}/tickets`, status: "Configured" },
    { title: "Leveling", desc: "Gamify your community with XP and ranks.", icon: BarChart3, href: `/dashboard/guild/${params.guildId}/leveling`, status: "Active" },
    { title: "Event Logging", desc: "Detailed audit logs for every server event.", icon: FileText, href: `/dashboard/guild/${params.guildId}/logging`, status: "Active" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Config Column */}
      <div className="space-y-6">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-white">Active Modules</h2>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modules.map((mod) => (
              <Link
                key={mod.title}
                href={mod.href}
                className="group p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                    <mod.icon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/[0.06] px-2 py-0.5 rounded-full border border-emerald-400/10">
                    {mod.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-white mb-0.5">{mod.title}</h3>
                <p className="text-[11px] text-zinc-600">{mod.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-white">System Console</h2>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="bg-[#050505] border border-white/[0.06] rounded-xl p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
              <Terminal className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-zinc-500">guild_event_stream_{params.guildId}</span>
            </div>
            <div className="space-y-1.5 opacity-70">
              <p className="text-zinc-600">
                [{new Date().toLocaleTimeString()}]{" "}
                <span className="text-emerald-400">INIT</span> Dashboard connected...
              </p>
              <p className="text-zinc-600">
                [{new Date().toLocaleTimeString()}]{" "}
                <span className="text-zinc-400">INFO</span> Fetching guild_config...
              </p>
              <p className="text-zinc-600">
                [{new Date().toLocaleTimeString()}]{" "}
                <span className="text-emerald-400">DONE</span> Cache synchronized.
              </p>
              <p className="text-zinc-500 animate-pulse">_</p>
            </div>
          </div>
        </section>
      </div>

      {/* Integration Status Column */}
      <div className="space-y-6">
        <section className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
            <Database className="h-32 w-32 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-white mb-1">Database Status</h2>
          <p className="text-xs text-zinc-500 mb-5">
            All guild data is encrypted and replicated across the ElyraX network.
          </p>

          <div className="space-y-3 relative z-10">
            {[
              { label: "Uptime", value: "99.98%", icon: Zap },
              { label: "Sync Delay", value: "12ms", icon: Activity },
              { label: "Region", value: "Global Edges", icon: Database },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="flex items-center gap-2.5">
                  <stat.icon className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-400">{stat.label}</span>
                </div>
                <span className="text-xs font-medium text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Security Context</h2>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-2 border-emerald-400/20 flex items-center justify-center relative">
              <div className="h-12 w-12 rounded-full border-2 border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                100%
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Trust Factor</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Bot is fully authenticated with administrator privileges.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
