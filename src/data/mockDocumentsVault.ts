import { UploadedDocumentRecord } from '../types';

export const INITIAL_DOCUMENT_VAULT: UploadedDocumentRecord[] = [
  {
    id: 'vault-1',
    title: 'Post-Angioplasty Stent Discharge Summary',
    fileName: 'sample_discharge_summary.pdf',
    fileSize: '1.8 MB',
    uploadDate: '07-Oct-2026, 04:30 PM',
    docType: 'Discharge Summary',
    patientName: 'Patient 1',
    facilityName: 'Manipal Heart Foundation, Airport Road, Bengaluru',
    summary: 'Coronary artery disease (CAD NSTEMI) treated with Drug-Eluting Stent (DES) to LAD artery. Stable hemodynamics. 4 daily medications prescribed. Follow-up 14-Oct.',
    status: 'flagged_urgent',
    urgencyNote: 'Explicit Red-Flag: If acute retrosternal chest pain, radiating left arm discomfort, acute dyspnea, or presyncope occurs, transport immediately to ER / Call 108.',
    rawText: `DISCHARGE SUMMARY & ORDERS:
Pt: Patient 1 | Age: 72Y / M | IPD No: MH-98421 | Dept: Interventional Cardiology
Diagnosis: CAD - Acute Coronary Syndrome (NSTEMI). S/P PTCA with Drug-Eluting Stent (DES) to LAD. Essential Hypertension. Dyslipidemia.
Medications: Tab Ecosprin 75mg PO OD (PC), Tab Clopidogrel 75mg PO OD (PC), Tab Atorvastatin 40mg PO HS, Tab Metoprolol 25mg PO OD.
Care: Strict low-salt diet (<2g/day). Radial wrist dressing clean & dry for 48 hrs.
Follow-up: 14-Oct-2026 at 10:30 AM with Dr. Suresh Kamath (Room 204).`,
    sourceAnalysisId: 'doc-discharge-01',
  },
  {
    id: 'vault-2',
    title: 'Comprehensive Metabolic & Lipid Diagnostic Panel',
    fileName: 'sample_lab_report.pdf',
    fileSize: '840 KB',
    uploadDate: '06-Oct-2026, 11:15 AM',
    docType: 'Laboratory Investigation',
    patientName: 'Patient 2',
    facilityName: 'Metropolis Healthcare & Clinical Labs, Malleshwaram',
    summary: 'Fasting blood glucose 168 mg/dL (High), HbA1c 8.4% (Suboptimal control), Serum Triglycerides 280 mg/dL (Elevated). Kidney serum creatinine healthy at 0.9 mg/dL.',
    status: 'processed',
    rawText: `DIAGNOSTIC REPORT:
Patient: Patient 2 | Age: 65Y / F | Ref by: Dr. Ananya Rao | Sample: Fasting Blood
1. Fasting Blood Glucose: 168 mg/dL [HIGH]
2. Glycated Hemoglobin (HbA1c): 8.4 % [HIGH]
3. Total Cholesterol: 242 mg/dL [ELEVATED]
4. Serum Triglycerides: 280 mg/dL [HIGH]
5. Serum Creatinine: 0.9 mg/dL [NORMAL HEALTHY KIDNEY]
Remarks: Review report with diabetologist within 5 working days. Repeat fasting test in 4 weeks.`,
    sourceAnalysisId: 'doc-lab-02',
  },
  {
    id: 'vault-3',
    title: 'Orthopedic Joint Care & Physical Therapy Slip',
    fileName: 'sample_prescription.pdf',
    fileSize: '512 KB',
    uploadDate: '05-Oct-2026, 02:40 PM',
    docType: 'Outpatient Prescription',
    patientName: 'Patient 1',
    facilityName: 'Sanjay Gandhi Institute of Orthopaedics, Jayanagar',
    summary: 'Bilateral Knee Osteoarthritis Grade 2. Tab Paracetamol 650mg SOS for severe pain, Tab Calcium + Vitamin D3 post-lunch, Diclofenac gel twice daily. No floor squatting.',
    status: 'processed',
    rawText: `OPD PRESCRIPTION SLIP:
Pt: Patient 1 | 72Y / M | OPD Card: SG-10492
Dx: Bilateral Knee Osteoarthritis (Grade 2-3). Mild lumbar spondylosis.
Rx: Tab Paracetamol 650mg PO SOS (Max 3/day), Tab Calcium Carbonate + D3 500mg PO OD (After lunch), Diclofenac Topical Gel 1% BD.
Avoid floor squatting or Indian style toilet. Review in 3 weeks with fresh knee X-rays.`,
    sourceAnalysisId: 'doc-rx-03',
  },
  {
    id: 'vault-4',
    title: 'Standing Bilateral Knee Radiograph (X-Ray)',
    fileName: 'bilateral_knee_xray.png',
    fileSize: '2.4 MB',
    uploadDate: '04-Oct-2026, 10:00 AM',
    docType: 'Imaging / X-Ray',
    patientName: 'Patient 1',
    facilityName: 'Medall Healthcare Imaging, Jayanagar 4th Block',
    summary: 'Weight-bearing radiograph showing medial compartment joint space narrowing in both knees. Compatible with Grade 2 osteoarthritis. No fracture or acute bone lesion.',
    status: 'processed',
    rawText: `RADIOLOGICAL REPORT:
Investigation: X-Ray Both Knees (AP & Lateral Weight-Bearing Views)
Findings: Asymmetric narrowing of medial femorotibial joint spaces bilaterally. Marginal osteophytes along patellar margins. Normal bone mineral density without bony destruction.
Impression: Grade 2-3 Bilateral Primary Osteoarthritis.`,
    sourceAnalysisId: 'doc-rx-03',
  },
];
