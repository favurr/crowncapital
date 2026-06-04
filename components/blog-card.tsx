"use client";

import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function BlogCard() {
  return (
    <Card className="hover:shadow-md transition-shadow duration-150">
      <CardHeader>
        <div>
          <CardDescription>ygew</CardDescription>
          <CardTitle className="text-lg">iq7t3</CardTitle>
        </div>
        <div className="ml-2">
          <Link
            href={`/blog/$wywqg`}
            className="text-sm text-primary font-medium hover:underline"
          >
            Read
          </Link>
        </div>
      </CardHeader>
      <div className="px-6 pb-6 pt-0">
        <p className="text-muted-foreground text-sm">132de</p>
      </div>
      <CardFooter>
        <div className="text-sm text-muted-foreground">Tags</div>
      </CardFooter>
    </Card>
  );
}
