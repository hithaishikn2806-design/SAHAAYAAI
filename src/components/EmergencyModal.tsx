import React from 'react';
import {
  PhoneCall,
  AlertTriangle,
  HeartCrack,
  Activity,
  X,
  ShieldAlert,
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrgentWarning?: string;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  documentUrgentWarning,
}) => {
  if (!isOpen) return null;

  const helplines = [
    { number: '108', label: 'Emergency Ambulance & Trauma Service (Toll-Free)', desc: 'Immediate medical dispatch across India' },
    { number: '112', label: 'National All-in-One Emergency Helpline', desc: 'Police, Fire & Ambulance response' },
    { number: '1075', label: 'National Health Helpline (MoHFW)', desc: 'General healthcare guidance and hospital inquiries' },
    { number: '14416', label: 'Tele-MANAS Mental Health Assistance', desc: '24/7 psychological support and crisis counseling' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-rose-200 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl animate-pulse">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-rose-950">
              Emergency Safety & Urgent Care
            </h3>
            <p className="text-xs text-rose-700 font-semibold">
              Immediate medical assistance helplines
            </p>
          </div>
        </div>

        {/* Highlighted Warning from Document if Present */}
        {documentUrgentWarning && (
          <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl mb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-800 tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Red-Flag Warning in Your Document:</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-rose-950 leading-relaxed">
              "{documentUrgentWarning}"
            </p>
          </div>
        )}

        {/* Red Flag Symptoms to never delay */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Seek Immediate Emergency Help If You Notice:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-800">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium">
              &bull; Sudden crushing chest pressure
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium">
              &bull; Severe shortness of breath
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium">
              &bull; Sudden facial drooping or weakness
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium">
              &bull; Uncontrolled bleeding or fainting
            </div>
          </div>
        </div>

        {/* Helplines list */}
        <div className="space-y-2.5 mb-5">
          {helplines.map((h, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{h.label}</div>
                <div className="text-[11px] text-slate-500">{h.desc}</div>
              </div>
              <a
                href={`tel:${h.number}`}
                className="bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-4 py-2 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {h.number}</span>
              </a>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
