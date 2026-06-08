import { useState } from 'react';
import { Plus, Edit, Search, Trash2 } from 'lucide-react';

interface PinkListEntry {
  id: string;
  name: string;
  category: string;
  specialization: string;
  experience: string;
  contact: string;
  email: string;
}

const seedEntries: PinkListEntry[] = [
  { id: 'p1', name: 'Justice Ramesh Kumar', category: 'Former HC Judge', specialization: 'Commercial Disputes', experience: '25+ years', contact: '9876543210', email: 'ramesh@example.com' },
  { id: 'p2', name: 'Dr. Amit Verma', category: 'Professor', specialization: 'Infrastructure', experience: '20+ years', contact: '9876543211', email: 'amit@example.com' },
  { id: 'p3', name: 'Ms. Priya Sharma', category: 'Senior Advocate', specialization: 'Construction', experience: '18+ years', contact: '9876543212', email: 'priya@example.com' },
];

export default function ShortPinkListPage() {
  const [entries, setEntries] = useState<PinkListEntry[]>(seedEntries);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PinkListEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', category: '', specialization: '', experience: '', contact: '', email: '' });

  const filtered = entries.filter(e => !searchTerm || e.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setEntries(prev => prev.map(x => x.id === editing.id ? { ...x, ...formData } : x));
    } else {
      setEntries(prev => [...prev, { ...formData, id: `p-${Date.now()}` }]);
    }
    setShowModal(false); setEditing(null); setFormData({ name: '', category: '', specialization: '', experience: '', contact: '', email: '' });
  };

  const handleEdit = (entry: PinkListEntry) => { setEditing(entry); setFormData(entry); setShowModal(true); };
  const handleDelete = (id: string) => { setEntries(prev => prev.filter(x => x.id !== id)); };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Short Pink List</h1>
        <p className="text-gray-500">Shortlisted arbitrators and counsels</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" />
          </div>
          <button onClick={() => { setEditing(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg"><Plus size={18} /> Add Entry</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Specialization</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Experience</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((entry, i) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{entry.name}</td>
                  <td className="px-4 py-3">{entry.category}</td>
                  <td className="px-4 py-3">{entry.specialization}</td>
                  <td className="px-4 py-3">{entry.experience}</td>
                  <td className="px-4 py-3">{entry.contact}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(entry)} className="text-[#3c8dbc]"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(entry.id)} className="text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{editing ? 'Edit' : 'Add'} Entry</h3>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {['name', 'category', 'specialization', 'experience', 'contact', 'email'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
                  <input type={field === 'email' ? 'email' : 'text'} value={formData[field as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none" required />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#3c8dbc] text-white rounded-lg">{editing ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
