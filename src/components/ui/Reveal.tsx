"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, useVariants, viewportOnce } from "@/lib/motion";
import type { Variants } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "li" | "article" | "span";
};

/** Fades + rises its children once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: Props) {
  const safeVariants = useVariants(variants);
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={safeVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers any <Reveal>-style children beneath it. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const variants = useVariants({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  });
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}
