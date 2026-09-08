"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMotionSafe } from "@/lib/motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
  strength?: number;
};

/** Button/link whose contents lean toward the pointer while hovered. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const safe = useMotionSafe();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (!safe || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-colors select-none";

  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-12px_var(--glow-1)]"
      : "border border-line bg-surface/60 text-fg hover:border-accent-1/50 hover:bg-surface-2/70";

  const inner = (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-accent-1),var(--color-accent-3),var(--color-accent-2),var(--color-accent-1))] bg-[length:200%_auto] transition-[background-position] duration-700 group-hover:bg-right"
        />
      ) : null}
      <motion.span
        style={safe ? { x: sx, y: sy } : undefined}
        className="relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </>
  );

  const shared = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: `${base} ${styles} ${className}`,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        whileTap={safe ? { scale: 0.96 } : undefined}
        {...shared}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      whileTap={safe ? { scale: 0.96 } : undefined}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
