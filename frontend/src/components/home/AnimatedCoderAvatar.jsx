// AnimatedCoderAvatar: CSS-only animated coder behind a laptop
// Uses simple shapes to suggest a person with blinking eyes and a lively screen
export default function AnimatedCoderAvatar() {
  return (
    <div className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden ring-1 ring-white/10 bg-[radial-gradient(60%_60%_at_50%_20%,#0b1220,transparent),radial-gradient(80%_80%_at_50%_80%,#0a1a14,transparent)]">
      {/* Ambient moving blobs */}
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald-400/25 blur-3xl animate-blob" />
      <div className="absolute right-0 -bottom-6 h-44 w-44 rounded-full bg-cyan-400/25 blur-3xl animate-blob [animation-delay:1.2s]" />
      <div className="absolute left-12 bottom-6 h-36 w-36 rounded-full bg-emerald-300/25 blur-3xl animate-blob [animation-delay:2.4s]" />

      {/* Coder group */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative -translate-y-2 w-40 sm:w-52">
          {/* Head */}
          <div className="mx-auto h-16 w-16 rounded-full bg-[radial-gradient(circle_at_40%_35%,#1f2937,transparent_55%),#111827] shadow-[0_6px_12px_rgba(0,0,0,0.35)]" />

          {/* Eyes */}
          <div className="absolute left-1/2 top-5 -translate-x-1/2 flex gap-4">
            <span className="h-2 w-2 rounded-full bg-white/90 eye-blink" />
            <span className="h-2 w-2 rounded-full bg-white/90 eye-blink [animation-delay:0.9s]" />
          </div>

          {/* Shoulders / hoodie */}
          <div className="mt-2 mx-auto h-16 w-28 rounded-t-[30px] rounded-b-[14px] bg-[linear-gradient(180deg,#0f172a_0%,#0b111e_100%)] shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />

          {/* Laptop */}
          <div className="-mt-6 mx-auto w-40 sm:w-52 h-28 rounded-xl bg-[linear-gradient(180deg,#101827_0%,#0b1320_100%)] ring-1 ring-white/10 shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              {/* Screen */}
              <div className="absolute inset-0 p-3">
                <div className="space-y-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 rounded bg-emerald-400/70 code-line"
                      style={{
                        width: `${40 + (i % 3) * 20}%`,
                        animationDelay: `${i * 0.45}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-emerald-400/60 animate-spin-slow" />

              {/* Bezel */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle top light */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-24 w-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

