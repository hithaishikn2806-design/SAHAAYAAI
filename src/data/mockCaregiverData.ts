import { PatientProfile } from '../types';

export const INITIAL_CAREGIVER_PROFILES: PatientProfile[] = [
  {
    id: 'pt-1',
    name: 'Patient 1',
    relationship: 'Father',
    age: 72,
    gender: 'Male',
    bloodGroup: 'B Positive (B+)',
    emergencyContact: {
      name: 'Family Caregiver',
      phone: '+91 98450 12345',
      relation: 'Family Caregiver',
    },
    allergies: ['Penicillin (skin rash)', 'Sulfa drugs'],
    knownConditions: [
      'Coronary Artery Disease (CAD) - Post PTCA Stent',
      'Hypertension (Blood Pressure)',
      'Knee Joint Osteoarthritis',
    ],
    primaryDoctor: 'Dr. Suresh Kamath (Cardiologist)',
    primaryHospital: 'Manipal Heart Foundation',
    upcomingAppointments: [
      {
        id: 'apt-1',
        doctor: 'Dr. Suresh Kamath',
        specialty: 'Interventional Cardiology',
        date: '14-Oct-2026',
        time: '10:30 AM',
        hospital: 'Manipal Heart Foundation, Room 204',
        carryList: [
          'Post-Angioplasty Discharge Summary',
          'ECG strip',
          'List of questions prepared on SAHAAYAAI',
          'All current medication boxes',
        ],
      },
      {
        id: 'apt-2',
        doctor: 'Dr. C. Mohan',
        specialty: 'Orthopaedics & Joint Care',
        date: '26-Oct-2026',
        time: '02:00 PM',
        hospital: 'Sanjay Gandhi Institute of Orthopaedics',
        carryList: ['OPD Slip', 'Knee X-ray films'],
      },
    ],
    recentDocuments: [
      'sample_discharge_summary.pdf (Verified Post-Angioplasty)',
      'sample_prescription.pdf (Orthopedic Care)',
    ],
    caregiverNotes:
      'Needs gentle encouragement for light morning walks. Remind to take bedtime cholesterol tablet strictly with water.',
  },
  {
    id: 'pt-2',
    name: 'Patient 2',
    relationship: 'Mother',
    age: 65,
    gender: 'Female',
    bloodGroup: 'O Positive (O+)',
    emergencyContact: {
      name: 'Family Caregiver',
      phone: '+91 98450 12345',
      relation: 'Caregiver',
    },
    allergies: ['No known drug allergies reported'],
    knownConditions: [
      'Type 2 Diabetes Mellitus (Elevated HbA1c)',
      'Hyperlipidemia (Cholesterol)',
    ],
    primaryDoctor: 'Dr. Ananya Rao (Endocrinologist)',
    primaryHospital: 'Apollo Clinic, Malleshwaram',
    upcomingAppointments: [
      {
        id: 'apt-3',
        doctor: 'Dr. Ananya Rao',
        specialty: 'Endocrinology & Diabetology',
        date: '11-Oct-2026',
        time: '11:00 AM',
        hospital: 'Apollo Clinic, Malleshwaram',
        carryList: [
          'Metropolis Lab Report (Fasting sugar, HbA1c)',
          'Fasting sugar log book',
          'Current diabetes medication strips',
        ],
      },
    ],
    recentDocuments: ['sample_lab_report.pdf (Comprehensive Diagnostic Panel)'],
    caregiverNotes:
      'Provide low-glycemic balanced meals. Keep glucose tablets / fruit juice handy in case of sudden dizziness or shakiness.',
  },
];
