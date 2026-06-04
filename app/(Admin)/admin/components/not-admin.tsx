"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Utility to generate random motion paths
const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function NotAdmin() {
  const floatingGears = Array.from({ length: 6 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4">
      {/* Floating animated gears with different colors */}
      {floatingGears.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-32 w-32 rounded-full border-2 border-dashed opacity-40 border-red-500"
          initial={{
            x: randomFloat(-300, 300),
            y: randomFloat(-300, 300),
            rotate: randomFloat(0, 360),
          }}
          animate={{
            x: [
              randomFloat(-400, 400),
              randomFloat(-400, 400),
              randomFloat(-400, 400),
            ],
            y: [
              randomFloat(-400, 400),
              randomFloat(-400, 400),
              randomFloat(-400, 400),
            ],
            rotate: 360,
          }}
          transition={{
            duration: randomFloat(25, 45),
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full rounded-2xl border bg-card p-8 shadow-lg text-center backdrop-blur"
      >
        {/* Central mechanical core with new colors */}
        <div className="relative mx-auto mb-6 h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed opacity-40 border-red-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border opacity-30 border-red-500"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
          <motion.div className="absolute flex justify-center text-5xl items-center inset-8 rounded-full opacity-20 animate-caret-blink font-bold">
            !
          </motion.div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-red-500">
          Access Denied
        </h1>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          You do not have permission to access this page. Only administrators
          can view this section.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/console/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
