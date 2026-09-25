"use client";

import { useCallback, useState } from "react";
import { projects } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = projects.find((p) => p.slug === openSlug) ?? null;
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="Projects I've designed and built. Click any card for the longer story."
    >
      <RevealGroup
        className="grid gap-6 sm:grid-cols-2"
        stagger={0.09}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </RevealGroup>

      <ProjectModal project={active} onClose={close} />
    </Section>
  );
}
