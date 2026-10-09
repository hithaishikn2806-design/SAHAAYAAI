import React, { useState } from 'react';
import {
  Compass,
  Search,
  Building2,
  Stethoscope,
  FlaskConical,
  Pill,
  Accessibility,
  Languages,
  Phone,
  PhoneCall,
  Clock,
  MapPin,
  CheckCircle,
  FileText,
  BadgeCheck,
  AlertCircle,
  Filter,
  Star,
  Award,
  Calendar,
  Sparkles,
  UserCheck,
  Check,
  X,
} from 'lucide-react';
import { HealthcareFacility, DoctorProfile } from '../types';
import { MOCK_HEALTHCARE_DIRECTORY } from '../data/mockHealthcareDirectory';
import { MOCK_DOCTORS } from '../data/mockDoctors';

export const HealthcareDirectory: React.FC = () => {
  const [activeDirectoryTab, setActiveDirectoryTab] = useState<'doctors' | 'facilities'>('doctors');
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('All');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [onlyWheelchair, setOnlyWheelchair] = useState(false);
  const [onlyAyushman, setOnlyAyushman] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(MOCK_DOCTORS[0]);
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(
    MOCK_HEALTHCARE_DIRECTORY[0]
  );
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Doctors filtering
  const filteredDoctors = MOCK_DOCTORS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subSpecialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSpecialty = specialtyFilter === 'All' || doc.specialty === specialtyFilter;
    const matchesLang = languageFilter === 'All' || doc.languagesSpoken.includes(languageFilter);
    const matchesAyushman = !onlyAyushman || doc.isAyushmanFree;

    return matchesSearch && matchesSpecialty && matchesLang && matchesAyushman;
  });

  // Facilities filtering
  const filteredFacilities = MOCK_HEALTHCARE_DIRECTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.specialty && item.specialty.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesLang = languageFilter === 'All' || item.languagesSpoken.includes(languageFilter);
    const matchesWheelchair = !onlyWheelchair || item.accessibilityFeatures.wheelchair;
    const matchesAyushman = !onlyAyushman || item.isAyushmanEmpaneled;

    return matchesSearch && matchesType && matchesLang && matchesWheelchair && matchesAyushman;
  });

  const handleBookDoctor = (doc: DoctorProfile) => {
    setBookingSuccessMsg(`Consultation request logged for ${doc.name} at ${doc.hospital} (${doc.roomNumber})! Reminder added to your Caregiver checklist.`);
    setTimeout(() => setBookingSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Demo Disclosure Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-amber-900">
            DEMO & SIMULATED HEALTHCARE DIRECTORY (VERIFIED DOCTORS & CENTRES)
          </h3>
          <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
            Clear provider profiles for Bengaluru & Karnataka healthcare navigation. In production, this syncs with the National Health Authority (NHA) & Ayushman Bharat Digital Mission (ABDM) Health Facility & Healthcare Professional Registry (HPR).
          </p>
        </div>
      </div>

      {bookingSuccessMsg && (
        <div className="bg-emerald-800 text-white p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>{bookingSuccessMsg}</span>
          </div>
          <button onClick={() => setBookingSuccessMsg(null)} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Filter & Navigation Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <Compass className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Healthcare Navigation & Clear Provider Directory
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed doctor profiles with OPD rooms, consultation hours, languages spoken, and fees
            </p>
          </div>

          {/* Directory Mode Switcher: Doctors vs Facilities */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveDirectoryTab('doctors')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeDirectoryTab === 'doctors'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctors & Specialists ({MOCK_DOCTORS.length})</span>
            </button>
            <button
              onClick={() => setActiveDirectoryTab('facilities')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeDirectoryTab === 'facilities'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Hospitals, Labs & Pharmacies ({MOCK_HEALTHCARE_DIRECTORY.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Accessibility Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeDirectoryTab === 'doctors'
                  ? 'Search by doctor name, specialty, condition...'
                  : 'Search by hospital, clinic, lab or area...'
              }
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {activeDirectoryTab === 'doctors' ? (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Specialty:</label>
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology (Heart Care)</option>
                <option value="Endocrinology & Diabetology">Diabetology & Endocrinology</option>
                <option value="Orthopaedics">Orthopaedics (Joint & Bone)</option>
                <option value="Geriatric Medicine">Geriatric Medicine (Senior Care)</option>
                <option value="Neurology">Neurology (Nerve & Brain)</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Facility Type:</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="All">All Facilities</option>
                <option value="Hospital">Hospitals</option>
                <option value="Clinic">Clinics</option>
                <option value="Specialist">Specialist Centres</option>
                <option value="Lab">Diagnostic Labs</option>
                <option value="Pharmacy">24/7 Pharmacies</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Language:</label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="All">All Languages</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                checked={onlyAyushman}
                onChange={(e) => setOnlyAyushman(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span>PM-JAY Free</span>
            </label>
          </div>
        </div>
      </div>

      {/* VIEW 1: CLEAR INFORMATION ON DOCTORS LIST */}
      {activeDirectoryTab === 'doctors' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Doctors List Column */}
          <div className="lg:col-span-2 space-y-3">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200 text-xs sm:text-sm">
                No doctors found matching your criteria. Try loosening filters.
              </div>
            ) : (
              filteredDoctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 font-black text-lg flex items-center justify-center shrink-0 border border-amber-200">
                          {doc.name.split(' ')[1]?.[0] || 'D'}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-xs font-black text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                              {doc.specialty}
                            </span>
                            {doc.isAyushmanFree && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                Free with PM-JAY
                              </span>
                            )}
                            <span className="text-[11px] font-semibold text-slate-500">
                              {doc.experienceYears}+ Yrs Experience
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900">
                            {doc.name}
                          </h3>

                          <p className="text-xs text-slate-600 font-medium">
                            {doc.title} &bull; <span className="text-slate-400">{doc.qualifications}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                          {doc.fee}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center sm:justify-end gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-700">{doc.rating}</span>
                          <span>({doc.reviewsCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{doc.hospital} ({doc.roomNumber})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{doc.consultationHours} ({doc.daysAvailable.slice(0, 3).join(', ')})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2 mt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-400 font-medium">Languages:</span>
                      {doc.languagesSpoken.map((lang, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Selected Doctor Card */}
          {selectedDoctor && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] uppercase font-bold text-amber-700">
                  Doctor Profile & Consultation Guide
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedDoctor.name}
                </h3>
                <p className="text-xs text-slate-600 font-semibold">
                  {selectedDoctor.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {selectedDoctor.qualifications}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Clinical Bio & Focus Areas:</span>
                </div>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedDoctor.bio}
                </p>
              </div>

              {/* OPD Room & Hours */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-950">
                  Hospital & Room: {selectedDoctor.hospital} &bull; {selectedDoctor.roomNumber}
                </div>
                <div className="text-amber-900">
                  <strong>Consultation Hours:</strong> {selectedDoctor.consultationHours}
                </div>
                <div className="text-amber-800">
                  <strong>Available Days:</strong> {selectedDoctor.daysAvailable.join(', ')}
                </div>
                <div className="text-amber-900 font-bold mt-1">
                  Fee: {selectedDoctor.fee}
                </div>
              </div>

              {/* Contact numbers */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Contact & Appointments:</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800">{selectedDoctor.phone}</span>
                  <a
                    href={`tel:${selectedDoctor.phone.split(' ')[0]}`}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    Call Reception
                  </a>
                </div>
              </div>

              {/* Checklist: What to bring for this doctor */}
              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>Checklist: What to bring for {selectedDoctor.name}:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-blue-950">
                  {selectedDoctor.whatToBring.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBookDoctor(selectedDoctor)}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition cursor-pointer"
              >
                + Add Appointment to Caregiver Checklist
              </button>
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: FACILITIES (Hospitals, Clinics, Labs & Pharmacies) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {filteredFacilities.map((item) => {
              const isSelected = selectedFacility?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFacility(item)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.type}
                        </span>
                        {item.isAyushmanEmpaneled && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            PM-JAY Empaneled
                          </span>
                        )}
                        <span className="text-xs font-bold text-amber-700">
                          {item.distanceKm} km away
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.name}
                      </h3>
                      {item.specialty && (
                        <p className="text-xs text-slate-500 font-medium">
                          {item.specialty}
                        </p>
                      )}
                    </div>

                    <div className="text-left sm:text-right text-xs text-slate-500">
                      <div className="flex items-center sm:justify-end gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.area}, {item.city}</span>
                      </div>
                      <div className="font-mono text-emerald-700 font-bold mt-1">
                        {item.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 mr-1">Languages:</span>
                    {item.languagesSpoken.map((lang, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {lang}
                      </span>
                    ))}
                    <div className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-600">
                      {item.accessibilityFeatures.wheelchair && (
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          &check; Wheelchair
                        </span>
                      )}
                      {item.accessibilityFeatures.signLanguage && (
                        <span className="text-indigo-700 font-bold flex items-center gap-0.5">
                          &check; Sign Language
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedFacility && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] uppercase font-bold text-amber-700">
                  Selected Facility
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedFacility.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedFacility.address}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Operating Hours:</span>
                </div>
                <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                  {selectedFacility.operatingHours}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpline & Reception:</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div className="font-bold text-emerald-950">Phone: {selectedFacility.phone}</div>
                  <div className="text-rose-700 font-bold mt-0.5">
                    Emergency: {selectedFacility.emergencyPhone}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>What to Carry for Your Visit:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {selectedFacility.whatToCarry.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
