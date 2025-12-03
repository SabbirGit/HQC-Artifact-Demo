import { ReactNode } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
}

export function Select({ value, onValueChange, disabled, children }: SelectProps) {
  return (
    <div className="relative">
      <select
        className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
}

export function SelectTrigger({ className, children }: { className?: string; children: ReactNode }) {
  return <>{children}</>;
}

export function SelectValue() {
  return null;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value}>{children}</option>;
}
