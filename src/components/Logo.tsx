import React from 'react';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  layout?: 'stacked' | 'horizontal' | 'emblem';
  showTagline?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

/**
 * Authentic Circular Dancer Emblem Badge
 * Features:
 * - Fiery warm orange brush-stroke disc with textured paint accents
 * - Lush tropical green monstera foliage flanking left and right
 * - Street dancer in dynamic b-boy air freeze pose (white tank, dark baggy pants, kicks)
 * - Curved top arc in vivid sky cyan: "SOUL DANCE STUDIO"
 * - Curved bottom arc in crisp white: "LETS GROW TOGETHER"
 */
export const SoulEmblemBadge: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} shrink-0 select-none overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="badgeCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#00d2ff" floodOpacity="0.8" />
        </filter>
        <filter id="badgeShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
        </filter>
        <filter id="dancerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.5" />
        </filter>

        {/* Orange Circular Disc Gradients */}
        <radialGradient id="badgeDiscGrad" cx="45%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#ff7a3d" />
          <stop offset="60%" stopColor="#ff5500" />
          <stop offset="90%" stopColor="#e03800" />
          <stop offset="100%" stopColor="#b82800" />
        </radialGradient>

        {/* Tropical Leaves Gradients */}
        <linearGradient id="leafGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="leafGradRight" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="60%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>

      <g transform="translate(100, 100)" filter="url(#badgeShadow)">
        {/* Painted Brush-Stroke Circular Disc */}
        <circle cx="0" cy="0" r="90" fill="url(#badgeDiscGrad)" />

        {/* Textured Brush Edges & Organic Splatters */}
        <path
          d="M-86,-25 C-92,-8 -91,22 -80,48 C-68,72 -38,90 -8,92 C22,93 54,84 74,64 C94,44 95,14 88,-22 C83,-52 62,-76 38,-88 C8,-98 -32,-94 -60,-78 C-76,-68 -84,-45 -86,-25 Z"
          fill="#ff5500"
          opacity="0.55"
        />
        <path
          d="M-75,-42 C-86,-15 -80,30 -64,60 C-44,85 -4,94 25,88 C60,80 84,54 86,18 C88,-16 74,-60 44,-80 C14,-94 -45,-90 -75,-42 Z"
          fill="#d83600"
          opacity="0.35"
        />
        {/* Dynamic paint splatters around edge */}
        <circle cx="-88" cy="18" r="3.5" fill="#ff6b2b" />
        <circle cx="85" cy="-28" r="2.8" fill="#ff7a3d" />
        <circle cx="-62" cy="74" r="2.5" fill="#ff5500" />
        <circle cx="72" cy="58" r="3.2" fill="#e03800" />
        <circle cx="20" cy="-89" r="2.2" fill="#ff8048" />

        {/* Tropical Monstera Leaves Flanking Left and Right */}
        <g id="tropicalFoliage" opacity="0.9">
          {/* Left Foliage */}
          <path
            d="M-64,12 C-58,-32 -16,-58 8,-54 C-2,-34 -12,-10 -22,18 C-42,24 -56,20 -64,12 Z"
            fill="url(#leafGradLeft)"
          />
          {/* Leaf Cuts & Veins */}
          <path d="M-44,-24 C-34,-20 -24,-22 -14,-30" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M-38,2 C-28,4 -18,2 -10,-6" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M-52,-8 C-42,-6 -34,-12 -28,-18" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Foliage */}
          <path
            d="M56,-18 C52,26 18,54 -12,46 C2,26 14,2 22,-28 C42,-30 52,-26 56,-18 Z"
            fill="url(#leafGradRight)"
          />
          {/* Leaf Cuts & Veins */}
          <path d="M42,12 C32,10 22,12 14,20" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M36,-12 C26,-10 18,-12 10,-4" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M48,0 C38,4 30,-2 24,-10" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Street Dancer Silhouette (Air Freeze / B-Boy Freeze Pose) */}
        <g id="dancerFigure" transform="translate(0, 4) scale(0.96)" filter="url(#dancerShadow)">
          {/* Head with Locs & Bandana */}
          <circle cx="-2" cy="-56" r="10.5" fill="#18181b" />
          {/* Red/Orange Bandana Accent */}
          <path d="M-10,-58 C-8,-66 4,-66 6,-58 C2,-56 -6,-56 -10,-58 Z" fill="#ff5500" />
          {/* Locs silhouette */}
          <path d="M-9,-54 C-14,-50 -13,-45 -9,-42" stroke="#18181b" strokeWidth="3" strokeLinecap="round" />
          <path d="M-5,-52 C-10,-47 -9,-42 -5,-39" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />

          {/* Fitted Athletic Tank Top (Crisp White) */}
          <path
            d="M-13,-46 C-5,-49 6,-49 13,-46 L11,-21 C5,-19 -5,-19 -11,-21 Z"
            fill="#ffffff"
          />
          {/* Center chest seam */}
          <path d="M0,-45 L0,-22" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          {/* Muscular back & chest shading */}
          <path d="M-7,-38 C-4,-32 -4,-28 -7,-24" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6,-38 C3,-32 3,-28 6,-24" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />

          {/* Muscular Arms in Street Freeze */}
          {/* Left Arm reaching down/head */}
          <path
            d="M-13,-44 C-25,-48 -33,-35 -31,-25 C-29,-18 -23,-22 -19,-30"
            fill="none"
            stroke="#1c1917"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="-16" cy="-48" r="4.5" fill="#1c1917" />

          {/* Right Arm raised high in balance */}
          <path
            d="M13,-44 C25,-52 32,-42 27,-29 C23,-19 19,-24 15,-32"
            fill="none"
            stroke="#1c1917"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="-51" r="4.5" fill="#1c1917" />

          {/* Baggy Hip-Hop Cargo Joggers (Dark Charcoal) */}
          <path d="M-13,-21 C-5,-19 5,-19 13,-21 L17,-9 L-17,-9 Z" fill="#111827" />

          {/* Left Leg (Extended outward high in air freeze kick) */}
          <path
            d="M-13,-11 C-27,6 -46,13 -59,17 C-63,18 -65,11 -59,7 C-43,-1 -27,-4 -11,-11 Z"
            fill="#1f2937"
          />
          {/* Left Sneaker (White High-Top Kick with Orange Accent) */}
          <path
            d="M-61,19 L-73,22 C-76,19 -74,13 -69,11 L-57,13 Z"
            fill="#ffffff"
          />
          <path d="M-73,22 L-63,25" stroke="#ff5500" strokeWidth="3.2" strokeLinecap="round" />

          {/* Right Leg (Bent powerfully in freeze hook) */}
          <path
            d="M9,-11 C19,3 27,19 31,37 C25,39 19,33 15,19 C11,6 7,-1 5,-11 Z"
            fill="#1f2937"
          />
          {/* Right Sneaker (White High-Top Kick with Orange Accent) */}
          <path
            d="M31,37 L35,49 C31,53 25,51 23,45 L25,35 Z"
            fill="#ffffff"
          />
          <path d="M35,49 L27,53" stroke="#ff5500" strokeWidth="3.2" strokeLinecap="round" />
        </g>

        {/* Curved Text Along Top Arc: "SOUL DANCE STUDIO" */}
        <path
          id="badgeArcTop"
          d="M -73,-14 A 74 74 0 0 1 73,-14"
          fill="none"
          stroke="none"
        />
        <text
          fontFamily="'Syne', 'Outfit', sans-serif"
          fontWeight="900"
          fontSize="11.5"
          fill="#38bdf8"
          letterSpacing="0.16em"
          filter="url(#badgeCyanGlow)"
        >
          <textPath href="#badgeArcTop" startOffset="50%" textAnchor="middle">
            SOUL DANCE STUDIO
          </textPath>
        </text>

        {/* Curved Text Along Bottom Arc: "LETS GROW TOGETHER" */}
        <path
          id="badgeArcBottom"
          d="M 69,32 A 75 75 0 0 1 -69,32"
          fill="none"
          stroke="none"
        />
        <text
          fontFamily="'Syne', 'Outfit', sans-serif"
          fontWeight="800"
          fontSize="8.5"
          fill="#ffffff"
          letterSpacing="0.22em"
          opacity="0.95"
        >
          <textPath href="#badgeArcBottom" startOffset="50%" textAnchor="middle">
            LETS GROW TOGETHER
          </textPath>
        </text>
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  layout = 'stacked',
  showTagline = true,
  className = '',
}) => {
  // Sizing mappings for title, emblem, and tagline
  const sizeConfig = {
    xs: {
      title: 'text-lg leading-[0.9]',
      emblem: 'w-7 h-7',
      tagline: 'text-[9px] mt-0.5 tracking-wider',
      shadow: '2px 2px 0 #000, 3px 3px 0 rgba(0,0,0,0.8)',
      gap: 'gap-1.5',
    },
    sm: {
      title: 'text-2xl sm:text-3xl leading-[0.88]',
      emblem: 'w-9 h-9 sm:w-11 sm:h-11',
      tagline: 'text-[11px] mt-1 tracking-widest',
      shadow: '2.5px 2.5px 0 #000, 4px 4px 0 rgba(0,0,0,0.85)',
      gap: 'gap-2',
    },
    md: {
      title: 'text-3xl sm:text-4xl lg:text-5xl leading-[0.88]',
      emblem: 'w-12 h-12 sm:w-16 sm:h-16',
      tagline: 'text-xs sm:text-sm mt-1.5 tracking-[0.18em]',
      shadow: '3px 3px 0 #000, 5px 5px 0 rgba(0,0,0,0.9)',
      gap: 'gap-3',
    },
    lg: {
      title: 'text-5xl sm:text-6xl lg:text-7xl leading-[0.85]',
      emblem: 'w-18 h-18 sm:w-24 sm:h-24',
      tagline: 'text-sm sm:text-base mt-2.5 tracking-[0.2em]',
      shadow: '4px 4px 0 #000, 7px 7px 0 rgba(0,0,0,0.95)',
      gap: 'gap-4',
    },
    xl: {
      title: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.84]',
      emblem: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40',
      tagline: 'text-base sm:text-lg md:text-xl mt-3 tracking-[0.22em]',
      shadow: '5px 5px 0 #000, 9px 9px 0 rgba(0,0,0,0.95)',
      gap: 'gap-5',
    },
    hero: {
      title: 'text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.84]',
      emblem: 'w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44',
      tagline: 'text-sm sm:text-base md:text-xl lg:text-2xl mt-3 sm:mt-4 tracking-[0.22em]',
      shadow: '4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.95)',
      gap: 'gap-3 sm:gap-5',
    },
  };

  const current = sizeConfig[size] || sizeConfig.md;

  // 1. EMBLEM ONLY
  if (layout === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <SoulEmblemBadge className={current.emblem} />
      </div>
    );
  }

  // 2. HORIZONTAL LAYOUT (Emblem on Left, stylized brand typography on Right)
  if (layout === 'horizontal') {
    return (
      <div
        id="soul-dance-studio-logo-horizontal"
        className={`inline-flex items-center ${current.gap} select-none ${className}`}
      >
        {/* Circular Emblem */}
        <div className="relative shrink-0 hover:scale-105 transition-transform duration-300">
          <SoulEmblemBadge className={current.emblem} />
        </div>

        {/* 3-Line Stacked Typography Lockup */}
        <div className="flex flex-col justify-center leading-none">
          <div
            className={`font-serif font-black tracking-tight ${current.title}`}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: current.shadow,
            }}
          >
            {/* Line 1: Soul */}
            <div className="leading-[0.9]">
              <span className="text-white">S</span>
              <span className="text-[#ddf300]">oul</span>
            </div>
            {/* Line 2: Dance */}
            <div className="text-[#ddf300] leading-[0.9]">Dance</div>
            {/* Line 3: Studio */}
            <div className="leading-[0.9]">
              <span className="text-white">S</span>
              <span className="text-[#ddf300]">tudio</span>
            </div>
          </div>

          {showTagline && (
            <span
              className={`font-sans italic font-medium text-neutral-300 ${current.tagline}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Lets grow together
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. STACKED LAYOUT (The Official Logo Artwork Uploaded by User)
  // - Line 1: "Soul" with Circular Emblem sitting at the top-right
  // - Line 2: "Dance"
  // - Line 3: "Studio"
  // - Tagline: "Lets grow together"
  return (
    <div
      id="soul-dance-studio-logo"
      className={`inline-flex flex-col items-start select-none ${className}`}
    >
      {/* Top Line: "Soul" with Emblem Badge sitting adjacent to the right of "oul" */}
      <div className={`flex items-center ${current.gap} relative`}>
        <div
          className={`font-serif font-black tracking-tight leading-none ${current.title}`}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: current.shadow,
          }}
        >
          <span className="text-white">S</span>
          <span className="text-[#ddf300]">oul</span>
        </div>

        {/* The Official Circular Dancer Badge */}
        <div className="shrink-0 -mt-1 sm:-mt-2 hover:rotate-3 transition-transform duration-300">
          <SoulEmblemBadge className={current.emblem} />
        </div>
      </div>

      {/* Second Line: "Dance" */}
      <div
        className={`font-serif font-black tracking-tight leading-none -mt-1 ${current.title}`}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          textShadow: current.shadow,
        }}
      >
        <span className="text-[#ddf300]">Dance</span>
      </div>

      {/* Third Line: "Studio" (White S, Lime tudio) */}
      <div
        className={`font-serif font-black tracking-tight leading-none -mt-1 ${current.title}`}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          textShadow: current.shadow,
        }}
      >
        <span className="text-white">S</span>
        <span className="text-[#ddf300]">tudio</span>
      </div>

      {/* Tagline: "Lets grow together" */}
      {showTagline && (
        <span
          className={`font-sans italic font-medium text-neutral-300 ${current.tagline}`}
          style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
        >
          Lets grow together
        </span>
      )}
    </div>
  );
};
