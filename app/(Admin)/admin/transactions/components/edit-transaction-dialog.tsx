"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TRANSACTION_TYPES,
  type TransactionTypeFrontend,
} from "../constants/transaction-types";
import {
  updateTransaction,
  deleteTransaction,
} from "../actions/transaction-actions";

const CURRENCIES = ["USDT", "USDC", "BTC", "ETH", "BNB"] as const;

interface Props {
  transaction: {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    type: TransactionTypeFrontend;
  };
}

export default function EditTransactionDialog({ transaction }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState(transaction.amount);
  const [currency, setCurrency] = useState(transaction.currency);
  const [type, setType] = useState<TransactionTypeFrontend>(transaction.type);
  const [userId, setUserId] = useState(transaction.userId);

  function onSave() {
    startTransition(async () => {
      try {
        await updateTransaction({
          id: transaction.id,
          amount,
          currency,
          type,
          userId,
        });

        toast.success("Transaction updated");
        setOpen(false);
      } catch {
        toast.error("Update failed");
      }
    });
  }

  function onDelete() {
    startTransition(async () => {
      try {
        await deleteTransaction(transaction.id);
        toast.success("Transaction deleted");
        setOpen(false);
      } catch {
        toast.error("Delete failed");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={type}
            onValueChange={(v) => setType(v as TransactionTypeFrontend)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRANSACTION_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex">
            <label className="text-sm bg-primary font-medium leading-none w-24 items-center flex justify-center px-2 py-1 text-white rounded-md">
              User ID
            </label>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              className="flex-1 rounded-l-none"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            Delete
          </Button>

          <Button onClick={onSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
