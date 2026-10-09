import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Scan,
  AlertTriangle,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  CheckCircle,
  Pill,
  Sun,
  Moon,
  Droplets,
  HelpCircle,
  Layers,
  FileCheck2,
  Pencil,
} from 'lucide-react';
import { DocumentAnalysis, SupportedLanguage } from '../types';
import { DEMO_DOCUMENTS } from '../data/demoDocuments';
import { MultilingualAudioPlayer } from './MultilingualAudioPlayer';
import { JargonDecoder } from './JargonDecoder';
import { SmartActionPlan } from './SmartActionPlan';
import { DoctorQuestionsCard } from './DoctorQuestionsCard';
import { t } from '../utils/i18n';

interface DocumentExplainerProps {
  currentDocument: DocumentAnalysis;
  onSelectDocument: (doc: DocumentAnalysis) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  speechRate: number;
  onToggleActionItem: (id: string) => void;
  onUploadCustomFile: (file: File) => void;
  isProcessingUpload: boolean;
  triggerAudioNow?: boolean;
  onOpenEditPatient?: () => void;
}

export const DocumentExplainer: React.FC<DocumentExplainerProps> = ({
  currentDocument,
  onSelectDocument,
  currentLanguage,
  onLanguageChange,
  speechRate,
  onToggleActionItem,
  onUploadCustomFile,
  isProcessingUpload,
  triggerAudioNow,
  onOpenEditPatient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'instructions' | 'before_after' | 'jargon' | 'checklist' | 'questions'
  >('overview');

  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadCustomFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadCustomFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Selection & Upload Zone */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <FileCheck2 className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Medical Document Processing & OCR
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select verified sample documents or upload your own prescription / lab report
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400">Presets:</span>
            {DEMO_DOCUMENTS.map((doc) => {
              const isSelected = currentDocument.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => onSelectDocument(doc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{doc.docType}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleFileDrop}
          className={`border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer ${
            isDragOver
              ? 'border-emerald-500 bg-emerald-50/50'
              : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50'
          }`}
        >
          <input
            type="file"
            id="medical-doc-upload"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileInput}
            className="hidden"
          />
          <label htmlFor="medical-doc-upload" className="cursor-pointer block">
            {isProcessingUpload ? (
              <div className="flex flex-col items-center justify-center py-2">
                <Scan className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                <p className="text-sm font-bold text-emerald-800">
                  Running Multimodal OCR & Jargon Decoder...
                </p>
                <p className="text-xs text-slate-500">
                  Extracting explicit instructions without inventing diagnoses...
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    Click to upload prescription, lab report, or discharge summary
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports PDF, PNG, JPG &bull; Secure Client-Side Sandbox &bull; Demo data only
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Emergency Red-flag Warnings (Feature 9: Emergency Safety) */}
      {currentDocument.urgentWarnings && currentDocument.urgentWarnings.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-xl shadow-xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-rose-900">
                Explicit Urgent-Care Warning in This Document
              </h4>
              <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                {currentDocument.urgentWarnings[0]}
              </p>
              <div className="mt-2 text-[11px] font-semibold text-rose-950 bg-rose-100/80 px-2.5 py-1 rounded-md inline-block">
                For sudden or worsening severe symptoms not described here, immediately call 108 or reach the nearest Emergency Room.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multilingual Audio Player (Feature 3: Multilingual Mode + Text-To-Speech) */}
      <MultilingualAudioPlayer
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        textToSpeak={currentDocument.plainSummary[currentLanguage] || currentDocument.plainSummary.en}
        multilingualSummaries={currentDocument.plainSummary}
        speechRate={speechRate}
        triggerAudioNow={triggerAudioNow}
      />

      {/* Active Document Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {currentDocument.docType}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentDocument.fileName}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {currentDocument.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {currentDocument.facilityName} &bull; Date: {currentDocument.documentDate}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Patient</div>
              <div className="text-xs font-bold text-slate-900">{currentDocument.patientName}</div>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Demographics</div>
              <div className="text-xs font-bold text-slate-900">{currentDocument.patientAge} / {currentDocument.patientGender}</div>
            </div>
            {onOpenEditPatient && (
              <>
                <div className="w-px h-6 bg-slate-200" />
                <button
                  onClick={onOpenEditPatient}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  title="Update patient name, age, and personal details"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-b border-slate-100">
          {[
            { id: 'overview', label: currentLanguage === 'kn' ? '೧. ದಾಖಲೆ ವಿವರ' : currentLanguage === 'hi' ? '१. दस्तावेज़ सारांश' : currentLanguage === 'ta' ? '1. ஆவண சுருக்கம்' : currentLanguage === 'te' ? '1. పత్ర సారాంశం' : '1. Document Overview' },
            { id: 'instructions', label: currentLanguage === 'kn' ? '೨. ಔಷಧ & ಆರೈಕೆ ನಿಯಮಗಳು' : currentLanguage === 'hi' ? '२. दवा एवं देखभाल निर्देश' : currentLanguage === 'ta' ? '2. மருந்துகள் & வழிமுறைகள்' : currentLanguage === 'te' ? '2. మందులు & సూచనలు' : '2. Medication & Care Rules' },
            { id: 'before_after', label: currentLanguage === 'kn' ? '೩. ಸರಳೀಕರಣ ಹೋಲಿಕೆ' : currentLanguage === 'hi' ? '३. सरलीकरण तुलना' : currentLanguage === 'ta' ? '3. ஒப்பீடு' : currentLanguage === 'te' ? '3. పోలిక' : '3. Before & After Demo' },
            { id: 'jargon', label: currentLanguage === 'kn' ? '೪. ವೈದ್ಯಕೀಯ ಪದಕೋಶ' : currentLanguage === 'hi' ? '४. मेडिकल शब्दकोश' : currentLanguage === 'ta' ? '4. மருத்துவ அகராதி' : currentLanguage === 'te' ? '4. వైద్య నిఘంటువు' : '4. Medical Glossary' },
            { id: 'checklist', label: currentLanguage === 'kn' ? '೫. ಆರೋಗ್ಯ ಯೋಜನೆ' : currentLanguage === 'hi' ? '५. कार्य योजना' : currentLanguage === 'ta' ? '5. திட்டப்பணி' : currentLanguage === 'te' ? '5. ప్రణాళిక' : '5. Smart Action Plan' },
            { id: 'questions', label: currentLanguage === 'kn' ? '೬. ವೈದ್ಯರಿಗೆ ಪ್ರಶ್ನೆಗಳು' : currentLanguage === 'hi' ? '६. डॉक्टर से प्रश्न' : currentLanguage === 'ta' ? '6. மருத்துவரிடம் கேள்விகள்' : currentLanguage === 'te' ? '6. డాక్టర్‌తో ప్రశ్నలు' : '6. Questions for Doctor' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                activeSubTab === tab.id
                  ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeSubTab === 'overview' && (
          <div className="pt-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>What is this document?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentDocument.plainSummary[currentLanguage] || currentDocument.plainSummary.en}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Key Information Verified in Document
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentDocument.keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        {finding.simplified}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          finding.status === 'urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : finding.status === 'attention'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {finding.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {finding.details}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded">
                      Source text: "{finding.term}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up card */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    Follow-up Appointment Information
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-blue-950 mt-0.5">
                    {currentDocument.followUp.doctorName} ({currentDocument.followUp.specialty})
                  </h4>
                  <p className="text-xs text-blue-900 mt-0.5">
                    <strong>When:</strong> {currentDocument.followUp.date} &bull; <strong>Where:</strong> {currentDocument.followUp.hospital}
                  </p>

                  <div className="mt-3">
                    <span className="text-xs font-bold text-blue-900 block mb-1">
                      Documents to carry for this visit:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-blue-800">
                      {currentDocument.followUp.documentsToCarry.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-blue-200/60">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Instructions */}
        {activeSubTab === 'instructions' && (
          <div className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Instructions Explicitly Present in Document
                </h3>
                <p className="text-xs text-slate-500">
                  Organized by routine time of day with meal guidelines
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {currentDocument.instructions.length} Verified Instructions
              </span>
            </div>

            <div className="space-y-3">
              {currentDocument.instructions.map((inst) => (
                <div
                  key={inst.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-emerald-700 shadow-2xs shrink-0 mt-0.5">
                    {inst.timeOfDay === 'morning' ? (
                      <Sun className="w-5 h-5 text-amber-500" />
                    ) : inst.timeOfDay === 'night' ? (
                      <Moon className="w-5 h-5 text-indigo-500" />
                    ) : (
                      <Pill className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{inst.title}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                          {inst.timeOfDay}
                        </span>
                        {inst.mealTiming && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {inst.mealTiming.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {inst.description}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-400 font-mono bg-white px-2.5 py-1 rounded border border-slate-100">
                      Explicit text on doctor slip: "{inst.sourceText}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Before & After Demo */}
        {activeSubTab === 'before_after' && (
          <div className="pt-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Before & After Document Explanation Demo
              </h3>
              <p className="text-xs text-slate-500">
                Witness how dense, intimidating clinical jargon is transformed into comforting, 5th-grade accessible guidance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* BEFORE */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-200">
                  <span className="text-xs font-bold uppercase text-rose-800 tracking-wider">
                    Before: Raw Clinical Document
                  </span>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                    Hard for elderly / rural patients
                  </span>
                </div>
                <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-rose-200 max-h-96 overflow-y-auto">
                  {currentDocument.rawExcerpt}
                </pre>
              </div>

              {/* AFTER */}
              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/40">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200">
                  <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>After: SAHAAYAAI Accessible Guidance</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Plain 5th Grade Level
                  </span>
                </div>

                <div className="space-y-3 bg-white p-3 rounded-lg border border-emerald-200 max-h-96 overflow-y-auto">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-[11px] font-bold text-emerald-900 mb-0.5">Summary:</div>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {currentDocument.plainSummary[currentLanguage] || currentDocument.plainSummary.en}
                    </p>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700">Clear Action Steps:</div>
                    {currentDocument.instructions.map((i, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-800 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{i.title}:</strong> {i.description}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 bg-blue-50 rounded-lg text-xs text-blue-900">
                    <strong>Next Doctor Visit:</strong> {currentDocument.followUp.date} with {currentDocument.followUp.doctorName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Jargon Decoder */}
        {activeSubTab === 'jargon' && (
          <div className="pt-5">
            <JargonDecoder terms={currentDocument.jargonTerms} />
          </div>
        )}

        {/* Tab 5: Smart Action Plan */}
        {activeSubTab === 'checklist' && (
          <div className="pt-5">
            <SmartActionPlan
              items={currentDocument.actionPlan}
              onToggleItem={onToggleActionItem}
              patientName={currentDocument.patientName}
            />
          </div>
        )}

        {/* Tab 6: Doctor Questions */}
        {activeSubTab === 'questions' && (
          <div className="pt-5">
            <DoctorQuestionsCard
              questionsMultilingual={currentDocument.questionsForDoctor}
              currentLanguage={currentLanguage}
              doctorName={currentDocument.followUp.doctorName}
            />
          </div>
        )}
      </div>
    </div>
  );
};
