"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { profile, socials } from "@/content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { slideFrom } from "@/lib/motion";

type Fields = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent";

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(values: Fields) {
  const errors: Partial<Fields> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "A little more detail would help — 10 characters minimum.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof Fields, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Placeholder submit — wire this to a real endpoint later.
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("sent");
    setValues(EMPTY);
    setTimeout(() => setStatus("idle"), 3600);
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Got a project, a role, or just a question? Drop a note and I'll reply within a day or two."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal variants={slideFrom("left")} className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="card-surface flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent-1/50"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-1/10 text-accent-1">
              <Mail size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted">Email</span>
              <span className="block truncate font-medium">{profile.email}</span>
            </span>
          </a>

          <div className="card-surface flex items-center gap-4 rounded-2xl p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-2/10 text-accent-2">
              <MapPin size={18} />
            </span>
            <span>
              <span className="block text-xs text-muted">Based in</span>
              <span className="block font-medium">{profile.location}</span>
            </span>
          </div>

          <div className="card-surface rounded-2xl p-5">
            <p className="text-xs text-muted">Elsewhere</p>
            <ul className="mt-3 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent-1/60 hover:text-accent-1"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variants={slideFrom("right")}>
          <form onSubmit={handleSubmit} noValidate className="card-surface rounded-3xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                value={values.name}
                error={errors.name}
                onChange={(v) => update("name", v)}
                placeholder="Ada Lovelace"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={(v) => update("email", v)}
                placeholder="ada@example.com"
              />
            </div>

            <div className="mt-5">
              <Field
                id="message"
                label="Message"
                multiline
                value={values.message}
                error={errors.message}
                onChange={(v) => update("message", v)}
                placeholder="Tell me a bit about what you're working on…"
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-14px_var(--glow-1)] disabled:cursor-not-allowed sm:w-auto sm:px-8"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-accent-1),var(--color-accent-3),var(--color-accent-2),var(--color-accent-1))] bg-[length:200%_auto] transition-[background-position] duration-700 group-hover:bg-right"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 inline-flex items-center gap-2"
                >
                  {status === "idle" && (
                    <>
                      Send message <Send size={15} />
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      Sending <Loader2 size={15} className="animate-spin" />
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      Message sent <Check size={15} />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted">
              {status === "sent"
                ? "Thanks! This is a demo form, so nothing was actually sent."
                : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const shared = {
    id,
    name: id,
    value,
    placeholder,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className: `w-full rounded-2xl border bg-surface-2/50 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-accent-1 focus:shadow-[0_0_0_4px_var(--glow-1)] ${
      error ? "border-red-500/70" : "border-line"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={`${shared.className} resize-y`} />
      ) : (
        <input {...shared} type={type} />
      )}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 overflow-hidden text-xs text-red-500"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
