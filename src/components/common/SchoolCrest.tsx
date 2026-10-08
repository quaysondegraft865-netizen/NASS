import React from 'react';

interface SchoolCrestProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  variant?: 'shield-only' | 'standard' | 'formal';
  className?: string;
}

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  size = 'md',
  showText = false,
  variant = 'standard',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'w-7 h-8',
    sm: 'w-10 h-11',
    md: 'w-13 h-15',
    lg: 'w-18 h-21',
    xl: 'w-26 h-30',
    '2xl': 'w-36 h-42'
  }[size];

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Official Nkroful Agric Senior High School Heraldic Shield & Emblem */}
      <div className={`relative ${sizeClasses} flex-shrink-0 flex items-center justify-center select-none`}>
        <svg
          viewBox="0 0 200 236"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich gold gradient for the heraldic field */}
            <linearGradient id="nassShieldGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fffab8" />
              <stop offset="45%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>

            {/* Inner shield rim highlight */}
            <linearGradient id="nassRimGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
            </linearGradient>

            {/* Official Magenta / Pink motto ribbon gradient */}
            <linearGradient id="nassPinkRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>

            {/* Ribbon fold shadow */}
            <linearGradient id="nassRibbonFold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="100%" stopColor="#500724" />
            </linearGradient>

            {/* Gold flame radiating rays */}
            <radialGradient id="nassFlameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#eab308" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. MAIN HERALDIC SHIELD BODY */}
          {/* Characteristic Ghanaian High School Shield: slight concave top crest, vertical flanks, smooth parabolic point */}
          <path
            d="M 28 26 Q 100 44 172 26 C 176 88 178 136 100 182 C 22 136 24 88 28 26 Z"
            fill="url(#nassShieldGold)"
            stroke="#0b331f"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner heraldic border (forest green) */}
          <path
            d="M 34 32 Q 100 48 166 32 C 170 88 172 131 100 174 C 28 131 30 88 34 32 Z"
            fill="none"
            stroke="#15803d"
            strokeWidth="1.2"
          />

          {/* Inner subtle gold hairline border */}
          <path
            d="M 37 35 Q 100 50 163 35 C 166 87 168 128 100 170 C 32 128 34 87 37 35 Z"
            fill="none"
            stroke="url(#nassRimGold)"
            strokeWidth="1"
          />

          {/* 2. RAYS OF WISDOM / ENLIGHTENMENT AT TOP */}
          <g id="rays-of-light" opacity="0.85">
            <line x1="100" y1="46" x2="100" y2="36" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="88" y1="48" x2="80" y2="40" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="112" y1="48" x2="120" y2="40" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="78" y1="52" x2="68" y2="47" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
            <line x1="122" y1="52" x2="132" y2="47" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* 3. OPEN BOOK OF KNOWLEDGE (Top Center) */}
          <g id="open-book" transform="translate(100, 54)">
            {/* Book spine back cover */}
            <path
              d="M -32 -13 Q -16 -9 0 -5 Q 16 -9 32 -13 L 33 13 Q 16 17 0 21 Q -16 17 -33 13 Z"
              fill="#0f291e"
            />
            {/* Left Page (Crisp White) */}
            <path
              d="M -30 -11 Q -15 -8 -1 -4 L -1 18 Q -15 14 -30 11 Z"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="0.8"
            />
            {/* Right Page (Crisp White) */}
            <path
              d="M 30 -11 Q 15 -8 1 -4 L 1 18 Q 15 14 30 11 Z"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="0.8"
            />
            {/* Center Spine Crease */}
            <line x1="0" y1="-5" x2="0" y2="19" stroke="#0f291e" strokeWidth="1.8" />

            {/* Script lines representing academic study - Left Page */}
            <line x1="-25" y1="-4" x2="-6" y2="-1" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-25" y1="1" x2="-6" y2="4" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-25" y1="6" x2="-6" y2="9" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-25" y1="11" x2="-10" y2="13.5" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />

            {/* Script lines representing academic study - Right Page */}
            <line x1="6" y1="-1" x2="25" y2="-4" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="4" x2="25" y2="1" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="9" x2="25" y2="6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="13.5" x2="20" y2="11" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* 4. TREE OF AGRICULTURE / PALM & COCOA SYMBOL (Center background) */}
          <g id="agricultural-tree" transform="translate(100, 105)">
            {/* Tree trunk */}
            <path d="M -3 20 L -2 0 L 2 0 L 3 20 Z" fill="#78350f" />
            {/* Tree foliage / branches of growth */}
            <circle cx="0" cy="-6" r="11" fill="#15803d" opacity="0.35" />
            <circle cx="-6" cy="-2" r="8" fill="#166534" opacity="0.4" />
            <circle cx="6" cy="-2" r="8" fill="#166534" opacity="0.4" />
          </g>

          {/* 5. GREEN LAUREL WREATH & LEAVES ENCIRCLING CENTER */}
          <g id="laurel-wreath" fill="#15803d" stroke="#0f3d24" strokeWidth="0.6">
            {/* Left Branch stem */}
            <path
              d="M 100 158 C 62 154 45 128 46 94 C 47 78 52 62 60 52"
              fill="none"
              stroke="#15803d"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Left branch leaf pairs */}
            <path d="M 58 54 Q 50 50 54 44 Q 61 49 58 54 Z" />
            <path d="M 52 65 Q 43 62 46 55 Q 54 59 52 65 Z" />
            <path d="M 62 64 Q 69 58 70 65 Q 64 68 62 64 Z" />
            <path d="M 47 79 Q 37 77 39 69 Q 49 72 47 79 Z" />
            <path d="M 59 79 Q 67 75 68 81 Q 61 84 59 79 Z" />
            <path d="M 46 95 Q 35 95 36 87 Q 47 88 46 95 Z" />
            <path d="M 58 96 Q 66 93 67 100 Q 59 101 58 96 Z" />
            <path d="M 48 112 Q 39 114 39 106 Q 49 105 48 112 Z" />
            <path d="M 61 113 Q 69 111 69 118 Q 62 118 61 113 Z" />
            <path d="M 55 128 Q 47 132 45 124 Q 55 121 55 128 Z" />
            <path d="M 68 127 Q 76 127 75 134 Q 68 132 68 127 Z" />
            <path d="M 69 143 Q 63 150 58 142 Q 67 137 69 143 Z" />
            <path d="M 80 141 Q 88 144 85 150 Q 79 146 80 141 Z" />

            {/* Right Branch stem */}
            <path
              d="M 100 158 C 138 154 155 128 154 94 C 153 78 148 62 140 52"
              fill="none"
              stroke="#15803d"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Right branch leaf pairs */}
            <path d="M 142 54 Q 150 50 146 44 Q 139 49 142 54 Z" />
            <path d="M 148 65 Q 157 62 154 55 Q 146 59 148 65 Z" />
            <path d="M 138 64 Q 131 58 130 65 Q 136 68 138 64 Z" />
            <path d="M 153 79 Q 163 77 161 69 Q 151 72 153 79 Z" />
            <path d="M 141 79 Q 133 75 132 81 Q 139 84 141 79 Z" />
            <path d="M 154 95 Q 165 95 164 87 Q 153 88 154 95 Z" />
            <path d="M 142 96 Q 134 93 133 100 Q 141 101 142 96 Z" />
            <path d="M 152 112 Q 161 114 161 106 Q 151 105 152 112 Z" />
            <path d="M 139 113 Q 131 111 131 118 Q 138 118 139 113 Z" />
            <path d="M 145 128 Q 153 132 155 124 Q 145 121 145 128 Z" />
            <path d="M 132 127 Q 124 127 125 134 Q 132 132 132 127 Z" />
            <path d="M 131 143 Q 137 150 142 142 Q 133 137 131 143 Z" />
            <path d="M 120 141 Q 112 144 115 150 Q 121 146 120 141 Z" />

            {/* Crossed base tie */}
            <path d="M 91 155 L 109 162" stroke="#15803d" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M 109 155 L 91 162" stroke="#15803d" strokeWidth="2.8" strokeLinecap="round" />
          </g>

          {/* 6. CROSSED AGRICULTURAL TOOLS (Traditional Cutlass & Adze/Hoe) */}
          <g id="agricultural-tools" transform="translate(100, 114)">
            {/* Tool 1 (Angle -35 deg): Cutlass / Scythe with curved steel blade */}
            <g transform="rotate(-35)">
              {/* Shaft / wooden handle */}
              <rect x="-3.5" y="-35" width="7" height="70" rx="2" fill="#1e293b" stroke="#000" strokeWidth="1" />
              {/* Handle metal grip rings */}
              <rect x="-4" y="22" width="8" height="4.5" fill="#64748b" />
              <rect x="-4" y="28" width="8" height="3" fill="#64748b" />
              {/* Curved steel blade head */}
              <path
                d="M -3.5 -33 Q -16 -40 -27 -29 Q -18 -25 -3.5 -25 Z"
                fill="#0f172a"
                stroke="#000"
                strokeWidth="1.2"
              />
              {/* Blade cutting bevel */}
              <path
                d="M -5 -32 Q -15 -38 -25 -29"
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
              />
            </g>

            {/* Tool 2 (Angle 35 deg): Traditional Ghanaian Adze / Farm Pick / Hoe */}
            <g transform="rotate(35)">
              {/* Shaft / wooden handle */}
              <rect x="-3.5" y="-35" width="7" height="70" rx="2" fill="#1e293b" stroke="#000" strokeWidth="1" />
              {/* Handle metal grip rings */}
              <rect x="-4" y="22" width="8" height="4.5" fill="#64748b" />
              <rect x="-4" y="28" width="8" height="3" fill="#64748b" />
              {/* Heavy forged adze blade head */}
              <path
                d="M -3.5 -31 L -25 -35 L -25 -21 L -3.5 -24 Z"
                fill="#0f172a"
                stroke="#000"
                strokeWidth="1.2"
              />
              {/* Adze blade bevel */}
              <path
                d="M -23 -33 L -23 -23"
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
              />
            </g>

            {/* Center crossing brass rosette / binding rivet */}
            <circle cx="0" cy="0" r="5" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#fef08a" />
          </g>

          {/* 7. OFFICIAL PINK / MAGENTA MOTTO SCROLL BANNER (Beneath the Shield) */}
          <g id="motto-scroll" transform="translate(100, 194)">
            {/* Rear shadow folds */}
            <path d="M -86 -2 L -71 12 L -71 -7 Z" fill="url(#nassRibbonFold)" />
            <path d="M 86 -2 L 71 12 L 71 -7 Z" fill="url(#nassRibbonFold)" />

            {/* Left swallowtail wing with "NASS" */}
            <path
              d="M -97 -10 L -67 -10 L -67 10 L -97 10 L -91 0 Z"
              fill="url(#nassPinkRibbon)"
              stroke="#831843"
              strokeWidth="1.2"
            />
            <text
              x="-83"
              y="3"
              fill="#ffffff"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              NASS
            </text>

            {/* Right swallowtail wing with "EST. 1973" */}
            <path
              d="M 97 -10 L 67 -10 L 67 10 L 97 10 L 91 0 Z"
              fill="url(#nassPinkRibbon)"
              stroke="#831843"
              strokeWidth="1.2"
            />
            <text
              x="83"
              y="3"
              fill="#ffffff"
              fontSize="6"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.6"
            >
              1973
            </text>

            {/* Main Center Curved Banner */}
            <path
              d="M -73 -9 Q 0 9 73 -9 L 71 13 Q 0 31 -71 13 Z"
              fill="url(#nassPinkRibbon)"
              stroke="#831843"
              strokeWidth="1.4"
            />
            {/* Banner top gold trim highlight */}
            <path
              d="M -72 -8 Q 0 10 72 -8"
              fill="none"
              stroke="#fbcfe8"
              strokeWidth="0.8"
              opacity="0.7"
            />

            {/* Motto Text: KNOWLEDGE • INTEGRITY • SERVICE */}
            <text
              x="0"
              y="7.5"
              fill="#ffffff"
              fontWeight="900"
              fontSize="6.8"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.6"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              KNOWLEDGE &bull; INTEGRITY &bull; SERVICE
            </text>
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-serif font-black text-[#0f3d24] tracking-tight text-sm sm:text-base leading-tight">
            NKROFUL AGRIC SENIOR HIGH
          </span>
          <span className="text-[10.5px] text-[#db2777] font-extrabold tracking-wider uppercase mt-0.5">
            Knowledge &bull; Integrity &bull; Service
          </span>
          {variant === 'formal' && (
            <span className="text-[10px] text-slate-500 font-medium tracking-tight">
              Ghana Education Service &bull; Est. 1973 &bull; Western Region
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SchoolCrest;
