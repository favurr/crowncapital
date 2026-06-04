import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditTransactionDialog from "./edit-transaction-dialog";

export const revalidate = 0;

export default async function TransactionTable() {
  const history = await prisma.history.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!history.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No transactions yet
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>User</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {history.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.amount.toFixed(2)}</TableCell>
                  <TableCell>{tx.currency}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {tx.user?.name ?? "Unknown"}
                  </TableCell>
                  <TableCell>{tx.userId.slice(-8)}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <EditTransactionDialog
                      transaction={{
                        id: tx.id,
                        amount: tx.amount,
                        currency: tx.currency,
                        type: tx.type,
                        userId: tx.userId,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
