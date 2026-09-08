"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMotionSafe } from "@/lib/motion";

export function Tag({
  children,
  subtle = false,
}: {
  children: ReactNode;
  subtle?: boolean;
}) {
  const safe = useMotionSafe();

  return (
    <motion.span
      whileHover={safe ? { y: -2, scale: 1.05 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={
        subtle
          ? "inline-flex items-center rounded-full border border-line/70 bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted"
          : "inline-flex cursor-default items-center rounded-full border border-line bg-surface-2/70 px-3.5 py-1.5 text-sm font-medium text-fg/85 transition-colors hover:border-accent-1/60 hover:text-fg hover:shadow-[0_0_20px_-6px_var(--glow-1)]"
      }
    >
      {children}
    </motion.span>
  );
}
