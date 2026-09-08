"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28 lg:py-36 ${className}`}
    >
      <Reveal className="mb-12 max-w-2xl sm:mb-16">
        <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-accent-1 uppercase">
          <span className="h-px w-8 bg-gradient-to-r from-accent-1 to-accent-2" />
          {eyebrow}
        </p>
        <h2
          id={`${id}-heading`}
          className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {description}
          </p>
        ) : null}
      </Reveal>
      {children}
    </section>
  );
}
