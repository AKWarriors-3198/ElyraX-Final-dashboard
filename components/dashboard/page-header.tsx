import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  children,
  icon: Icon,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",
        className
      )}
    >
      <div>
        <h1 className="text-xl font-display font-bold text-white flex items-center gap-2.5 tracking-tight">
          {Icon && <Icon className="h-5 w-5 text-zinc-500 shrink-0" />}
          {title}
        </h1>
        {description && (
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3">{children}</div>
      )}
    </div>
  );
};
