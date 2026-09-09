"use client";

import { motion } from "motion/react";
import { techStack } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { scaleIn, useVariants } from "@/lib/motion";

export function Skills() {
  const item = useVariants(scaleIn);

  return (
    <Section
      id="skills"
      eyebrow="Tech Stack"
      title="What I build with"
      description="A working toolkit rather than a wish list — these are the things I use week to week."
    >
      <RevealGroup
        as="ul"
        stagger={0.06}
        className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12"
      >
        {techStack.map((tech) => (
          <motion.li
            key={tech.name}
            variants={item}
            className="group relative flex flex-col items-center"
          >
            <div className="relative grid size-20 place-items-center rounded-full bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1.5 sm:size-24 dark:bg-white/95 dark:ring-white/10">
              <TechIcon
                name={tech.icon}
                className="size-9 transition-transform duration-300 group-hover:scale-110 sm:size-11"
              />
            </div>
            <span className="absolute -bottom-6 text-xs font-medium text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
              {tech.name}
            </span>
            <span className="sr-only">{tech.name}</span>
          </motion.li>
        ))}
      </RevealGroup>
    </Section>
  );
}
