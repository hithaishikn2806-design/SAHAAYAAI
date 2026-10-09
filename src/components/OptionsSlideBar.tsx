import React from 'react';
import {
  X,
  Sliders,
  UserCheck,
  Eye,
  Ear,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Gauge,
  Languages,
  Phone,
  Pill,
  Users,
  Compass,
  CheckCircle2,
  AlertTriangle,
  User,
  Heart,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AccessibilityMode, SupportedLanguage, PatientProfile } from '../types';
import { t } from '../utils/i18n';

interface OptionsSlideBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AccessibilityMode;
  onModeChange: (mode: AccessibilityMode) => void;
  fontSizeMultiplier: number;
  onFontSizeChange: (factor: number) => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeProfile: PatientProfile;
  profiles: PatientProfile[];
  onSelectProfile: (id: string) => void;
  onOpenEditPatient: () => void;
  onOpenVisualReferences?: () => void;
  onOpenEmergency?: () => void;
}

export const OptionsSlideBar: React.FC<OptionsSlideBarProps> = ({
  isOpen,
  onClose,
  currentMode,
  onModeChange,
  fontSizeMultiplier,
  onFontSizeChange,
  speechRate,
  onSpeechRateChange,
  currentLanguage,
  onLanguageChange,
  activeProfile,
  profiles,
  onSelectProfile,
  onOpenEditPatient,
  onOpenVisualReferences,
  onOpenEmergency,
}) => {
  if (!isOpen) return null;

  const modes: Array<{
    id: AccessibilityMode;
    labelKey: 'standardMode' | 'elderMode' | 'visionMode' | 'hearingMode' | 'lowLiteracyMode';
    descKey: 'standardDesc' | 'elderDesc' | 'visionDesc' | 'hearingDesc' | 'lowLiteracyDesc';
    icon: React.ReactNode;
    color: string;
    activeBg: string;
  }> = [
    {
      id: 'standard',
      labelKey: 'standardMode',
      descKey: 'standardDesc',
      icon: <Sliders className="w-5 h-5 text-blue-600" />,
      color: 'border-slate-200 hover:border-blue-300',
      activeBg: 'bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-200',
    },
    {
      id: 'elder',
      labelKey: 'elderMode',
      descKey: 'elderDesc',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      color: 'border-slate-200 hover:border-emerald-300',
      activeBg: 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200',
    },
    {
      id: 'vision',
      labelKey: 'visionMode',
      descKey: 'visionDesc',
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      color: 'border-slate-200 hover:border-indigo-300',
      activeBg: 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-200',
    },
    {
      id: 'hearing',
      labelKey: 'hearingMode',
      descKey: 'hearingDesc',
      icon: <Ear className="w-5 h-5 text-amber-600" />,
      color: 'border-slate-200 hover:border-amber-300',
      activeBg: 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200',
    },
    {
      id: 'low-literacy',
      labelKey: 'lowLiteracyMode',
      descKey: 'lowLiteracyDesc',
      icon: <ImageIcon className="w-5 h-5 text-teal-600" />,
      color: 'border-slate-200 hover:border-teal-300',
      activeBg: 'bg-teal-50 border-teal-500 text-teal-950 ring-2 ring-teal-200',
    },
  ];

  const languages: Array<{
    code: SupportedLanguage;
    name: string;
    nativeName: string;
    flag: string;
  }> = [
    { code: 'en', name: 'English', nativeName: 'English (IN)', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🟡' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🟠' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🔴' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🟣' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide bar panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          role="dialog"
          aria-label="Options and Accessibility Slide Bar"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
        >
          {/* Slide Bar Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {t('slideBarTitle', currentLanguage)}
                </h3>
                <p className="text-[11px] text-indigo-200 mt-0.5">
                  {t('slideBarSubtitle', currentLanguage)}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Close options"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Bar Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Active Patient Card with Edit Button */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {t('activePatient', currentLanguage)}
                </span>
                <button
                  onClick={() => {
                    onOpenEditPatient();
                    onClose();
                  }}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs transition"
                >
                  ✏️ {t('editPatient', currentLanguage)}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  {activeProfile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{activeProfile.name}</h4>
                  <p className="text-xs text-slate-600">
                    {activeProfile.relationship} &bull; {activeProfile.age} Yrs &bull; {activeProfile.bloodGroup}
                  </p>
                </div>
              </div>

              {/* Quick switch between family members */}
              <div className="pt-2 border-t border-indigo-200/60">
                <span className="text-[11px] font-bold text-indigo-900 block mb-1.5">
                  {t('switchPatient', currentLanguage)}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectProfile(p.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        p.id === activeProfile.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Languages className="w-4 h-4 text-indigo-600" />
                <span>{t('language', currentLanguage)}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      currentLanguage === l.code
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold leading-tight">{l.nativeName}</div>
                      <div className={`text-[10px] ${currentLanguage === l.code ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {l.name}
                      </div>
                    </div>
                    <span className="text-base">{l.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Modes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>{t('accessibilityModes', currentLanguage)}</span>
              </div>

              <div className="space-y-2">
                {modes.map((m) => {
                  const isActive = currentMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onModeChange(m.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-start gap-3 ${
                        isActive ? m.activeBg : `bg-white ${m.color}`
                      }`}
                    >
                      <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-100 shrink-0">
                        {m.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {t(m.labelKey, currentLanguage)}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {t(m.descKey, currentLanguage)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Size Adjustment */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4 text-blue-600" />
                  <span>{t('textSize', currentLanguage)}</span>
                </span>
                <span className="font-mono text-slate-500">{Math.round(fontSizeMultiplier * 100)}%</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { factor: 0.9, label: 'A-', title: 'Small' },
                  { factor: 1.0, label: 'Normal', title: 'Default' },
                  { factor: 1.15, label: 'A+', title: 'Large' },
                  { factor: 1.3, label: 'A++', title: 'Extra Large' },
                ].map((item) => (
                  <button
                    key={item.factor}
                    onClick={() => onFontSizeChange(item.factor)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                      fontSizeMultiplier === item.factor
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Speed */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-purple-600" />
                  <span>{t('voiceSpeed', currentLanguage)}</span>
                </span>
                <span className="font-mono text-slate-500">{speechRate}x</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 0.75, label: '0.75x Gentle' },
                  { rate: 1.0, label: '1.0x Normal' },
                  { rate: 1.25, label: '1.25x Fast' },
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => onSpeechRateChange(item.rate)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                      speechRate === item.rate
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions: Visual References & Hospital Directions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Visual Tools & Directions:
              </div>

              {onOpenVisualReferences && (
                <button
                  onClick={() => {
                    onOpenVisualReferences();
                    onClose();
                  }}
                  className="w-full p-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-950 flex items-center justify-between transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-5 h-5 text-teal-700" />
                    <div>
                      <div className="font-bold text-xs sm:text-sm">
                        {t('directionsTitle', currentLanguage)}
                      </div>
                      <div className="text-[11px] text-teal-700">
                        {t('medicinePillGuide', currentLanguage)} &bull; {t('hospitalWayfinding', currentLanguage)}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-600" />
                </button>
              )}
            </div>

            {/* Emergency Hotline Section */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Emergency Quick Dials:</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href="tel:108"
                  className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ambulance 108</span>
                </a>

                <a
                  href="tel:112"
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Emergency 112</span>
                </a>
              </div>
            </div>
          </div>

          {/* Slide Bar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Settings automatically saved to session
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {t('close', currentLanguage)}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
