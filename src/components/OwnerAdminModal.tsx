import React, { useState } from 'react';
import {
  Calendar,
  Check,
  Image as ImageIcon,
  Lock,
  MapPin,
  Music,
  Palette,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import {
  ArchStyle,
  ColorCombo,
  FamilyMember,
  KankotriState,
  TexturePattern,
} from '../types/kankotri';
import {
  ARCH_STYLE_OPTIONS,
  BUILT_IN_WEDDING_SONGS,
  BuiltInWeddingSong,
  DEFAULT_KANKOTRI_STATE,
  DESIGN_PRESETS_24,
  TEXTURE_PATTERN_OPTIONS,
  addHeroPhoto,
  addWeddingEvent,
  getActiveHeroPhotos,
  removeHeroPhotoAt,
  removeWeddingEvent,
  replaceHeroPhotoAt,
  resolveActiveSongInfo,
  verifyAdminPin,
} from '../utils/kankotriLogic';
import { RoyalImageWithFallback } from './OrnateArchSvg';

interface OwnerAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: KankotriState;
  colors: ColorCombo;
  onUpdateState: (updater: (prev: KankotriState) => KankotriState) => void;
  onResetDefault: () => void;
  onUploadSongFile: (file: File) => Promise<void>;
  onRestoreDefaultMusic: () => Promise<void>;
  onSelectBuiltInSong?: (song: BuiltInWeddingSong) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onTriggerFlowerBurst: () => void;
}

type AdminTab =
  | 'designs'
  | 'photos'
  | 'families'
  | 'music'
  | 'events'
  | 'venue'
  | 'gallery';

