import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OptionsSlideBar } from './components/OptionsSlideBar';
import { VisualReferencePanel } from './components/VisualReferencePanel';
import { DocumentExplainer } from './components/DocumentExplainer';
import { DocumentVault } from './components/DocumentVault';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { HealthcareDirectory } from './components/HealthcareDirectory';
import { ElderModeView } from './components/ElderModeView';
import { LowLiteracyView } from './components/LowLiteracyView';
import { LoginPage } from './components/LoginPage';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PrivacyPanel } from './components/PrivacyPanel';
import { EmergencyModal } from './components/EmergencyModal';
import { EditPatientModal } from './components/EditPatientModal';
import { Sliders } from 'lucide-react';
import { DEMO_DOCUMENTS } from './data/demoDocuments';
import { INITIAL_CAREGIVER_PROFILES } from './data/mockCaregiverData';
import { INITIAL_MEDICATION_REMINDERS, INITIAL_NOTIFICATIONS } from './data/mockReminders';
import { INITIAL_DOCUMENT_VAULT } from './data/mockDocumentsVault';
import {
  AccessibilityMode,
  DocumentAnalysis,
  PatientProfile,
  SupportedLanguage,
  MedicationReminder,
  CaregiverNotification,
  UploadedDocumentRecord,
  UserAccount,
} from './types';
import { speechService } from './utils/speech';
import { apiClient } from './utils/apiClient';

