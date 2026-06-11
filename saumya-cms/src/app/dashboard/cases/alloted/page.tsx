"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { Search, RotateCcw, ChevronDown, X } from "lucide-react";

interface Case {
  id: string;
  diac_registration_no: string;
  case_title: string;
  date_of_reference_order: string;
  mode_of_reference: string;
  ref_received_on: string;
  date_of_registration: string;
  case_hearing: string;
  status_change_date: string;
  last_noting: string;
  arbitrator_name: string;
  award_date: string;
  case_status: string;
}

const minorCaseStatuses = [
  { value: "1001", label: "Declaration/Consent Invited" },
  { value: "1002", label: "Declaration/Consent Filed" },
  { value: "1003", label: "Referred to Mediation" },
  { value: "1004", label: "SOC Invited" },
  { value: "1005", label: "Reminder for SOC" },
  { value: "1006", label: "Second Reminder for SOC" },
  { value: "1007", label: "Fee demand letters issued" },
  { value: "1008", label: "Fee demand + quantification letter" },
  { value: "1009", label: "Reminder for Fees" },
  { value: "1010", label: "Second Reminder for Fees" },
  { value: "1011", label: "Fee reminder to Respondent" },
  { value: "1012", label: "Second Fee reminder to Respondent" },
  { value: "1013", label: "Reminder for quantification" },
  { value: "1014", label: "Second Reminder for quantification" },
  { value: "1015", label: "Matter closed before appointment (Administratively)" },
  { value: "1016", label: "Settled before appointment" },
  { value: "1017", label: "Withdrawn before appointment" },
  { value: "1018", label: "Ready for appointment" },
  { value: "1019", label: "Appointment note prepared" },
  { value: "1020", label: "Appointment note signed" },
  { value: "1021", label: "File sent for appointment" },
  { value: "1022", label: "File received after appointment" },
  { value: "1023", label: "Preliminary/First date of hearing fixed" },
  { value: "1024", label: "Service of Respondent" },
  { value: "1025", label: "Completion of Pleadings" },
  { value: "1026", label: "Arguments on Application u/s 16 or 17" },
  { value: "1027", label: "Issues framed" },
  { value: "1028", label: "Evidence (Claimant)" },
  { value: "1029", label: "Evidence (Respondent)" },
  { value: "1030", label: "Final Arguments" },
  { value: "1031", label: "Reserved for Award" },
  { value: "1032", label: "Referred to Mediation by Tribunal" },
  { value: "1033", label: "Reporting Settlement" },
  { value: "1034", label: "Proceedings Terminated" },
  { value: "1035", label: "Sine-die adjourned by the Tribunal" },
  { value: "1036", label: "On Merits" },
  { value: "1037", label: "Upon Settlement" },
  { value: "1038", label: "Upon Withdrawl" },
  { value: "1039", label: "Other" },
  { value: "1040", label: "Stay on proceedings" },
  { value: "1041", label: "Arguments on Misc. Application" },
  { value: "1042", label: "Ex-Parte Award" },
  { value: "1043", label: "Matter Closed Administratively" },
  { value: "1044", label: "Recusal" },
];

