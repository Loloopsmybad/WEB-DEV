"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Orange Gradient */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#E8913A] via-[#D4792E] to-[#8B4513] text-white p-12 flex-col justify-between">
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
            Register to manage cases at the Delhi International Arbitration
            Center.
          </p>
          <Link href="/">
            <Button
              variant="outline"
              className="w-fit bg-white/10 hover:bg-white/20 text-white border-white/30 px-6 py-2 rounded-full"
            >
              View Website
            </Button>
          </Link>
        </div>

        <div className="relative z-10 text-center text-sm text-white/60">
          © 2026 copyrights reserved; powered &amp; developed by Saumya
        </div>
      </div>

      {/* Right Side - Signup Form */}
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

          <h2 className="text-2xl font-bold text-[#D4792E] mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 py-6 border-gray-200 focus:border-[#D4792E] focus:ring-[#D4792E]"
                required
              />
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
                {success}
              </div>
            )}

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4792E] hover:bg-[#C46A20] text-white py-6 text-lg font-semibold"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#D4792E] hover:text-[#C46A20] font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
