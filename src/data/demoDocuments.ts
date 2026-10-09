import { DocumentAnalysis, LanguageMeta, SupportedLanguage } from '../types';

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN', flag: '🇬🇧' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN', flag: '🇮🇳' },
];

export const DEMO_DOCUMENTS: DocumentAnalysis[] = [
  {
    id: 'doc-discharge-01',
    title: 'Post-Angioplasty Cardiac Discharge Summary',
    fileName: 'sample_discharge_summary.pdf',
    docType: 'Discharge Summary',
    facilityName: 'Manipal Heart Foundation, HAL Airport Road, Bengaluru',
    documentDate: '07-Oct-2026',
    patientName: 'Patient 1',
    patientAge: '72 Yrs',
    patientGender: 'Male',
    rawExcerpt: `DISCHARGE SUMMARY & ORDERS:
Pt: Patient 1 | Age: 72Y / M | IPD No: MH-98421 | Dept: Interventional Cardiology
Diagnosis: CAD - Acute Coronary Syndrome (NSTEMI). S/P PTCA with Drug-Eluting Stent (DES) to LAD. Essential Hypertension. Dyslipidemia.
Clinical Course: Successfully underwent coronary stenting via right radial approach. Stable hemodynamics. Troponin-I returning toward baseline.
Discharge Medications:
1. Tab Ecosprin (Aspirin) 75mg - 1 tab PO OD (Post Cibum - After Breakfast)
2. Tab Clopidogrel 75mg - 1 tab PO OD (After Breakfast)
3. Tab Atorvastatin 40mg - 1 tab PO HS (Hora Somni - At Bedtime)
4. Tab Metoprolol Succinate 25mg - 1 tab PO OD (Morning)
Care Instructions:
- Strict cardiac low-sodium (<2g/day) & low-cholesterol diet.
- Radial wrist puncture site clean & dry for 48 hrs. No lifting >2kg with right hand.
- Ambulation as tolerated; light flat walking 10-15 mins daily; avoid stair climbing.
Follow-up:
- Cardiology OPD with Dr. Suresh Kamath on 14-Oct-2026 (Wednesday), 10:30 AM (Room 204).
- Bring: Discharge summary, ECG strip, recent blood lipid panel, list of ongoing medications.
WARNING / EMERGENCY SIGNS:
If patient develops acute retrosternal chest pain, radiating left arm discomfort, acute dyspnea, diaphoresis, or presyncope, transport immediately to Nearest Emergency Room / Call 108.`,
    plainSummary: {
      en: 'This is a hospital discharge summary following a successful heart stent procedure (angioplasty) to open a narrowed blood vessel in the heart. The patient is recovering well and needs to take 4 daily heart medications, eat low-salt meals, and return for a follow-up visit on October 14.',
      kn: 'ಇದು ಹೃದಯದ ರಕ್ತನಾಳದ ಬ್ಲಾಕ್ ತೆರವುಗೊಳಿಸಲು ಸ್ಟೆಂಟ್ ಅಳವಡಿಸಿದ (ಆಂಜಿಯೋಪ್ಲಾಸ್ಟಿ) ನಂತರದ ಆಸ್ಪತ್ರೆಯ ಬಿಡುಗಡೆ ಸಾರಾಂಶವಾಗಿದೆ. ರೋಗಿಯ ಚೇತರಿಕೆ ಉತ್ತಮವಾಗಿದ್ದು, 4 ನಿಗದಿತ ಮಾತ್ರೆಗಳನ್ನು ಸೇವಿಸಬೇಕು, ಉಪ್ಪು ಕಡಿಮೆ ಆಹಾರ ಸೇವಿಸಬೇಕು ಮತ್ತು ಅಕ್ಟೋಬರ್ 14 ರಂದು ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಬೇಕು.',
      hi: 'यह अस्पताल से छुट्टी का सारांश है, जिसमें दिल की नस में रुकावट खोलने के लिए स्टेंट (एंजियोप्लास्टी) लगाया गया था। मरीज का स्वास्थ्य स्थिर है। उन्हें नियमित 4 दवाइयां लेनी हैं, कम नमक का भोजन करना है और 14 अक्टूबर को डॉक्टर से मिलना है।',
      ta: 'இது இதய இரத்த நாளத்தில் ஸ்டென்ட் வைக்கப்பட்ட (ஆஞ்சியோபிளாஸ்டி) மருத்துவமனை வெளியேற்ற சுருக்கம் ஆகும். நோயாளி நலமுடன் தேறி வருகிறார். 4 இதய மாத்திரைகளைத் தவறாமல் உட்கொள்ள வேண்டும் மற்றும் அக்டோபர் 14 அன்று மருத்துவரை மீண்டும் சந்திக்க வேண்டும்.',
      te: 'ఇది గుండెలో స్టెంట్ వేసిన (యాంజియోప్లాస్టీ) తర్వాత ఆసుపత్రి డిశ్చార్జ్ సారాంశం. రోగి కోలుకుంటున్నారు. ప్రతిరోజూ 4 మందులు వేసుకోవాలి, ఉప్పు తగ్గించాలి మరియు అక్టోబర్ 14న వైద్యుడిని మళ్లీ కలవాలి.',
    },
    keyFindings: [
      {
        term: 'S/P PTCA with Drug-Eluting Stent (DES)',
        simplified: 'Heart blood vessel successfully opened with a medical stent',
        details: 'The blockage in the main heart artery (LAD) was opened up and held open with a drug-coated metallic mesh stent.',
        status: 'normal',
      },
      {
        term: 'Essential Hypertension',
        simplified: 'High Blood Pressure',
        details: 'Blood pressure is currently regulated with daily morning blood pressure medication.',
        status: 'attention',
      },
      {
        term: 'Dyslipidemia',
        simplified: 'Elevated blood cholesterol levels',
        details: 'Bedtime cholesterol lowering tablet (Atorvastatin) prescribed to protect the heart.',
        status: 'attention',
      },
      {
        term: 'Radial Access Puncture Site',
        simplified: 'Small needle puncture on right wrist where stent was inserted',
        details: 'Keep bandage dry and do not lift heavy weights with right arm for 48 hours.',
        status: 'normal',
      },
    ],
    jargonTerms: [
      {
        medicalTerm: 'S/P PTCA',
        simplifiedTerm: 'Stent placed in heart artery',
        explanation: 'Status-post Percutaneous Transluminal Coronary Angioplasty: A small tube and balloon opened a blocked blood vessel in the heart.',
        category: 'condition',
      },
      {
        medicalTerm: 'PO OD',
        simplifiedTerm: 'By mouth, once daily',
        explanation: 'Medical shorthand: "PO" means take by mouth (swallow with water), "OD" means once every day at the same time.',
        category: 'medication',
      },
      {
        medicalTerm: 'PO HS',
        simplifiedTerm: 'By mouth at bedtime',
        explanation: '"Hora Somni" means take right before sleeping at night.',
        category: 'medication',
      },
      {
        medicalTerm: 'Post Cibum (PC)',
        simplifiedTerm: 'After food / meals',
        explanation: 'Always take after eating breakfast or dinner so the stomach is protected.',
        category: 'instruction',
      },
      {
        medicalTerm: 'Ambulation as tolerated',
        simplifiedTerm: 'Gentle walking at comfortable pace',
        explanation: 'Do not stay in bed all day, but walk gently without running, jogging, or straining.',
        category: 'instruction',
      },
      {
        medicalTerm: 'Dyspnea',
        simplifiedTerm: 'Shortness of breath',
        explanation: 'Difficulty breathing or feeling out of breath when doing simple tasks.',
        category: 'condition',
      },
    ],
    instructions: [
      {
        id: 'inst-1',
        title: 'Morning Heart Medication (Aspirin & Clopidogrel)',
        timeOfDay: 'morning',
        mealTiming: 'after_food',
        description: 'Take 1 tablet of Ecosprin 75mg and 1 tablet of Clopidogrel 75mg after breakfast with a full glass of water. Do not skip.',
        sourceText: 'Tab Ecosprin 75mg PO OD (Post Cibum) + Tab Clopidogrel 75mg PO OD',
        iconType: 'pill',
      },
      {
        id: 'inst-2',
        title: 'Blood Pressure Tablet (Metoprolol)',
        timeOfDay: 'morning',
        mealTiming: 'after_food',
        description: 'Take 1 tablet of Metoprolol 25mg every morning to keep pulse and blood pressure steady.',
        sourceText: 'Tab Metoprolol Succinate 25mg PO OD (Morning)',
        iconType: 'pill',
      },
      {
        id: 'inst-3',
        title: 'Night Cholesterol Tablet (Atorvastatin)',
        timeOfDay: 'night',
        mealTiming: 'after_food',
        description: 'Take 1 tablet of Atorvastatin 40mg at bedtime before going to sleep.',
        sourceText: 'Tab Atorvastatin 40mg PO HS (Hora Somni)',
        iconType: 'pill',
      },
      {
        id: 'inst-4',
        title: 'Right Wrist Wound Protection',
        timeOfDay: 'continuous',
        description: 'Keep the right wrist puncture site clean and dry. Avoid lifting heavy buckets or bags (>2 kg) for 48 hours.',
        sourceText: 'Radial puncture site clean & dry for 48 hrs. No lifting >2kg.',
        iconType: 'wound',
      },
      {
        id: 'inst-5',
        title: 'Low Salt & Heart Healthy Diet',
        timeOfDay: 'continuous',
        mealTiming: 'with_food',
        description: 'Cook food with minimal salt (less than 1 small teaspoon a day). Avoid deep fried snacks and pickles.',
        sourceText: 'Strict cardiac low-sodium (<2g/day) & low-cholesterol diet.',
        iconType: 'diet',
      },
      {
        id: 'inst-6',
        title: 'Gentle Walking (10-15 Minutes)',
        timeOfDay: 'afternoon',
        description: 'Take light walks on flat surfaces for 10-15 minutes. Avoid stairs and stop immediately if you feel tired.',
        sourceText: 'Ambulation as tolerated; light flat walking 10-15 mins daily.',
        iconType: 'activity',
      },
    ],
    instructionsMultilingual: {
      en: [
        'Take Aspirin (Ecosprin) and Clopidogrel together every morning strictly after breakfast with water.',
        'Take Metoprolol 25mg every morning to keep heart rate and blood pressure normal.',
        'Take Atorvastatin 40mg at night before going to bed.',
        'Keep right wrist puncture dressing dry. Do not lift heavy objects (>2kg) with right hand.',
        'Follow a low-salt (<2g/day) diet and avoid oily or fried snacks.',
        'Walk gently for 10 to 15 minutes daily on flat ground; avoid climbing stairs.',
      ],
      kn: [
        'ಬೆಳಗಿನ ಉಪಹಾರದ ನಂತರ ಎಕೋಸ್ಪ್ರಿನ್ ಮತ್ತು ಕ್ಲೋಪಿಡೋಗ್ರೆಲ್ ಮಾತ್ರೆಗಳನ್ನು ನೀರಿನೊಂದಿಗೆ ತಪ್ಪದೇ ಸೇವಿಸಿ.',
        'ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಮೆಟೊಪ್ರೊಲಾಲ್ 25 ಮಿಗ್ರಾಂ ಮಾತ್ರೆ ಬೆಳಿಗ್ಗೆ ಸೇವಿಸಿ.',
        'ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮಾತ್ರೆ ಅಟೊರ್ವಾಸ್ಟಾಟಿನ್ 40 ಮಿಗ್ರಾಂ ಸೇವಿಸಿ.',
        'ಬಲ ಮಣಿಕಟ್ಟಿನ ಬ್ಯಾಂಡೇಜ್ ಅನ್ನು ಒಣಗಿಸಿ ಇರಿಸಿ; 2 ಕೆಜಿಗಿಂತ ಭಾರವಾದ ವಸ್ತುಗಳನ್ನು ಎತ್ತಬೇಡಿ.',
        'ಆಹಾರದಲ್ಲಿ ಉಪ್ಪಿನ ಪ್ರಮಾಣ ಕಡಿಮೆ ಇರಲಿ (ದಿನಕ್ಕೆ 1 ಚಮಚಕ್ಕಿಂತ ಕಡಿಮೆ); ಎಣ್ಣೆ ತಿಂಡಿ ಬೇಡ.',
        'ದಿನಕ್ಕೆ 10-15 ನಿಮಿಷ ಸಮತಟ್ಟಾದ ಜಾಗದಲ್ಲಿ ನಿಧಾನವಾಗಿ ನಡಿಗೆ ಮಾಡಿ; ಮೆಟ್ಟಿಲು ಹತ್ತಬೇಡಿ.',
      ],
      hi: [
        'सुबह नाश्ते के बाद एस्पिरिन और क्लोपिडोग्रेल गोलियां पानी के साथ जरूर लें।',
        'रक्तचाप (BP) नियंत्रित रखने के लिए मेटोप्रोलोल गोली हर सुबह लें।',
        'रात को सोने से पहले कोलेस्ट्रॉल की गोली एटोरवास्टेटिन 40mg लें।',
        'दाहिनी कलाई की पट्टी को सूखा रखें; 2 किलो से अधिक वजन न उठाएं।',
        'भोजन में नमक कम रखें और तले-भुने खाने से परहेज करें।',
        'रोजाना 10-15 मिनट समतल जमीन पर धीरे-धीरे टहलें; सीढ़ियां चढ़ने से बचें।',
      ],
      ta: [
        'காலை உணவுக்குப் பிறகு அஸ்பிரின் மற்றும் குளோபிடோக்ரல் மாத்திரைகளைத் தவறாமல் உட்கொள்ளவும்.',
        'இரத்த அழுத்தத்தைக் கட்டுப்படுத்த மெட்டோபிரோலால் மாத்திரையை தினமும் காலையில் எடுக்கவும்.',
        'இரவு தூங்குவதற்கு முன் கொலஸ்ட்ரால் மாத்திரையான அடோர்வாஸ்டேடின் 40mg உட்கொள்ளவும்.',
        'வலது மணிக்கட்டு கட்டுப்பகுதியை ஈரமாகாமல் பார்த்துக்கொள்ளவும்; 2 கிலோவுக்கு மேல் எடையைத் தூக்க வேண்டாம்.',
        'உணவில் உப்பை மிகவும் குறைத்துக் கொள்ளவும்; எண்ணெய் பலகாரங்களைத் தவிர்க்கவும்.',
        'தினமும் 10 முதல் 15 நிமிடங்கள் சமமான தரையில் மெதுவாக நடக்கவும்; படிகள் ஏறுவதைத் தவிர்க்கவும்.',
      ],
      te: [
        'ఉదయం అల్పాహారం తిన్న తర్వాత ఆస్పిరిన్ మరియు క్లోపిడోగ్రెల్ మాత్రలు నీటితో తప్పకుండా వేసుకోండి.',
        'రక్తపోటు (BP) అదుపులో ఉంచడానికి ప్రతి ఉదయం మెటోప్రొలాల్ టాబ్లెట్ వేసుకోండి.',
        'రాత్రి పడుకునే ముందు కొలెస్ట్రాల్ టాబ్లెట్ అటోర్వాస్టాటిన్ 40mg వేసుకోండి.',
        'కుడి మణికట్టు కట్టును తడవకుండా చూసుకోండి; 2 కేజీల కంటే ఎక్కువ బరువులు ఎత్తవద్దు.',
        'ఆహారంలో ఉప్పు తగ్గించండి మరియు నూనె పదార్థాలకు దూరంగా ఉండండి.',
        'ప్రతిరోజూ 10-15 నిమిషాలు చదునైన నేలపై నెమ్మదిగా నడవండి; మెట్లు ఎక్కవద్దు.',
      ],
    },
    followUp: {
      date: '14-Oct-2026 (Wednesday), 10:30 AM',
      doctorName: 'Dr. Suresh Kamath',
      specialty: 'Senior Interventional Cardiologist',
      hospital: 'Manipal Heart Foundation, Cardiology OPD Room 204',
      documentsToCarry: [
        'This Discharge Summary original paper',
        'Cath Lab Stent Angiography CD/Report',
        'Original ECG strips taken during discharge',
        'List of all ongoing medicines with boxes',
        'Government ID / Ayushman Bharat Card',
      ],
    },
    questionsForDoctor: {
      en: [
        'How is my heart blood vessel healing after the stent placement?',
        'Are there any side effects from taking Aspirin and Clopidogrel together?',
        'When will it be safe for me to resume climbing stairs or traveling?',
        'What specific numbers should my home blood pressure monitor show?',
      ],
      kn: [
        'ಸ್ಟೆಂಟ್ ಹಾಕಿದ ನಂತರ ನನ್ನ ಹೃದಯದ ರಕ್ತನಾಳಗಳು ಹೇಗೆ ಚೇತರಿಸಿಕೊಳ್ಳುತ್ತಿವೆ?',
        'ಎಕೋಸ್ಪ್ರಿನ್ ಮತ್ತು ಕ್ಲೋಪಿಡೋಗ್ರೆಲ್ ಒಟ್ಟಿಗೆ ತೆಗೆದುಕೊಳ್ಳುವುದರಿಂದ ಯಾವುದಾದರೂ ಅಡ್ಡಪರಿಣಾಮಗಳಿವೆಯೇ?',
        'ನಾನು ಮೆಟ್ಟಿಲು ಹತ್ತಲು ಅಥವಾ ಪ್ರಯಾಣ ಮಾಡಲು ಯಾವಾಗ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ?',
        'ಮನೆಯಲ್ಲಿ ಬಿಪಿ ಪರೀಕ್ಷಿಸಿದಾಗ ಎಷ್ಟು ಇರಬೇಕು?',
      ],
      hi: [
        'स्टेंट लगाने के बाद मेरे दिल की नसें कितनी स्वस्थ हो रही हैं?',
        'एस्पिरिन और क्लोपिडोग्रेल एक साथ लेने से क्या कोई साइड इफेक्ट हो सकता है?',
        'मैं कब सुरक्षित रूप से सीढ़ियां चढ़ना या यात्रा करना शुरू कर सकता हूं?',
        'घर पर ब्लड प्रेशर नापने पर कितना सामान्य होना चाहिए?',
      ],
      ta: [
        'ஸ்டென்ட் வைத்த பிறகு எனது இதய நரம்புகள் எவ்வாறு குணமடைந்து வருகின்றன?',
        'அஸ்பிரின் மற்றும் குளோபிடோக்ரல் ஒன்றாக எடுப்பதால் ஏதேனும் பக்க விளைவுகள் வருமா?',
        'நான் எப்போது படிகள் ஏறலாம் அல்லது பயணம் செய்யலாம்?',
        'வீட்டில் இரத்த அழுத்தம் பார்க்கும்போது அளவு எவ்வளவு இருக்க வேண்டும்?',
      ],
      te: [
        'స్టెంట్ వేసిన తర్వాత నా గుండె రక్తనాళాలు ఎలా కోలుకుంటున్నాయి?',
        'ఆస్పిరిన్ మరియు క్లోపిడోగ్రెల్ కలిపి వేసుకోవడం వల్ల ఏవైనా సైడ్ ఎఫెక్ట్స్ ఉంటాయా?',
        'నేను మెట్లు ఎక్కడం లేదా ప్రయాణం చేయడం ఎప్పటినుంచి చేయవచ్చు?',
        'ఇంట్లో బీపీ చూసుకున్నప్పుడు ఎంత ఉండాలి?',
      ],
    },
    actionPlan: [
      {
        id: 'act-1',
        text: 'Attend follow-up appointment with Dr. Suresh Kamath on 14-Oct-2026 at 10:30 AM (Room 204)',
        completed: false,
        category: 'appointment',
        dueDate: '14-Oct-2026',
      },
      {
        id: 'act-2',
        text: 'Carry this original discharge summary and ECG strips to the hospital',
        completed: true,
        category: 'document',
        dueDate: '14-Oct-2026',
      },
      {
        id: 'act-3',
        text: 'Organize 4 prescribed medicines (Morning: Ecosprin, Clopidogrel, Metoprolol; Night: Atorvastatin)',
        completed: false,
        category: 'medication',
        dueDate: 'Daily',
      },
      {
        id: 'act-4',
        text: 'Keep right wrist bandage dry and avoid lifting heavy objects (>2kg)',
        completed: true,
        category: 'precaution',
        dueDate: 'Next 48 Hours',
      },
      {
        id: 'act-5',
        text: 'Review the 4 suggested questions with family caregiver before hospital visit',
        completed: false,
        category: 'caregiver',
        dueDate: '13-Oct-2026',
      },
    ],
    urgentWarnings: [
      'CRITICAL: If you feel sudden severe chest tightness, pain radiating to your left arm or jaw, sweating, or severe breathlessness, call 108 immediately or go to the nearest emergency hospital. Do NOT wait.',
    ],
  },
  {
    id: 'doc-lab-02',
    title: 'Comprehensive Metabolic & Lipid Diagnostic Panel',
    fileName: 'sample_lab_report.pdf',
    docType: 'Laboratory Investigation',
    facilityName: 'Metropolis Healthcare & Clinical Labs, Malleshwaram, Bengaluru',
    documentDate: '06-Oct-2026',
    patientName: 'Patient 2',
    patientAge: '65 Yrs',
    patientGender: 'Female',
    rawExcerpt: `DIAGNOSTIC REPORT:
Patient: Patient 2 | Age: 65Y / F | Ref by: Dr. Ananya Rao | Sample: Fasting Blood
TEST RESULTS:
1. Fasting Blood Glucose: 168 mg/dL (Reference Range: 70 - 100 mg/dL) [HIGH]
2. Glycated Hemoglobin (HbA1c): 8.4 % (Reference: < 5.7% Normal, 5.7-6.4% Prediabetes, >=6.5% Diabetes) [HIGH]
3. Total Cholesterol: 242 mg/dL (Reference: Desirable < 200 mg/dL) [ELEVATED]
4. Serum Triglycerides: 280 mg/dL (Reference: Normal < 150 mg/dL) [HIGH]
5. Serum Creatinine: 0.9 mg/dL (Reference: 0.6 - 1.1 mg/dL) [NORMAL / HEALTHY KIDNEY FUNCTION]
6. Hemoglobin: 12.8 g/dL (Reference: 12.0 - 15.5 g/dL) [NORMAL]
REMARKS:
High fasting glycemia and elevated 3-month average HbA1c indicative of suboptimally controlled glycemic index. Serum lipids reflect moderate mixed hyperlipidemia.
INSTRUCTIONS PRESENT ON SLIP:
- Review report with treating endocrinologist / diabetologist Dr. Ananya Rao within 5 working days.
- Repeat fasting blood sugar test in 4 weeks.
- Do not make self-adjustments to insulin or oral hypoglycemic agents without physician guidance.`,
    plainSummary: {
      en: 'This is a blood test report. It shows that the 3-month average blood sugar (HbA1c of 8.4%) and blood fats (cholesterol and triglycerides) are higher than normal. Kidney function and blood count are healthy. The patient needs to review this report with their doctor within 5 days.',
      kn: 'ಇದು ರಕ್ತ ಪರೀಕ್ಷೆಯ ವರದಿಯಾಗಿದೆ. ಇದರಲ್ಲಿ ಕಳೆದ 3 ತಿಂಗಳ ಸರಾಸರಿ ರಕ್ತದ ಸಕ್ಕರೆ ಪ್ರಮಾಣ (HbA1c 8.4%) ಮತ್ತು ರಕ್ತದ ಕೊಬ್ಬಿನಾಂಶ ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ. ಮೂತ್ರಪಿಂಡದ ಕ್ರಿಯೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. 5 ದಿನಗಳಲ್ಲಿ ವೈದ್ಯರಿಗೆ ವರದಿ ತೋರಿಸಬೇಕು.',
      hi: 'यह रक्त जांच रिपोर्ट है। इसमें 3 महीने का औसत शुगर (HbA1c 8.4%) और कोलेस्ट्रॉल सामान्य से अधिक पाया गया है। गुर्दे (किडनी) का काम सामान्य है। इस रिपोर्ट को 5 दिनों के भीतर डॉक्टर को दिखाना जरूरी है।',
      ta: 'இது இரத்தப் பரிசோதனை அறிக்கை. இதில் 3 மாத சராசரி சர்க்கரை அளவு (HbA1c 8.4%) மற்றும் கொலஸ்ட்ரால் இயல்பை விட அதிகமாக உள்ளது. சிறுநீரக செயல்பாடு ஆரோக்கியமாக உள்ளது. 5 நாட்களுக்குள் மருத்துவரிடம் காட்ட வேண்டும்.',
      te: 'ఇది రక్త పరీక్ష నివేదిక. ఇందులో గత 3 నెలల సగటు చక్కెర స్థాయి (HbA1c 8.4%) మరియు కొలెస్ట్రాల్ సాధారణం కంటే ఎక్కువగా ఉన్నాయి. కిడ్నీ పనితీరు బాగుంది. 5 రోజుల్లో వైద్యుడికి చూపించాలి.',
    },
    keyFindings: [
      {
        term: 'HbA1c (8.4%)',
        simplified: '3-Month Average Blood Sugar Level is High',
        details: 'The safe target is usually under 7.0%. A reading of 8.4% indicates that blood sugar has been higher than usual over the last 90 days.',
        status: 'attention',
      },
      {
        term: 'Serum Triglycerides (280 mg/dL)',
        simplified: 'Blood Fats / Lipids are Elevated',
        details: 'Normal level is under 150 mg/dL. Higher numbers indicate excess fats in the bloodstream requiring dietary review.',
        status: 'attention',
      },
      {
        term: 'Serum Creatinine (0.9 mg/dL)',
        simplified: 'Kidney Filter Function is Normal & Healthy',
        details: 'A reading of 0.9 is well within the healthy safe zone (0.6 - 1.1 mg/dL), confirming healthy kidney filtering.',
        status: 'normal',
      },
    ],
    jargonTerms: [
      {
        medicalTerm: 'HbA1c',
        simplifiedTerm: '3-Month Average Sugar Score',
        explanation: 'Glycated hemoglobin reflects your average blood sugar level over the past 2 to 3 months, not just a single morning.',
        category: 'lab',
      },
      {
        medicalTerm: 'Hyperlipidemia',
        simplifiedTerm: 'High fat/cholesterol in blood',
        explanation: 'Having higher levels of fats (cholesterol and triglycerides) circulating in the bloodstream.',
        category: 'condition',
      },
      {
        medicalTerm: 'Serum Creatinine',
        simplifiedTerm: 'Kidney health indicator',
        explanation: 'A natural waste product filtered by healthy kidneys. Normal numbers mean kidneys are filtering blood well.',
        category: 'lab',
      },
    ],
    instructions: [
      {
        id: 'lab-inst-1',
        title: 'Show Report to Treating Doctor within 5 Days',
        timeOfDay: 'any',
        description: 'Take this original printed report to Dr. Ananya Rao at Apollo Clinic within 5 working days.',
        sourceText: 'Review report with treating endocrinologist / diabetologist within 5 working days.',
        iconType: 'activity',
      },
      {
        id: 'lab-inst-2',
        title: 'Do Not Change Medicine Doses by Yourself',
        timeOfDay: 'continuous',
        description: 'Keep taking your current prescribed diabetes tablets exactly as previously told until Dr. Rao reviews this report.',
        sourceText: 'Do not make self-adjustments to insulin or oral hypoglycemic agents without physician guidance.',
        iconType: 'pill',
      },
      {
        id: 'lab-inst-3',
        title: 'Repeat Fasting Blood Sugar in 4 Weeks',
        timeOfDay: 'morning',
        mealTiming: 'before_food',
        description: 'Schedule a repeat fasting blood glucose sample 4 weeks from today before eating morning breakfast.',
        sourceText: 'Repeat fasting blood sugar test in 4 weeks.',
        iconType: 'water',
      },
    ],
    instructionsMultilingual: {
      en: [
        'Show this lab report to Dr. Ananya Rao within 5 working days.',
        'Continue taking your existing medicines; do not stop or change doses on your own.',
        'Schedule a repeat fasting blood sugar test in 4 weeks.',
      ],
      kn: [
        'ಈ ಲ್ಯಾಬ್ ವರದಿಯನ್ನು 5 ಕೆಲಸದ ದಿನಗಳ ಒಳಗೆ ಡಾ. ಅನನ್ಯಾ ರಾವ್ ಅವರಿಗೆ ತೋರಿಸಿ.',
        'ಈಗಿರುವ ಔಷಧಿಗಳನ್ನು ಮುಂದುವರಿಸಿ; ನಿಮ್ಮ ಸ್ವಂತ ನಿರ್ಧಾರದಿಂದ ಪ್ರಮಾಣ ಬದಲಾಯಿಸಬೇಡಿ.',
        '4 ವಾರಗಳ ನಂತರ ಮತ್ತೆ ಉಪಹಾರಕ್ಕೆ ಮುನ್ನ ಸಕ್ಕರೆ ಪರೀಕ್ಷೆ (Fasting) ಮಾಡಿಸಿ.',
      ],
      hi: [
        'इस लैब रिपोर्ट को 5 दिनों के भीतर डॉ. अनन्या राव को दिखाएं।',
        'अपनी वर्तमान दवाएं जारी रखें; खुद से दवा की खुराक न बदलें।',
        '4 सप्ताह बाद दोबारा खाली पेट शुगर टेस्ट करवाएं।',
      ],
      ta: [
        'இந்த பரிசோதனை அறிக்கையை 5 நாட்களுக்குள் மருத்துவர் அனன்யா ராவிடம் காட்டவும்.',
        'தற்போதைய மருந்துகளைத் தொடரவும்; நீங்களாகவே அளவை மாற்ற வேண்டாம்.',
        '4 வாரங்களுக்குப் பிறகு மீண்டும் வெறும் வயிற்றில் சர்க்கரைப் பரிசோதனை செய்யவும்.',
      ],
      te: [
        'ఈ ల్యాబ్ రిపోర్టును 5 రోజుల్లోపు డాక్టర్ అనన్య రావు గారికి చూపించండి.',
        'ప్రస్తుత మందులను కొనసాగించండి; సొంతంగా మోతాదు మార్చవద్దు.',
        '4 వారాల తర్వాత మళ్లీ పరగడుపున షుగర్ పరీక్ష చేయించుకోండి.',
      ],
    },
    followUp: {
      date: 'Within 5 working days (Before 12-Oct-2026)',
      doctorName: 'Dr. Ananya Rao',
      specialty: 'Consultant Diabetologist & Endocrinologist',
      hospital: 'Apollo Clinic, 8th Main, Malleshwaram',
      documentsToCarry: [
        'This Metropolis Laboratory Report printout',
        'Previous 6-month blood sugar log book',
        'Current diabetes medication strips',
      ],
    },
    questionsForDoctor: {
      en: [
        'What steps can I take to safely bring my 8.4% HbA1c down toward a healthy goal?',
        'Does my current medicine timing need any adjustments for meal times?',
        'Should I consult a clinical nutritionist for a personalized South Indian diabetic meal plan?',
      ],
      kn: [
        'ನನ್ನ 8.4% HbA1c ಅನ್ನು ಆರೋಗ್ಯಕರ ಮಟ್ಟಕ್ಕೆ ತರಲು ನಾನು ಯಾವ ಬದಲಾವಣೆಗಳನ್ನು ಮಾಡಬೇಕು?',
        'ನನ್ನ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳುವ ಸಮಯದಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆ ಅಗತ್ಯವಿದೆಯೇ?',
        'ಮಧುಮೇಹಕ್ಕೆ ತಕ್ಕಂತೆ ದಕ್ಷಿಣ ಭಾರತೀಯ ಆಹಾರ ಯೋಜನೆಗಾಗಿ ಡಯಟಿಷಿಯನ್ ಭೇಟಿ ಮಾಡಬೇಕೆ?',
      ],
      hi: [
        'मेरा 8.4% HbA1c सामान्य स्तर पर लाने के लिए क्या सावधानियां रखनी चाहिए?',
        'क्या भोजन के समय के अनुसार मेरी दवाओं के समय में कोई बदलाव जरूरी है?',
        'क्या मुझे डायबिटीज डाइट प्लान के लिए न्यूट्रिशनिस्ट से मिलना चाहिए?',
      ],
      ta: [
        'எனது 8.4% HbA1c அளவைக் குறைக்க என்ன உணவு மாற்றங்கள் செய்ய வேண்டும்?',
        'மருந்துகள் எடுக்கும் நேரத்தில் ஏதேனும் மாற்றம் தேவையா?',
        'சர்க்கரை நோய்க்கான தனிப்பட்ட உணவுத் திட்டத்திற்கு டயட்டீஷியனை அணுக வேண்டுமா?',
      ],
      te: [
        'నా 8.4% HbA1c ని అదుపులోకి తీసుకురావడానికి ఎలాంటి ఆహార జాగ్రత్తలు తీసుకోవాలి?',
        'భోజన సమయానికి అనుగుణంగా మందుల వేళల్లో ఏమైనా మార్పులు చేయాలా?',
        'డయాబెటిస్ డైట్ కోసం న్యూట్రిషనిస్ట్‌ను సంప్రదించాలా?',
      ],
    },
    actionPlan: [
      {
        id: 'act-lab-1',
        text: 'Book appointment with Dr. Ananya Rao before 12-Oct-2026',
        completed: false,
        category: 'appointment',
        dueDate: '12-Oct-2026',
      },
      {
        id: 'act-lab-2',
        text: 'Print and carry this laboratory report along with previous sugar logs',
        completed: true,
        category: 'document',
        dueDate: '12-Oct-2026',
      },
      {
        id: 'act-lab-3',
        text: 'Mark calendar for repeat fasting blood sugar in 4 weeks (04-Nov-2026)',
        completed: false,
        category: 'medication',
        dueDate: '04-Nov-2026',
      },
    ],
    urgentWarnings: [
      'If you experience extreme dizziness, blurred vision, excessive sweating, or extreme shakiness (signs of low blood sugar / hypoglycemia), consume 3 teaspoons of sugar or fruit juice immediately and contact your doctor.',
    ],
  },
  {
    id: 'doc-rx-03',
    title: 'Outpatient Prescription & Physical Therapy Plan',
    fileName: 'sample_prescription.pdf',
    docType: 'Outpatient Prescription',
    facilityName: 'Sanjay Gandhi Institute of Orthopaedics, Jayanagar, Bengaluru',
    documentDate: '05-Oct-2026',
    patientName: 'Patient 1',
    patientAge: '72 Yrs',
    patientGender: 'Male',
    rawExcerpt: `OPD PRESCRIPTION SLIP:
Pt: Patient 1 | 72Y / M | OPD Card: SG-10492 | Unit: Joint Care & Geriatrics
Dx: Bilateral Knee Osteoarthritis (Grade 2-3). Mild lumbar spondylosis.
Rx:
1. Tab Paracetamol 650mg - 1 tab PO SOS (Si Opus Sit - Only if knee pain is severe, Max 3 tabs/day)
2. Tab Calcium Carbonate + Vitamin D3 500mg - 1 tab PO OD (After lunch with water)
3. Diclofenac Topical Gel 1% - Apply gently over both knees BD (Twice daily), no rigorous massage
Physical Therapy & Lifestyle:
- Non-weight bearing quadriceps isometric strengthening exercises twice daily.
- Strictly avoid squatting on floor or using Indian style toilet (use commode chair).
- Soft footwear with cushioned arch support.
Review in 3 weeks (26-Oct-2026) with knee X-ray AP & Lateral views.`,
    plainSummary: {
      en: 'This is an outpatient prescription from an orthopedic specialist for age-related knee joint wear-and-tear (osteoarthritis). The doctor prescribed pain relief only if needed, daily calcium/vitamin D after lunch, pain relief gel twice a day, and exercises without squatting.',
      kn: 'ಇದು ಮೊಣಕಾಲು ಕೀಲು ಸವೆತಕ್ಕೆ (ಆಸ್ಟಿಯೋಆರ್ಥ್ರೈಟಿಸ್) ಮೂಳೆ ತಜ್ಞರು ನೀಡಿರುವ ಚೀಟಿಯಾಗಿದೆ. ವಿಪರೀತ ನೋವಿದ್ದಾಗ ಮಾತ್ರ ನೋವು ನಿವಾರಕ ಮಾತ್ರೆ, ಮಧ್ಯಾಹ್ನ ಊಟದ ನಂತರ ಕ್ಯಾಲ್ಸಿಯಂ ಮಾತ್ರೆ, ದಿನಕ್ಕೆ 2 ಬಾರಿ ಜೆಲ್ ಹಚ್ಚುವುದು ಮತ್ತು ನೆಲದ ಮೇಲೆ ಕೂರದಂತೆ ಸೂಚಿಸಲಾಗಿದೆ.',
      hi: 'यह घुटनों के दर्द और जोड़ों के घिसाव (ऑस्टियोआर्थराइटिस) की डॉक्टर की पर्ची है। जरूरत पड़ने पर ही दर्द की गोली, दोपहर के खाने के बाद कैल्शियम, दिन में 2 बार घुटनों पर जेल लगाने और नीचे जमीन पर न बैठने की सलाह दी गई है।',
      ta: 'இது மூட்டு வலிக்கு எலும்பு மருத்துவர் அளித்த மருந்துச் சீட்டு. கடுமையான வலி இருந்தால் மட்டுமே வலி மாத்திரை, மதிய உணவுக்குப் பின் கால்சியம் மாத்திரை, காலை-மாலை ஜெல் தடவுதல் மற்றும் தரையில் அமர்வதைத் தவிர்க்க அறிவுறுத்தப்பட்டுள்ளது.',
      te: 'ఇది మోకాళ్ల కీళ్ల అరుగుదల కోసం ఆర్థోపెడిక్ డాక్టర్ ఇచ్చిన ప్రిస్క్రిప్షన్. తీవ్రమైన నొప్పి ఉన్నప్పుడు మాత్రమే పెయిన్ కిల్లర్, భోజనం తర్వాత క్యాల్షియం, రోజుకు 2 సార్లు జెల్ రాయడం మరియు నేలపై కూర్చోవద్దని సలహా ఇచ్చారు.',
    },
    keyFindings: [
      {
        term: 'Bilateral Knee Osteoarthritis',
        simplified: 'Age-related wear-and-tear in cartilage of both knees',
        details: 'Cushioning in both knee joints is thinning, causing stiffness and discomfort when walking.',
        status: 'attention',
      },
      {
        term: 'Tab Paracetamol 650mg SOS',
        simplified: 'Pain tablet only when pain is uncomfortable (not every day)',
        details: 'Take only when necessary for pain, strictly not more than 3 times a day.',
        status: 'normal',
      },
    ],
    jargonTerms: [
      {
        medicalTerm: 'Osteoarthritis',
        simplifiedTerm: 'Knee joint cushioning wear',
        explanation: 'Natural age-related thinning of the smooth cartilage cushion between the knee bones.',
        category: 'condition',
      },
      {
        medicalTerm: 'SOS (Si Opus Sit)',
        simplifiedTerm: 'Only when needed',
        explanation: 'Take this tablet only if you feel unbearable pain; do not take if pain is absent.',
        category: 'instruction',
      },
      {
        medicalTerm: 'BD (Bis in Die)',
        simplifiedTerm: 'Twice a day',
        explanation: 'Apply morning and evening, roughly 10 to 12 hours apart.',
        category: 'instruction',
      },
    ],
    instructions: [
      {
        id: 'rx-inst-1',
        title: 'Pain Tablet Only When Needed (SOS)',
        timeOfDay: 'as_needed',
        mealTiming: 'after_food',
        description: 'Take 1 tablet of Paracetamol 650mg only if knee pain is severe. Maximum 3 tablets in 24 hours.',
        sourceText: 'Tab Paracetamol 650mg PO SOS, Max 3 tabs/day',
        iconType: 'pill',
      },
      {
        id: 'rx-inst-2',
        title: 'Calcium + Vitamin D3 Tablet',
        timeOfDay: 'afternoon',
        mealTiming: 'after_food',
        description: 'Take 1 tablet daily right after afternoon lunch with water for bone strength.',
        sourceText: 'Tab Calcium Carbonate + Vitamin D3 500mg PO OD (After lunch)',
        iconType: 'pill',
      },
      {
        id: 'rx-inst-3',
        title: 'Pain Relief Gel Application',
        timeOfDay: 'morning',
        description: 'Apply Diclofenac gel gently over both knees morning and night. Do not massage aggressively.',
        sourceText: 'Diclofenac Topical Gel 1% BD, no rigorous massage',
        iconType: 'wound',
      },
      {
        id: 'rx-inst-4',
        title: 'Avoid Floor Squatting & Indian Toilets',
        timeOfDay: 'continuous',
        description: 'Strictly use western commode chairs. Do not sit cross-legged on the floor or squat.',
        sourceText: 'Strictly avoid squatting on floor or using Indian style toilet.',
        iconType: 'rest',
      },
    ],
    instructionsMultilingual: {
      en: [
        'Take Paracetamol only if pain is severe; never take more than 3 tablets in a day.',
        'Take Calcium + Vitamin D tablet after lunch every day.',
        'Apply pain gel gently over knees twice a day without rough rubbing.',
        'Do not sit on the floor or squat; use a commode chair.',
      ],
      kn: [
        'ವಿಪರೀತ ನೋವಿದ್ದಾಗ ಮಾತ್ರ ಪ್ಯಾರಸಿಟಮಾಲ್ ಮಾತ್ರೆ ಸೇವಿಸಿ; ದಿನಕ್ಕೆ 3ಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೇಡ.',
        'ಪ್ರತಿದಿನ ಮಧ್ಯಾಹ್ನದ ಊಟದ ನಂತರ ಕ್ಯಾಲ್ಸಿಯಂ ಮಾತ್ರೆ ಸೇವಿಸಿ.',
        'ದಿನಕ್ಕೆ 2 ಬಾರಿ ಮೊಣಕಾಲಿಗೆ ನೋವಿನ ಜೆಲ್ ನಿಧಾನವಾಗಿ ಹಚ್ಚಿ, ಬಲವಾಗಿ ತಿಕ್ಕಬೇಡಿ.',
        'ನೆಲದ ಮೇಲೆ ಕೂರಬೇಡಿ ಅಥವಾ ಚಕ್ಕಳಮಕ್ಕಳ ಹಾಕಬೇಡಿ; ಕಮೋಡ್ ಬಳಸಿ.',
      ],
      hi: [
        'केवल तेज दर्द होने पर ही पैरासिटामोल लें; दिन में 3 से ज्यादा गोलियां न लें।',
        'रोजाना दोपहर के खाने के बाद कैल्शियम की गोली लें।',
        'दिन में दो बार घुटनों पर धीरे-धीरे दर्द का जेल लगाएं, जोर से न रगड़ें।',
        'जमीन पर नीचे न बैठें और पालथी न मारें; कुर्सी या कमोड का उपयोग करें।',
      ],
      ta: [
        'கடுமையான வலி இருக்கும் போது மட்டுமே பாராசிட்டமால் எடுக்கவும்; ஒரு நாளைக்கு 3க்கு மேல் வேண்டாம்.',
        'தினமும் மதிய உணவுக்குப் பின் கால்சியம் மாத்திரை உட்கொள்ளவும்.',
        'நாளைக்கு இரண்டு முறை மூட்டுகளில் மெதுவாக ஜெல் தடவவும், அழுத்த வேண்டாம்.',
        'தரையில் சம்மணமிட்டு உட்கார வேண்டாம்; மேற்கத்திய கழிவறையைப் பயன்படுத்தவும்.',
      ],
      te: [
        'తీవ్రమైన నొప్పి ఉన్నప్పుడు మాత్రమే పారాసిటమాల్ వేసుకోండి; రోజుకు 3 కంటే ఎక్కువ వద్దు.',
        'ప్రతిరోజూ మధ్యాహ్నం భోజనం తర్వాత క్యాల్షియం టాబ్లెట్ వేసుకోండి.',
        'రోజుకు రెండుసార్లు మోకాళ్లపై జెల్ సున్నితంగా రాయండి, గట్టిగా రుద్దవద్దు.',
        'నేలపై కింద కూర్చోవద్దు లేదా పద్మాసనం వేయవద్దు; కుర్చీ వాడండి.',
      ],
    },
    followUp: {
      date: '26-Oct-2026',
      doctorName: 'Dr. C. Mohan',
      specialty: 'Senior Orthopedic Surgeon',
      hospital: 'Sanjay Gandhi Institute of Orthopaedics, OPD Unit 2',
      documentsToCarry: [
        'This OPD prescription slip',
        'Knee X-ray films (AP & Lateral views)',
        'List of regular heart medications being taken',
      ],
    },
    questionsForDoctor: {
      en: [
        'Are there specific knee strengthening exercises that will not stress my heart stent?',
        'Would knee support braces help me when walking outside?',
        'When should we consider hyaluronic acid injections or other therapies?',
      ],
      kn: [
        'ನನ್ನ ಹೃದಯದ ಸ್ಟೆಂಟ್‌ಗೆ ತೊಂದರೆಯಾಗದಂತೆ ಮೊಣಕಾಲಿಗೆ ಯಾವ ವ್ಯಾಯಾಮಗಳು ಸೂಕ್ತ?',
        'ಹೊರಗೆ ನಡೆಯುವಾಗ ನೀ-ಕ್ಯಾಪ್ (Knee brace) ಬಳಸಬೇಕೆ?',
      ],
      hi: [
        'घुटने के लिए कौन से व्यायाम सुरक्षित हैं जिससे दिल पर जोर न पड़े?',
        'क्या बाहर टहलते समय नी-कैप या बेल्ट पहनना चाहिए?',
      ],
      ta: [
        'இதயத்திற்கு அழுத்தம் தராத மூட்டுப் பயிற்சிகள் எவை?',
        'வெளியே நடக்கும்போது முழங்கால் பெல்ட் பயன்படுத்தலாமா?',
      ],
      te: [
        'గుండెపై భారం పడకుండా మోకాళ్లకు ఎలాంటి వ్యాయామాలు చేయాలి?',
        'బయట నడిచేటప్పుడు నీ-క్యాప్ ధరించవచ్చా?',
      ],
    },
    actionPlan: [
      {
        id: 'rx-act-1',
        text: 'Arrange knee X-ray (AP & Lateral view) before review date (26-Oct-2026)',
        completed: false,
        category: 'document',
        dueDate: '24-Oct-2026',
      },
      {
        id: 'rx-act-2',
        text: 'Set lunch reminder for daily Calcium + Vitamin D tablet',
        completed: true,
        category: 'medication',
        dueDate: 'Daily at 1:30 PM',
      },
      {
        id: 'rx-act-3',
        text: 'Ensure western commode chair is available at home to protect knees',
        completed: true,
        category: 'precaution',
        dueDate: 'Immediate',
      },
    ],
    urgentWarnings: [
      'If you notice sudden severe swelling, redness, heat, or fever around either knee joint, seek medical evaluation promptly.',
    ],
  },
];
