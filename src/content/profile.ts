import type { BrandIconName } from "./brand-icons";

/**
 * Every piece of copy on the site lives here.
 * Swap these dummy values for real ones — no component changes needed.
 */

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "dribbble";
};

export type Stat = { value: number; suffix: string; label: string };

export type Tech = { name: string; icon: BrandIconName };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  gradient: [string, string];
  links: { live?: string; repo?: string };
  featured?: boolean;
};

export type TimelineEntry = {
  kind: "work" | "Internship" | "education";
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export const profile = {
  name: "Srujan",
  fullName: "Srujan",
  initials: "SK",
  roles: [
    "Flutter Developer"
  ],
  tagline:
    "Building thoughtful digital experiences, one line of code at a time",
  location: "Kasaragod, India",
  email: "srujansrujan267@gmail.com",
  phone: "+91 6282843638",
  availability: "Open to freelance & full-time roles",
  resumeUrl: "#",
} as const;

export const socials: Social[] = [
  { label: "GitHub", href: "http://github.com/Srujan-k7", icon: "github" },
  { label: "LinkedIn", href: "www.linkedin.com/in/srujank07", icon: "linkedin" },
  { label: "X", href: "https://x.com/SrujanK28", icon: "twitter" },
  { label: "Email", href: "mailto:srujansrujan267@gmail.com", icon: "mail" },
];

export const about = {
  heading: "A bit about me",
  paragraphs: [
    "I’m a passionate software developer who enjoys turning ideas into practical, user-friendly digital experiences.",
    "I have hands-on experience with Flutter and full-stack development, along with technologies such as Java, Spring Boot, and Microservices.",
    "I enjoy learning new technologies, solving problems, and continuously improving the way I build software. I’m always curious to explore, experiment, and create meaningful products through code.",
  ],
  // stats: [
  //   { value: 5, suffix: "+", label: "Years experience" },
  //   { value: 30, suffix: "+", label: "Projects shipped" },
  //   { value: 12, suffix: "", label: "Happy clients" },
  //   { value: 8, suffix: "", label: "Awards & mentions" },
  // ] as Stat[],
};

/** Order here is the order of the logo grid. `icon` must exist in brand-icons.ts. */
export const techStack: Tech[] = [
  { name: "Flutter", icon: "flutter" },
  { name: "Dart", icon: "dart" },
  { name: "Java", icon: "java" },
  { name: "Spring Boot", icon: "springboot" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Redis", icon: "redis" },
  { name: "RabbitMQ", icon: "rabbitmq" },
  { name: "Docker", icon: "docker" },
  { name: "Firebase", icon: "firebase" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
];

export const projects: Project[] = [
  {
    slug: "nebula-analytics",
    title: "Nebula Analytics",
    tagline: "Real-time product analytics dashboard",
    description:
      "A streaming analytics dashboard that renders millions of events without dropping a frame. Built a virtualised chart layer, a query cache keyed on filter state, and a websocket pipeline that batches updates into animation frames.",
    tech: ["Next.js", "TypeScript", "D3", "Redis", "WebSockets"],
    year: "2025",
    gradient: ["oklch(0.62 0.24 295)", "oklch(0.78 0.15 200)"],
    links: { live: "#", repo: "#" },
    featured: true,
  },
  {
    slug: "orbit-commerce",
    title: "Orbit Commerce",
    tagline: "Headless storefront with sub-second navigation",
    description:
      "A headless e-commerce front end serving 40k monthly shoppers. Server components for catalogue pages, optimistic cart updates, and an edge-cached search endpoint brought median navigation under 400ms.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Vercel"],
    year: "2025",
    gradient: ["oklch(0.72 0.19 340)", "oklch(0.62 0.24 295)"],
    links: { live: "#", repo: "#" },
    featured: true,
  },
  {
    slug: "atlas-design-system",
    title: "Atlas Design System",
    tagline: "48 components, one source of truth",
    description:
      "A component library and token pipeline adopted by four product teams. Design tokens flow from Figma into CSS variables at build time, and every component ships with docs, tests, and accessibility notes.",
    tech: ["React", "Storybook", "Radix UI", "Style Dictionary"],
    year: "2024",
    gradient: ["oklch(0.78 0.15 200)", "oklch(0.68 0.2 150)"],
    links: { repo: "#" },
  },
  {
    slug: "pulse-monitor",
    title: "Pulse Monitor",
    tagline: "Uptime and incident tracking for small teams",
    description:
      "A self-hostable uptime monitor with multi-region checks, incident timelines, and status pages. The scheduler runs on cron workers and dedupes alerts so a single outage never becomes forty notifications.",
    tech: ["Node.js", "Docker", "AWS Lambda", "MongoDB"],
    year: "2024",
    gradient: ["oklch(0.75 0.17 60)", "oklch(0.72 0.19 340)"],
    links: { live: "#", repo: "#" },
  },
  {
    slug: "verse-notes",
    title: "Verse Notes",
    tagline: "Offline-first collaborative notebook",
    description:
      "A markdown notebook that syncs across devices and keeps working on a plane. CRDT-backed merging, an IndexedDB cache, and a conflict view that shows exactly what changed and who changed it.",
    tech: ["React", "CRDT", "IndexedDB", "GraphQL"],
    year: "2023",
    gradient: ["oklch(0.68 0.2 150)", "oklch(0.78 0.15 200)"],
    links: { live: "#", repo: "#" },
  },
  {
    slug: "lumen-portfolio-kit",
    title: "Lumen Portfolio Kit",
    tagline: "An open-source starter for developer sites",
    description:
      "A themeable portfolio starter with motion primitives, MDX case studies, and a Lighthouse budget enforced in CI. Around 900 stars and a steady stream of community themes.",
    tech: ["Next.js", "MDX", "Tailwind CSS", "GitHub Actions"],
    year: "2023",
    gradient: ["oklch(0.62 0.24 295)", "oklch(0.75 0.17 60)"],
    links: { live: "#", repo: "#" },
  },
];

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    role: "Flutter Developer",
    org: "Synterra It Solutions Pvt Ltd",
    period: "2026 Jul — Present",
    location: "Mangalore, India",
    summary:
      "Building and maintaining cross-platform mobile applications using Flutter, ensuring high performance and a seamless user experience.",
    highlights: [
      "Built and fixed Flutter UI screens for a responsive user experience",
      "Integration of GraphQL APIs for dynamic data and backend functionality",
      "Debugged UI and API integration issues to improve app performance.",
    ],
  },
  {
    kind: "Internship",
    role: "Developer Intern",
    org: "Synterra It Solutions Pvt Ltd",
    period: "2026 Jan— 2026 Jun",
    location: "Mangalore, India",
    summary:
      "Owned checkout and billing across the storefront and internal admin tools.",
    highlights: [
      "Rebuilt checkout, lifting conversion 18% quarter over quarter",
      "Migrated a legacy REST API to GraphQL with zero downtime",
      "Set up end-to-end tests that caught 30+ regressions before release",
    ],
  },
  {
    kind: "work",
    role: "Frontend Developer",
    org: "Craftbyte Studio",
    period: "2021 — 2022",
    location: "Hyderabad, India",
    summary:
      "Built marketing sites and web apps for early-stage startup clients.",
    highlights: [
      "Shipped 14 client projects averaging 96+ Lighthouse performance",
      "Created the studio's reusable animation and layout toolkit",
    ],
  },
  {
    kind: "education",
    role: "M.Tech, Computer Science",
    org: "Institute of Technology",
    period: "2019 — 2021",
    location: "Hyderabad, India",
    summary:
      "Focused on distributed systems and human-computer interaction.",
    highlights: [
      "Thesis on latency-aware scheduling for edge workloads",
      "Graduated with distinction",
    ],
  },
  {
    kind: "education",
    role: "B.Tech, Information Technology",
    org: "State Engineering College",
    period: "2015 — 2019",
    location: "Vijayawada, India",
    summary: "Where the whole thing started, with a very ugly first website.",
    highlights: [
      "President of the coding club for two years",
      "Won two inter-college hackathons",
    ],
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;
