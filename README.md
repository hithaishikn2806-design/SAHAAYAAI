# SAHAAYAAI – Healthcare That Understands You
*An AI-powered healthcare accessibility and navigation platform that converts complicated medical documents into simple, accessible, multilingual, and actionable information.*

---

## 🎯 Problem Statement
Millions of patients across India and developing nations can physically reach healthcare providers but cannot understand or navigate their care after receiving medical documents. The barriers are deep:
- **Medical Jargon & Illegibility:** Complex shorthand (e.g., "Dx: CAD S/P PTCA", "Tab Ecosprin PO OD", "NPO") intimidates patients.
- **Language Barriers:** Prescriptions and discharge summaries are almost universally written in English, leaving Kannada, Hindi, Tamil, and Telugu speakers dependent on rushed interpretations.
- **Low Health & Digital Literacy:** Elderly patients struggle with dense text; low-literacy users require pictorial routines.
- **Caregiver Fatigue:** Family members managing chronic illness in parents need organized task lists, doctor questions, and carry-along document checklists.

---

## 🛡️ Critical Safety & Non-Diagnostic Guardrails
> **CRITICAL BOUNDARY:** SAHAAYAAI is **NOT** an AI doctor.
> - **Zero Diagnosis:** Never diagnoses illnesses or diseases.
> - **Zero Prescriptions:** Never prescribes medications or alters physician dosages.
> - **Zero Hallucination:** Only extracts and simplifies information **explicitly present** in the provided document.
> - **Emergency Protocol:** Highlights explicit urgent-care red flags from the document and routes immediately to emergency helplines (`108` / `112`).

---

## 🚀 Key Features

### 1. Document Explainer & OCR
- Ingests hospital discharge summaries, laboratory diagnostic reports, and outpatient prescription slips via PDF, image upload, or preset samples.
- Extracts:
  - Document Classification
  - Key Findings in Plain Language
  - Explicit Routine Instructions with Meal Timings
  - Next Appointment Date & Doctor Details
  - Questions the Patient can Ask Their Doctor
- **Before & After View:** Side-by-side comparison of dense clinical Latin abbreviations vs. plain 5th-grade conversational English and regional languages.

### 2. Simple Language Mode & Jargon Decoder
- Interactive medical glossary:
  - *"Hypertension"* &rarr; *"High Blood Pressure"*
  - *"S/P PTCA with DES"* &rarr; *"Heart stent placed to open a blocked blood vessel"*
  - *"PO OD"* &rarr; *"By mouth once daily with water"*
  - *"Dyspnea"* &rarr; *"Shortness of breath"*
  - *"Dyslipidemia"* &rarr; *"Elevated cholesterol in blood"*

### 3. Multilingual Mode with Text-to-Speech
- Complete translations into **English**, **Kannada (ಕನ್ನಡ)**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)**.
- Integrated Web Speech API audio reader with synchronized progress highlighting, speech rate adjustment (0.8x slow, 1.0x normal, 1.2x brisk), and replay capabilities.

### 4. Specialized Universal Accessibility Modes
- **Elder Mode:** Touch targets exceeding 60px, high-contrast palette, large 20px+ typography, step-by-step reading flow, single-task guidance.
- **Low-Literacy Mode:** Pictorial icon cards (Sunrise for morning, Plate for with food, Moon for night, Water droplet, Hospital building) with 1-sentence audio prompts.
- **Vision Mode:** High contrast AAA styling with screen-reader friendly ARIA landmarks.
- **Hearing Mode:** Visual captions, color-coded urgency badges, and zero reliance on audio cues.
- **Standard Mode:** Comprehensive multi-tab clinical dashboard.

### 5. Caregiver Hub & Medication Reminders
- Multi-patient management with editable patient profiles (Name, Age, Gender, Relationship, Blood Group, Emergency Contact, Allergies, Known Conditions).
- **Update Patient Details:** Allows users and caregivers to update patient information directly from the Caregiver Hub or Document Explainer, immediately synchronizing across the platform.
- **Medication Reminders Feature:** Schedule Daily, Weekly, or Monthly alerts for patient medications based on the uploaded discharge summary or custom schedules.
- **Caregiver Notification System:** Live alert logs with unread badges, simulated WhatsApp/SMS/In-App chimes, and adherence tracking ("Mark as Taken", "Snooze 15m").
- Automatically aggregates upcoming appointments, carry-along document checklists, and synced tasks.
- Doctor question prep sheet with quick copy formatting for WhatsApp or physical printout.

### 6. Dedicated Document Vault & Scanned Viewer
- Separate clinical file management area for uploading new prescription slips, lab records, and X-rays.
- Interactive high-contrast document viewer showing formatted summaries, clinical warnings, and raw OCR text.
- 1-click transition to the Document Explainer & Jargon Decoder.

