"use client";

import { ArrowUp } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-center text-sm text-muted sm:text-left">
          © {new Date().getFullYear()} {profile.fullName}. Built with Next.js
          &amp; Tailwind.
        </p>

        <div className="flex items-center gap-2.5">
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent-1/60 hover:text-accent-1"
                >
                  <SocialIcon icon={social.icon} size={16} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent-1/60 hover:text-accent-1"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
