"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  FileText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Orange Gradient */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#E8913A] via-[#D4792E] to-[#8B4513] text-white p-12 flex-col justify-between">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <FileText className="w-20 h-20 text-white/90" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
          <h2 className="text-5xl font-bold mb-4">DIAC Case Management</h2>
          <p className="text-lg text-white/80 max-w-md mb-8">
            Manage the &quot;Delhi International Arbitration Center&quot; case management
            system.
          </p>
          <Button
            variant="outline"
            className="w-fit bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-2 rounded-full"
          >
            View Website
          </Button>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center text-sm text-white/60">
          © 2026 copyrights reserved; powered &amp; developed by Saumya
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-8 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-[#C4A54D] tracking-wider">
                DIAC
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Delhi International Arbitration Centre
              </p>
            </div>
          </div>

          {/* Login Heading */}
          <h2 className="text-2xl font-bold text-[#D4792E] mb-6">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Captcha */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md border border-blue-200">
                <div className="flex-1 text-center font-mono text-lg tracking-widest text-blue-600">
                  3cJ5U8
                </div>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4792E] hover:bg-[#C46A20] text-white py-6 text-lg font-semibold"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-right">
            <a
              href="#"
              className="text-[#D4792E] hover:text-[#C46A20] text-sm font-medium"
            >
              Forgot Password?
            </a>
          </div>

          <Separator className="my-6" />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500 mb-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[#D4792E] hover:text-[#C46A20] font-medium"
            >
              Sign Up here
            </Link>
          </p>

          {/* Footer Links */}
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-700">
              About
            </a>
            <a href="#" className="hover:text-gray-700">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
