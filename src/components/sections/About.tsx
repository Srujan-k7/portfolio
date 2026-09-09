"use client";

import { motion } from "motion/react";
import { about, profile } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { fadeUp, slideFrom, useMotionSafe } from "@/lib/motion";

export function About() {
  const safe = useMotionSafe();

  return (
    <Section
      id="about"
      eyebrow="About"
      title={about.heading}
      description="The short version: I like building things that are quick, clear, and pleasant to use."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
        <Reveal variants={slideFrom("left")} className="mx-auto w-full max-w-[340px] lg:mx-0">
          <motion.div
            animate={safe ? { y: [0, -12, 0] } : undefined}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_180deg,var(--color-accent-1),var(--color-accent-2),var(--color-accent-3),var(--color-accent-1))] opacity-90 blur-[2px]" />
            <div className="absolute inset-[3px] grid place-items-center rounded-[1.9rem] bg-surface">
              {/* Placeholder monogram — drop a photo in here later. */}
              <span className="text-gradient font-display text-7xl font-bold">
                {profile.initials}
              </span>
            </div>
            <div className="absolute -right-3 -bottom-3 rounded-2xl border border-line bg-surface px-4 py-2.5 text-xs font-medium shadow-lg">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 [animation:var(--animate-pulse-ring)]" />
              Available for work
            </div>
          </motion.div>
        </Reveal>

        <div>
          <RevealGroup className="space-y-5" stagger={0.12}>
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-base leading-relaxed text-muted text-pretty sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </RevealGroup>

          {/* <RevealGroup
            as="ul"
            stagger={0.09}
            delay={0.15}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {about.stats.map((stat) => (
              <motion.li
                key={stat.label}
                variants={fadeUp}
                className="card-surface rounded-2xl p-4 transition-colors hover:border-accent-1/50"
              >
                <p className="text-gradient font-display text-3xl font-semibold">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
              </motion.li>
            ))}
          </RevealGroup> */}
        </div>
      </div>
    </Section>
  );
}
