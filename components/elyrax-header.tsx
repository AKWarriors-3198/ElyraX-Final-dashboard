"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, Search, Bell, ChevronDown, LogOut, LifeBuoy, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn, isAdmin } from "@/lib/utils";
import { api } from "@/lib/api";

interface ElyraXHeaderProps {
  onMenuClick: () => void;
}

export function ElyraXHeader({ onMenuClick }: ElyraXHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalNotification, setGlobalNotification] = useState<string | null>(null);
  const { data: session } = useSession();

  const profileRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 lg:hidden text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:flex items-center w-72 relative">
          <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/15 focus:bg-white/[0.04] transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {globalNotification && (
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 p-4 z-50 animate-scale-in origin-top-right">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.06]">
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Notifications</p>
                <button
                  onClick={() => setGlobalNotification(null)}
                  className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Clear
                </button>
              </div>
              {globalNotification ? (
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
                  <p className="text-xs text-zinc-300 leading-relaxed">{globalNotification}</p>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <Bell className="h-6 w-6 text-zinc-700 mb-2" />
                  <p className="text-xs text-zinc-500">No notifications</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-white/[0.06] mx-1 hidden sm:block" />

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/[0.06]">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Avatar" width={28} height={28} className="h-full w-full object-cover" unoptimized />
              ) : (
                <User className="h-3.5 w-3.5 text-zinc-500" />
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-xs font-medium text-zinc-200">
                {session?.user?.name?.split(" ")[0] || "User"}
              </span>
              <span className="text-[10px] text-zinc-600 mt-0.5">
                {isAdmin(session?.user?.id) ? "Admin" : "Member"}
              </span>
            </div>
            <ChevronDown className={cn("h-3 w-3 text-zinc-600 transition-transform hidden sm:block", isProfileOpen && "rotate-180")} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 p-1.5 z-50 animate-scale-in origin-top-right">
              <div className="px-3 py-2 border-b border-white/[0.04] mb-1">
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Account</p>
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
      </div>
    </header>
  );
}
