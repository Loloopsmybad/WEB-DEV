import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function CauseListPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'overall' | 'diac'>('overall');

  const tabs = [
    { key: 'today' as const, label: "Today's Cause List" },
    { key: 'overall' as const, label: 'Overall Cause List' },
    { key: 'diac' as const, label: 'DIAC Cause List' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cause List</h1>
          <p className="text-gray-500">Manage hearing schedules</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg text-sm"><Plus size={16} /> Add New Hearing</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm">PDF Export</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 text-sm font-medium ${activeTab === tab.key ? 'border-b-2 border-[#3c8dbc] text-[#3c8dbc]' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Case No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Parties</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Time</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Room</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                {activeTab === 'today' ? 'No hearings scheduled for today' : 'No cause list entries'}
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
