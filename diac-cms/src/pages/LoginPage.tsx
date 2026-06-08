import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      setLoading(false);
      return;
    }

    const success = login(userId, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b5998] to-[#1a3a6e] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Branding */}
        <div className="md:w-2/3 bg-gradient-to-br from-[#3c8dbc] to-[#2c6e99] p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Scale size={32} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">DIAC Case Management</h2>
            <p className="text-white/80 text-lg">
              Manage the <q className="italic">Delhi International Arbitration Center</q> case management system.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="http://dhcdiac.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-colors"
            >
              <span className="text-lg">🌐</span> View Website
            </a>
          </div>

          <div className="mt-8 text-sm text-white/60">
            © 2025 copyrights reserved; powered & developed by NIC
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="md:w-1/3 p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-[#3c8dbc] rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Login</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] focus:border-transparent outline-none"
                placeholder="Enter User ID"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8dbc] focus:border-transparent outline-none"
                  placeholder="Enter Password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3c8dbc] hover:bg-[#367fa9] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-[#3c8dbc] hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-[#3c8dbc]">Privacy</a>
              <a href="#" className="hover:text-[#3c8dbc]">About</a>
              <a href="#" className="hover:text-[#3c8dbc]">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Scale(props: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}
