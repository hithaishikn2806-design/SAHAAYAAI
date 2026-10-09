import React from 'react';
import {
  Accessibility,
  Eye,
  Ear,
  Image as ImageIcon,
  UserCheck,
  ZoomIn,
  ZoomOut,
  Gauge,
  Sliders,
} from 'lucide-react';
import { AccessibilityMode } from '../types';

interface AccessibilityBarProps {
  currentMode: AccessibilityMode;
  onModeChange: (mode: AccessibilityMode) => void;
  fontSizeMultiplier: number;
  onFontSizeChange: (factor: number) => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  currentMode,
  onModeChange,
  fontSizeMultiplier,
  onFontSizeChange,
  speechRate,
  onSpeechRateChange,
}) => {
  const modes: Array<{
    id: AccessibilityMode;
    label: string;
    subtext: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'standard',
      label: 'Standard',
      subtext: 'Default multi-feature dashboard',
      icon: <Sliders className="w-4 h-4" />,
      color: 'border-slate-300 text-slate-700 hover:border-slate-400',
    },
    {
      id: 'elder',
      label: 'Elder Mode',
      subtext: 'Extra large buttons, minimal clutter',
      icon: <UserCheck className="w-4 h-4 text-emerald-600" />,
      color: 'border-emerald-300 text-emerald-800 hover:border-emerald-500',
    },
    {
      id: 'vision',
      label: 'Vision Mode',
      subtext: 'High contrast, screen reader ready',
      icon: <Eye className="w-4 h-4 text-indigo-600" />,
      color: 'border-indigo-300 text-indigo-800 hover:border-indigo-500',
    },
    {
      id: 'hearing',
      label: 'Hearing Mode',
      subtext: 'Text-first, visual alerts, zero audio reliance',
      icon: <Ear className="w-4 h-4 text-amber-600" />,
      color: 'border-amber-300 text-amber-800 hover:border-amber-500',
    },
    {
      id: 'low-literacy',
      label: 'Low-Literacy',
      subtext: 'Visual icons, picture schedules, voice narration',
      icon: <ImageIcon className="w-4 h-4 text-teal-600" />,
      color: 'border-teal-300 text-teal-800 hover:border-teal-500',
    },
  ];

  return (
    <section
      aria-label="Accessibility settings"
      className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Mode Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <Accessibility className="w-4 h-4 text-emerald-600" />
            <span>Accessibility Mode:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {modes.map((m) => {
              const isActive = currentMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onModeChange(m.id)}
                  title={m.subtext}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-200'
                      : `bg-white ${m.color}`
                  }`}
                >
                  <span className={isActive ? 'text-white' : ''}>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font & Audio tuning */}
        <div className="flex items-center gap-3 text-xs self-end md:self-auto flex-wrap">
          {/* Font Resizer */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
            <span className="text-slate-400 font-medium px-1.5 text-[11px]">Font:</span>
            <button
              onClick={() => onFontSizeChange(Math.max(1, fontSizeMultiplier - 0.1))}
              className="p-1 hover:bg-slate-100 rounded text-slate-700 transition"
              title="Decrease text size"
              aria-label="Decrease font size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-slate-800 px-1">
              {Math.round(fontSizeMultiplier * 100)}%
            </span>
            <button
              onClick={() => onFontSizeChange(Math.min(1.4, fontSizeMultiplier + 0.1))}
              className="p-1 hover:bg-slate-100 rounded text-slate-700 transition"
              title="Increase text size"
              aria-label="Increase font size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Voice Speed */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
            <span className="text-slate-400 font-medium px-1.5 text-[11px] flex items-center gap-1">
              <Gauge className="w-3 h-3 text-emerald-600" />
              <span>Voice:</span>
            </span>
            {[
              { val: 0.8, label: 'Slow' },
              { val: 1.0, label: 'Normal' },
              { val: 1.2, label: 'Brisk' },
            ].map((spd) => (
              <button
                key={spd.val}
                onClick={() => onSpeechRateChange(spd.val)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  Math.abs(speechRate - spd.val) < 0.05
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