export const OwnerAdminModal: React.FC<OwnerAdminModalProps> = ({
  isOpen,
  onClose,
  state,
  colors,
  onUpdateState,
  onResetDefault,
  onUploadSongFile,
  onRestoreDefaultMusic,
  onSelectBuiltInSong,
  isMusicPlaying,
  onToggleMusic,
  onTriggerFlowerBurst,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('designs');
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  if (!isOpen) return null;

  const showSavedMessage = (msg: string) => {
    setStatusBanner(msg);
    window.setTimeout(() => {
      setStatusBanner(null);
    }, 2800);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput, state.adminPin)) {
      setUnlocked(true);
      setPinError('');
    } else {
      setPinError('Incorrect Owner PIN. Default PIN is 7860.');
    }
  };

  // Helper to convert uploaded image file into a clean compressed Data URL
  const handleImageFileSelect = (
    file: File | undefined,
    onResult: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
        showSavedMessage('Photo updated & saved automatically!');
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'designs',
      label: '1. 24 Designs & Colors',
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: 'photos',
      label: '2. Hero & Couple Photos',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 'families',
      label: '3. Both Families & Text',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'music',
      label: '4. Song / Music Upload',
      icon: <Music className="w-4 h-4" />,
    },
    {
      id: 'events',
      label: `5. Events (${state.events.length})`,
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'venue',
      label: '6. Venue & Map',
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: 'gallery',
      label: '7. Gallery Photos & PIN',
      icon: <Lock className="w-4 h-4" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Owner Admin Panel"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {!unlocked ? (
        /* =================================================================
           PIN LOCK SCREEN
        ================================================================= */
        <div
          className="relative w-full max-w-md rounded-2xl border-2 p-6 sm:p-8 shadow-2xl text-center space-y-5"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.goldFoil,
            color: colors.text,
          }}
        >
          <button
            type="button"
            aria-label="Close PIN Modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 cursor-pointer"
            style={{ color: colors.goldFoil }}
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="w-14 h-14 rounded-full border-2 mx-auto flex items-center justify-center"
            style={{ borderColor: colors.goldFoil, color: colors.goldFoil }}
          >
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2
              className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider"
              style={{ color: colors.goldFoil }}
            >
              Shahi Owner Admin Lock
            </h2>
            <p className="font-serif-royal text-sm sm:text-base opacity-85 mt-1">
              Enter the Owner Admin PIN to customize designs, colors, photos, songs, families, and events.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="owner-pin-input" className="sr-only">
                Owner Admin PIN
              </label>
              <input
                id="owner-pin-input"
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 7860)"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border text-center font-display text-lg tracking-[0.35em] focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.goldFoil,
                  color: colors.text,
                }}
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-medium" role="alert">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer transition-transform active:scale-95"
              style={{
                background:
                  'linear-gradient(135deg, #fff3b0 0%, #e5b842 50%, #c59227 100%)',
                color: '#1a1105',
              }}
            >
              Unlock Owner Admin Panel
            </button>
          </form>
        </div>
      ) : (
        /* =================================================================
           7-TAB OWNER ADMIN CUSTOMIZATION STUDIO
        ================================================================= */
        <div
          className="relative w-full max-w-6xl max-h-[92vh] rounded-2xl border-2 shadow-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: '#0c1512',
            borderColor: colors.goldFoil,
            color: '#f8fafc',
          }}
        >
          {/* Top Header */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b"
            style={{
              backgroundColor: '#070d0b',
              borderColor: `${colors.goldFoil}44`,
            }}
          >
            <div>
              <h2
                className="font-display text-base sm:text-xl font-bold tracking-wider uppercase"
                style={{ color: colors.goldFoil }}
              >
                ✦ Shahi Kankotri — Owner Admin Panel ✦
              </h2>
              <p className="text-xs text-slate-300">
                All changes auto-save immediately to this browser &amp; update the live invitation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {statusBanner && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
                  <Check className="w-3.5 h-3.5" />
                  {statusBanner}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                style={{
                  backgroundColor: colors.goldFoil,
                  color: '#1a1105',
                }}
              >
                <X className="w-4 h-4" />
                <span>Done &amp; View Kankotri</span>
              </button>
            </div>
          </div>

          {/* 7 Navigation Tabs */}
          <div
            className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto border-b bg-[#09110e]"
            style={{ borderColor: `${colors.goldFoil}33` }}
            role="tablist"
          >
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#e5b842] text-[#1a1105] font-bold shadow'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Tab Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-8">
            {/* ===============================================================
                TAB 1: 24 DESIGNS & COLORS + 5 ARCH STYLES + 5 TEXTURES + FLOWERS
            =============================================================== */}
            {activeTab === 'designs' && (
              <div className="space-y-8">
                {/* 3D Falling Flowers Toggle & Test Button */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                      3D Falling Flower Shower (Rose, Mogra &amp; Gold Petals)
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Toggle continuous 3D flower petals falling across the screen or trigger an instant burst.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateState((prev) => ({
                          ...prev,
                          fallingFlowersEnabled: !prev.fallingFlowersEnabled,
                        }))
                      }
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        state.fallingFlowersEnabled
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {state.fallingFlowersEnabled ? 'Flowers: ON' : 'Flowers: OFF'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onTriggerFlowerBurst();
                        showSavedMessage('Triggered 3D Flower Shower Burst!');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-[#e5b842] text-[#e5b842] hover:bg-white/10 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Test Flower Burst</span>
                    </button>
                  </div>
                </div>

                {/* 24 Royal Hindu Vivah Design & Color Combo Presets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                      24 Royal Hindu Vivah Design &amp; Color Combo Presets
                    </h3>
                    <span className="text-xs text-slate-400">
                      Click any preset to apply its palette, arch &amp; texture
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {DESIGN_PRESETS_24.map((preset) => {
                      const isSelected =
                        !state.useCustomColors &&
                        state.selectedPresetId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            onUpdateState((prev) => ({
                              ...prev,
                              selectedPresetId: preset.id,
                              useCustomColors: false,
                              customColors: preset.colors,
                              archStyle: preset.archStyle,
                              texturePattern: preset.texturePattern,
                            }));
                            showSavedMessage(`Applied ${preset.name}`);
                          }}
                          className={`text-left rounded-xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-2 border-[#e5b842] ring-2 ring-[#e5b842]/30 bg-white/10'
                              : 'border-white/15 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-display text-xs font-bold text-white">
                                {preset.name}
                              </span>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#e5b842] shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5">
                              {preset.subtitle}
                            </p>
                          </div>

                          {/* Color Swatch Strip */}
                          <div className="flex items-center gap-1.5 mt-3">
                            {Object.entries(preset.colors).map(([k, hex]) => (
                              <span
                                key={k}
                                className="h-5 flex-1 rounded border border-white/25"
                                style={{ backgroundColor: hex }}
                                title={`${k}: ${hex}`}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5 Selectable Architectural Arch Styles */}
                <div className="space-y-3">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                    5 Architectural Arch Styles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {ARCH_STYLE_OPTIONS.map((arch) => {
                      const active = state.archStyle === arch.id;
                      return (
                        <button
                          key={arch.id}
                          type="button"
                          onClick={() => {
                            onUpdateState((prev) => ({
                              ...prev,
                              archStyle: arch.id as ArchStyle,
                            }));
                            showSavedMessage(`Arch style set to ${arch.label}`);
                          }}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                            active
                              ? 'border-[#e5b842] bg-[#e5b842]/15'
                              : 'border-white/15 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <p className="font-display text-xs font-bold text-white">
                            {arch.label}
                          </p>
                          <p className="text-[11px] text-slate-300 mt-1">
                            {arch.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5 Background Texture Patterns */}
                <div className="space-y-3">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                    5 Background Texture Patterns
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {TEXTURE_PATTERN_OPTIONS.map((tex) => {
                      const active = state.texturePattern === tex.id;
                      return (
                        <button
                          key={tex.id}
                          type="button"
                          onClick={() => {
                            onUpdateState((prev) => ({
                              ...prev,
                              texturePattern: tex.id as TexturePattern,
                            }));
                            showSavedMessage(`Texture set to ${tex.label}`);
                          }}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                            active
                              ? 'border-[#e5b842] bg-[#e5b842]/15'
                              : 'border-white/15 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <p className="font-display text-xs font-bold text-white">
                            {tex.label}
                          </p>
                          <p className="text-[11px] text-slate-300 mt-1">
                            {tex.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Custom Color Combo Mixer */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                        Live Custom Color Combo Mixer
                      </h3>
                      <p className="text-xs text-slate-300">
                        Fine-tune individual colors for Background, Card, Arch Accent, Text, and Gold Foil.
                      </p>
                    </div>
                    <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state.useCustomColors}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            useCustomColors: e.target.checked,
                          }))
                        }
                        className="rounded accent-[#e5b842]"
                      />
                      <span>Enable Custom Color Mixer Override</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {(
                      [
                        { key: 'background', label: 'Background' },
                        { key: 'card', label: 'Card Surface' },
                        { key: 'archAccent', label: 'Arch Accent' },
                        { key: 'text', label: 'Primary Text' },
                        { key: 'goldFoil', label: 'Gold Foil' },
                      ] as const
                    ).map((item) => (
                      <label
                        key={item.key}
                        className="flex flex-col gap-1.5 p-3 rounded-lg bg-black/40 border border-white/10 text-xs"
                      >
                        <span className="font-medium text-slate-200">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={state.customColors[item.key]}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateState((prev) => ({
                                ...prev,
                                useCustomColors: true,
                                customColors: {
                                  ...prev.customColors,
                                  [item.key]: val,
                                },
                              }));
                            }}
                            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                          />
                          <span className="font-mono text-[11px] text-slate-300">
                            {state.customColors[item.key]}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 2: HERO & COUPLE PHOTOS (ADD / CHANGE / REMOVE ALL HERO PHOTOS) + DETAILS
            =============================================================== */}
            {activeTab === 'photos' && (
              <div className="space-y-8">
                {/* SECTION A: HERO BANNER COUPLE STAGE PHOTOS (ADD / CHANGE / REMOVE) */}
                <div className="rounded-xl border border-[#e5b842]/40 bg-white/5 p-5 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                        Hero Banner — Center Couple Stage Photos ({getActiveHeroPhotos(state).length})
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Add multiple couple photos to the Hero Banner (creates an interactive slideshow on stage), replace any photo, or remove all photos if you only want the Royal Name Poster.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>+ Add Hero Banner Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileSelect(
                              e.target.files?.[0],
                              (url) => {
                                onUpdateState((prev) => addHeroPhoto(prev, url));
                                showSavedMessage('Added new Hero Banner couple photo!');
                              }
                            )
                          }
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          onUpdateState((prev) =>
                            addHeroPhoto(
                              prev,
                              '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg'
                            )
                          );
                          showSavedMessage('Added Royal Palace & Gajraj photo to Hero Banner!');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-[#e5b842]/60 text-[#e5b842] hover:bg-white/10 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Sample Royal Photo</span>
                      </button>

                      {getActiveHeroPhotos(state).length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateState((prev) => ({
                              ...prev,
                              heroCouplePhotos: [],
                              heroCouplePhotoUrl: '',
                            }));
                            showSavedMessage('Removed all Hero Couple Stage photos');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove All Hero Photos</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {getActiveHeroPhotos(state).length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/20 bg-black/40 p-6 text-center space-y-3">
                      <p className="text-xs sm:text-sm text-slate-300">
                        All Center Hero Couple Stage photos are currently removed. The Hero Banner will showcase only the illuminated Royal Name Poster.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateState((prev) =>
                            addHeroPhoto(
                              prev,
                              DEFAULT_KANKOTRI_STATE.heroCouplePhotoUrl
                            )
                          );
                          showSavedMessage('Restored default Hero Couple photo!');
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#e5b842] text-[#1a1105] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore Default Hero Couple Photo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {getActiveHeroPhotos(state).map((photoUrl, idx) => (
                        <div
                          key={`hero-photo-${idx}`}
                          className="rounded-xl border border-white/15 bg-black/40 p-4 flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#e5b842]">
                                Hero Stage Photo #{idx + 1}
                              </span>
                              <button
                                type="button"
                                aria-label={`Remove Hero Photo ${idx + 1}`}
                                onClick={() => {
                                  onUpdateState((prev) =>
                                    removeHeroPhotoAt(prev, idx)
                                  );
                                  showSavedMessage(
                                    `Removed Hero Stage Photo #${idx + 1}`
                                  );
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>

                            <div className="aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/20 bg-black">
                              <RoyalImageWithFallback
                                src={photoUrl}
                                alt={`Hero Stage Photo ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer text-center">
                              <Upload className="w-4 h-4" />
                              <span>Change / Replace Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileSelect(
                                    e.target.files?.[0],
                                    (url) =>
                                      onUpdateState((prev) =>
                                        replaceHeroPhotoAt(prev, idx, url)
                                      )
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SECTION B: GROOM CAMEO, BRIDE CAMEO & 3D COVER DOOR PHOTOS (CHANGE OR REMOVE) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Groom Portrait & Hero Medallion */}
                  <div className="rounded-xl border border-white/15 bg-white/5 p-4 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#e5b842]">
                          Groom Photo ({state.groomName})
                        </h4>
                        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={state.showGroomHeroPhoto !== false}
                            onChange={(e) =>
                              onUpdateState((prev) => ({
                                ...prev,
                                showGroomHeroPhoto: e.target.checked,
                              }))
                            }
                            className="rounded accent-[#e5b842]"
                          />
                          <span>Show on Hero</span>
                        </label>
                      </div>

                      {state.groomPhotoUrl ? (
                        <div className="aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/20 bg-black">
                          <RoyalImageWithFallback
                            src={state.groomPhotoUrl}
                            alt={state.groomName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/5] w-full rounded-lg border border-dashed border-white/20 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-xs text-slate-400">
                            Groom Photo Removed
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer text-center">
                        <Upload className="w-4 h-4" />
                        <span>
                          {state.groomPhotoUrl
                            ? 'Change Groom Photo'
                            : 'Upload Groom Photo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileSelect(
                              e.target.files?.[0],
                              (url) =>
                                onUpdateState((prev) => ({
                                  ...prev,
                                  groomPhotoUrl: url,
                                  showGroomHeroPhoto: true,
                                }))
                            )
                          }
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        {state.groomPhotoUrl ? (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                groomPhotoUrl: '',
                              }));
                              showSavedMessage('Removed Groom Photo');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Photo</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                groomPhotoUrl:
                                  DEFAULT_KANKOTRI_STATE.groomPhotoUrl,
                                showGroomHeroPhoto: true,
                              }));
                              showSavedMessage('Restored default Groom Photo');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-white/20 text-slate-200 hover:bg-white/10 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Default</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bride Portrait & Hero Medallion */}
                  <div className="rounded-xl border border-white/15 bg-white/5 p-4 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#e5b842]">
                          Bride Photo ({state.brideName})
                        </h4>
                        <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={state.showBrideHeroPhoto !== false}
                            onChange={(e) =>
                              onUpdateState((prev) => ({
                                ...prev,
                                showBrideHeroPhoto: e.target.checked,
                              }))
                            }
                            className="rounded accent-[#e5b842]"
                          />
                          <span>Show on Hero</span>
                        </label>
                      </div>

                      {state.bridePhotoUrl ? (
                        <div className="aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/20 bg-black">
                          <RoyalImageWithFallback
                            src={state.bridePhotoUrl}
                            alt={state.brideName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/5] w-full rounded-lg border border-dashed border-white/20 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-xs text-slate-400">
                            Bride Photo Removed
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer text-center">
                        <Upload className="w-4 h-4" />
                        <span>
                          {state.bridePhotoUrl
                            ? 'Change Bride Photo'
                            : 'Upload Bride Photo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileSelect(
                              e.target.files?.[0],
                              (url) =>
                                onUpdateState((prev) => ({
                                  ...prev,
                                  bridePhotoUrl: url,
                                  showBrideHeroPhoto: true,
                                }))
                            )
                          }
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        {state.bridePhotoUrl ? (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                bridePhotoUrl: '',
                              }));
                              showSavedMessage('Removed Bride Photo');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Photo</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                bridePhotoUrl:
                                  DEFAULT_KANKOTRI_STATE.bridePhotoUrl,
                                showBrideHeroPhoto: true,
                              }));
                              showSavedMessage('Restored default Bride Photo');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-white/20 text-slate-200 hover:bg-white/10 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Default</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3D Opening Cover Palace Doors Background Photo */}
                  <div className="rounded-xl border border-white/15 bg-white/5 p-4 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#e5b842]">
                        3D Opening Cover Doors Photo
                      </h4>

                      {state.coverDoorPhotoUrl !== '' ? (
                        <div className="aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/20 bg-black">
                          <RoyalImageWithFallback
                            src={
                              state.coverDoorPhotoUrl ||
                              DEFAULT_KANKOTRI_STATE.coverDoorPhotoUrl ||
                              ''
                            }
                            alt="3D Opening Cover Palace Doors"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/5] w-full rounded-lg border border-dashed border-white/20 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                          <p className="text-xs text-slate-400">
                            3D Cover Door Photo Removed (Pure Jharokha Gold Texture Active)
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer text-center">
                        <Upload className="w-4 h-4" />
                        <span>
                          {state.coverDoorPhotoUrl !== ''
                            ? 'Change 3D Cover Photo'
                            : 'Upload 3D Cover Photo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileSelect(
                              e.target.files?.[0],
                              (url) =>
                                onUpdateState((prev) => ({
                                  ...prev,
                                  coverDoorPhotoUrl: url,
                                }))
                            )
                          }
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        {state.coverDoorPhotoUrl !== '' ? (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                coverDoorPhotoUrl: '',
                              }));
                              showSavedMessage('Removed 3D Cover Door Photo');
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Photo</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateState((prev) => ({
                                ...prev,
                                coverDoorPhotoUrl:
                                  DEFAULT_KANKOTRI_STATE.coverDoorPhotoUrl,
                              }));
                              showSavedMessage(
                                'Restored default 3D Cover Door Photo'
                              );
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-white/20 text-slate-200 hover:bg-white/10 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Default</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Groom, Bride & Wedding Date Text Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Groom Details */}
                  <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4">
                    <h4 className="font-display text-sm font-bold text-[#e5b842]">
                      Groom (Dulha) Details
                    </h4>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Groom Name</span>
                      <input
                        type="text"
                        value={state.groomName}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            groomName: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Groom Parents Line</span>
                      <input
                        type="text"
                        value={state.groomParentsLine}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            groomParentsLine: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Groom Bio</span>
                      <textarea
                        rows={2}
                        value={state.groomBio}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            groomBio: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                  </div>

                  {/* Bride Details */}
                  <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4">
                    <h4 className="font-display text-sm font-bold text-[#e5b842]">
                      Bride (Dulhan) Details
                    </h4>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Bride Name</span>
                      <input
                        type="text"
                        value={state.brideName}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            brideName: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Bride Parents Line</span>
                      <input
                        type="text"
                        value={state.brideParentsLine}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            brideParentsLine: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">Bride Bio</span>
                      <textarea
                        rows={2}
                        value={state.brideBio}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            brideBio: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                  </div>
                </div>

                {/* Wedding Date & Countdown Target */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1 text-xs">
                    <span className="text-slate-300">
                      Display Wedding Date (e.g. 16 January 2027)
                    </span>
                    <input
                      type="text"
                      value={state.weddingDate}
                      onChange={(e) =>
                        onUpdateState((prev) => ({
                          ...prev,
                          weddingDate: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                    />
                  </label>
                  <label className="block space-y-1 text-xs">
                    <span className="text-slate-300">
                      Countdown Target Date/Time (ISO)
                    </span>
                    <input
                      type="datetime-local"
                      value={state.weddingIsoDate.slice(0, 16)}
                      onChange={(e) =>
                        onUpdateState((prev) => ({
                          ...prev,
                          weddingIsoDate: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 3: BOTH FAMILIES & ALL TEXT
            =============================================================== */}
            {activeTab === 'families' && (
              <div className="space-y-8">
                {/* Main Invitation Texts & Ribbons */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4">
                  <h3 className="font-display text-sm font-bold text-[#e5b842]">
                    Ganesh Vandana, Invitation Ribbons, Headings &amp; Shloka
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Top Sacred Ganesh Mantra (e.g. ॥ श्री गणेशाय नमः ॥)
                      </span>
                      <input
                        type="text"
                        value={state.bismillahArabic}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            bismillahArabic: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Vedic Ganesh Shloka / Subtitle
                      </span>
                      <input
                        type="text"
                        value={state.bismillahTranslation}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            bismillahTranslation: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Top Welcome Invitation Ribbon Text
                      </span>
                      <input
                        type="text"
                        value={state.topWelcomeRibbonText}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            topWelcomeRibbonText: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Hero Stage Poster Tagline
                      </span>
                      <input
                        type="text"
                        value={state.heroStageTagline}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            heroStageTagline: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Main Kankotri / Lagna Patrika Heading
                      </span>
                      <input
                        type="text"
                        value={state.kankotriHeading}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            kankotriHeading: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Closing Mangalashtak / Aashirwad Quote
                      </span>
                      <input
                        type="text"
                        value={state.closingDuaQuote}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            closingDuaQuote: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                      />
                    </label>
                  </div>
                  <label className="block space-y-1 text-xs">
                    <span className="text-slate-300">
                      Shree Ganesh &amp; Elders Blessing Invitation Paragraph
                    </span>
                    <textarea
                      rows={2}
                      value={state.allahBlessingIntro}
                      onChange={(e) =>
                        onUpdateState((prev) => ({
                          ...prev,
                          allahBlessingIntro: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                    />
                  </label>
                </div>

                {/* Groom's Family & Bride's Family Member Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(
                    [
                      {
                        key: 'groomFamily',
                        title: `Groom's Family (वर पक्ष / Dulha Side — ${state.groomName})`,
                        list: state.groomFamily,
                      },
                      {
                        key: 'brideFamily',
                        title: `Bride's Family (वधू पक्ष / Dulhan Side — ${state.brideName})`,
                        list: state.brideFamily,
                      },
                    ] as const
                  ).map((side) => (
                    <div
                      key={side.key}
                      className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-xs sm:text-sm font-bold text-[#e5b842]">
                          {side.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newEntry: FamilyMember = {
                              id: `fam-${Date.now()}`,
                              category: 'Tauji, Chacha & Mama Parivar (Uncles & Aunts)',
                              names: 'Sriman & Smt. Family',
                            };
                            onUpdateState((prev) => ({
                              ...prev,
                              [side.key]: [...prev[side.key], newEntry],
                            }));
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#e5b842] text-[#1a1105] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Line</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {side.list.map((member, idx) => (
                          <div
                            key={member.id}
                            className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <select
                                aria-label="Family Member Category"
                                value={member.category}
                                onChange={(e) => {
                                  const cat =
                                    e.target.value as FamilyMember['category'];
                                  onUpdateState((prev) => {
                                    const updated = [...prev[side.key]];
                                    updated[idx] = {
                                      ...updated[idx],
                                      category: cat,
                                    };
                                    return { ...prev, [side.key]: updated };
                                  });
                                }}
                                className="px-2.5 py-1.5 rounded bg-slate-900 border border-white/20 text-xs text-[#e5b842]"
                              >
                                <option value="Dada-Dadi & Nana-Nani (Grandparents)">
                                  Dada-Dadi &amp; Nana-Nani (Grandparents)
                                </option>
                                <option value="Mata-Pita (Parents)">
                                  Mata-Pita (Parents)
                                </option>
                                <option value="Bhaiya & Bhabhi">
                                  Bhaiya &amp; Bhabhi
                                </option>
                                <option value="Tauji, Chacha & Mama Parivar (Uncles & Aunts)">
                                  Tauji, Chacha &amp; Mama Parivar (Uncles &amp; Aunts)
                                </option>
                                <option value="Didi, Jijaji & Brothers/Sisters">
                                  Didi, Jijaji &amp; Brothers/Sisters
                                </option>
                              </select>
                              <button
                                type="button"
                                aria-label={`Delete ${member.category}`}
                                onClick={() =>
                                  onUpdateState((prev) => ({
                                    ...prev,
                                    [side.key]: prev[side.key].filter(
                                      (m) => m.id !== member.id
                                    ),
                                  }))
                                }
                                className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={member.names}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const updated = [...prev[side.key]];
                                  updated[idx] = {
                                    ...updated[idx],
                                    names: val,
                                  };
                                  return { ...prev, [side.key]: updated };
                                });
                              }}
                              className="w-full px-3 py-1.5 rounded bg-black/60 border border-white/15 text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Best Compliments & Little Hearts */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block space-y-1 text-xs">
                    <span className="text-slate-300">
                      With Best Compliments From
                    </span>
                    <input
                      type="text"
                      value={state.bestComplimentsFrom}
                      onChange={(e) =>
                        onUpdateState((prev) => ({
                          ...prev,
                          bestComplimentsFrom: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                    />
                  </label>
                  <label className="block space-y-1 text-xs">
                    <span className="text-slate-300">
                      Little Hearts Awaiting Your Presence
                    </span>
                    <input
                      type="text"
                      value={state.littleHeartsText}
                      onChange={(e) =>
                        onUpdateState((prev) => ({
                          ...prev,
                          littleHeartsText: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 4: SONG / MUSIC UPLOAD & KUDMAYI BUILT-IN SONG LIBRARY
            =============================================================== */}
            {activeTab === 'music' && (
              <div className="space-y-6 max-w-4xl">
                {/* Built-in Royal Wedding Songs (Featuring Kudmayi Film Version) */}
                <div className="rounded-xl border border-[#e5b842]/40 bg-white/5 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                        Built-In Royal Wedding Songs Library (Kudmayi Included)
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Click any song below to set it as the active wedding song for your Kankotri.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleMusic}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] cursor-pointer shadow"
                    >
                      {isMusicPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Pause Music Preview</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Play Music Preview</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {BUILT_IN_WEDDING_SONGS.map((song, idx) => {
                      const isSelected =
                        state.music.mode === 'default' &&
                        (state.music.selectedSongId || 'kudmayi-film') === song.id;
                      return (
                        <div
                          key={song.id}
                          className={`rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4 transition-all ${
                            isSelected
                              ? 'border-2 border-[#e5b842] bg-[#e5b842]/15'
                              : 'border-white/15 bg-black/40 hover:bg-white/5'
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-[240px]">
                            <div className="flex items-center gap-2">
                              <span className="font-display text-xs sm:text-sm font-bold text-white">
                                0{idx + 1}. {song.title}
                              </span>
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#e5b842] text-[#1a1105]">
                                  <Check className="w-3 h-3" />
                                  Active Song
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300">
                              {song.subtitle}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (onSelectBuiltInSong) {
                                onSelectBuiltInSong(song);
                              } else {
                                onUpdateState((prev) => ({
                                  ...prev,
                                  music: {
                                    ...prev.music,
                                    mode: 'default',
                                    selectedSongId: song.id,
                                    selectedSongTitle: song.title,
                                    customUrl:
                                      song.audioUrl === 'synth'
                                        ? ''
                                        : song.audioUrl,
                                  },
                                }));
                              }
                              showSavedMessage(
                                `Selected & playing: ${song.shortTitle}`
                              );
                            }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider cursor-pointer ${
                              isSelected
                                ? 'bg-[#e5b842] text-[#1a1105]'
                                : 'border border-[#e5b842] text-[#e5b842] hover:bg-white/10'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>
                              {isSelected ? 'Playing / Selected' : 'Select & Play'}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/50 border border-white/15 text-xs">
                    <p className="font-semibold text-[#e5b842]">
                      Active Wedding Song:{' '}
                      <span className="text-white">
                        {resolveActiveSongInfo(state.music).title}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Upload Custom MP3 / M4A / WAV / OGG from Device */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-4">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                    Or Upload Your Own Downloaded MP3 / M4A / WAV / OGG Song
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Upload any downloaded wedding song file from your phone or computer. It is stored in IndexedDB so it stays saved across page reloads.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload MP3 / M4A / WAV / OGG Song</span>
                      <input
                        type="file"
                        accept="audio/*,.mp3,.m4a,.wav,.ogg"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await onUploadSongFile(file);
                            showSavedMessage(
                              `Uploaded & saved song: ${file.name}`
                            );
                          }
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={async () => {
                        await onRestoreDefaultMusic();
                        showSavedMessage(
                          'Restored default song: Kudmayi (Film Version)'
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium border border-white/20 text-slate-200 hover:bg-white/10 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default (Kudmayi Film Version)</span>
                    </button>
                  </div>
                </div>

                {/* Custom Audio Link Option */}
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-3">
                  <h4 className="font-display text-xs uppercase tracking-wider font-bold text-[#e5b842]">
                    Or Paste a Direct Audio URL (.mp3 / .m4a / .ogg)
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/kudmayi-film-version.mp3"
                      value={
                        state.music.mode === 'url' ? state.music.customUrl : ''
                      }
                      onChange={(e) => {
                        const url = e.target.value;
                        onUpdateState((prev) => ({
                          ...prev,
                          music: {
                            ...prev.music,
                            mode: url.trim() ? 'url' : 'default',
                            customUrl: url,
                          },
                        }));
                      }}
                      className="flex-1 px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 5: EVENTS (ADD / REMOVE / EDIT MANGLIK VIVAH CEREMONIES)
            =============================================================== */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                {/* Top Action Bar: Add New Event or Quick-Add Vedic Ceremonies */}
                <div className="rounded-xl border border-[#e5b842]/40 bg-white/5 p-4 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                        Manglik Vivah Ceremonies ({state.events.length} Events)
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Add as many ceremonies as you need or remove any ceremony. Any field left blank (Date, Time, Venue, or Address) is automatically hidden on the invitation.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onUpdateState((prev) => addWeddingEvent(prev));
                        showSavedMessage('Added new Manglik Vivah Ceremony!');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#e5b842] text-[#1a1105] hover:opacity-95 cursor-pointer shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add New Ceremony / Event</span>
                    </button>
                  </div>

                  {/* Quick-Add Traditional Hindu Ceremony Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 mr-1">
                      Quick Add:
                    </span>
                    {[
                      {
                        label: '+ Ganesh Pujan & Mandap',
                        title: 'Shree Ganesh Pujan & Mandap Muhurat',
                        arabicTitle: 'श्री गणेश पूजन एवं मण्डप मुहूर्त',
                        blessing:
                          'Invoking the divine blessings of Lord Shree Ganesha and Kuldevi Mataji for an auspicious beginning.',
                        accentColor: '#f59e0b',
                      },
                      {
                        label: '+ Tilak & Sagai',
                        title: 'Shubh Tilak & Ring Ceremony (Sagai)',
                        arabicTitle: 'शुभ तिलक एवं सगाई समारोह',
                        blessing:
                          'Sacred Tilak ritual and exchange of rings amidst blessings from both families.',
                        accentColor: '#eab308',
                      },
                      {
                        label: '+ Mayra / Bhaat',
                        title: 'Shahi Mayra (Bhaat) Ceremony',
                        arabicTitle: 'शाही मायरा (भात) उत्सव',
                        blessing:
                          'Heartwarming maternal family rituals filled with traditional songs and love.',
                        accentColor: '#ec4899',
                      },
                      {
                        label: '+ Griha Shanti & Havan',
                        title: 'Vedic Griha Shanti & Mangal Havan',
                        arabicTitle: 'ग्रह शांति एवं मंगल हवन यज्ञ',
                        blessing:
                          'Sacred Vedic mantras and havan for peace, prosperity, and divine grace.',
                        accentColor: '#10b981',
                      },
                      {
                        label: '+ Vidaai / Kanyadaan',
                        title: 'Subh Muhurat Kanyadaan & Doli Vidaai',
                        arabicTitle: 'कन्यादान संस्कार एवं शुभ विदाई',
                        blessing:
                          'Emotional blessings as the bride steps into her new home with love and grace.',
                        accentColor: '#38bdf8',
                      },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          onUpdateState((prev) =>
                            addWeddingEvent(prev, {
                              title: preset.title,
                              arabicTitle: preset.arabicTitle,
                              blessing: preset.blessing,
                              accentColor: preset.accentColor,
                            })
                          );
                          showSavedMessage(`Added ${preset.title}`);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-black/40 text-slate-200 hover:border-[#e5b842] hover:text-[#e5b842] cursor-pointer transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {state.events.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/20 bg-black/40 p-8 text-center space-y-3">
                    <p className="text-sm text-slate-300">
                      No ceremonies are currently listed. Click &ldquo;+ Add New Ceremony / Event&rdquo; above to add a wedding event.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {state.events.map((ev, idx) => (
                      <div
                        key={ev.id}
                        className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-display text-sm font-bold text-[#e5b842]">
                              {String(idx + 1).padStart(2, '0')}. {ev.title}
                            </h4>
                            <span className="font-arabic text-sm text-[#e5b842]/90">
                              {ev.arabicTitle}
                            </span>
                          </div>

                          <button
                            type="button"
                            aria-label={`Remove ${ev.title}`}
                            onClick={() => {
                              onUpdateState((prev) =>
                                removeWeddingEvent(prev, ev.id)
                              );
                              showSavedMessage(`Removed ceremony: ${ev.title}`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Event</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <label className="block space-y-1">
                            <span className="text-slate-300">Event Title</span>
                            <input
                              type="text"
                              value={ev.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = { ...next[idx], title: val };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                          <label className="block space-y-1">
                            <span className="text-slate-300">
                              Hindi / Sanskrit Subtitle
                            </span>
                            <input
                              type="text"
                              value={ev.arabicTitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = {
                                    ...next[idx],
                                    arabicTitle: val,
                                  };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                          <label className="block space-y-1">
                            <span className="text-slate-300">Date</span>
                            <input
                              type="text"
                              value={ev.date}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = { ...next[idx], date: val };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                          <label className="block space-y-1">
                            <span className="text-slate-300">Time</span>
                            <input
                              type="text"
                              value={ev.time}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = { ...next[idx], time: val };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                        </div>

                        <label className="block space-y-1 text-xs">
                          <span className="text-slate-300">
                            Ceremony Blessing / Description
                          </span>
                          <input
                            type="text"
                            value={ev.blessing}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateState((prev) => {
                                const next = [...prev.events];
                                next[idx] = { ...next[idx], blessing: val };
                                return { ...prev, events: next };
                              });
                            }}
                            className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                          />
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <label className="block space-y-1">
                            <span className="text-slate-300">Venue Name</span>
                            <input
                              type="text"
                              value={ev.venue}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = { ...next[idx], venue: val };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                          <label className="block space-y-1">
                            <span className="text-slate-300">Full Address</span>
                            <input
                              type="text"
                              value={ev.address}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [...prev.events];
                                  next[idx] = { ...next[idx], address: val };
                                  return { ...prev, events: next };
                                });
                              }}
                              className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                            />
                          </label>
                        </div>

                        <label className="block space-y-1 text-xs">
                          <span className="text-slate-300">
                            Google Maps Link
                          </span>
                          <input
                            type="text"
                            value={ev.mapLink}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateState((prev) => {
                                const next = [...prev.events];
                                next[idx] = { ...next[idx], mapLink: val };
                                return { ...prev, events: next };
                              });
                            }}
                            className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===============================================================
                TAB 6: VENUE & GOOGLE MAP
            =============================================================== */}
            {activeTab === 'venue' && (
              <div className="rounded-xl border border-white/15 bg-white/5 p-5 max-w-2xl space-y-4">
                <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                  Primary Wedding Venue &amp; Google Maps Configuration
                </h3>

                <label className="block space-y-1 text-xs">
                  <span className="text-slate-300">Primary Venue Name</span>
                  <input
                    type="text"
                    value={state.primaryVenueName}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        primaryVenueName: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                  />
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="text-slate-300">Full Venue Address</span>
                  <textarea
                    rows={2}
                    value={state.primaryVenueAddress}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        primaryVenueAddress: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/20 text-white"
                  />
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="text-slate-300">
                    Google Maps Directions URL
                  </span>
                  <input
                    type="text"
                    value={state.primaryVenueMapLink}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        primaryVenueMapLink: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                  />
                </label>

                <label className="block space-y-1 text-xs">
                  <span className="text-slate-300">
                    Interactive Google Maps Embed Search Query
                  </span>
                  <input
                    type="text"
                    value={state.primaryVenueEmbedQuery}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        primaryVenueEmbedQuery: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white"
                  />
                </label>
              </div>
            )}

            {/* ===============================================================
                TAB 7: ALL GALLERY PHOTOS & OWNER PIN
            =============================================================== */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#e5b842]">
                      Royal Photo Gallery Frames
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateState((prev) => ({
                          ...prev,
                          gallery: [
                            ...prev.gallery,
                            {
                              id: `gal-${Date.now()}`,
                              title: 'Royal Wedding Moment',
                              caption: 'Blessed celebration with family and prayers',
                              imageUrl:
                                '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',
                            },
                          ],
                        }));
                        showSavedMessage('Added new gallery frame');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-display text-xs font-bold uppercase bg-[#e5b842] text-[#1a1105] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Gallery Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {state.gallery.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-black border border-white/15">
                            <RoyalImageWithFallback
                              src={photo.imageUrl}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <input
                            type="text"
                            value={photo.title}
                            aria-label="Gallery Photo Title"
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateState((prev) => {
                                const next = [...prev.gallery];
                                next[idx] = { ...next[idx], title: val };
                                return { ...prev, gallery: next };
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/20 text-xs text-white font-semibold"
                          />

                          <input
                            type="text"
                            value={photo.caption}
                            aria-label="Gallery Photo Caption"
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateState((prev) => {
                                const next = [...prev.gallery];
                                next[idx] = { ...next[idx], caption: val };
                                return { ...prev, gallery: next };
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded bg-black/50 border border-white/20 text-xs text-slate-300"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <label className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-[#e5b842] text-[#1a1105] cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileSelect(
                                  e.target.files?.[0],
                                  (url) => {
                                    onUpdateState((prev) => {
                                      const next = [...prev.gallery];
                                      next[idx] = {
                                        ...next[idx],
                                        imageUrl: url,
                                      };
                                      return { ...prev, gallery: next };
                                    });
                                  }
                                )
                              }
                            />
                          </label>
                          <button
                            type="button"
                            aria-label={`Remove ${photo.title}`}
                            onClick={() =>
                              onUpdateState((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter(
                                  (g) => g.id !== photo.id
                                ),
                              }))
                            }
                            className="p-2 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Change Owner Admin PIN & Reset All */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/15">
                  <div className="rounded-xl border border-white/15 bg-white/5 p-5 space-y-3">
                    <h4 className="font-display text-sm font-bold text-[#e5b842]">
                      Change Owner Admin PIN
                    </h4>
                    <label className="block space-y-1 text-xs">
                      <span className="text-slate-300">
                        Current Owner Admin PIN (Default: 7860)
                      </span>
                      <input
                        type="text"
                        value={state.adminPin}
                        onChange={(e) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            adminPin: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/20 text-white font-mono"
                      />
                    </label>
                  </div>

                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-5 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-display text-sm font-bold text-rose-300">
                        Restore Original Default Kankotri
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Reset all names, designs, photos, and events back to the initial Akshay &amp; Komal defaults.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onResetDefault();
                        showSavedMessage('Restored all default Kankotri settings');
                      }}
                      className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All to Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
