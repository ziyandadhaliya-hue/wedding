import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ColorCombo, KankotriState } from '../types/kankotri';
import { getActiveHeroPhotos } from '../utils/kankotriLogic';
import {
  MoroccanLantern,
  RoyalImageWithFallback,
  ShreeGaneshEmblem,
} from './OrnateArchSvg';

interface RoyalCurtainStageProps {
  state: KankotriState;
  colors: ColorCombo;
  onTriggerFlowerBurst: () => void;
}

export const RoyalCurtainStage: React.FC<RoyalCurtainStageProps> = ({
  state,
  colors,
  onTriggerFlowerBurst,
}) => {
  const [stagePhase, setStagePhase] = useState<
    'curtains-closed' | 'curtains-opening' | 'couple-risen'
  >('curtains-closed');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const heroPhotos = getActiveHeroPhotos(state);
  const showGroomCameo =
    state.showGroomHeroPhoto !== false && Boolean(state.groomPhotoUrl?.trim());
  const showBrideCameo =
    state.showBrideHeroPhoto !== false && Boolean(state.bridePhotoUrl?.trim());
  const hasAnyHeroVisual =
    heroPhotos.length > 0 || showGroomCameo || showBrideCameo;

  // Keep slide index within bounds when photos are added or removed
  useEffect(() => {
    if (activeSlideIndex >= heroPhotos.length) {
      setActiveSlideIndex(0);
    }
  }, [heroPhotos.length, activeSlideIndex]);

  // Auto-advance Hero Stage slideshow when multiple Hero photos exist
  useEffect(() => {
    if (heroPhotos.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [heroPhotos.length]);

  const runStageSequence = () => {
    setStagePhase('curtains-closed');
    onTriggerFlowerBurst();
    const t1 = window.setTimeout(() => {
      setStagePhase('curtains-opening');
    }, 120);
    const t2 = window.setTimeout(() => {
      setStagePhase('couple-risen');
    }, 650);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  };

  useEffect(() => {
    const cleanup = runStageSequence();
    return cleanup;
  }, []);

  const curtainsOpen =
    stagePhase === 'curtains-opening' || stagePhase === 'couple-risen';
  const coupleEntered = stagePhase === 'couple-risen';

  const currentHeroPhoto =
    heroPhotos[activeSlideIndex] || heroPhotos[0] || '';

  return (
    <section
      aria-label="Royal Curtain Stage and Couple Entrance"
      data-testid="royal-curtain-stage"
      className="relative min-h-[85vh] w-full overflow-hidden flex flex-col justify-between border-b py-8 sm:py-10 px-4 sm:px-8"
      style={{
        backgroundColor: colors.background,
        borderColor: `${colors.goldFoil}44`,
      }}
    >
      {/* Top Scalloped Royal Velvet Valance (Toran / Pelmet) */}
      <div
        className="absolute top-0 left-0 right-0 z-30 h-9 sm:h-12 pointer-events-none flex overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-full rounded-b-full border-b-2 shadow-lg"
            style={{
              background:
                'linear-gradient(180deg, #4a0714 0%, #7a0c21 65%, #38040e 100%)',
              borderColor: colors.goldFoil,
            }}
          />
        ))}
      </div>

      {/* Hanging Royal Brass Lanterns on Stage */}
      <div className="absolute top-5 left-0 right-0 z-20 flex justify-between px-6 sm:px-20 pointer-events-none">
        <MoroccanLantern size="md" goldColor={colors.goldFoil} chainHeight={24} />
        <MoroccanLantern
          size="md"
          goldColor={colors.goldFoil}
          delayed
          chainHeight={24}
        />
      </div>

      {/* 1. LEFT & RIGHT ROYAL VELVET CURTAINS (Parde Khulte Hai) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Left Crimson & Gold Pleated Velvet Curtain */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[52%] transition-transform duration-700 ease-out border-r-4 shadow-2xl"
          style={{
            borderColor: colors.goldFoil,
            background:
              'repeating-linear-gradient(90deg, #4b0713 0px, #720d20 28px, #3b040d 56px)',
            transform: curtainsOpen
              ? 'translateX(-85%) skewX(-3deg)'
              : 'translateX(0%)',
          }}
        >
          <div
            className="absolute top-0 bottom-0 right-0 w-3 sm:w-4"
            style={{
              background: `linear-gradient(180deg, ${colors.goldFoil}, #fff3b0, ${colors.goldFoil})`,
            }}
          />
        </div>

        {/* Right Crimson & Gold Pleated Velvet Curtain */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[52%] transition-transform duration-700 ease-out border-l-4 shadow-2xl"
          style={{
            borderColor: colors.goldFoil,
            background:
              'repeating-linear-gradient(90deg, #3b040d 0px, #720d20 28px, #4b0713 56px)',
            transform: curtainsOpen
              ? 'translateX(85%) skewX(3deg)'
              : 'translateX(0%)',
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-3 sm:w-4"
            style={{
              background: `linear-gradient(180deg, ${colors.goldFoil}, #fff3b0, ${colors.goldFoil})`,
            }}
          />
        </div>
      </div>

      {/* 2. ILLUMINATED NAME POSTER BEHIND (Peeche Unke Name Ka Poster) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center pt-4 pb-2">
        <div
          className="relative w-full rounded-t-[120px] rounded-b-3xl border-2 px-5 sm:px-12 pt-7 pb-8 sm:pb-10 text-center shadow-2xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 22%, ${colors.archAccent} 0%, ${colors.card} 58%, ${colors.background} 100%)`,
            borderColor: colors.goldFoil,
            boxShadow: `0 0 80px -15px ${colors.goldFoil}55, inset 0 0 30px ${colors.goldFoil}22`,
          }}
          data-testid="illuminated-name-poster"
        >
          {/* Subtle Geometric Golden Arch Lines Inside Poster */}
          <div
            className="absolute inset-3 rounded-t-[110px] rounded-b-2xl border pointer-events-none opacity-35"
            style={{ borderColor: colors.goldFoil }}
          />

          {/* Illuminated Poster Content (Shree Ganesh Vandana + Couple Metallic Gold Typography + Tagline) */}
          <div className="relative z-10">
            <div className="mb-1">
              <ShreeGaneshEmblem goldColor={colors.goldFoil} size="sm" />
            </div>
            <p
              className="font-arabic text-xl sm:text-3xl mb-2 leading-relaxed"
              style={{ color: colors.goldFoil }}
            >
              {state.bismillahArabic}
            </p>
            <p className="font-display text-[11px] sm:text-xs uppercase tracking-[0.35em] opacity-85 mb-1.5">
              Shahi Vivah Mandap • मंगल परिणय
            </p>
            <h2
              className="font-display font-extrabold tracking-wider uppercase gold-foil-text leading-tight"
              style={{ fontSize: 'clamp(1.85rem, 4.8vw, 3.75rem)' }}
            >
              {state.groomName} &amp; {state.brideName}
            </h2>
            <p
              className="font-display text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase mt-1.5 font-semibold"
              style={{ color: colors.goldFoil }}
            >
              {state.heroStageTagline}
            </p>
          </div>

          {/* 3. COUPLE STAGE ENTRANCE IN FRONT (Uske Baad Couple Aate Hai) */}
          {hasAnyHeroVisual && (
            <div
              className={`relative z-20 mt-6 transition-all duration-700 ease-out transform ${
                coupleEntered
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-10 scale-95 opacity-0'
              }`}
              data-testid="couple-stage-entrance"
            >
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
                {/* Groom Cameo Medallion (Left on Desktop) */}
                {showGroomCameo && (
                  <div className="flex flex-col items-center order-2 md:order-1">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 p-1 shadow-xl overflow-hidden"
                      style={{
                        borderColor: colors.goldFoil,
                        backgroundColor: colors.background,
                      }}
                    >
                      <RoyalImageWithFallback
                        src={state.groomPhotoUrl}
                        alt={`Groom ${state.groomName}`}
                        fallbackTitle={state.groomName}
                        goldColor={colors.goldFoil}
                        bgColor={colors.card}
                        className="w-full h-full object-cover object-bottom rounded-full scale-[2.3] origin-[58%_84%]"
                      />
                    </div>
                    <span
                      className="font-display text-xs font-bold uppercase tracking-widest mt-2"
                      style={{ color: colors.goldFoil }}
                    >
                      Chi. {state.groomName}
                    </span>
                    <span className="font-serif-royal text-xs italic opacity-85">
                      चिरंजीवी वर • {state.groomBlessingArabic}
                    </span>
                  </div>
                )}

                {/* Center Grand Couple Stage Portrait / Multi-Photo Carousel */}
                {heroPhotos.length > 0 && (
                  <div className="flex flex-col items-center order-1 md:order-2 w-full max-w-[320px] sm:max-w-[360px]">
                    <div
                      className="relative w-full aspect-[4/4.6] rounded-t-[130px] rounded-b-2xl border-2 p-2 shadow-2xl overflow-hidden group"
                      style={{
                        borderColor: colors.goldFoil,
                        backgroundColor: colors.background,
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px ${colors.goldFoil}45`,
                      }}
                    >
                      <RoyalImageWithFallback
                        src={currentHeroPhoto}
                        alt={`${state.groomName} and ${state.brideName} Royal Stage Portrait ${
                          activeSlideIndex + 1
                        }`}
                        fallbackTitle={`${state.groomName} & ${state.brideName}`}
                        goldColor={colors.goldFoil}
                        bgColor={colors.card}
                        className="w-full h-full object-cover object-bottom rounded-t-[122px] rounded-b-xl transition-all duration-500"
                      />

                      {/* Prev / Next Controls if multiple Hero photos are added */}
                      {heroPhotos.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Previous Hero Photo"
                            onClick={() =>
                              setActiveSlideIndex(
                                (prev) =>
                                  (prev - 1 + heroPhotos.length) %
                                  heroPhotos.length
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/65 border text-white hover:bg-black cursor-pointer"
                            style={{ borderColor: colors.goldFoil }}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next Hero Photo"
                            onClick={() =>
                              setActiveSlideIndex(
                                (prev) => (prev + 1) % heroPhotos.length
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/65 border text-white hover:bg-black cursor-pointer"
                            style={{ borderColor: colors.goldFoil }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Bottom Gradient Scrim with Couple Stage Title */}
                      <div className="absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5 text-center">
                        <p className="font-display text-sm sm:text-base font-bold tracking-widest text-[#fff3b0]">
                          {state.groomName} &amp; {state.brideName}
                        </p>
                        <p className="font-serif-royal text-xs italic text-white/95">
                          शुभ विवाह एवं सप्तपदी • {state.weddingDate}
                        </p>
                        {heroPhotos.length > 1 && (
                          <div className="flex items-center justify-center gap-1.5 mt-1.5">
                            {heroPhotos.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                aria-label={`Go to Hero Photo ${idx + 1}`}
                                onClick={() => setActiveSlideIndex(idx)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  idx === activeSlideIndex
                                    ? 'w-5 bg-[#f0c14b]'
                                    : 'w-1.5 bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bride Cameo Medallion (Right on Desktop) */}
                {showBrideCameo && (
                  <div className="flex flex-col items-center order-3">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 p-1 shadow-xl overflow-hidden"
                      style={{
                        borderColor: colors.goldFoil,
                        backgroundColor: colors.background,
                      }}
                    >
                      <RoyalImageWithFallback
                        src={state.bridePhotoUrl}
                        alt={`Bride ${state.brideName}`}
                        fallbackTitle={state.brideName}
                        goldColor={colors.goldFoil}
                        bgColor={colors.card}
                        className="w-full h-full object-cover object-bottom rounded-full scale-[2.3] origin-[42%_85%]"
                      />
                    </div>
                    <span
                      className="font-display text-xs font-bold uppercase tracking-widest mt-2"
                      style={{ color: colors.goldFoil }}
                    >
                      Sow. {state.brideName}
                    </span>
                    <span className="font-serif-royal text-xs italic opacity-85">
                      आयुष्मती वधू • {state.brideBlessingArabic}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage Controls: Replay Parda & Couple Animation + Read Wedding Kankotri */}
          <div className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#invitation"
              className="px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:scale-105 whitespace-nowrap"
              style={{
                background:
                  'linear-gradient(135deg, #fff3b0 0%, #e5b842 50%, #c59227 100%)',
                color: '#1a1105',
              }}
            >
              Read Wedding Kankotri
            </a>
            <button
              type="button"
              onClick={runStageSequence}
              className="px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-semibold uppercase tracking-wider border transition-colors hover:bg-white/10 cursor-pointer whitespace-nowrap"
              style={{
                borderColor: colors.goldFoil,
                color: colors.goldFoil,
              }}
            >
              Replay Parda &amp; Couple Animation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
