// app/(Dashboard)/console/settings/components/settings-content.tsx
import AccountInfo from "./ui/AccountInfo";
import Kyc from "./ui/Kyc";
import PaymentMethods from "./ui/PaymentMethods";
import Plan from "./ui/Plan";
import { SETTINGS_TABS, SettingsTab } from "./settings-shell";
import Security from "./ui/Security";

export default function SettingsContent({ tab }: { tab: SettingsTab }) {
  switch (tab) {
    case SETTINGS_TABS.SECURITY:
      return <Security />;
    case SETTINGS_TABS.KYC:
      return <Kyc />;
    case SETTINGS_TABS.PAYMENT_METHODS:
      return <PaymentMethods />;
    case SETTINGS_TABS.PLAN:
      return <Plan />;
    default:
      return <AccountInfo />;
  }
}
