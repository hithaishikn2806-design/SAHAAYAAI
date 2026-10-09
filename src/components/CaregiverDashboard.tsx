import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  FileText,
  CheckSquare,
  HelpCircle,
  Phone,
  Shield,
  Heart,
  AlertCircle,
  Clock,
  MapPin,
  Plus,
  Share2,
  Printer,
  ChevronRight,
  Pill,
  Compass,
} from 'lucide-react';
import {
  PatientProfile,
  SmartActionItem,
  DocumentAnalysis,
  MedicationReminder,
  CaregiverNotification,
  SupportedLanguage,
} from '../types';
import { MedicationReminders } from './MedicationReminders';
import { VisualReferencePanel } from './VisualReferencePanel';
import { t } from '../utils/i18n';

interface CaregiverDashboardProps {
  profiles: PatientProfile[];
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  onAddProfile: (profile: PatientProfile) => void;
  onUpdateProfile: (profile: PatientProfile) => void;
  actionItems: SmartActionItem[];
  onToggleActionItem: (id: string) => void;
  currentDocument: DocumentAnalysis;
  reminders: MedicationReminder[];
  onToggleReminderStatus: (reminderId: string, newStatus: 'taken' | 'snoozed' | 'missed' | 'scheduled') => void;
  onAddReminder: (reminder: MedicationReminder) => void;
  notifications: CaregiverNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  currentLanguage?: SupportedLanguage;
}

