import React, { useState } from 'react';
import { User, SchoolSettings } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import {
  Lock,
  User as UserIcon,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LoginPageProps {
  users: User[];
  settings: SchoolSettings;
  prefilledRole?: 'super_admin' | 'teacher' | 'student';
  onLogin: (user: User) => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  users,
  settings,
  onLogin,
  onBackToHome,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAccountsDirectory, setShowAccountsDirectory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both your username/admission number and account password.');
      return;
    }

    const cleanUser = username.trim().toLowerCase();
    const user = users.find(
      u => u.username.toLowerCase() === cleanUser || u.student_id?.toLowerCase() === cleanUser
    );

    if (!user) {
      setErrorMsg('Invalid login credentials. Please verify your Staff ID or Student Admission Number.');
      return;
    }

    if (user.status !== 'active') {
      setErrorMsg('This account is currently suspended or inactive. Please contact the Headmaster.');
      return;
    }

    onLogin(user);
  };

  const handleSelectDirectoryAccount = (uname: string, pwd: string) => {
    setUsername(uname);
    setPassword(pwd);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to School Portal</span>
        </button>

        <div className="flex justify-center mb-3">
          <SchoolCrest size="xl" />
        </div>

        <h1 className="text-xl font-serif font-black text-white tracking-wide">
          {settings.school_name}
        </h1>
        <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">
          {settings.subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-xl shadow-2xl border border-slate-200">
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif">Portal Authentication</h2>
              <p className="text-xs text-slate-500">Sign in to access your institutional records</p>
            </div>
            <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Staff ID or Student Admission Number
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                  placeholder="e.g. ADM/2026/001 or staff username"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Account Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                  placeholder="Enter your account password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => alert("For password resets, please contact the Academic Secretariat or ICT Department in the Administration Block.")}
                className="text-emerald-800 hover:underline cursor-pointer font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </form>

          {/* Institutional User Directory Helper */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAccountsDirectory(!showAccountsDirectory)}
              className="w-full text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center justify-between py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>Authorized System Accounts Directory</span>
              </span>
              {showAccountsDirectory ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showAccountsDirectory && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-[11px] text-slate-600">
                <p className="text-[10px] text-slate-400 font-medium pb-1 border-b border-slate-200">
                  Select an authorized institutional profile to populate credentials:
                </p>

                {/* Administrator */}
                <div
                  onClick={() => handleSelectDirectoryAccount('admin', 'Admin@123')}
                  className="p-2 bg-white rounded border border-slate-200 hover:border-emerald-700 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Headmaster / Administrator</div>
                      <div className="font-mono text-[10px] text-slate-500">admin &bull; Admin@123</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">Select</span>
                </div>

                {/* Teacher */}
                <div
                  onClick={() => handleSelectDirectoryAccount('kmensah', 'Teacher@123')}
                  className="p-2 bg-white rounded border border-slate-200 hover:border-emerald-700 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-[10px]">
                      T
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Mr. Kofi Mensah (Mathematics)</div>
                      <div className="font-mono text-[10px] text-slate-500">kmensah &bull; Teacher@123</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">Select</span>
                </div>

                {/* Student */}
                <div
                  onClick={() => handleSelectDirectoryAccount('ADM/2026/001', 'Student@123')}
                  className="p-2 bg-white rounded border border-slate-200 hover:border-emerald-700 hover:bg-emerald-50/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-[10px]">
                      S
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Kwame Mensah (SHS 3 Science)</div>
                      <div className="font-mono text-[10px] text-slate-500">ADM/2026/001 &bull; Student@123</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">Select</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 text-center text-[11px] text-slate-400">
            Official Examinations &amp; Academic Records Portal &bull; GES
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
