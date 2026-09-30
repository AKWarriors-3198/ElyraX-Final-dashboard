import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ShieldCheck, ChevronRight, Hash, Server } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { GuildSummary } from "@/types/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RetryButton } from "@/components/elyrax-retry-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GuildsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    redirect("/");
  }

  let botGuilds: GuildSummary[] = [];
  let userGuilds: any[] = [];
  let userDiscordError: string | null = null;
  let botError: string | null = null;

  try {
    botGuilds = await api.listGuilds();
  } catch (err: any) {
    console.error("Failed to fetch bot guilds:", err);
    botError = err.message || "Failed to load bot servers.";
  }

  try {
    const res = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      userGuilds = await res.json();
    } else {
      userDiscordError = "Failed to fetch your Discord servers.";
    }
  } catch (err) {
    console.error("Discord API Error:", err);
    userDiscordError = "Error connecting to Discord.";
  }

  const MANAGE_GUILD = BigInt(0x20);
  const ADMINISTRATOR = BigInt(0x8);
  const adminUserGuilds = userGuilds.filter((g) => {
    try {
      const perms = BigInt(g.permissions);
      return (
        (perms & ADMINISTRATOR) === ADMINISTRATOR ||
        (perms & MANAGE_GUILD) === MANAGE_GUILD ||
        g.owner === true
      );
    } catch {
      return g.owner === true;
    }
  });

  const adminGuildIds = new Set(adminUserGuilds.map((g) => String(g.id)));
  const guilds = botGuilds.filter((g) => adminGuildIds.has(String(g.id)));
  const error = botError || userDiscordError;

  return (
    <div className="space-y-6 p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Your Servers
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Select a server to manage its configuration and modules.
          </p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400">
          <span className="text-white">{guilds.length}</span> server{guilds.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Error State */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-white/[0.08] rounded-xl">
          <div className="h-12 w-12 rounded-xl bg-red-500/[0.06] border border-red-500/10 flex items-center justify-center mb-4">
            <ShieldCheck className="h-5 w-5 text-red-400/60" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">Connection Error</h3>
          <p className="text-xs text-zinc-500 max-w-sm mb-4">{error}</p>
          <RetryButton />
        </div>
      ) : guilds.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-white/[0.08] rounded-xl">
          <div className="h-14 w-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
            <Server className="h-6 w-6 text-zinc-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No Servers Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mb-6">
            The bot hasn&apos;t joined any servers yet, or you don&apos;t have permission to manage any.
          </p>
          <Button variant="default" size="sm">
            Invite ElyraX to Discord
          </Button>
        </div>
      ) : (
        /* Server Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {guilds.map((guild) => (
            <div
              key={guild.id}
              className="group rounded-xl border border-white/[0.06] bg-[#0a0a0a] hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {guild.icon_url ? (
                      <Image
                        src={guild.icon_url}
                        alt={guild.name}
                        width={56}
                        height={56}
                        className="rounded-xl border border-white/[0.06] shadow-lg"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg font-bold text-zinc-400">
                        {guild.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 mb-1">
                      ID
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
                      {guild.id}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white truncate mb-3">
                    {guild.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Users className="h-3.5 w-3.5" />
                      <span>{guild.member_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Hash className="h-3.5 w-3.5" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-white/[0.01] border-t border-white/[0.04]">
                <Link href={`/dashboard/guild/${guild.id}`} className="block">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-between h-9 text-xs"
                  >
                    <span>Manage Server</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
