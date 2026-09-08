"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";
import { Tag } from "@/components/ui/Tag";
import { fadeUp, useMotionSafe } from "@/lib/motion";

/** Card with a pointer-tracked 3D tilt; opens the detail modal on click. */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const safe = useMotionSafe();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    if (!safe) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={safe ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      className="card-surface group relative flex flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-accent-1/50 hover:shadow-[0_30px_70px_-35px_var(--glow-1)]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        className="flex h-full flex-col text-left"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
        >
          {/* Abstract placeholder art — swap for a screenshot later. */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 22% 28%, #fff 0, transparent 42%), radial-gradient(circle at 78% 72%, #fff 0, transparent 38%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
          <span className="absolute top-3 right-3 rounded-full bg-black/25 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
            {project.year}
          </span>
          <span className="absolute right-3 bottom-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3
            className="font-display text-lg font-semibold transition-colors group-hover:text-accent-1"
          >
            {project.title}
          </h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag subtle>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </button>
    </motion.article>
  );
}
