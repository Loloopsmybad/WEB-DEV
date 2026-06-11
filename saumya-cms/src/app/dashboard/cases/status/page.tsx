"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { Send, RotateCcw } from "lucide-react";

interface Case {
  id: string;
  diac_registration_no: string;
  case_title: string;
  mode_of_reference: string;
  date_of_registration: string;
  case_hearing: string;
  case_status: string;
  arbitrator_name: string;
  status_change_date: string;
  last_noting: string;
}

interface PleadingData {
  id?: string;
  case_id: string;
  claim_invited_on: string;
  reminder_to_claim: string;
  claim_filed_on: string;
  respondent_served_on: string;
  statement_of_defence_filed_on: string;
  rejoinder_to_sod_filed_on: string;
  counter_claim: string;
  counter_claim_filed_on: string;
  reply_to_counter_claim_filed_on: string;
  rejoinder_to_reply_counter_claim_filed_on: string;
  application_under_section_17: string;
  section_17_filing_date: string;
  section_17_decision_date: string;
  application_under_section_16: string;
  section_16_filing_date: string;
  section_16_decision_date: string;
  remarks: string;
}

const emptyPleading: PleadingData = {
  case_id: "",
  claim_invited_on: "",
  reminder_to_claim: "",
  claim_filed_on: "",
  respondent_served_on: "",
  statement_of_defence_filed_on: "",
  rejoinder_to_sod_filed_on: "",
  counter_claim: "",
  counter_claim_filed_on: "",
  reply_to_counter_claim_filed_on: "",
  rejoinder_to_reply_counter_claim_filed_on: "",
  application_under_section_17: "",
  section_17_filing_date: "",
  section_17_decision_date: "",
  application_under_section_16: "",
  section_16_filing_date: "",
  section_16_decision_date: "",
  remarks: "",
};