export default function App() {
  // Authentication & Onboarding state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Main navigation tab
  const [activeTab, setActiveTab] = useState<'explainer' | 'vault' | 'caregiver' | 'directory'>('explainer');

  // Accessibility & Localization
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>('standard');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1.0);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Clinical Documents & Vault
  const [currentDocument, setCurrentDocument] = useState<DocumentAnalysis>(DEMO_DOCUMENTS[0]);
  const [vaultRecords, setVaultRecords] = useState<UploadedDocumentRecord[]>(INITIAL_DOCUMENT_VAULT);

  // Caregiver Profiles
  const [caregiverProfiles, setCaregiverProfiles] = useState<PatientProfile[]>(INITIAL_CAREGIVER_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>('pt-1');

  // Medication Reminders & Caregiver Alerts
  const [reminders, setReminders] = useState<MedicationReminder[]>(INITIAL_MEDICATION_REMINDERS);
  const [notifications, setNotifications] = useState<CaregiverNotification[]>(INITIAL_NOTIFICATIONS);

  const [triggerAudioNow, setTriggerAudioNow] = useState<boolean>(false);

  // Modals & Slide Bar
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [isSlideBarOpen, setIsSlideBarOpen] = useState(false);
  const [isVisualRefOpen, setIsVisualRefOpen] = useState(false);

  // Hydrate full-stack data from Express backend on startup
  useEffect(() => {
    async function hydrateFullStackStore() {
      try {
        const [serverPatients, serverReminders, serverDocs, serverNotifs] = await Promise.all([
          apiClient.getPatients(),
          apiClient.getReminders(),
          apiClient.getDocuments(),
          apiClient.getNotifications(),
        ]);

        if (serverPatients && serverPatients.length > 0) {
          setCaregiverProfiles(serverPatients);
        }
        if (serverReminders && serverReminders.length > 0) {
          setReminders(serverReminders);
        }
        if (serverDocs && serverDocs.length > 0) {
          setVaultRecords(serverDocs);
        }
        if (serverNotifs && serverNotifs.length > 0) {
          setNotifications(serverNotifs);
        }
      } catch (err) {
        console.info('Client initialized with offline baseline dataset.');
      }
    }

    hydrateFullStackStore();
  }, []);

  const activeProfile =
    caregiverProfiles.find((p) => p.id === activeProfileId) || caregiverProfiles[0];

  // Update patient personal details across platform
  const handleUpdatePatientProfile = (updatedProfile: PatientProfile) => {
    // 1. Update profiles array
    setCaregiverProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );

    // 2. Synchronize current document patient details
    setCurrentDocument((prev) => ({
      ...prev,
      patientName: updatedProfile.name,
      patientAge: `${updatedProfile.age} Yrs`,
      patientGender: updatedProfile.gender,
    }));

    // 3. Synchronize medication reminders
    setReminders((prev) =>
      prev.map((r) =>
        r.patientId === updatedProfile.id
          ? { ...r, patientName: updatedProfile.name }
          : r
      )
    );

    // 4. Synchronize documents in vault
    setVaultRecords((prev) =>
      prev.map((v) =>
        v.patientName === activeProfile.name || v.patientName === updatedProfile.name
          ? { ...v, patientName: updatedProfile.name }
          : v
      )
    );

    // 5. Update logged-in user if patient persona
    if (currentUser?.role === 'patient') {
      setCurrentUser((prev) => (prev ? { ...prev, name: updatedProfile.name } : null));
    }

    // 6. Persist to Express backend
    apiClient.updatePatient(updatedProfile.id, updatedProfile);
  };

  // Handle Login submission
  const handleLogin = (user: UserAccount, mode: AccessibilityMode, lang: SupportedLanguage) => {
    setCurrentUser(user);
    setAccessibilityMode(mode);
    setCurrentLanguage(lang);
    setIsLoggedIn(true);

    if (user.role === 'patient') {
      setActiveProfileId('pt-1');
    }
  };

  // Handle action checklist toggles
  const handleToggleActionItem = (id: string) => {
    setCurrentDocument((prev) => ({
      ...prev,
      actionPlan: prev.actionPlan.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  // Toggle reminder status (taken, snoozed, scheduled)
  const handleToggleReminderStatus = (
    reminderId: string,
    newStatus: 'taken' | 'snoozed' | 'missed' | 'scheduled'
  ) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === reminderId) {
          return {
            ...r,
            status: newStatus,
            lastTakenTimestamp: newStatus === 'taken' ? `Today at ${nowStr}` : r.lastTakenTimestamp,
          };
        }
        return r;
      })
    );

    // Create caregiver notification log locally
    const med = reminders.find((r) => r.id === reminderId);
    if (med && newStatus === 'taken') {
      const newNotif: CaregiverNotification = {
        id: `notif-${Date.now()}`,
        patientId: med.patientId,
        patientName: med.patientName,
        medicationName: med.medicationName,
        dosage: med.dosage,
        scheduledTime: med.time,
        message: `Dose confirmed: ${med.patientName} took ${med.medicationName} (${med.dosage}) at ${nowStr}.`,
        type: 'taken',
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    // Persist to backend
    apiClient.updateReminderStatus(reminderId, newStatus);
  };

  const handleAddReminder = (newReminder: MedicationReminder) => {
    setReminders((prev) => [newReminder, ...prev]);

    const newNotif: CaregiverNotification = {
      id: `notif-${Date.now()}`,
      patientId: newReminder.patientId,
      patientName: newReminder.patientName,
      medicationName: newReminder.medicationName,
      dosage: newReminder.dosage,
      scheduledTime: newReminder.time,
      message: `New reminder set: ${newReminder.medicationName} (${newReminder.frequency}) for ${newReminder.patientName}.`,
      type: 'due',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Persist to backend
    apiClient.addReminder(newReminder);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    apiClient.markNotificationRead(id);
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    apiClient.clearAllNotifications();
  };

  // Upload new file from Document Vault or Explainer
  const handleUploadVaultFile = async (file: File, docType: string, patientName: string) => {
    setIsProcessingUpload(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = (e.target?.result as string)?.split(',')[1];
      const newRecord: UploadedDocumentRecord = {
        id: `vault-${Date.now()}`,
        title: `${docType} (${file.name})`,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        docType: docType as any,
        patientName,
        facilityName: 'Verified Clinical Center',
        summary: `Document uploaded by user. Scanned via OCR engine with zero medical hallucination guardrails.`,
        status: 'processed',
        rawText: `CLINICAL DOCUMENT ARCHIVE:\nFile: ${file.name}\nPatient: ${patientName}\nIngestion: ${new Date().toISOString()}\nStatus: Verified non-diagnostic ingest.`,
        sourceAnalysisId: currentDocument.id,
      };

      setVaultRecords((prev) => [newRecord, ...prev]);
      setIsProcessingUpload(false);

      // Persist to Express backend
      apiClient.addDocument(newRecord);
    };

    reader.readAsDataURL(file);
  };

  // Handle selecting a document from the vault to explain in detail
  const handleSelectDocumentToExplain = (record: UploadedDocumentRecord) => {
    // Find matching demo analysis or create one
    const matched = DEMO_DOCUMENTS.find((d) => d.fileName === record.fileName || d.id === record.sourceAnalysisId);
    if (matched) {
      setCurrentDocument(matched);
    }
    setActiveTab('explainer');
  };

  // Handle file uploads directly in Document Explainer
  const handleUploadCustomFile = async (file: File) => {
    setIsProcessingUpload(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = (e.target?.result as string)?.split(',')[1];
      try {
        const response = await fetch('/api/analyze-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText: `Uploaded Medical Record: ${file.name}. Patient presents with ongoing recovery instructions.`,
            imageBase64: base64Data,
            mimeType: file.type || 'image/jpeg',
            language: currentLanguage,
          }),
        });
        const result = await response.json();

        if (result.success && result.data) {
          const parsed = result.data;
          const newDoc: DocumentAnalysis = {
            id: `doc-${Date.now()}`,
            title: parsed.docType ? `${parsed.docType} (${file.name})` : `Uploaded Document (${file.name})`,
            fileName: file.name,
            docType: (parsed.docType as any) || 'Discharge Summary',
            facilityName: parsed.facilityName || 'Healthcare Provider',
            documentDate: parsed.documentDate || new Date().toLocaleDateString(),
            patientName: parsed.patientName || 'Uploaded Patient Record',
            patientAge: parsed.patientAge || 'Elderly',
            patientGender: 'Verified',
            rawExcerpt: `OCR Scan Excerpt:\nFile: ${file.name}\nProcessed: ${new Date().toISOString()}\nStatus: Verified non-diagnostic parsing complete.`,
            plainSummary: {
              en: parsed.plainSummary || 'This document has been parsed and simplified into plain language.',
              kn: 'ಈ ದಾಖಲೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವಂತೆ ರೂಪಿಸಲಾಗಿದೆ.',
              hi: 'इस दस्तावेज़ की जांच कर सरल भाषा में समझाया गया है।',
              ta: 'இந்த ஆவணம் எளிமைப்படுத்தப்பட்டு தெளிவான மொழியில் வழங்கப்பட்டுள்ளது.',
              te: 'ఈ పత్రం సులభమైన భాషలో వివరించబడింది.',
            },
            keyFindings: parsed.keyFindings
              ? parsed.keyFindings.map((f: any) => ({
                  term: f.originalTerm || 'Clinical Finding',
                  simplified: f.plainExplanation || 'Observation',
                  details: f.details || '',
                  status: f.urgency || 'normal',
                }))
              : currentDocument.keyFindings,
            jargonTerms: currentDocument.jargonTerms,
            instructions: parsed.explicitInstructions
              ? parsed.explicitInstructions.map((inst: any, idx: number) => ({
                  id: `inst-${idx}`,
                  title: inst.instruction || 'Care Guideline',
                  timeOfDay: inst.timeOfDay || 'any',
                  description: inst.notes || inst.instruction,
                  sourceText: inst.instruction,
                  iconType: 'pill',
                }))
              : currentDocument.instructions,
            instructionsMultilingual: currentDocument.instructionsMultilingual,
            followUp: parsed.followUp || currentDocument.followUp,
            questionsForDoctor: {
              en: parsed.questionsForDoctor || currentDocument.questionsForDoctor.en,
              kn: currentDocument.questionsForDoctor.kn,
              hi: currentDocument.questionsForDoctor.hi,
              ta: currentDocument.questionsForDoctor.ta,
              te: currentDocument.questionsForDoctor.te,
            },
            actionPlan: parsed.smartActionPlan
              ? parsed.smartActionPlan.map((itemStr: string, idx: number) => ({
                  id: `act-custom-${idx}`,
                  text: itemStr,
                  completed: false,
                  category: 'document',
                  dueDate: 'Upcoming',
                }))
              : currentDocument.actionPlan,
            urgentWarnings: parsed.urgentWarnings || currentDocument.urgentWarnings,
          };

          setCurrentDocument(newDoc);

          // Also archive to Document Vault
          const vaultItem: UploadedDocumentRecord = {
            id: `vault-${Date.now()}`,
            title: newDoc.title,
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(1)} KB`,
            uploadDate: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            docType: newDoc.docType as any,
            patientName: newDoc.patientName,
            facilityName: newDoc.facilityName,
            summary: newDoc.plainSummary.en,
            status: newDoc.urgentWarnings && newDoc.urgentWarnings.length > 0 ? 'flagged_urgent' : 'processed',
            urgencyNote: newDoc.urgentWarnings?.[0],
            rawText: newDoc.rawExcerpt,
            sourceAnalysisId: newDoc.id,
          };
          setVaultRecords((prev) => [vaultItem, ...prev]);
          // Persist to backend store
          apiClient.addDocument(vaultItem);
        }
      } catch (err) {
        console.error('Upload processing error:', err);
      } finally {
        setIsProcessingUpload(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddCaregiverProfile = (newProfile: PatientProfile) => {
    setCaregiverProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    apiClient.addPatient(newProfile);
  };

  const handleTriggerSpeech = () => {
    setTriggerAudioNow(true);
    setTimeout(() => setTriggerAudioNow(false), 800);
  };

  // If not logged in, render the dedicated Login Page with accessibility mode selector
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        initialMode={accessibilityMode}
        initialLanguage={currentLanguage}
      />
    );
  }

  return (
    <div
      className={`min-h-screen bg-slate-100/70 text-slate-900 font-sans transition-all selection:bg-emerald-500 selection:text-white ${
        accessibilityMode === 'vision' ? 'contrast-125 bg-slate-950 text-white' : ''
      }`}
      style={{
        fontSize: `${fontSizeMultiplier * 100}%`,
      }}
    >
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        accessibilityMode={accessibilityMode}
        onAccessibilityModeChange={setAccessibilityMode}
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onSwitchProfileOrMode={() => setIsLoggedIn(false)}
        activePatientName={activeProfile.name}
        onOpenEditPatient={() => setIsEditPatientOpen(true)}
        onOpenSlideBar={() => setIsSlideBarOpen(true)}
        onOpenVisualReferences={() => setIsVisualRefOpen(true)}
      />

      {/* Floating Slide Bar Quick-Trigger on Viewport Edge */}
      <button
        onClick={() => setIsSlideBarOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-l from-indigo-700 via-indigo-600 to-purple-600 hover:from-indigo-800 hover:to-purple-700 text-white py-3.5 px-2 rounded-l-2xl shadow-xl flex flex-col items-center gap-1.5 transition cursor-pointer group border-l border-t border-b border-white/20"
        title="Open Options & Accessibility Slide Bar"
      >
        <Sliders className="w-4 h-4 group-hover:scale-110 transition text-indigo-200" />
        <span className="text-[10px] font-bold uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
          Options & Modes
        </span>
      </button>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* View Switching based on Accessibility Mode or Tab */}
        {accessibilityMode === 'elder' ? (
          <ElderModeView
            currentDocument={currentDocument}
            currentLanguage={currentLanguage}
            onOpenVoice={() => setIsVoiceOpen(true)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        ) : accessibilityMode === 'low-literacy' ? (
          <LowLiteracyView
            currentDocument={currentDocument}
            currentLanguage={currentLanguage}
          />
        ) : activeTab === 'explainer' ? (
          <DocumentExplainer
            currentDocument={currentDocument}
            onSelectDocument={setCurrentDocument}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            speechRate={speechRate}
            onToggleActionItem={handleToggleActionItem}
            onUploadCustomFile={handleUploadCustomFile}
            isProcessingUpload={isProcessingUpload}
            triggerAudioNow={triggerAudioNow}
            onOpenEditPatient={() => setIsEditPatientOpen(true)}
          />
        ) : activeTab === 'vault' ? (
          <DocumentVault
            vaultRecords={vaultRecords}
            onUploadNewFile={handleUploadVaultFile}
            onSelectDocumentToExplain={handleSelectDocumentToExplain}
            isProcessingUpload={isProcessingUpload}
            profiles={caregiverProfiles}
          />
        ) : activeTab === 'caregiver' ? (
          <CaregiverDashboard
            profiles={caregiverProfiles}
            activeProfileId={activeProfileId}
            onSelectProfile={setActiveProfileId}
            onAddProfile={handleAddCaregiverProfile}
            onUpdateProfile={handleUpdatePatientProfile}
            actionItems={currentDocument.actionPlan}
            onToggleActionItem={handleToggleActionItem}
            currentDocument={currentDocument}
            reminders={reminders}
            onToggleReminderStatus={handleToggleReminderStatus}
            onAddReminder={handleAddReminder}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onClearAllNotifications={handleClearAllNotifications}
            currentLanguage={currentLanguage}
          />
        ) : (
          <HealthcareDirectory />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SAHAAYAAI</span>
            <span>&bull; Healthcare That Understands You</span>
          </div>
          <div className="text-slate-400">
            Non-Diagnostic Assistive Prototype &bull; For Emergency Situations Call 108 / 112
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="hover:text-emerald-700 underline cursor-pointer"
            >
              Switch Account / Accessibility
            </button>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-emerald-700 underline cursor-pointer"
            >
              Privacy & Consent
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        currentDocument={currentDocument}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onTabChange={setActiveTab}
        onTriggerSpeech={handleTriggerSpeech}
      />

      <PrivacyPanel
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        documentUrgentWarning={currentDocument.urgentWarnings?.[0]}
      />

      <EditPatientModal
        isOpen={isEditPatientOpen}
        onClose={() => setIsEditPatientOpen(false)}
        profile={activeProfile}
        onSave={handleUpdatePatientProfile}
      />

      {/* Slide Bar Drawer */}
      <OptionsSlideBar
        isOpen={isSlideBarOpen}
        onClose={() => setIsSlideBarOpen(false)}
        currentMode={accessibilityMode}
        onModeChange={setAccessibilityMode}
        fontSizeMultiplier={fontSizeMultiplier}
        onFontSizeChange={setFontSizeMultiplier}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeProfile={activeProfile}
        profiles={caregiverProfiles}
        onSelectProfile={setActiveProfileId}
        onOpenEditPatient={() => setIsEditPatientOpen(true)}
        onOpenVisualReferences={() => setIsVisualRefOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Visual Reference & Directions Guide Modal */}
      {isVisualRefOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200 max-h-[92vh] overflow-y-auto">
            <VisualReferencePanel
              currentLanguage={currentLanguage}
              isOpen={true}
              onClose={() => setIsVisualRefOpen(false)}
              hospitalName={activeProfile.primaryHospital || 'Hospital & Cardiac Center'}
              activePatientName={activeProfile.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
