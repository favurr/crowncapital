"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function SessionsSection() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sessions");
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // API already provides isCurrent, device, location, lastActive
      setSessions(data);
    } catch (err: any) {
      console.error("Failed to fetch sessions:", err);
      toast.error("Could not load sessions.");
    } finally {
      setLoading(false);
    }
  };

  const signOutOtherSessions = async () => {
    try {
      const res = await fetch("/api/sessions", { method: "POST" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success("Signed out of all other sessions.");
      fetchSessions();
    } catch (err: any) {
      console.error("Failed to sign out other sessions:", err);
      toast.error("Could not sign out of other sessions.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading sessions...</p>;

  return (
    <section className="space-y-4 rounded-lg border p-6">
      <div>
        <h2 className="text-lg font-medium">Active Sessions</h2>
        <p className="text-sm text-muted-foreground">
          These are the devices currently signed into your account.
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex items-start justify-between gap-4 rounded-md border p-4 ${
              session.isCurrent ? "border-primary" : "border-gray-200"
            }`}
          >
            <div>
              <p className="text-sm font-medium">
                {session.device}
                {session.isCurrent && (
                  <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Current session
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {session.location} · {session.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>

      {sessions.length > 1 && (
        <div className="pt-2">
          <button
            type="button"
            onClick={signOutOtherSessions}
            className="inline-flex items-center rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            Sign out of all other sessions
          </button>
        </div>
      )}
    </section>
  );
}
