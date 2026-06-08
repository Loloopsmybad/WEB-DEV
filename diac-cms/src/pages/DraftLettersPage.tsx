import { useState, useMemo } from 'react';
import { getCases } from '../store/dataStore';
import { Search, FileText } from 'lucide-react';

const draftTypes = [
  { key: 'SOC_FORMAT', label: 'Statement of Claim' },
  { key: 'REMINDER_SOC_FORMAT', label: 'Reminder of S.O.C.' },
  { key: 'FINAL_REMINDER_SOC_FORMAT', label: 'Final Reminder of S.O.C.' },
  { key: 'CLOSED_DRAFT', label: 'Administratively Closed Draft' },
  { key: 'NAMES_TO_OPPOSITE_PARTY', label: 'Names to Opposite Party' },
  { key: 'FEE_DRAFT', label: 'Fee Draft' },
  { key: 'DOH_LETTER', label: 'DOH Letter' },
];

export default function DraftLettersPage() {
  const cases = getCases();
  const [selectedCase, setSelectedCase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = useMemo(() => {
    return cases.filter(c =>
      !searchTerm ||
      `${c.caseNoPrefix}/${c.caseNo}/${c.caseNoYear}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cases, searchTerm]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Draft Letters</h1>
        <p className="text-gray-500">Generate draft letters for cases</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by case no or title..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" />
          </div>
          <select value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none">
            <option value="">Select DIAC Registration No.</option>
            {filteredCases.map(c => (
              <option key={c.id} value={c.id}>{c.caseNoPrefix}/{c.caseNo}/{c.caseNoYear} - {c.caseTitle}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCase ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {draftTypes.map(draft => (
            <div key={draft.key} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <FileText size={24} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{draft.label}</h3>
                  <p className="text-sm text-gray-500">Generate {draft.label.toLowerCase()} for this case</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Select a case from the dropdown above to view available draft templates</p>
        </div>
      )}
    </div>
  );
}
