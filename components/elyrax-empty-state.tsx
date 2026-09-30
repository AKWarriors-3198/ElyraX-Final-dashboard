"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        "border border-dashed border-white/[0.08] rounded-xl",
        className
      )}
    >
      {Icon && (
        <div className="h-12 w-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
          <Icon className="h-5 w-5 text-zinc-600" />
        </div>
      )}
      <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-zinc-500 max-w-sm mb-4">{description}</p>
      )}
      {action && (
        action.href ? (
          <Button variant="outline" size="sm" asChild>
            <a href={action.href}>{action.label}</a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      )}
    </div>
  );
}
