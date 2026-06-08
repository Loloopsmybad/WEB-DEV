import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CounselEntry { id: string; name: string; enrollmentNo: string; appearingFor: string; email: string; phone: string; }

export default function CounselsPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];
  const [counsels, setCounsels] = useState<CounselEntry[]>([
    { id: 'c1', name: 'Mr. Rajesh Mehta', enrollmentNo: 'D-3502A/2010', appearingFor: 'Claimant', email: 'rajesh@example.com', phone: '9876543210' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CounselEntry | null>(null);
  const [formData, setFormData] = useState({ name: '', enrollmentNo: '', appearingFor: 'Claimant', email: '', phone: '' });

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { setCounsels(prev => prev.map(c => c.id === editing.id ? { ...c, ...formData } : c)); }
    else { setCounsels(prev => [...prev, { ...formData, id: `c-${Date.now()}` }]); }
    setShowModal(false); setEditing(null); setFormData({ name: '', enrollmentNo: '', appearingFor: 'Claimant', email: '', phone: '' });
  };

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">All Counsels</h3>
          <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg text-sm"><Plus size={16} /> Add Counsel</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Enrollment No</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Appearing For</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {counsels.map((c, i) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.enrollmentNo}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{c.appearingFor}</span></td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => { setEditing(c); setFormData(c); setShowModal(true); }} className="text-[#3c8dbc]"><Edit size={16} /></button>
                  <button onClick={() => setCounsels(prev => prev.filter(x => x.id !== c.id))} className="text-red-500"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">{editing ? 'Edit' : 'Add'} Counsel</h3>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-500">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Counsel Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Enrollment No</label><input type="text" value={formData.enrollmentNo} onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appearing For</label>
                  <select value={formData.appearingFor} onChange={(e) => setFormData({ ...formData, appearingFor: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none">
                    <option>Claimant</option><option>Respondent</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#3c8dbc] text-white rounded-lg">{editing ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CaseDetailLayout>
  );
}
