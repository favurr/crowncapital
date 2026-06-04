"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaymentMethod = {
  id: string;
  type: "BANK" | "CRYPTO" | "PAYPAL";
  provider?: string | null;
  details?: any;
  isDefault: boolean;
};

const CRYPTO_NETWORKS = [
  { label: "Bitcoin (BTC)", value: "BTC" },
  { label: "Ethereum (ETH)", value: "ETH" },
  { label: "USDT", value: "USDT" },
  { label: "USDC", value: "USDC" },
];

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState<PaymentMethod["type"]>("BANK");
  const [details, setDetails] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch payment methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch("/api/paymentMethods/me");
        const data = await res.json();
        setMethods(data);
      } catch {
        toast.error("Failed to load payment methods");
      } finally {
        setLoading(false);
      }
    };
    fetchMethods();
  }, []);

  // Reset dependent fields when type changes
  useEffect(() => {
    setDetails("");
    setProvider(null);
  }, [type]);

  const getDetailsPlaceholder = () => {
    if (type === "BANK") return "Account number";
    if (type === "PAYPAL") return "PayPal email or tag";
    return "Wallet address";
  };

  const handleAdd = async () => {
    if (!details) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (type === "CRYPTO" && !provider) {
      toast.error("Please select a crypto network");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/paymentMethods/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          provider, // mapped to provider column
          details: { value: details }, // flexible JSON
        }),
      });

      if (!res.ok) throw new Error();

      const added = await res.json();
      setMethods((prev) => [...prev, added]);

      toast.success("Payment method added");
      setDetails("");
      setProvider(null);
    } catch {
      toast.error("Failed to add payment method");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/paymentMethods/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error();

      setMethods((prev) => prev.filter((m) => m.id !== id));
      toast.success("Payment method removed");
    } catch {
      toast.error("Failed to delete payment method");
    }
  };

  // Skeleton loading
  if (loading) {
    return (
      <div className="max-w-xl space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-lg font-semibold">Payment Methods</h2>

      {methods.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No payment methods added yet.
        </p>
      )}

      {/* Existing methods */}
      <div className="space-y-2">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="text-sm">
              <div className="font-medium">{method.type}</div>
              {method.provider && (
                <div className="text-muted-foreground text-xs">
                  {method.provider}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDelete(method.id)}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add new method */}
      <div className="space-y-3 border-t pt-4">
        {/* Method type */}
        <Select value={type} onValueChange={(v) => setType(v as any)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BANK">Bank</SelectItem>
            <SelectItem value="PAYPAL">PayPal</SelectItem>
            <SelectItem value="CRYPTO">Crypto</SelectItem>
          </SelectContent>
        </Select>

        {/* Crypto network */}
        {type === "CRYPTO" && (
          <Select value={provider ?? ""} onValueChange={setProvider}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              {CRYPTO_NETWORKS.map((n) => (
                <SelectItem key={n.value} value={n.value}>
                  {n.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Details input */}
        <input
          type="text"
          placeholder={getDetailsPlaceholder()}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        <button
          onClick={handleAdd}
          disabled={saving}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add Payment Method"}
        </button>
      </div>
    </div>
  );
}
