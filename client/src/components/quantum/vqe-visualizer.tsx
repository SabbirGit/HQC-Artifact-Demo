import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RefreshCw, Cpu, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function VQEVisualizer() {
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [backend, setBackend] = useState("qiskit_sim");
  const [converged, setConverged] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setIteration(0);
    setData([]);
    setConverged(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIteration((prev) => {
        const next = prev + 1;
        const noise = (Math.random() - 0.5) * (0.5 / next);
        const energy = -1.137 + Math.exp(-next / 5) + noise;

        const newDataPoint = {
          iteration: next,
          energy: energy,
          target: -1.137,
        };

        setData((prevData) => [...prevData, newDataPoint]);

        if (next >= 20 || Math.abs(energy - -1.137) < 0.01) {
          setIsRunning(false);
          setConverged(true);
        }
        return next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <Card className="h-full glass-panel border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Hybrid Quantum Orchestrator
            </CardTitle>
            <CardDescription>DP1: VQE Workflow Execution</CardDescription>
          </div>
          <Badge
            variant={isRunning ? "default" : "outline"}
            className={isRunning ? "animate-pulse bg-primary text-primary-foreground" : ""}
          >
            {isRunning ? "EXECUTING" : converged ? "CONVERGED" : "IDLE"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4 items-end">
          <div className="grid gap-2 flex-1">
            <label className="text-xs font-medium text-muted-foreground">Quantum Backend (DP4: Adaptability)</label>
            <Select value={backend} onValueChange={setBackend} disabled={isRunning}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qiskit_sim">IBM Qiskit Simulator</SelectItem>
                <SelectItem value="braket">Amazon Braket</SelectItem>
                <SelectItem value="cuda_q">NVIDIA CUDA-Q</SelectItem>
                <SelectItem value="ionq">IonQ Aria</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={runSimulation} disabled={isRunning} className="w-32 relative overflow-hidden group">
            {isRunning ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? "Running..." : "Execute VQE"}
            {!isRunning && <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform" />}
          </Button>
        </div>

        <div className="h-[300px] w-full bg-black/20 rounded-lg border border-border/50 p-4 relative overflow-hidden">
          {data.length === 0 && !isRunning && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              Select backend and execute to visualize convergence
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="iteration" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis domain={["auto", "auto"]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
                itemStyle={{ color: "hsl(var(--primary))" }}
              />
              <Line type="monotone" dataKey="target" stroke="hsl(var(--secondary))" strokeDasharray="5 5" dot={false} strokeWidth={2} />
              <Area type="monotone" dataKey="energy" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEnergy)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded bg-background/50 border border-border/50">
            <div className="text-xs text-muted-foreground">Current Energy</div>
            <div className="text-xl font-mono font-bold text-primary">
              {data.length > 0 ? data[data.length - 1].energy.toFixed(6) : "---"}
            </div>
          </div>
          <div className="p-3 rounded bg-background/50 border border-border/50">
            <div className="text-xs text-muted-foreground">Iterations</div>
            <div className="text-xl font-mono font-bold text-foreground">{iteration}/20</div>
          </div>
          <div className="p-3 rounded bg-background/50 border border-border/50">
            <div className="text-xs text-muted-foreground">Status</div>
            <div className="text-xl font-mono font-bold text-secondary flex items-center gap-2">
              {converged ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Optimal
                </>
              ) : isRunning ? (
                "Optimizing"
              ) : (
                "Ready"
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
