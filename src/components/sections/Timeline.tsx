"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useRef } from "react";
import { timeline } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { fadeUp, slideFrom, useMotionSafe, useVariants, viewportOnce } from "@/lib/motion";

export function Timeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const safe = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const railScale = useTransform(scaleY, (v) => (safe ? v : 1));

  return (
    <Section
      id="experience"
      eyebrow="Journey"
      title="Where I've been"
      description="Roles, studies, and the things I picked up along the way."
    >
      <div ref={railRef} className="relative">
        {/* Rail sits left on mobile, centred from md up. */}
        <div className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY: railScale }}
          className="absolute top-0 bottom-0 left-4 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent-1 via-accent-3 to-accent-2 md:left-1/2"
        />

        <ul className="space-y-10 md:space-y-14">
          {timeline.map((entry, i) => (
            <TimelineItem key={`${entry.org}-${entry.period}`} entry={entry} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function TimelineItem({
  entry,
  index,
}: {
  entry: (typeof timeline)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const Icon = entry.kind === "work" ? Briefcase : GraduationCap;
  const cardVariants = useVariants(slideFrom(isLeft ? "left" : "right"));
  const dotVariants = useVariants(fadeUp);

  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative grid grid-cols-[auto_1fr] gap-5 md:grid-cols-2 md:gap-0"
    >
      {/* Node */}
      <motion.span
        variants={dotVariants}
        className="relative z-10 mt-6 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-accent-1 [animation:var(--animate-pulse-ring)] md:absolute md:left-1/2 md:mt-8 md:-translate-x-1/2"
      >
        <Icon size={14} />
      </motion.span>

      <motion.div
        variants={cardVariants}
        className={
          isLeft
            ? "card-surface rounded-3xl p-5 transition-colors hover:border-accent-1/50 sm:p-6 md:col-start-1 md:mr-12"
            : "card-surface rounded-3xl p-5 transition-colors hover:border-accent-1/50 sm:p-6 md:col-start-2 md:ml-12"
        }
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="rounded-full bg-accent-1/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-accent-1">
            {entry.period}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <MapPin size={11} />
            {entry.location}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold">{entry.role}</h3>
        <p className="text-sm font-medium text-accent-2">{entry.org}</p>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{entry.summary}</p>

        <ul className="mt-4 space-y-2">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm text-muted">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-1 to-accent-2"
              />
              {highlight}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.li>
  );
}
