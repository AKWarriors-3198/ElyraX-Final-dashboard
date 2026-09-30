"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
} | null>(null);

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  children?: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select = ({ children, value, onValueChange, options, placeholder, className, disabled }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (options) {
    const selectedOption = options.find((opt) => opt.value === value);
    return (
      <div className={cn("relative w-full", className)} ref={containerRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 text-sm text-white transition-all duration-200 focus:outline-none focus:border-white/20 disabled:cursor-not-allowed disabled:opacity-50",
            isOpen && "border-white/20 bg-white/[0.04]"
          )}
        >
          <span className={cn("truncate", !selectedOption && "text-zinc-500")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-zinc-500 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#0d0d0d] p-1 shadow-2xl shadow-black/50 animate-scale-in">
            <div className="max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onValueChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5",
                    value === option.value ? "bg-white/10 text-white" : "text-zinc-400"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && <Check className="h-3.5 w-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className={cn("relative w-full", className)} ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => context.setIsOpen(!context.isOpen)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 text-sm text-white transition-all duration-200 focus:outline-none focus:border-white/20 disabled:cursor-not-allowed disabled:opacity-50",
        context.isOpen && "border-white/20 bg-white/[0.04]",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 text-zinc-500 transition-transform duration-200", context.isOpen && "rotate-180")} />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder, className }: { placeholder?: string; className?: string }) => {
  const context = React.useContext(SelectContext);
  if (!context) return null;
  return <span className={cn("truncate", !context.value && "text-zinc-500", className)}>{context.value || placeholder}</span>;
};

const SelectContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const context = React.useContext(SelectContext);
  if (!context || !context.isOpen) return null;

  return (
    <div className={cn("absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#0d0d0d] p-1 shadow-2xl shadow-black/50 animate-scale-in", className)}>
      <div className="max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
        {children}
      </div>
    </div>
  );
};

const SelectItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) return null;

  const isSelected = context.value === value;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        context.onValueChange(value);
        context.setIsOpen(false);
      }}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5",
        isSelected ? "bg-white/10 text-white" : "text-zinc-400",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
    </button>
  );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
