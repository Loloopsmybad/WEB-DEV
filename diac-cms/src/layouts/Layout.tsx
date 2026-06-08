import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, BookOpen, CheckCircle, BarChart3, FileText, Users,
  Scale, Clock, DollarSign, Calendar, StickyNote, Building2, Bell,
  LogOut, User, ChevronDown, ChevronRight, Menu, X
} from 'lucide-react';

const sidebarItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Case Management', icon: BookOpen, children: [
      { path: '/allotted-case', label: 'Allotted Case', icon: CheckCircle },
      { path: '/status-of-pleadings', label: 'Status of Pleadings', icon: BarChart3 },
      { path: '/tag-cases', label: 'Tag Cases', icon: Users },
      { path: '/draft-letters', label: 'Draft Letters', icon: FileText },
      { path: '/claimant-respondent', label: 'Claimant & Respondent', icon: Users },
      { path: '/counsels-case', label: 'Counsels', icon: Users },
      { path: '/arbitral-tribunals', label: 'Arbitral Tribunal', icon: Scale },
      { path: '/case-fee', label: 'Case Fee', icon: DollarSign },
      { path: '/fee-deficiency', label: 'Fee Deficiency Cases', icon: DollarSign },
      { path: '/fee-pending', label: 'Fee Pending Cases', icon: DollarSign },
      { path: '/case-orders', label: 'Case Orders', icon: BookOpen },
      { path: '/termination', label: 'Termination', icon: BookOpen },
      { path: '/cause-list', label: 'Cause List', icon: Calendar },
      { path: '/noting', label: 'Noting', icon: StickyNote },
      { path: '/all-cases', label: 'All Cases', icon: FileText },
    ]
  },
  {
    label: 'Rooms Availability', icon: Building2, children: [
      { path: '/hearings-today', label: 'Hearings Today', icon: Clock },
    ]
  },
  {
    label: 'Work Status', icon: StickyNote, children: [
      { path: '/work-status/pending', label: 'Pending', icon: StickyNote },
      { path: '/work-status/completed', label: 'Completed', icon: CheckCircle },
    ]
  },
  {
    label: 'Master Setup', icon: BarChart3, children: [
      { path: '/arbitrator-setup', label: 'Arbitrator Setup', icon: Scale },
      { path: '/counsel-setup', label: 'Counsel Setup', icon: Users },
      { path: '/short-pink-list', label: 'Short Pink List', icon: Users },
    ]
  },
  { path: '/efiling-users', label: 'eFiling Users', icon: User },
  { path: '/reports', label: 'Reports', icon: FileText },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Case Management']);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} bg-[#2c3b41] text-[#b8c7ce] transition-all duration-300 flex flex-col`}>
        <div className="bg-[#222d32] h-14 flex items-center px-4">
          <span className="text-white font-bold text-lg">DIAC: DELHI</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="w-full flex items-center px-4 py-3 text-sm hover:bg-[#1e282c] transition-colors"
                  >
                    <item.icon size={18} className="mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {expandedMenus.includes(item.label) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {expandedMenus.includes(item.label) && (
                    <div className="bg-[#1e282c]">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `flex items-center px-8 py-2.5 text-sm transition-colors ${isActive ? 'bg-[#3c8dbc] text-white' : 'hover:bg-[#2c3b41]'}`
                          }
                        >
                          <child.icon size={16} className="mr-3" />
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm transition-colors ${isActive ? 'bg-[#3c8dbc] text-white' : 'hover:bg-[#1e282c]'}`
                  }
                >
                  <item.icon size={18} className="mr-3" />
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#367fa9] h-14 flex items-center justify-between px-4 shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-gray-200">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-200 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-white hover:text-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <span className="hidden sm:inline">{user?.name || 'User'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.jobTitle}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 text-center text-sm text-gray-600">
          Copyright &copy; DIAC 2025 - All rights reserved; Delhi International Arbitration Center.
        </footer>
      </div>
    </div>
  );
}
