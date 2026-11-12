export type ArchStyle =
  | 'shahi-jharokha'
  | 'mughal-dome'
  | 'persian-pointed'
  | 'moroccan-horseshoe'
  | 'royal-octagonal';

export type TexturePattern =
  | 'jaali-filigree'
  | 'arabesque-damask'
  | 'royal-zardozi'
  | 'star-polygon'
  | 'silk-parchment';

export interface ColorCombo {
  background: string;
  card: string;
  archAccent: string;
  text: string;
  goldFoil: string;
}

export interface DesignPreset {
  id: string;
  name: string;
  subtitle: string;
  colors: ColorCombo;
  archStyle: ArchStyle;
  texturePattern: TexturePattern;
}

export interface FamilyMember {
  id: string;
  category:
    | 'Dada-Dadi & Nana-Nani (Grandparents)'
    | 'Mata-Pita (Parents)'
    | 'Bhaiya & Bhabhi'
    | 'Tauji, Chacha & Mama Parivar (Uncles & Aunts)'
    | 'Didi, Jijaji & Brothers/Sisters'
    | string;
  names: string;
}

export interface WeddingEvent {
  id: string;
  slug: string;
  title: string;
  arabicTitle: string;
  blessing: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  accentColor: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface MusicConfig {
  mode: 'default' | 'uploaded' | 'url';
  selectedSongId?: string;
  selectedSongTitle?: string;
  customUrl: string;
  uploadedFileName: string;
  autoPlayOnOpen: boolean;
}

export interface KankotriState {
  // 1. Core Wedding Details
  groomName: string;
  groomTitle: string;
  groomParentsLine: string;
  groomBio: string;
  groomBlessingArabic: string;
  groomPhotoUrl: string;

  brideName: string;
  brideTitle: string;
  brideParentsLine: string;
  brideBio: string;
  brideBlessingArabic: string;
  bridePhotoUrl: string;

  heroCouplePhotoUrl: string;
  heroCouplePhotos?: string[];
  showGroomHeroPhoto?: boolean;
  showBrideHeroPhoto?: boolean;
  coverDoorPhotoUrl?: string;
  weddingDate: string; // e.g., "16 January 2027"
  weddingIsoDate: string; // e.g., "2027-01-16T19:00:00"

  // 2. Custom Texts & Ribbons
  topWelcomeRibbonText: string;
  heroStageTagline: string;
  bismillahArabic: string;
  bismillahTranslation: string;
  kankotriHeading: string;
  allahBlessingIntro: string;
  warmPresenceNote: string;
  closingDuaQuote: string;
  bestComplimentsFrom: string;
  littleHeartsText: string;

  // 3. Design & Colors
  selectedPresetId: string;
  useCustomColors: boolean;
  customColors: ColorCombo;
  archStyle: ArchStyle;
  texturePattern: TexturePattern;
  fallingFlowersEnabled: boolean;

  // 4. Both Families
  groomFamily: FamilyMember[];
  brideFamily: FamilyMember[];

  // 5. 5 Wedding Events
  events: WeddingEvent[];

  // 6. Primary Venue & Map
  primaryVenueName: string;
  primaryVenueAddress: string;
  primaryVenueMapLink: string;
  primaryVenueEmbedQuery: string;

  // 7. Gallery & Admin Security
  gallery: GalleryPhoto[];
  adminPin: string;
  music: MusicConfig;
}
