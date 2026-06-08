import { useState } from 'react';
import { Plus, Edit, Search, Trash2 } from 'lucide-react';
import { getCases } from '../store/dataStore';

interface EfilingUser {
  id: string;
  name: string;
  email: string;
  caseId: string;
  role: string;
}

const seedUsers: EfilingUser[] = [
  { id: 'e1', name: 'John Doe', email: 'john@example.com', caseId: 'case-1', role: 'Filer' },
  { id: 'e2', name: 'Jane Smith', email: 'jane@example.com', caseId: 'case-2', role: 'Viewer' },
];

export default function EfilingUsersPage() {
  const cases = getCases();
  const [users, setUsers] = useState<EfilingUser[]>(seedUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EfilingUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    caseId: '',
    role: 'Filer',
  });

  const filteredUsers = users.filter(u =>
    !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      setUsers(prev => [...prev, { ...formData, id: `e-${Date.now()}` }]);
    }
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', caseId: '', role: 'Filer' });
  };

  const handleEdit = (user: EfilingUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      caseId: user.caseId,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">eFiling Users</h1>
        <p className="text-gray-500">Manage users with e-filing access</p>
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
            onClick={() => { setEditingUser(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
          >
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">S.No</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Case</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const assignedCase = cases.find(c => c.id === user.caseId);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      {assignedCase ? `${assignedCase.caseNoPrefix}/${assignedCase.caseNo}/${assignedCase.caseNoYear}` : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-[#3c8dbc] hover:text-[#367fa9]"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No users found
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
              <h3 className="text-lg font-semibold">{editingUser ? 'Edit' : 'Add'} User</h3>
              <button onClick={() => { setShowModal(false); setEditingUser(null); }} className="text-gray-500 hover:text-gray-700">×</button>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Case</label>
                <select
                  value={formData.caseId}
                  onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  required
                >
                  <option value="">Select Case</option>
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.caseNoPrefix}/{c.caseNo}/{c.caseNoYear}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                >
                  <option value="Filer">Filer</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingUser(null); }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
                >
                  {editingUser ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
