import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  Lock,
  MapPin,
  Maximize2,
  Navigation,
  X,
} from 'lucide-react';
import {
  ColorCombo,
  GalleryPhoto,
  KankotriState,
} from '../types/kankotri';
import {
  calculateCountdown,
  getVisibleEventFields,
} from '../utils/kankotriLogic';
import {
  IslamicArchFrame,
  MoroccanLantern,
  RoyalImageWithFallback,
  ShreeGaneshEmblem,
  VedicKalashSwastikBanner,
} from './OrnateArchSvg';

interface KankotriSectionsProps {
  state: KankotriState;
  colors: ColorCombo;
  onOpenAdminModal: () => void;
}

export const KankotriSections: React.FC<KankotriSectionsProps> = ({
  state,
  colors,
  onOpenAdminModal,
}) => {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(state.weddingDate, state.weddingIsoDate)
  );
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    setCountdown(calculateCountdown(state.weddingDate, state.weddingIsoDate));
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(state.weddingDate, state.weddingIsoDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [state.weddingDate, state.weddingIsoDate]);

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 py-14 sm:py-20">
      {/* =====================================================================
          SECTION 1: MAIN WEDDING INVITATION FRAME (#invitation)
          + SECTION 2: LIVE REAL-TIME COUNTDOWN
      ===================================================================== */}
      <section id="invitation" className="scroll-mt-24">
        <IslamicArchFrame
          archStyle={state.archStyle}
          colors={colors}
          showLanterns
          className="max-w-4xl mx-auto text-center"
        >
          <div className="pt-4 sm:pt-8 space-y-6">
            {/* Sacred Lord Ganesha Emblem + Sanskrit Shloka + Manglik Kalash & Swastik */}
            <div className="flex flex-col items-center">
              <ShreeGaneshEmblem goldColor={colors.goldFoil} size="lg" />
              <p
                className="font-arabic text-2xl sm:text-4xl leading-relaxed mt-2"
                style={{ color: colors.goldFoil }}
              >
                {state.bismillahArabic}
              </p>
              <p className="font-serif-royal italic text-sm sm:text-base opacity-90 mt-1 max-w-xl mx-auto">
                {state.bismillahTranslation}
              </p>
              <div className="mt-2">
                <VedicKalashSwastikBanner goldColor={colors.goldFoil} />
              </div>
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-px w-16 sm:w-28 opacity-50"
                style={{ backgroundColor: colors.goldFoil }}
              />
              <span style={{ color: colors.goldFoil }}>✦  शुभ विवाह ✦</span>
              <span
                className="h-px w-16 sm:w-28 opacity-50"
                style={{ backgroundColor: colors.goldFoil }}
              />
            </div>

            {/* Kankotri Heading & Ganesh/Kuldevi Blessing Intro */}
            <div className="max-w-2xl mx-auto space-y-3">
              <h2
                className="font-display text-sm sm:text-lg tracking-[0.25em] uppercase font-bold"
                style={{ color: colors.goldFoil }}
              >
                {state.kankotriHeading}
              </h2>
              <p className="font-serif-royal text-base sm:text-xl leading-relaxed opacity-95">
                {state.allahBlessingIntro}
              </p>
            </div>

            {/* Groom Name + Groom Parents Line */}
            <div className="py-2 space-y-1">
              <p
                className="font-arabic text-sm sm:text-base"
                style={{ color: colors.goldFoil }}
              >
                चिरंजीवी (Chi.)
              </p>
              <h3
                className="font-display font-bold tracking-wider gold-foil-text"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
              >
                {state.groomName}
              </h3>
              <p className="font-serif-royal text-base sm:text-lg opacity-90 max-w-xl mx-auto">
                {state.groomParentsLine}
              </p>
            </div>

            {/* Ornate Shubh Sangam Divider */}
            <div className="flex items-center justify-center gap-4">
              <span
                className="h-px w-12 opacity-40"
                style={{ backgroundColor: colors.goldFoil }}
              />
              <span
                className="font-serif-royal italic text-2xl sm:text-3xl px-2"
                style={{ color: colors.goldFoil }}
              >
                संग (Weds)
              </span>
              <span
                className="h-px w-12 opacity-40"
                style={{ backgroundColor: colors.goldFoil }}
              />
            </div>

            {/* Bride Name + Bride Parents Line */}
            <div className="py-2 space-y-1">
              <p
                className="font-arabic text-sm sm:text-base"
                style={{ color: colors.goldFoil }}
              >
                आयुष्मती कुमारी (Chi. Sow.)
              </p>
              <h3
                className="font-display font-bold tracking-wider gold-foil-text"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
              >
                {state.brideName}
              </h3>
              <p className="font-serif-royal text-base sm:text-lg opacity-90 max-w-xl mx-auto">
                {state.brideParentsLine}
              </p>
            </div>

            {/* Wedding Date Banner */}
            <div
              className="inline-block rounded-xl border px-6 sm:px-10 py-3.5 my-2 shadow-lg"
              style={{
                backgroundColor: `${colors.archAccent}99`,
                borderColor: colors.goldFoil,
              }}
            >
              <p className="font-display text-xs uppercase tracking-[0.25em] opacity-80 mb-1">
                शुभ लग्न मुहूर्त • Auspicious Date of Vivah
              </p>
              <p
                className="font-display text-lg sm:text-2xl font-bold tracking-widest uppercase"
                style={{ color: colors.goldFoil }}
              >
                {state.weddingDate}
              </p>
            </div>

            {/* Warm Presence Note */}
            <p className="font-serif-royal italic text-base sm:text-lg max-w-xl mx-auto opacity-90">
              “{state.warmPresenceNote}”
            </p>

            {/* LIVE REAL-TIME COUNTDOWN */}
            <div
              className="pt-6 border-t mt-6"
              style={{ borderColor: `${colors.goldFoil}33` }}
              data-testid="live-countdown"
            >
              <p
                className="font-display text-xs uppercase tracking-[0.25em] mb-4"
                style={{ color: colors.goldFoil }}
              >
                Counting Down to the Shubh Vivah Muhurat
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-xl border p-3.5 sm:p-4 flex flex-col items-center justify-center shadow-md"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: `${colors.goldFoil}80`,
                    }}
                  >
                    <span
                      className="font-display text-2xl sm:text-4xl font-bold tabular-nums"
                      style={{ color: colors.goldFoil }}
                    >
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="font-sans-clean text-xs uppercase tracking-widest opacity-80 mt-1">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </IslamicArchFrame>
      </section>

      {/* =====================================================================
          SECTION 3: COUPLE INTRODUCTION (#couple)
      ===================================================================== */}
      <section id="couple" className="scroll-mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="font-arabic text-xl sm:text-2xl mb-1"
            style={{ color: colors.goldFoil }}
          >
            ॥ वर एवं वधू परिचय ॥
          </p>
          <h2
            className="font-display font-bold tracking-wider uppercase gold-foil-text"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            The Blessed Couple (वर-वधू)
          </h2>
          <p className="font-serif-royal text-base sm:text-lg opacity-85 mt-1">
            Two souls uniting in the sacred bond of Saptapadi (सात फेरे), love, and sanskar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom Arch Card */}
          <IslamicArchFrame
            archStyle={state.archStyle}
            colors={colors}
            className="flex flex-col justify-between text-center"
          >
            <div className="space-y-4 pt-2">
              <p
                className="font-arabic text-xl sm:text-2xl"
                style={{ color: colors.goldFoil }}
              >
                {state.groomBlessingArabic}
              </p>
              {state.groomPhotoUrl?.trim() && (
                <div
                  className="w-44 h-56 sm:w-52 sm:h-64 mx-auto rounded-t-full rounded-b-2xl border-2 p-1.5 overflow-hidden shadow-xl"
                  style={{
                    borderColor: colors.goldFoil,
                    backgroundColor: colors.background,
                  }}
                >
                  <RoyalImageWithFallback
                    src={state.groomPhotoUrl}
                    alt={`The Groom ${state.groomName}`}
                    fallbackTitle={state.groomName}
                    goldColor={colors.goldFoil}
                    bgColor={colors.card}
                    className="w-full h-full object-cover object-bottom rounded-t-full rounded-b-xl scale-[1.85] origin-[58%_88%]"
                  />
                </div>
              )}
              <div>
                <p
                  className="font-display text-xs uppercase tracking-[0.22em] opacity-85"
                  style={{ color: colors.goldFoil }}
                >
                  {state.groomTitle}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 gold-foil-text">
                  Chi. {state.groomName}
                </h3>
              </div>
              <p className="font-serif-royal text-base sm:text-lg font-medium opacity-95 px-2">
                {state.groomParentsLine}
              </p>
              <p className="font-serif-royal italic text-sm sm:text-base opacity-80 leading-relaxed px-2">
                {state.groomBio}
              </p>
            </div>
          </IslamicArchFrame>

          {/* Bride Arch Card */}
          <IslamicArchFrame
            archStyle={state.archStyle}
            colors={colors}
            className="flex flex-col justify-between text-center"
          >
            <div className="space-y-4 pt-2">
              <p
                className="font-arabic text-xl sm:text-2xl"
                style={{ color: colors.goldFoil }}
              >
                {state.brideBlessingArabic}
              </p>
              {state.bridePhotoUrl?.trim() && (
                <div
                  className="w-44 h-56 sm:w-52 sm:h-64 mx-auto rounded-t-full rounded-b-2xl border-2 p-1.5 overflow-hidden shadow-xl"
                  style={{
                    borderColor: colors.goldFoil,
                    backgroundColor: colors.background,
                  }}
                >
                  <RoyalImageWithFallback
                    src={state.bridePhotoUrl}
                    alt={`The Bride ${state.brideName}`}
                    fallbackTitle={state.brideName}
                    goldColor={colors.goldFoil}
                    bgColor={colors.card}
                    className="w-full h-full object-cover object-bottom rounded-t-full rounded-b-xl scale-[1.85] origin-[42%_88%]"
                  />
                </div>
              )}
              <div>
                <p
                  className="font-display text-xs uppercase tracking-[0.22em] opacity-85"
                  style={{ color: colors.goldFoil }}
                >
                  {state.brideTitle}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 gold-foil-text">
                  Chi. Sow. {state.brideName}
                </h3>
              </div>
              <p className="font-serif-royal text-base sm:text-lg font-medium opacity-95 px-2">
                {state.brideParentsLine}
              </p>
              <p className="font-serif-royal italic text-sm sm:text-base opacity-80 leading-relaxed px-2">
                {state.brideBio}
              </p>
            </div>
          </IslamicArchFrame>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: BOTH SIDES' FAMILY MEMBERS SECTION (#families)
      ===================================================================== */}
      <section id="families" className="scroll-mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="font-arabic text-xl sm:text-2xl mb-1"
            style={{ color: colors.goldFoil }}
          >
            ॥ वर पक्ष एवं वधू पक्ष परिवार ॥
          </p>
          <h2
            className="font-display font-bold tracking-wider uppercase gold-foil-text"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            Our Esteemed Families
          </h2>
          <p className="font-serif-royal text-base sm:text-lg opacity-85 mt-1">
            Pillars of wisdom, sanskar, and blessings uniting in joyous celebration
          </p>
        </div>

        {/* Twin Royal Arch Scrolls for Groom's Family (Var Paksha) & Bride's Family (Vadhu Paksha) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Groom's Family (Var Paksha / लड़के वाले) */}
          <IslamicArchFrame
            archStyle={state.archStyle}
            colors={colors}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 pt-2">
              <div
                className="text-center border-b pb-4"
                style={{ borderColor: `${colors.goldFoil}40` }}
              >
                <p
                  className="font-display text-xs uppercase tracking-[0.25em]"
                  style={{ color: colors.goldFoil }}
                >
                  वर पक्ष • Dulha Side
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold mt-1">
                  Groom’s Family ({state.groomName})
                </h3>
              </div>

              <div className="space-y-4">
                {state.groomFamily.map((member) => (
                  <div
                    key={member.id}
                    className="border-b pb-3 last:border-b-0"
                    style={{ borderColor: `${colors.goldFoil}22` }}
                  >
                    <p
                      className="font-display text-xs uppercase tracking-widest font-semibold"
                      style={{ color: colors.goldFoil }}
                    >
                      {member.category}
                    </p>
                    <p className="font-serif-royal text-base sm:text-lg mt-0.5 opacity-95">
                      {member.names}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </IslamicArchFrame>

          {/* Bride's Family (Vadhu Paksha / लड़की वाले) */}
          <IslamicArchFrame
            archStyle={state.archStyle}
            colors={colors}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 pt-2">
              <div
                className="text-center border-b pb-4"
                style={{ borderColor: `${colors.goldFoil}40` }}
              >
                <p
                  className="font-display text-xs uppercase tracking-[0.25em]"
                  style={{ color: colors.goldFoil }}
                >
                  वधू पक्ष • Dulhan Side
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold mt-1">
                  Bride’s Family ({state.brideName})
                </h3>
              </div>

              <div className="space-y-4">
                {state.brideFamily.map((member) => (
                  <div
                    key={member.id}
                    className="border-b pb-3 last:border-b-0"
                    style={{ borderColor: `${colors.goldFoil}22` }}
                  >
                    <p
                      className="font-display text-xs uppercase tracking-widest font-semibold"
                      style={{ color: colors.goldFoil }}
                    >
                      {member.category}
                    </p>
                    <p className="font-serif-royal text-base sm:text-lg mt-0.5 opacity-95">
                      {member.names}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </IslamicArchFrame>
        </div>

        {/* Bottom Royal Banner: "Darshanabhilashi / With Best Compliments From" & "Bal Manuhar / Little Hearts" */}
        <div
          className="rounded-2xl border p-6 sm:p-8 text-center grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl"
          style={{
            backgroundColor: colors.card,
            borderColor: `${colors.goldFoil}66`,
          }}
        >
          <div className="space-y-1.5">
            <h4
              className="font-display text-xs sm:text-sm uppercase tracking-[0.22em] font-bold"
              style={{ color: colors.goldFoil }}
            >
              ✦ दर्शनाभिलाषी • With Best Compliments From ✦
            </h4>
            <p className="font-serif-royal text-base sm:text-lg opacity-95">
              {state.bestComplimentsFrom}
            </p>
          </div>

          <div
            className="space-y-1.5 md:border-l md:pl-6"
            style={{ borderColor: `${colors.goldFoil}33` }}
          >
            <h4
              className="font-display text-xs sm:text-sm uppercase tracking-[0.22em] font-bold"
              style={{ color: colors.goldFoil }}
            >
              ✦ बाल मनुहार • Little Hearts Awaiting Your Presence ✦
            </h4>
            <p className="font-serif-royal italic text-base sm:text-lg opacity-95">
              {state.littleHeartsText}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: MANGLIK VIVAH CEREMONIES (#events)
      ===================================================================== */}
      <section id="events" className="scroll-mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="font-arabic text-xl sm:text-2xl mb-1"
            style={{ color: colors.goldFoil }}
          >
            ॥ मांगलिक वैवाहिक कार्यक्रम ॥
          </p>
          <h2
            className="font-display font-bold tracking-wider uppercase gold-foil-text"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            Manglik Vivah Ceremonies
          </h2>
          <p className="font-serif-royal text-base sm:text-lg opacity-85 mt-1">
            Auspicious Vedic celebrations of Haldi, Mehendi, Sangeet, Shubh Vivah Pheras &amp; Aashirwad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {state.events.map((ev, index) => {
            const visible = getVisibleEventFields(ev);
            return (
              <IslamicArchFrame
                key={ev.id}
                archStyle={state.archStyle}
                colors={colors}
                className="flex flex-col justify-between"
              >
                <div className="space-y-4 pt-1">
                  {/* Event Number & Hindi/Sanskrit Title */}
                  <div
                    className="flex flex-wrap items-center justify-between gap-2 border-b pb-3"
                    style={{ borderColor: `${colors.goldFoil}33` }}
                  >
                    <span
                      className="font-display text-xs uppercase tracking-widest font-bold"
                      style={{ color: colors.goldFoil }}
                    >
                      {String(index + 1).padStart(2, '0')}. शुभ संस्कार
                    </span>
                    <span
                      className="font-arabic text-sm sm:text-base"
                      style={{ color: colors.goldFoil }}
                    >
                      {ev.arabicTitle}
                    </span>
                  </div>

                  {/* Event Title & Blessing */}
                  <div>
                    <h3
                      className="font-display text-xl sm:text-2xl font-bold tracking-wide"
                      style={{ color: colors.goldFoil }}
                    >
                      {ev.title}
                    </h3>
                    {ev.blessing && (
                      <p className="font-serif-royal italic text-sm sm:text-base opacity-85 mt-1">
                        “{ev.blessing}”
                      </p>
                    )}
                  </div>

                  {/* Automatically hides any blank Date, Time, Venue, or Address fields */}
                  <div className="space-y-2.5 pt-2 text-sm">
                    {visible.showDate && (
                      <div className="flex items-start gap-2.5">
                        <Calendar
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: colors.goldFoil }}
                        />
                        <span>{ev.date}</span>
                      </div>
                    )}
                    {visible.showTime && (
                      <div className="flex items-start gap-2.5">
                        <Clock
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: colors.goldFoil }}
                        />
                        <span>{ev.time}</span>
                      </div>
                    )}
                    {visible.showVenue && (
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: colors.goldFoil }}
                        />
                        <span className="font-semibold">{ev.venue}</span>
                      </div>
                    )}
                    {visible.showAddress && (
                      <p className="pl-6 text-xs opacity-80 leading-relaxed">
                        {ev.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Google Maps Directions Button */}
                {visible.showMapLink && (
                  <div
                    className="pt-5 mt-5 border-t"
                    style={{ borderColor: `${colors.goldFoil}26` }}
                  >
                    <a
                      href={ev.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-white/10 whitespace-nowrap"
                      style={{
                        borderColor: colors.goldFoil,
                        color: colors.goldFoil,
                      }}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps Directions</span>
                    </a>
                  </div>
                )}
              </IslamicArchFrame>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: WEDDING VENUE & GOOGLE MAPS (#venue)
      ===================================================================== */}
      <section id="venue" className="scroll-mt-24">
        <IslamicArchFrame
          archStyle={state.archStyle}
          colors={colors}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="space-y-5 pt-2">
            <p
              className="font-arabic text-xl sm:text-2xl"
              style={{ color: colors.goldFoil }}
            >
              ॥ शुभ विवाह स्थल ॥
            </p>
            <h2
              className="font-display font-bold tracking-wider uppercase gold-foil-text"
              style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)' }}
            >
              Primary Wedding Venue
            </h2>

            <div className="max-w-xl mx-auto space-y-2">
              <h3
                className="font-display text-xl sm:text-2xl font-bold"
                style={{ color: colors.goldFoil }}
              >
                {state.primaryVenueName}
              </h3>
              <p className="font-serif-royal text-base sm:text-lg opacity-90">
                {state.primaryVenueAddress}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={state.primaryVenueMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 whitespace-nowrap"
                style={{
                  background:
                    'linear-gradient(135deg, #fff3b0 0%, #e5b842 50%, #c59227 100%)',
                  color: '#1a1105',
                }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={() => setShowInteractiveMap((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display text-xs sm:text-sm font-semibold uppercase tracking-wider border transition-colors hover:bg-white/10 cursor-pointer whitespace-nowrap"
                style={{
                  borderColor: colors.goldFoil,
                  color: colors.goldFoil,
                }}
              >
                <MapPin className="w-4 h-4" />
                <span>
                  {showInteractiveMap
                    ? 'Hide Interactive Map'
                    : 'Show Interactive Google Map'}
                </span>
              </button>
            </div>

            {showInteractiveMap && (
              <div
                className="mt-6 rounded-2xl overflow-hidden border-2 h-72 sm:h-96 shadow-inner"
                style={{ borderColor: colors.goldFoil }}
                data-testid="venue-map-embed"
              >
                <iframe
                  title={`Google Map for ${state.primaryVenueName}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    state.primaryVenueEmbedQuery || state.primaryVenueName
                  )}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </IslamicArchFrame>
      </section>

      {/* =====================================================================
          SECTION 7: PHOTO GALLERY & FULL-SCREEN LIGHTBOX (#gallery)
      ===================================================================== */}
      <section id="gallery" className="scroll-mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <p
            className="font-arabic text-xl sm:text-2xl mb-1"
            style={{ color: colors.goldFoil }}
          >
            ॥ स्वर्णिम स्मृतियाँ ॥
          </p>
          <h2
            className="font-display font-bold tracking-wider uppercase gold-foil-text"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            Royal Photo Gallery
          </h2>
          <p className="font-serif-royal text-base sm:text-lg opacity-85 mt-1">
            Glimpses of royal heritage, marigold torans, and auspicious moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {state.gallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-t-[80px] rounded-b-2xl border overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: colors.card,
                borderColor: `${colors.goldFoil}77`,
              }}
            >
              <button
                type="button"
                onClick={() => setLightboxPhoto(item)}
                aria-label={`View ${item.title} in full-screen lightbox`}
                className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer text-left focus:outline-none"
              >
                <RoyalImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  fallbackTitle={item.title}
                  goldColor={colors.goldFoil}
                  bgColor={colors.background}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border backdrop-blur-sm opacity-90 group-hover:scale-110 transition-transform"
                  style={{ borderColor: colors.goldFoil, color: colors.goldFoil }}
                >
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3
                    className="font-display text-base sm:text-lg font-bold tracking-wide"
                    style={{ color: '#fff3b0' }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-serif-royal text-sm text-white/90 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {lightboxPhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxPhoto.title}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full rounded-2xl border-2 overflow-hidden shadow-2xl"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.goldFoil,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close Lightbox"
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer border"
                style={{ borderColor: colors.goldFoil }}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                <RoyalImageWithFallback
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  fallbackTitle={lightboxPhoto.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
              <div className="p-5 text-center">
                <h3
                  className="font-display text-lg sm:text-xl font-bold"
                  style={{ color: colors.goldFoil }}
                >
                  {lightboxPhoto.title}
                </h3>
                <p className="font-serif-royal text-base opacity-90 mt-1">
                  {lightboxPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 8: FINAL MANGAL AASHIRWAD MESSAGE & BOTTOM ADMIN BUTTON
          (Owner Admin Panel button is placed ONLY at the very bottom footer)
      ===================================================================== */}
      <footer
        className="pt-12 pb-16 border-t text-center space-y-6 relative"
        style={{ borderColor: `${colors.goldFoil}40` }}
      >
        <div className="flex justify-center items-center gap-8 pointer-events-none">
          <MoroccanLantern size="sm" goldColor={colors.goldFoil} chainHeight={18} />
          <ShreeGaneshEmblem goldColor={colors.goldFoil} size="md" />
          <MoroccanLantern
            size="sm"
            goldColor={colors.goldFoil}
            delayed
            chainHeight={18}
          />
        </div>

        <p
          className="font-arabic text-2xl sm:text-3xl"
          style={{ color: colors.goldFoil }}
        >
          {state.bismillahArabic}
        </p>

        <blockquote className="max-w-2xl mx-auto font-serif-royal italic text-xl sm:text-2xl leading-relaxed opacity-95 px-4">
          “{state.closingDuaQuote}”
        </blockquote>

        <div className="space-y-1">
          <p className="font-serif-royal text-sm uppercase tracking-[0.25em] opacity-80">
            With love &amp; Pranams,
          </p>
          <p className="font-display text-2xl sm:text-4xl font-bold tracking-widest uppercase gold-foil-text">
            {state.groomName.toUpperCase()} &amp; {state.brideName.toUpperCase()}
          </p>
          <p className="font-serif-royal text-sm opacity-75">
            {state.weddingDate} • शुभ विवाह एवं लग्न पत्रिका (Shahi Kankotri)
          </p>
        </div>

        {/* BOTTOM-ONLY PIN-PROTECTED OWNER ADMIN PANEL BUTTON */}
        <div className="pt-8 flex justify-center">
          <button
            type="button"
            onClick={onOpenAdminModal}
            data-testid="owner-admin-footer-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans-clean text-xs font-medium border opacity-75 hover:opacity-100 transition-all cursor-pointer"
            style={{
              backgroundColor: colors.card,
              borderColor: `${colors.goldFoil}66`,
              color: colors.goldFoil,
            }}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Owner Admin Panel</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
