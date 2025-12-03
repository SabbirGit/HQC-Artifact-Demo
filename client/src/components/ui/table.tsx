import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <table className={cn("w-full text-sm", className)}>{children}</table>;
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="text-xs uppercase text-muted-foreground">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border/50">{children}</tbody>;
}

export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={cn("transition-colors", className)}>{children}</tr>;
}

export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn("px-4 py-2 text-left font-medium", className)}>{children}</th>;
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-2 align-middle", className)}>{children}</td>;
}
