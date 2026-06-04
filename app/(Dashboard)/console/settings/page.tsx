// app/(Dashboard)/console/settings/page.tsx
import SettingsShell from "./components/settings-shell";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-6 px-6 pt-12 md:px-8 md:pt-18 md:gap-8 md:py-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <SettingsShell />
        </div>
      </div>
    </div>
  );
}
