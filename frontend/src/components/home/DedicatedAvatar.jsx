// DedicatedAvatar: a unique SVG avatar with a golden visor and playful background
// This is an original illustration (not copied) rendered in SVG so it looks crisp in any theme.
// It adapts to dark/light mode via CSS variables.
export default function DedicatedAvatar() {
  return (
    <div className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden ring-1 ring-white/10 bg-[radial-gradient(65%_65%_at_50%_25%,_color-mix(in_oklab,var(--color-ink),transparent_92%),_transparent),radial-gradient(90%_90%_at_50%_80%,_color-mix(in_oklab,var(--color-ink),transparent_94%),_transparent)]">
      <svg
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Personal avatar"
      >
        {/* Background scribbles */}
        <defs>
          <linearGradient id="gSkin" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c28b5a" />
            <stop offset="100%" stopColor="#a76d3f" />
          </linearGradient>
          <linearGradient id="gHood" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1b2433" />
            <stop offset="100%" stopColor="#101826" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <clipPath id="clipCircle">
            <circle cx="160" cy="160" r="140" />
          </clipPath>
          <pattern id="visorPattern" width="28" height="16" patternUnits="userSpaceOnUse">
            <rect width="28" height="16" fill="#d4a000" />
            {/* Custom DS motif */}
            <path d="M6 8c0-3 6-3 6 0 0 3-6 3-6 0zm10 0c0-3 6-3 6 0 0 3-6 3-6 0" fill="#8b5d00" />
            <path d="M3 8h22" stroke="#f2d675" strokeWidth="0.8" opacity="0.5" />
          </pattern>
        </defs>

        <g clipPath="url(#clipCircle)">
          {/* soft lights */}
          <circle cx="80" cy="90" r="60" fill="#34d399" opacity="0.12" />
          <circle cx="250" cy="220" r="80" fill="#06b6d4" opacity="0.12" />

          {/* Hoodie */}
          <path d="M60 250c20-40 60-60 100-60s80 20 100 60v50H60z" fill="url(#gHood)" />

          {/* Neck */}
          <rect x="140" y="200" width="40" height="26" rx="8" fill="url(#gSkin)" />

          {/* Face */}
          <ellipse cx="160" cy="160" rx="70" ry="64" fill="url(#gSkin)" />

          {/* Hair silhouette */}
          <path d="M95 144c-2-44 30-70 64-70 35 0 70 20 73 66-6-6-18-8-26-8-18 0-34 10-43 10s-21-8-40-8c-10 0-18 3-28 10z" fill="#1f2937" />

          {/* Golden visor band */}
          <g>
            <rect x="80" y="138" width="160" height="36" rx="18" fill="url(#visorPattern)" />
            {/* slight highlight */}
            <rect x="80" y="138" width="160" height="36" rx="18" fill="#fff" opacity="0.08" />
          </g>

          {/* Smile and beard */}
          <path d="M124 192c10 10 62 10 72 0-4 10-18 22-36 22-18 0-32-12-36-22z" fill="#3b2f25" />
          <path d="M110 178c4 12 18 20 50 20s46-8 50-20" fill="none" stroke="#2b2018" strokeWidth="4" strokeLinecap="round" />

          {/* Ear pieces */}
          <ellipse cx="98" cy="166" rx="12" ry="14" fill="url(#gSkin)" />
          <ellipse cx="222" cy="166" rx="12" ry="14" fill="url(#gSkin)" />

          {/* Headphone wire */}
          <path d="M220 180c6 24-2 30-14 34-18 6-36 10-36 28" stroke="#bfa280" strokeWidth="3" fill="none" />

          {/* Subtle top light */}
          <ellipse cx="160" cy="96" rx="100" ry="30" fill="#fff" opacity="0.06" filter="url(#soft)" />
        </g>
      </svg>

      {/* thin inner ring */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

