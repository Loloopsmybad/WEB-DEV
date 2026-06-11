"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Trash2, Eye, Plus, X } from "lucide-react";

interface Case {
  id: string;
  diac_registration_no: string;
  case_title: string;
}

interface TagRecord {
  id: string;
  master_case_id: string;
  tagged_case_id: string;
  tagged_by: string | null;
  created_at: string;
  master?: Case;
  tagged?: Case;
  creator?: { email: string; display_name: string };
}

export default function TagCasesPage() {
  const [records, setRecords] = useState<TagRecord[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [masterId, setMasterId] = useState("");
  const [taggedIds, setTaggedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();
    setLoading(true);

    const [casesRes, tagsRes] = await Promise.all([
      supabase.from("cases").select("id, diac_registration_no, case_title"),
      supabase.from("case_tags").select("*").order("created_at", { ascending: false })
    ]);

    const casesList = casesRes.data || [];
    setCases(casesList);

    if (tagsRes.data) {
      const enriched = tagsRes.data.map(tag => ({
        ...tag,
        master: casesList.find(c => c.id === tag.master_case_id),
        tagged: casesList.find(c => c.id === tag.tagged_case_id),
      }));
      setRecords(enriched);
    }

    setLoading(false);
  };

  const handleCreate = async () => {
    if (!masterId || taggedIds.length === 0) return;
    setSaving(true);
    const supabase = createClient();

    const newTags = taggedIds.map(taggedId => ({
      master_case_id: masterId,
      tagged_case_id: taggedId,
    }));

    const { error } = await supabase.from("case_tags").insert(newTags);

    if (!error) {
      setShowModal(false);
      setMasterId("");
      setTaggedIds([]);
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this tag?")) return;
    const supabase = createClient();
    await supabase.from("case_tags").delete().eq("id", id);
    fetchData();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1400px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Tag Cases</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Tag
          </button>
        </div>

        {/* Entries per page */}
        <div className="bg-white rounded shadow-sm p-3 mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow-sm overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ width: "5%" }}>S. No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Master Case</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Tagged Cases</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Created By</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Created At</th>
                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ width: "8%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">Loading...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">No tag records found</td>
                </tr>
              ) : (
                records.slice(0, entriesPerPage).map((r, i) => (
                  <tr key={r.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}>
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-blue-600 font-medium">{r.master?.diac_registration_no || "-"}</span>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{r.master?.case_title || ""}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-blue-600 font-medium">{r.tagged?.diac_registration_no || "-"}</span>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{r.tagged?.case_title || ""}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.creator?.display_name || r.creator?.email || "-"}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded"
                        title="Remove Tag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-sm text-gray-500">
          Showing {Math.min(entriesPerPage, records.length)} of {records.length} entries
        </div>
      </div>

      {/* Add Tag Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Add Tag</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Master Case:</label>
                <select
                  value={masterId}
                  onChange={(e) => setMasterId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Master Case</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.diac_registration_no} — {c.case_title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagged Cases:</label>
                <select
                  multiple
                  value={taggedIds}
                  onChange={(e) => setTaggedIds(Array.from(e.target.selectedOptions, o => o.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-40"
                >
                  {cases.filter(c => c.id !== masterId).map((c) => (
                    <option key={c.id} value={c.id}>{c.diac_registration_no} — {c.case_title}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple cases</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!masterId || taggedIds.length === 0 || saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded text-sm font-medium"
              >
                {saving ? "Saving..." : "Add Tag"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
