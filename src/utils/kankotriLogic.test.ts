import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addHeroPhoto,
  addWeddingEvent,
  BUILT_IN_WEDDING_SONGS,
  calculateCountdown,
  DEFAULT_KANKOTRI_STATE,
  DESIGN_PRESETS_24,
  getActiveHeroPhotos,
  getMonogram,
  getVisibleEventFields,
  hasValidEventField,
  removeHeroPhotoAt,
  removeWeddingEvent,
  replaceHeroPhotoAt,
  resolveActiveColors,
  resolveActiveSongInfo,
  verifyAdminPin,
} from './kankotriLogic';

test('Default wedding song is Kudmayi (Film Version) from Rocky Aur Rani Kii Prem Kahaani', () => {
  const active = resolveActiveSongInfo(DEFAULT_KANKOTRI_STATE.music);
  assert.equal(
    active.title,
    'Kudmayi (Film Version) | Rocky Aur Rani Kii Prem Kahaani | Ranveer | Alia | Shahid | Pritam | Amitabh'
  );
  assert.equal(active.shortTitle, 'Kudmayi (Film Version)');
  assert.equal(active.audioSrc, '/assets/audio/kudmayi-film-version.m4a');
  assert.equal(BUILT_IN_WEDDING_SONGS[0].id, 'kudmayi-film');
});

test('DESIGN_PRESETS_24 contains exactly 24 distinct royal design presets', () => {
  assert.equal(DESIGN_PRESETS_24.length, 24);
  const ids = new Set(DESIGN_PRESETS_24.map((p) => p.id));
  assert.equal(ids.size, 24);
});

test('DEFAULT_KANKOTRI_STATE matches Royal Hindu Wedding (Shahi Vivah Kankotri) details', () => {
  assert.equal(DEFAULT_KANKOTRI_STATE.groomName, 'Akshay');
  assert.equal(
    DEFAULT_KANKOTRI_STATE.groomParentsLine,
    'Beloved Son of Sriman Rajeshwar Sharma & Smt. Sunita Devi Sharma'
  );
  assert.equal(DEFAULT_KANKOTRI_STATE.brideName, 'Komal');
  assert.equal(
    DEFAULT_KANKOTRI_STATE.brideParentsLine,
    'Beloved Daughter of Sriman Vikramaditya Gupta & Smt. Shakuntla Devi Gupta'
  );
  assert.equal(DEFAULT_KANKOTRI_STATE.bismillahArabic, '॥ श्री गणेशाय नमः ॥');
  assert.equal(DEFAULT_KANKOTRI_STATE.weddingDate, '16 January 2027');
  assert.equal(DEFAULT_KANKOTRI_STATE.events.length, 5);
  assert.deepEqual(
    DEFAULT_KANKOTRI_STATE.events.map((e) => e.slug),
    ['haldi', 'mehndi', 'sangeet', 'pheras', 'reception']
  );
});

test('addWeddingEvent and removeWeddingEvent allow adding and removing Manglik Vivah Ceremonies', () => {
  const withAdded = addWeddingEvent(DEFAULT_KANKOTRI_STATE, {
    id: 'ev-custom-1',
    title: 'Tilak & Sagai Samaroh',
    arabicTitle: 'तिलक एवं सगाई समारोह',
  });
  assert.equal(withAdded.events.length, 6);
  assert.equal(withAdded.events[5].title, 'Tilak & Sagai Samaroh');

  const afterRemoved = removeWeddingEvent(withAdded, 'ev-custom-1');
  assert.equal(afterRemoved.events.length, 5);

  const afterRemoveHaldi = removeWeddingEvent(afterRemoved, 'ev-haldi');
  assert.equal(afterRemoveHaldi.events.length, 4);
});

test('Hero photo helpers allow adding, changing/replacing, and removing Hero Banner photos', () => {
  const initialPhotos = getActiveHeroPhotos(DEFAULT_KANKOTRI_STATE);
  assert.equal(initialPhotos.length, 1);

  const withSecondPhoto = addHeroPhoto(
    DEFAULT_KANKOTRI_STATE,
    '/assets/aistudio/download__1__aeadcd14.jpg'
  );
  assert.equal(getActiveHeroPhotos(withSecondPhoto).length, 2);

  const withReplacedFirst = replaceHeroPhotoAt(
    withSecondPhoto,
    0,
    'data:image/png;base64,customHero1'
  );
  assert.equal(
    getActiveHeroPhotos(withReplacedFirst)[0],
    'data:image/png;base64,customHero1'
  );

  const afterRemoveFirst = removeHeroPhotoAt(withReplacedFirst, 0);
  assert.equal(getActiveHeroPhotos(afterRemoveFirst).length, 1);
  assert.equal(
    getActiveHeroPhotos(afterRemoveFirst)[0],
    '/assets/aistudio/download__1__aeadcd14.jpg'
  );

  const afterRemoveAll = removeHeroPhotoAt(afterRemoveFirst, 0);
  assert.equal(getActiveHeroPhotos(afterRemoveAll).length, 0);
});

test('verifyAdminPin validates default PINs 7860 and 1080', () => {
  assert.equal(verifyAdminPin('7860', '7860'), true);
  assert.equal(verifyAdminPin('1080', '7860'), true);
  assert.equal(verifyAdminPin('0000', '7860'), false);
  assert.equal(verifyAdminPin('', '7860'), false);
});

test('getMonogram extracts couple initials properly', () => {
  assert.equal(getMonogram('Akshay', 'Komal'), 'A&K');
  assert.equal(getMonogram('Aarav', 'Ananya'), 'A&A');
});

test('hasValidEventField and getVisibleEventFields hide blank or placeholder fields', () => {
  assert.equal(hasValidEventField('16 January 2027'), true);
  assert.equal(hasValidEventField(''), false);
  assert.equal(hasValidEventField('   '), false);
  assert.equal(hasValidEventField('TBD'), false);
  assert.equal(hasValidEventField('N/A'), false);

  const partialEvent = {
    ...DEFAULT_KANKOTRI_STATE.events[0],
    date: '14 January 2027',
    time: '',
    venue: 'TBD',
    address: 'Udaipur',
    mapLink: '   ',
  };
  const visibility = getVisibleEventFields(partialEvent);
  assert.equal(visibility.showDate, true);
  assert.equal(visibility.showTime, false);
  assert.equal(visibility.showVenue, false);
  assert.equal(visibility.showAddress, true);
  assert.equal(visibility.showMapLink, false);
});

test('calculateCountdown computes days, hours, minutes, seconds accurately', () => {
  const now = Date.parse('2027-01-14T19:00:00Z');
  const targetIso = '2027-01-16T19:00:00Z';
  const result = calculateCountdown('invalid-date-str', targetIso, now);
  assert.equal(result.isPast, false);
  assert.equal(result.days, 2);
  assert.equal(result.hours, 0);
  assert.equal(result.minutes, 0);
  assert.equal(result.seconds, 0);
});

test('resolveActiveColors switches between preset and custom color mixer', () => {
  const presetColors = resolveActiveColors(DEFAULT_KANKOTRI_STATE);
  assert.equal(presetColors.background, '#2b060d');

  const customState = {
    ...DEFAULT_KANKOTRI_STATE,
    useCustomColors: true,
    customColors: {
      background: '#112233',
      card: '#223344',
      archAccent: '#334455',
      text: '#ffffff',
      goldFoil: '#ffcc00',
    },
  };
  const activeCustom = resolveActiveColors(customState);
  assert.equal(activeCustom.background, '#112233');
  assert.equal(activeCustom.goldFoil, '#ffcc00');
});
