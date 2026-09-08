"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 68;
const DELETE_MS = 34;
const HOLD_MS = 1600;

/** Types each word out, holds, deletes, then moves to the next. */
export function TypeCycle({ words }: { words: readonly string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  const current = words[index % words.length];

  useEffect(() => {
    if (reduced) return;

    if (!deleting && typed === current) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && typed === "") {
      const next = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(next);
    }

    const tick = setTimeout(
      () =>
        setTyped((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1),
        ),
      deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(tick);
  }, [typed, deleting, current, words.length, reduced]);

  // Reduced motion shows the first role statically, no typing.
  const text = reduced ? words[0] : typed;
  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="inline-flex items-baseline">
      {/* Reserves the widest word's width so the layout never shifts. */}
      <span className="relative">
        <span aria-hidden className="invisible whitespace-nowrap">
          {widest}
        </span>
        <span aria-hidden className="absolute inset-y-0 left-0 whitespace-nowrap">
          <span className="text-gradient font-semibold">{text}</span>
          {reduced ? null : (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent-2 align-middle [animation:var(--animate-caret)]" />
          )}
        </span>
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
