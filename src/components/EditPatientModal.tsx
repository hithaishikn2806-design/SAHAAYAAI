import React, { useState, useEffect } from 'react';
import {
  User,
  Heart,
  Phone,
  AlertCircle,
  Stethoscope,
  Building2,
  FileText,
  Save,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PatientProfile } from '../types';

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PatientProfile;
  onSave: (updatedProfile: PatientProfile) => void;
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [gender, setGender] = useState(profile.gender);
  const [relationship, setRelationship] = useState(profile.relationship);
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup);

  const [emergencyName, setEmergencyName] = useState(profile.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(profile.emergencyContact.phone);
  const [emergencyRel, setEmergencyRel] = useState(profile.emergencyContact.relation);

  const [allergies, setAllergies] = useState(profile.allergies.join(', '));
  const [conditions, setConditions] = useState(profile.knownConditions.join(', '));
  const [primaryDoctor, setPrimaryDoctor] = useState(profile.primaryDoctor || '');
  const [primaryHospital, setPrimaryHospital] = useState(profile.primaryHospital || '');
  const [caregiverNotes, setCaregiverNotes] = useState(profile.caregiverNotes);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync state when profile prop changes
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAge(profile.age);
      setGender(profile.gender);
      setRelationship(profile.relationship);
      setBloodGroup(profile.bloodGroup);
      setEmergencyName(profile.emergencyContact.name);
      setEmergencyPhone(profile.emergencyContact.phone);
      setEmergencyRel(profile.emergencyContact.relation);
      setAllergies(profile.allergies.join(', '));
      setConditions(profile.knownConditions.join(', '));
      setPrimaryDoctor(profile.primaryDoctor || '');
      setPrimaryHospital(profile.primaryHospital || '');
      setCaregiverNotes(profile.caregiverNotes);
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated: PatientProfile = {
      ...profile,
      name: name.trim(),
      age: Number(age) || profile.age,
      gender,
      relationship,
      bloodGroup,
      emergencyContact: {
        name: emergencyName.trim() || 'Caregiver',
        phone: emergencyPhone.trim() || '+91 98450 12345',
        relation: emergencyRel.trim() || relationship,
      },
      allergies: allergies
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      knownConditions: conditions
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      primaryDoctor: primaryDoctor.trim() || 'Attending Physician',
      primaryHospital: primaryHospital.trim() || 'Healthcare Center',
      caregiverNotes: caregiverNotes.trim(),
    };

    onSave(updated);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 600);
  };

  const handleApplyPreset = (type: 'senior' | 'chronic' | 'blank') => {
    if (type === 'senior') {
      setName('Senior Patient');
      setAge(75);
      setGender('Male');
      setRelationship('Father');
      setBloodGroup('B Positive (B+)');
      setEmergencyName('Family Caregiver');
      setEmergencyPhone('+91 98450 12345');
      setEmergencyRel('Son / Daughter');
      setAllergies('Penicillin, Sulfa drugs');
      setConditions('Hypertension, Post-Angioplasty Stent, Knee Osteoarthritis');
      setPrimaryDoctor('Dr. Suresh Kamath (Cardiologist)');
      setPrimaryHospital('Manipal Heart Foundation');
      setCaregiverNotes('Needs gentle encouragement for light morning walks. Remind bedtime medications.');
    } else if (type === 'chronic') {
      setName('Chronic Care Patient');
      setAge(64);
      setGender('Female');
      setRelationship('Mother');
      setBloodGroup('O Positive (O+)');
      setEmergencyName('Family Caregiver');
      setEmergencyPhone('+91 98450 67890');
      setEmergencyRel('Family Member');
      setAllergies('No known drug allergies reported');
      setConditions('Type 2 Diabetes Mellitus, Hyperlipidemia');
      setPrimaryDoctor('Dr. Ananya Rao (Endocrinologist)');
      setPrimaryHospital('Apollo Clinic');
      setCaregiverNotes('Provide low-glycemic balanced meals. Keep glucose tablets handy.');
    } else {
      setName('');
      setAge(60);
      setGender('Male');
      setRelationship('Self');
      setBloodGroup('B Positive (B+)');
      setEmergencyName('');
      setEmergencyPhone('');
      setEmergencyRel('Caregiver');
      setAllergies('');
      setConditions('');
      setCaregiverNotes('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-patient-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
          aria-label="Close edit patient details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="edit-patient-title" className="text-xl sm:text-2xl font-black text-slate-900">
                Update Patient Personal Details
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active Profile
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes update immediately across Document Explainer, Reminders, and Caregiver Hub
            </p>
          </div>
        </div>

        {/* Quick Fill Presets */}
        <div className="mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Quick Presets:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleApplyPreset('senior')}
              className="text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-800 border border-slate-200 px-2.5 py-1 rounded-xl transition cursor-pointer"
            >
              Senior Care Profile
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('chronic')}
              className="text-[11px] font-semibold bg-white hover:bg-teal-50 text-teal-800 border border-slate-200 px-2.5 py-1 rounded-xl transition cursor-pointer"
            >
              Chronic Care Profile
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('blank')}
              className="text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-xl transition cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name & Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Patient Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter patient's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Relationship to Caregiver
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Grandfather">Grandfather</option>
                <option value="Grandmother">Grandmother</option>
                <option value="Spouse">Spouse</option>
                <option value="Self">Self (Patient)</option>
                <option value="Child">Child (Son / Daughter)</option>
                <option value="Relative">Relative</option>
                <option value="Friend">Friend / Neighbor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Age <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="125"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white transition"
              >
                <option value="B Positive (B+)">B Positive (B+)</option>
                <option value="O Positive (O+)">O Positive (O+)</option>
                <option value="A Positive (A+)">A Positive (A+)</option>
                <option value="AB Positive (AB+)">AB Positive (AB+)</option>
                <option value="B Negative (B-)">B Negative (B-)</option>
                <option value="O Negative (O-)">O Negative (O-)</option>
                <option value="A Negative (A-)">A Negative (A-)</option>
                <option value="AB Negative (AB-)">AB Negative (AB-)</option>
              </select>
            </div>
          </div>

          {/* Primary Emergency Contact */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Primary Emergency Contact Details
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Contact Name (e.g. Caregiver)"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Phone Number (+91 ...)"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
              <input
                type="text"
                placeholder="Relationship (e.g. Son, Daughter)"
                value={emergencyRel}
                onChange={(e) => setEmergencyRel(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Clinical Allergies & Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-500" />
                Reported Drug / Food Allergies
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin, Sulfa drugs, Peanuts"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Separate with commas</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Heart className="w-3 h-3 text-emerald-600" />
                Known Clinical Conditions
              </label>
              <input
                type="text"
                placeholder="e.g. Hypertension, Diabetes, Knee Joint Osteoarthritis"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Separate with commas</span>
            </div>
          </div>

          {/* Primary Doctor & Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Stethoscope className="w-3 h-3 text-teal-600" />
                Primary Doctor
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Suresh Kamath (Cardiologist)"
                value={primaryDoctor}
                onChange={(e) => setPrimaryDoctor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-indigo-600" />
                Primary Hospital / Clinic
              </label>
              <input
                type="text"
                placeholder="e.g. Manipal Heart Foundation"
                value={primaryHospital}
                onChange={(e) => setPrimaryHospital(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white"
              />
            </div>
          </div>

          {/* Caregiver Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-slate-500" />
              Caregiver Notes & Daily Preferences
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Needs gentle encouragement for light morning walks. Remind bedtime medicines with water."
              value={caregiverNotes}
              onChange={(e) => setCaregiverNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              {showSuccessToast ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Patient details updated across platform!
                </span>
              ) : (
                'Synchronizes with Explainer, Reminders & Caregiver Hub'
              )}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Patient Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
