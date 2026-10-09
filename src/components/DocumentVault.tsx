import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Scan,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Search,
  Eye,
  Plus,
  Trash2,
  Calendar,
  Building2,
  User,
  X,
  Share2,
} from 'lucide-react';
import { UploadedDocumentRecord, DocumentAnalysis, PatientProfile } from '../types';
import { INITIAL_DOCUMENT_VAULT } from '../data/mockDocumentsVault';

interface DocumentVaultProps {
  vaultRecords: UploadedDocumentRecord[];
  onUploadNewFile: (file: File, docType: string, patientName: string) => void;
  onSelectDocumentToExplain: (record: UploadedDocumentRecord) => void;
  isProcessingUpload: boolean;
  profiles?: PatientProfile[];
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  vaultRecords,
  onUploadNewFile,
  onSelectDocumentToExplain,
  isProcessingUpload,
  profiles = [],
}) => {
  const [selectedRecord, setSelectedRecord] = useState<UploadedDocumentRecord>(
    vaultRecords[0] || INITIAL_DOCUMENT_VAULT[0]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isDragOver, setIsDragOver] = useState(false);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [modalFile, setModalFile] = useState<File | null>(null);
  const [modalDocType, setModalDocType] = useState('Discharge Summary');
  const [modalPatient, setModalPatient] = useState(profiles[0]?.name || 'Patient 1');

  const filteredRecords = vaultRecords.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.patientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'All' || doc.docType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setModalFile(e.dataTransfer.files[0]);
      setShowUploadModal(true);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModalFile(e.target.files[0]);
      setShowUploadModal(true);
    }
  };

  const handleConfirmUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFile) return;
    onUploadNewFile(modalFile, modalDocType, modalPatient);
    setShowUploadModal(false);
    setModalFile(null);
  };

  const handlePrintView = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Separate Upload & Document Locker */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-teal-800/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Dedicated Document Vault
              </span>
              <span className="text-xs text-teal-200">
                Safe clinical storage & verified document viewer
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Patient Medical Records & Document Viewer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Upload discharge summaries, lab reports, X-rays, and prescriptions to view and analyze anytime
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>+ Upload New Medical Document</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left is Document Gallery & Filter; Right is Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 Cols): Upload Dropzone & Document List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Upload Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition cursor-pointer ${
              isDragOver
                ? 'border-teal-500 bg-teal-50/50'
                : 'border-slate-300 hover:border-teal-400 bg-white'
            }`}
          >
            <input
              type="file"
              id="vault-quick-upload"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileInput}
              className="hidden"
            />
            <label htmlFor="vault-quick-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  Click or drag file to upload new record
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  PDF, PNG, JPG &bull; Discharge Slips, Lab Reports, X-Rays
                </div>
              </div>
            </label>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents by title, facility, patient..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Discharge Summary', 'Laboratory Investigation', 'Outpatient Prescription', 'Imaging / X-Ray'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition whitespace-nowrap cursor-pointer ${
                    typeFilter === t
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Document Records List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {filteredRecords.map((doc) => {
              const isSelected = selectedRecord?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedRecord(doc)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {doc.docType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{doc.fileSize}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {doc.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {doc.facilityName}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span>{doc.patientName}</span>
                    <span>{doc.uploadDate.split(',')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 Cols): DOCUMENT VIEWER */}
        <div className="lg:col-span-7">
          {selectedRecord ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              {/* Document Viewer Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      {selectedRecord.docType}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedRecord.fileName} ({selectedRecord.fileSize})
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {selectedRecord.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Uploaded: {selectedRecord.uploadDate}</span>
                    <span>&bull;</span>
                    <span>Facility: {selectedRecord.facilityName}</span>
                  </div>
                </div>

                {/* Primary Action: Send to Explainer */}
                <button
                  onClick={() => onSelectDocumentToExplain(selectedRecord)}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xs transition active:scale-95 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explain in Plain Language</span>
                </button>
              </div>

              {/* Patient and Facility Information Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Patient</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedRecord.patientName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Verification Status</div>
                  <div className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>OCR Verified</span>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Source Provider</div>
                  <div className="font-bold text-slate-800 mt-0.5 truncate">{selectedRecord.facilityName}</div>
                </div>
              </div>

              {/* Red-Flag Urgent Banner if Present */}
              {selectedRecord.urgencyNote && (
                <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-900">
                  <div className="font-bold flex items-center gap-1.5 text-rose-800 mb-1">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Urgent Precaution Found in Document:</span>
                  </div>
                  <p className="leading-relaxed">{selectedRecord.urgencyNote}</p>
                </div>
              )}

              {/* Document Overview Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Verified Executive Summary:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-teal-50/40 p-4 rounded-2xl border border-teal-200/60 font-medium">
                  {selectedRecord.summary}
                </p>
              </div>

              {/* Scanned Document Paper Simulation View */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Document Text & Raw Excerpt:
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintView}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Document</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 text-emerald-300 font-mono text-xs p-4 rounded-2xl border border-slate-800 max-h-72 overflow-y-auto leading-relaxed shadow-inner">
                  <pre className="whitespace-pre-wrap">{selectedRecord.rawText}</pre>
                </div>
              </div>

              {/* Bottom Quick Tools */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[11px] text-slate-400">
                  Processed via SAHAAYAAI Secure Ingestion Engine &bull; Non-Diagnostic
                </span>
                <button
                  onClick={() => onSelectDocumentToExplain(selectedRecord)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Open in Document Explainer &rarr;
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 text-sm">
              Select a document from the left to view its scanned clinical contents.
            </div>
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Upload Medical Document
                </h3>
                <p className="text-xs text-slate-500">
                  Secure local sandbox ingestion
                </p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmUpload} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select File (PDF, PNG, JPG)
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setModalFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                />
                {modalFile && (
                  <p className="text-[11px] text-teal-700 font-semibold mt-1">
                    Selected: {modalFile.name} ({(modalFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Type
                </label>
                <select
                  value={modalDocType}
                  onChange={(e) => setModalDocType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="Laboratory Investigation">Laboratory Investigation</option>
                  <option value="Outpatient Prescription">Outpatient Prescription Slip</option>
                  <option value="Imaging / X-Ray">Imaging / X-Ray</option>
                  <option value="Vaccination Record">Vaccination Record</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assign to Patient Profile
                </label>
                <select
                  value={modalPatient}
                  onChange={(e) => setModalPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {profiles.length > 0 ? (
                    profiles.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.relationship}, {p.age}y)
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Patient 1">Patient 1 (Father, 72y)</option>
                      <option value="Patient 2">Patient 2 (Mother, 65y)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!modalFile || isProcessingUpload}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  {isProcessingUpload ? 'Parsing with OCR...' : 'Upload & Parse Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
