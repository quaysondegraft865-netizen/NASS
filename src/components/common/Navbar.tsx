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
  FileCheck,
  Sparkles,
  BarChart3,
  Database,
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

  const stats = [
    { label: 'Academic records', value: '24/7', icon: Database },
    { label: 'Verified transcripts', value: '100%', icon: ShieldCheck },
    { label: 'Result workflows', value: '3x', icon: BarChart3 },
  ];

  const pillars = [
    {
      title: 'Student portal',
      copy: 'Access marks, assessments, cumulative outcomes, and official academic history without friction.',
      icon: GraduationCap,
      accent: 'bg-emerald-500/10 text-emerald-700',
      action: () => onOpenLogin('student'),
      actionText: 'Student login',
    },
    {
      title: 'Teacher workspace',
      copy: 'Submit continuous assessments, track exams, and manage results with a performance-first workflow.',
      icon: Users,
      accent: 'bg-sky-500/10 text-sky-700',
      action: () => onOpenLogin('teacher'),
      actionText: 'Faculty login',
    },
    {
      title: 'Admin control',
      copy: 'Manage academic years, enrollment, approvals, transcripts, and audit logs from one control layer.',
      icon: Lock,
      accent: 'bg-amber-500/10 text-amber-700',
      action: () => onOpenLogin('super_admin'),
      actionText: 'Admin login',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-slate-950 text-slate-300 text-[11px] border-b border-slate-800/80">
        <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-2 py-2.5">
          <div className="flex items-center gap-2 flex-wrap text-slate-400">
            <span className="font-bold text-amber-400 tracking-[0.2em] uppercase">NASS</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>Academic operations platform</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => exportPhpProjectZip()}
              className="nav-pill text-slate-300 border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-amber-300"
            >
              <Download className="w-3.5 h-3.5" />
              Export package
            </button>
          </div>
        </div>
      </div>

      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-30">
        <div className="section-shell flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-2 shadow-lg shadow-emerald-900/20">
              <SchoolCrest size="sm" showText={false} />
            </div>
            <div>
              <div className="font-crest text-lg font-black tracking-tight text-slate-900">{settings.school_name || 'NASS Academic Hub'}</div>
              <div className="text-[11px] text-slate-500">{settings.subtitle || 'School performance and transcript platform'}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button onClick={() => onOpenVerify()} className="nav-pill">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Verify transcript
            </button>
            <button
              onClick={() => onOpenLogin()}
              className="rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold shadow-lg shadow-slate-900/15 transition hover:bg-slate-700"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.12),transparent_28%)]" />
          <div className="section-shell relative grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 py-14 md:py-18">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                Modern academic management system
              </div>

              <h1 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Smarter school operations for a better academic future.
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                A redesigned academic workspace for schools to manage admissions, results, teacher assignments, transcript verification, and student performance in one polished operational hub.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                <button
                  onClick={() => onOpenLogin('super_admin')}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition hover:bg-slate-700"
                >
                  Launch dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenVerify()}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <BadgeCheckIcon />
                  Verify documents
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-card rounded-2xl p-4">
                    <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-2 text-slate-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-[28px] p-4 md:p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
                <div className="rounded-[22px] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-200">Academic overview</div>
                      <div className="mt-2 text-2xl font-black">2025 / 2026</div>
                    </div>
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 px-2 py-1 text-[10px] font-semibold text-emerald-200">
                      Term 1 active
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>Enrollment</span>
                        <span>1,842</span>
                      </div>
                      <div className="mt-3 h-2.5 rounded-full bg-white/10">
                        <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-slate-300">Teachers</div>
                        <div className="mt-2 text-xl font-black">128</div>
                      </div>
                      <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-slate-300">Subjects</div>
                        <div className="mt-2 text-xl font-black">42</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Verified', '98.4%'],
                    ['Approvals', '142'],
                    ['GPA avg', '3.7'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                      <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{label}</div>
                      <div className="mt-2 text-xl font-black text-slate-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-12">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Portals</div>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Built for every academic role</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map(({ title, copy, icon: Icon, accent, action, actionText }) => (
              <div key={title} className="glass-card rounded-[26px] p-5 flex flex-col">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>

                <button
                  onClick={action}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-700"
                >
                  {actionText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white py-12 sm:py-16">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] items-start">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">Why this platform</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Everything schools need to run smoothly.</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: BookOpen, title: 'Academic data', text: 'Manage classes, subjects, and student records with a clean, searchable system.' },
                  { icon: Award, title: 'Results engine', text: 'Automated grading, batch submissions, and approval chains across terms.' },
                  { icon: Building, title: 'Operations', text: 'Coordinate staff, schedules, academic years, and institutional settings.' },
                  { icon: FileCheck, title: 'Verification', text: 'Issue trusted transcripts and verify credentials in real time.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-4 inline-flex rounded-2xl bg-emerald-400/10 p-2 text-emerald-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="glass-card rounded-[30px] p-6 sm:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Ready to go</div>
                <h3 className="mt-2 text-3xl font-black text-slate-900">Launch your academic operations with confidence.</h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenLogin('super_admin')}
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Open portal
                </button>
                <button
                  onClick={() => onOpenVerify('NASS-TR-2026-000125')}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Try verification
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-8">
        <div className="section-shell flex flex-col gap-4 sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div>
            <div className="font-bold text-slate-800">{settings.school_name || 'NASS'}</div>
            <div>{settings.address || 'Academic records and digital transcript management'}</div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => onOpenVerify()} className="hover:text-emerald-700">Verify transcript</button>
            <button onClick={() => onOpenLogin()} className="hover:text-emerald-700">Portal access</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const BadgeCheckIcon = () => (
  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
);

export default LandingPage;