const labelStatuses = [
  { value: "1", label: "Sole Arbitrator" },
  { value: "2", label: "Three Arbitrators" },
  { value: "3", label: "Emergency arbitration" },
  { value: "4", label: "Domestic Arbitration" },
  { value: "5", label: "International Arbitration" },
  { value: "6", label: "Arbitrator to be appointed" },
  { value: "7", label: "Preliminary/first date of hearing" },
  { value: "8", label: "Calculation pending" },
  { value: "9", label: "Quantification pending – Claim/ Counterclaim" },
  { value: "10", label: "Separate Assessment- Fee demanded equally" },
  { value: "11", label: "Separate Assessment- Fee demanded separately" },
  { value: "12", label: "Aggregate Assessment" },
  { value: "13", label: "Deficiency" },
  { value: "14", label: "Deficiency" },
  { value: "15", label: "Fee release pending- Stage I" },
  { value: "16", label: "Fee release pending- Stage II" },
  { value: "17", label: "Fee release pending- Stage III" },
  { value: "18", label: "Fee release pending- Stage IV" },
  { value: "19", label: "Signed Order Awaited" },
  { value: "20", label: "Stage I fee released" },
  { value: "21", label: "Stage II fee released" },
  { value: "22", label: "Stage III fee released" },
  { value: "23", label: "Stage IV fee released" },
  { value: "54", label: "SOC Not Filed" },
  { value: "24", label: "SOC Filed" },
  { value: "25", label: "SOD Filed" },
  { value: "26", label: "Rejoinder Filed" },
  { value: "27", label: "Application u/s 16 or 17 as per A&C Act" },
  { value: "28", label: "Arguments on Misc Application" },
  { value: "29", label: "Issues framed" },
  { value: "30", label: "Claimant Evidence- commenced" },
  { value: "31", label: "Respondent Evidence- commenced" },
  { value: "32", label: "Evidence (Claimant)-concluded" },
  { value: "33", label: "Evidence (Respondent)-concluded" },
  { value: "34", label: "Final arguments- commenced" },
  { value: "35", label: "Final arguments- concluded" },
  { value: "36", label: "Award reserved" },
  { value: "37", label: "Matter closed administratively" },
  { value: "38", label: "Terminated" },
  { value: "39", label: "Award pronounced" },
  { value: "40", label: "Substitute Arbitrator – Appointment by DIAC" },
  { value: "41", label: "Substitute Arbitrator – Appointment by Court" },
  { value: "42", label: "Settlement award pronounced" },
  { value: "43", label: "Ex-parte Award pronounced" },
  { value: "44", label: "Sine-die adjourned" },
  { value: "45", label: "Stay on proceedings" },
  { value: "46", label: "Misc Direction (Addl. coordinator/Coordinator)" },
  { value: "47", label: "Note to be put up for Chairperson" },
  { value: "48", label: "Reference to Arb. by Court" },
  { value: "49", label: "Reference to Arb. by MSME" },
  { value: "50", label: "Reference to Arb. by Parties" },
  { value: "51", label: "Hearings listed Outside DIAC" },
  { value: "52", label: "Fee refund pending" },
  { value: "53", label: "Fee refunded" },
];

