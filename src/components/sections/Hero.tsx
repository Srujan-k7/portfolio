"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TypeCycle } from "@/components/ui/TypeCycle";
import { easeOut, useMotionSafe } from "@/lib/motion";

export function Hero() {
  const safe = useMotionSafe();
  const letters = profile.name.split("");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: safe ? 0.05 : 0, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: safe ? 26 : 0 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pt-32 pb-24 sm:px-8"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <Sparkles size={13} className="text-accent-2" />
          {profile.availability}
        </motion.p>

        <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="sr-only">
            {profile.fullName} — {profile.roles[0]}
          </span>
          <motion.span variants={item} aria-hidden className="block text-muted">
            Hey, I&apos;m
          </motion.span>
          <span aria-hidden className="mt-1 block">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                variants={item}
                className="text-gradient inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <motion.span variants={item} className="inline-block">
              .
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={item}
          aria-hidden
          className="mt-6 font-display text-xl tracking-tight sm:text-3xl lg:text-4xl"
        >
          <TypeCycle words={profile.roles} />
        </motion.p>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#projects">
            View my work
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} variant="ghost">
            <Download size={16} />
            Download CV
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to the about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase sm:flex"
      >
        Scroll
        <motion.span
          animate={safe ? { y: [0, 7, 0] } : undefined}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full border border-line"
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  );
}
