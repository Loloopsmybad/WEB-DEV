import { getReminders } from '../store/dataStore';
import { Clock, CheckCircle } from 'lucide-react';

interface WorkStatusPageProps {
  type: 'pending' | 'completed';
}

export default function WorkStatusPage({ type }: WorkStatusPageProps) {
  const reminders = getReminders();

  const pendingItems = reminders.map(r => ({
    id: r.id,
    title: r.note,
    date: r.date,
    status: 'Pending',
  }));

  const completedItems = [
    { id: '1', title: 'Review case documents for DIAC/6086/01-23', date: '2025-01-15', status: 'Completed' },
    { id: '2', title: 'Prepare hearing notes', date: '2025-01-14', status: 'Completed' },
    { id: '3', title: 'Update case status', date: '2025-01-13', status: 'Completed' },
  ];

  const items = type === 'pending' ? pendingItems : completedItems;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {type === 'pending' ? 'Pending Work Status' : 'Completed Work Status'}
        </h1>
        <p className="text-gray-500">
          {type === 'pending' ? 'View all pending tasks and work items' : 'View completed tasks and work history'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Task</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      type === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {type === 'pending' ? <Clock size={12} className="inline mr-1" /> : <CheckCircle size={12} className="inline mr-1" />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    {type === 'pending' ? 'No pending tasks' : 'No completed tasks'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
