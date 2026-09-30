"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ConfigCardProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function ConfigCard({
  title,
  description,
  icon: Icon,
  children,
  className,
  headerAction,
}: ConfigCardProps) {
  return (
    <Card className={cn("bg-[#0a0a0a] border-white/[0.06]", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <Icon className="h-4 w-4 text-zinc-400" />
              </div>
            )}
            <div>
              <CardTitle className="text-sm font-semibold text-white">{title}</CardTitle>
              {description && (
                <CardDescription className="text-xs text-zinc-500 mt-0.5">{description}</CardDescription>
              )}
            </div>
          </div>
          {headerAction}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
