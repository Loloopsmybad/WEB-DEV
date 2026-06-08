import { useState, useMemo } from 'react';
import { getCases } from '../store/dataStore';
import { Search, Filter, Download, Eye } from 'lucide-react';

export default function AllCasesPage() {
  const allCases = getCases();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');

  const filteredCases = useMemo(() => {
    return allCases.filter(c => {
      const matchesSearch = !searchTerm ||
        c.caseNo.includes(searchTerm) ||
        c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.claimantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.respondentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || c.caseStatus === statusFilter;
      const matchesType = !typeFilter || c.typeOfArbitration === typeFilter;
      const matchesMode = !modeFilter || c.modeOfReference === modeFilter;
      return matchesSearch && matchesStatus && matchesType && matchesMode;
    });
  }, [allCases, searchTerm, statusFilter, typeFilter, modeFilter]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Cases</h1>
        <p className="text-gray-500">Manage and search all registered cases</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by case no, title, claimant, respondent..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <Download size={18} /> Export
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
              >
                <option value="">All Statuses</option>
                <option value="Pre-Hearing">Pre-Hearing</option>
                <option value="Under Hearing">Under Hearing</option>
                <option value="Award-Termination">Award-Termination</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Arbitration</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
              >
                <option value="">All Types</option>
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Reference</label>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
              >
                <option value="">All Modes</option>
                <option value="Direct">Direct</option>
                <option value="Court">Court</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredCases.length} of {allCases.length} cases
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">DIAC Reg No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Case Title</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Date of Ref</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Mode</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Registration Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((caseItem, index) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#3c8dbc]">
                    {caseItem.caseNoPrefix}/{caseItem.caseNo}/{caseItem.caseNoYear}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{caseItem.caseTitle}</td>
                  <td className="px-4 py-3">{caseItem.dateOfReference}</td>
                  <td className="px-4 py-3">{caseItem.modeOfReference}</td>
                  <td className="px-4 py-3">{caseItem.dateOfRegistration}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      caseItem.caseStatus === 'Under Hearing' ? 'bg-green-100 text-green-800' :
                      caseItem.caseStatus === 'Pre-Hearing' ? 'bg-yellow-100 text-yellow-800' :
                      caseItem.caseStatus === 'Award-Termination' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {caseItem.caseStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[#3c8dbc] hover:text-[#367fa9]">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No cases found
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
