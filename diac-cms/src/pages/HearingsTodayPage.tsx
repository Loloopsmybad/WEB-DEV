import { getTodaysHearings } from '../store/dataStore';
import { Clock, MapPin } from 'lucide-react';

export default function HearingsTodayPage() {
  const hearings = getTodaysHearings();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hearings Today</h1>
        <p className="text-gray-500">View all hearings scheduled for today</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Case No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Time</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Room</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hearings.map((hearing, index) => (
                <tr key={hearing.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc]">{hearing.caseNo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      {hearing.time}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      {hearing.room}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {hearing.status}
                    </span>
                  </td>
                </tr>
              ))}
              {hearings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No hearings scheduled for today
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
