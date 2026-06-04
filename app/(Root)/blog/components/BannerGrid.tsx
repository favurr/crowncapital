"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  color?: string;
  border?: boolean;
};

export default function BannerGrid({ banners }: { banners: Banner[] }) {
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
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-16">
      <Card
        className="lg:col-span-2 p-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, var(--color-card) 30%, var(--color-accent) 100%)",
          color: "var(--color-primary-foreground)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl text-muted-foreground font-semibold">{banners[0].title}</h3>
            <p className="mt-2 text-sm text-muted-foreground opacity-90">{banners[0].subtitle}</p>
            <div className="mt-4 flex items-center">
              <Button
              className="rounded-full px-4 py-2 mr-2"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
              asChild
            >
              <Link href="/blog/new-users">
              Read the Overview
              </Link>
            </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className="w-40 h-40 rounded-full"
              style={{
                backgroundColor: "var(--card-foreground)",
                opacity: 0.18,
              }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 pt-14">
        <div>
          <h3 className="text-2xl text-muted-foreground font-semibold">
            {banners[1].title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground opacity-90">
            {banners[1].subtitle}
          </p>
          <div className="mt-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                openChat();
              }}
              className="rounded-full px-4 py-2 mr-2"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
            >
              Ask our chatbot
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-muted-foreground opacity-90"
              asChild
            >
              <Link href="/blog/support">
              Learn more
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
