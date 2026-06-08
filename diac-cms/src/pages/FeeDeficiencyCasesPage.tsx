import { useState, useMemo } from 'react';
import { getCases } from '../store/dataStore';
import { Search, ChevronDown } from 'lucide-react';

export default function FeeDeficiencyCasesPage() {
  const allCases = getCases();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const deficiencyStatuses = [
    'Fee demand letters issued',
    'Fee demand + quantification letters issued',
    'Reminder for Fees',
    'Second Reminder for Fees',
    'Fee reminder to Respondent',
    'Second Fee reminder to Respondent',
  ];

  const filteredCases = useMemo(() => {
    return allCases.filter(c => {
      const matchesSearch = !searchTerm ||
        `${c.caseNoPrefix}/${c.caseNo}/${c.caseNoYear}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [allCases, searchTerm]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fee Deficiency Allotted Cases</h1>
        <p className="text-gray-500">Cases with fee payment deficiencies</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by DIAC Registration No..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
          >
            <option value="">All Fee Status</option>
            {deficiencyStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">DIAC Reg No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Case Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Registration Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Hearing</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Arbitrator</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((c, i) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc]">{c.caseNoPrefix}/{c.caseNo}/{c.caseNoYear}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{c.caseTitle}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">{c.typeOfArbitration}</span></td>
                  <td className="px-4 py-3">{c.dateOfRegistration}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{c.caseStatus}</span></td>
                  <td className="px-4 py-3">{c.caseStatus}</td>
                  <td className="px-4 py-3">{c.arbitratorName}</td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <button className="flex items-center gap-1 text-[#3c8dbc] hover:text-[#367fa9]">
                        Actions <ChevronDown size={14} />
                      </button>
                      <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">View Details</a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Fee Draft</a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Case Fee</a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">View Fees</a>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Edit</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">No fee deficiency cases found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
