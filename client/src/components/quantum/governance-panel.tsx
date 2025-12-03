import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCode, Users } from "lucide-react";

const qualityData = [
  { subject: "Consistency", A: 95, fullMark: 100 },
  { subject: "Timeliness", A: 90, fullMark: 100 },
  { subject: "Validity", A: 98, fullMark: 100 },
  { subject: "Uniqueness", A: 99, fullMark: 100 },
  { subject: "Accuracy", A: 92, fullMark: 100 },
];

const initialAuditLogs = [
  { id: 1, time: "10:42:01", user: "Dr. Chen", role: "data_owner", action: "execute_quantum", status: "GRANTED" },
  { id: 2, time: "10:41:55", user: "System", role: "system", action: "record_quality", status: "INFO" },
  { id: 3, time: "10:38:12", user: "Guest_01", role: "unknown", action: "write_metadata", status: "DENIED" },
  { id: 4, time: "10:35:00", user: "Alara", role: "data_steward", action: "manage_quality", status: "GRANTED" },
];

export function GovernancePanel() {
  const [auditLogs] = useState(initialAuditLogs);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <Card className="glass-panel border-primary/20 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            Data Governance (ISO 11179)
          </CardTitle>
          <CardDescription>DP2: Quality Metrics & Metadata</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-[300px]">
          <div className="h-full w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={qualityData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Current Quality"
                  dataKey="A"
                  stroke="hsl(var(--secondary))"
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0">
              <div className="text-4xl font-bold font-display text-secondary">94.8</div>
              <div className="text-xs text-muted-foreground text-right">Quality Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel border-primary/20 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            RBAC Audit Log
          </CardTitle>
          <CardDescription>DP2: Real-time Access Control Monitoring</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead>User / Role</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-white/5 border-border/50">
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.time}</TableCell>
                  <TableCell>
                    <div className="font-medium text-sm">{log.user}</div>
                    <div className="text-xs text-muted-foreground">{log.role}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{log.action}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        log.status === "GRANTED"
                          ? "border-green-500 text-green-500"
                          : log.status === "DENIED"
                          ? "border-red-500 text-red-500"
                          : "border-blue-500 text-blue-500"
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
