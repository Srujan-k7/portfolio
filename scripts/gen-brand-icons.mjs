import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(
  readFileSync("node_modules/simple-icons/data/simple-icons.json", "utf8"),
);
const bySlug = new Map(data.map((i) => [i.slug, i]));

// key = the `icon` value used in profile.ts, value = simple-icons slug
const WANTED = {
  flutter: "flutter",
  dart: "dart",
  java: "openjdk",
  springboot: "springboot",
  postgresql: "postgresql",
  mongodb: "mongodb",
  redis: "redis",
  rabbitmq: "rabbitmq",
  docker: "docker",
  firebase: "firebase",
  git: "git",
  github: "github",
};

const lines = [];
for (const [key, slug] of Object.entries(WANTED)) {
  const meta = bySlug.get(slug);
  if (!meta) throw new Error(`missing icon data: ${slug}`);
  const svg = readFileSync(`node_modules/simple-icons/icons/${slug}.svg`, "utf8");
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  if (!d) throw new Error(`missing path: ${slug}`);
  lines.push(`  ${key}: { hex: "#${meta.hex}", path: ${JSON.stringify(d)} },`);
}

const out = `/**
 * Brand glyphs for the tech-stack grid, generated from simple-icons
 * (CC0). Regenerate with \`node scripts/gen-brand-icons.mjs\` after adding a
 * slug to WANTED there — never hand-edit the path data.
 */
export type BrandIcon = { hex: string; path: string };

export const brandIcons = {
${lines.join("\n")}
} as const satisfies Record<string, BrandIcon>;

export type BrandIconName = keyof typeof brandIcons;
`;

writeFileSync("src/content/brand-icons.ts", out);
console.log(`wrote ${Object.keys(WANTED).length} icons`);
