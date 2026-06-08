import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';

export default function TerminationPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];
  const [formData, setFormData] = useState({
    terminationBy: '', date: '', nature: '', details: '',
    dateOfCommunication: '', dateOfCompliance: '', referenceToFile: '',
    factsheet: 'no', notes: '',
  });

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected.</div>;

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Termination</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Termination saved!'); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Termination By</label>
              <select value={formData.terminationBy} onChange={(e) => setFormData({ ...formData, terminationBy: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none">
                <option value="">Select</option>
                <option>By Award</option><option>By Settlement</option><option>By Withdrawal</option><option>By Agreement</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Termination</label>
              <select value={formData.nature} onChange={(e) => setFormData({ ...formData, nature: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none">
                <option value="">Select</option>
                <option>Final Award</option><option>Partial Award</option><option>Consent Award</option>
              </select>
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Details / Remarks</label><textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Communication</label><input type="date" value={formData.dateOfCommunication} onChange={(e) => setFormData({ ...formData, dateOfCommunication: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Compliance</label><input type="date" value={formData.dateOfCompliance} onChange={(e) => setFormData({ ...formData, dateOfCompliance: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Document</label><input type="file" className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Reference to File</label><input type="text" value={formData.referenceToFile} onChange={(e) => setFormData({ ...formData, referenceToFile: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Factsheet</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1"><input type="radio" name="factsheet" value="yes" checked={formData.factsheet === 'yes'} onChange={(e) => setFormData({ ...formData, factsheet: e.target.value })} /> Yes</label>
                <label className="flex items-center gap-1"><input type="radio" name="factsheet" value="no" checked={formData.factsheet === 'no'} onChange={(e) => setFormData({ ...formData, factsheet: e.target.value })} /> No</label>
              </div>
            </div>
            {formData.factsheet === 'yes' && <div><label className="block text-sm font-medium text-gray-700 mb-1">Factsheet Document</label><input type="file" className="w-full px-3 py-2 border rounded-lg" /></div>}
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
          <div className="flex justify-center">
            <button type="submit" className="px-6 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg">Save Termination</button>
          </div>
        </form>
      </div>
    </CaseDetailLayout>
  );
}
