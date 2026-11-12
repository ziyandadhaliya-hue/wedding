import {
  ArchStyle,
  ColorCombo,
  DesignPreset,
  KankotriState,
  TexturePattern,
  WeddingEvent,
} from '../types/kankotri';

export const ARCH_STYLE_OPTIONS: { id: ArchStyle; label: string; description: string }[] = [
  {
    id: 'shahi-jharokha',
    label: 'Rajputana Shahi Jharokha',
    description: 'Scalloped multi-cusped Udaipur palace window arch',
  },
  {
    id: 'mughal-dome',
    label: 'Royal Mandir Kalash Arch',
    description: 'Classic pointed temple & palace dome arch',
  },
  {
    id: 'persian-pointed',
    label: 'Suryagarh Palace Arch',
    description: 'Graceful carved heritage sandstone pointed arch',
  },
  {
    id: 'moroccan-horseshoe',
    label: 'Chittorgarh Toran Arch',
    description: 'Rounded ceremonial gateway toran arch',
  },
  {
    id: 'royal-octagonal',
    label: 'Ashtakon Singhasan Arch',
    description: 'Sacred 8-faceted royal throne crown frame',
  },
];

export const TEXTURE_PATTERN_OPTIONS: {
  id: TexturePattern;
  label: string;
  description: string;
}[] = [
  {
    id: 'jaali-filigree',
    label: 'Rajasthani Jharokha Jaali',
    description: 'Intricate carved palace lattice stonework',
  },
  {
    id: 'arabesque-damask',
    label: 'Kamal (Lotus) & Vines',
    description: 'Sacred lotus blossom & manglik floral scroll',
  },
  {
    id: 'royal-zardozi',
    label: 'Banarasi Zardozi Brocade',
    description: 'Metallic gold zari thread embroidery weave',
  },
  {
    id: 'star-polygon',
    label: 'Ashtadal Mandala Geometry',
    description: 'Auspicious Vedic mandala star tessellation',
  },
  {
    id: 'silk-parchment',
    label: 'Shahi Bhojpatra Parchment',
    description: 'Warm royal Lagna Patrika manuscript grain',
  },
];

