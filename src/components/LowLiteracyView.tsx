import React from 'react';
import {
  Volume2,
  Sun,
  Moon,
  Utensils,
  Droplet,
  Calendar,
  AlertTriangle,
  Heart,
  Pill,
  Smile,
  Shield,
} from 'lucide-react';
import { DocumentAnalysis, SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';

interface LowLiteracyViewProps {
  currentDocument: DocumentAnalysis;
  currentLanguage: SupportedLanguage;
}

export const LowLiteracyView: React.FC<LowLiteracyViewProps> = ({
  currentDocument,
  currentLanguage,
}) => {
  const handleSpeak = (text: string) => {
    speechService.stop();
    speechService.speak({
      text,
      language: currentLanguage,
      rate: 0.85,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Visual guidance banner */}
      <div className="bg-teal-800 text-white p-5 rounded-3xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
            🖼️
          </div>
          <div>
            <h2 className="text-xl font-black">Picture & Audio Guide</h2>
            <p className="text-xs text-teal-100">
              Simple pictures, 1-sentence points, and audio for easy understanding
            </p>
          </div>
        </div>
      </div>

      {/* Main Picture Card: What happened? */}
      <div className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center text-3xl">
            ❤️
          </div>
          <div>
            <span className="text-xs font-black uppercase text-teal-700">Health Update</span>
            <h3 className="text-xl font-bold text-slate-900">Your Heart Stent is Healing Well</h3>
            <p className="text-sm text-slate-700 font-semibold mt-0.5">
              Doctors opened your blood vessel. Take medicines daily.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            handleSpeak(
              'Your heart blood vessel is healing well. Doctors placed a stent. Please take your daily medicine and rest well.'
            )
          }
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm"
        >
          <Volume2 className="w-5 h-5" />
          <span>Press to Listen</span>
        </button>
      </div>

      {/* Pictorial Routine Schedule */}
      <div>
        <h3 className="text-lg font-black text-slate-900 mb-3 px-1">
          Your Daily Schedule (Morning &bull; Afternoon &bull; Night)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Morning Routine Card */}
          <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 bg-amber-200 text-amber-900 rounded-2xl flex items-center justify-center">
                  <Sun className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-amber-950">Morning (ಬೆಳಿಗ್ಗೆ)</h4>
                  <span className="text-xs font-bold text-amber-800">After Breakfast</span>
                </div>
              </div>
              <div className="text-2xl">🌅</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <Utensils className="w-4 h-4 text-emerald-600" />
                <span>Eat breakfast first.</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <Pill className="w-4 h-4 text-purple-600" />
                <span>Take 2 morning heart tablets with water.</span>
              </div>
            </div>

            <button
              onClick={() =>
                handleSpeak(
                  'Morning routine: First eat your breakfast. Then swallow your morning heart tablets with a glass of water.'
                )
              }
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Morning Routine</span>
            </button>
          </div>

          {/* Night Routine Card */}
          <div className="bg-indigo-50 rounded-3xl p-5 border-2 border-indigo-300 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 bg-indigo-200 text-indigo-900 rounded-2xl flex items-center justify-center">
                  <Moon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-indigo-950">Night (ರಾತ್ರಿ)</h4>
                  <span className="text-xs font-bold text-indigo-800">Before Bedtime</span>
                </div>
              </div>
              <div className="text-2xl">🌙</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-indigo-200 space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <Pill className="w-4 h-4 text-indigo-600" />
                <span>Take 1 cholesterol tablet before sleep.</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <Droplet className="w-4 h-4 text-blue-600" />
                <span>Drink half glass of water.</span>
              </div>
            </div>

            <button
              onClick={() =>
                handleSpeak(
                  'Night routine: Before going to bed, take your cholesterol tablet with water.'
                )
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Night Routine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pictorial Appointment Card */}
      <div className="bg-blue-50 rounded-3xl p-6 border-2 border-blue-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-blue-200 rounded-2xl flex items-center justify-center text-3xl">
            🏥
          </div>
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase">Hospital Visit</span>
            <h4 className="text-lg font-black text-blue-950">Meet Doctor in 7 Days</h4>
            <p className="text-xs text-blue-900 font-semibold mt-0.5">
              Bring your paper and medicine box.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            handleSpeak(
              'Visit your doctor next week on Wednesday. Remember to bring your hospital papers and all medicine boxes.'
            )
          }
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen to Visit Details</span>
        </button>
      </div>
    </div>
  );
};
