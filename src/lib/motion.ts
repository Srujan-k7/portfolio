"use client";

import type { Transition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.4, 0, 0.2, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

/** Shared viewport config so nothing stays permanently hidden. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeSoft } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const slideFrom = (dir: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: dir === "left" ? -36 : 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.62, ease: easeOut } },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

const instant: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } },
};

/**
 * Collapses a variant set to a no-op when the user prefers reduced motion,
 * so every consumer gets the accessibility behaviour for free.
 */
export function useVariants(variants: Variants): Variants {
  const reduced = useReducedMotion();
  return reduced ? instant : variants;
}

export function useMotionSafe() {
  return !useReducedMotion();
}
