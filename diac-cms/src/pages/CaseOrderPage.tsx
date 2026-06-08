import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCases } from '../store/dataStore';
import CaseDetailLayout from '../components/CaseDetailLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CaseOrder { id: string; orderDate: string; docType: string; details: string; uploadedBy: string; }

export default function CaseOrderPage() {
  const { caseId } = useParams();
  const cases = getCases();
  const selectedCase = cases.find(c => c.id === caseId) || cases[0];
  const [orders, setOrders] = useState<CaseOrder[]>([
    { id: 'o1', orderDate: '2025-06-01', docType: 'Procedural Order', details: 'Initial procedural order', uploadedBy: 'ADMIN' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CaseOrder | null>(null);
  const [formData, setFormData] = useState({ orderDate: '', docType: 'Procedural Order', details: '', uploadedBy: 'ADMIN' });

  if (!selectedCase) return <div className="p-6 text-gray-500">No case selected.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) { setOrders(prev => prev.map(o => o.id === editing.id ? { ...o, ...formData } : o)); }
    else { setOrders(prev => [...prev, { ...formData, id: `o-${Date.now()}` }]); }
    setShowModal(false); setEditing(null); setFormData({ orderDate: '', docType: 'Procedural Order', details: '', uploadedBy: 'ADMIN' });
  };

  return (
    <CaseDetailLayout caseId={selectedCase.id} caseNo={`${selectedCase.caseNoPrefix}/${selectedCase.caseNo}/${selectedCase.caseNoYear}`} caseTitle={selectedCase.caseTitle}>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Case Orders</h3>
          <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg text-sm"><Plus size={16} /> Add Case Order</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Order Given On</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Doc Type</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Details</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Uploaded By</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((o, i) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{o.orderDate}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">{o.docType}</span></td>
                <td className="px-4 py-3">{o.details}</td>
                <td className="px-4 py-3">{o.uploadedBy}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => { setEditing(o); setFormData(o); setShowModal(true); }} className="text-[#3c8dbc]"><Edit size={16} /></button>
                  <button onClick={() => setOrders(prev => prev.filter(x => x.id !== o.id))} className="text-red-500"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">{editing ? 'Edit' : 'Add'} Case Order</h3>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-500">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Order Given On</label><input type="date" value={formData.orderDate} onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Doc Type</label><select value={formData.docType} onChange={(e) => setFormData({ ...formData, docType: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"><option>Procedural Order</option><option>Order On Application</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Details</label><textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Order Document</label><input type="file" className="w-full px-3 py-2 border rounded-lg" /></div>
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
