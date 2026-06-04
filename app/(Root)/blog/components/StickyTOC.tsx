"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const NAVBAR_OFFSET = 96; // px — navbar height
const FOOTER_OFFSET = 240; // px — footer safety buffer

export default function StickyTOC({ source }: { source: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string | null>(null);

  // Extract h2 + h3
  useEffect(() => {
    const matches: TocItem[] = Array.from(
      source.matchAll(/<(h2|h3) id="([^"]+)">([^<]+)<\/h[23]>/g)
    ).map((m) => ({
      level: m[1] === "h2" ? 2 : 3,
      id: m[2],
      text: m[3],
    }));

    setItems(matches);
  }, [source]);

  // Observe headings
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  // Manual scroll with navbar offset
  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const el = document.getElementById(id);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    };

  return (
    <aside className="hidden xl:block fixed right-12 top-32 w-64 z-50000">
      <div
        className={clsx(
          "rounded-lg bg-background p-4",
          `max-h-[calc(100vh-10rem-${FOOTER_OFFSET}px)] overflow-y-auto`,
          "scrollbar-thin",
          "scrollbar-thumb-muted/40",
          "scrollbar-track-transparent",
          "hover:scrollbar-thumb-muted/70"
        )}
      >
        <p className="mb-3 text-sm font-semibold text-foreground">
          On this page
        </p>

        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className={clsx(item.level === 3 && "pl-4")}>
              <a
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className={clsx(
                  "block transition-colors",
                  item.level === 3 && "text-xs",
                  active === item.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
