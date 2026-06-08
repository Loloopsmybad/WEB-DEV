import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Party { id: string; name: string; number: string; email: string; phone: string; permanentAddress: string; correspondenceAddress: string; isCounterClaimant?: boolean; }

export default function ClaimantRespondentPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];
  const [activeTab, setActiveTab] = useState<'claimant' | 'respondent'>('claimant');
  const [claimants, setClaimants] = useState<Party[]>([
    { id: 'cl1', name: 'Claimant One', number: 'C-001', email: 'claimant1@example.com', phone: '9876543210', permanentAddress: 'New Delhi', correspondenceAddress: 'New Delhi' },
  ]);
  const [respondents, setRespondents] = useState<Party[]>([
    { id: 'r1', name: 'Respondent One', number: 'R-001', email: 'respondent1@example.com', phone: '9876543211', permanentAddress: 'Mumbai', correspondenceAddress: 'Mumbai', isCounterClaimant: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Party | null>(null);
  const [formData, setFormData] = useState({ name: '', number: '', email: '', phone: '', permanentAddress: '', correspondenceAddress: '' });

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected.</div>;

  const items = activeTab === 'claimant' ? claimants : respondents;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      const setter = activeTab === 'claimant' ? setClaimants : setRespondents;
      setter(prev => prev.map(p => p.id === editing.id ? { ...p, ...formData } : p));
    } else {
      const setter = activeTab === 'claimant' ? setClaimants : setRespondents;
      setter(prev => [...prev, { ...formData, id: `${activeTab[0]}-${Date.now()}` }]);
    }
    setShowModal(false); setEditing(null); setFormData({ name: '', number: '', email: '', phone: '', permanentAddress: '', correspondenceAddress: '' });
  };

  const handleEdit = (p: Party) => { setEditing(p); setFormData(p); setShowModal(true); };
  const handleDelete = (id: string) => {
    if (activeTab === 'claimant') setClaimants(prev => prev.filter(p => p.id !== id));
    else setRespondents(prev => prev.filter(p => p.id !== id));
  };

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button onClick={() => setActiveTab('claimant')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'claimant' ? 'border-b-2 border-[#3c8dbc] text-[#3c8dbc]' : 'text-gray-500'}`}>Claimant</button>
          <button onClick={() => setActiveTab('respondent')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'respondent' ? 'border-b-2 border-[#3c8dbc] text-[#3c8dbc]' : 'text-gray-500'}`}>Respondent</button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{activeTab === 'claimant' ? 'Claimants' : 'Respondents'}</h3>
            <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg text-sm"><Plus size={16} /> Add {activeTab === 'claimant' ? 'Claimant' : 'Respondent'}</button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Number</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Address</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{p.number}</td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">{p.phone}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{p.permanentAddress}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-[#3c8dbc]"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">{editing ? 'Edit' : 'Add'} {activeTab === 'claimant' ? 'Claimant' : 'Respondent'}</h3>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-500">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Number</label><input type="text" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label><input type="text" value={formData.permanentAddress} onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Correspondence Address</label><input type="text" value={formData.correspondenceAddress} onChange={(e) => setFormData({ ...formData, correspondenceAddress: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
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
