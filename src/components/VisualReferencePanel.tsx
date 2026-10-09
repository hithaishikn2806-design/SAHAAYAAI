import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Pill,
  Building2,
  Navigation,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  Layers,
  Heart,
  Droplets,
  Activity,
  X,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { t } from '../utils/i18n';

interface VisualReferencePanelProps {
  currentLanguage: SupportedLanguage;
  isOpen?: boolean;
  onClose?: () => void;
  hospitalName?: string;
  activePatientName?: string;
}

export const VisualReferencePanel: React.FC<VisualReferencePanelProps> = ({
  currentLanguage,
  isOpen = true,
  onClose,
  hospitalName = 'Manipal Heart Foundation / Bengaluru Metro Hospital',
  activePatientName = 'Active Patient',
}) => {
  const [activeTab, setActiveTab] = useState<'medications' | 'directions' | 'anatomy'>('medications');

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-teal-100 text-teal-800 rounded-xl">
              <Compass className="w-5 h-5 text-teal-700" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t('directionsTitle', currentLanguage)}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
              Visual Guide
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual picture references for prescribed pills, hospital floor wayfinding & body care
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('medications')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'medications'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('medicinePillGuide', currentLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('directions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'directions'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('hospitalWayfinding', currentLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('anatomy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Body & Heart Care</span>
          </button>
        </div>

        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tab 1: Medication Visual Reference */}
      {activeTab === 'medications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-600" />
              <span>How your medicines look &bull; Match before taking:</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Color-coded by schedule & dose
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pill Card 1: Tab Ecosprin */}
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-4 space-y-3 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  Morning Dose
                </span>
                <span className="text-[11px] font-bold text-amber-900">08:30 AM</span>
              </div>

              {/* Visual Pill Drawing */}
              <div className="h-28 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200/50 flex flex-col items-center justify-center p-2 relative border border-amber-200">
                {/* Circular pill graphic */}
                <div className="w-14 h-14 rounded-full bg-rose-400 border-4 border-rose-300 shadow-md flex items-center justify-center text-white text-[11px] font-black tracking-widest transform hover:scale-105 transition">
                  75
                </div>
                <span className="text-[10px] font-bold text-amber-900 mt-2 bg-white/80 px-2 py-0.5 rounded-full">
                  Small Pink Round Tablet
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">Tab Ecosprin 75mg</h4>
                <p className="text-xs text-slate-600">Blood thinner (Aspirin)</p>
                <div className="mt-2 text-[11px] text-amber-900 bg-amber-100/70 p-2 rounded-lg font-medium">
                  &bull; Take strictly <strong>after breakfast</strong> with a full glass of water.
                </div>
              </div>
            </div>

            {/* Pill Card 2: Tab Metoprolol */}
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50/40 p-4 space-y-3 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
                  Morning & Night
                </span>
                <span className="text-[11px] font-bold text-sky-900">09:00 AM / PM</span>
              </div>

              {/* Visual Pill Drawing */}
              <div className="h-28 rounded-xl bg-gradient-to-b from-sky-100 to-sky-200/50 flex flex-col items-center justify-center p-2 relative border border-sky-200">
                {/* Oval scored pill graphic */}
                <div className="w-18 h-10 rounded-full bg-white border-2 border-slate-300 shadow-md flex items-center justify-center relative transform hover:scale-105 transition">
                  <div className="w-0.5 h-full bg-slate-300" />
                  <span className="absolute text-[10px] font-bold text-slate-600">M-25</span>
                </div>
                <span className="text-[10px] font-bold text-sky-900 mt-2 bg-white/80 px-2 py-0.5 rounded-full">
                  White Oval Scored Pill
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">Tab Metoprolol 25mg</h4>
                <p className="text-xs text-slate-600">Blood Pressure & Heart Rate</p>
                <div className="mt-2 text-[11px] text-sky-900 bg-sky-100/70 p-2 rounded-lg font-medium">
                  &bull; Maintain regular schedule. Never skip or stop abruptly.
                </div>
              </div>
            </div>

            {/* Pill Card 3: Tab Atorvastatin */}
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-4 space-y-3 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                  Night Dose
                </span>
                <span className="text-[11px] font-bold text-indigo-900">09:30 PM</span>
              </div>

              {/* Visual Pill Drawing */}
              <div className="h-28 rounded-xl bg-gradient-to-b from-indigo-100 to-indigo-200/50 flex flex-col items-center justify-center p-2 relative border border-indigo-200">
                {/* Oblong film coated pill graphic */}
                <div className="w-16 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md flex items-center justify-center text-white text-[10px] font-bold transform hover:scale-105 transition">
                  AT-40
                </div>
                <span className="text-[10px] font-bold text-indigo-900 mt-2 bg-white/80 px-2 py-0.5 rounded-full">
                  Blue/Indigo Film Coated
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">Tab Atorvastatin 40mg</h4>
                <p className="text-xs text-slate-600">Cholesterol & Artery Protection</p>
                <div className="mt-2 text-[11px] text-indigo-900 bg-indigo-100/70 p-2 rounded-lg font-medium">
                  &bull; Take at bedtime. Helps prevent plaque in cardiac stent.
                </div>
              </div>
            </div>

            {/* Pill Card 4: Tab Pantoprazole */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-4 space-y-3 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Empty Stomach
                </span>
                <span className="text-[11px] font-bold text-emerald-900">07:30 AM</span>
              </div>

              {/* Visual Pill Drawing */}
              <div className="h-28 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-200/50 flex flex-col items-center justify-center p-2 relative border border-emerald-200">
                {/* Yellow enteric coated tablet */}
                <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-yellow-500 shadow-md flex items-center justify-center text-yellow-950 text-[10px] font-black transform hover:scale-105 transition">
                  P-40
                </div>
                <span className="text-[10px] font-bold text-emerald-900 mt-2 bg-white/80 px-2 py-0.5 rounded-full">
                  Yellow Gastro-Resistant
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">Tab Pantoprazole 40mg</h4>
                <p className="text-xs text-slate-600">Stomach Acid Protector</p>
                <div className="mt-2 text-[11px] text-emerald-900 bg-emerald-100/70 p-2 rounded-lg font-medium">
                  &bull; 30 minutes before first meal with plain water.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hospital & Clinic Directions Guide */}
      {activeTab === 'directions' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-950">
                Hospital Destination: {hospitalName}
              </h4>
              <p className="text-xs text-blue-800 mt-0.5">
                Airport Road & Metro Junction, Bengaluru &bull; Main Entrance Gate 2 (Wheelchair Friendly)
              </p>
            </div>
          </div>

          {/* Visual Floor Navigation Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Floor 0 */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-900">
                  GROUND FLOOR (Level 0)
                </span>
                <span className="text-[11px] font-bold text-slate-500">Main Entrance</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <div>
                    <div className="font-bold text-slate-900">{t('opdRegistration', currentLanguage)}</div>
                    <div className="text-[11px] text-slate-500">Counter 3 & 4 (Senior Citizen Priority)</div>
                  </div>
                </li>

                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <div>
                    <div className="font-bold text-slate-900">{t('pharmacyCounter', currentLanguage)}</div>
                    <div className="text-[11px] text-slate-500">West Wing &bull; 24 Hours Open</div>
                  </div>
                </li>

                <li className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">!</span>
                  <div>
                    <div className="font-bold text-rose-950">{t('emergencyTriage', currentLanguage)}</div>
                    <div className="text-[11px] text-rose-700">Direct Ambulance Driveway Gate 1</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Floor 1 */}
            <div className="rounded-2xl border-2 border-blue-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-900">
                  FIRST FLOOR (Level 1)
                </span>
                <span className="text-[11px] font-bold text-slate-500">Take Elevator B</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/70 border border-blue-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">A</span>
                  <div>
                    <div className="font-bold text-blue-950">Interventional Cardiology OPD</div>
                    <div className="text-[11px] text-blue-800">Rooms 104 - 108 &bull; Dr. Treating Physician</div>
                  </div>
                </li>

                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">B</span>
                  <div>
                    <div className="font-bold text-slate-900">ECG & Echo Doppler Suite</div>
                    <div className="text-[11px] text-slate-500">Follow Blue Floor Line from Elevator</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Basement */}
            <div className="rounded-2xl border-2 border-amber-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-amber-100 text-amber-900">
                  BASEMENT (Level -1)
                </span>
                <span className="text-[11px] font-bold text-slate-500">Central Diagnostics</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">L</span>
                  <div>
                    <div className="font-bold text-slate-900">Blood Collection & Pathology Lab</div>
                    <div className="text-[11px] text-slate-500">Fast-track fasting sample counter</div>
                  </div>
                </li>

                <li className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">R</span>
                  <div>
                    <div className="font-bold text-slate-900">Digital X-Ray & Ultrasound</div>
                    <div className="text-[11px] text-slate-500">Waiting Hall D</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Step by Step Route Instructions */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-teal-600" />
              <span>Step-by-Step Wayfinding for Next Visit:</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs text-slate-700">
              <div className="flex-1 p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="font-bold text-emerald-700">Step 1:</span>
                <span>Enter Gate 2 &bull; Show token at OPD Counter 3</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 mx-auto hidden sm:block" />
              <div className="flex-1 p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="font-bold text-blue-700">Step 2:</span>
                <span>Take Elevator B to Level 1 &bull; Turn Right</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 mx-auto hidden sm:block" />
              <div className="flex-1 p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="font-bold text-purple-700">Step 3:</span>
                <span>Room 104 &bull; Hand over previous discharge folder</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Anatomical Reference & Care Instructions */}
      {activeTab === 'anatomy' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 flex flex-col items-center justify-center text-center">
              {/* Anatomical Heart Diagram Representation */}
              <div className="w-24 h-24 rounded-full bg-rose-100 border-4 border-rose-300 flex items-center justify-center text-rose-600 shadow-inner mb-3">
                <Heart className="w-12 h-12 fill-rose-500 text-rose-600 animate-pulse" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Coronary Artery System</h4>
              <p className="text-xs text-slate-600 mt-1">
                LAD Artery Drug-Eluting Stent (DES) Placement Care
              </p>
              <div className="mt-3 px-3 py-1 bg-white rounded-full text-[11px] font-bold text-rose-800 border border-rose-200">
                Stable Post-Procedure Healing
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Daily Physical Activity Precautions:</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Gentle 15-20 minute flat walking permitted. Avoid lifting heavy weights exceeding 5 kg. Do not strain while climbing stairs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Fluid & Dietary Guidelines:</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Low sodium diet (less than 1 level teaspoon salt per day). Avoid fried, oily, and deep-fried savory snacks. Eat warm, freshly cooked fiber-rich foods.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-900 space-y-1">
                <div className="font-bold text-rose-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>When to Seek Immediate Medical Help:</span>
                </div>
                <p className="text-rose-800 leading-relaxed">
                  Sudden chest heaviness spreading to left arm or jaw, severe breathlessness while resting, or dizziness. Call 108 immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
