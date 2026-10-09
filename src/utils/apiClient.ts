import {
  PatientProfile,
  MedicationReminder,
  CaregiverNotification,
  UploadedDocumentRecord,
  SupportedLanguage,
} from '../types';

export const apiClient = {
  // Health
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch {
      return { status: 'offline', hasApiKey: false };
    }
  },

  // Patients
  async getPatients(): Promise<PatientProfile[]> {
    try {
      const res = await fetch('/api/patients');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch patients from server, using local fallback:', e);
    }
    return [];
  },

  async updatePatient(id: string, profile: PatientProfile): Promise<PatientProfile | null> {
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to update patient on server:', e);
    }
    return null;
  },

  async addPatient(profile: PatientProfile): Promise<PatientProfile | null> {
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to add patient on server:', e);
    }
    return null;
  },

  // Medication Reminders
  async getReminders(patientId?: string): Promise<MedicationReminder[]> {
    try {
      const url = patientId ? `/api/reminders?patientId=${encodeURIComponent(patientId)}` : '/api/reminders';
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch reminders from server:', e);
    }
    return [];
  },

  async addReminder(reminder: MedicationReminder): Promise<MedicationReminder | null> {
    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminder),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to add reminder on server:', e);
    }
    return null;
  },

  async updateReminderStatus(
    reminderId: string,
    newStatus: 'taken' | 'snoozed' | 'missed' | 'scheduled'
  ): Promise<MedicationReminder | null> {
    try {
      const res = await fetch(`/api/reminders/${reminderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to update reminder status on server:', e);
    }
    return null;
  },

  async deleteReminder(reminderId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/reminders/${reminderId}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      console.warn('Failed to delete reminder on server:', e);
      return false;
    }
  },

  // Documents
  async getDocuments(): Promise<UploadedDocumentRecord[]> {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch documents from server:', e);
    }
    return [];
  },

  async addDocument(record: UploadedDocumentRecord): Promise<UploadedDocumentRecord | null> {
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to save document on server:', e);
    }
    return null;
  },

  // Notifications
  async getNotifications(): Promise<CaregiverNotification[]> {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Failed to fetch notifications from server:', e);
    }
    return [];
  },

  async markNotificationRead(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async clearAllNotifications(): Promise<boolean> {
    try {
      const res = await fetch('/api/notifications', {
        method: 'DELETE',
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // AI Document Analysis
  async analyzeDocument(params: {
    documentText?: string;
    imageBase64?: string;
    mimeType?: string;
    language?: SupportedLanguage;
  }) {
    const res = await fetch('/api/analyze-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  },

  // AI Voice Query
  async voiceQuery(params: {
    query: string;
    documentContext?: any;
    language?: SupportedLanguage;
  }) {
    const res = await fetch('/api/voice-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await res.json();
  },
};
