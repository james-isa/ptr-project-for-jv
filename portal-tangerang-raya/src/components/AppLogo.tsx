import React from "react";

interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  tagline?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  tagline,
}) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* TR Icon Monogram */}
      <div 
        className={`${sizeMap[size]} relative shrink-0 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-md shadow-cyan-950/40 p-1 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}
      >
        {/* Glow corner light */}
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 blur-[1px] opacity-90 shadow-[0_0_8px_#38bdf8]" />

        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Subtle bg glow */}
          <circle cx="50" cy="50" r="45" fill="#0284c7" fillOpacity="0.06" />

          {/* Cyan Outer TR Monogram */}
          <g stroke="#00d2ff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
            {/* T Bar & Leg */}
            <path d="M 20 28 L 65 28" />
            <path d="M 40 28 L 22 75" />

            {/* R Loop & Leg */}
            <path d="M 48 28 C 68 28 80 35 80 47 C 80 57 70 64 54 64 L 43 64" />
            <path d="M 52 64 L 74 85" />
          </g>

          {/* White Inner High-Contrast Core */}
          <g stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 28 35 L 60 35" />
            <path d="M 45 35 L 30 73" />
            <path d="M 52 35 C 64 35 73 40 73 47 C 73 53 66 58 55 58 L 47 58" />
            <path d="M 54 58 L 70 82" />
          </g>

          {/* Mini Sun Burst Top Right */}
          <circle cx="80" cy="18" r="3" fill="#ffffff" />
          <path d="M 80 12 L 80 24 M 74 18 L 86 18 M 76 14 L 84 22 M 76 22 L 84 14" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 bg-clip-text text-transparent">
              PORTAL TANGERANG RAYA
            </span>
          </div>
          <span className="text-[10.5px] text-slate-500 font-medium tracking-wide flex items-center gap-1.5">
            <span>{tagline || "Pusat Berita, Layanan Publik & UMKM Terpadu"}</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-cyan-700 font-semibold text-[10px] hidden sm:inline">enlightening the future</span>
          </span>
        </div>
      )}
    </div>
  );
};
