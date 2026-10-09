import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Share2,
  Printer,
  Calendar,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { SmartActionItem } from '../types';

interface SmartActionPlanProps {
  items: SmartActionItem[];
  onToggleItem: (id: string) => void;
  patientName: string;
}

export const SmartActionPlan: React.FC<SmartActionPlanProps> = ({
  items,
  onToggleItem,
  patientName,
}) => {
  const [copied, setCopied] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const handleCopy = () => {
    const text = `SAHAAYAAI Action Plan for ${patientName}:\n` +
      items.map((i) => `[${i.completed ? 'X' : ' '}] ${i.text} (${i.dueDate || 'Ongoing'})`).join('\n') +
      `\n\nGenerated strictly from patient's clinical document without inventing medical steps.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <CheckSquare className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              Smart Action Checklist (Strictly from Document)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Only explicit follow-up instructions, appointments, and care duties extracted from the verified document.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Copy checklist to share with family or on WhatsApp"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share / Copy'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Print checklist"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 bg-slate-100 p-3 rounded-xl flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Action Items Progress</span>
            <span>{completedCount} of {items.length} Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleItem(item.id)}
            className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${
              item.completed
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-600'
                : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-800'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-emerald-600 focus:outline-none"
              aria-label={item.completed ? 'Mark uncompleted' : 'Mark completed'}
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 hover:text-emerald-600" />
              )}
            </button>

            <div className="flex-1">
              <p
                className={`text-sm font-semibold leading-snug ${
                  item.completed ? 'line-through text-slate-500' : 'text-slate-900'
                }`}
              >
                {item.text}
              </p>
              {item.dueDate && (
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-1">
                  <Calendar className="w-3 h-3 text-emerald-600" />
                  <span>Due: {item.dueDate}</span>
                </div>
              )}
            </div>

            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                item.category === 'appointment'
                  ? 'bg-blue-100 text-blue-800'
                  : item.category === 'medication'
                  ? 'bg-purple-100 text-purple-800'
                  : item.category === 'document'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
