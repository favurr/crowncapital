"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;             // numeric value to count to
  duration?: number;         // in ms
  delay?: number;            // in ms
  prefix?: string;           // optional text before number
  suffix?: string;           // optional text after number
  formatter?: (value: number) => string; // optional custom formatting
};

export default function CountUp({
  value,
  duration = 1200,
  delay = 0,
  prefix = "",
  suffix = "",
  formatter,
}: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        const start = performance.now();

        const animate = (now: number) => {
          const elapsed = now - start - delay;
          if (elapsed < 0) {
            requestAnimationFrame(animate);
            return;
          }

          const progress = Math.min(elapsed / duration, 1);
          const next = Math.floor(progress * value);

          setCurrent(next);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrent(value);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {formatter ? formatter(current) : current.toLocaleString()}
      {suffix}
    </span>
  );
}
