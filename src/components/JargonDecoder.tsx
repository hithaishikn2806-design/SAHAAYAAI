import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { JargonTerm } from '../types';

interface JargonDecoderProps {
  terms: JargonTerm[];
}

export const JargonDecoder: React.FC<JargonDecoderProps> = ({ terms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered = terms.filter((item) => {
    const matchesSearch =
      item.medicalTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.simplifiedTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              Medical Terminology &rarr; Plain Language Decoder
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time translation of dense clinical acronyms into simple conversational language
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'condition', 'medication', 'instruction', 'lab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                filterCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <label htmlFor="jargon-search" className="sr-only">Search medical term</label>
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        <input
          id="jargon-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clinical words (e.g. Hypertension, PO OD, Dyspnea, Stent)..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Grid of jargon cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-6 text-slate-400 text-xs">
            No medical terms found matching "{searchTerm}".
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition group shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-900 bg-slate-200/80 px-2 py-0.5 rounded font-mono">
                  {item.medicalTerm}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 my-1 text-emerald-800 font-bold text-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item.simplifiedTerm}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {item.explanation}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
