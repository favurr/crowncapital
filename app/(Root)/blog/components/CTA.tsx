"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CTA() {
  function openChat() {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && (window as any).Tawk_API) {
        // @ts-ignore
        (window as any).Tawk_API.maximize &&
          (window as any).Tawk_API.maximize();
        // @ts-ignore
        (window as any).Tawk_API.focus && (window as any).Tawk_API.focus();
      }
    } catch (e) {
      /* noop */
    }
  }

  return (
    <section className="mb-16 mt-24">
      <Card
        className="p-6 text-white"
        style={{
          background:
            "linear-gradient(90deg, var(--color-card) 30%, var(--color-accent) 100%)",
          color: "var(--color-primary-foreground)",
        }}
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="font-medium">Now what you are looking for?</p>
          </div>

          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                openChat();
              }}
              className="rounded-full px-6 py-3"
            >
              Ask our chatbot
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
