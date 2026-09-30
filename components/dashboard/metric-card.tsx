import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
}

export const MetricCard = ({
  name,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-5 relative overflow-hidden group",
        "hover:bg-[#0d0d0d] hover:border-white/[0.1] transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            {name}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-display font-bold text-white tracking-tight">
              {value}
            </p>
            {trend && (
              <span
                className={cn(
                  "text-[11px] font-medium px-1.5 py-0.5 rounded",
                  trend.isUp
                    ? "bg-emerald-400/[0.06] text-emerald-400"
                    : "bg-red-400/[0.06] text-red-400"
                )}
              >
                {trend.isUp ? "+" : ""}
                {trend.value}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] text-zinc-600 mt-1">{description}</p>
          )}
        </div>
        <div className="h-9 w-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
          <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </div>
      </div>
    </div>
  );
};
