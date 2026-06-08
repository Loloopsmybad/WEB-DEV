import { BarChart3, FileText, Download } from 'lucide-react';

const reports = [
  { id: 1, name: 'Case Summary Report', description: 'Overview of all cases with status breakdown', icon: FileText },
  { id: 2, name: 'Hearing Schedule Report', description: 'Upcoming hearings and room allocations', icon: BarChart3 },
  { id: 3, name: 'Fee Collection Report', description: 'Fee payment status and collection summary', icon: FileText },
  { id: 4, name: 'Arbitrator Workload Report', description: 'Case distribution among arbitrators', icon: BarChart3 },
  { id: 5, name: 'Monthly Statistics', description: 'Monthly case registration and disposal statistics', icon: BarChart3 },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500">Generate and view system reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#3c8dbc]/10 rounded-lg">
                <report.icon size={24} className="text-[#3c8dbc]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                <button className="flex items-center gap-2 text-sm text-[#3c8dbc] hover:text-[#367fa9] font-medium">
                  <Download size={16} /> Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
