import React from 'react';
import {
  Heart,
  Volume2,
  Mic,
  Shield,
  PhoneCall,
  Languages,
  Eye,
  Sparkles,
  Users,
  Compass,
  FolderArchive,
  LogOut,
  User,
  Sliders,
  Calendar,
} from 'lucide-react';
import { AccessibilityMode, SupportedLanguage, UserAccount } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/demoDocuments';
import { t } from '../utils/i18n';

interface NavbarProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  accessibilityMode: AccessibilityMode;
  onAccessibilityModeChange: (mode: AccessibilityMode) => void;
  onOpenVoice: () => void;
  onOpenPrivacy: () => void;
  onOpenEmergency: () => void;
  activeTab: 'explainer' | 'vault' | 'caregiver' | 'directory';
  onTabChange: (tab: 'explainer' | 'vault' | 'caregiver' | 'directory') => void;
  currentUser?: UserAccount | null;
  onSwitchProfileOrMode?: () => void;
  activePatientName?: string;
  onOpenEditPatient?: () => void;
  onOpenSlideBar: () => void;
  onOpenVisualReferences?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  accessibilityMode,
  onAccessibilityModeChange,
  onOpenVoice,
  onOpenPrivacy,
  onOpenEmergency,
  activeTab,
  onTabChange,
  currentUser,
  onSwitchProfileOrMode,
  activePatientName,
  onOpenEditPatient,
  onOpenSlideBar,
  onOpenVisualReferences,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
      {/* Top emergency & quick actions bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-emerald-50 text-xs sm:text-sm px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">
            {t('appName', currentLanguage)} &bull; {t('appTagline', currentLanguage)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-2.5 py-0.5 rounded-lg text-xs transition cursor-pointer"
            aria-label="Emergency help button"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('emergencySos', currentLanguage)} 108 / 112</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">
                SAHAAYA<span className="text-emerald-600">AI</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                {t('appName', currentLanguage)}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t('appTagline', currentLanguage)}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (All translated via i18n) */}
        <nav aria-label="Main Navigation" className="flex items-center bg-slate-100 p-1 rounded-2xl flex-wrap">
          <button
            onClick={() => onTabChange('explainer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explainer'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t('tabExplainer', currentLanguage)}</span>
          </button>

          <button
            onClick={() => onTabChange('vault')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-teal-600" />
            <span>{t('tabVault', currentLanguage)}</span>
          </button>

          <button
            onClick={() => onTabChange('caregiver')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'caregiver'
                ? 'bg-white text-indigo-900 shadow-xs ring-1 ring-indigo-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>{t('tabCaregiver', currentLanguage)}</span>
          </button>

          <button
            onClick={() => onTabChange('directory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>{t('tabDirectory', currentLanguage)}</span>
          </button>
        </nav>

        {/* Action Controls & Slide Bar Trigger */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Active Patient Details & Edit Trigger */}
          {activePatientName && onOpenEditPatient && (
            <button
              onClick={onOpenEditPatient}
              className="hidden lg:flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-950 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              title="Click to update patient name, age, and details"
            >
              <span className="text-slate-400 font-normal">Patient:</span>
              <span className="max-w-[100px] truncate font-bold">{activePatientName}</span>
              <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1.5 py-0.2 rounded font-bold">
                Edit
              </span>
            </button>
          )}

          {/* Visual References & Directions shortcut */}
          {onOpenVisualReferences && (
            <button
              onClick={onOpenVisualReferences}
              className="hidden sm:flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
              title="Visual Pill Photos & Hospital Wayfinding Guide"
            >
              <Compass className="w-3.5 h-3.5 text-teal-700" />
              <span>Visual Guide</span>
            </button>
          )}

          {/* Speak to Sahaaya voice button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition transform active:scale-95 cursor-pointer"
            aria-label="Speak to SAHAAYAAI voice assistant"
          >
            <Mic className="w-4 h-4 animate-bounce" />
            <span>{t('speakToSahaaya', currentLanguage)}</span>
          </button>

          {/* SLIDE BAR TRIGGER BUTTON (New requested layout) */}
          <button
            onClick={onOpenSlideBar}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition transform active:scale-95 cursor-pointer"
            title="Open Slide Bar with Accessibility Modes and Options"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-200" />
            <span>Slide Bar</span>
            <span className="px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px] font-mono">
              {accessibilityMode}
            </span>
          </button>

          {/* Language Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="language-select" className="sr-only">Select Language</label>
            <Languages className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
            <select
              id="language-select"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="pl-7 pr-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
              aria-label="Language selector"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile Pill & Switch Account */}
          {currentUser && (
            <button
              onClick={onSwitchProfileOrMode}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
              title="Click to switch profile or accessibility mode"
            >
              <User className="w-4 h-4 text-emerald-700" />
            </button>
          )}

          {/* Privacy info button */}
          <button
            onClick={onOpenPrivacy}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            title="Privacy and Responsible AI details"
            aria-label="Privacy information"
          >
            <Shield className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
