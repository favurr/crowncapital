"use client";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", users: 1120 },
  { month: "Feb", users: 210 },
  { month: "Mar", users: 320 },
  { month: "Apr", users: 410 },
  { month: "May", users: 520 },
  { month: "Jun", users: 620 },
  { month: "Jul", users: 230 },
  { month: "Aug", users: 820 },
  { month: "Sep", users: 920 },
  { month: "Oct", users: 1020 },
  { month: "Nov", users: 190 },
  { month: "Dec", users: 1220 },
];

export default function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Line type="monotone" dataKey="users" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
