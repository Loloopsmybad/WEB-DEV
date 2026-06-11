"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  Settings,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  Edit3,
  Tag,
  Mail,
  Users,
  Shield,
  Scale,
  DollarSign,
  AlertCircle,
  Clock,
  Gavel,
  XCircle,
  List,
  StickyNote,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Case Management",
    icon: Briefcase,
    children: [
      { label: "Alloted Case", href: "/dashboard/cases/alloted", icon: CheckCircle },
      { label: "Status of Pleadings", href: "/dashboard/cases/status", icon: Edit3 },
      { label: "Tag Cases", href: "/dashboard/cases/tag", icon: Tag },
      { label: "Draft Letters", href: "/dashboard/cases/draft-letters", icon: Mail },
      { label: "Claimant & Respondent", href: "/dashboard/cases/parties", icon: Users },
      { label: "Counsels", href: "/dashboard/cases/counsels", icon: Shield },
      { label: "Arbitral Tribunal", href: "/dashboard/cases/tribunal", icon: Scale },
      { label: "Case Fee", href: "/dashboard/cases/fee", icon: DollarSign },
      { label: "Fee Deficiency Cases", href: "/dashboard/cases/fee-deficiency", icon: AlertCircle },
      { label: "Fee Pending Cases", href: "/dashboard/cases/fee-pending", icon: Clock },
      { label: "Case Order", href: "/dashboard/cases/orders", icon: Gavel },
      { label: "Termination", href: "/dashboard/cases/termination", icon: XCircle },
      { label: "Cause List", href: "/dashboard/cases/cause-list", icon: List },
      { label: "Noting", href: "/dashboard/cases/noting", icon: StickyNote },
      { label: "All Cases", href: "/dashboard/cases", icon: Briefcase },
    ],
  },
  {
    label: "Work Status",
    icon: ClipboardList,
    children: [
      { label: "Pending", href: "/dashboard/work/pending", icon: ClipboardList },
      { label: "Completed", href: "/dashboard/work/completed", icon: ClipboardList },
    ],
  },
  {
    label: "Master Setup",
    icon: Settings,
    children: [
      { label: "Arbitrator Setup", href: "/dashboard/setup/arbitrators", icon: Settings },
      { label: "Counsel Setup", href: "/dashboard/setup/counsels", icon: Settings },
      { label: "Short Pink List", href: "/dashboard/setup/pink-list", icon: Settings },
    ],
  },
  { label: "eFiling Users", href: "/dashboard/efiling", icon: FileText },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#8B1A1A] text-white p-2 rounded-md"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#2D2D2D] text-white z-40 transition-all duration-300 ${
          open ? "w-64" : "w-20"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          {open && (
            <h1 className="text-xl font-bold text-white">DIAC:DELHI</h1>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="hidden lg:block text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 overflow-y-auto h-[calc(100%-80px)]">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#3D3D3D] transition-colors ${
                      expanded === item.label ? "bg-[#3D3D3D]" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {open && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {expanded === item.label ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {expanded === item.label && open && (
                    <div className="bg-[#1D1D1D]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-12 py-2 text-sm hover:bg-[#3D3D3D] transition-colors ${
                            pathname === child.href
                              ? "bg-[#D4792E] text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {child.icon && <child.icon className="w-4 h-4 flex-shrink-0" />}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#3D3D3D] transition-colors ${
                    pathname === item.href
                      ? "bg-[#D4792E] text-white border-l-4 border-white"
                      : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {open && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
