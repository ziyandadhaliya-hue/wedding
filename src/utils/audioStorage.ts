// IndexedDB storage for Owner uploaded audio files (MP3 / M4A / WAV / OGG)
// + Peaceful Royal Santoor/Oud synthesizer for out-of-the-box reliability

const DB_NAME = 'shahi_kankotri_audio_db';
const STORE_NAME = 'uploaded_songs';
const AUDIO_KEY = 'owner_wedding_song';

export interface StoredAudioRecord {
  blob: Blob;
  fileName: string;
  mimeType: string;
  updatedAt: number;
}

function openAudioDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveUploadedAudioToDb(file: File): Promise<string> {
  const db = await openAudioDb();
  const record: StoredAudioRecord = {
    blob: file,
    fileName: file.name,
    mimeType: file.type || 'audio/mpeg',
    updatedAt: Date.now(),
  };
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record, AUDIO_KEY);
    req.onsuccess = () => {
      const url = URL.createObjectURL(file);
      resolve(url);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function loadUploadedAudioFromDb(): Promise<{
  objectUrl: string;
  fileName: string;
} | null> {
  try {
    const db = await openAudioDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(AUDIO_KEY);
      req.onsuccess = () => {
        const result = req.result as StoredAudioRecord | undefined;
        if (result && result.blob) {
          resolve({
            objectUrl: URL.createObjectURL(result.blob),
            fileName: result.fileName,
          });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function clearUploadedAudioFromDb(): Promise<void> {
  try {
    const db = await openAudioDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(AUDIO_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore if unavailable
  }
}

/**
 * Serene Royal Islamic Instrumental Synthesizer (Web Audio API)
 * Plays a gentle, peacefulHijaz/Yaman-inspired santoor & harp arpeggio
 * when default instrumental mode is selected.
 */
export class RoyalInstrumentalSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;

  // Peaceful Yaman/Hijaz royal scale frequencies (Hz)
  private readonly melodyNotes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    493.88, // B4
    440.0,  // A4
    392.0,  // G4
    329.63, // E4
    349.23, // F4
    329.63, // E4
    293.66, // D4
    261.63, // C4
    196.0,  // G3
    246.94, // B3
  ];

  public start(): void {
    if (this.isPlaying) return;
    if (typeof window === 'undefined') return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private scheduleNextNote = (): void => {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const freq = this.melodyNotes[this.step % this.melodyNotes.length];

    // Warm plucked santoor/harp tone
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 1.85);
    subOsc.stop(now + 1.85);

    this.step += 1;
    this.timerId = window.setTimeout(this.scheduleNextNote, 680);
  };

  public stop(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}