export default function StatusOfPleadingsPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pleading, setPleading] = useState<PleadingData>({ ...emptyPleading });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("cases").select("*");
    if (data) setCases(data);
    setLoading(false);
  };

  const handleProceed = async () => {
    const found = cases.find((c) => c.id === selectedCaseId);
    if (!found) return;

    setSelectedCase(found);

    // Fetch existing pleading data for this case
    const supabase = createClient();
    const { data } = await supabase
      .from("status_of_pleadings")
      .select("*")
      .eq("case_id", found.id)
      .single();

    if (data) {
      setPleading({
        ...emptyPleading,
        ...data,
        claim_invited_on: data.claim_invited_on || "",
        reminder_to_claim: data.reminder_to_claim || "",
        claim_filed_on: data.claim_filed_on || "",
        respondent_served_on: data.respondent_served_on || "",
        statement_of_defence_filed_on: data.statement_of_defence_filed_on || "",
        rejoinder_to_sod_filed_on: data.rejoinder_to_sod_filed_on || "",
        counter_claim_filed_on: data.counter_claim_filed_on || "",
        reply_to_counter_claim_filed_on: data.reply_to_counter_claim_filed_on || "",
        rejoinder_to_reply_counter_claim_filed_on: data.rejoinder_to_reply_counter_claim_filed_on || "",
        section_17_filing_date: data.section_17_filing_date || "",
        section_17_decision_date: data.section_17_decision_date || "",
        section_16_filing_date: data.section_16_filing_date || "",
        section_16_decision_date: data.section_16_decision_date || "",
      });
    } else {
      setPleading({ ...emptyPleading, case_id: found.id });
    }
  };

  const updateField = (field: keyof PleadingData, value: string) => {
    setPleading((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setPleading({ ...emptyPleading, case_id: selectedCase?.id || "" });
  };

  const handleSave = async () => {
    if (!selectedCase) return;
    setSaving(true);
    const supabase = createClient();

    const payload = {
      case_id: selectedCase.id,
      claim_invited_on: pleading.claim_invited_on || null,
      reminder_to_claim: pleading.reminder_to_claim || null,
      claim_filed_on: pleading.claim_filed_on || null,
      respondent_served_on: pleading.respondent_served_on || null,
      statement_of_defence_filed_on: pleading.statement_of_defence_filed_on || null,
      rejoinder_to_sod_filed_on: pleading.rejoinder_to_sod_filed_on || null,
      counter_claim: pleading.counter_claim || null,
      counter_claim_filed_on: pleading.counter_claim_filed_on || null,
      reply_to_counter_claim_filed_on: pleading.reply_to_counter_claim_filed_on || null,
      rejoinder_to_reply_counter_claim_filed_on: pleading.rejoinder_to_reply_counter_claim_filed_on || null,
      application_under_section_17: pleading.application_under_section_17 || null,
      section_17_filing_date: pleading.section_17_filing_date || null,
      section_17_decision_date: pleading.section_17_decision_date || null,
      application_under_section_16: pleading.application_under_section_16 || null,
      section_16_filing_date: pleading.section_16_filing_date || null,
      section_16_decision_date: pleading.section_16_decision_date || null,
      remarks: pleading.remarks || null,
    };

    if (pleading.id) {
      // Update existing record
      const { error } = await supabase
        .from("status_of_pleadings")
        .update(payload)
        .eq("id", pleading.id);

      if (error) {
        alert("Error saving: " + error.message);
      } else {
        alert("Details saved successfully!");
      }
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from("status_of_pleadings")
        .insert(payload)
        .select()
        .single();

      if (error) {
        alert("Error saving: " + error.message);
      } else {
        setPleading((prev) => ({ ...prev, id: data.id }));
        alert("Details saved successfully!");
      }
    }
    setSaving(false);
  };

  // Step 1: Case selection
  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[1400px] mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Status Of Pleadings</h1>
            <Link
              href="/dashboard"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm flex items-center gap-2 shadow-sm"
            >
              <span>&laquo;</span> Go Back
            </Link>
          </div>

          <div className="bg-white rounded shadow-sm p-6 max-w-2xl mx-auto mt-8">
            <p className="text-sm text-gray-700 mb-4">
              Select DIAC Registration No. to proceed to Status Of Pleadings:
            </p>
            <div className="flex gap-3">
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">DIAC Reg. No./Case Title</option>
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.diac_registration_no} - {c.case_title}
                  </option>
                ))}
              </select>
              <button
                onClick={handleProceed}
                disabled={!selectedCaseId}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-6 py-2 rounded text-sm font-medium flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Full Status of Pleadings form
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1400px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Status Of Pleadings : {selectedCase.diac_registration_no} ({selectedCase.case_title})
          </h1>
          <Link
            href="/dashboard/cases/status"
            onClick={() => { setSelectedCase(null); setPleading({ ...emptyPleading }); }}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <span>&laquo;</span> Go Back
          </Link>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Alloted Case", "Status of Pleadings", "Claimant & Respondent",
            "Counsels", "Arbitral Tribunal", "Noting", "Fees Details",
            "Case Files", "Case Orders", "Case Fee", "Termination",
            "View Case", "Draft Letters", "Case eFiles", "Fee Pending Cases"
          ].map((btn) => (
            <button
              key={btn}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1"
            >
              <Send className="w-3 h-3" /> {btn}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-t">
            Status of Pleadings
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Miscellaneous
          </button>
        </div>

        {/* Status of Pleadings Form */}
        <div className="space-y-4">
          {/* Main Pleadings Section */}
          <div className="bg-white rounded shadow-sm border-t-2 border-orange-400 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim Invited On:</label>
                <input type="date" value={pleading.claim_invited_on} onChange={(e) => updateField("claim_invited_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder to claim:</label>
                <input type="date" value={pleading.reminder_to_claim} onChange={(e) => updateField("reminder_to_claim", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Claim filed On:</label>
                <input type="date" value={pleading.claim_filed_on} onChange={(e) => updateField("claim_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Respondent served on:</label>
                <input type="date" value={pleading.respondent_served_on} onChange={(e) => updateField("respondent_served_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statement of defence filed on:</label>
                <input type="date" value={pleading.statement_of_defence_filed_on} onChange={(e) => updateField("statement_of_defence_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rejoinder to Statement of Defence filed on:</label>
                <input type="date" value={pleading.rejoinder_to_sod_filed_on} onChange={(e) => updateField("rejoinder_to_sod_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Counter Claim Section */}
          <div className="bg-white rounded shadow-sm border-t-2 border-orange-400 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-500">&#9658;</span> Counter Claim
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Counter Claim:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="counterClaim" value="yes" checked={pleading.counter_claim === "yes"}
                      onChange={(e) => updateField("counter_claim", e.target.value)} className="rounded" /> Yes
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="counterClaim" value="no" checked={pleading.counter_claim === "no"}
                      onChange={(e) => updateField("counter_claim", e.target.value)} className="rounded" /> No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of filing of Counter Claim:</label>
                <input type="date" value={pleading.counter_claim_filed_on} onChange={(e) => updateField("counter_claim_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reply to Counter Claim filed on:</label>
                <input type="date" value={pleading.reply_to_counter_claim_filed_on} onChange={(e) => updateField("reply_to_counter_claim_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rejoinder to Reply of Counter Claim filed on:</label>
                <input type="date" value={pleading.rejoinder_to_reply_counter_claim_filed_on} onChange={(e) => updateField("rejoinder_to_reply_counter_claim_filed_on", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Application under Section 17 */}
          <div className="bg-white rounded shadow-sm border-t-2 border-orange-400 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-500">&#9658;</span> Application under Section 17 of A&C Act
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application under Section 17 of A&C Act:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="section17" value="yes" checked={pleading.application_under_section_17 === "yes"}
                      onChange={(e) => updateField("application_under_section_17", e.target.value)} className="rounded" /> Yes
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="section17" value="no" checked={pleading.application_under_section_17 === "no"}
                      onChange={(e) => updateField("application_under_section_17", e.target.value)} className="rounded" /> No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of filing of Application:</label>
                <input type="date" value={pleading.section_17_filing_date} onChange={(e) => updateField("section_17_filing_date", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Decision:</label>
                <input type="date" value={pleading.section_17_decision_date} onChange={(e) => updateField("section_17_decision_date", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Application under Section 16 */}
          <div className="bg-white rounded shadow-sm border-t-2 border-orange-400 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-orange-500">&#9658;</span> Application under Section 16 of A&C Act
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application under Section 16 of A&C Act:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="section16" value="yes" checked={pleading.application_under_section_16 === "yes"}
                      onChange={(e) => updateField("application_under_section_16", e.target.value)} className="rounded" /> Yes
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="section16" value="no" checked={pleading.application_under_section_16 === "no"}
                      onChange={(e) => updateField("application_under_section_16", e.target.value)} className="rounded" /> No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of filing of Application:</label>
                <input type="date" value={pleading.section_16_filing_date} onChange={(e) => updateField("section_16_filing_date", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Decision:</label>
                <input type="date" value={pleading.section_16_decision_date} onChange={(e) => updateField("section_16_decision_date", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="bg-white rounded shadow-sm border-t-2 border-orange-400 p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Remarks:</h3>
            <textarea
              value={pleading.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pb-6">
            <button
              onClick={handleReset}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-2 rounded text-sm font-medium flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> {saving ? "Saving..." : "Save Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
