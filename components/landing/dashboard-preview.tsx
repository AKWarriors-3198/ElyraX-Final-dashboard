"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Shield,
  Users,
  Activity,
  Settings,
  Server,
  Zap,
  BarChart3,
  FileText,
  Ticket,
  Bot,
  Hash,
  ChevronRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ guilds: 0, users: 0, commands: 0 });
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Fetch real bot data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const botInfo = await api.getBotInfo();
        setStats({
          guilds: botInfo.guilds,
          users: botInfo.users,
          commands: botInfo.commands,
        });
      } catch (err) {
        // Use fallback values if API is unavailable
        setStats({ guilds: 0, users: 0, commands: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Animate stats counting up
  useEffect(() => {
    if (loading) return;
    const targets = { guilds: stats.guilds, users: stats.users, commands: stats.commands };
    const duration = 1500;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStats({
        guilds: Math.floor(targets.guilds * eased),
        users: Math.floor(targets.users * eased),
        commands: Math.floor(targets.commands * eased),
      });
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [loading]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -3, y: x * 3 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "security", label: "Security", icon: Shield },
    { id: "community", label: "Community", icon: Users },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow */}
        <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[32px] blur-2xl" />

        {/* Window */}
        <div className="relative bg-[#050505] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          {/* Title bar */}
          <div className="h-10 border-b border-white/[0.04] flex items-center justify-between px-4 bg-white/[0.01]">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-zinc-700" />
              <div className="h-2 w-2 rounded-full bg-zinc-700" />
              <div className="h-2 w-2 rounded-full bg-zinc-700" />
            </div>
            <div className="px-3 py-0.5 rounded bg-white/[0.03] border border-white/[0.04] text-[9px] font-mono text-zinc-600">
              elyrax.dashboard
            </div>
            <div className="w-10" />
          </div>

          <div className="flex">
            {/* Mini sidebar */}
            <div className="w-14 border-r border-white/[0.04] bg-white/[0.005] p-2 flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Server className="h-3.5 w-3.5 text-zinc-500" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <Shield className="h-3.5 w-3.5 text-zinc-600" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <Users className="h-3.5 w-3.5 text-zinc-600" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-zinc-600" />
              </div>
              <div className="h-8 w-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                <Settings className="h-3.5 w-3.5 text-zinc-600" />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
              {/* Tabs */}
              <div className="flex gap-1 mb-4 p-0.5 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-600 hover:text-zinc-400"
                    )}
                  >
                    <tab.icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Guilds", value: stats.guilds, icon: Server },
                  { label: "Users", value: stats.users, icon: Users },
                  { label: "Commands", value: stats.commands, icon: Zap },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <stat.icon className="h-3 w-3 text-zinc-600" />
                      <span className="text-[9px] text-zinc-600 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-white font-mono">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Content based on active tab */}
              <div className="space-y-2">
                {activeTab === "overview" && (
                  <>
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-zinc-500">System Status</span>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[9px] text-emerald-400">Operational</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {["Gateway", "Database", "Edge Network"].map((s) => (
                          <div key={s} className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500">{s}</span>
                            <span className="text-[9px] text-emerald-400">Active</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[10px] text-zinc-500">Recent Activity</span>
                      <div className="mt-2 space-y-1.5">
                        {[
                          { text: "Anti-Nuke protection enabled", time: "2m ago" },
                          { text: "New member verified", time: "5m ago" },
                          { text: "Level up notification sent", time: "12m ago" },
                        ].map((a, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-[10px] text-zinc-400">{a.text}</span>
                            <span className="text-[9px] text-zinc-600">{a.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "security" && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="space-y-2">
                      {[
                        { name: "Anti-Nuke", status: "Protected", icon: Shield },
                        { name: "AutoMod", status: "Active", icon: Zap },
                        { name: "Verification", status: "Enabled", icon: CheckCircle2 },
                        { name: "Logging", status: "Active", icon: FileText },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <m.icon className="h-3 w-3 text-zinc-500" />
                            <span className="text-[10px] text-zinc-300">{m.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-1 w-1 rounded-full bg-emerald-400" />
                            <span className="text-[9px] text-emerald-400">{m.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "community" && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="space-y-2">
                      {[
                        { name: "Leveling", status: "Active", level: 42 },
                        { name: "Welcome", status: "Configured", level: 0 },
                        { name: "Reaction Roles", status: "Active", level: 8 },
                        { name: "Invites", status: "Tracking", level: 0 },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                          <span className="text-[10px] text-zinc-300">{m.name}</span>
                          <span className="text-[9px] text-emerald-400">{m.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "automation" && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="space-y-2">
                      {[
                        { name: "Auto Role", status: "Active" },
                        { name: "Auto React", status: "Active" },
                        { name: "Join DM", status: "Configured" },
                        { name: "Tracking", status: "Active" },
                      ].map((m) => (
                        <div key={m.name} className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                          <span className="text-[10px] text-zinc-300">{m.name}</span>
                          <span className="text-[9px] text-emerald-400">{m.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "settings" && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="space-y-2">
                      {[
                        { name: "Command Prefix", value: "!" },
                        { name: "Language", value: "English" },
                        { name: "Timezone", value: "UTC" },
                      ].map((s) => (
                        <div key={s.name} className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                          <span className="text-[10px] text-zinc-400">{s.name}</span>
                          <span className="text-[10px] text-white font-mono">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
