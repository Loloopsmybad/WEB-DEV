import { useState } from 'react';
import { Plus, Edit, Search } from 'lucide-react';

interface Arbitrator {
  id: string;
  name: string;
  category: string;
  email: string;
  contact: string;
  isEmpanelled: boolean;
  dob: string;
  address: string;
}

const CATEGORIES = [
  'Former Chief Justice of India',
  'Former Supreme Court Judge',
  'Former High Court Judge',
  'Senior Advocate',
  'Chartered Accountant',
  'Engineer',
  'Architect',
  'Professor',
  'International Arbitrator',
  'Professional',
];

const seedArbitrators: Arbitrator[] = [
  { id: 'a1', name: 'Justice Ramesh Kumar', category: 'Former High Court Judge', email: 'ramesh@example.com', contact: '9876543210', isEmpanelled: true, dob: '1955-03-15', address: 'New Delhi' },
  { id: 'a2', name: 'Dr. Amit Verma', category: 'Professor', email: 'amit@example.com', contact: '9876543211', isEmpanelled: true, dob: '1960-07-22', address: 'Mumbai' },
  { id: 'a3', name: 'Mr. Rajesh Sharma', category: 'Senior Advocate', email: 'rajesh@example.com', contact: '9876543212', isEmpanelled: false, dob: '1965-11-08', address: 'Delhi' },
];

export default function ArbitratorSetupPage() {
  const [arbitrators, setArbitrators] = useState<Arbitrator[]>(seedArbitrators);
  const [activeTab, setActiveTab] = useState<'empanelled' | 'not-empanelled'>('empanelled');
  const [showModal, setShowModal] = useState(false);
  const [editingArbitrator, setEditingArbitrator] = useState<Arbitrator | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    email: '',
    contact: '',
    isEmpanelled: true,
    dob: '',
    address: '',
  });

  const filteredArbitrators = arbitrators.filter(a => {
    const matchesTab = activeTab === 'empanelled' ? a.isEmpanelled : !a.isEmpanelled;
    const matchesSearch = !searchTerm || a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArbitrator) {
      setArbitrators(prev => prev.map(a => a.id === editingArbitrator.id ? { ...a, ...formData } : a));
    } else {
      setArbitrators(prev => [...prev, { ...formData, id: `a-${Date.now()}` }]);
    }
    setShowModal(false);
    setEditingArbitrator(null);
    setFormData({ name: '', category: '', email: '', contact: '', isEmpanelled: true, dob: '', address: '' });
  };

  const handleEdit = (arbitrator: Arbitrator) => {
    setEditingArbitrator(arbitrator);
    setFormData({
      name: arbitrator.name,
      category: arbitrator.category,
      email: arbitrator.email,
      contact: arbitrator.contact,
      isEmpanelled: arbitrator.isEmpanelled,
      dob: arbitrator.dob,
      address: arbitrator.address,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Empanelled Arbitrator Setup</h1>
        <p className="text-gray-500">Manage empanelled and non-empanelled arbitrators</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('empanelled')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'empanelled' ? 'bg-[#3c8dbc] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Empanelled Arbitrators
        </button>
        <button
          onClick={() => setActiveTab('not-empanelled')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'not-empanelled' ? 'bg-[#3c8dbc] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Not Empanelled Arbitrators
        </button>
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
            onClick={() => { setEditingArbitrator(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
          >
            <Plus size={18} /> Add Arbitrator
          </button>
        </div>
      </div>

      {/* Arbitrators Table */}
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
              {filteredArbitrators.map((arbitrator, index) => (
                <tr key={arbitrator.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{arbitrator.name}</td>
                  <td className="px-4 py-3">{arbitrator.category}</td>
                  <td className="px-4 py-3">{arbitrator.email}</td>
                  <td className="px-4 py-3">{arbitrator.contact}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(arbitrator)}
                      className="text-[#3c8dbc] hover:text-[#367fa9]"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredArbitrators.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No arbitrators found
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
          <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editingArbitrator ? 'Edit' : 'Add'} Arbitrator</h3>
              <button onClick={() => { setShowModal(false); setEditingArbitrator(null); }} className="text-gray-500 hover:text-gray-700">×</button>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isEmpanelled"
                  checked={formData.isEmpanelled}
                  onChange={(e) => setFormData({ ...formData, isEmpanelled: e.target.checked })}
                  className="rounded border-gray-300 text-[#3c8dbc] focus:ring-[#3c8dbc]"
                />
                <label htmlFor="isEmpanelled" className="text-sm font-medium text-gray-700">Empanelled</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingArbitrator(null); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
                >
                  {editingArbitrator ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
