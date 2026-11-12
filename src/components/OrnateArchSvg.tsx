import React, { useState } from 'react';
import { ArchStyle, ColorCombo, TexturePattern } from '../types/kankotri';

export const MoroccanLantern: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  goldColor?: string;
  delayed?: boolean;
  chainHeight?: number;
}> = ({
  size = 'md',
  goldColor = '#e5b842',
  delayed = false,
  chainHeight = 48,
}) => {
  const dimensions =
    size === 'sm'
      ? { w: 38, h: 86 }
      : size === 'lg'
      ? { w: 66, h: 145 }
      : { w: 50, h: 112 };

  return (
    <div
      className={`inline-flex flex-col items-center select-none pointer-events-none ${
        delayed ? 'animate-lantern-sway-delayed' : 'animate-lantern-sway'
      }`}
      aria-hidden="true"
    >
      {/* Hanging Chain */}
      <div
        className="w-0.5 opacity-80"
        style={{
          height: `${chainHeight}px`,
          background: `linear-gradient(to bottom, transparent, ${goldColor})`,
        }}
      />
      {/* Ornate Moroccan Brass Fanoos SVG */}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 60 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm Candle Glow Halo */}
        <circle
          cx="30"
          cy="68"
          r="26"
          fill={goldColor}
          fillOpacity="0.22"
          className="animate-candle-glow"
        />
        <circle
          cx="30"
          cy="68"
          r="14"
          fill="#fff5c0"
          fillOpacity="0.45"
          className="animate-candle-glow"
        />
        {/* Top Ring & Dome */}
        <circle
          cx="30"
          cy="8"
          r="5"
          stroke={goldColor}
          strokeWidth="2"
        />
        <path
          d="M30 13 C20 18, 14 26, 12 36 L48 36 C46 26, 40 18, 30 13 Z"
          fill={goldColor}
          fillOpacity="0.85"
          stroke={goldColor}
          strokeWidth="1.5"
        />
        {/* Scalloped Crown Rim */}
        <rect
          x="9"
          y="36"
          width="42"
          height="5"
          rx="2"
          fill={goldColor}
        />
        {/* Lantern Body Lattice */}
        <path
          d="M12 41 L8 68 L16 96 L44 96 L52 68 L48 41 Z"
          fill={goldColor}
          fillOpacity="0.16"
          stroke={goldColor}
          strokeWidth="2"
        />
        {/* Inner Jaali Arch Windows */}
        <path
          d="M20 45 L18 68 L22 92 M40 45 L42 68 L38 92 M30 41 L30 96"
          stroke={goldColor}
          strokeWidth="1.2"
          strokeOpacity="0.85"
        />
        {/* Inner Flame */}
        <path
          d="M30 55 C26 63, 25 69, 30 75 C35 69, 34 63, 30 55 Z"
          fill="#fff9d6"
        />
        {/* Bottom Finial & Tassel */}
        <path
          d="M16 96 L24 108 L36 108 L44 96 Z"
          fill={goldColor}
          fillOpacity="0.9"
        />
        <circle cx="30" cy="114" r="3.5" fill={goldColor} />
        <path
          d="M30 117 L30 128 M27 119 L25 127 M33 119 L35 127"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const ShreeGaneshEmblem: React.FC<{
  goldColor?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ goldColor = '#f0c14b', size = 'md' }) => {
  const dim = size === 'sm' ? 48 : size === 'lg' ? 76 : 60;
  return (
    <div
      className="inline-flex flex-col items-center justify-center select-none pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Outer Sacred Lotus Mandala Halo */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={goldColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle
          cx="50"
          cy="50"
          r="39"
          stroke={goldColor}
          strokeWidth="1.2"
          fill={goldColor}
          fillOpacity="0.1"
        />
        {/* Crown (Mukut) of Lord Ganesha */}
        <path
          d="M50 15 L41 30 L59 30 Z M45 22 L55 22"
          stroke={goldColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={goldColor}
          fillOpacity="0.35"
        />
        <circle cx="50" cy="12" r="2.5" fill={goldColor} />
        {/* Sacred Tilak on Forehead */}
        <path
          d="M46 35 Q50 38 54 35 M50 33 L50 39"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Ganesha Ears (Left & Right) */}
        <path
          d="M40 33 C26 30, 24 48, 38 52"
          stroke={goldColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 33 C74 30, 76 48, 62 52"
          stroke={goldColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Graceful Curved Trunk (Vakratunda) */}
        <path
          d="M46 40 C46 54, 45 66, 54 68 C61 69, 63 62, 58 59 C55 57, 53 61, 56 63"
          stroke={goldColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Modak / Blessing Curve */}
        <circle cx="62" cy="58" r="2.5" fill={goldColor} />
        {/* Sacred Lotus Base Petals */}
        <path
          d="M32 76 Q50 86 68 76 M26 80 Q50 92 74 80"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const VedicKalashSwastikBanner: React.FC<{
  goldColor?: string;
}> = ({ goldColor = '#f0c14b' }) => {
  return (
    <div
      className="flex items-center justify-center gap-4 sm:gap-8 select-none pointer-events-none py-1"
      aria-hidden="true"
    >
      {/* Left Shubh & Swastik */}
      <div className="flex items-center gap-2">
        <span
          className="font-arabic text-xs sm:text-sm tracking-widest font-semibold"
          style={{ color: goldColor }}
        >
          ॥ शुभ ॥
        </span>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4 V28 M4 16 H28 M16 4 H26 M28 16 V26 M16 28 H6 M4 16 V6"
            stroke={goldColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="10" r="1.5" fill={goldColor} />
          <circle cx="22" cy="10" r="1.5" fill={goldColor} />
          <circle cx="10" cy="22" r="1.5" fill={goldColor} />
          <circle cx="22" cy="22" r="1.5" fill={goldColor} />
        </svg>
      </div>

      {/* Center Manglik Purnakumbha Kalash with Coconut & Mango Leaves */}
      <svg width="42" height="46" viewBox="0 0 60 64" fill="none">
        {/* Shriphal (Sacred Coconut) at Top */}
        <path
          d="M30 6 C24 12, 23 20, 30 24 C37 20, 36 12, 30 6 Z"
          fill={goldColor}
          fillOpacity="0.45"
          stroke={goldColor}
          strokeWidth="1.8"
        />
        {/* Five Mango Leaves (Panchapallav) */}
        <path
          d="M26 22 C16 18, 12 24, 18 30 M34 22 C44 18, 48 24, 42 30"
          stroke={goldColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Kalash Neck & Rim */}
        <rect
          x="21"
          y="23"
          width="18"
          height="4"
          rx="2"
          fill={goldColor}
        />
        {/* Kalash Pot Body */}
        <path
          d="M23 27 C13 33, 13 48, 22 54 L38 54 C47 48, 47 33, 37 27 Z"
          fill={goldColor}
          fillOpacity="0.2"
          stroke={goldColor}
          strokeWidth="2"
        />
        {/* Sacred Thread / Swastik on Kalash */}
        <path
          d="M26 40 H34 M30 36 V44"
          stroke={goldColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Kalash Base Pedestal */}
        <path
          d="M19 54 L41 54 L44 59 L16 59 Z"
          fill={goldColor}
        />
      </svg>

      {/* Right Swastik & Labh */}
      <div className="flex items-center gap-2">
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4 V28 M4 16 H28 M16 4 H26 M28 16 V26 M16 28 H6 M4 16 V6"
            stroke={goldColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="10" r="1.5" fill={goldColor} />
          <circle cx="22" cy="10" r="1.5" fill={goldColor} />
          <circle cx="10" cy="22" r="1.5" fill={goldColor} />
          <circle cx="22" cy="22" r="1.5" fill={goldColor} />
        </svg>
        <span
          className="font-arabic text-xs sm:text-sm tracking-widest font-semibold"
          style={{ color: goldColor }}
        >
          ॥ लाभ ॥
        </span>
      </div>
    </div>
  );
};

export const ArchCrownSvg: React.FC<{
  archStyle: ArchStyle;
  goldColor: string;
  accentColor: string;
}> = ({ archStyle, goldColor, accentColor }) => {
  // Renders the top ornate architectural arch header matching the selected ArchStyle
  const getArchPath = () => {
    switch (archStyle) {
      case 'shahi-jharokha':
        return 'M 10 115 L 10 75 Q 25 65 40 50 Q 65 35 95 30 Q 130 18 165 15 Q 185 6 200 2 Q 215 6 235 15 Q 270 18 305 30 Q 335 35 360 50 Q 375 65 390 75 L 390 115';
      case 'mughal-dome':
        return 'M 10 115 L 10 72 C 10 38, 125 22, 200 3 C 275 22, 390 38, 390 72 L 390 115';
      case 'persian-pointed':
        return 'M 10 115 L 10 68 Q 20 22 200 3 Q 380 22 390 68 L 390 115';
      case 'moroccan-horseshoe':
        return 'M 25 115 C 2 85, 10 12, 200 4 C 390 12, 398 85, 375 115';
      case 'royal-octagonal':
        return 'M 10 115 L 10 65 L 75 20 L 200 4 L 325 20 L 390 65 L 390 115';
    }
  };

  return (
    <svg
      viewBox="0 0 400 118"
      className="w-full h-auto block select-none pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Spandrel Corner Filigree Fill */}
      <path
        d={`M 0 0 L 400 0 L 400 118 L 0 118 Z`}
        fill={accentColor}
        fillOpacity="0.28"
      />
      {/* Main Arch Cutout / Interior */}
      <path
        d={`${getArchPath()} Z`}
        fill="currentColor"
        className="opacity-20"
      />
      {/* Double Gold Arch Stroke */}
      <path
        d={getArchPath()}
        fill="none"
        stroke={goldColor}
        strokeWidth="3"
      />
      <path
        d={getArchPath()}
        fill="none"
        stroke={goldColor}
        strokeWidth="1"
        strokeDasharray="4 3"
        transform="translate(0, 6)"
      />
      {/* Corner Floral Medallions */}
      <circle
        cx="36"
        cy="24"
        r="10"
        stroke={goldColor}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="36" cy="24" r="4" fill={goldColor} />
      <circle
        cx="364"
        cy="24"
        r="10"
        stroke={goldColor}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="364" cy="24" r="4" fill={goldColor} />
      {/* Center Kalash / Crescent Finial */}
      <circle cx="200" cy="14" r="4.5" fill={goldColor} />
    </svg>
  );
};

export const IslamicArchFrame: React.FC<{
  archStyle: ArchStyle;
  colors: ColorCombo;
  children: React.ReactNode;
  className?: string;
  showLanterns?: boolean;
}> = ({
  archStyle,
  colors,
  children,
  className = '',
  showLanterns = false,
}) => {
  const radiusClass =
    archStyle === 'moroccan-horseshoe'
      ? 'rounded-t-[120px] rounded-b-2xl'
      : archStyle === 'mughal-dome'
      ? 'rounded-t-[90px] rounded-b-2xl'
      : archStyle === 'royal-octagonal'
      ? 'rounded-2xl'
      : 'rounded-t-[64px] rounded-b-2xl';

  return (
    <div
      className={`relative overflow-hidden border transition-all duration-300 ${radiusClass} ${className}`}
      style={{
        backgroundColor: colors.card,
        borderColor: `${colors.goldFoil}66`,
        boxShadow: `0 20px 60px -15px rgba(0, 0, 0, 0.55), inset 0 0 0 1px ${colors.goldFoil}33`,
        color: colors.text,
      }}
    >
      {/* Top Architectural Arch Crown */}
      <div className="w-full" style={{ color: colors.background }}>
        <ArchCrownSvg
          archStyle={archStyle}
          goldColor={colors.goldFoil}
          accentColor={colors.archAccent}
        />
      </div>

      {/* Optional Hanging Brass Lanterns */}
      {showLanterns && (
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 sm:px-10 pointer-events-none z-10">
          <div className="flex items-start gap-2 sm:gap-5">
            <MoroccanLantern
              size="md"
              goldColor={colors.goldFoil}
              chainHeight={24}
            />
            <div className="hidden sm:block">
              <MoroccanLantern
                size="sm"
                goldColor={colors.goldFoil}
                delayed
                chainHeight={42}
              />
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-5">
            <div className="hidden sm:block">
              <MoroccanLantern
                size="sm"
                goldColor={colors.goldFoil}
                delayed
                chainHeight={42}
              />
            </div>
            <MoroccanLantern
              size="md"
              goldColor={colors.goldFoil}
              chainHeight={24}
            />
          </div>
        </div>
      )}

      {/* Inner Content Container */}
      <div className="relative z-10 px-5 sm:px-10 pb-8 sm:pb-12 -mt-4">
        {children}
      </div>

      {/* Bottom Ornate Filigree Bar */}
      <div
        className="h-2 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.goldFoil}, transparent)`,
        }}
      />
    </div>
  );
};

export const TextureBackgroundOverlay: React.FC<{
  pattern: TexturePattern;
  goldColor: string;
}> = ({ pattern, goldColor }) => {
  const getPatternSvg = () => {
    switch (pattern) {
      case 'jaali-filigree':
        return (
          <pattern
            id="kankotri-bg-pattern"
            x="0"
            y="0"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0 L64 32 L32 64 L0 32 Z M32 12 L52 32 L32 52 L12 32 Z"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.8"
            />
            <circle
              cx="32"
              cy="32"
              r="5"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.8"
            />
          </pattern>
        );
      case 'arabesque-damask':
        return (
          <pattern
            id="kankotri-bg-pattern"
            x="0"
            y="0"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.8"
            />
            <path
              d="M36 0 Q54 36 36 72 Q18 36 36 0 Z M0 36 Q36 54 72 36 Q36 18 0 36 Z"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.7"
            />
          </pattern>
        );
      case 'royal-zardozi':
        return (
          <pattern
            id="kankotri-bg-pattern"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 24 L24 0 L48 24 L24 48 Z"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.9"
              strokeDasharray="3 2"
            />
            <circle cx="24" cy="24" r="3" fill={goldColor} />
          </pattern>
        );
      case 'star-polygon':
        return (
          <pattern
            id="kankotri-bg-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="40,6 49,28 73,28 54,43 61,66 40,52 19,66 26,43 7,28 31,28"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.75"
            />
          </pattern>
        );
      case 'silk-parchment':
        return (
          <pattern
            id="kankotri-bg-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 Q20 16 40 20 M20 0 Q16 20 20 40"
              fill="none"
              stroke={goldColor}
              strokeWidth="0.5"
            />
          </pattern>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.09]"
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>{getPatternSvg()}</defs>
        <rect width="100%" height="100%" fill="url(#kankotri-bg-pattern)" />
      </svg>
    </div>
  );
};

export const RoyalImageWithFallback: React.FC<{
  src: string;
  alt: string;
  fallbackTitle?: string;
  goldColor?: string;
  bgColor?: string;
  className?: string;
}> = ({
  src,
  alt,
  fallbackTitle = 'Shahi Kankotri',
  goldColor = '#e5b842',
  bgColor = '#082e24',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center relative overflow-hidden ${className}`}
        style={{
          background: `radial-gradient(circle at center, ${bgColor}, #04120e)`,
          color: goldColor,
        }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 mb-3 opacity-85"
          fill="none"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke={goldColor}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M30 85 L30 55 Q60 22 90 55 L90 85 Z"
            stroke={goldColor}
            strokeWidth="2"
            fill={goldColor}
            fillOpacity="0.12"
          />
          <circle cx="60" cy="48" r="10" fill={goldColor} fillOpacity="0.4" />
        </svg>
        <span className="font-display text-sm tracking-widest uppercase">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
