import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`rounded-lg px-4 py-3 shadow-lg border text-sm backdrop-blur-md ${
            toast.variant === "destructive"
              ? "bg-red-500/20 border-red-400/40 text-red-50"
              : "bg-card/70 border-border/60"
          }`}
        >
          {toast.title && <div className="font-semibold">{toast.title}</div>}
          {toast.description && (
            <div className="text-xs text-muted-foreground">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
