import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Activity, Shield, Database, Settings, Menu, Network } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Orchestration (DP1)", icon: Activity, href: "/orchestrator" },
  { name: "Governance (DP2)", icon: Shield, href: "/governance" },
  { name: "Value (DP3)", icon: Database, href: "/value" },
  { name: "Adaptability (DP4)", icon: Network, href: "/adaptability" },
  { name: "Configuration", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold text-primary tracking-wider flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 text-primary text-sm">
            HQC
          </div>
          DDI
        </h1>
        <p className="text-xs text-muted-foreground mt-1 ml-1">Hybrid Quantum Framework</p>
      </div>
      <div className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer group",
                location === item.href
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5", location === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-6 border-t border-border/50">
        <div className="bg-card p-3 rounded border border-border/50">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-mono text-muted-foreground">System Online</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono truncate">
            v2.4.0-alpha.3
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed left-0 top-0 bottom-0 border-r border-border/50 bg-sidebar backdrop-blur-xl z-30">
        <NavContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md z-30 flex items-center px-4 justify-between">
         <div className="font-display font-bold text-primary">HQC-DDI</div>
         <Sheet>
           <SheetTrigger asChild>
             <Button variant="ghost" size="icon">
               <Menu className="h-5 w-5" />
             </Button>
           </SheetTrigger>
           <SheetContent side="left" className="p-0 bg-sidebar border-r border-border/50 w-64">
             <NavContent />
           </SheetContent>
         </Sheet>
      </div>
    </>
  );
}
