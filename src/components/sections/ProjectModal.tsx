"use client";

import { AnimatePresence, motion } from "motion/react";
import { Globe, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcon";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/profile";
import { Tag } from "@/components/ui/Tag";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Move focus in, then keep Tab cycling inside the panel.
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-${project.slug}`}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-2xl"
          >
            <div
              className="relative aspect-[16/8]"
              style={{
                background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/55"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs tracking-[0.18em] text-accent-1 uppercase">
                {project.year}
              </p>
              <h3
                id={`modal-${project.slug}`}
                className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
              >
                {project.title}
              </h3>
              <p className="mt-1 text-muted">{project.tagline}</p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="mt-5 leading-relaxed text-fg/85">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--color-accent-1),var(--color-accent-2))] px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <Globe size={15} />
                      Live site
                    </a>
                  ) : null}
                  {project.links.repo ? (
                    <a
                      href={project.links.repo}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent-1/60 hover:text-accent-1"
                    >
                      <GithubIcon size={15} />
                      Source
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
