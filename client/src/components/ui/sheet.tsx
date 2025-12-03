import { createContext, ReactNode, useContext, useState } from "react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue | undefined>(undefined);

export function Sheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("SheetTrigger must be used within Sheet");

  if (asChild && typeof children === "object") {
    return (
      // @ts-expect-error runtime composition
      <children.type {...children.props} onClick={() => ctx.setOpen(true)} />
    );
  }

  return (
    <button onClick={() => ctx.setOpen(true)} className="px-3 py-2 rounded-md bg-card border">
      {children}
    </button>
  );
}

export function SheetContent({ side = "left", children, className }: { side?: "left" | "right"; children: ReactNode; className?: string }) {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("SheetContent must be used within Sheet");
  if (!ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div
        className={cn(
          "w-64 bg-sidebar border border-border/50 shadow-xl p-4",
          side === "left" ? "order-first" : "order-last",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
