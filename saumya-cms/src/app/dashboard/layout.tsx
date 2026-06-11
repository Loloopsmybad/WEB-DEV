"use client";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <Sidebar />
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
