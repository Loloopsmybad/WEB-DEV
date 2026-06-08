import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';

export default function StatusOfPleadingsPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];

  const [activeTab, setActiveTab] = useState<'sop' | 'misc'>('sop');
  const [formData, setFormData] = useState({
    claimInvitedOn: '', remToClaim: '', claimFiledOn: '', resServedOn: '',
    sodFiledOn: '', sopRejoinSodFiledOn: '',
    counterClaim: 'no', sopDofCc: '', sopRtCcFiledOn: '', sopRejCcFiledOn: '',
    sopAppAct: 'no', sopDofApp: '', sopRepAppFiledOn: '',
    sopAppAct16: 'no', sopDofApp16: '', sopRepAppFiledOn16: '',
    sopRemarks: '',
  });

  const [miscEntries, setMiscEntries] = useState<Array<{ id: string; details: string; date: string; filedBy: string }>>([]);
  const [showMiscModal, setShowMiscModal] = useState(false);
  const [miscForm, setMiscForm] = useState({ details: '', date: '', filedBy: '' });

  const handleChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Status of pleadings saved successfully!');
  };

  const handleAddMisc = (e: React.FormEvent) => {
    e.preventDefault();
    setMiscEntries(prev => [...prev, { ...miscForm, id: `misc-${Date.now()}` }]);
    setShowMiscModal(false); setMiscForm({ details: '', date: '', filedBy: '' });
  };

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected. Go to Allotted Case first.</div>;

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      <div className="bg-white rounded-lg shadow">
        <ul className="flex border-b">
          <li>
            <button onClick={() => setActiveTab('sop')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'sop' ? 'border-b-2 border-[#3c8dbc] text-[#3c8dbc]' : 'text-gray-500 hover:text-gray-700'}`}>
              Status of Pleadings
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('misc')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'misc' ? 'border-b-2 border-[#3c8dbc] text-[#3c8dbc]' : 'text-gray-500 hover:text-gray-700'}`}>
              Miscellaneous
            </button>
          </li>
        </ul>

        <div className="p-6">
          {activeTab === 'sop' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Pleading Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'claimInvitedOn', label: 'Claim Invited On' },
                    { key: 'remToClaim', label: 'Reminder to Claim' },
                    { key: 'claimFiledOn', label: 'Claim Filed On' },
                    { key: 'resServedOn', label: 'Respondent Served On' },
                    { key: 'sodFiledOn', label: 'Statement of Defence Filed On' },
                    { key: 'sopRejoinSodFiledOn', label: 'Rejoinder to SOD Filed On' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input type="date" value={formData[f.key as keyof typeof formData]} onChange={(e) => handleChange(f.key, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Counter Claim</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Counter Claim</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-1"><input type="radio" name="counterClaim" value="yes" checked={formData.counterClaim === 'yes'} onChange={(e) => handleChange('counterClaim', e.target.value)} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="counterClaim" value="no" checked={formData.counterClaim === 'no'} onChange={(e) => handleChange('counterClaim', e.target.value)} /> No</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Filing Counter Claim</label>
                    <input type="date" value={formData.sopDofCc} onChange={(e) => handleChange('sopDofCc', e.target.value)} disabled={formData.counterClaim === 'no'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reply to Counter Claim Filed On</label>
                    <input type="date" value={formData.sopRtCcFiledOn} onChange={(e) => handleChange('sopRtCcFiledOn', e.target.value)} disabled={formData.counterClaim === 'no'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rejoinder to Reply of CC Filed On</label>
                    <input type="date" value={formData.sopRejCcFiledOn} onChange={(e) => handleChange('sopRejCcFiledOn', e.target.value)} disabled={formData.counterClaim === 'no'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Application under Section 17 of A&C Act</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application under Section 17</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-1"><input type="radio" name="sopAppAct" value="yes" checked={formData.sopAppAct === 'yes'} onChange={(e) => handleChange('sopAppAct', e.target.value)} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="sopAppAct" value="no" checked={formData.sopAppAct === 'no'} onChange={(e) => handleChange('sopAppAct', e.target.value)} /> No</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Filing</label>
                    <input type="date" value={formData.sopDofApp} onChange={(e) => handleChange('sopDofApp', e.target.value)} disabled={formData.sopAppAct === 'no'} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Decision</label>
                    <input type="date" value={formData.sopRepAppFiledOn} onChange={(e) => handleChange('sopRepAppFiledOn', e.target.value)} disabled={formData.sopAppAct === 'no'} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Application under Section 16 of A&C Act</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application under Section 16</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-1"><input type="radio" name="sopAppAct16" value="yes" checked={formData.sopAppAct16 === 'yes'} onChange={(e) => handleChange('sopAppAct16', e.target.value)} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="sopAppAct16" value="no" checked={formData.sopAppAct16 === 'no'} onChange={(e) => handleChange('sopAppAct16', e.target.value)} /> No</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Filing</label>
                    <input type="date" value={formData.sopDofApp16} onChange={(e) => handleChange('sopDofApp16', e.target.value)} disabled={formData.sopAppAct16 === 'no'} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Decision</label>
                    <input type="date" value={formData.sopRepAppFiledOn16} onChange={(e) => handleChange('sopRepAppFiledOn16', e.target.value)} disabled={formData.sopAppAct16 === 'no'} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none disabled:bg-gray-100" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea value={formData.sopRemarks} onChange={(e) => handleChange('sopRemarks', e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" />
              </div>

              <div className="flex justify-center gap-4">
                <button type="reset" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">Reset</button>
                <button type="submit" className="px-6 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg">Save Details</button>
              </div>
            </form>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Miscellaneous Entries</h3>
                <button onClick={() => setShowMiscModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg text-sm">
                  + Add Entry
                </button>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Details</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Date of Filing</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Filed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {miscEntries.map((entry, i) => (
                    <tr key={entry.id}>
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{entry.details}</td>
                      <td className="px-4 py-3">{entry.date}</td>
                      <td className="px-4 py-3">{entry.filedBy}</td>
                    </tr>
                  ))}
                  {miscEntries.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No miscellaneous entries</td></tr>}
                </tbody>
              </table>

              {showMiscModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg w-full max-w-lg">
                    <div className="px-6 py-4 border-b flex justify-between items-center">
                      <h3 className="font-semibold">Add Miscellaneous Entry</h3>
                      <button onClick={() => setShowMiscModal(false)} className="text-gray-500">×</button>
                    </div>
                    <form onSubmit={handleAddMisc} className="p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                        <textarea value={miscForm.details} onChange={(e) => setMiscForm({ ...miscForm, details: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Filing</label>
                          <input type="date" value={miscForm.date} onChange={(e) => setMiscForm({ ...miscForm, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Filed By</label>
                          <input type="text" value={miscForm.filedBy} onChange={(e) => setMiscForm({ ...miscForm, filedBy: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowMiscModal(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#3c8dbc] text-white rounded-lg">Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CaseDetailLayout>
  );
}
