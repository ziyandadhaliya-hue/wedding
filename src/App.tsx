import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { KankotriState } from './types/kankotri';
import {
  DEFAULT_KANKOTRI_STATE,
  getMonogram,
  resolveActiveColors,
  resolveActiveSongInfo,
} from './utils/kankotriLogic';
import {
  clearUploadedAudioFromDb,
  loadUploadedAudioFromDb,
  RoyalInstrumentalSynthesizer,
  saveUploadedAudioToDb,
} from './utils/audioStorage';
import { TextureBackgroundOverlay } from './components/OrnateArchSvg';
import { FallingFlowerShower } from './components/FallingFlowerShower';
import { RoyalEnvelopeCover } from './components/RoyalEnvelopeCover';
import { RoyalCurtainStage } from './components/RoyalCurtainStage';
import { KankotriSections } from './components/KankotriSections';
import { OwnerAdminModal } from './components/OwnerAdminModal';

const STORAGE_KEY = 'shahi_hindu_kankotri_state_v4';

export default function App() {
  // Load persisted Kankotri state from localStorage
  const [state, setState] = useState<KankotriState>(() => {
    if (typeof window === 'undefined') return DEFAULT_KANKOTRI_STATE;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<KankotriState>;
        return {
          ...DEFAULT_KANKOTRI_STATE,
          ...parsed,
          music: {
            ...DEFAULT_KANKOTRI_STATE.music,
            ...(parsed.music || {}),
          },
        };
      }
    } catch {
      // Ignore corrupt storage
    }
    return DEFAULT_KANKOTRI_STATE;
  });

  // Support ?autostart=1 to skip directly to the opened Kankotri view
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [flowerBurstKey, setFlowerBurstKey] = useState(0);

  // Audio playback state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<RoyalInstrumentalSynthesizer | null>(null);

  // Save state changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state]);

  // Load any previously uploaded MP3/M4A/WAV/OGG song from IndexedDB
  useEffect(() => {
    let mounted = true;
    loadUploadedAudioFromDb().then((record) => {
      if (mounted && record) {
        setUploadedAudioUrl(record.objectUrl);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const stopAllAudio = () => {
    if (synthRef.current) {
      synthRef.current.stop();
    }
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
    setIsMusicPlaying(false);
  };

  const startMusic = (overrideMusic?: KankotriState['music']) => {
    const activeSong = resolveActiveSongInfo(
      overrideMusic || state.music,
      uploadedAudioUrl
    );
    const activeAudioSrc = activeSong.audioSrc;

    if (activeAudioSrc && audioElRef.current) {
      if (synthRef.current) synthRef.current.stop();
      if (audioElRef.current.getAttribute('data-current-src') !== activeAudioSrc) {
        audioElRef.current.src = activeAudioSrc;
        audioElRef.current.setAttribute('data-current-src', activeAudioSrc);
      }
      audioElRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          // Fallback to synthesizer if custom URL fails
          if (!synthRef.current) {
            synthRef.current = new RoyalInstrumentalSynthesizer();
          }
          synthRef.current.start();
          setIsMusicPlaying(true);
        });
    } else {
      if (audioElRef.current) audioElRef.current.pause();
      if (!synthRef.current) {
        synthRef.current = new RoyalInstrumentalSynthesizer();
      }
      synthRef.current.start();
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopAllAudio();
    } else {
      startMusic();
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  const handleOpenComplete = (scrollToInvitation = false) => {
    setIsCoverOpen(true);
    setFlowerBurstKey((k) => k + 1);
    startMusic();
    if (scrollToInvitation) {
      window.setTimeout(() => {
        const el = document.getElementById('invitation');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUploadSongFile = async (file: File) => {
    const objectUrl = await saveUploadedAudioToDb(file);
    setUploadedAudioUrl(objectUrl);
    setState((prev) => ({
      ...prev,
      music: {
        ...prev.music,
        mode: 'uploaded',
        uploadedFileName: file.name,
      },
    }));
    if (audioElRef.current) {
      if (synthRef.current) synthRef.current.stop();
      audioElRef.current.src = objectUrl;
      audioElRef.current.setAttribute('data-current-src', objectUrl);
      audioElRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleRestoreDefaultMusic = async () => {
    await clearUploadedAudioFromDb();
    setUploadedAudioUrl(null);
    const defaultMusic = DEFAULT_KANKOTRI_STATE.music;
    setState((prev) => ({
      ...prev,
      music: defaultMusic,
    }));
    if (isMusicPlaying) {
      startMusic(defaultMusic);
    }
  };

  const activeColors = resolveActiveColors(state);
  const monogram = getMonogram(state.groomName, state.brideName);
  const activeSongInfo = resolveActiveSongInfo(state.music, uploadedAudioUrl);

  return (
    <div
      className="min-h-screen relative transition-colors duration-500"
      style={{
        backgroundColor: activeColors.background,
        color: activeColors.text,
      }}
    >
      {/* Hidden HTML5 Audio Element for Uploaded / Custom Song */}
      <audio ref={audioElRef} loop className="hidden" />

      {/* Background Islamic Geometric / Floral Texture Overlay */}
      <TextureBackgroundOverlay
        pattern={state.texturePattern}
        goldColor={activeColors.goldFoil}
      />

      {/* 3D Falling Flower Shower (Rose Petals, Jasmine/Mogra & Gold Petals) */}
      <FallingFlowerShower
        enabled={isCoverOpen && state.fallingFlowersEnabled}
        burstKey={flowerBurstKey}
      />

      {/* STEP 1 OPENING: 3D ROYAL ENVELOPE & PALACE DOORS COVER */}
      {!isCoverOpen && (
        <RoyalEnvelopeCover
          state={state}
          colors={activeColors}
          onOpenComplete={handleOpenComplete}
        />
      )}

      {/* MAIN INVITATION EXPERIENCE (Revealed after 3D Cover opens) */}
      {isCoverOpen && (
        <>
          {/* Top Welcome Invitation Ribbon + Sticky Navigation Bar */}
          <div className="sticky top-0 z-40">
            {/* Ornate Top Welcome Invitation Ribbon */}
            <div
              className="w-full border-b px-3 py-1.5 text-center"
              style={{
                backgroundColor: `${activeColors.background}f5`,
                borderColor: `${activeColors.goldFoil}40`,
              }}
            >
              <a
                href="#invitation"
                className="font-serif-royal text-xs sm:text-sm tracking-wide hover:underline inline-block truncate max-w-full"
                style={{ color: activeColors.goldFoil }}
              >
                {state.topWelcomeRibbonText}
              </a>
            </div>

            {/* Sticky Header following 3-Zone Top Bar Contract (Zero Admin Buttons Here) */}
            <header
              className="flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-2.5 border-b backdrop-blur-md"
              style={{
                backgroundColor: `${activeColors.card}e6`,
                borderColor: `${activeColors.goldFoil}44`,
              }}
            >
              {/* Zone 1: Couple Monogram & Names */}
              <a
                href="#invitation"
                className="font-display text-sm sm:text-base font-bold tracking-wider whitespace-nowrap shrink-0"
                style={{ color: activeColors.goldFoil }}
              >
                {monogram} • {state.groomName} &amp; {state.brideName}
              </a>

              {/* Zone 2: Section Navigation Links */}
              <nav
                aria-label="Kankotri Sections"
                className="hidden md:flex items-center gap-6 text-xs font-display uppercase tracking-widest"
              >
                <a
                  href="#invitation"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Invitation
                </a>
                <a
                  href="#couple"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Couple
                </a>
                <a
                  href="#families"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Families
                </a>
                <a
                  href="#events"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Events
                </a>
                <a
                  href="#venue"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Venue
                </a>
                <a
                  href="#gallery"
                  className="hover:underline transition-opacity opacity-90 hover:opacity-100 whitespace-nowrap shrink-0"
                >
                  Gallery
                </a>
              </nav>

              {/* Zone 3: 3D Opening Replay Button */}
              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCoverOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-colors hover:bg-white/10 cursor-pointer whitespace-nowrap shrink-0"
                  style={{
                    borderColor: activeColors.goldFoil,
                    color: activeColors.goldFoil,
                  }}
                >
                  3D Opening
                </button>
              </div>
            </header>
          </div>

          {/* Main Content Area */}
          <main>
            {/* STEP 2 HERO REVEAL: ROYAL CURTAINS (PARDA) + NAME POSTER + COUPLE ENTRANCE */}
            <RoyalCurtainStage
              state={state}
              colors={activeColors}
              onTriggerFlowerBurst={() => setFlowerBurstKey((k) => k + 1)}
            />

            {/* FULL KANKOTRI READING SECTIONS (1 to 8) */}
            <KankotriSections
              state={state}
              colors={activeColors}
              onOpenAdminModal={() => setIsAdminOpen(true)}
            />
          </main>
        </>
      )}

      {/* Floating Background Music Play/Pause Button (Bottom-Right Corner) */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={
          isMusicPlaying ? 'Pause Wedding Background Music' : 'Play Wedding Background Music'
        }
        data-testid="floating-music-btn"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 shadow-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          backgroundColor: activeColors.card,
          borderColor: activeColors.goldFoil,
          color: activeColors.goldFoil,
          boxShadow: `0 10px 25px rgba(0,0,0,0.65)`,
        }}
      >
        {isMusicPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse shrink-0" />
            <span className="font-display text-xs font-bold uppercase tracking-wider hidden sm:inline">
              Playing: {activeSongInfo.shortTitle}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 opacity-80 shrink-0" />
            <span className="font-display text-xs font-semibold uppercase tracking-wider hidden sm:inline">
              Play: {activeSongInfo.shortTitle}
            </span>
          </>
        )}
      </button>

      {/* PIN-PROTECTED OWNER ADMIN PANEL MODAL (Triggered ONLY from Bottom Footer) */}
      <OwnerAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        state={state}
        colors={activeColors}
        onUpdateState={(updater) => setState((prev) => updater(prev))}
        onResetDefault={() => {
          setState(DEFAULT_KANKOTRI_STATE);
          window.localStorage.removeItem(STORAGE_KEY);
        }}
        onUploadSongFile={handleUploadSongFile}
        onRestoreDefaultMusic={handleRestoreDefaultMusic}
        onSelectBuiltInSong={(song) => {
          const updatedMusic: KankotriState['music'] = {
            ...state.music,
            mode: 'default',
            selectedSongId: song.id,
            selectedSongTitle: song.title,
            customUrl: song.audioUrl === 'synth' ? '' : song.audioUrl,
          };
          setState((prev) => ({
            ...prev,
            music: updatedMusic,
          }));
          startMusic(updatedMusic);
        }}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        onTriggerFlowerBurst={() => setFlowerBurstKey((k) => k + 1)}
      />
    </div>
  );
}
