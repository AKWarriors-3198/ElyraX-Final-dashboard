import React from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectOption } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- ToggleSwitch ---
interface ToggleSwitchProps {
  label?: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const ToggleSwitch = ({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  className,
}: ToggleSwitchProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]",
      className
    )}
  >
    {(label || description) && (
      <div className="flex flex-col">
        {label && (
          <span className="text-sm font-medium text-white">{label}</span>
        )}
        {description && (
          <span className="text-[11px] text-zinc-500 mt-0.5">{description}</span>
        )}
      </div>
    )}
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
    />
  </div>
);

// --- DropdownSelect ---
interface DropdownSelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DropdownSelect = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  className,
}: DropdownSelectProps) => (
  <div className={cn("space-y-1.5", className)}>
    {label && (
      <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
        {label}
      </label>
    )}
    <Select
      value={value}
      onValueChange={onValueChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

// --- FormInput ---
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ElementType;
}

export const FormInput = ({ label, icon: Icon, className, ...props }: FormInputProps) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
        {label}
      </label>
    )}
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
      )}
      <Input
        className={cn(
          "bg-white/[0.02] border-white/[0.06] rounded-lg h-10 text-sm",
          Icon && "pl-9",
          className
        )}
        {...props}
      />
    </div>
  </div>
);
