import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Leaf, Timer, DollarSign } from "lucide-react";

const roiData = [
  { month: "Jan", classical: 100, hybrid: 120 },
  { month: "Feb", classical: 110, hybrid: 145 },
  { month: "Mar", classical: 115, hybrid: 180 },
  { month: "Apr", classical: 118, hybrid: 210 },
  { month: "May", classical: 120, hybrid: 250 },
];

const energyData = [
  { name: "Classical HPC", value: 100, fill: "hsl(var(--muted))" },
  { name: "Hybrid Quantum", value: 40, fill: "hsl(var(--primary))" },
];

export function ValueMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-panel border-primary/20 md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Value Creation (ROI)
          </CardTitle>
          <CardDescription>DP3: Classical vs Hybrid Performance</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="classical" name="Classical Baseline" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
              <Line type="monotone" dataKey="hybrid" name="HQC-DDI Framework" stroke="hsl(var(--primary))" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-panel border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            Sustainability
          </CardTitle>
          <CardDescription>Energy Consumption (kWh)</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tick={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} label={{ position: "top", fill: "white", fontSize: 12 }} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Classical</div>
              <div className="font-bold">12.5 kW</div>
            </div>
            <div>
              <div className="text-primary text-xs">Hybrid</div>
              <div className="font-bold text-primary">4.2 kW</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Computation Speedup", value: "145x", icon: Timer, color: "text-primary" },
          { label: "Cost Reduction", value: "-32%", icon: DollarSign, color: "text-green-400" },
          { label: "Data Accuracy", value: "99.9%", icon: TrendingUp, color: "text-secondary" },
          { label: "Carbon Footprint", value: "-60%", icon: Leaf, color: "text-emerald-400" },
        ].map((metric, i) => (
          <Card key={i} className="glass-panel border-white/5 bg-white/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className={`text-2xl font-bold font-display ${metric.color}`}>{metric.value}</div>
              </div>
              <metric.icon className={`h-8 w-8 opacity-50 ${metric.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
