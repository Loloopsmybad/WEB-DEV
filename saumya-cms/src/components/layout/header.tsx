"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  FileText,
  Video,
  Monitor,
  Clock,
  Bell,
  LogOut,
  User,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");
        setUserId(user.id.slice(0, 6).toUpperCase());
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#8B1A1A] text-white flex items-center justify-between px-4 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold hidden sm:block">DIAC:DELHI</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <FileText className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Video className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Monitor className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors relative">
          <Clock className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors relative">
          <Bell className="w-5 h-5" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 ml-2 border-l border-white/30 pl-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Ms. {userName}</p>
            <p className="text-xs text-white/70">({userId})</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/10 rounded-md transition-colors ml-2"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
