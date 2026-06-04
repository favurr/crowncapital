"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { type UpdateUserInput, updateUser } from "../actions/user-actions";

export interface EditableUser extends UpdateUserInput {}

interface Props {
  user: EditableUser;
  onSave: (data: UpdateUserInput) => void;
  onDelete: (id: string) => void;
}

export default function EditUserDialog({ user, onSave, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [capital, setCapital] = useState(user.capital);
  const [accBalance, setAccBalance] = useState(user.accumulativeBalance);
  const [bonus, setBonus] = useState(user.bonus);
  const [profit, setProfit] = useState(user.profit);
  const [tradeStatus, setTradeStatus] = useState<EditableUser["tradeStatus"]>(
    user.tradeStatus,
  );
  const [cryptoPlan, setCryptoPlan] = useState<EditableUser["cryptoPlan"]>(
    user.cryptoPlan,
  );

  const handleSave = () => {
    startTransition(async () => {
      try {
        const updated: UpdateUserInput = {
          id: user.id,
          capital,
          accumulativeBalance: accBalance,
          bonus,
          profit,
          tradeStatus,
          cryptoPlan,
        };
        await updateUser(updated);
        toast.success("User updated successfully");
        onSave(updated);
        setOpen(false);
      } catch {
        toast.error("Failed to update user");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onDelete(user.id);
      } catch {
        toast.error("Failed to delete user");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="">
          <p>Accumulative Balance</p>
          <Input
            value={accBalance}
            onChange={(e) => setAccBalance(Number(e.target.value))}
            placeholder="Accumulative Balance"
          />
        </div>
        <div className="">
          <p>Capital</p>
          <Input
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            placeholder="Capital"
          />
        </div>
        <div className="">
          <p>Bonus</p>
          <Input
            value={bonus}
            onChange={(e) => setBonus(Number(e.target.value))}
            placeholder="Bonus"
          />
        </div>
        <div className="">
          <p>Profit</p>
          <Input
            value={profit}
            onChange={(e) => setProfit(Number(e.target.value))}
            placeholder="Profit"
          />
        </div>

        <div className="">
          <p>Trade Status</p>
          <Select
            value={tradeStatus}
            onValueChange={(v) =>
              setTradeStatus(v as EditableUser["tradeStatus"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WIN">WIN</SelectItem>
              <SelectItem value="LOSS">LOSS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <p>Crypto Plan</p>
          <Select
            value={cryptoPlan}
            onValueChange={(v) =>
              setCryptoPlan(v as EditableUser["cryptoPlan"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["SILVER", "GOLD", "DIAMOND", "ELITE", "EXCLUSIVE"].map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between pt-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
