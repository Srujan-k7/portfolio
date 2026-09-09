@AGENTS.md

# Portfolio (`port`)

Single-page personal portfolio for **Srujan**. Static, no backend, no database, no tests.

## Stack

Next.js 16.3.4 (App Router) · React 19.2.8 · TypeScript strict · Tailwind CSS v4 ·
`motion` v13 (`motion/react`) · `next-themes` · `lucide-react` v1.

`npm run dev` / `build` / `start` / `lint` (`eslint`, flat config). Import alias `@/*` → `./src/*`.
Next docs live in `node_modules/next/dist/docs/` — read before touching framework APIs (see AGENTS.md).

## Layout

```
src/app/layout.tsx      Sora + Inter fonts, SEO metadata, viewport themeColor,
                        ThemeProvider > skip-link > GradientBackdrop > Cursor > Nav > main > Footer.
                        Uses the typed-routes helper `LayoutProps<"/">`.
src/app/page.tsx        Hero, About, Skills, Projects, Timeline, Contact — in that order.
src/app/globals.css     All theming (see below).
src/content/profile.ts  Structured copy/data (NOT all text — see below).
src/content/brand-icons.ts  GENERATED brand paths — `node scripts/gen-brand-icons.mjs`, never hand-edit.
src/components/{sections,layout,ui}/
src/lib/                motion.ts, useMediaQuery.ts, useScrollSpy.ts
```

## Where the text lives

UI text lives in **two** places. `src/content/profile.ts` exports `profile`, `socials`,
`about` (+`stats`), `techStack`, `projects`, `timeline`, `navLinks` and their types — that's
the data-shaped copy. (`profile.phone` is defined but never rendered — dead field.)
But every section's **eyebrow / title / description is a hardcoded string** at the `<Section>`
call site (only About's title reads `about.heading`), and microcopy is inline too: Hero's
"Hey, I'm" / CTA labels / "Scroll", About's "Available for work" badge, Contact's field labels,
placeholders, validation + demo-form messages, ProjectModal's "Live site" / "Source", Footer's
credit line, layout's "Skip to content". `Section.tsx` itself holds no copy — pure shell.
So: data → `profile.ts`; headings and microcopy → grep the component.

Still placeholder: name "Srujan Kumar", `hello@example.com`, `+91 90000 00000`, socials point at
bare `github.com`/`linkedin.com`/`x.com`, `resumeUrl: "#"`, all six projects are invented with
`links: "#"`, timeline orgs are fictional. Other placeholders: About uses an initials monogram
instead of a photo, project cards use CSS-gradient art instead of screenshots, and the Contact
form fakes a 1.2s submit then says "this is a demo form" — no endpoint is wired.

`navLinks` ids must match section ids: `home about skills projects experience contact`
(labels differ: Work → `projects`, Journey → `experience`). Nav scroll-spy keys off these.

## Theming

Tailwind v4, CSS-first — **no `tailwind.config`**. Everything is in `globals.css`:
`:root` / `.dark` define oklch CSS vars; `@theme inline` maps them to utilities
(`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-surface`, `bg-surface-2`,
`text-accent-1|2|3`, `font-display`, `font-sans`) plus `--animate-*` keyframe shorthands.
Dark mode is `@custom-variant dark (&:where(.dark, .dark *))` driven by next-themes
`attribute="class"`, `defaultTheme="dark"`, `enableSystem`.
Custom utilities: `text-gradient`, `glass`, `card-surface`. Accent colors and project
`gradient` tuples are all oklch — keep new colors in oklch for consistency.

## Components

**ui/** — `Section` (id + eyebrow + heading + description shell, sets `aria-labelledby`),
`Reveal` / `RevealGroup` (scroll-in fade, stagger parent), `CountUp`, `TypeCycle`,
`MagneticButton` (primary/ghost, renders `a` or `button`), `Tag` (`subtle` variant),
`TechIcon` (brand glyph from `content/brand-icons.ts`; server component, no `"use client"`),
`Cursor` (custom dot+ring, fine pointers only), `GradientBackdrop` (fixed aurora blobs + grid),
`ThemeProvider`, `ThemeToggle`, `SocialIcon`.

**sections/** — `Hero` (letter-stagger name, TypeCycle roles, two CTAs, scroll hint),
`About` (monogram + paragraphs + stat grid), `Skills` (centered wrap of circular brand-logo
badges, name fades in under each on hover),
`Projects` (grid of `ProjectCard` → `ProjectModal`, open state = slug),
`Timeline` (scroll-progress rail, alternating cards), `Contact` (info cards + validated form).

**layout/** — `Nav` (fixed, `glass` after 40px scroll, `layoutId="nav-pill"` active indicator,
full-screen mobile sheet), `Footer` (copyright, socials, back-to-top).

`SocialIcon` note: lucide-react v1 dropped brand marks, so GitHub/LinkedIn/X/Dribbble are
hand-written inline SVG in that file; only `mail` comes from lucide.

## Conventions to follow

- Named exports for components (`export function Hero()`), no default exports outside `app/`.
- `"use client"` on anything using motion, hooks, or DOM. `page.tsx`, `layout.tsx`, and
  `GradientBackdrop` are server components — keep them that way.
- **Reduced motion is respected everywhere.** Gate animation on `useMotionSafe()` or wrap
  variants in `useVariants()` from `@/lib/motion`; `CountUp`/`TypeCycle` also check
  `useReducedMotion()` directly, and `globals.css` kills durations under the media query.
  Any new animation must degrade the same way.
- Reuse the shared variants in `@/lib/motion` (`fadeUp`, `fadeIn`, `scaleIn`, `slideFrom`,
  `stagger`, `spring`, `easeOut`, `viewportOnce`) rather than inlining new ones.
- Hydration safety: use `useMediaQuery` / `useIsClient` (both `useSyncExternalStore`-based,
  false on the server) instead of `useState` + `useEffect` mount flags.
- Accessibility is deliberate — skip link, `aria-labelledby` headings, `aria-live` form status,
  focus trap + scroll lock + focus restore in `ProjectModal`, `sr-only` text behind decorative
  `aria-hidden` animations. Preserve these when editing.
- Tailwind utility classes only; no CSS modules, no styled-components.

## Git

Default branch `dev` (PRs target it). Never add a `Co-Authored-By: Claude` trailer.
The `nextjs-agent-rules` block in `AGENTS.md` is regenerated by `next dev` — commit it, don't strip it.
