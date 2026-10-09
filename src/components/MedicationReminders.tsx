import React, { useState } from 'react';
import {
  Bell,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Plus,
  Volume2,
  MessageCircle,
  Smartphone,
  Pill,
  Sparkles,
  ChevronRight,
  RefreshCw,
  X,
  Check,
  Send,
  RotateCcw,
  List,
  CalendarDays,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';
import { MedicationReminder, CaregiverNotification, DocumentAnalysis, SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';
import { CalendarView } from './CalendarView';
import { t } from '../utils/i18n';

interface MedicationRemindersProps {
  reminders: MedicationReminder[];
  onToggleStatus: (reminderId: string, newStatus: 'taken' | 'snoozed' | 'missed' | 'scheduled') => void;
  onAddReminder: (reminder: MedicationReminder) => void;
  notifications: CaregiverNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  currentDocument: DocumentAnalysis;
  patientName: string;
  patientId: string;
  currentLanguage?: SupportedLanguage;
  upcomingAppointments?: any[];
}

export const MedicationReminders: React.FC<MedicationRemindersProps> = ({
  reminders,
  onToggleStatus,
  onAddReminder,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  currentDocument,
  patientName,
  patientId,
  currentLanguage = 'en',
  upcomingAppointments = [],
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterFrequency, setFilterFrequency] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [simulatedAlertMessage, setSimulatedAlertMessage] = useState<string | null>(null);

  // New reminder form fields
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('1 Tablet');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [time, setTime] = useState('08:30');
  const [mealRelation, setMealRelation] = useState<'after_food' | 'before_food' | 'with_food' | 'anytime'>('after_food');
  const [instructions, setInstructions] = useState('');
  const [channels, setChannels] = useState<Array<'in_app' | 'whatsapp' | 'sms' | 'audio'>>(['in_app', 'whatsapp']);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredReminders = reminders.filter((r) => {
    const matchesPatient = r.patientId === patientId;
    const matchesFreq = filterFrequency === 'all' || r.frequency === filterFrequency;
    return matchesPatient && matchesFreq;
  });

  const totalDosesToday = reminders.filter((r) => r.patientId === patientId && r.frequency === 'daily').length;
  const takenDosesToday = reminders.filter((r) => r.patientId === patientId && r.frequency === 'daily' && r.status === 'taken').length;
  const adherencePercent = totalDosesToday > 0 ? Math.round((takenDosesToday / totalDosesToday) * 100) : 100;

  // Sync reminders directly from current document orders
  const handleAutoSyncFromDocument = () => {
    if (!currentDocument.instructions || currentDocument.instructions.length === 0) return;

    let addedCount = 0;
    currentDocument.instructions.forEach((inst, idx) => {
      // Check if already exists
      const exists = reminders.some((r) => r.patientId === patientId && r.medicationName.includes(inst.title));
      if (!exists) {
        const newRem: MedicationReminder = {
          id: `rem-sync-${Date.now()}-${idx}`,
          patientId,
          patientName,
          medicationName: inst.title,
          dosage: '1 Dose as directed',
          form: inst.iconType === 'wound' ? 'Gel' : 'Tablet',
          frequency: inst.timeOfDay === 'morning' || inst.timeOfDay === 'night' ? 'daily' : 'weekly',
          time: inst.timeOfDay === 'morning' ? '08:30' : inst.timeOfDay === 'night' ? '21:00' : '13:00',
          mealRelation: inst.mealTiming || 'after_food',
          instructions: inst.description,
          derivedFromDoc: currentDocument.fileName,
          caregiverAlertChannels: ['in_app', 'whatsapp', 'audio'],
          status: 'scheduled',
        };
        onAddReminder(newRem);
        addedCount++;
      }
    });

    setSimulatedAlertMessage(`Synced ${addedCount || currentDocument.instructions.length} medication schedules directly from ${currentDocument.fileName}!`);
    setTimeout(() => setSimulatedAlertMessage(null), 4000);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    const newReminder: MedicationReminder = {
      id: `rem-${Date.now()}`,
      patientId,
      patientName,
      medicationName: medName.trim(),
      dosage,
      form: 'Tablet',
      frequency,
      time,
      timeOfDayLabel: parseInt(time.split(':')[0]) < 12 ? 'Morning' : parseInt(time.split(':')[0]) < 17 ? 'Afternoon' : 'Night',
      mealRelation,
      instructions: instructions || 'Take with water as prescribed by physician.',
      derivedFromDoc: currentDocument.fileName || 'Caregiver Manual Entry',
      caregiverAlertChannels: channels,
      status: 'scheduled',
    };

    onAddReminder(newReminder);
    setShowAddModal(false);
    setMedName('');
    setInstructions('');

    setSimulatedAlertMessage(`Alert scheduled: ${medName} set for ${time} (${frequency}) for ${patientName}`);
    setTimeout(() => setSimulatedAlertMessage(null), 4000);
  };

  const handleTestChime = (med: MedicationReminder) => {
    speechService.stop();
    speechService.speak({
      text: `Medication Reminder for ${patientName}: It is time to take ${med.medicationName}, ${med.dosage}. Please take ${med.mealRelation.replace('_', ' ')}.`,
      language: currentLanguage,
    });

    setSimulatedAlertMessage(`🔊 Audio & WhatsApp alert dispatched to primary caregiver for ${med.medicationName}`);
    setTimeout(() => setSimulatedAlertMessage(null), 4000);
  };

  const getTimeTheme = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour < 12) {
      return {
        cardBg: 'bg-amber-50/50 border-amber-200 hover:border-amber-400',
        iconBg: 'bg-amber-100 text-amber-800',
        badge: 'bg-amber-100 text-amber-900 border-amber-200',
        icon: <Sun className="w-4 h-4 text-amber-600" />,
        label: t('morning', currentLanguage),
      };
    } else if (hour < 17) {
      return {
        cardBg: 'bg-sky-50/50 border-sky-200 hover:border-sky-400',
        iconBg: 'bg-sky-100 text-sky-800',
        badge: 'bg-sky-100 text-sky-900 border-sky-200',
        icon: <Sunset className="w-4 h-4 text-sky-600" />,
        label: t('afternoon', currentLanguage),
      };
    } else {
      return {
        cardBg: 'bg-indigo-50/50 border-indigo-200 hover:border-indigo-400',
        iconBg: 'bg-indigo-100 text-indigo-800',
        badge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        icon: <Moon className="w-4 h-4 text-indigo-600" />,
        label: t('night', currentLanguage),
      };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-6 space-y-5">
      {/* Toast Alert simulation */}
      {simulatedAlertMessage && (
        <div className="bg-emerald-800 text-white p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{simulatedAlertMessage}</span>
          </div>
          <button onClick={() => setSimulatedAlertMessage(null)} className="text-emerald-200 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header with Title and View Toggle */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-xl shadow-xs">
              <Pill className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">
                  {t('medicationReminders', currentLanguage)}
                </h3>
                <span className="text-xs font-bold bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {patientName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('remindersSubtitle', currentLanguage)}
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle (List View vs Monthly Calendar View) & Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* List vs Calendar Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5 text-purple-600" />
              <span>{t('listView', currentLanguage)}</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-indigo-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t('calendarView', currentLanguage)}</span>
            </button>
          </div>

          {/* Notification Center Trigger */}
          <button
            onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            aria-label="View caregiver notifications"
          >
            <Bell className="w-4 h-4 text-purple-600" />
            <span>{t('alerts', currentLanguage)}</span>
            {unreadCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Sync from Document Orders */}
          <button
            onClick={handleAutoSyncFromDocument}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition cursor-pointer"
            title="Import medication orders directly from current document"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('syncFromDocument', currentLanguage)}</span>
          </button>

          {/* Add Custom Schedule Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('setSchedule', currentLanguage)}</span>
          </button>
        </div>
      </div>

      {/* Adherence & Notification Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Adherence Progress */}
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1.5">
            <span>{t('adherenceRate', currentLanguage)}:</span>
            <span className="text-emerald-700">{takenDosesToday} / {totalDosesToday} {t('taken', currentLanguage)} ({adherencePercent}%)</span>
          </div>
          <div className="w-full bg-emerald-200/80 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${adherencePercent}%` }}
            />
          </div>
        </div>

        {/* Caregiver Channels Active */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Caregiver Alert Channels</div>
            <div className="text-xs font-bold text-slate-800 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5 text-emerald-700 font-semibold">&bull; WhatsApp</span>
              <span className="flex items-center gap-0.5 text-blue-700 font-semibold">&bull; SMS</span>
              <span className="flex items-center gap-0.5 text-purple-700 font-semibold">&bull; Audio Chime</span>
            </div>
          </div>
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <Smartphone className="w-4 h-4" />
          </div>
        </div>

        {/* Derived document source badge */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Verified Clinical Source</div>
            <div className="text-xs font-bold text-slate-800 truncate max-w-[180px]">
              {currentDocument.fileName}
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg border border-emerald-200">
            OCR Verified
          </span>
        </div>
      </div>

      {/* Notifications Drawer (Collapsible) */}
      {showNotificationsDrawer && (
        <div className="bg-slate-50 border border-purple-200 rounded-2xl p-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Caregiver Notification Log ({notifications.length})
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearAllNotifications}
                className="text-[11px] text-slate-500 hover:text-slate-800 underline"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowNotificationsDrawer(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-4 text-xs text-slate-400">
                No active alerts. Patient medication schedule is up to date!
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkNotificationRead(notif.id)}
                  className={`p-3 rounded-xl border text-xs transition cursor-pointer flex items-start justify-between gap-3 ${
                    notif.read
                      ? 'bg-white border-slate-200 text-slate-600'
                      : 'bg-purple-50/80 border-purple-300 text-purple-950 font-semibold'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">
                      {notif.type === 'taken' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-purple-600" />
                      )}
                    </span>
                    <div>
                      <div>{notif.message}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                        {notif.timestamp} &bull; Scheduled: {notif.scheduledTime}
                      </div>
                    </div>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* RENDER VIEW: Either Calendar View OR List View */}
      {viewMode === 'calendar' ? (
        <CalendarView
          reminders={reminders}
          patientId={patientId}
          patientName={patientName}
          currentLanguage={currentLanguage}
          onToggleStatus={onToggleStatus}
          onAddReminder={onAddReminder}
          upcomingAppointments={upcomingAppointments}
        />
      ) : (
        <div className="space-y-4">
          {/* Frequency Filter Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 flex-wrap">
            <span className="text-xs font-bold text-slate-400 mr-1">
              {t('allFrequencies', currentLanguage)}:
            </span>
            {[
              { id: 'all', label: t('allFrequencies', currentLanguage) },
              { id: 'daily', label: t('daily', currentLanguage) },
              { id: 'weekly', label: t('weekly', currentLanguage) },
              { id: 'monthly', label: t('monthly', currentLanguage) },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterFrequency(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filterFrequency === tab.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Medication Reminder Cards */}
          <div className="space-y-3">
            {filteredReminders.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs sm:text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                No medication reminders scheduled under this filter. Tap "Sync from Document" or "+ Set Schedule" above!
              </div>
            ) : (
              filteredReminders.map((rem) => {
                const isTaken = rem.status === 'taken';
                const timeTheme = getTimeTheme(rem.time);

                return (
                  <div
                    key={rem.id}
                    className={`p-4 rounded-2xl border-2 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isTaken
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : `${timeTheme.cardBg} shadow-2xs`
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <div
                        className={`p-2.5 rounded-xl shrink-0 mt-0.5 border ${
                          isTaken
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : `${timeTheme.iconBg} border-slate-200/50`
                        }`}
                      >
                        {isTaken ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          timeTheme.icon
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-md border font-mono ${timeTheme.badge}`}>
                            {rem.time}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                            {rem.frequency === 'daily'
                              ? t('daily', currentLanguage)
                              : rem.frequency === 'weekly'
                              ? t('weekly', currentLanguage)
                              : t('monthly', currentLanguage)}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                            {rem.mealRelation === 'after_food'
                              ? t('afterFood', currentLanguage)
                              : rem.mealRelation === 'before_food'
                              ? t('beforeFood', currentLanguage)
                              : rem.mealRelation.replace('_', ' ')}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {rem.medicationName} &bull; <span className="text-slate-500 text-xs font-normal">{rem.dosage}</span>
                        </h4>

                        <p className="text-xs text-slate-600 leading-snug mt-0.5">
                          {rem.instructions}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                          <span>Source: {rem.derivedFromDoc}</span>
                          {rem.lastTakenTimestamp && (
                            <span className="text-emerald-700 font-semibold">
                              &bull; Logged: {rem.lastTakenTimestamp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status action buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0 flex-wrap">
                      {/* Test audio chime */}
                      <button
                        onClick={() => handleTestChime(rem)}
                        className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-indigo-700 border border-slate-200 transition cursor-pointer"
                        title={t('testChime', currentLanguage)}
                        aria-label="Test audio alarm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Mark Taken / Undo */}
                      {isTaken ? (
                        <button
                          onClick={() => onToggleStatus(rem.id, 'scheduled')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition cursor-pointer border border-emerald-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>{t('taken', currentLanguage)} &check;</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggleStatus(rem.id, 'taken')}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>{t('markTaken', currentLanguage)}</span>
                        </button>
                      )}

                      {!isTaken && (
                        <button
                          onClick={() => onToggleStatus(rem.id, 'snoozed')}
                          className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition cursor-pointer"
                        >
                          {t('snooze', currentLanguage)}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Modal: Set Custom Schedule */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {t('setSchedule', currentLanguage)}
                </h3>
                <p className="text-xs text-slate-500">
                  Custom reminder for {patientName}
                </p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tab Ecosprin"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 75mg - 1 Tablet"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="daily">{t('daily', currentLanguage)}</option>
                    <option value="weekly">{t('weekly', currentLanguage)}</option>
                    <option value="monthly">{t('monthly', currentLanguage)}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meal Relation</label>
                  <select
                    value={mealRelation}
                    onChange={(e) => setMealRelation(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="after_food">{t('afterFood', currentLanguage)}</option>
                    <option value="before_food">{t('beforeFood', currentLanguage)}</option>
                    <option value="with_food">{t('withFood', currentLanguage)}</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructions / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Swallow with water, do not crush"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  {t('setSchedule', currentLanguage)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

