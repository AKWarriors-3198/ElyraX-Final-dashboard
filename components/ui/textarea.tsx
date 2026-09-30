import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-white/20 focus-visible:bg-white/[0.04] focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
