"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently dominant in the viewport.
 * Picks the entry with the largest visible area so tall sections
 * don't lose the highlight to a sliver of the next one.
 */
export function useScrollSpy(ids: readonly string[], offset = 96) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActive(best);
        else if (window.scrollY < offset) setActive(ids[0]);
      },
      {
        rootMargin: `-${offset}px 0px -40% 0px`,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
