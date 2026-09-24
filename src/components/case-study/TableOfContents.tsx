"use client";

import { useEffect, useRef, useState } from "react";

type TocItem = { id: string; navLabel: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.current?.observe(el));

    return () => observer.current?.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <ol className="flex flex-col gap-1 border-l border-border">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block border-l-2 py-1.5 pl-4 font-sans text-sm transition-colors ${
                  isActive
                    ? "border-green text-ink"
                    : "border-transparent text-ink-faint hover:text-ink-soft"
                }`}
                style={{ marginLeft: "-1px" }}
              >
                {item.navLabel}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
