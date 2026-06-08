import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCases, addCase, updateCase, deleteCase } from '../store/dataStore';
import type { Case } from '../types';
import { Search, Edit, Plus, Trash2, X } from 'lucide-react';

interface CaseSelectorPageProps {
  title: string;
  description: string;
  routePrefix?: string;
}

const emptyForm = {
  caseNo: '',
  caseNoPrefix: 'DIAC',
  caseNoYear: '',
  caseTitle: '',
  referenceNo: '',
  dateOfReference: '',
  modeOfReference: 'Direct' as Case['modeOfReference'],
  referredBy: '',
  dateOfRegistration: '',
  typeOfArbitration: 'Domestic' as Case['typeOfArbitration'],
  caseStatus: 'Pre-Hearing' as Case['caseStatus'],
  statusChangeDate: '',
  arbitratorName: '',
  arbitralTribunalStrength: 'Sole' as Case['arbitralTribunalStrength'],
  claimantName: '',
  respondentName: '',
};

export default function CaseSelectorPage({ title, description, routePrefix }: CaseSelectorPageProps) {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>(getCases);
  const [selectedCase, setSelectedCase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const refreshCases = () => setCases(getCases());

  const filteredCases = useMemo(() => {
    return cases.filter(c =>
      !searchTerm ||
      `${c.caseNoPrefix}/${c.caseNo}/${c.caseNoYear}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cases, searchTerm]);

  const selectedCaseData = cases.find(c => c.id === selectedCase);

  const openAddModal = () => {
    setEditingCase(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = () => {
    if (!selectedCaseData) return;
    setEditingCase(selectedCaseData);
    setFormData({
      caseNo: selectedCaseData.caseNo,
      caseNoPrefix: selectedCaseData.caseNoPrefix,
      caseNoYear: selectedCaseData.caseNoYear,
      caseTitle: selectedCaseData.caseTitle,
      referenceNo: selectedCaseData.referenceNo,
      dateOfReference: selectedCaseData.dateOfReference,
      modeOfReference: selectedCaseData.modeOfReference,
      referredBy: selectedCaseData.referredBy,
      dateOfRegistration: selectedCaseData.dateOfRegistration,
      typeOfArbitration: selectedCaseData.typeOfArbitration,
      caseStatus: selectedCaseData.caseStatus,
      statusChangeDate: selectedCaseData.statusChangeDate,
      arbitratorName: selectedCaseData.arbitratorName,
      arbitralTribunalStrength: selectedCaseData.arbitralTribunalStrength,
      claimantName: selectedCaseData.claimantName,
      respondentName: selectedCaseData.respondentName,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCase) {
      updateCase(editingCase.id, formData);
    } else {
      addCase({
        ...formData,
        counsels: [],
        arbitrators: [],
        orders: [],
        noting: [],
      });
    }
    refreshCases();
    setShowModal(false);
    setEditingCase(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this case?')) return;
    deleteCase(id);
    if (selectedCase === id) setSelectedCase('');
    refreshCases();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
        >
          <Plus size={18} /> Add New Case
        </button>
      </div>

      {/* Case Selector */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by case no or title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
            />
          </div>
          <select
            value={selectedCase}
            onChange={(e) => {
              setSelectedCase(e.target.value);
              if (routePrefix && e.target.value) {
                navigate(`/${routePrefix}/${e.target.value}`);
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
          >
            <option value="">Select DIAC Registration No.</option>
            {filteredCases.map(c => (
              <option key={c.id} value={c.id}>
                {c.caseNoPrefix}/{c.caseNo}/{c.caseNoYear} - {c.caseTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Case Details */}
      {selectedCaseData ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedCaseData.caseNoPrefix}/{selectedCaseData.caseNo}/{selectedCaseData.caseNoYear}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
              >
                <Plus size={16} /> Add New
              </button>
              <button
                onClick={openEditModal}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(selectedCaseData.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Case Title</p>
              <p className="font-medium">{selectedCaseData.caseTitle}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Reference No</p>
              <p className="font-medium">{selectedCaseData.referenceNo}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Claimant</p>
              <p className="font-medium">{selectedCaseData.claimantName}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Respondent</p>
              <p className="font-medium">{selectedCaseData.respondentName}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Arbitrator</p>
              <p className="font-medium">{selectedCaseData.arbitratorName}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Case Status</p>
              <p className="font-medium">{selectedCaseData.caseStatus}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Type of Arbitration</p>
              <p className="font-medium">{selectedCaseData.typeOfArbitration}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Mode of Reference</p>
              <p className="font-medium">{selectedCaseData.modeOfReference}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Referred By</p>
              <p className="font-medium">{selectedCaseData.referredBy}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Date of Registration</p>
              <p className="font-medium">{selectedCaseData.dateOfRegistration}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Tribunal Strength</p>
              <p className="font-medium">{selectedCaseData.arbitralTribunalStrength}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Status Changed</p>
              <p className="font-medium">{selectedCaseData.statusChangeDate}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <p>Select a case from the dropdown above or click "Add New Case" to create one</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editingCase ? 'Edit Case' : 'Add New Case'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case No Prefix</label>
                  <input
                    type="text"
                    value={formData.caseNoPrefix}
                    onChange={(e) => handleChange('caseNoPrefix', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                  <input
                    type="text"
                    value={formData.caseNo}
                    onChange={(e) => handleChange('caseNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year (MM-YY)</label>
                  <input
                    type="text"
                    value={formData.caseNoYear}
                    onChange={(e) => handleChange('caseNoYear', e.target.value)}
                    placeholder="01-25"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                <input
                  type="text"
                  value={formData.caseTitle}
                  onChange={(e) => handleChange('caseTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claimant Name</label>
                  <input
                    type="text"
                    value={formData.claimantName}
                    onChange={(e) => handleChange('claimantName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Respondent Name</label>
                  <input
                    type="text"
                    value={formData.respondentName}
                    onChange={(e) => handleChange('respondentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference No</label>
                  <input
                    type="text"
                    value={formData.referenceNo}
                    onChange={(e) => handleChange('referenceNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
                  <input
                    type="text"
                    value={formData.referredBy}
                    onChange={(e) => handleChange('referredBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Reference</label>
                  <input
                    type="date"
                    value={formData.dateOfReference}
                    onChange={(e) => handleChange('dateOfReference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Registration</label>
                  <input
                    type="date"
                    value={formData.dateOfRegistration}
                    onChange={(e) => handleChange('dateOfRegistration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Arbitration</label>
                  <select
                    value={formData.typeOfArbitration}
                    onChange={(e) => handleChange('typeOfArbitration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Reference</label>
                  <select
                    value={formData.modeOfReference}
                    onChange={(e) => handleChange('modeOfReference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  >
                    <option value="Direct">Direct</option>
                    <option value="Court">Court</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case Status</label>
                  <select
                    value={formData.caseStatus}
                    onChange={(e) => handleChange('caseStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  >
                    <option value="Pre-Hearing">Pre-Hearing</option>
                    <option value="Under Hearing">Under Hearing</option>
                    <option value="Award-Termination">Award-Termination</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arbitrator Name</label>
                  <input
                    type="text"
                    value={formData.arbitratorName}
                    onChange={(e) => handleChange('arbitratorName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tribunal Strength</label>
                  <select
                    value={formData.arbitralTribunalStrength}
                    onChange={(e) => handleChange('arbitralTribunalStrength', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] outline-none"
                  >
                    <option value="Sole">Sole</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded-lg transition-colors"
                >
                  {editingCase ? 'Update Case' : 'Add Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
