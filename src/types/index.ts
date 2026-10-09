export type SupportedLanguage = 'en' | 'kn' | 'hi' | 'ta' | 'te';

export type AccessibilityMode = 'standard' | 'elder' | 'vision' | 'hearing' | 'low-literacy';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechCode: string;
  flag: string;
}

export interface JargonTerm {
  medicalTerm: string;
  simplifiedTerm: string;
  explanation: string;
  category: 'condition' | 'medication' | 'instruction' | 'lab';
}

export interface InstructionItem {
  id: string;
  title: string;
  timeOfDay: 'morning' | 'afternoon' | 'night' | 'as_needed' | 'continuous' | 'any';
  mealTiming?: 'before_food' | 'with_food' | 'after_food' | 'anytime';
  description: string;
  sourceText: string;
  iconType: 'pill' | 'rest' | 'water' | 'wound' | 'diet' | 'activity';
}

export interface SmartActionItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'appointment' | 'document' | 'medication' | 'caregiver' | 'precaution';
  dueDate?: string;
}

export interface DoctorQuestion {
  id: string;
  question: string;
  reason: string;
  suggestedBy: 'document_finding' | 'medication_care' | 'followup_clarification';
}

export interface DocumentAnalysis {
  id: string;
  title: string;
  fileName: string;
  docType: 'Discharge Summary' | 'Laboratory Investigation' | 'Outpatient Prescription';
  facilityName: string;
  documentDate: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  rawExcerpt: string;
  plainSummary: {
    en: string;
    kn: string;
    hi: string;
    ta: string;
    te: string;
  };
  keyFindings: Array<{
    term: string;
    simplified: string;
    details: string;
    status: 'normal' | 'attention' | 'urgent';
  }>;
  jargonTerms: JargonTerm[];
  instructions: InstructionItem[];
  instructionsMultilingual: {
    en: string[];
    kn: string[];
    hi: string[];
    ta: string[];
    te: string[];
  };
  followUp: {
    date: string;
    doctorName: string;
    specialty: string;
    hospital: string;
    documentsToCarry: string[];
  };
  questionsForDoctor: {
    en: string[];
    kn: string[];
    hi: string[];
    ta: string[];
    te: string[];
  };
  actionPlan: SmartActionItem[];
  urgentWarnings: string[];
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Specialist' | 'Lab' | 'Pharmacy';
  specialty?: string;
  languagesSpoken: string[];
  distanceKm: number;
  address: string;
  area: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  operatingHours: string;
  isAyushmanEmpaneled: boolean;
  accessibilityFeatures: {
    wheelchair: boolean;
    signLanguage: boolean;
    elderPriorityCounter: boolean;
    multilingualHelpdesk: boolean;
  };
  whatToCarry: string[];
}

export interface PatientProfile {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  allergies: string[];
  knownConditions: string[];
  primaryDoctor: string;
  primaryHospital: string;
  upcomingAppointments: Array<{
    id: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    hospital: string;
    carryList: string[];
  }>;
  recentDocuments: string[];
  caregiverNotes: string;
}

export interface MedicationReminder {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  dosage: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Gel';
  frequency: 'daily' | 'weekly' | 'monthly' | 'as_needed';
  time: string; // e.g. "08:30"
  timeOfDayLabel?: 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'Bedtime';
  daysOfWeek?: string[]; // e.g. ['Mon', 'Wed', 'Fri']
  dayOfMonth?: number;
  mealRelation: 'before_food' | 'with_food' | 'after_food' | 'anytime';
  instructions: string;
  derivedFromDoc: string;
  caregiverAlertChannels: Array<'in_app' | 'sms' | 'whatsapp' | 'audio'>;
  status: 'scheduled' | 'taken' | 'snoozed' | 'missed';
  lastTakenTimestamp?: string;
}

export interface CaregiverNotification {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string;
  message: string;
  type: 'due' | 'taken' | 'missed' | 'snoozed';
  timestamp: string;
  read: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  specialty: string;
  subSpecialties: string[];
  experienceYears: number;
  hospital: string;
  department: string;
  roomNumber: string;
  languagesSpoken: string[];
  consultationHours: string;
  daysAvailable: string[];
  fee: string;
  isAyushmanFree: boolean;
  phone: string;
  emergencyContact: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  whatToBring: string[];
}

export interface UploadedDocumentRecord {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  docType: 'Discharge Summary' | 'Laboratory Investigation' | 'Outpatient Prescription' | 'Imaging / X-Ray' | 'Vaccination Record';
  patientName: string;
  facilityName: string;
  summary: string;
  status: 'processed' | 'pending' | 'flagged_urgent';
  rawText: string;
  urgencyNote?: string;
  sourceAnalysisId: string;
}

export interface UserAccount {
  id: string;
  name: string;
  role: 'caregiver' | 'patient' | 'healthcare_worker';
  relationship?: string;
  email: string;
  phone: string;
  preferredLanguage: SupportedLanguage;
  accessibilityMode: AccessibilityMode;
  patientsUnderCare: string[];
}

