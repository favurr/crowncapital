import PasswordSection from "./security/PasswordSection";
import SessionsSection from "./security/SessionsSection";

export default function Security() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-semibold">Security</h1>
        <p className="text-sm text-muted-foreground">
          Manage how you secure and access your account.
        </p>
      </header>

      <PasswordSection />
      <SessionsSection />
    </div>
  );
}
