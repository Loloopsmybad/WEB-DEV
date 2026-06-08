import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';
import { RefreshCw, FileText, RotateCcw, Save, CheckCircle } from 'lucide-react';

interface NotingEntry {
  id: string;
  text: string;
  markedBy: string;
  markedByRole: string;
  markedTo: string;
  markedToRole: string;
  notingDate: string;
  nextDate: string;
  attachment: string;
  status: 'pending' | 'done';
}

const defaultEntries: NotingEntry[] = [
  {
    id: 'n1',
    text: 'Despite letter dated 02.02.2026 no SOC filed yet.\nDraft reminder letter is submitted for approval.',
    markedBy: 'Mr. Rajesh Gautam',
    markedByRole: 'Judicial Assistant',
    markedTo: 'Ms. Abhilasha Singh',
    markedToRole: 'Additional Coordinator',
    notingDate: '27-04-2026 11:33:10',
    nextDate: '27-04-2026',
    attachment: 'N/A',
    status: 'done',
  },
  {
    id: 'n2',
    text: 'Approved. Be sent.',
    markedBy: 'Ms. Abhilasha Singh',
    markedByRole: 'Additional Coordinator',
    markedTo: 'Mr. Rajesh Gautam',
    markedToRole: 'Judicial Assistant',
    notingDate: '27-04-2026 11:46:52',
    nextDate: '27-04-2026',
    attachment: 'N/A',
    status: 'done',
  },
  {
    id: 'n3',
    text: 'As directed, SOC reminder letter sent to the parties.',
    markedBy: 'Mr. Rajesh Gautam',
    markedByRole: 'Judicial Assistant',
    markedTo: 'Mr. Rajesh Gautam',
    markedToRole: 'Judicial Assistant',
    notingDate: '27-04-2026 14:39:29',
    nextDate: '27-04-2026',
    attachment: 'N/A',
    status: 'pending',
  },
];

const notingTexts = [
  'Draft reminder letter is submitted for approval.',
  'Approved. Be sent.',
  'As directed, SOC reminder letter sent to the parties.',
  'Case is listed for hearing.',
  'Fee demand letter issued.',
  'No action required.',
];

const staffMembers = [
  { name: 'Mr. Rajesh Gautam', role: 'Judicial Assistant' },
  { name: 'Ms. Abhilasha Singh', role: 'Additional Coordinator' },
  { name: 'Ms. Saumya', role: 'Deputy Counsel' },
  { name: 'Mr. Milan Goel', role: 'Additional Coordinator' },
  { name: 'Mr. Sidharth Gaur', role: 'Judicial Assistant' },
];

