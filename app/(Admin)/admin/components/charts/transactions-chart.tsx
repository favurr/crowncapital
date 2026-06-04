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

export default function TransactionsChart() {
  // Mock transaction data
  const data = [
    { date: "2025-12-01", amount: 500 },
    { date: "2025-12-02", amount: 750 },
    { date: "2025-12-03", amount: 300 },
    { date: "2025-12-04", amount: 950 },
    { date: "2025-12-05", amount: 400 },
    { date: "2025-12-06", amount: 600 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
