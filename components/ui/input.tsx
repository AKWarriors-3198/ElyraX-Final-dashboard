import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-white/20 focus-visible:bg-white/[0.04] focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
