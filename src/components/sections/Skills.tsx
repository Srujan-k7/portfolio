"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { fadeUp } from "@/lib/motion";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The tools I reach for"
      description="A working toolkit rather than a wish list — these are the things I use week to week."
    >
      <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.12}>
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="card-surface group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-1/50 hover:shadow-[0_24px_60px_-30px_var(--glow-1)]"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-1 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <h3 className="font-display text-lg font-semibold">{group.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{group.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  );
}
