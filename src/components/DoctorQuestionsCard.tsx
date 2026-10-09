import React, { useState } from 'react';
import { HelpCircle, MessageSquareQuote, Volume2, Copy, Check, Share2 } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';

interface DoctorQuestionsCardProps {
  questionsMultilingual: {
    en: string[];
    kn: string[];
    hi: string[];
    ta: string[];
    te: string[];
  };
  currentLanguage: SupportedLanguage;
  doctorName?: string;
}

export const DoctorQuestionsCard: React.FC<DoctorQuestionsCardProps> = ({
  questionsMultilingual,
  currentLanguage,
  doctorName,
}) => {
  const [copied, setCopied] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const questions = questionsMultilingual[currentLanguage] || questionsMultilingual.en;

  const handleSpeakQuestion = (q: string, idx: number) => {
    if (speakingIndex === idx) {
      speechService.stop();
      setSpeakingIndex(null);
      return;
    }

    speechService.stop();
    setSpeakingIndex(idx);
    speechService.speak({
      text: q,
      language: currentLanguage,
      onEnd: () => setSpeakingIndex(null),
      onError: () => setSpeakingIndex(null),
    });
  };

  const handleCopyQuestions = () => {
    const text = `Questions for ${doctorName || 'Doctor'} (Prepared by SAHAAYAAI):\n` +
      questions.map((q, i) => `${i + 1}. ${q}`).join('\n') +
      `\n\n(Brought by patient & caregiver for OPD consultation)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
              <MessageSquareQuote className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              Questions to Ask Your Doctor ({doctorName || 'Follow-up Visit'})
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Empowering patients and rural caregivers with clear, respectful inquiries for their next clinic consultation
          </p>
        </div>

        <button
          onClick={handleCopyQuestions}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
          title="Copy questions to phone clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Question Sheet'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isSpeaking = speakingIndex === idx;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition flex items-start gap-3 ${
                isSpeaking
                  ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-100'
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-blue-300'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {q}
                </p>
              </div>

              <button
                onClick={() => handleSpeakQuestion(q, idx)}
                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                  isSpeaking
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 hover:text-blue-700 border-slate-200'
                }`}
                title="Listen to this question"
                aria-label={`Listen to question ${idx + 1}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Patient Empowerment Note:</span> Write these questions down or show your smartphone to the doctor at the clinic. Never feel shy to ask your doctor to clarify medication timings!
        </p>
      </div>
    </div>
  );
};
