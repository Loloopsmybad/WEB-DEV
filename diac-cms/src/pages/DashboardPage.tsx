import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getReminders, addReminder, deleteReminder } from '../store/dataStore';
import { Building2, BookOpen, Clock, StickyNote, Plus, Trash2, Calendar } from 'lucide-react';

export default function DashboardPage() {
  const stats = getDashboardStats();
  const reminders = getReminders();
  const navigate = useNavigate();
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (reminderDate && reminderNote) {
      addReminder({ date: reminderDate, note: reminderNote });
      setReminderDate('');
      setReminderNote('');
      setShowReminderModal(false);
    }
  };

  const statCards = [
    { label: 'Alloted Cases Count', value: stats.allottedCases, icon: Building2, color: 'bg-[#3c8dbc]', link: '/allotted-case' },
    { label: 'Registered Cases', value: stats.registeredCases.toLocaleString(), icon: BookOpen, color: 'bg-[#3c8dbc]', link: '/all-cases' },
    { label: "Today's Hearing", value: stats.todaysHearings, icon: Clock, color: 'bg-[#3c8dbc]', link: '/hearings-today' },
    { label: 'Pending Work Count', value: stats.pendingWork, icon: StickyNote, color: 'bg-[#3c8dbc]', link: '/work-status/pending' },
    { label: 'Total Rooms', value: stats.totalRooms, icon: Building2, color: 'bg-[#3c8dbc]', link: '#' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Control panel</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Stats Cards */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className={`${card.color} text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => card.link !== '#' && navigate(card.link)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{card.value}</p>
                    <p className="text-sm opacity-90">{card.label}</p>
                  </div>
                  <card.icon size={40} className="opacity-50" />
                </div>
                <div className="mt-3 text-sm opacity-75 flex items-center gap-1">
                  More info <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Reminders */}
        <div className="lg:w-1/3 space-y-4">
          {/* Latest Notifications */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-yellow-500 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔔</span> Latest Notifications
              </h3>
              <button className="text-white/80 hover:text-white">
                <Plus size={16} />
              </button>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto">
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  <p className="font-medium">New Case Assigned</p>
                  <p className="text-xs text-gray-500">DIAC/12090/12-25 has been assigned to you</p>
                </li>
                <li className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  <p className="font-medium">Hearing Scheduled</p>
                  <p className="text-xs text-gray-500">Hearing for DIAC/6086/01-23 at 10:00 AM</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Today's Reminders */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-[#3c8dbc] text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar size={16} /> Today's Reminders
              </h3>
              <button
                onClick={() => setShowReminderModal(true)}
                className="text-white/80 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto">
              {reminders.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No reminders found</p>
              ) : (
                <ul className="space-y-2">
                  {reminders.map((reminder) => (
                    <li key={reminder.id} className="flex items-start justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm text-gray-800">{reminder.note}</p>
                        <p className="text-xs text-gray-500">{reminder.date}</p>
                      </div>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Reminder</h3>
              <button onClick={() => setShowReminderModal(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleAddReminder} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#3c8dbc] hover:bg-[#367fa9] text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
