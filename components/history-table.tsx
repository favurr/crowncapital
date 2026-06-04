// app/(dashboard)/history/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // always fetch fresh data

export default async function HistoryPage() {
  // Get session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return (
      <p className="text-center py-20">
        You must be logged in to view your history.
      </p>
    );
  }

  // Fetch history for the logged-in user
  const history = await prisma.history.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!history.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <h3 className="text-lg font-semibold">No history yet</h3>
        <p className="mt-2">
          All your deposits, transfers, and withdrawals will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id.slice(-8)}</TableCell>
              <TableCell className="min-w-[220px]">
                {record.amount.toFixed(8)}
              </TableCell>
              <TableCell>{record.currency}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell className="text-right">
                {new Date(record.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