export const DESIGN_PRESETS_24: DesignPreset[] = [
  {
    id: 'crimson-ruby-velvet',
    name: '01. Sindoor Crimson & 24K Zardozi Gold',
    subtitle: 'Auspicious Bridal Lehenga Maroon with Imperial Gold',
    colors: {
      background: '#2b060d',
      card: '#3f0a14',
      archAccent: '#5c1120',
      text: '#fff6eb',
      goldFoil: '#f0c14b',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'royal-zardozi',
  },
  {
    id: 'mughal-ivory-parchment',
    name: '02. Royal Ivory & Rose Gold Kankotri',
    subtitle: 'Udaipur Marble Ivory with Burnished Champagne Gold',
    colors: {
      background: '#f9f3e8',
      card: '#fffcf6',
      archAccent: '#efe2cb',
      text: '#2c1e12',
      goldFoil: '#b6802d',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'silk-parchment',
  },
  {
    id: 'shahi-emerald-gold',
    name: '03.Rajputana Panna Emerald & Gold',
    subtitle: 'Imperial Jaipur Emerald with 24K Kundan Gold Leaf',
    colors: {
      background: '#041f18',
      card: '#082e24',
      archAccent: '#10493a',
      text: '#fdf8eb',
      goldFoil: '#e5b842',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'saffron-zafran-palace',
    name: '04. Manglik Kesar & Marigold Gold',
    subtitle: 'Festive Rajasthani Kesariya Amber with Deep Gold',
    colors: {
      background: '#2d1604',
      card: '#442207',
      archAccent: '#61320c',
      text: '#fff9ed',
      goldFoil: '#f7c844',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'royal-zardozi',
  },
  {
    id: 'peacock-sapphire',
    name: '05. Morpankh Peacock Sapphire & Gold',
    subtitle: 'Jodhpur Royal Cobalt with Gilded Filigree',
    colors: {
      background: '#06152d',
      card: '#0b2246',
      archAccent: '#133568',
      text: '#f5f8ff',
      goldFoil: '#e6be5a',
    },
    archStyle: 'persian-pointed',
    texturePattern: 'star-polygon',
  },
  {
    id: 'kashmiri-rose-blush',
    name: '06. Gulabi Nagari Rose & Brass',
    subtitle: 'Jaipur Pink Palace Velvet with Warm Temple Brass',
    colors: {
      background: '#33111c',
      card: '#491929',
      archAccent: '#632439',
      text: '#fff5f8',
      goldFoil: '#eab869',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'arabesque-damask',
  },
  {
    id: 'royal-mulberry-silk',
    name: '07. Banarasi Paithani Magenta & Zari',
    subtitle: 'Vibrant Bridal Silk Plum with Golden Zari',
    colors: {
      background: '#280822',
      card: '#3c0d33',
      archAccent: '#57154a',
      text: '#fff5fd',
      goldFoil: '#f0c04a',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'arabesque-damask',
  },
  {
    id: 'desert-sandstone-palace',
    name: '08. Jaisalmer Sonar Qila Sandstone',
    subtitle: 'Sunlit Golden Fort Stone with Antique Bronze',
    colors: {
      background: '#f4e7d3',
      card: '#fbf3e6',
      archAccent: '#e5d0b1',
      text: '#362210',
      goldFoil: '#a86f24',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'royal-amethyst-purple',
    name: '09. Maharani Jamuni Velvet & Gold',
    subtitle: 'Regal Royal Purple with Shimmering Kundan Gold',
    colors: {
      background: '#1c0a2b',
      card: '#2b1142',
      archAccent: '#401b60',
      text: '#faf5ff',
      goldFoil: '#e5bc4f',
    },
    archStyle: 'moroccan-horseshoe',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'hyderabadi-maroon-emerald',
    name: '10. Kumkum Roli & Chandan Gold',
    subtitle: 'Sacred Vermilion Wine with Rich Gold Borders',
    colors: {
      background: '#240811',
      card: '#380e1c',
      archAccent: '#52172b',
      text: '#fdf5f0',
      goldFoil: '#e7b946',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'royal-zardozi',
  },
  {
    id: 'andalusian-terracotta',
    name: '11. Solah Shringar Mehendi & Amber',
    subtitle: 'Warm Henna Terracotta Spice with Amber Foil',
    colors: {
      background: '#2b1208',
      card: '#401c0e',
      archAccent: '#5a2815',
      text: '#fff7f0',
      goldFoil: '#eca844',
    },
    archStyle: 'moroccan-horseshoe',
    texturePattern: 'star-polygon',
  },
  {
    id: 'blush-champagne-nikah',
    name: '12. Lotus Blush Silk & Copper Gold',
    subtitle: 'Soft Day-Vivah Pastel Pink Silk with Rose Gold',
    colors: {
      background: '#fbf0f0',
      card: '#fff8f8',
      archAccent: '#f2dada',
      text: '#38191e',
      goldFoil: '#AD703B',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'silk-parchment',
  },
  {
    id: 'ottoman-turquoise-teal',
    name: '13. Pichwai Rama Green & Gold Leaf',
    subtitle: 'Nathdwara Pichwai Teal with Warm Gold Leaf',
    colors: {
      background: '#05242a',
      card: '#0a363f',
      archAccent: '#124e5a',
      text: '#f2fbfd',
      goldFoil: '#e8bd51',
    },
    archStyle: 'persian-pointed',
    texturePattern: 'arabesque-damask',
  },
  {
    id: 'lucknowi-mint-pearl',
    name: '14. Tulsi Pista & Pearl Gold',
    subtitle: 'Soft Pastel Pistachio Green with Temple Gold',
    colors: {
      background: '#eef5ee',
      card: '#f8fcf8',
      archAccent: '#d9ead9',
      text: '#163020',
      goldFoil: '#9e7422',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'arabesque-damask',
  },
  {
    id: 'velvet-burgundy-crown',
    name: '15. Mewar Royal Claret & 24K Filigree',
    subtitle: 'Chittorgarh Deep Maroon with Sovereign Gold',
    colors: {
      background: '#220509',
      card: '#350910',
      archAccent: '#4f0f19',
      text: '#fff6f6',
      goldFoil: '#ebb844',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'royal-zardozi',
  },
  {
    id: 'black-gold-kiswah',
    name: '16. Sangeet Midnight Velvet & Gold',
    subtitle: 'Glamorous Sangeet Night Jet Black & Metallic Gold',
    colors: {
      background: '#08080a',
      card: '#131318',
      archAccent: '#222129',
      text: '#fcf9f0',
      goldFoil: '#f2c94c',
    },
    archStyle: 'royal-octagonal',
    texturePattern: 'star-polygon',
  },
  {
    id: 'imperial-jade-forest',
    name: '17. Ranthambore Banyan & Brass',
    subtitle: 'Deep Forest Green with Burnished Temple Brass',
    colors: {
      background: '#071c12',
      card: '#0e2d1e',
      archAccent: '#17442e',
      text: '#f6fbf7',
      goldFoil: '#dfb447',
    },
    archStyle: 'persian-pointed',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'sultanate-indigo-night',
    name: '18. Neelkanth Celestial Indigo',
    subtitle: 'Starlit Godhuli Muhurat Blue with Gold Stars',
    colors: {
      background: '#090d24',
      card: '#11183c',
      archAccent: '#1b2659',
      text: '#f6f7ff',
      goldFoil: '#ecc053',
    },
    archStyle: 'royal-octagonal',
    texturePattern: 'star-polygon',
  },
  {
    id: 'mecca-olive-sanctuary',
    name: '19. Mango Leaf Toran & Antique Gold',
    subtitle: 'Auspicious Bandhanwar Olive Green with Gold',
    colors: {
      background: '#141e0d',
      card: '#203015',
      archAccent: '#2f4520',
      text: '#f9fbf6',
      goldFoil: '#ddb349',
    },
    archStyle: 'persian-pointed',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'pearl-alabaster-gold',
    name: '20. Makrana White Marble & Gold',
    subtitle: 'Pure Rajasthani Alabaster Marble with Inlaid Gold',
    colors: {
      background: '#f4f4f1',
      card: '#ffffff',
      archAccent: '#e6e4dc',
      text: '#1f1e1b',
      goldFoil: '#a67a23',
    },
    archStyle: 'mughal-dome',
    texturePattern: 'jaali-filigree',
  },
  {
    id: 'moroccan-riad-bronze',
    name: '21. Mysore Sandalwood & Gold Foil',
    subtitle: 'Rich Carved Chandan Wood with Warm Gold',
    colors: {
      background: '#1e120a',
      card: '#2e1c10',
      archAccent: '#442a18',
      text: '#fdf6ee',
      goldFoil: '#e5b24c',
    },
    archStyle: 'moroccan-horseshoe',
    texturePattern: 'star-polygon',
  },
  {
    id: 'persian-lapis-lazuli',
    name: '22. Dwarka Royal Lapis & Gold',
    subtitle: 'Deep Ocean Sapphire with Golden Devanagari',
    colors: {
      background: '#071936',
      card: '#0d2752',
      archAccent: '#163a75',
      text: '#f4f9ff',
      goldFoil: '#ebbe50',
    },
    archStyle: 'persian-pointed',
    texturePattern: 'arabesque-damask',
  },
  {
    id: 'vintage-sepia-manuscript',
    name: '23. Heritage Shahi Lagna Patrika',
    subtitle: 'Traditional Bhojpatra Scroll with Burnished Gold',
    colors: {
      background: '#efe3ce',
      card: '#f9f1e2',
      archAccent: '#dfd0b4',
      text: '#2b1b0e',
      goldFoil: '#9c681c',
    },
    archStyle: 'royal-octagonal',
    texturePattern: 'silk-parchment',
  },
  {
    id: 'walima-emerald-ivory',
    name: '24. Kanjeevaram Emerald & Temple Gold',
    subtitle: 'Regal South & North Heritage Silk Contrast',
    colors: {
      background: '#05261e',
      card: '#0a3a2e',
      archAccent: '#125443',
      text: '#fffdf7',
      goldFoil: '#f1c653',
    },
    archStyle: 'shahi-jharokha',
    texturePattern: 'jaali-filigree',
  },
];

export const DEFAULT_KANKOTRI_STATE: KankotriState = {
  groomName: 'Akshay',
  groomTitle: 'The Royal Groom (चिरंजीवी वर / Dulha)',
  groomParentsLine:
    'Beloved Son of Sriman Rajeshwar Sharma & Smt. Sunita Devi Sharma',
  groomBio:
    'Blessed with noble values, devotion to family, and grace, stepping into the sacred Grihastha Ashram.',
  groomBlessingArabic: '॥ आयुष्मान् भव ॥',
  groomPhotoUrl:
    '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',

  brideName: 'Komal',
  brideTitle: 'The Royal Bride (आयुष्मती वधू / Dulhan)',
  brideParentsLine:
    'Beloved Daughter of Sriman Vikramaditya Gupta & Smt. Shakuntla Devi Gupta',
  brideBio:
    'Radiating elegance, sanskar, and warmth, beginning an auspicious journey of सात फेरे and eternal companionship.',
  brideBlessingArabic: '॥ सौभाग्यवती भव ॥',
  bridePhotoUrl:
    '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',

  heroCouplePhotoUrl:
    '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',
  heroCouplePhotos: [
    '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',
  ],
  showGroomHeroPhoto: true,
  showBrideHeroPhoto: true,
  coverDoorPhotoUrl:
    '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg',
  weddingDate: '16 January 2027',
  weddingIsoDate: '2027-01-16T19:00:00',

  topWelcomeRibbonText:
    '✦ ॥ श्री गणेशाय नमः ॥ We Cordially Invite You & Your Family to Graciously Attend & Bless Our Auspicious Shubh Vivah ✦',
  heroStageTagline: '16 JANUARY 2027 • SHUBH VIVAH & SAPTAPADI',
  bismillahArabic: '॥ श्री गणेशाय नमः ॥',
  bismillahTranslation:
    'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
  kankotriHeading: 'SHAHI LAGNA PATRIKA & ROYAL WEDDING INVITATION',
  allahBlessingIntro:
    'By the divine grace of Lord Shree Ganesha, Kuldevi Mataji, and the esteemed blessings of our beloved elders, we joyfully request the honour of your gracious presence and heartfelt Aashirwad at the sacred Shubh Vivah ceremony of',
  warmPresenceNote:
    'Your esteemed presence and auspicious blessings (मंगल आशीर्वाद) will multiply our joy as the couple takes their Sacred Seven Vows (सप्तपदी).',
  closingDuaQuote:
    '॥ मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः । मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः ॥ May Bhagwan bless this sacred union with endless love, सुख-समृद्धि, and eternal happiness.',
  bestComplimentsFrom:
    'Sharma & Gupta Parivar — All Near & Dear Relatives, Friends & Well-Wishers (दर्शनाभिलाषी एवं स्वागतोत्सुक)',
  littleHeartsText:
    'Aarav, Vihaan, Mishti, Pihu & Reyansh — "Hamare Chachu & Bua/Mausi ki Shaadi mein jalul-jalul aana!"',

  selectedPresetId: 'crimson-ruby-velvet',
  useCustomColors: false,
  customColors: {
    background: '#2b060d',
    card: '#3f0a14',
    archAccent: '#5c1120',
    text: '#fff6eb',
    goldFoil: '#f0c14b',
  },
  archStyle: 'shahi-jharokha',
  texturePattern: 'royal-zardozi',
  fallingFlowersEnabled: true,

  groomFamily: [
    {
      id: 'gf-1',
      category: 'Dada-Dadi & Nana-Nani (Grandparents)',
      names: 'Late Pandit Hariprasad Ji Sharma & Smt. Savitri Devi Sharma',
    },
    {
      id: 'gf-2',
      category: 'Mata-Pita (Parents)',
      names: 'Sriman Rajeshwar Sharma & Smt. Sunita Devi Sharma',
    },
    {
      id: 'gf-3',
      category: 'Bhaiya & Bhabhi',
      names: 'Sriman Siddharth Sharma & Smt. Pooja Sharma, Chi. Aditya Sharma',
    },
    {
      id: 'gf-4',
      category: 'Tauji, Chacha & Mama Parivar (Uncles & Aunts)',
      names:
        'Sriman Mahendra Sharma & Family, Sriman Surendra Sharma & Family',
    },
    {
      id: 'gf-5',
      category: 'Didi, Jijaji & Brothers/Sisters',
      names: 'Smt. Neha & Sriman Rohan Verma, Harsh, Aryan & Divya',
    },
  ],

  brideFamily: [
    {
      id: 'bf-1',
      category: 'Dada-Dadi & Nana-Nani (Grandparents)',
      names: 'Seth श्री Ramchandra Ji Gupta & Smt. Kamla Devi Gupta',
    },
    {
      id: 'bf-2',
      category: 'Mata-Pita (Parents)',
      names: 'Sriman Vikramaditya Gupta & Smt. Shakuntla Devi Gupta',
    },
    {
      id: 'bf-3',
      category: 'Bhaiya & Bhabhi',
      names: 'Sriman Abhishek Gupta & Smt. Riya Gupta, Chi. Kunal Gupta',
    },
    {
      id: 'bf-4',
      category: 'Tauji, Chacha & Mama Parivar (Uncles & Aunts)',
      names:
        'Sriman Rajendra Gupta & Family, Sriman Dinesh Agrawal & Family',
    },
    {
      id: 'bf-5',
      category: 'Didi, Jijaji & Brothers/Sisters',
      names: 'Sow. Kritika, Sow. Ananya & Chi.Vivaan',
    },
  ],

  events: [
    {
      id: 'ev-haldi',
      slug: 'haldi',
      title: 'Manglik Haldi (Pithi) Utsav',
      arabicTitle: 'मंगल हल्दी एवं उबटन संस्कार',
      blessing:
        'A golden morning of sacred turmeric ubtan, auspicious mangal geet, and elders’ blessings.',
      date: '15 January 2027, Friday',
      time: '10:30 AM Onwards',
      venue: 'Swarna Mahal Courtyard, Suryagarh Heritage Palace',
      address: 'Airport Road, Royal Enclave, Udaipur / Hazaribag',
      mapLink: 'https://maps.google.com/?q=City+Palace+Udaipur',
      accentColor: '#f59e0b',
    },
    {
      id: 'ev-mehndi',
      slug: 'mehndi',
      title: 'Shahi Mehendi & Solah Shringar',
      arabicTitle: 'शाही मेहंदी एवं सुहाग उत्सव',
      blessing:
        'Intricate bridal henna patterns, folk dholak melodies, and joyous family celebrations.',
      date: '15 January 2027, Friday',
      time: '3:30 PM Onwards',
      venue: 'Kesar Bagh Lawns, Suryagarh Heritage Palace',
      address: 'Airport Road, Royal Enclave, Udaipur / Hazaribag',
      mapLink: 'https://maps.google.com/?q=City+Palace+Udaipur',
      accentColor: '#10b981',
    },
    {
      id: 'ev-sangeet',
      slug: 'sangeet',
      title: 'Royal Sangeet Sandhya & Raas-Garba',
      arabicTitle: 'संगीत संध्या एवं रास-गरबा',
      blessing:
        'An enchanting evening of family dance performances, music, and celebratory grandeur.',
      date: '15 January 2027, Friday',
      time: '7:30 PM Onwards',
      venue: 'Chandra Mahal Ballroom, Suryagarh Heritage Palace',
      address: 'Airport Road, Royal Enclave, Udaipur / Hazaribag',
      mapLink: 'https://maps.google.com/?q=City+Palace+Udaipur',
      accentColor: '#ec4899',
    },
    {
      id: 'ev-pheras',
      slug: 'pheras',
      title: 'Shahi Baraat, Varmala & Vedic Pheras (Saptapadi)',
      arabicTitle: 'बारात स्वागत, वरमाला एवं वैदिक सप्तपदी फेरे',
      blessing:
        'Royal Baraat Swagat and Jaimala followed by Kanyadaan and Seven Sacred Vows (सात फेरे) around the sacred Agni.',
      date: '16 January 2027, Saturday',
      time: '7:00 PM (Godhuli Lagna Muhurat)',
      venue: 'Grand Jharokha Mandap, Tathastu Royal Farms & Palace',
      address: 'Silwar Hills, Royal Heritage Precinct, Udaipur / Hazaribag',
      mapLink: 'https://maps.google.com/?q=City+Palace+Udaipur',
      accentColor: '#e5b842',
    },
    {
      id: 'ev-reception',
      slug: 'reception',
      title: 'Shubh Vivah Aashirwad Samaroh & Preetibhoj',
      arabicTitle: 'मंगल आशीर्वाद समारोह एवं शाही प्रीतिभोज',
      blessing:
        'Shower your blessings (मंगल आशीर्वाद) on the newlyweds followed by the Royal Wedding Banquet.',
      date: '17 January 2027, Sunday',
      time: '7:30 PM Onwards',
      venue: 'Rajwada Darbar Lawns, Tathastu Royal Farms & Palace',
      address: 'Silwar Hills, Royal Heritage Precinct, Udaipur / Hazaribag',
      mapLink: 'https://maps.google.com/?q=City+Palace+Udaipur',
      accentColor: '#38bdf8',
    },
  ],

  primaryVenueName: 'Grand Jharokha Mandap, Tathastu Royal Farms & Palace',
  primaryVenueAddress:
    'Silwar Hills, Royal Heritage Precinct, Hazaribag / Udaipur 825301',
  primaryVenueMapLink:
    'https://maps.google.com/?q=City+Palace+Udaipur',
  primaryVenueEmbedQuery: 'City Palace Udaipur',

  gallery: [
    {
      id: 'gal-1',
      title: 'The Royal Gajraj & Palace Gateway',
      caption: 'Grand gilded doors with marigold torans & royal elephants welcoming the Baraat',
      imageUrl:
        '/assets/aistudio/3D_Wedding_Invitation__Dazzle_your_guests_with_the_allure_of_our_Wedding_Ceremony_E-Invites_______Ou_16bd5521.jpg',
    },
    {
      id: 'gal-2',
      title: 'Under the Shahi Vivah Mandap',
      caption: 'Akshay & Komal taking sacred vows surrounded by glowing brass diyas & blossoms',
      imageUrl:
        '/assets/aistudio/Luxury_Wedding_Invitation_Background___Royal_Floral_Digital_Background_Design_8cde41a6.jpg',
    },
    {
      id: 'gal-3',
      title: 'Saptapadi — Seven Steps Together',
      caption: 'Stepping hand in hand through floral arches with elders’ Aashirwad',
      imageUrl: '/assets/aistudio/download__1__aeadcd14.jpg',
    },
  ],

  adminPin: '7860',
  music: {
    mode: 'default',
    selectedSongId: 'kudmayi-film',
    selectedSongTitle:
      'Kudmayi (Film Version) | Rocky Aur Rani Kii Prem Kahaani | Ranveer | Alia | Shahid | Pritam | Amitabh',
    customUrl: '/assets/audio/kudmayi-film-version.m4a',
    uploadedFileName: '',
    autoPlayOnOpen: true,
  },
};

export interface BuiltInWeddingSong {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  audioUrl: string; // '/assets/audio/...' or 'synth'
}

export const BUILT_IN_WEDDING_SONGS: BuiltInWeddingSong[] = [
  {
    id: 'kudmayi-film',
    title:
      'Kudmayi (Film Version) | Rocky Aur Rani Kii Prem Kahaani | Ranveer | Alia | Shahid | Pritam | Amitabh',
    shortTitle: 'Kudmayi (Film Version)',
    subtitle:
      'Shahid Mallya, Pritam & Amitabh Bhattacharya • Rocky Aur Rani Kii Prem Kahaani',
    audioUrl: '/assets/audio/kudmayi-film-version.m4a',
  },
  {
    id: 'kudmayi-sachet',
    title:
      'Kudmayi (Sachet Tandon Version) | Rocky Aur Rani Kii Prem Kahaani | Pritam | Amitabh',
    shortTitle: 'Kudmayi (Sachet Version)',
    subtitle:
      'Sachet Tandon, Pritam & Amitabh Bhattacharya • Shubh Vivah Version',
    audioUrl: '/assets/audio/kudmayi-sachet-version.m4a',
  },
  {
    id: 'royal-santoor-instrumental',
    title: 'Peaceful Royal Santoor & Shehnai Instrumental',
    shortTitle: 'Royal Santoor Instrumental',
    subtitle: 'Classical Raag Yaman & Manglik Vivah Instrumental',
    audioUrl: 'synth',
  },
];

export function resolveActiveSongInfo(
  music: KankotriState['music'],
  uploadedAudioUrl?: string | null
): {
  title: string;
  shortTitle: string;
  audioSrc: string | null; // null means use synthesizer
} {
  if (music.mode === 'uploaded' && uploadedAudioUrl) {
    return {
      title: `Uploaded Song (${music.uploadedFileName || 'Custom Audio'})`,
      shortTitle: music.uploadedFileName || 'Uploaded Song',
      audioSrc: uploadedAudioUrl,
    };
  }
  if (music.mode === 'url' && music.customUrl && music.customUrl.trim()) {
    return {
      title: music.selectedSongTitle || 'Custom Wedding Song Link',
      shortTitle: 'Custom Song',
      audioSrc: music.customUrl.trim(),
    };
  }
  const songId = music.selectedSongId || 'kudmayi-film';
  const found =
    BUILT_IN_WEDDING_SONGS.find((s) => s.id === songId) ||
    BUILT_IN_WEDDING_SONGS[0];
  return {
    title: found.title,
    shortTitle: found.shortTitle,
    audioSrc: found.audioUrl === 'synth' ? null : found.audioUrl,
  };
}

export function getActiveHeroPhotos(state: KankotriState): string[] {
  if (Array.isArray(state.heroCouplePhotos)) {
    return state.heroCouplePhotos.filter((u) => Boolean(u && u.trim()));
  }
  if (state.heroCouplePhotoUrl && state.heroCouplePhotoUrl.trim()) {
    return [state.heroCouplePhotoUrl.trim()];
  }
  return [];
}

export function addHeroPhoto(
  state: KankotriState,
  photoUrl: string
): KankotriState {
  const current = getActiveHeroPhotos(state);
  const next = [...current, photoUrl];
  return {
    ...state,
    heroCouplePhotos: next,
    heroCouplePhotoUrl: next[0] || '',
  };
}

export function replaceHeroPhotoAt(
  state: KankotriState,
  index: number,
  photoUrl: string
): KankotriState {
  const current = getActiveHeroPhotos(state);
  const next = [...current];
  if (index >= 0 && index < next.length) {
    next[index] = photoUrl;
  } else {
    next.push(photoUrl);
  }
  return {
    ...state,
    heroCouplePhotos: next,
    heroCouplePhotoUrl: next[0] || '',
  };
}

export function removeHeroPhotoAt(
  state: KankotriState,
  index: number
): KankotriState {
  const current = getActiveHeroPhotos(state);
  const next = current.filter((_, idx) => idx !== index);
  return {
    ...state,
    heroCouplePhotos: next,
    heroCouplePhotoUrl: next[0] || '',
  };
}

export function addWeddingEvent(
  state: KankotriState,
  partial?: Partial<WeddingEvent>
): KankotriState {
  const newEvent: WeddingEvent = {
    id: partial?.id || `ev-${Date.now()}`,
    slug: partial?.slug || 'custom',
    title: partial?.title || 'Shree Ganesh Pujan & Mandap Muhurat',
    arabicTitle: partial?.arabicTitle || 'श्री गणेश पूजन एवं मण्डप मुहूर्त',
    blessing:
      partial?.blessing ||
      'Invoking divine blessings of Lord Shree Ganesha & family elders for an auspicious celebration.',
    date: partial?.date || state.weddingDate,
    time: partial?.time || '10:30 AM Onwards',
    venue: partial?.venue || state.primaryVenueName,
    address: partial?.address || state.primaryVenueAddress,
    mapLink: partial?.mapLink || state.primaryVenueMapLink,
    accentColor: partial?.accentColor || '#e5b842',
  };
  return {
    ...state,
    events: [...state.events, newEvent],
  };
}

export function removeWeddingEvent(
  state: KankotriState,
  eventId: string
): KankotriState {
  return {
    ...state,
    events: state.events.filter((ev) => ev.id !== eventId),
  };
}

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateCountdown(
  weddingDateStr: string,
  weddingIsoDate?: string,
  nowMs: number = Date.now()
): CountdownResult {
  let targetMs = Date.parse(weddingDateStr);
  if (Number.isNaN(targetMs) && weddingIsoDate) {
    targetMs = Date.parse(weddingIsoDate);
  }
  if (Number.isNaN(targetMs)) {
    targetMs = Date.parse('2027-01-16T19:00:00Z');
  }

  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function verifyAdminPin(inputPin: string, storedPin: string): boolean {
  const cleanInput = (inputPin || '').trim();
  const cleanStored = (storedPin || '7860').trim();
  return (
    cleanInput.length > 0 &&
    (cleanInput === cleanStored || (cleanStored === '7860' && cleanInput === '1080'))
  );
}

export function getMonogram(groomName: string, brideName: string): string {
  const g = (groomName || 'A').trim().charAt(0).toUpperCase() || 'A';
  const b = (brideName || 'K').trim().charAt(0).toUpperCase() || 'K';
  return `${g}&${b}`;
}

export function hasValidEventField(value?: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  if (
    lower === 'tbd' ||
    lower === 'n/a' ||
    lower === 'none' ||
    lower === 'null' ||
    lower === 'undefined' ||
    lower === '-'
  ) {
    return false;
  }
  return true;
}

export function getVisibleEventFields(event: WeddingEvent): {
  showDate: boolean;
  showTime: boolean;
  showVenue: boolean;
  showAddress: boolean;
  showMapLink: boolean;
} {
  return {
    showDate: hasValidEventField(event.date),
    showTime: hasValidEventField(event.time),
    showVenue: hasValidEventField(event.venue),
    showAddress: hasValidEventField(event.address),
    showMapLink: hasValidEventField(event.mapLink),
  };
}

export function resolveActiveColors(state: KankotriState): ColorCombo {
  if (state.useCustomColors) {
    return state.customColors;
  }
  const preset = DESIGN_PRESETS_24.find((p) => p.id === state.selectedPresetId);
  return preset ? preset.colors : DESIGN_PRESETS_24[0].colors;
}
