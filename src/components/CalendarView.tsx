import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pill,
  Volume2,
  Plus,
  CalendarCheck,
  Check,
  Sparkles,
  MapPin,
  X,
  Stethoscope,
} from 'lucide-react';
import { MedicationReminder, SupportedLanguage } from '../types';
import { speechService } from '../utils/speech';
import { t } from '../utils/i18n';

interface CalendarViewProps {
  reminders: MedicationReminder[];
  patientId: string;
  patientName: string;
  currentLanguage: SupportedLanguage;
  onToggleStatus: (reminderId: string, newStatus: 'taken' | 'snoozed' | 'missed' | 'scheduled') => void;
  onAddReminder: (reminder: MedicationReminder) => void;
  upcomingAppointments?: Array<{
    id: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    hospital: string;
    carryList: string[];
  }>;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  reminders,
  patientId,
  patientName,
  currentLanguage,
  onToggleStatus,
  onAddReminder,
  upcomingAppointments = [],
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed (0 = Jan, 9 = Oct)
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [showAddQuickModal, setShowAddQuickModal] = useState(false);
  const [quickMedName, setQuickMedName] = useState('');
  const [quickMedTime, setQuickMedTime] = useState('08:30');
  const [quickMedDose, setQuickMedDose] = useState('1 Tablet');

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay(); // 0 for Sunday
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Patient reminders
  const patientReminders = reminders.filter((r) => r.patientId === patientId);

  // Helper to determine if a reminder falls on a particular day of the month
  const getRemindersForDay = (dayNumber: number) => {
    const targetDate = new Date(currentYear, currentMonth, dayNumber);
    const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][targetDate.getDay()];

