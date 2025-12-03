import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className, variant = "default" }: { children: ReactNode; className?: string; variant?: "default" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold",
        variant === "outline" ? "border-border text-foreground" : "bg-primary/20 text-primary border-primary/50",
        className
      )}
    >
      {children}
    </span>
  );
}