export const CaregiverDashboard: React.FC<CaregiverDashboardProps> = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  actionItems,
  onToggleActionItem,
  currentDocument,
  reminders,
  onToggleReminderStatus,
  onAddReminder,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  currentLanguage = 'en',
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [newPtName, setNewPtName] = useState('');

  const [newPtRel, setNewPtRel] = useState('Parent');
  const [newPtAge, setNewPtAge] = useState(70);
  const [newPtGender, setNewPtGender] = useState('Female');
  const [newPtCondition, setNewPtCondition] = useState('');

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Edit form state
  const [editName, setEditName] = useState(activeProfile.name);
  const [editAge, setEditAge] = useState(activeProfile.age);
  const [editGender, setEditGender] = useState(activeProfile.gender);
  const [editRelationship, setEditRelationship] = useState(activeProfile.relationship);
  const [editBloodGroup, setEditBloodGroup] = useState(activeProfile.bloodGroup);
  const [editEmergencyName, setEditEmergencyName] = useState(activeProfile.emergencyContact.name);
  const [editEmergencyPhone, setEditEmergencyPhone] = useState(activeProfile.emergencyContact.phone);
  const [editEmergencyRel, setEditEmergencyRel] = useState(activeProfile.emergencyContact.relation);
  const [editAllergies, setEditAllergies] = useState(activeProfile.allergies.join(', '));
  const [editConditions, setEditConditions] = useState(activeProfile.knownConditions.join(', '));
  const [editNotes, setEditNotes] = useState(activeProfile.caregiverNotes);

  const openEditModal = () => {
    setEditName(activeProfile.name);
    setEditAge(activeProfile.age);
    setEditGender(activeProfile.gender);
    setEditRelationship(activeProfile.relationship);
    setEditBloodGroup(activeProfile.bloodGroup);
    setEditEmergencyName(activeProfile.emergencyContact.name);
    setEditEmergencyPhone(activeProfile.emergencyContact.phone);
    setEditEmergencyRel(activeProfile.emergencyContact.relation);
    setEditAllergies(activeProfile.allergies.join(', '));
    setEditConditions(activeProfile.knownConditions.join(', '));
    setEditNotes(activeProfile.caregiverNotes);
    setShowEditModal(true);
  };

  const handleSaveEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const updatedProfile: PatientProfile = {
      ...activeProfile,
      name: editName.trim(),
      age: Number(editAge),
      gender: editGender,
      relationship: editRelationship,
      bloodGroup: editBloodGroup,
      emergencyContact: {
        name: editEmergencyName.trim(),
        phone: editEmergencyPhone.trim(),
        relation: editEmergencyRel.trim(),
      },
      allergies: editAllergies.split(',').map((s) => s.trim()).filter(Boolean),
      knownConditions: editConditions.split(',').map((s) => s.trim()).filter(Boolean),
      caregiverNotes: editNotes.trim(),
    };

    onUpdateProfile(updatedProfile);
    setShowEditModal(false);
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPtName.trim()) return;

    const newProfile: PatientProfile = {
      id: `pt-${Date.now()}`,
      name: newPtName.trim(),
      relationship: newPtRel,
      age: Number(newPtAge),
      gender: newPtGender,
      bloodGroup: 'B Positive (B+)',
      emergencyContact: {
        name: 'Caregiver',
        phone: '+91 98450 00000',
        relation: newPtRel,
      },
      allergies: ['No known allergies documented'],
      knownConditions: newPtCondition ? [newPtCondition] : ['General Geriatric Follow-up'],
      primaryDoctor: 'Dr. Family Physician',
      primaryHospital: 'Community Health Center',
      upcomingAppointments: [
        {
          id: `apt-${Date.now()}`,
          doctor: 'Dr. Family Physician',
          specialty: 'General Medicine',
          date: 'Next Week',
          time: '10:00 AM',
          hospital: 'Community Health Center',
          carryList: ['Previous prescriptions', 'Aadhaar Card'],
        },
      ],
      recentDocuments: ['Custom uploaded record'],
      caregiverNotes: 'Caregiver profile created for demonstration sandbox.',
    };

    onAddProfile(newProfile);
    setShowAddModal(false);
    setNewPtName('');
    setNewPtCondition('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm border border-blue-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                Caregiver Hub
              </span>
              <span className="text-xs text-blue-200">
                Helping adult children and family manage elderly parents' care
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Family Patient Profiles & Care Oversight
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Synced with medical records: upcoming visits, action tasks, and doctor questions
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowVisualGuide(!showVisualGuide)}
              className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-xs"
              title="Visual Pill Photos & Hospital Wayfinding"
            >
              <Compass className="w-4 h-4" />
              <span>{showVisualGuide ? 'Hide Visual Guide' : 'Visual Guide & Pills'}</span>
            </button>
            <button
              onClick={openEditModal}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer border border-white/20"
            >
              <span>✏️ {t('editPatient', currentLanguage)}</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer shrink-0 shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('addPatient', currentLanguage)}</span>
            </button>
          </div>
        </div>

        {/* Profile Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-blue-800/60">
          <span className="text-xs font-bold text-blue-300 shrink-0">{t('switchPatient', currentLanguage)}:</span>
          {profiles.map((p) => {
            const isSelected = p.id === activeProfile.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProfile(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white text-blue-950 shadow-md ring-2 ring-blue-300'
                    : 'bg-blue-950/60 text-blue-200 hover:bg-blue-900 border border-blue-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{p.name} ({p.relationship})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Visual Reference & Directions Guide Section */}
      {showVisualGuide && (
        <VisualReferencePanel
          currentLanguage={currentLanguage}
          isOpen={true}
          onClose={() => setShowVisualGuide(false)}
          activePatientName={activeProfile.name}
          hospitalName={activeProfile.primaryHospital || 'Hospital & Cardiac Center'}
        />
      )}

      {/* Patient Information Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Patient Profile Overview Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">
                {t('patientProfile', currentLanguage)}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeProfile.name}</h3>
              <p className="text-xs text-slate-500">
                {activeProfile.relationship} &bull; {activeProfile.age} {t('years', currentLanguage)} &bull; {activeProfile.gender}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                {activeProfile.bloodGroup}
              </span>
              <button
                onClick={openEditModal}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
                title="Edit name, age, emergency contact, conditions"
              >
                <span>{t('editPatient', currentLanguage)}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('emergencyContact', currentLanguage)}:</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800">
              <div className="font-bold">{activeProfile.emergencyContact.name} ({activeProfile.emergencyContact.relation})</div>
              <div className="text-slate-600 font-mono mt-0.5">{activeProfile.emergencyContact.phone}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('reportedAllergies', currentLanguage)}:</span>
            </div>
            <div className="space-y-1">
              {activeProfile.allergies.map((allergy, i) => (
                <div key={i} className="text-xs text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {allergy}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('knownConditions', currentLanguage)}:</span>
            </div>
            <div className="space-y-1">
              {activeProfile.knownConditions.map((cond, i) => (
                <div key={i} className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  &bull; {cond}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200">
            <div className="text-[11px] font-bold text-indigo-900 mb-1">{t('caregiverNotes', currentLanguage)}:</div>
            <p className="text-xs text-indigo-950 leading-relaxed italic">
              "{activeProfile.caregiverNotes}"
            </p>
          </div>
        </div>

        {/* Center & Right Column: Medication Reminders, Upcoming Appointments & Synced Action Tasks */}
        <div className="lg:col-span-2 space-y-5">
          {/* Medication Reminders & Caregiver Alerts System */}
          <MedicationReminders
            reminders={reminders}
            onToggleStatus={onToggleReminderStatus}
            onAddReminder={onAddReminder}
            notifications={notifications}
            onMarkNotificationRead={onMarkNotificationRead}
            onClearAllNotifications={onClearAllNotifications}
            currentDocument={currentDocument}
            patientName={activeProfile.name}
            patientId={activeProfile.id}
            currentLanguage={currentLanguage}
            upcomingAppointments={activeProfile.upcomingAppointments}
          />

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {t('upcomingAppointments', currentLanguage)}
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeProfile.upcomingAppointments.length} {t('scheduled', currentLanguage)}
              </span>
            </div>

            <div className="space-y-3">
              {activeProfile.upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {apt.doctor} &bull; <span className="text-slate-500 font-normal">{apt.specialty}</span>
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{apt.hospital}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-lg">
                        {apt.date} at {apt.time}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Checklist: What documents to carry:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {apt.carryList.map((item, i) => (
                        <span key={i} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md">
                          &check; {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up Tasks Synced from Document */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                  <CheckSquare className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Follow-up Tasks Synced from Verified Documents
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Derived directly from {currentDocument.fileName}
              </span>
            </div>

            <div className="space-y-2">
              {actionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleActionItem(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition cursor-pointer ${
                    item.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                      : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => onToggleActionItem(item.id)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="text-xs sm:text-sm font-semibold">{item.text}</span>
                  </div>
                  {item.dueDate && (
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {item.dueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Document Locker & Questions Prepared */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-xs sm:text-sm">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Verified Documents</span>
              </div>
              <div className="space-y-1.5">
                {activeProfile.recentDocuments.map((doc, idx) => (
                  <div key={idx} className="text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-xs sm:text-sm">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Questions for Doctor Ready</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentDocument.questionsForDoctor.en.length} questions prepared and formatted for quick print or WhatsApp share for your next doctor visit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Patient Profile */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Create New Patient Profile (Demo Sandbox)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter elderly family member or patient details to organize their appointments and records
            </p>

            <form onSubmit={handleCreateProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Murthy"
                  value={newPtName}
                  onChange={(e) => setNewPtName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={newPtRel}
                    onChange={(e) => setNewPtRel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Grandfather">Grandfather</option>
                    <option value="Grandmother">Grandmother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Self">Self</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={newPtAge}
                    onChange={(e) => setNewPtAge(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Known Condition</label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension, Joint pain, Diabetes"
                  value={newPtCondition}
                  onChange={(e) => setNewPtCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Patient Personal Details */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Update Patient Personal Details
                </h3>
                <p className="text-xs text-slate-500">
                  Customize patient name, age, emergency contact, and clinical notes
                </p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Father, John Doe"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={editAge}
                    onChange={(e) => setEditAge(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={editBloodGroup}
                    onChange={(e) => setEditBloodGroup(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="B Positive (B+)">B+</option>
                    <option value="O Positive (O+)">O+</option>
                    <option value="A Positive (A+)">A+</option>
                    <option value="AB Positive (AB+)">AB+</option>
                    <option value="B Negative (B-)">B-</option>
                    <option value="O Negative (O-)">O-</option>
                    <option value="A Negative (A-)">A-</option>
                    <option value="AB Negative (AB-)">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Relationship to Caregiver</label>
                <select
                  value={editRelationship}
                  onChange={(e) => setEditRelationship(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Self">Self</option>
                  <option value="Relative">Relative</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Primary Emergency Contact</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Contact Person Name"
                    value={editEmergencyName}
                    onChange={(e) => setEditEmergencyName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={editEmergencyPhone}
                    onChange={(e) => setEditEmergencyPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reported Drug / Food Allergies (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Penicillin, Sulfa drugs, Peanuts"
                  value={editAllergies}
                  onChange={(e) => setEditAllergies(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Known Clinical Conditions (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension, CAD Post-Stent, Knee Osteoarthritis"
                  value={editConditions}
                  onChange={(e) => setEditConditions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caregiver Notes & Daily Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Needs gentle encouragement for morning walks. Prefers Kannada audio."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Patient Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