    return patientReminders.filter((rem) => {
      if (rem.frequency === 'daily') return true;
      if (rem.frequency === 'weekly') {
        if (rem.daysOfWeek && rem.daysOfWeek.length > 0) {
          return rem.daysOfWeek.includes(dayOfWeekStr);
        }
        // Fallback: Monday, Wednesday, Friday
        return targetDate.getDay() === 1 || targetDate.getDay() === 3 || targetDate.getDay() === 5;
      }
      if (rem.frequency === 'monthly') {
        return (rem.dayOfMonth || 1) === dayNumber;
      }
      return true;
    });
  };

  // Get appointments for selected day
  const getAppointmentsForDay = (dayNumber: number) => {
    // If the appointment date contains day number or matches upcoming schedule
    return upcomingAppointments.filter((apt) => {
      const dayMatches = apt.date.includes(String(dayNumber)) || (dayNumber === 15 && apt.date.toLowerCase().includes('oct'));
      return dayMatches;
    });
  };

  const selectedDayReminders = getRemindersForDay(selectedDay);
  const selectedDayAppointments = getAppointmentsForDay(selectedDay);

  const isToday = (dayNumber: number) => {
    return (
      dayNumber === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleTestChime = (med: MedicationReminder) => {
    speechService.stop();
    speechService.speak({
      text: `Medication schedule for ${patientName}: ${med.medicationName}, ${med.dosage}. Scheduled for ${med.time}. Take ${med.mealRelation.replace('_', ' ')}.`,
      language: currentLanguage,
    });
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMedName.trim()) return;

    const newRem: MedicationReminder = {
      id: `rem-cal-${Date.now()}`,
      patientId,
      patientName,
      medicationName: quickMedName.trim(),
      dosage: quickMedDose,
      form: 'Tablet',
      frequency: 'daily',
      time: quickMedTime,
      timeOfDayLabel: parseInt(quickMedTime.split(':')[0]) < 12 ? 'Morning' : parseInt(quickMedTime.split(':')[0]) < 17 ? 'Afternoon' : 'Night',
      mealRelation: 'after_food',
      instructions: 'Take as directed by doctor on prescription.',
      derivedFromDoc: 'Caregiver Calendar Schedule',
      caregiverAlertChannels: ['in_app', 'audio'],
      status: 'scheduled',
    };

    onAddReminder(newRem);
    setQuickMedName('');
    setShowAddQuickModal(false);
  };

  // Color helper for time of day
  const getTimeColor = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour < 12) {
      return {
        bg: 'bg-amber-100 text-amber-900 border-amber-300',
        dot: 'bg-amber-500',
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        label: t('morning', currentLanguage),
      };
    } else if (hour < 17) {
      return {
        bg: 'bg-sky-100 text-sky-900 border-sky-300',
        dot: 'bg-sky-500',
        badge: 'bg-sky-50 text-sky-800 border-sky-200',
        label: t('afternoon', currentLanguage),
      };
    } else {
      return {
        bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        dot: 'bg-indigo-500',
        badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        label: t('night', currentLanguage),
      };
    }
  };

  return (
    <div className="space-y-5">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner">
            <CalendarIcon className="w-6 h-6 text-indigo-200" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
              {t('monthlySchedule', currentLanguage)}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {monthNames[currentMonth]} {currentYear}
            </h3>
          </div>
        </div>

        {/* Month Navigation & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleGoToday}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
          >
            {t('today', currentLanguage)}
          </button>

          <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/20">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white/20 rounded-lg transition"
              title={t('prevMonth', currentLanguage)}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white/20 rounded-lg transition"
              title={t('nextMonth', currentLanguage)}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <button
            onClick={() => setShowAddQuickModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t('setSchedule', currentLanguage)}</span>
          </button>
        </div>
      </div>

      {/* Color Legend */}
      <div className="flex items-center gap-3 flex-wrap text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <span className="font-bold text-slate-700">Schedule Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500" />
          <span className="text-slate-600">{t('morning', currentLanguage)} (06:00 - 11:59)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-400 border border-sky-500" />
          <span className="text-slate-600">{t('afternoon', currentLanguage)} (12:00 - 16:59)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500 border border-indigo-600" />
          <span className="text-slate-600">{t('night', currentLanguage)} (17:00 - 23:59)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
          <span className="text-slate-600">{t('taken', currentLanguage)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-slate-600">Doctor Visit</span>
        </div>
      </div>

      {/* 7-Day Calendar Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center font-bold text-xs text-slate-600">
          {daysOfWeek.map((d, idx) => (
            <div
              key={idx}
              className={`py-3 ${idx === 0 || idx === 6 ? 'text-rose-600' : 'text-slate-700'}`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Cells Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 bg-slate-100/50">
          {/* Previous month trailing days */}
          {Array.from({ length: firstDayWeekday }).map((_, i) => {
            const dayNum = prevMonthDays - firstDayWeekday + i + 1;
            return (
              <div
                key={`prev-${i}`}
                className="min-h-[95px] p-1.5 bg-slate-50/40 text-slate-300 opacity-60 text-xs"
              >
                <span className="font-semibold">{dayNum}</span>
              </div>
            );
          })}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayMeds = getRemindersForDay(dayNum);
            const dayApts = getAppointmentsForDay(dayNum);
            const isDaySelected = selectedDay === dayNum;
            const isCurrentDay = isToday(dayNum);

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => setSelectedDay(dayNum)}
                className={`min-h-[105px] p-1.5 sm:p-2 bg-white transition cursor-pointer flex flex-col justify-between hover:bg-indigo-50/40 ${
                  isDaySelected
                    ? 'ring-2 ring-indigo-600 ring-inset bg-indigo-50/30'
                    : ''
                }`}
              >
                {/* Day Number Header */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrentDay
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isDaySelected
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-800'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {dayMeds.length > 0 && (
                    <span className="text-[10px] font-bold text-slate-400">
                      {dayMeds.length} {dayMeds.length === 1 ? 'dose' : 'doses'}
                    </span>
                  )}
                </div>

                {/* Day Med Pills Preview */}
                <div className="space-y-1 overflow-hidden">
                  {dayApts.length > 0 && (
                    <div className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 truncate flex items-center gap-1">
                      <Stethoscope className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">Dr Visit</span>
                    </div>
                  )}

                  {dayMeds.slice(0, 2).map((med) => {
                    const color = getTimeColor(med.time);
                    const isTaken = med.status === 'taken';

                    return (
                      <div
                        key={med.id}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate flex items-center gap-1 border ${
                          isTaken
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : color.bg
                        }`}
                        title={`${med.time} - ${med.medicationName} (${med.dosage})`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isTaken ? 'bg-emerald-500' : color.dot
                          }`}
                        />
                        <span className="truncate font-semibold">{med.medicationName}</span>
                      </div>
                    );
                  })}

                  {dayMeds.length > 2 && (
                    <div className="text-[9px] font-bold text-slate-500 pl-1">
                      +{dayMeds.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda Detail Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black text-sm">
              {selectedDay}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">
                Selected Day Schedule
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {monthNames[currentMonth]} {selectedDay}, {currentYear} &bull; {patientName}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
              {selectedDayReminders.length} Scheduled Reminders
            </span>
            <button
              onClick={() => setShowAddQuickModal(true)}
              className="flex items-center gap-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dose</span>
            </button>
          </div>
        </div>

        {/* Selected Day Appointments */}
        {selectedDayAppointments.length > 0 && (
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Stethoscope className="w-4 h-4 text-blue-700" />
              <span>Doctor Appointment on this Day:</span>
            </div>
            {selectedDayAppointments.map((apt) => (
              <div key={apt.id} className="bg-white p-3 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{apt.doctor} &bull; {apt.specialty}</div>
                  <div className="text-slate-500 mt-0.5">{apt.hospital} at {apt.time}</div>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-lg font-bold">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Medication Reminders List for Selected Day */}
        {selectedDayReminders.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Pill className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-medium">No medications scheduled for this specific date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayReminders.map((med) => {
              const timeColor = getTimeColor(med.time);
              const isTaken = med.status === 'taken';

              return (
                <div
                  key={med.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isTaken
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isTaken
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : timeColor.bg
                      }`}
                    >
                      {isTaken ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Pill className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                          {med.medicationName}
                        </h5>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                          {med.dosage}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${timeColor.badge}`}>
                          {med.time} &bull; {timeColor.label}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1">
                        {med.instructions} &bull; {med.mealRelation.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Actions for this reminder */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => handleTestChime(med)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      title={t('testChime', currentLanguage)}
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                    </button>

                    {isTaken ? (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('taken', currentLanguage)}</span>
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => onToggleStatus(med.id, 'taken')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('markTaken', currentLanguage)}</span>
                        </button>

                        <button
                          onClick={() => onToggleStatus(med.id, 'snoozed')}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        >
                          {t('snooze', currentLanguage)}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Add Reminder Modal */}
      {showAddQuickModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {t('setSchedule', currentLanguage)} for {patientName}
              </h3>
              <button
                onClick={() => setShowAddQuickModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tab Metoprolol"
                  value={quickMedName}
                  onChange={(e) => setQuickMedName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    required
                    value={quickMedDose}
                    onChange={(e) => setQuickMedDose(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time (24h)
                  </label>
                  <input
                    type="time"
                    required
                    value={quickMedTime}
                    onChange={(e) => setQuickMedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddQuickModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
