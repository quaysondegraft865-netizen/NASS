import React, { useState } from 'react';
import { SchoolSettings } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import {
  ShieldCheck,
  GraduationCap,
  Users,
  Lock,
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2,
  Download,
  Building,
  FileCheck
} from 'lucide-react';
import { exportPhpProjectZip } from '../../utils/phpExporter';

interface LandingPageProps {
  settings: SchoolSettings;
  onOpenLogin: (prefilledRole?: 'super_admin' | 'teacher' | 'student') => void;
  onOpenVerify: (code?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  settings,
  onOpenLogin,
  onOpenVerify,
}) => {
  const [verifyCode, setVerifyCode] = useState('');

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.trim()) {
      onOpenVerify(verifyCode.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Top Ministerial Bar */}
      <div className="bg-[#0b331f] text-slate-300 text-xs px-4 py-2 border-b border-[#082416]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold text-amber-400">REPUBLIC OF GHANA</span>
            <span>&bull;</span>
            <span className="text-slate-300">MINISTRY OF EDUCATION</span>
            <span>&bull;</span>
            <span className="text-slate-400">GHANA EDUCATION SERVICE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="text-slate-400">Ellembelle District, Western Region</span>
            <span>&bull;</span>
            <button
              onClick={() => exportPhpProjectZip()}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>System Backup (XAMPP/PHP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Institutional Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SchoolCrest size="lg" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0f3d24] font-crest tracking-tight">
                {settings.school_name}
              </h1>
              <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
                <span>{settings.subtitle}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-amber-800 font-semibold uppercase tracking-wider text-[11px]">
                  Motto: {settings.motto}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenVerify()}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Verify Transcript</span>
            </button>
            <button
              onClick={() => onOpenLogin('super_admin')}
              className="px-3 py-2 text-xs font-semibold text-[#0f3d24] hover:text-[#0c2f1c] hover:underline transition-colors cursor-pointer"
            >
              Super Admin
            </button>
            <button
              onClick={() => onOpenLogin()}
              className="px-4 py-2 bg-[#0f3d24] hover:bg-[#0c2f1c] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>Sign In to Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0f3d24] text-white py-14 px-4 border-b border-[#0c2f1c]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            Official Examinations Secretariat &bull; Academic Records System
          </p>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-crest tracking-wide leading-tight">
            Comprehensive Senior High School Academic Records & Verifiable Transcripts
          </h2>

          <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            The institutional platform of Nkroful Agric Senior High School for continuous assessment management, terminal examination grading, WASSCE candidate preparation, and certified academic transcripts.
          </p>

          {/* Verification Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <form onSubmit={handleVerifySubmit} className="bg-white p-1.5 rounded-xl shadow-lg flex flex-col sm:flex-row gap-2 border border-emerald-900">
              <div className="relative flex-1">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Enter Transcript Reference Code (e.g. NASS-TR-2026-000125)"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 rounded-lg focus:outline-none font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-[#c48a12] hover:bg-[#b07b0e] text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>Verify Credential</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[11px] text-emerald-200 mt-2">
              Instant verification for universities, scholarship secretariats, and employers.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Portal Gateways */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 z-10 w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Student */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0f3d24] flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Student Portal</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Access your continuous assessment marks, term-by-term examination reports, cumulative GPA, and download your official sealed transcript.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Student Access</span>
              <button
                onClick={() => onOpenLogin('student')}
                className="bg-[#0f3d24] hover:bg-[#0c2f1c] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Teacher */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Teacher & Faculty Portal</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Enter continuous class marks (30%) and terminal exams (70%) with automated grade computation and batch submission to the Headmaster.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Teaching Staff</span>
              <button
                onClick={() => onOpenLogin('teacher')}
                className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Administrative Secretariat</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Headmaster and Academic Board oversight: student enrollment, faculty subject allocations, results approval, transcript certification, and audit trails.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Administration</span>
              <button
                onClick={() => onOpenLogin('super_admin')}
                className="bg-[#c48a12] hover:bg-[#b07b0e] text-slate-950 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Overview */}
      <section className="max-w-6xl mx-auto px-4 py-6 w-full">
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">
              About the Institution
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 font-crest">
              Nkroful Agric Senior High School
            </h3>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Founded in 1973 in Nkroful, Western Region (the birthplace of Osagyefo Dr. Kwame Nkrumah), Nkroful Agric Senior High School is a leading public senior high school established to nurture academic excellence, agricultural innovation, and disciplined citizenship under the Ghana Education Service.
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The school prepares students for the West African Senior School Certificate Examination (WASSCE) across four core academic pillars and multiple specialized elective programmes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Year Established</span>
              <span className="font-bold text-slate-900 text-sm">1973</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-bold text-slate-900 text-sm">Nkroful, Ellembelle</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Accreditation</span>
              <span className="font-bold text-slate-900 text-sm">GES &amp; WAEC</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">School Motto</span>
              <span className="font-bold text-emerald-800 text-sm">Knowledge, Integrity, Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-200">{settings.school_name}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{settings.address} &bull; Tel: {settings.phone}</div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onOpenVerify('NASS-TR-2026-000125')} className="hover:text-amber-400 cursor-pointer">
              Verify Official Transcript
            </button>
            <span className="text-slate-700">&bull;</span>
            <button onClick={() => onOpenLogin()} className="hover:text-amber-400 cursor-pointer">
              Staff &amp; Student Portal
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Nkroful Agric SHS &bull; Ghana Education Service
          </div>
        </div>
      </footer>
    </div>
  );
};
