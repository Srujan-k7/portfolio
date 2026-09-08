"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, label';

/** Blended dot + trailing ring. Desktop pointers only. */
export function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduced;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    // Hide the native cursor only while ours is actually mounted.
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x, y, translate: "-50% -50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.18 }}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent-1"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translate: "-50% -50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 46 : 26,
          height: hovering ? 46 : 26,
          backgroundColor: hovering ? "var(--glow-1)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.22 }}
        initial={false}
        className="absolute top-0 left-0 rounded-full border border-accent-1/70"
      />
    </div>
  );
}
