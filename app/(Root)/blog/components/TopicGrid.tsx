"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TopicGrid({
  title,
  items,
}: {
  title: string;
  items: { id: string; title: string; excerpt: string }[];
}) {
  return (
    <section className="mb-8 md:mb-16">
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-primary"
        >
          View all
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <Card key={it.id}>
            <CardHeader>
              <CardTitle>
                <h3 className="font-semibold">{it.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-12">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {it.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" asChild>
                <Link href={`/blog/${it.id}`}>Read</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
