import { ReactNode } from "react";
import { AlertTriangle, Info, Shield, LifeBuoy } from "lucide-react";
import clsx from "clsx";

interface CalloutProps {
  type?: "warning" | "tip" | "security" | "support";
  children: ReactNode;
}

export default function Callout({ type = "tip", children }: CalloutProps) {
  const icon =
    type === "warning" ? (
      <AlertTriangle className="mr-2 h-5 w-5" />
    ) : type === "security" ? (
      <Shield className="mr-2 h-5 w-5" />
    ) : type === "support" ? (
      <LifeBuoy className="mr-2 h-5 w-5" />
    ) : (
      <Info className="mr-2 h-5 w-5" />
    );

  const bg =
    type === "warning"
      ? "bg-yellow-100/50 dark:bg-yellow-800/50"
      : type === "security"
        ? "bg-red-100/30 dark:bg-red-800/40"
        : type === "support"
          ? "bg-blue-100/40 dark:bg-blue-900/40"
          : "bg-indigo-100/30 dark:bg-indigo-800/30";

  const border =
    type === "warning"
      ? "border-yellow-300 dark:border-yellow-600"
      : type === "security"
        ? "border-red-300 dark:border-red-600"
        : type === "support"
          ? "border-blue-300 dark:border-blue-600"
          : "border-indigo-300 dark:border-indigo-600";

  return (
    <div
      className={clsx(
        "flex items-start gap-2 rounded-lg border-l-4 p-4",
        bg,
        border
      )}
    >
      {icon}
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
