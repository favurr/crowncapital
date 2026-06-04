"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNotifications, NotificationItem } from "@/hooks/useNotifications";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Shuffle array helper
function shuffleArray(array: NotificationItem[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Random delay between min and max ms
function randomDelay(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function AutoToast() {
  const pathname = usePathname();
  if (pathname.startsWith("/console")) {
    return null; // only show in Root/auth routes
  }
  const notifications = useNotifications();
  const [shuffled, setShuffled] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (notifications.length === 0) return;

    const randomized = shuffleArray(notifications);
    setShuffled(randomized);

    const toastDuration = 6000; // 6 seconds
    const delayAfter = 4000; // 4 seconds after toast disappears

    let currentIndex = 0;

    const showNextToast = () => {
      const item = randomized[currentIndex];
      toast.custom(
        () => (
          <div
            className="
              flex items-center gap-4 
              p-4 w-[320px] rounded-xl shadow-lg
              bg-white text-black
              border border-neutral-200
              dark:bg-neutral-900 dark:text-white
              dark:border-neutral-800
            "
          >
            <Image
              src={item.image || ""}
              alt="icon"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">
                {item.title || "Earning"}
              </span>
              <span className="text-xs opacity-90 dark:opacity-80">
                {item.message}
              </span>
            </div>
          </div>
        ),
        { duration: toastDuration },
      );

      // Prepare next index
      currentIndex = (currentIndex + 1) % randomized.length;

      // Schedule next toast **after current toast disappears + delay**
      setTimeout(showNextToast, toastDuration + delayAfter);
    };

    // Start the loop
    showNextToast();
  }, [notifications]);

  return null;
}
