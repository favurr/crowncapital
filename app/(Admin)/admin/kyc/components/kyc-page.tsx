"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import KycCard from "./kyc-card";
import KycDialog from "./kyc-dialog";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  kycStatus: string;
  kycDetails: unknown;
}

export default function KycPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadUsers();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/kyc-users");
      const newUsers: User[] = await res.json();

      setUsers((prev) => [...prev, ...newUsers]);
      if (newUsers.length < 20) setHasMore(false);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user, index) => {
        if (users.length === index + 1) {
          return (
            <div key={user.id} ref={lastUserRef}>
              <KycCard user={user} onCheck={() => setSelectedUser(user)} />
            </div>
          );
        }
        return (
          <KycCard
            key={user.id}
            user={user}
            onCheck={() => setSelectedUser(user)}
          />
        );
      })}
      {selectedUser && (
        <KycDialog user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}
