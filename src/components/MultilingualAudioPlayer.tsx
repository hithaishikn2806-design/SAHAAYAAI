import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Languages,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoDocuments';
import { speechService } from '../utils/speech';

interface MultilingualAudioPlayerProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  textToSpeak: string;
  multilingualSummaries: {
    en: string;
    kn: string;
    hi: string;
    ta: string;
    te: string;
  };
  speechRate: number;
  triggerAudioNow?: boolean;
}

export const MultilingualAudioPlayer: React.FC<MultilingualAudioPlayerProps> = ({
  currentLanguage,
  onLanguageChange,
  multilingualSummaries,
  speechRate,
  triggerAudioNow,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedProgress, setHighlightedProgress] = useState<number>(0);

  const activeText = multilingualSummaries[currentLanguage] || multilingualSummaries.en;
  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  useEffect(() => {
    if (triggerAudioNow) {
      handlePlay();
    }
  }, [triggerAudioNow]);

  const handlePlay = () => {
    speechService.stop();
    setIsPlaying(true);
    setHighlightedProgress(0);

    const started = speechService.speak({
      text: activeText,
      language: currentLanguage,
      rate: speechRate,
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        setIsPlaying(false);
        setHighlightedProgress(100);
      },
      onBoundary: (charIndex) => {
        if (activeText.length > 0) {
          const progress = Math.min(100, Math.round((charIndex / activeText.length) * 100));
          setHighlightedProgress(progress);
        }
      },
      onError: () => setIsPlaying(false),
    });

    if (!started) {
      // simulated speech playback for environments without audio drivers
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setHighlightedProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
        }
      }, 150);
    }
  };

  const handleStop = () => {
    speechService.stop();
    setIsPlaying(false);
    setHighlightedProgress(0);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-xs mb-5">
      {/* Top language header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
            <Languages className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Multilingual Explanation & Audio Reader
            </h3>
            <p className="text-xs text-slate-600">
              Listen in your mother tongue &bull; Preserves original medical accuracy
            </p>
          </div>
        </div>

        {/* Audio Action Buttons */}
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
              aria-label={`Listen to explanation in ${currentLangMeta?.name}`}
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen in {currentLangMeta?.name}</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
              aria-label="Stop audio reader"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Audio</span>
            </button>
          )}

          <button
            onClick={() => {
              handleStop();
              setTimeout(() => handlePlay(), 100);
            }}
            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition cursor-pointer"
            title="Replay from start"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-emerald-100">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                if (isPlaying) {
                  speechService.stop();
                  setIsPlaying(false);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-100/50 border border-slate-200'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.nativeName}</span>
              <span className="text-[11px] font-normal opacity-80">({lang.name})</span>
            </button>
          );
        })}
      </div>

      {/* Highlighted text display */}
      <div
        className={`relative p-4 rounded-xl border transition-all ${
          isPlaying
            ? 'bg-emerald-100/40 border-emerald-400 ring-2 ring-emerald-200'
            : 'bg-white border-emerald-200'
        }`}
      >
        {isPlaying && (
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-800">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Reading aloud in {currentLangMeta?.nativeName} ({currentLangMeta?.name})...</span>
          </div>
        )}

        <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          {activeText}
        </p>

        {/* Audio reading progress bar */}
        {isPlaying && (
          <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-200"
              style={{ width: `${Math.max(8, highlightedProgress)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
