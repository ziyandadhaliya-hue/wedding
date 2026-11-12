import React, { useState } from 'react';
import { ColorCombo, KankotriState } from '../types/kankotri';
import { getMonogram } from '../utils/kankotriLogic';
import { MoroccanLantern, ShreeGaneshEmblem } from './OrnateArchSvg';

interface RoyalEnvelopeCoverProps {
  state: KankotriState;
  colors: ColorCombo;
  onOpenComplete: (scrollToInvitation?: boolean) => void;
}

export const RoyalEnvelopeCover: React.FC<RoyalEnvelopeCoverProps> = ({
  state,
  colors,
  onOpenComplete,
}) => {
  const [stage, setStage] = useState<'idle' | 'unlocking' | 'opening-doors'>('idle');
  const monogram = getMonogram(state.groomName, state.brideName);

  const triggerOpen = (scrollToInvitation = false) => {
    if (stage !== 'idle') return;
    setStage('unlocking');
    window.setTimeout(() => {
      setStage('opening-doors');
    }, 550);
    window.setTimeout(() => {
      onOpenComplete(scrollToInvitation);
    }, 1900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden select-none perspective-2000"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
      data-testid="royal-envelope-cover"
    >
      {/* Top Ornate Welcome Invitation Ribbon */}
      <div
        className="relative z-30 w-full border-b px-3 py-2 text-center transition-colors"
        style={{
          backgroundColor: `${colors.card}f2`,
          borderColor: `${colors.goldFoil}55`,
        }}
      >
        <button
          type="button"
          onClick={() => triggerOpen(true)}
          className="font-serif-royal text-xs sm:text-sm md:text-base tracking-wide hover:underline focus:outline-none cursor-pointer"
          style={{ color: colors.goldFoil }}
        >
          {state.topWelcomeRibbonText}
        </button>
      </div>

      {/* Hanging Royal Brass Diyas / Lanterns */}
      <div className="absolute top-9 left-0 right-0 z-20 flex justify-between px-4 sm:px-14 pointer-events-none">
        <div className="flex items-start gap-3 sm:gap-8">
          <MoroccanLantern size="lg" goldColor={colors.goldFoil} chainHeight={20} />
          <div className="hidden md:block">
            <MoroccanLantern
              size="md"
              goldColor={colors.goldFoil}
              delayed
              chainHeight={45}
            />
          </div>
        </div>
        <div className="flex items-start gap-3 sm:gap-8">
          <div className="hidden md:block">
            <MoroccanLantern
              size="md"
              goldColor={colors.goldFoil}
              delayed
              chainHeight={45}
            />
          </div>
          <MoroccanLantern size="lg" goldColor={colors.goldFoil} chainHeight={20} />
        </div>
      </div>

      {/* 3D Left & Right Royal Palace Doors */}
      <div className="absolute inset-0 z-10 flex pointer-events-none preserve-3d">
        {/* Left Palace Arch Door */}
        <div
          className="w-1/2 h-full relative overflow-hidden border-r transition-transform duration-1000 ease-in-out origin-left"
          style={{
            borderColor: colors.goldFoil,
            backgroundColor: colors.card,
            transform:
              stage === 'opening-doors'
                ? 'rotateY(-105deg) translateZ(20px)'
                : 'rotateY(0deg)',
          }}
        >
          {(state.coverDoorPhotoUrl ??
            '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg') && (
            <img
              src={
                state.coverDoorPhotoUrl ??
                '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg'
              }
              alt=""
              referrerPolicy="no-referrer"
              className="w-[200%] max-w-none h-full object-cover object-left opacity-35"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colors.background}e0 0%, ${colors.card}b8 60%, ${colors.archAccent}99 100%)`,
            }}
          />
          {/* Carved Jharokha Filigree Frame on Left Door */}
          <div
            className="absolute inset-4 sm:inset-8 border rounded-tl-[80px] opacity-45"
            style={{ borderColor: colors.goldFoil }}
          />
        </div>

        {/* Right Palace Arch Door */}
        <div
          className="w-1/2 h-full relative overflow-hidden border-l transition-transform duration-1000 ease-in-out origin-right"
          style={{
            borderColor: colors.goldFoil,
            backgroundColor: colors.card,
            transform:
              stage === 'opening-doors'
                ? 'rotateY(105deg) translateZ(20px)'
                : 'rotateY(0deg)',
          }}
        >
          {(state.coverDoorPhotoUrl ??
            '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg') && (
            <img
              src={
                state.coverDoorPhotoUrl ??
                '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg'
              }
              alt=""
              referrerPolicy="no-referrer"
              className="w-[200%] max-w-none h-full object-cover object-right opacity-35 -ml-[100%]"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(225deg, ${colors.background}e0 0%, ${colors.card}b8 60%, ${colors.archAccent}99 100%)`,
            }}
          />
          {/* Carved Jharokha Filigree Frame on Right Door */}
          <div
            className="absolute inset-4 sm:inset-8 border rounded-tr-[80px] opacity-45"
            style={{ borderColor: colors.goldFoil }}
          />
        </div>
      </div>

      {/* Center Stage: Shree GaneshVandana, Couple Names, & Clickable 3D Golden Envelope */}
      <div
        className={`relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-4 transition-all duration-700 ${
          stage === 'opening-doors' ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Sacred Golden Lord Ganesha Emblem */}
        <div className="mb-1">
          <ShreeGaneshEmblem goldColor={colors.goldFoil} size="md" />
        </div>

        {/* Shree Ganeshaya Namah Mantra */}
        <p
          className="font-arabic text-xl sm:text-3xl md:text-4xl mb-1.5 leading-relaxed tracking-wide drop-shadow"
          style={{ color: colors.goldFoil }}
        >
          {state.bismillahArabic}
        </p>
        <p className="font-serif-royal italic text-xs sm:text-sm opacity-90 mb-4 text-center max-w-lg">
          {state.bismillahTranslation}
        </p>

        {/* Couple Names & Date Header */}
        <div className="text-center mb-4">
          <p
            className="font-display text-[11px] sm:text-xs uppercase tracking-[0.3em] mb-1"
            style={{ color: colors.goldFoil }}
          >
            Shahi Vivah Kankotri &amp; Lagna Patrika
          </p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider gold-foil-text">
            {state.groomName} <span className="font-serif-royal italic font-normal">&amp;</span>{' '}
            {state.brideName}
          </h1>
          <p className="font-serif-royal text-sm sm:text-lg mt-1 tracking-widest uppercase opacity-90">
            {state.weddingDate} • शुभ विवाह
          </p>
        </div>

        {/* Clickable 3D Royal Golden Envelope with Wax Seal */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open Royal Wedding Invitation of ${state.groomName} and ${state.brideName}`}
          onClick={() => triggerOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerOpen(false);
            }
          }}
          className="group relative w-full max-w-[340px] sm:max-w-[420px] h-[210px] sm:h-[245px] cursor-pointer perspective-1200 focus:outline-none"
        >
          {/* Outer Ambient Golden Glow */}
          <div
            className="absolute -inset-3 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500"
            style={{ backgroundColor: colors.goldFoil }}
          />

          {/* Envelope Body */}
          <div
            className="relative w-full h-full rounded-2xl border-2 overflow-hidden shadow-2xl preserve-3d transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              background: `linear-gradient(145deg, ${colors.card} 0%, ${colors.archAccent} 55%, ${colors.background} 100%)`,
              borderColor: colors.goldFoil,
            }}
          >
            {/* Inner Rising Kankotri Card (Reveals when seal unlocks) */}
            <div
              className={`absolute left-5 right-5 top-4 bottom-4 rounded-xl border p-4 text-center flex flex-col items-center justify-center transition-all duration-700 ${
                stage !== 'idle'
                  ? '-translate-y-10 scale-105 opacity-100 shadow-2xl'
                  : 'translate-y-3 opacity-85'
              }`}
              style={{
                background: `linear-gradient(180deg, #fffdf7 0%, #f5e6c8 100%)`,
                borderColor: colors.goldFoil,
                color: '#2c1e12',
              }}
            >
              <span className="font-arabic text-base text-[#9c681c]">
                {state.bismillahArabic}
              </span>
              <span className="font-display text-sm sm:text-base font-bold tracking-widest mt-1 text-[#2c1e12]">
                {state.groomName.toUpperCase()} &amp; {state.brideName.toUpperCase()}
              </span>
              <span className="font-serif-royal text-xs italic text-[#5c4022] mt-0.5">
                {state.weddingDate} • शुभ विवाह
              </span>
            </div>

            {/* Bottom & Side Envelope Pocket Folds */}
            <svg
              viewBox="0 0 400 240"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 200,130 0,240"
                fill={colors.card}
                stroke={colors.goldFoil}
                strokeWidth="1.5"
              />
              <polygon
                points="400,0 200,130 400,240"
                fill={colors.card}
                stroke={colors.goldFoil}
                strokeWidth="1.5"
              />
              <polygon
                points="0,240 200,115 400,240"
                fill={colors.archAccent}
                stroke={colors.goldFoil}
                strokeWidth="2"
              />
            </svg>

            {/* Top 3D Envelope Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-[58%] origin-top transition-transform duration-700 pointer-events-none"
              style={{
                transform:
                  stage !== 'idle' ? 'rotateX(165deg)' : 'rotateX(0deg)',
                zIndex: stage !== 'idle' ? 5 : 20,
              }}
            >
              <svg
                viewBox="0 0 400 140"
                className="w-full h-full drop-shadow-lg"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,0 400,0 200,134"
                  fill={colors.goldFoil}
                  fillOpacity="0.92"
                  stroke="#fff3b0"
                  strokeWidth="2"
                />
                <polygon
                  points="16,4 384,4 200,122"
                  fill="none"
                  stroke={colors.background}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>

            {/* Royal Wax Seal Medallion in Center */}
            <div
              className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 shadow-2xl transition-all duration-500 ${
                stage !== 'idle'
                  ? 'scale-125 rotate-45 opacity-0'
                  : 'group-hover:scale-105'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #fff3b0 0%, #e5b842 45%, #9e6b14 90%)',
                borderColor: '#fff9d2',
                boxShadow: '0 8px 25px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.6)',
              }}
            >
              <div className="w-[84%] h-[84%] rounded-full border border-[#5a3a05]/40 flex flex-col items-center justify-center text-[#2b1803]">
                <span className="font-display text-[9px] tracking-[0.2em] uppercase font-semibold">
                  Shubh
                </span>
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight leading-none">
                  {monogram}
                </span>
                <span className="font-serif-royal text-[9px] italic">Vivah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary "Open Invitation" CTA Button */}
        <div className="mt-5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => triggerOpen(false)}
            className="px-7 py-3 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            style={{
              background:
                'linear-gradient(135deg, #fff3b0 0%, #e5b842 50%, #c59227 100%)',
              color: '#1a1105',
              boxShadow: `0 10px 30px -5px ${colors.goldFoil}80`,
            }}
          >
            {stage === 'idle' ? '✦ Open Invitation ✦' : 'Opening Shahi Kankotri...'}
          </button>
          <p className="font-serif-royal text-xs sm:text-sm opacity-75 mt-1.5">
            Tap the 3D Royal Envelope or button to unlock with music &amp; flower shower
          </p>
        </div>
      </div>

      {/* Bottom Ornamental Border Line */}
      <div
        className="relative z-20 h-2 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.goldFoil}, transparent)`,
        }}
      />
    </div>
  );
};
