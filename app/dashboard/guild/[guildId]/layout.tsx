import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Ticket,
  BarChart3,
  FileText,
  Settings,
  Hash,
  Shield,
  Layers,
  ArrowLeft,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export const revalidate = 0;

import { Button } from "@/components/ui/button";
import { GuildTabs } from "@/components/guild-tabs";

interface GuildLayoutProps {
  children: React.ReactNode;
  params: { guildId: string };
}

export default async function GuildLayout({
  children,
  params,
}: GuildLayoutProps) {
  const guildId = params.guildId;
  let guild;
  let error = null;

  try {
    guild = await api.getGuildDetails(guildId);
  } catch (err: any) {
    console.error("Failed to fetch guild details:", err);
    error = err.message || "Failed to load guild data.";
  }

  if (error || !guild) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-white/[0.08] rounded-xl bg-white/[0.01] p-12 text-center m-6">
        <ShieldAlert className="h-12 w-12 text-red-400/40 mb-4" />
        <h2 className="text-lg font-semibold text-white">Access Denied</h2>
        <p className="text-sm text-zinc-500 mt-2 max-w-md">
          {error || "This guild does not exist or you do not have permission to manage it."}
        </p>
        <Link href="/dashboard/guilds" className="mt-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            Back to Servers
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8 animate-fade-in">
      {/* Back button */}
      <Link
        href="/dashboard/guilds"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to all servers
      </Link>

      {/* Guild Header */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="relative">
            {guild.icon ? (
              <Image
                src={guild.icon}
                alt={guild.name}
                width={80}
                height={80}
                className="rounded-xl border border-white/[0.06] shadow-lg"
              />
            ) : (
              <div className="h-20 w-20 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-2xl font-bold text-zinc-400">
                {guild.name.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-display font-bold text-white tracking-tight">
                  {guild.name}
                </h1>
                <span className="px-2 py-0.5 bg-white/[0.03] rounded text-[10px] font-mono text-zinc-500 border border-white/[0.04]">
                  {guildId}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "Members", value: guild.member_count, icon: Users },
                { label: "Roles", value: guild.role_count, icon: Shield },
                { label: "Channels", value: guild.channel_count, icon: Hash },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 bg-white/[0.02] px-3 py-2 rounded-lg border border-white/[0.04]"
                >
                  <item.icon className="h-3.5 w-3.5 text-zinc-500" />
                  <div>
                    <p className="text-[10px] uppercase font-medium text-zinc-600 leading-none">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-white leading-none mt-0.5">
                      {item.value?.toLocaleString() ?? "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <Link href={`/dashboard/guild/${guildId}`}>
              <Button variant="default" size="sm" className="w-full gap-2">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </Link>
            <Link href={`/dashboard/guild/${guildId}/settings`}>
              <Button variant="secondary" size="sm" className="w-full gap-2">
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <GuildTabs guildId={guildId} />

      {/* Tab Content */}
      <div className="min-h-[400px]">{children}</div>
    </div>
  );
}
