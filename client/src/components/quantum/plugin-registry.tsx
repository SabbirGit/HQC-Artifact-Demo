import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cpu, Network, Activity, CheckCircle2, XCircle, RefreshCw, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plugin {
  id: string;
  name: string;
  type: "Quantum Backend" | "Classical Optimizer";
  status: "active" | "idle" | "disconnected";
  latency: string;
  qubits?: number;
  description: string;
}

const initialPlugins: Plugin[] = [
  {
    id: "qiskit",
    name: "IBM Qiskit Simulator",
    type: "Quantum Backend",
    status: "active",
    latency: "12ms",
    qubits: 32,
    description: "Local statevector simulator for rapid prototyping",
  },
  {
    id: "braket",
    name: "Amazon Braket",
    type: "Quantum Backend",
    status: "idle",
    latency: "145ms",
    qubits: 80,
    description: "Managed quantum computing service (SV1)",
  },
  {
    id: "cuda_q",
    name: "NVIDIA CUDA-Q",
    type: "Quantum Backend",
    status: "idle",
    latency: "45ms",
    qubits: 128,
    description: "GPU-accelerated quantum simulation",
  },
  {
    id: "cobyla",
    name: "COBYLA Optimizer",
    type: "Classical Optimizer",
    status: "active",
    latency: "<1ms",
    description: "Constrained Optimization BY Linear Approximation",
  },
  {
    id: "spsa",
    name: "SPSA Optimizer",
    type: "Classical Optimizer",
    status: "disconnected",
    latency: "---",
    description: "Simultaneous Perturbation Stochastic Approximation",
  },
];

export function PluginRegistryPanel() {
  const [plugins, setPlugins] = useState(initialPlugins);

  const togglePlugin = (id: string) => {
    setPlugins(
      plugins.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === "disconnected" ? "idle" : "disconnected",
          };
        }
        return p;
      })
    );
  };

  const activatePlugin = (id: string) => {
    setPlugins(
      plugins.map((p) => ({
        ...p,
        status:
          p.id === id
            ? "active"
            : p.status === "active" && p.type === plugins.find((x) => x.id === id)?.type
            ? "idle"
            : p.status,
      }))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-panel border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Plugin Registry (DP4)
            </CardTitle>
            <CardDescription>Manage adaptable components and quantum backends</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {plugins.map((plugin) => (
              <div
                key={plugin.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-all",
                  plugin.status === "active"
                    ? "bg-primary/5 border-primary/50 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                    : "bg-card/50 border-border/50 hover:border-primary/30"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "p-2 rounded-md",
                      plugin.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {plugin.type === "Quantum Backend" ? <Cpu className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold font-display text-lg">{plugin.name}</h3>
                      {plugin.status === "active" && (
                        <Badge className="bg-primary/20 text-primary border-primary/50">Active</Badge>
                      )}
                      {plugin.status === "disconnected" && (
                        <Badge variant="outline" className="text-muted-foreground">
                          Disabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{plugin.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" /> Latency: {plugin.latency}
                      </span>
                      {plugin.qubits && (
                        <span className="flex items-center gap-1">
                          <Cpu className="h-3 w-3" /> Qubits: {plugin.qubits}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={plugin.status === "active" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => activatePlugin(plugin.id)}
                      disabled={plugin.status === "disconnected" || plugin.status === "active"}
                    >
                      {plugin.status === "active" ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <Switch checked={plugin.status !== "disconnected"} onCheckedChange={() => togglePlugin(plugin.id)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="glass-panel border-primary/20 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-secondary" />
              System Architecture
            </CardTitle>
            <CardDescription>Current Configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 relative">
            <div className="absolute left-[23px] top-[60px] bottom-[60px] w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50" />

            <div className="relative flex items-start gap-4">
              <div className="z-10 w-12 h-12 rounded-full bg-card border border-primary text-primary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <Network className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Orchestrator (DP1)</h4>
                <p className="text-xs text-muted-foreground">Managing workflow execution</p>
              </div>
            </div>

            <div className="relative flex items-start gap-4">
              <div className="z-10 w-12 h-12 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center shrink-0">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Optimizer Strategy</h4>
                <p className="text-xs text-primary">COBYLA (Active)</p>
              </div>
            </div>

            <div className="relative flex items-start gap-4">
              <div className="z-10 w-12 h-12 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center shrink-0">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Quantum Backend</h4>
                <p className="text-xs text-primary">IBM Qiskit Simulator (Active)</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Adaptability Score</span>
                <span className="font-mono text-primary">98/100</span>
              </div>
              <div className="w-full h-2 bg-secondary/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[98%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
