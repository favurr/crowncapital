// /hooks/useNotifications.ts
import { useEffect, useState } from "react";

export interface NotificationItem {
  id: number;
  message: string;
  image?: string;
  title?: string; // ← add this
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetch("/notification.json")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Failed to load notification.json:", err));
  }, []);

  return notifications;
}
