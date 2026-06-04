"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Plan = "SILVER" | "GOLD" | "DIAMOND" | "ELITE" | "EXCLUSIVE";

type PlanResponse = {
  cryptoPlan: Plan;
};

const PLANS: {
  key: Plan;
  title: string;
  description: string;
}[] = [
  {
    key: "SILVER",
    title: "Silver",
    description: "Basic trading access with limited features.",
  },
  {
    key: "GOLD",
    title: "Gold",
    description: "Advanced tools and higher profit limits.",
  },
  {
    key: "DIAMOND",
    title: "Diamond",
    description: "Professional tools with priority execution.",
  },
  {
    key: "ELITE",
    title: "Elite",
    description: "High-net-worth features and exclusive access.",
  },
  {
    key: "EXCLUSIVE",
    title: "Exclusive",
    description: "Private tier with maximum benefits.",
  },
];

export default function Plan() {
  const [data, setData] = useState<PlanResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch("/api/account/me");
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ cryptoPlan: json.cryptoPlan });
      } catch {
        toast.error("Failed to load plan information");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading) {
    return (
      <div className="max-w-xl space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load plan details.
      </p>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Subscription Plan</h2>
        <p className="text-sm text-muted-foreground">
          View your current plan and explore upgrades.
        </p>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => {
          const isActive = plan.key === data.cryptoPlan;

          return (
            <div
              key={plan.key}
              className={`rounded border p-4 flex items-center justify-between ${
                isActive ? "border-primary bg-primary/5" : "border-muted"
              }`}
            >
              <div>
                <p className="font-medium">{plan.title}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {isActive ? (
                <span className="text-xs font-semibold text-primary">
                  Current Plan
                </span>
              ) : (
                <button
                  disabled
                  className="text-sm px-3 py-1 rounded bg-muted text-muted-foreground cursor-not-allowed"
                >
                  Upgrade
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Plan upgrades and billing will be available soon.
      </p>
    </div>
  );
}
