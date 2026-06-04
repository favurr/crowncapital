// app/(Dashboard)/console/settings/components/settings-shell.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import SettingsContent from "./settings-content";

/* -------------------------------------------------------------------------- */
/*                               Tab Definitions                               */
/* -------------------------------------------------------------------------- */

export const SETTINGS_TABS = {
  ACCOUNT: "account",
  SECURITY: "security",
  KYC: "kyc",
  PAYMENT_METHODS: "payment-methods",
  PLAN: "plan",
} as const;

export type SettingsTab = (typeof SETTINGS_TABS)[keyof typeof SETTINGS_TABS];

const TAB_LIST: { id: SettingsTab; label: string }[] = [
  { id: SETTINGS_TABS.ACCOUNT, label: "Account Info" },
  { id: SETTINGS_TABS.SECURITY, label: "Security" },
  { id: SETTINGS_TABS.KYC, label: "KYC" },
  { id: SETTINGS_TABS.PAYMENT_METHODS, label: "Payment Methods" },
  { id: SETTINGS_TABS.PLAN, label: "Plan" },
];

export default function SettingsShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawTab = searchParams.get("tab") as SettingsTab | null;

  const activeTab: SettingsTab =
    rawTab && Object.values(SETTINGS_TABS).includes(rawTab)
      ? rawTab
      : SETTINGS_TABS.ACCOUNT;

  function handleTabChange(tab: SettingsTab) {
    router.push(`/console/settings?tab=${tab}`);
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        {TAB_LIST.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "border-b-2 border-transparent",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Server-rendered content */}
      <div className="pt-4">
        <SettingsContent tab={activeTab} />
      </div>
    </div>
  );
}
