"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";

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

export default function AllCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("cases").select("*");

        if (error) {
          setErrorMsg(error.message);
          console.error("Supabase error:", error.message);
        } else {
          setCases(data || []);
          console.log("Fetched cases:", data?.length);
        }
      } catch (e: any) {
        setErrorMsg(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Cases</h1>
        <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-800">
          ← Go Back
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
          Error: {errorMsg}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#8B1A1A] text-white">
              <th className="px-3 py-3 text-left">S.No.</th>
              <th className="px-3 py-3 text-left">DIAC Reg No.</th>
              <th className="px-3 py-3 text-left">Case Title</th>
              <th className="px-3 py-3 text-left">Ref Order Date</th>
              <th className="px-3 py-3 text-left">Mode</th>
              <th className="px-3 py-3 text-left">Ref Received</th>
              <th className="px-3 py-3 text-left">Reg Date</th>
              <th className="px-3 py-3 text-left">Hearing</th>
              <th className="px-3 py-3 text-left">Status Date</th>
              <th className="px-3 py-3 text-left">Arbitrator</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12} className="px-4 py-12 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : cases.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-12 text-center text-gray-500">
                  {errorMsg ? "Error loading data" : "No cases found"}
                </td>
              </tr>
            ) : (
              cases.map((c, i) => (
                <tr key={c.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                  <td className="px-3 py-3">{i + 1}</td>
                  <td className="px-3 py-3 font-medium text-blue-600">{c.diac_registration_no}</td>
                  <td className="px-3 py-3 max-w-[200px] truncate">{c.case_title}</td>
                  <td className="px-3 py-3">{c.date_of_reference_order || "-"}</td>
                  <td className="px-3 py-3">{c.mode_of_reference || "-"}</td>
                  <td className="px-3 py-3">{c.ref_received_on || "-"}</td>
                  <td className="px-3 py-3">{c.date_of_registration || "-"}</td>
                  <td className="px-3 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{c.case_hearing || "-"}</span>
                  </td>
                  <td className="px-3 py-3">{c.status_change_date || "-"}</td>
                  <td className="px-3 py-3">{c.arbitrator_name || "-"}</td>
                  <td className="px-3 py-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {(c.case_status || "pending").replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <button className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded"><Eye className="w-4 h-4" /></button>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
