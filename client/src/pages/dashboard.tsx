import { Sidebar } from "@/components/layout";
import { VQEVisualizer } from "@/components/quantum/vqe-visualizer";
import { GovernancePanel } from "@/components/quantum/governance-panel";
import { ValueMetrics } from "@/components/quantum/value-metrics";
import { PluginRegistryPanel } from "@/components/quantum/plugin-registry";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard({ defaultTab = "overview" }: { defaultTab?: string }) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCapture = async () => {
    if (dashboardRef.current) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const canvas = await html2canvas(dashboardRef.current, {
          backgroundColor: "#020617",
          scale: 2,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          logging: true,
          onclone: (documentClone) => {
            const svgs = documentClone.querySelectorAll("svg");
            svgs.forEach((svg) => {
              svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            });
          },
        });

        const link = document.createElement("a");
        link.download = `hqc-ddi-dashboard-${new Date().toISOString().split("T")[0]}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast({
          title: "Dashboard Captured",
          description: "Screenshot downloaded successfully.",
        });
      } catch (error) {
        console.error("Capture failed:", error);
        toast({
          title: "Capture Failed",
          description: "Could not generate screenshot. Try refreshing the page.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Sidebar />
      <main
        ref={dashboardRef}
        className="md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] pointer-events-none -z-10" />

        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">System Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Hybrid Quantum-Classical Orchestration & Data Governance Interface
            </p>
          </div>
          <Button
            onClick={handleCapture}
            variant="outline"
            className="gap-2 border-primary/20 hover:bg-primary/10 text-primary hidden md:flex"
          >
            <Camera className="h-4 w-4" />
            Export View
          </Button>
        </header>

        <Tabs defaultValue={defaultTab} className="space-y-8">
          <TabsList className="bg-card/50 border border-border/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orchestration">Orchestration (DP1)</TabsTrigger>
            <TabsTrigger value="governance">Governance (DP2)</TabsTrigger>
            <TabsTrigger value="value">Value (DP3)</TabsTrigger>
            <TabsTrigger value="adaptability">Adaptability (DP4)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
              <VQEVisualizer />
              <div className="h-full flex flex-col gap-6">
                <Card className="glass-panel border-primary/20 flex-1">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <div className="text-sm text-muted-foreground mb-2">System Status</div>
                    <div className="text-2xl font-display text-foreground mb-4">Optimal Performance</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Quantum Backend</span>
                        <span className="text-primary">Online</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-full animate-pulse" />
                      </div>

                      <div className="flex justify-between text-xs mt-4">
                        <span>Classical Cluster</span>
                        <span className="text-green-400">Idle</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 w-[20%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex-1">
                  <div className="h-full w-full bg-card/30 rounded-lg border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-display font-bold text-secondary">94.8</div>
                      <div className="text-sm text-muted-foreground">Data Quality Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ValueMetrics />
              <Card className="glass-panel border-primary/20">
                <CardContent className="p-6 flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-lg font-medium mb-2">Active Plugins (DP4)</div>
                    <div className="flex gap-2 justify-center">
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">Qiskit</span>
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs">COBYLA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orchestration" className="h-[600px] animate-in fade-in zoom-in-95 duration-300">
            <VQEVisualizer />
          </TabsContent>

          <TabsContent value="governance" className="h-[600px] animate-in fade-in zoom-in-95 duration-300">
            <GovernancePanel />
          </TabsContent>

          <TabsContent value="value" className="animate-in fade-in zoom-in-95 duration-300">
            <ValueMetrics />
          </TabsContent>

          <TabsContent value="adaptability" className="animate-in fade-in zoom-in-95 duration-300">
            <PluginRegistryPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
