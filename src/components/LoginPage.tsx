import React, { useState } from 'react';
import {
  Heart,
  UserCheck,
  Eye,
  Ear,
  Image as ImageIcon,
  Sliders,
  ShieldCheck,
  Languages,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { AccessibilityMode, SupportedLanguage, UserAccount } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoDocuments';
import { t } from '../utils/i18n';

interface LoginPageProps {
  onLogin: (user: UserAccount, mode: AccessibilityMode, lang: SupportedLanguage) => void;
  initialMode: AccessibilityMode;
  initialLanguage: SupportedLanguage;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  initialMode,
  initialLanguage,
}) => {
  const [selectedMode, setSelectedMode] = useState<AccessibilityMode>(initialMode);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [selectedPersona, setSelectedPersona] = useState<'caregiver' | 'elder_patient' | 'guest'>('caregiver');
  const [customName, setCustomName] = useState('Family Caregiver');
  const [customPhone, setCustomPhone] = useState('+91 98450 12345');

  const accessibilityOptions: Array<{
    id: AccessibilityMode;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
    activeBorder: string;
    activeBg: string;
    badgeColor: string;
  }> = [
    {
      id: 'elder',
      title: 'Elder Mode (ಹಿರಿಯರ ಮೋಡ್)',
      description: 'Extra large buttons, minimal clutter, large 20px+ text, and automatic voice read-aloud.',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
      badge: 'Recommended for Seniors',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-400/40',
      activeBg: 'bg-emerald-50/70',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'low-literacy',
      title: 'Low-Literacy & Pictorial Mode',
      description: 'Picture routines (Sunrise, Noon, Bedtime, Food), short 1-sentence points, and audio narration.',
      icon: <ImageIcon className="w-5 h-5 text-teal-600" />,
      badge: 'Visual & Audio First',
      activeBorder: 'border-teal-500 ring-2 ring-teal-400/40',
      activeBg: 'bg-teal-50/70',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    },
    {
      id: 'vision',
      title: 'Vision Assist Mode',
      description: 'High contrast, bold typography, screen reader guidance, and extra clear focus outlines.',
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      badge: 'Screen Reader Ready',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-400/40',
      activeBg: 'bg-indigo-50/70',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      id: 'hearing',
      title: 'Hearing Assist Mode',
      description: 'Text-first interface, visual alerts, closed captions, and complete visual feedback.',
      icon: <Ear className="w-5 h-5 text-amber-600" />,
      badge: 'Visual Alerts Only',
      activeBorder: 'border-amber-500 ring-2 ring-amber-400/40',
      activeBg: 'bg-amber-50/70',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'standard',
      title: 'Standard Dashboard Mode',
      description: 'Full clinical multi-tab dashboard with side-by-side comparison, charts, and directories.',
      icon: <Sliders className="w-5 h-5 text-slate-700" />,
      badge: 'Default Full Suite',
      activeBorder: 'border-slate-800 ring-2 ring-slate-400/40',
      activeBg: 'bg-slate-100/80',
      badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
    },
  ];

  const handleSelectPersona = (type: 'caregiver' | 'elder_patient' | 'guest') => {
    setSelectedPersona(type);
    if (type === 'caregiver') {
      setCustomName('Family Caregiver');
      setCustomPhone('+91 98450 12345');
      setSelectedMode('standard');
    } else if (type === 'elder_patient') {
      setCustomName('Patient 1');
      setCustomPhone('+91 98450 99881');
      setSelectedMode('elder');
      setSelectedLanguage('kn');
    } else {
      setCustomName('Healthcare Volunteer / Guest');
      setCustomPhone('+91 90000 00000');
      setSelectedMode('standard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserAccount = {
      id: selectedPersona === 'elder_patient' ? 'pt-1' : 'user-caregiver',
      name: customName.trim() || (selectedPersona === 'elder_patient' ? 'Patient' : 'Caregiver'),
      role: selectedPersona === 'elder_patient' ? 'patient' : 'caregiver',
      relationship: selectedPersona === 'caregiver' ? 'Primary Caregiver' : 'Patient',
      email: `${customName.toLowerCase().replace(/[^a-z]/g, '') || 'user'}@demo-sahaaya.org`,
      phone: customPhone,
      preferredLanguage: selectedLanguage,
      accessibilityMode: selectedMode,
      patientsUnderCare: ['pt-1', 'pt-2'],
    };

    onLogin(user, selectedMode, selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-slate-50 to-teal-50/70 text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Brand Banner */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                SAHAAYA<span className="text-emerald-600">AI</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                {t('appName', selectedLanguage)}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t('appTagline', selectedLanguage)}
            </p>
          </div>
        </div>

        {/* Language selector on Login */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-emerald-600" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
            aria-label="Select interface language"
            className="bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer hover:border-slate-400"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-white text-slate-900">
                {l.flag} {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-4xl mx-auto w-full my-6 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inclusive Onboarding & Personalized Access</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Welcome to SAHAAYAAI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Select who is logging in and choose the accessibility mode that best fits your visual, auditory, or cognitive comfort.
          </p>
        </div>

        {/* Step 1: Choose Persona */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>1. Choose Account Persona:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'caregiver',
                title: 'Family Caregiver',
                subtitle: 'Family & Care Manager',
                desc: 'Manages medications, appointments, reminders & records for family',
                icon: '👨‍👦',
              },
              {
                id: 'elder_patient',
                title: 'Elder Patient (Senior)',
                subtitle: 'Senior Citizen View',
                desc: 'Large buttons, simplified Kannada voice audio, heart recovery routine',
                icon: '👴',
              },
              {
                id: 'guest',
                title: 'Healthcare Volunteer / Guest',
                subtitle: 'Reviewer / Sandbox Access',
                desc: 'Full access to document OCR, doctor directory, and caregiver alarms',
                icon: '🏥',
              },
            ].map((p) => {
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPersona(p.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer relative shadow-2xs ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400/40 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{p.icon}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div className="font-bold text-sm text-slate-900">{p.title}</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-0.5">{p.subtitle}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{p.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Accessibility Mode */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            <span>2. Choose Your Accessibility Mode:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {accessibilityOptions.map((opt) => {
              const isSelected = selectedMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedMode(opt.id)}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer shadow-2xs ${
                    isSelected
                      ? `${opt.activeBg} ${opt.activeBorder} shadow-sm`
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="p-2 bg-slate-100 rounded-xl">{opt.icon}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${opt.badgeColor}`}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-900">{opt.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Confirmation & Login Action */}
        <form onSubmit={handleSubmit} className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Logging in as: <strong className="text-slate-900">{customName}</strong> &bull; Mode: <strong className="text-emerald-700">{selectedMode.toUpperCase()}</strong>
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Enter SAHAAYAAI Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </main>

      {/* Footer disclaimer */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-slate-500 py-2">
        Healthcare Accessibility Portal &bull; Non-Diagnostic Assistive Prototype &bull; Privacy Protected
      </footer>
    </div>
  );
};
