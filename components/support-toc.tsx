"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  BookOpen,
  UserCheck,
  CreditCard,
  ArrowUpRight,
  Tag,
  ShieldCheck,
  FileCheck,
  Bug,
  Code,
  Mail,
  Menu,
} from "lucide-react";

type Item = { id: string; title: string; icon?: string };

export type TocItem = {
  id: string;
  title: string;
  children?: Array<{ id: string; title: string }>;
};

const ICON_MAP: Record<string, React.ReactNode> = {
  getting_started: <BookOpen className="size-4 mr-2" />,
  account: <UserCheck className="size-4 mr-2" />,
  buying: <CreditCard className="size-4 mr-2" />,
  withdrawals: <ArrowUpRight className="size-4 mr-2" />,
  fees: <Tag className="size-4 mr-2" />,
  security: <ShieldCheck className="size-4 mr-2" />,
  kyc: <FileCheck className="size-4 mr-2" />,
  troubleshooting: <Bug className="size-4 mr-2" />,
  integrations: <Code className="size-4 mr-2" />,
  contact: <Mail className="size-4 mr-2" />,
};

// NOTE: TOC items should be exported from article components so that each article
// can provide an explicit, deterministic list of sections. When `items` is not
// provided, the component will fall back to building the TOC from the DOM.

export default function SupportToc({ items }: { items?: TocItem[] }) {
  const [toc, setToc] = useState<TocItem[]>(items || []);
  const [active, setActive] = useState<string | null>(null);

  // Build TOC from article headings if items not provided
  useEffect(() => {
    if (items && items.length) return;

    const headings = Array.from(
      document.querySelectorAll("article h2, article h3"),
    ) as HTMLElement[];

    const built: TocItem[] = [];
    headings.forEach((h) => {
      if (!h.id) return;
      if (h.tagName.toLowerCase() === "h2") {
        built.push({ id: h.id, title: h.innerText, children: [] });
      } else if (h.tagName.toLowerCase() === "h3") {
        const last = built[built.length - 1];
        if (last) last.children!.push({ id: h.id, title: h.innerText });
      }
    });

    if (built.length) setToc(built);
  }, [items]);

  // Intersection observer for active heading
  useEffect(() => {
    const ids = toc.flatMap((t) => [
      t.id,
      ...(t.children || []).map((c) => c.id),
    ]);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [toc]);

  // on-load hash support (deep links)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!toc.length) return;
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // delay so layout settles
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          50,
        );
      }
    }
  }, [toc]);

  return (
    <aside className="w-full">
      <div className="sticky top-28">
        <div className="text-card-foreground rounded p-3">
          <div className="flex items-center gap-2 mb-3">
            <Menu className="size-4" />
            <span className="text-sm font-semibold">On this page</span>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 top-9 bottom-4 w-px bg-border" />

            <ul className="ml-6 space-y-2 text-sm">
              {toc.map((t) => (
                <li key={t.id} className="relative">
                  <a
                    href={`#${t.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(t.id);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        history.replaceState(null, "", `#${t.id}`);
                      }
                    }}
                    className={`flex items-start gap-2 pl-2 py-1 rounded-l border-l-2 transition-colors duration-150 ${
                      active === t.id
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full mt-1 ${
                        active === t.id ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    <span>{t.title}</span>
                  </a>

                  {t.children && t.children.length > 0 && (
                    <ul className="mt-2 ml-6 space-y-1">
                      {t.children.map((c) => (
                        <li key={c.id}>
                          <a
                            href={`#${c.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(c.id);
                              if (el) {
                                el.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                                history.replaceState(null, "", `#${c.id}`);
                              }
                            }}
                            className={`flex items-start gap-2 pl-2 py-0.5 rounded-l border-l-2 text-sm transition-colors duration-150 ${
                              active === c.id
                                ? "border-primary font-semibold text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full mt-2 ${
                                active === c.id
                                  ? "bg-primary"
                                  : "bg-muted-foreground"
                              }`}
                            />
                            <span>{c.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
