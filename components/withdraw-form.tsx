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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

/* ---------------- Schemas ---------------- */

const bankSchema = z.object({
  type: z.string().min(1, "Select transfer type"),
  bankName: z.string().min(1, "Bank name required"),
  accountNumber: z.string().min(1, "Account number required"),
  accountType: z.string().min(1, "Account type required"),
  accountName: z.string().min(1, "Account name required"),
  swiftOrRouting: z.string().optional(),
  amount: z.number().positive("Amount must be greater than zero"),
});

const wireSchema = z.object({
  accountNumber: z.string().min(1, "Account number required"),
  routingNumber: z.string().min(1, "Routing number required"),
  accountName: z.string().min(1, "Account name required"),
  amount: z.number().positive("Amount must be greater than zero"),
});

const cryptoSchema = z.object({
  coin: z.string().min(1, "Select coin"),
  network: z.string().min(1, "Select network"),
  walletAddress: z.string().min(1, "Wallet address required"),
  amount: z.number().positive("Amount must be greater than zero"),
});

const paypalSchema = z.object({
  paypalEmail: z.string().min(1, "PayPal email required"),
  amount: z.number().positive("Amount must be greater than zero"),
});

/* ---------------- Component ---------------- */

export default function WithdrawForm() {
  const [oopsOpen, setOopsOpen] = useState(true);
  const [bankOpen, setBankOpen] = useState(false);
  const [wireOpen, setWireOpen] = useState(false);
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [paypalOpen, setPaypalOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [bankType, setBankType] = useState("");

  const [pendingWithdrawal, setPendingWithdrawal] = useState<any>(null);

  const bankForm = useForm({ resolver: zodResolver(bankSchema) });
  const wireForm = useForm({ resolver: zodResolver(wireSchema) });
  const cryptoForm = useForm({ resolver: zodResolver(cryptoSchema) });
  const paypalForm = useForm({ resolver: zodResolver(paypalSchema) });

  const pinForm = useForm<{ pin: string }>({ defaultValues: { pin: "" } });

  /* ---------------- Handlers ---------------- */
  const handleBankSubmit = (values: z.infer<typeof bankSchema>) => {
    setPendingWithdrawal(values);
    setPinOpen(true);
  };

  const handleWireSubmit = (values: z.infer<typeof wireSchema>) => {
    setPendingWithdrawal(values);
    setPinOpen(true);
  };

  const handleCryptoSubmit = (values: z.infer<typeof cryptoSchema>) => {
    setPendingWithdrawal(values);
    setPinOpen(true);
  };

  const handlePaypalSubmit = (values: z.infer<typeof paypalSchema>) => {
    setPendingWithdrawal(values);
    setPinOpen(true);
  };

  const handlePinConfirm = (values: { pin: string }) => {
    toast.error("Invalid withdrawal PIN"); // always invalid for now
    pinForm.reset();
    setPinOpen(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* OOPS DIALOG */}
      <Dialog open={oopsOpen} onOpenChange={setOopsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OPPS...</DialogTitle>
            <DialogDescription>
              You need to have a Withdrawal PIN in order to facilitate your
              withdrawal request. Please contact an agent for help on how to get
              one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOopsOpen(false)}>Understood</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CARDS */}
      <div className="flex gap-4">
        {/* Bank Transfer */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 w-fit rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <h3 className="font-semibold mb-2">Bank Transfer</h3>
            <Button onClick={() => setBankOpen(true)}>Payout Now</Button>
          </div>
        </div>

        {/* Wire Transfer */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 w-fit rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <h3 className="font-semibold mb-2">Wire Transfer</h3>
            <Button onClick={() => setWireOpen(true)}>Payout Now</Button>
          </div>
        </div>

        {/* Crypto */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 w-fit rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <h3 className="font-semibold mb-2">Crypto</h3>
            <Button onClick={() => setCryptoOpen(true)}>Payout Now</Button>
          </div>
        </div>

        {/* PayPal */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 w-fit rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <h3 className="font-semibold mb-2">PayPal</h3>
            <Button onClick={() => setPaypalOpen(true)}>Payout Now</Button>
          </div>
        </div>
      </div>

      {/* PIN DIALOG (shared) */}
      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Withdrawal PIN</DialogTitle>
            <DialogDescription>
              Confirm your withdrawal by entering your 6-digit withdrawal PIN.
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
                      <Input type="password" maxLength={6} {...field} />
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
      {/* ================= DIALOGS ================= */}
      {/* Bank Transfer Dialog */}
      <Dialog open={bankOpen} onOpenChange={setBankOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bank Transfer Withdrawal</DialogTitle>
          </DialogHeader>
          <Form {...bankForm}>
            <form
              onSubmit={bankForm.handleSubmit(handleBankSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={bankForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setBankType(val);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SWIFT">SWIFT</SelectItem>
                          <SelectItem value="ACH">ACH</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {bankType === "SWIFT" && (
                <FormField
                  control={bankForm.control}
                  name="swiftOrRouting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SWIFT/BIC Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {bankType === "ACH" && (
                <FormField
                  control={bankForm.control}
                  name="swiftOrRouting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ACH Routing Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={bankForm.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bankForm.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bankForm.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bankForm.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={bankForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                  onClick={() => setBankOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Payout Now</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* ================= WIRE TRANSFER DIALOG ================= */}
      <Dialog open={wireOpen} onOpenChange={setWireOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wire Transfer Withdrawal</DialogTitle>
            <DialogDescription>
              Fill in your wire transfer details to request a payout.
            </DialogDescription>
          </DialogHeader>

          <Form {...wireForm}>
            <form
              onSubmit={wireForm.handleSubmit(handleWireSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={wireForm.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Account Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={wireForm.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Routing Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={wireForm.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Account Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={wireForm.control}
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

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setWireOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm Withdrawal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* ================= CRYPTO DIALOG ================= */}
      <Dialog open={cryptoOpen} onOpenChange={setCryptoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crypto Withdrawal</DialogTitle>
            <DialogDescription>
              Fill in your crypto wallet details to request a payout.
            </DialogDescription>
          </DialogHeader>

          <Form {...cryptoForm}>
            <form
              onSubmit={cryptoForm.handleSubmit(handleCryptoSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={cryptoForm.control}
                name="coin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coin</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Coin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cryptoForm.control}
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Network (e.g., ERC20, BEP20)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cryptoForm.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Wallet Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cryptoForm.control}
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

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCryptoOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm Withdrawal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* ================= PAYPAL DIALOG ================= */}
      <Dialog open={paypalOpen} onOpenChange={setPaypalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PayPal Withdrawal</DialogTitle>
            <DialogDescription>
              Fill in your PayPal details to request a payout.
            </DialogDescription>
          </DialogHeader>

          <Form {...paypalForm}>
            <form
              onSubmit={paypalForm.handleSubmit(handlePaypalSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={paypalForm.control}
                name="paypalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Email or Tag</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your PayPal email or tag"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paypalForm.control}
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

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPaypalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm Withdrawal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
