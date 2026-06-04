"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import BannerGrid from "./components/BannerGrid";
import TopicGrid from "./components/TopicGrid";
import CTA from "./components/CTA";
import BLOG_POSTS, { type BlogPost } from "@/app/(Root)/blog/data";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  color?: string;
  accent?: string;
  border?: boolean;
};
type Topic = { id: string; title: string; excerpt: string };

export default function BlogHomePage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // reset active index when query changes
    setActiveIndex(-1);
  }, [query]);

  const banners: Banner[] = [
    {
      id: "start-here",
      title: "New to AlphaWealth?",
      subtitle: "Start here to understand how AlphaWealth works",
      color: "bg-blue-600",
      accent: "bg-yellow-300",
    },
    {
      id: "free-support",
      title: "Get Free Support",
      subtitle: "Receive a reply within 72 hours",
      color: "bg-white",
      border: true,
    },
  ];

  const allTopics: Topic[] = BLOG_POSTS.map((post) => ({
  id: post.slug,
  title: post.title,
  excerpt: post.excerpt ?? "",
}));

const trendingTopics = BLOG_POSTS
  .filter((p) => !p.isSupport)
  .map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
  }));

const supportTopics = BLOG_POSTS
  .filter((p) => p.isSupport)
  .map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
  }));


  const filteredTrending = useMemo(
  () =>
    trendingTopics.filter((t) =>
      (t.title + " " + t.excerpt)
        .toLowerCase()
        .includes(query.toLowerCase())
    ),
  [query, trendingTopics]
);

const filteredSupport = useMemo(
  () =>
    supportTopics.filter((t) =>
      (t.title + " " + t.excerpt)
        .toLowerCase()
        .includes(query.toLowerCase())
    ),
  [query, supportTopics]
);


  // Suggestions: combine lists and search only for suggestions (doesn't filter the page cards)
  const suggestions = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return allTopics.filter((it) =>
    (it.title + " " + it.excerpt).toLowerCase().includes(q)
  );
}, [query, allTopics]);


  useEffect(() => {
    setOpen(query.trim().length > 0 && suggestions.length > 0);
    setActiveIndex(-1);
  }, [query, suggestions.length]);

  const highlight = useCallback((text: string, q: string) => {
    if (!q) return text;
    const lc = text.toLowerCase();
    const qi = lc.indexOf(q.toLowerCase());
    if (qi === -1) return text;
    const before = text.slice(0, qi);
    const match = text.slice(qi, qi + q.length);
    const after = text.slice(qi + q.length);
    return (
      <>
        {before}
        <span className="bg-yellow-100 rounded px-0.5">{match}</span>
        {after}
      </>
    );
  }, []);

  const selectSuggestion = useCallback((s: { id: string; title: string }) => {
    setQuery(s.title);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === "ArrowDown") setOpen(true);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          selectSuggestion(suggestions[activeIndex]);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
      }
    },
    [open, activeIndex, suggestions, selectSuggestion]
  );

  return (
    <main className="pb-18 pt-24 md:pt-26 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-4xl mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            How can we help you
          </h1>
          <div className="relative flex items-center gap-4">
            <div className="w-full">
              <Input
                aria-label="Search articles"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search our FAQs"
                className="rounded-full px-6 py-3 shadow-sm placeholder:text-muted-foreground"
                onFocus={() =>
                  setOpen(query.trim().length > 0 && suggestions.length > 0)
                }
              />

              {open && (
                <div
                  role="listbox"
                  aria-label="Search suggestions"
                  className="absolute left-0 right-0 mt-2 z-50 w-full rounded-md border bg-popover p-1 shadow-lg"
                >
                  <div className="px-3 py-2 text-sm font-medium">
                    Suggestions
                  </div>

                  {suggestions.slice(0, 6).map((s, idx) => (
                    <button
                      key={s.id}
                      role="option"
                      aria-selected={activeIndex === idx}
                      onMouseDown={(e) =>
                        e.preventDefault()
                      } /* keep input focus */
                      onClick={() => selectSuggestion(s)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left px-4 py-3 ${
                        idx === activeIndex ? "bg-muted/10" : ""
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {highlight(s.title, query)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {highlight(s.excerpt, query)}
                      </div>
                    </button>
                  ))}

                  {suggestions.length === 0 && (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No matching articles
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Bento grid (moved to component) */}
        <BannerGrid banners={banners} />

        <TopicGrid
          title="Trending topics"
          items={filteredTrending.slice(0, 6)}
        />

        <TopicGrid title="Support topics" items={filteredSupport.slice(0, 6)} />

        <CTA />
      </div>

      {/* Tawk.to script (will be loaded but chat open attempts will fallback if API missing) */}
      <Script id="tawk" strategy="afterInteractive">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/65ab0f638d261e1b5f559d12/1jd50u5i7';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
      </Script>
    </main>
  );
}
