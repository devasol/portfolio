// AnimatedAvatar: Pure HTML/CSS animated avatar (no images)
// Layers of animated color blobs + subtle grid/shine, inside a circular mask.
export default function AnimatedAvatar() {
  return (
    <div className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden bg-gray-900 ring-1 ring-white/10">
      {/* static gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_20%,rgba(16,185,129,0.25),transparent),radial-gradient(60%_60%_at_70%_60%,rgba(6,182,212,0.25),transparent),radial-gradient(50%_50%_at_40%_80%,rgba(34,211,238,0.2),transparent)]" />

      {/* animated soft blobs */}
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald-400/40 blur-3xl animate-blob" />
      <div className="absolute right-0 -bottom-6 h-44 w-44 rounded-full bg-cyan-400/40 blur-3xl animate-blob [animation-delay:1.2s]" />
      <div className="absolute left-12 bottom-6 h-36 w-36 rounded-full bg-emerald-300/40 blur-3xl animate-blob [animation-delay:2.4s]" />

      {/* rotating highlight sweep */}
      <div className="pointer-events-none absolute -inset-8 rounded-[999px] bg-[conic-gradient(from_0deg,transparent_0,transparent_75%,rgba(255,255,255,0.08)_85%,transparent_100%)] animate-spin-slow" />

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
    </div>
  );
}

