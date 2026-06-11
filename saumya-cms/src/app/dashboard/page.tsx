"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import StatCard from "@/components/dashboard/stat-card";
import {
  Briefcase,
  CalendarClock,
  ClipboardList,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    registeredCases: 0,
    todaysHearing: 0,
    pendingWork: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();
        const [
          registeredCases,
          todaysHearing,
          pendingWork,
        ] = await Promise.all([
          supabase
            .from("cases")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("cases")
            .select("id", { count: "exact", head: true })
            .eq("date_of_registration", new Date().toISOString().split("T")[0]),
          supabase
            .from("cases")
            .select("id", { count: "exact", head: true })
            .in("case_status", ["pending", "under_review"]),
        ]);

        setStats({
          registeredCases: registeredCases.count || 0,
          todaysHearing: todaysHearing.count || 0,
          pendingWork: pendingWork.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard <span className="text-gray-400 font-normal text-lg">Control panel</span>
          </h1>
        </div>
        <div className="text-sm text-gray-500">
          <span className="flex items-center gap-1">
            🏠 Home <span className="mx-1">›</span> Dashboard
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg h-40"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Registered Cases"
            count={stats.registeredCases}
            icon={Briefcase}
            href="/dashboard/cases"
          />
          <StatCard
            title="Today's Hearing"
            count={stats.todaysHearing}
            icon={CalendarClock}
            href="/dashboard/cases?hearing=today"
          />
          <StatCard
            title="Pending Work Count"
            count={stats.pendingWork}
            icon={ClipboardList}
            href="/dashboard/work/pending"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 bg-[#8B1A1A] text-white text-center py-3 rounded-lg">
        <p className="text-sm">
          Copyright © DIAC 2026 All rights reserved; Delhi International Arbitration Center.
        </p>
      </div>
    </div>
  );
}