export default function NotingPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];
  const [entries, setEntries] = useState<NotingEntry[]>(defaultEntries);
  const [notingText, setNotingText] = useState('');
  const [customNoting, setCustomNoting] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [markedTo, setMarkedTo] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected.</div>;

  const effectiveNoting = notingText === '__custom__' ? customNoting : notingText;

  const handleSave = () => {
    if (!effectiveNoting.trim()) return;
    const staff = staffMembers.find(s => s.name === markedTo);
    setEntries(prev => [...prev, {
      id: `n-${Date.now()}`,
      text: effectiveNoting,
      markedBy: 'Admin User',
      markedByRole: 'System Administrator',
      markedTo: markedTo || 'N/A',
      markedToRole: staff?.role || '',
      notingDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      nextDate: nextDate || 'N/A',
      attachment: 'N/A',
      status: 'pending',
    }]);
    setNotingText(''); setCustomNoting(''); setMarkedTo(''); setNextDate(''); setIsUrgent(false);
  };

  const handleReset = () => {
    setNotingText(''); setCustomNoting(''); setMarkedTo(''); setNextDate(''); setIsUrgent(false);
  };

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      {/* Case Status Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Case Status</h3>
            <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded">
              View Status Timeline
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Case Hearing:</span> <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Pre-Hearing</span></div>
            <div><span className="text-gray-500">Case Status:</span> <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">Reminder for SOC</span></div>
            <div><span className="text-gray-500">Status Changed On:</span> <span className="ml-2">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
            <div><span className="text-gray-500">Case Label Status:</span> <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white rounded text-xs font-medium">SOC Not Filed</span></div>
          </div>
        </div>

        {/* Add Noting on other Cases */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Add Noting on other Cases:</h3>
          <div className="flex gap-2">
            <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3c8dbc] outline-none">
              <option value="">DIAC Reg. No./Case Title</option>
              {cases.map(c => (
                <option key={c.id} value={c.id}>{c.caseNoPrefix}/{c.caseNo}/{c.caseNoYear} - {c.caseTitle}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium">Proceed</button>
          </div>
        </div>
      </div>

      {/* Draft Letters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Draft letters generated in the case</h3>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded">
            <FileText size={14} /> Reminder of Statement of Claim
          </button>
        </div>
      </div>

      {/* Main Noting Section - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left - Notings Table (3/5 width) */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800 mb-3">Notings:</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span>Show</span>
                <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs rounded">
                  <RefreshCw size={14} /> Refresh
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded">
                  <FileText size={14} /> PDF
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium">S. No.</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Noting</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Marked by</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Marked to/File sent</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Date of noting</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Next Date</th>
                  <th className="px-3 py-3 text-left text-xs font-medium">Attachment</th>
                  <th className="px-3 py-3 text-center text-xs font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {entries.slice(0, entriesPerPage).map((entry, i) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3">{i + 1}</td>
                    <td className="px-3 py-3 text-sm whitespace-pre-line">{entry.text}</td>
                    <td className="px-3 py-3">
                      <div>{entry.markedBy}</div>
                      <div className="text-xs text-gray-500">({entry.markedByRole})</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>{entry.markedTo}</div>
                      <div className="text-xs text-gray-500">({entry.markedToRole})</div>
                    </td>
                    <td className="px-3 py-3 text-xs whitespace-nowrap">{entry.notingDate}</td>
                    <td className="px-3 py-3 text-xs">{entry.nextDate}</td>
                    <td className="px-3 py-3 text-xs">{entry.attachment}</td>
                    <td className="px-3 py-3 text-center">
                      {entry.status === 'done' ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-green-500 text-white rounded">
                          <CheckCircle size={16} />
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded font-medium">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">No noting entries</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t text-sm text-gray-500">
            Showing 1 to {Math.min(entries.length, entriesPerPage)} of {entries.length} entries
          </div>
        </div>

        {/* Right - Noting Form (2/5 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h3 className="font-semibold text-gray-800 mb-3">Noting Form:</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Noting:</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-2 py-1 flex flex-wrap gap-1">
                    <button className="p-1 hover:bg-gray-200 rounded text-sm font-bold">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm italic">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm underline">U</button>
                    <span className="w-px bg-gray-300 mx-1"></span>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm line-through">S</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">X²</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">X₂</button>
                    <span className="w-px bg-gray-300 mx-1"></span>
                    <select className="text-xs border-0 bg-transparent outline-none">
                      <option>14</option><option>12</option><option>16</option><option>18</option><option>24</option>
                    </select>
                    <span className="w-px bg-gray-300 mx-1"></span>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm font-bold text-yellow-600">A</button>
                    <span className="w-px bg-gray-300 mx-1"></span>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">≡</button>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">⋮≡</button>
                    <span className="w-px bg-gray-300 mx-1"></span>
                    <button className="p-1 hover:bg-gray-200 rounded text-sm">T↓</button>
                  </div>
                  <textarea
                    value={effectiveNoting}
                    onChange={(e) => {
                      if (notingText === '__custom__') setCustomNoting(e.target.value);
                      else setCustomNoting(e.target.value);
                    }}
                    rows={5}
                    placeholder="Enter noting details..."
                    className="w-full px-3 py-2 border-0 outline-none resize-none text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="urgent" className="text-sm font-medium text-gray-700">Urgent</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Noting Text</label>
                <select
                  value={notingText}
                  onChange={(e) => setNotingText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                >
                  <option value="">Select Noting Text</option>
                  {notingTexts.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                  <option value="__custom__">Custom...</option>
                </select>
                {notingText === '__custom__' && (
                  <textarea
                    value={customNoting}
                    onChange={(e) => setCustomNoting(e.target.value)}
                    rows={3}
                    placeholder="Type custom noting..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-2 focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marked to/File sent:*</label>
                <select
                  value={markedTo}
                  onChange={(e) => setMarkedTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                >
                  <option value="">Select Option</option>
                  {staffMembers.map((s, i) => (
                    <option key={i} value={s.name}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Date</label>
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                />
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button onClick={handleReset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  <RotateCcw size={14} /> Reset
                </button>
                <button onClick={handleSave} className="flex items-center gap-1 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                  <Save size={14} /> Save Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CaseDetailLayout>
  );
}
