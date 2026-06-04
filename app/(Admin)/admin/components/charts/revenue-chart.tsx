"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  // Mock revenue data
  const data = [
    { date: "2025-12-01", revenue: 4200 },
    { date: "2025-12-02", revenue: 3800 },
    { date: "2025-12-03", revenue: 4500 },
    { date: "2025-12-04", revenue: 5000 },
    { date: "2025-12-05", revenue: 4700 },
    { date: "2025-12-06", revenue: 5300 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
