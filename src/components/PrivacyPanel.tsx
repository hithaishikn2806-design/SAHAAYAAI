import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserCheck,
  FileCheck,
  AlertOctagon,
  X,
  ExternalLink,
} from 'lucide-react';

interface PrivacyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPanel: React.FC<PrivacyPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          aria-label="Close privacy modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Privacy, Consent & Responsible AI Charter
            </h3>
            <p className="text-xs text-slate-500">
              Strict ethical boundaries governing SAHAAYAAI
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Card 1: Demo Sandbox Data */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
              <EyeOff className="w-4 h-4 text-emerald-600" />
              <span>1. Synthetic & De-Identified Demo Data</span>
            </div>
            <p className="text-xs text-slate-600">
              Patient profiles ("Patient 1", "Patient 2") and medical records are synthetic demonstrations created for accessibility evaluation. Users can customize patient names, ages, and personal details anytime via profile settings. Never upload unredacted personal health information (PHI) with sensitive national identity numbers.
            </p>
          </div>

          {/* Card 2: Zero Unsupervised Diagnosis */}
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
            <div className="flex items-center gap-2 font-bold text-rose-950 text-xs sm:text-sm mb-1">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>2. Non-Diagnostic Assistive Scope</span>
            </div>
            <p className="text-xs text-rose-900">
              SAHAAYAAI is an assistive accessibility and communication bridge. It strictly does NOT diagnose diseases, prescribe medications, modify prescription dosages, or make unsupported medical assertions. It only simplifies and explains information explicitly present in uploaded records.
            </p>
          </div>

          {/* Card 3: Consent-First Architecture */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>3. Explicit Caregiver Consent</span>
            </div>
            <p className="text-xs text-slate-600">
              Before documents or appointment tasks are shared with adult children or designated family caregivers, cryptographic patient consent must be verified, aligning with Digital Personal Data Protection (DPDP) Act guidelines.
            </p>
          </div>

          {/* Card 4: Processing Security */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>4. Ephemeral Processing & No Secret Leakage</span>
            </div>
            <p className="text-xs text-slate-600">
              Uploaded files are parsed transiently in server memory or client sandboxes without long-term tracking. Server-side proxy calls safely insulate API credentials from browser inspection.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Version 1.0 &bull; Hackathon Ethics Approved
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
