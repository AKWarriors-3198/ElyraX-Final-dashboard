"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Server, ShieldCheck, Ticket, BarChart3, FileText, Settings,
  Menu, X, Bell, User, Search, ChevronRight, Star, Sparkles, LogOut,
  LifeBuoy, ChevronDown, Bot, Shield, Sword, SmilePlus, Link as LinkIcon,
  Mic, Volume2, Link2, Zap, Mail, Activity, Layers, CheckCircle2, Gamepad2,
  Music4, Globe, Lock, Cpu, Terminal, Radio, History, Users2, ArrowLeft,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn, isAdmin } from "@/lib/utils";
import { api } from "@/lib/api";
import { ElyraXLogo } from "./elyrax-logo";
import { useSidebar } from "./elyrax-sidebar-context";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarGroup {
  name: string;
  items: SidebarItem[];
}

export function ElyraXSidebar() {
  const { isOpen: isSidebarOpen, close: closeSidebar } = useSidebar();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const bellRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (bellRef.current && !bellRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    closeSidebar();
    setIsProfileOpen(false);
  }, [pathname, closeSidebar]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const config = await api.getAdminConfig();
        setGlobalNotification(config.global_notification);
      } catch (err) {
        // silent
      }
    };
    fetchNotification();
  }, []);

  const match = pathname.match(/\/dashboard\/guild\/([^\/]+)/);
  const currentGuildId = match ? match[1] : null;

  const guildNavGroups: SidebarGroup[] = currentGuildId
    ? [
        {
          name: "Overview",
          items: [
            { name: "Dashboard", href: `/dashboard/guild/${currentGuildId}`, icon: LayoutDashboard },
          ],
        },
        {
          name: "Security",
          items: [
            { name: "Anti-Nuke", href: `/dashboard/guild/${currentGuildId}/antinuke`, icon: ShieldCheck },
            { name: "Automod", href: `/dashboard/guild/${currentGuildId}/automod`, icon: Shield },
            { name: "Verification", href: `/dashboard/guild/${currentGuildId}/verification`, icon: CheckCircle2 },
          ],
        },
        {
          name: "Community",
          items: [
            { name: "Welcome", href: `/dashboard/guild/${currentGuildId}/welcome`, icon: SmilePlus },
            { name: "Leveling", href: `/dashboard/guild/${currentGuildId}/leveling`, icon: BarChart3 },
            { name: "Invites", href: `/dashboard/guild/${currentGuildId}/invites`, icon: LinkIcon },
            { name: "Tracking", href: `/dashboard/guild/${currentGuildId}/tracking`, icon: Activity },
            { name: "Reaction Roles", href: `/dashboard/guild/${currentGuildId}/reactionroles`, icon: Layers },
            { name: "Auto Role", href: `/dashboard/guild/${currentGuildId}/autorole`, icon: Bot },
            { name: "Auto React", href: `/dashboard/guild/${currentGuildId}/autoreact`, icon: Zap },
            { name: "Join DM", href: `/dashboard/guild/${currentGuildId}/joindm`, icon: Mail },
            { name: "Vanity Roles", href: `/dashboard/guild/${currentGuildId}/vanityroles`, icon: Star },
          ],
        },
        {
          name: "Utility",
          items: [
            { name: "Tickets", href: `/dashboard/guild/${currentGuildId}/tickets`, icon: Ticket },
            { name: "Join to Create", href: `/dashboard/guild/${currentGuildId}/j2c`, icon: Mic },
            { name: "Voice Role", href: `/dashboard/guild/${currentGuildId}/invcrole`, icon: Volume2 },
            { name: "Custom Roles", href: `/dashboard/guild/${currentGuildId}/customroles`, icon: Sparkles },
          ],
        },
        {
          name: "System",
          items: [
            { name: "Logging", href: `/dashboard/guild/${currentGuildId}/logging`, icon: FileText },
            { name: "Settings", href: `/dashboard/guild/${currentGuildId}/settings`, icon: Settings },
          ],
        },
      ]
    : [];

  const globalNavItems: SidebarItem[] = currentGuildId
    ? [{ name: "Back to Servers", href: "/dashboard/guilds", icon: ArrowLeft }]
    : [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Servers", href: "/dashboard/guilds", icon: Server },
        ...(isAdmin(session?.user?.id)
          ? [{ name: "Admin Panel", href: "/dashboard/admin", icon: Shield }]
          : []),
      ];

  const allGroups = [...guildNavGroups];
  if (!currentGuildId && globalNavItems.length > 0) {
    allGroups.unshift({ name: "Navigation", items: globalNavItems });
  }

  const backLinkItem = currentGuildId ? globalNavItems[0] : null;

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-[260px] transform transition-transform duration-300 ease-out lg:translate-x-0",
          "flex flex-col",
          "bg-[#050505]/95 backdrop-blur-xl border-r border-white/[0.06]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-5 flex-shrink-0 border-b border-white/[0.04]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <ElyraXLogo size="sm" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white font-display leading-none">
                ElyraX
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-500 mt-0.5">
                Dashboard
              </span>
            </div>
          </Link>
          <button
            className="ml-auto p-1.5 lg:hidden text-zinc-500 hover:text-white rounded-md transition-colors"
            onClick={closeSidebar}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-5">
          {allGroups.map((group) => (
            <div key={group.name}>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-2">
                {group.name}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group relative",
                        isActive
                          ? "text-white bg-white/[0.06]"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-white rounded-r-full" />
                      )}
                      <item.icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Back to Servers */}
        {backLinkItem && (
          <div className="px-3 py-2 flex-shrink-0">
            <div className="h-px bg-white/[0.04] mb-2" />
            <Link
              href={backLinkItem.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03] transition-all"
            >
              <backLinkItem.icon className="h-4 w-4 text-zinc-600" />
              {backLinkItem.name}
            </Link>
          </div>
        )}

        {/* User Profile */}
        <div className="flex-shrink-0 p-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/[0.06]">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <User className="h-4 w-4 text-zinc-500" />
              )}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-medium text-white truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                {isAdmin(session?.user?.id) ? "Administrator" : "Member"}
              </p>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-zinc-600 transition-transform", isProfileOpen && "rotate-180")} />
          </div>

          {isProfileOpen && (
            <div className="mt-2 p-1.5 rounded-lg bg-[#0d0d0d] border border-white/[0.06] animate-scale-in">
              <div className="px-3 py-2 border-b border-white/[0.04] mb-1">
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Signed in as</p>
                <p className="text-xs font-medium text-white truncate">{session?.user?.name || "User"}</p>
              </div>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
                <LifeBuoy className="h-3.5 w-3.5" />
                Support
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
