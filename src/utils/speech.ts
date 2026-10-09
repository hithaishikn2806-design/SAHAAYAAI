import { SupportedLanguage } from '../types';

export interface SpeakOptions {
  text: string;
  language: SupportedLanguage;
  rate?: number; // 0.75, 1.0, 1.25
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
  onError?: (err: any) => void;
}

const LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  kn: 'kn-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
};

class SpeechService {
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public speak(options: SpeakOptions): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options.onStart?.();
      setTimeout(() => options.onEnd?.(), 2500);
      return false;
    }

    try {
      this.stop();

      const utterance = new SpeechSynthesisUtterance(options.text);
      utterance.lang = LANG_MAP[options.language] || 'en-IN';
      utterance.rate = options.rate || 0.95;
      utterance.pitch = 1.0;

      // Try finding the closest matching voice
      const voices = window.speechSynthesis.getVoices();
      const targetLang = utterance.lang.toLowerCase();
      const matchedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase() === targetLang ||
          v.lang.toLowerCase().startsWith(options.language)
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        options.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        options.onError?.(e);
        options.onEnd?.();
      };

      utterance.onboundary = (e) => {
        if (options.onBoundary) {
          options.onBoundary(e.charIndex);
        }
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      options.onError?.(err);
      options.onEnd?.();
      return false;
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public pause(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Helper for voice recognition
  public createRecognition(
    language: SupportedLanguage,
    onResult: (text: string) => void,
    onError: (err: any) => void
  ): { start: () => void; stop: () => void } {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return {
        start: () => {
          onError(new Error('Speech recognition not supported in browser.'));
        },
        stop: () => {},
      };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_MAP[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      onError(event.error);
    };

    return {
      start: () => {
        try {
          recognition.start();
        } catch (_e) {}
      },
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {}
      },
    };
  }
}

export const speechService = new SpeechService();
