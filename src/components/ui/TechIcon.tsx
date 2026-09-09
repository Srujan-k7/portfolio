import { brandIcons, type BrandIconName } from "@/content/brand-icons";

type Props = {
  name: BrandIconName;
  className?: string;
};

/**
 * Brand glyph rendered from the generated simple-icons path data.
 * Purely decorative — the label lives on the wrapper in Skills.
 */
export function TechIcon({ name, className = "" }: Props) {
  const icon = brandIcons[name];

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden
      focusable="false"
      className={className}
      style={{ color: icon.hex }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
