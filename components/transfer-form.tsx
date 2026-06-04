"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { transferFunds } from "@/server/transferFunds";

/* ---------------- Constants ---------------- */

const USER_ID_SUFFIX_LENGTH = 8;

/* ---------------- Schemas ---------------- */

const transferSchema = z.object({
  recipientIdSuffix: z
    .string()
    .length(
      USER_ID_SUFFIX_LENGTH,
      `Must be exactly ${USER_ID_SUFFIX_LENGTH} characters`,
    ),
  amount: z.number().positive("Amount must be greater than zero"),
});

type TransferValues = z.infer<typeof transferSchema>;

const pinSchema = z.object({
  pin: z.string().length(6, "PIN must be 6 digits"),
});

type PinValues = z.infer<typeof pinSchema>;

/* ---------------- Component ---------------- */

export default function TransferForm() {
  const [infoOpen, setInfoOpen] = useState(true);
  const [pinOpen, setPinOpen] = useState(false);
  const [pendingTransfer, setPendingTransfer] = useState<TransferValues | null>(
    null,
  );

  const transferForm = useForm<TransferValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipientIdSuffix: "",
    },
  });

  const pinForm = useForm<PinValues>({
    resolver: zodResolver(pinSchema),
  });

  /* ---------------- Handlers ---------------- */

  const handleTransferSubmit = (values: TransferValues) => {
    setPendingTransfer(values);
    setPinOpen(true);
  };

  const handlePinConfirm = async ({ pin }: PinValues) => {
    if (!pendingTransfer) return;

    try {
      await transferFunds({
        recipientSuffix: pendingTransfer.recipientIdSuffix,
        amount: pendingTransfer.amount,
        pin,
      });

      toast.success("Transfer request submitted successfully");

      setPinOpen(false);
      setPendingTransfer(null);
      transferForm.reset();
      pinForm.reset();
    } catch (err: any) {
      if (err.message === "INVALID_PIN") {
        toast.error("Invalid withdrawal PIN");
      } else {
        toast.error(err.message + " Please try again.");
      }
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      {/* ================= INFO DIALOG ================= */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OPPS...</DialogTitle>
            <DialogDescription className="pt-2">
              You need to have a Withdrawal PIN in order to facilitate your
              withdrawal request. Please contact an agent for help on how to get
              one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setInfoOpen(false)}>Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= TRANSFER FORM ================= */}
      <Form {...transferForm}>
        <form
          onSubmit={transferForm.handleSubmit(handleTransferSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={transferForm.control}
            name="recipientIdSuffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient User ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Last ${USER_ID_SUFFIX_LENGTH} characters of User ID`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={transferForm.control}
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

          <Button type="submit" className="w-fit">
            Continue
          </Button>
        </form>
      </Form>

      {/* ================= PIN DIALOG ================= */}
      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Withdrawal PIN</DialogTitle>
            <DialogDescription>
              Confirm this transfer by entering your 6-digit withdrawal PIN.
            </DialogDescription>
          </DialogHeader>

          <Form {...pinForm}>
            <form
              onSubmit={pinForm.handleSubmit(handlePinConfirm)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={pinForm.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal PIN</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        maxLength={6}
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPinOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
