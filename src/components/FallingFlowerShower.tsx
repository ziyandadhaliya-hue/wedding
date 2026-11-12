import React, { useEffect, useMemo, useState } from 'react';

interface FlowerParticle {
  id: number;
  type: 'rose-crimson' | 'rose-blush' | 'jasmine-mogra' | 'gold-petal';
  leftPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  swayPx: number;
}

export const FallingFlowerShower: React.FC<{
  enabled: boolean;
  burstKey?: number;
}> = ({ enabled, burstKey = 0 }) => {
  const [burstActive, setBurstActive] = useState(false);

  useEffect(() => {
    if (burstKey > 0) {
      setBurstActive(true);
      const timer = window.setTimeout(() => setBurstActive(false), 6500);
      return () => window.clearTimeout(timer);
    }
  }, [burstKey]);

  const particles = useMemo<FlowerParticle[]>(() => {
    const count = burstActive ? 42 : 24;
    const types: FlowerParticle['type'][] = [
      'rose-crimson',
      'jasmine-mogra',
      'gold-petal',
      'rose-blush',
    ];
    return Array.from({ length: count }, (_, idx) => ({
      id: idx,
      type: types[idx % types.length],
      leftPercent: (idx * 97) % 100,
      sizePx: 14 + ((idx * 7) % 14),
      durationSec: 7 + ((idx * 3) % 7),
      delaySec: (idx * 0.42) % 6,
      swayPx: 25 + ((idx * 13) % 45),
    }));
  }, [burstActive]);

  if (!enabled && !burstActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      aria-hidden="true"
      data-testid="falling-flower-shower"
    >
      <style>{`
        @keyframes shahiPetalFall {
          0% {
            transform: translate3d(0, -10vh, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          12% {
            opacity: 0.92;
          }
          50% {
            transform: translate3d(var(--sway-px, 35px), 48vh, 40px) rotateX(180deg) rotateY(140deg) rotateZ(120deg);
            opacity: 0.9;
          }
          88% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(calc(var(--sway-px, 35px) * -0.7), 108vh, 0) rotateX(360deg) rotateY(320deg) rotateZ(280deg);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={`${p.id}-${burstKey}`}
          className="absolute top-0"
          style={
            {
              left: `${p.leftPercent}%`,
              width: `${p.sizePx}px`,
              height: `${p.sizePx}px`,
              '--sway-px': `${p.swayPx}px`,
              animation: `shahiPetalFall ${p.durationSec}s linear ${p.delaySec}s infinite`,
            } as React.CSSProperties
          }
        >
          {p.type === 'rose-crimson' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md">
              <path
                d="M16 2 C8 4, 2 14, 8 24 C12 30, 22 30, 26 22 C30 14, 24 4, 16 2 Z"
                fill="url(#crimsonGrad)"
              />
              <defs>
                <radialGradient id="crimsonGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="60%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#881337" />
                </radialGradient>
              </defs>
            </svg>
          )}
          {p.type === 'rose-blush' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm">
              <path
                d="M16 3 C7 6, 3 15, 9 25 C14 30, 23 28, 26 20 C29 12, 24 5, 16 3 Z"
                fill="#fda4af"
                fillOpacity="0.9"
              />
            </svg>
          )}
          {p.type === 'jasmine-mogra' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow">
              <circle cx="16" cy="8" r="5" fill="#fffef2" />
              <circle cx="24" cy="14" r="5" fill="#fffef2" />
              <circle cx="21" cy="23" r="5" fill="#fffef2" />
              <circle cx="11" cy="23" r="5" fill="#fffef2" />
              <circle cx="8" cy="14" r="5" fill="#fffef2" />
              <circle cx="16" cy="16" r="4" fill="#fde047" />
            </svg>
          )}
          {p.type === 'gold-petal' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow">
              <path
                d="M16 2 C10 8, 6 16, 16 30 C26 16, 22 8, 16 2 Z"
                fill="url(#goldPetalGrad)"
              />
              <defs>
                <linearGradient id="goldPetalGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff3b0" />
                  <stop offset="50%" stopColor="#e5b842" />
                  <stop offset="100%" stopColor="#b47d1c" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
