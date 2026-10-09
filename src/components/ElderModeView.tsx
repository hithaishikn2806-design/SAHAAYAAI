import React from 'react';
import {
  Volume2,
  Calendar,
  Pill,
  Sun,
  Moon,
  Clock,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { DocumentAnalysis, SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';

interface ElderModeViewProps {
  currentDocument: DocumentAnalysis;
  currentLanguage: SupportedLanguage;
  onOpenVoice: () => void;
  onOpenEmergency: () => void;
}

export const ElderModeView: React.FC<ElderModeViewProps> = ({
  currentDocument,
  currentLanguage,
  onOpenVoice,
  onOpenEmergency,
}) => {
  const summaryText =
    currentDocument.plainSummary[currentLanguage] || currentDocument.plainSummary.en;

  const handleSpeak = (text: string) => {
    speechService.stop();
    speechService.speak({
      text,
      language: currentLanguage,
      rate: 0.85, // Slower for elder clarity
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Elder Mode Banner */}
      <div className="bg-emerald-800 text-white p-5 rounded-3xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <UserCheck className="w-8 h-8 text-emerald-100" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Elder Mode Active</h2>
            <p className="text-sm text-emerald-100 font-medium">
              Simplified interface with extra large text and voice reading
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEmergency}
          className="bg-rose-600 hover:bg-rose-700 text-white font-black px-5 py-3 rounded-2xl text-base shadow-lg transition flex items-center gap-2"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Call 108 / 112</span>
        </button>
      </div>

      {/* Card 1: Read Summary Aloud (Giant Button) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md">
        <div className="text-xs font-black uppercase text-emerald-700 tracking-wider mb-1">
          Your Health Summary
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">
          {currentDocument.title}
        </h3>

        <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold mb-6">
          {summaryText}
        </p>

        <button
          onClick={() => handleSpeak(summaryText)}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-lg active:scale-98 transition cursor-pointer"
        >
          <Volume2 className="w-7 h-7" />
          <span>Tap to Listen Aloud</span>
        </button>
      </div>

      {/* Card 2: Daily Medicines & Routine (Giant Blocks) */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 px-1">
          What to do every day:
        </h3>

        {currentDocument.instructions.map((inst, idx) => (
          <div
            key={inst.id}
            className="bg-white rounded-3xl p-6 border-2 border-slate-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-800 shrink-0">
                {inst.timeOfDay === 'morning' ? (
                  <Sun className="w-8 h-8 text-amber-500" />
                ) : inst.timeOfDay === 'night' ? (
                  <Moon className="w-8 h-8 text-indigo-500" />
                ) : (
                  <Pill className="w-8 h-8 text-emerald-700" />
                )}
              </div>
              <div>
                <span className="text-xs font-black uppercase bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full">
                  {inst.timeOfDay}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {inst.title}
                </h4>
                <p className="text-base text-slate-700 font-medium mt-1 leading-snug">
                  {inst.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSpeak(inst.title + '. ' + inst.description)}
              className="bg-slate-100 hover:bg-emerald-100 border border-slate-300 text-slate-800 hover:text-emerald-900 font-bold px-5 py-3 rounded-2xl text-base flex items-center gap-2 shrink-0 transition"
              aria-label={`Listen to instruction ${idx + 1}`}
            >
              <Volume2 className="w-5 h-5 text-emerald-700" />
              <span>Read</span>
            </button>
          </div>
        ))}
      </div>

      {/* Card 3: Next Doctor Visit (Giant Card) */}
      <div className="bg-blue-50 border-2 border-blue-400 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-xs font-black uppercase text-blue-800 tracking-wider mb-1">
          Your Next Doctor Visit
        </div>
        <h4 className="text-2xl font-black text-blue-950">
          {currentDocument.followUp.doctorName}
        </h4>
        <div className="text-lg font-bold text-blue-900 mt-2">
          📅 {currentDocument.followUp.date}
        </div>
        <div className="text-base font-semibold text-blue-800 mt-1">
          📍 {currentDocument.followUp.hospital}
        </div>

        <button
          onClick={() =>
            handleSpeak(
              `Your next visit is with ${currentDocument.followUp.doctorName} on ${currentDocument.followUp.date} at ${currentDocument.followUp.hospital}. Please carry your discharge papers and medicines.`
            )
          }
          className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 px-6 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-md transition"
        >
          <Volume2 className="w-6 h-6" />
          <span>Read Appointment Details</span>
        </button>
      </div>

      {/* Giant Voice Assistant trigger */}
      <button
        onClick={onOpenVoice}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black py-5 px-6 rounded-3xl text-xl flex items-center justify-center gap-3 shadow-xl active:scale-98 transition"
      >
        <span>🎤 Tap to Ask SAHAAYAAI a Question</span>
      </button>
    </div>
  );
};
