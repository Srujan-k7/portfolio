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
  /** Screenshot path under `public/`, e.g. "/projects/syncwrite.png". Falls back to `gradient` art. */
  image?: string;
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
  resumeUrl: "/Srujan_Resume.pdf",
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
    slug: "syncwrite",
    title: "SyncWrite",
    tagline: "Real-time collaborative document editor",
    description:
      "A collaborative editor where multiple users can edit the same document at once over WebSockets. Each keystroke is buffered in Redis for fast access and synchronisation across clients, and the final document state is persisted to PostgreSQL for consistency and durability.",
    tech: ["Java", "Spring Boot", "WebSockets", "Redis", "PostgreSQL"],
    year: "2025",
    gradient: ["oklch(0.62 0.24 295)", "oklch(0.78 0.15 200)"],
    links: { repo: "https://github.com/synterra-labs/26-syncwrite-srujan" },
    featured: true,
  },
  {
    slug: "mall-customer-segmentation",
    title: "Mall Customer Segmentation",
    tagline: "Finding the right customers with K-Means clustering",
    description:
      "A machine-learning project that groups mall customers by annual income and spending score using K-Means clustering. The elbow method picks the number of clusters, and the resulting segments help the mall owner identify high-value customers and target marketing at the right groups.",
    tech: ["Python", "Pandas", "Scikit-learn", "K-Means", "Matplotlib"],
    year: "2025",
    gradient: ["oklch(0.68 0.2 150)", "oklch(0.75 0.17 60)"],
    links: {},
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
    kind: "education",
    role: "Master of Computer Applications",
    org: "St Aloysius (Deemed to be University)",
    period: "2024 — 2026",
    location: "Hyderabad, India",
    summary: "Where I learned to build software that scales.",
    highlights: [
      "President of the coding club for two years",
      "Participated in hackathons",
    ],
  },
  {
    kind: "education",
    role: "B.Sc, Computer Science",
    org: "GFGC Carstreet",
    period: "2021 — 2024",
    location: "Mangalore, India",
    summary: "Where the whole thing started, with a very ugly first website.",
    highlights: [
      "Learned the fundamentals of programming and software development",
      "Participated in coding competitions",
    ],
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;