export default function AllotedCasePage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter states
  const [filterReg, setFilterReg] = useState("");
  const [filterCaseStatus, setFilterCaseStatus] = useState("");
  const [filterMinorStatus, setFilterMinorStatus] = useState("");
  const [filterArbitratorStatus, setFilterArbitratorStatus] = useState("");
  const [filterLabels, setFilterLabels] = useState<string[]>([]);
  const [filterCaseTitle, setFilterCaseTitle] = useState("");
  const [filterStatusFrom, setFilterStatusFrom] = useState("");
  const [filterStatusTo, setFilterStatusTo] = useState("");

  // Labels multi-select dropdown
  const [labelsOpen, setLabelsOpen] = useState(false);
  const [labelsSearch, setLabelsSearch] = useState("");
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (labelsRef.current && !labelsRef.current.contains(e.target as Node)) {
        setLabelsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCases = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("cases").select("*");
    if (data) {
      setCases(data);
      setFilteredCases(data);
    }
    setLoading(false);
  };

  const handleFilter = () => {
    let result = [...cases];
    if (filterReg) result = result.filter((c) => c.diac_registration_no === filterReg);
    if (filterCaseStatus) result = result.filter((c) => c.case_status === filterCaseStatus);
    if (filterCaseTitle) result = result.filter((c) => c.case_title.toLowerCase().includes(filterCaseTitle.toLowerCase()));
    if (filterStatusFrom) result = result.filter((c) => c.status_change_date >= filterStatusFrom);
    if (filterStatusTo) result = result.filter((c) => c.status_change_date <= filterStatusTo);
    setFilteredCases(result);
  };

  const handleReset = () => {
    setFilterReg("");
    setFilterCaseStatus("");
    setFilterMinorStatus("");
    setFilterArbitratorStatus("");
    setFilterLabels([]);
    setFilterCaseTitle("");
    setFilterStatusFrom("");
    setFilterStatusTo("");
    setFilteredCases(cases);
  };

  const toggleLabel = (val: string) => {
    setFilterLabels((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const filteredLabels = labelStatuses.filter((l) =>
    l.label.toLowerCase().includes(labelsSearch.toLowerCase())
  );

  const caseStatuses = [
    { value: "UNDER_PROCESS", label: "Pre-Hearing" },
    { value: "UNDER_HEARING", label: "Under Hearing" },
    { value: "AWARD_TERMINATION", label: "Award/Termination" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1500px] mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Allotted Case</h1>
          <Link
            href="/dashboard"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm flex items-center gap-2 shadow-sm"
          >
            <span>&laquo;</span> Go Back
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DIAC Registration No.:</label>
              <select
                value={filterReg}
                onChange={(e) => setFilterReg(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {cases.map((c) => (
                  <option key={c.id} value={c.diac_registration_no}>{c.diac_registration_no}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Status:</label>
              <select
                value={filterCaseStatus}
                onChange={(e) => setFilterCaseStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {caseStatuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minor Case Status:</label>
              <select
                value={filterMinorStatus}
                onChange={(e) => setFilterMinorStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select</option>
                {minorCaseStatuses.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arbitrator Status:</label>
              <select
                value={filterArbitratorStatus}
                onChange={(e) => setFilterArbitratorStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="1">Appointed</option>
                <option value="2">To be Appointed</option>
              </select>
            </div>

            {/* Row 2 */}
            <div ref={labelsRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Labels Status:</label>
              <div
                onClick={() => setLabelsOpen(!labelsOpen)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer bg-white min-h-[38px] flex items-center justify-between"
              >
                <span className={filterLabels.length === 0 ? "text-gray-400" : "text-gray-700"}>
                  {filterLabels.length === 0 ? "Type here..." : `${filterLabels.length} selected`}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${labelsOpen ? "rotate-180" : ""}`} />
              </div>
              {labelsOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                  <div className="sticky top-0 bg-white p-2 border-b">
                    <input
                      type="text"
                      value={labelsSearch}
                      onChange={(e) => setLabelsSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  {filteredLabels.map((l) => (
                    <label
                      key={l.value}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={filterLabels.includes(l.value)}
                        onChange={() => toggleLabel(l.value)}
                        className="rounded"
                      />
                      {l.label}
                    </label>
                  ))}
                </div>
              )}
              {filterLabels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {filterLabels.map((val) => {
                    const label = labelStatuses.find((l) => l.value === val);
                    return (
                      <span key={val} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                        {label?.label}
                        <button onClick={() => toggleLabel(val)} className="hover:text-blue-600">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Title:</label>
              <input
                type="text"
                value={filterCaseTitle}
                onChange={(e) => setFilterCaseTitle(e.target.value)}
                placeholder="Enter Case Title"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Change Date From:</label>
              <input
                type="date"
                value={filterStatusFrom}
                onChange={(e) => setFilterStatusFrom(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Change Date To:</label>
              <input
                type="date"
                value={filterStatusTo}
                onChange={(e) => setFilterStatusTo(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={handleReset}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleFilter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Filter
            </button>
          </div>
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
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow-sm overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="px-3 py-3 text-left text-xs font-semibold" style={{ width: "6%" }}>S. No.</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">DIAC Registration No.</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Case Title</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Arbitration Type</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Date of registration</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Case Hearing</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Case Status</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Case Labels</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Arbitrator Status</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Arbitrators</th>
                <th className="px-3 py-3 text-left text-xs font-semibold">Status changed date</th>
                <th className="px-3 py-3 text-center text-xs font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-gray-500">No data available in table</td>
                </tr>
              ) : (
                filteredCases.slice(0, entriesPerPage).map((c, i) => (
                  <tr key={c.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}>
                    <td className="px-3 py-3">{i + 1}</td>
                    <td className="px-3 py-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">{c.diac_registration_no}</span>
                    </td>
                    <td className="px-3 py-3 max-w-[250px] truncate" title={c.case_title}>{c.case_title}</td>
                    <td className="px-3 py-3">{c.mode_of_reference || "-"}</td>
                    <td className="px-3 py-3">{c.date_of_registration || "-"}</td>
                    <td className="px-3 py-3">
                      {c.case_hearing ? (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium border border-orange-300">
                          {c.case_hearing}
                        </span>
                      ) : "-"}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        c.case_status === "UNDER_HEARING" ? "bg-green-100 text-green-800" :
                        c.case_status === "UNDER_PROCESS" ? "bg-yellow-100 text-yellow-800" :
                        c.case_status === "AWARD_TERMINATION" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {c.case_status === "UNDER_PROCESS" ? "Pre-Hearing" :
                         c.case_status === "UNDER_HEARING" ? "Under Hearing" :
                         c.case_status === "AWARD_TERMINATION" ? "Award/Termination" :
                         c.case_status === "OTHER" ? "Other" :
                         (c.case_status || "-")}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium border border-purple-300">
                        SOC Not Filed
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium border border-gray-300">
                        {c.arbitrator_name ? "Appointed" : "To be Appointed"}
                      </span>
                    </td>
                    <td className="px-3 py-3">{c.arbitrator_name || "-"}</td>
                    <td className="px-3 py-3">{c.status_change_date || "-"}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-center gap-1">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded" title="View">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded text-xs flex items-center gap-1" title="Draft Letters">
                          Draft Letters <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1.5 rounded text-xs flex items-center gap-1" title="Action">
                          Action <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-6 pb-4">
          Copyright &copy; DIAC 2026. All rights reserved; Delhi International Arbitration Center.
        </div>
      </div>
    </div>
  );
}
