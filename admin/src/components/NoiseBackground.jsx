// A subtle animated noise background using CSS only to add depth
export default function NoiseBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] [background-size:32px_32px]"
    />
  );
}
