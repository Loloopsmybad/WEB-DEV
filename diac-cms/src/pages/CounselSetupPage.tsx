import { useState } from 'react';
import { Plus, Edit, Search } from 'lucide-react';

interface Counsel {
  id: string;
  name: string;
  email: string;
  contact: string;
  category: string;
}

const CATEGORIES = ['Senior Advocate', 'Advocate', 'Junior Advocate', 'Legal Consultant'];

const seedCounsels: Counsel[] = [
  { id: 'c1', name: 'Ms. Priya Sharma', email: 'priya@example.com', contact: '9876543220', category: 'Senior Advocate' },
  { id: 'c2', name: 'Mr. Arjun Mehta', email: 'arjun@example.com', contact: '9876543221', category: 'Advocate' },
  { id: 'c3', name: 'Ms. Neha Gupta', email: 'neha@example.com', contact: '9876543222', category: 'Junior Advocate' },
];

export default function CounselSetupPage() {
  const [counsels, setCounsels] = useState<Counsel[]>(seedCounsels);
  const [showModal, setShowModal] = useState(false);
  const [editingCounsel, setEditingCounsel] = useState<Counsel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    category: '',
  });

  const filteredCounsels = counsels.filter(c =>
    !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCounsel) {
      setCounsels(prev => prev.map(c => c.id === editingCounsel.id ? { ...c, ...formData } : c));
    } else {
      setCounsels(prev => [...prev, { ...formData, id: `c-${Date.now()}` }]);
    }
    setShowModal(false);
    setEditingCounsel(null);
    setFormData({ name: '', email: '', contact: '', category: '' });
  };

  const handleEdit = (counsel: Counsel) => {
    setEditingCounsel(counsel);
    setFormData({
      name: counsel.name,
      email: counsel.email,
      contact: counsel.contact,
      category: counsel.category,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Counsel Setup</h1>
        <p className="text-gray-500">Manage empanelled counsels</p>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
            />
          </div>
          <button
            onClick={() => { setEditingCounsel(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
          >
            <Plus size={18} /> Add Counsel
          </button>
        </div>
      </div>

      {/* Counsels Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCounsels.map((counsel, index) => (
                <tr key={counsel.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{counsel.name}</td>
                  <td className="px-4 py-3">{counsel.category}</td>
                  <td className="px-4 py-3">{counsel.email}</td>
                  <td className="px-4 py-3">{counsel.contact}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(counsel)}
                      className="text-[#3c8dbc] hover:text-[#367fa9]"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCounsels.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No counsels found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editingCounsel ? 'Edit' : 'Add'} Counsel</h3>
              <button onClick={() => { setShowModal(false); setEditingCounsel(null); }} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingCounsel(null); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
                >
                  {editingCounsel ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
