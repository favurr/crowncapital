"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCryptoPrices } from "@/server/getCryptoPrices";
import Image from "next/image";
import { Copy } from "lucide-react";
import { createDepositHistory } from "@/server/createDepositHistory";

/* ---------------- Schema ---------------- */

const depositSchema = z.object({
  asset: z.string().min(1, "Select an asset"),
  amount: z.number().positive("Amount must be greater than zero"),
});

type DepositValues = z.infer<typeof depositSchema>;

/* ---------------- Manual Payment Methods ---------------- */
const MANUAL_METHODS = ["BANK_TRANSFER", "PAYPAL", "WESTERN_UNION"];

/* ---------------- Generate Random ID ---------------- */
const generateOrderID = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const ASSET_INFO: Record<string, { image: string; text: string }> = {
  BTC: {
    image: "/qrcodes/BTC.jpeg",
    text: "bc1qpza2fu9wwfvywzqzrcd7xyxja5v3qf8yh559n4",
  },
  USDT: {
    image: "/qrcodes/USDT.jpeg",
    text: "0x8D45424C4098541cA9d3dAa96721876A4d51F2b7",
  },
  USDC: {
    image: "/qrcodes/USDC.jpeg",
    text: "0x8D45424C4098541cA9d3dAa96721876A4d51F2b7",
  },
};

/* ---------------- Component ---------------- */

export default function DepositForm() {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [open, setOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<DepositValues | null>(
    null,
  );
  const [orderID, setOrderID] = useState<string>("");

  /* Fetch crypto prices on mount */
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const result = await getCryptoPrices();
        setPrices(result);
      } catch (err) {
        console.error("Failed to fetch crypto prices", err);
      }
    };
    fetchPrices();
  }, []);

  const form = useForm<DepositValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      asset: "",
    },
  });

  const handleMakePayment = (values: DepositValues) => {
    if (MANUAL_METHODS.includes(values.asset)) {
      setPendingValues(values);
      setManualOpen(true);
      form.reset();
      return;
    }

    setPendingValues(values);
    setOrderID(generateOrderID());
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;

    try {
      await createDepositHistory({
        amount: pendingValues.amount,
        currency: pendingValues.asset,
      });

      setOpen(false);
      setPendingValues(null);
      form.reset();
    } catch (error) {
      console.error("Failed to create deposit history", error);
      // optionally show toast
    }
  };

  return (
    <>
      {/* ================= FORM ================= */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleMakePayment)}
          className="flex flex-col gap-8"
        >
          {/* Asset */}
          <FormField
            control={form.control}
            name="asset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Asset</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose asset" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Crypto */}
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    {/* Manual */}
                    <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                    <SelectItem value="PAYPAL">PayPal</SelectItem>
                    <SelectItem value="WESTERN_UNION">Western Union</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className="italic text-xs">
            Deposit will appear in your account after payment is successfully
            made and approved by our team.
          </span>

          <Button type="submit" className="w-fit">
            Make Payment
          </Button>
        </form>
      </Form>

      {/* ================= CONFIRM DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="border-b-2 pb-2">
            <DialogTitle>Confirm Deposit</DialogTitle>
            <div className="pt-2 flex flex-col gap-2 text-muted-foreground text-sm">
              <span>
                Your Order no. <strong>{orderID}</strong> has been placed
                successfully.
              </span>
              <span>
                Please send{" "}
                <strong>
                  {pendingValues?.amount} {pendingValues?.asset},{" "}
                  {pendingValues?.asset &&
                    prices[pendingValues.asset] !== undefined && (
                      <>
                        ($
                        {(
                          pendingValues.amount * prices[pendingValues.asset]
                        ).toFixed(2)}
                        )
                      </>
                    )}
                </strong>{" "}
                to the address below. The balance will appear in your account
                only after transaction gets confirmed by our team.
              </span>
            </div>
          </DialogHeader>

          <DialogTitle>
            Payment to the following {pendingValues?.asset} Wallet Address
          </DialogTitle>
          {pendingValues?.asset && ASSET_INFO[pendingValues.asset] && (
            <div className="mt-4 flex flex-row items-end gap-4">
              <Image
                src={ASSET_INFO[pendingValues.asset].image}
                alt={pendingValues.asset}
                width="130"
                height="130"
              />

              <div>
                <p className="text-sm pb-2">
                  Send Amount:{" "}
                  <strong>
                    {pendingValues?.amount} {pendingValues?.asset},{" "}
                    {pendingValues?.asset &&
                      prices[pendingValues.asset] !== undefined && (
                        <>
                          ($
                          {(
                            pendingValues.amount * prices[pendingValues.asset]
                          ).toFixed(2)}
                          )
                        </>
                      )}
                  </strong>
                </p>
                <CopyableInput value={ASSET_INFO[pendingValues.asset].text} />
              </div>
            </div>
          )}

          <DialogFooter className="sm:flex-row sm:justify-start">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>

          <div className="pt-1 text-sm">
            <ul className="list-disc pl-5 text-muted-foreground">
              <li className="text-red-500">
                Kindly ensure you select the appropriate networks for deposit.
              </li>
              <li className="text-red-500">
                Kindly ensure you send exact amount as added in your deposit.
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================= MANUAL PAYMENT DIALOG ================= */}
      <Dialog open={manualOpen} onOpenChange={setManualOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Payment Required</DialogTitle>
            <DialogDescription>
              {pendingValues && (
                <span>
                  You are trying to deposit{" "}
                  <strong>
                    {pendingValues.amount} {pendingValues.asset}
                  </strong>
                  .
                </span>
              )}
              <br />
              Contact account team to complete this request. Thank you.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setManualOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

{
  /* ================= COPYABLE INPUT ================= */
}
function CopyableInput({ value }: { value: string }) {
  const handleCopy = () => navigator.clipboard.writeText(value);
  return (
    <div className="flex gap-2">
      <Input value={value} readOnly />
      <Button variant="outline" onClick={handleCopy} className="p-2">
        <Copy size={16} />
      </Button>
    </div>
  );
}
