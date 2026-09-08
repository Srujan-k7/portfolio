/** Fixed aurora blobs + grid — pure CSS, sits behind everything. */
export function GradientBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,var(--glow-1),transparent_68%)] blur-3xl [animation:var(--animate-drift-a)]" />
      <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--glow-2),transparent_68%)] blur-3xl [animation:var(--animate-drift-b)]" />
      <div className="absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,var(--glow-3),transparent_70%)] blur-3xl [animation:var(--animate-drift-c)]" />

      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
