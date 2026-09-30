import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Hash, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  id: string | number;
  name: string;
  iconUrl?: string | null;
  memberCount: number;
  isActive?: boolean;
  className?: string;
}

export const ServerCard = ({
  id,
  name,
  iconUrl,
  memberCount,
  isActive = true,
  className,
}: ServerCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#0a0a0a] group",
        "hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-200 overflow-hidden",
        "h-full flex flex-col",
        className
      )}
    >
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            {iconUrl ? (
              <Image
                src={iconUrl}
                alt={name}
                width={56}
                height={56}
                className="rounded-xl border border-white/[0.06] shadow-lg"
              />
            ) : (
              <div className="h-14 w-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg font-bold text-zinc-400">
                {name.charAt(0)}
              </div>
            )}
            {isActive && (
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
            )}
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 mb-0.5">
              ID
            </span>
            <span className="text-[11px] font-mono text-zinc-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
              {id}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white truncate mb-3">
            {name}
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Users className="h-3.5 w-3.5" />
              <span>{memberCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Hash className="h-3.5 w-3.5" />
              <span>Managed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-white/[0.01] border-t border-white/[0.04]">
        <Link href={`/dashboard/guild/${id}`} className="block">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-between h-8 text-xs"
          >
            <span>Manage</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