### 7. Clear Information on Doctors List
- Comprehensive medical specialist directory featuring Dr. Suresh Kamath (Cardiology), Dr. Ananya Rao (Diabetology), Dr. C. Mohan (Orthopaedics), Dr. Ramesh Narayan (Geriatrics), and Dr. Priya Sundaram (Neurology).
- Displays OPD room numbers, consultation hours, fees (with Ayushman PM-JAY free status), languages spoken, bio, and specific "What to Bring" checklists.

### 8. Inclusive Login & Accessibility Mode Onboarding
- Dedicated login portal allowing users to select their persona (Family Caregiver, Elder Senior, Guest/Judge) and configure their accessibility mode before entering the dashboard.
- Instant persona switching and accessibility toggles available anytime from the top navigation bar.

### 9. Healthcare Directory (Mock / Simulated)
- Filter hospitals, clinics, specialists, diagnostic labs, and pharmacies.
- Search by spoken languages (Kannada, Hindi, Tamil, Telugu, English) and accessibility provisions (wheelchair friendly, sign-language interpreter, elder priority counter, PM-JAY Ayushman empaneled).
- Facility-specific "What to carry" checklist.

### 7. Voice-First Interaction
- Microphone interface powered by Web Speech Recognition.
- Natural voice queries: *"Explain this report"*, *"What documents should I carry?"*, *"Translate this into Kannada"*, *"Read my instructions"*.

### 8. Smart Action Plan
- Interactive checkbox schedule derived strictly from verified document orders.
- Progress tracker, print view, and clipboard export for family caregivers.

### 9. Privacy & Responsible AI Charter
- Strict DPDP Act alignment principles: ephemeral processing, consent-first caregiver sharing, synthetic demo sandbox, and complete decoupling of API credentials from client bundles.

---

## 🛠️ System Architecture

```
[Patient / Elderly Caregiver / Rural User]
                    │
                    ▼
┌───────────────────────────────────────────────┐
│     Client Layer: React 19 + Tailwind v4      │
│  - Universal Accessibility Engine             │
│    (Elder, Low-Literacy, Vision, Hearing)     │
│  - Web Speech Synthesis & Recognition         │
│  - Multilingual Script Renderer               │
└───────────────────────┬───────────────────────┘
                        │
                        ▼ (Secure JSON RPC / REST)
┌───────────────────────────────────────────────┐
│        Server Layer: Express + TSX Proxy       │
│  - POST /api/analyze-document                 │
│  - POST /api/voice-query                      │
│  - Strict JSON Schema & Guardrail Prompts     │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│       Google Gemini API (@google/genai)       │
│  - Model: gemini-3.8-flash                    │
│  - Multimodal Document Understanding          │
│  - Grounded deterministic fallback engine     │
└───────────────────────────────────────────────┘
```

---

## 🌐 Scalability & Future Integrations

1. **National Health Authority (NHA) & ABDM (Ayushman Bharat Digital Mission):**
   - Integration with ABHA (Health ID) and Personal Health Record (PHR) apps via consent-based gateway.
   - Fetch verified records directly from Health Facility Registry (HFR).
2. **HL7 FHIR & Hospital Information Systems (HIS):**
   - Direct parsing of standard `DiagnosticReport`, `MedicationRequest`, and `CarePlan` FHIR JSON bundles from OpenMRS and hospital electronic health record systems.
3. **Edge / Offline Indic Speech Models:**
   - Deploy quantized on-device speech models (Whisper/Vakyansh) to enable offline speech-to-speech interaction in rural sub-centers with intermittent internet connectivity.
4. **Telemedicine Triage Bridge:**
   - Seamless handoff of generated "Questions for Doctor" and verified discharge summaries to tele-consultation doctors via eSanjeevani.

---

## 🏃 Getting Started & Verification

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting check
npm run lint

# Production build
npm run build
```

---

## 🏆 Application Flow & Features Guide
1. **Login & Accessibility Selection:**
   - Choose your accessibility persona (Elder Mode, Vision Mode, Hearing Mode, Low-Literacy Mode, or Standard Mode) and primary language (English, Kannada, Hindi, Tamil, Telugu).
2. **Document Explainer & Multilingual Audio:**
   - Select or upload a prescription, lab report, or discharge summary.
   - Multimodal OCR parses explicit instructions with zero hallucination.
   - Medical jargon is translated into plain words (e.g. "PTCA" -> "stent placed in heart artery").
   - Click "Listen" to hear regional Indic text-to-speech with word rate control.
3. **Update Patient Details:**
   - Click "Edit Details" on the active document or inside the Caregiver Hub.
   - Update patient name, age, gender, blood group, emergency contact, allergies, conditions, and doctor details.
   - Updates are immediately reflected throughout the platform.
4. **Caregiver Hub & Medication Reminders:**
   - View scheduled daily, weekly, or monthly doses extracted from discharge summaries.
   - Log adherence ("Mark Taken") and view caregiver notification alerts.
5. **Healthcare Directory & Doctors List:**
   - Search hospital clinics, specialists, labs, and pharmacies with clear OPD schedules, languages spoken, and accessibility counters.
