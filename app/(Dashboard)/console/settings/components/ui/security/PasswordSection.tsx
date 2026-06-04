"use client";

import { useState } from "react";
import { toast } from "sonner";
import { auth } from "@/lib/auth"; // Better Auth client

export default function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeSessions, setRevokeSessions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/security/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          revokeOtherSessions: revokeSessions,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update password");
      }

      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setRevokeSessions(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update password.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border p-6">
      <div>
        <h2 className="text-lg font-medium">Password & Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Update your account password. You’ll remain logged in on this device.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Current password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">New password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Confirm new password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="revoke-sessions"
            className="h-4 w-4 rounded border"
            checked={revokeSessions}
            onChange={(e) => setRevokeSessions(e.target.checked)}
            disabled={loading}
          />
          <label
            htmlFor="revoke-sessions"
            className="text-sm text-muted-foreground"
          >
            Sign out of all other sessions
          </label>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </div>
      </div>
    </section>
  );
}
