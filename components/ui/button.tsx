"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.08)]",
        secondary:
          "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-white/5",
        outline:
          "border border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white hover:border-white/20",
        ghost:
          "text-zinc-400 hover:bg-white/5 hover:text-white",
        danger:
          "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300",
        success:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-7",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
