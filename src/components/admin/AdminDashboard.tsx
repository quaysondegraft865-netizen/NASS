import React from 'react';
import {
  Student,
  Teacher,
  SchoolClass,
  Subject,
  ResultRecord,
  AcademicYear,
  Term
} from '../../types';
import {
  GraduationCap,
  Users,
  Layers,
  BookOpen,
  Calendar,
  FileCheck,
  Clock,
  Award,
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  School
} from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  teachers: Teacher[];
  classes: SchoolClass[];
  subjects: Subject[];
  results: ResultRecord[];
  years: AcademicYear[];
  terms: Term[];
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  teachers,
  classes,
  subjects,
  results,
  years,
  terms,
  onNavigate
}) => {
  const currentYear = years.find(y => y.is_current) || years[years.length - 1];
  const currentTerm = terms.find(t => t.is_current) || terms[terms.length - 1];

  // Statistics
  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === 'Male').length;
  const femaleStudents = students.filter(s => s.gender === 'Female').length;
  const malePercent = totalStudents > 0 ? Math.round((maleStudents / totalStudents) * 100) : 0;

  const graduatingStudents = students.filter(s => {
    const cls = classes.find(c => c.id === s.class_id);
    return cls?.form_level === 'SHS 3';
  }).length;

  const resultsSubmitted = results.filter(r => r.status === 'submitted').length;
  const resultsApproved = results.filter(r => r.status === 'approved' || r.status === 'published').length;
  const resultsDraft = results.filter(r => r.status === 'draft').length;

  // Grade distribution
  const gradeCounts: Record<string, number> = {
    A1: 0, B2: 0, B3: 0, C4: 0, C5: 0, C6: 0, D7: 0, E8: 0, F9: 0
  };
  results.forEach(r => {
    if (gradeCounts[r.grade] !== undefined) {
      gradeCounts[r.grade]++;
    }
  });

  // Programme counts
  const progCounts: Record<string, number> = {};
  students.forEach(s => {
    progCounts[s.programme] = (progCounts[s.programme] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Institutional Administrative Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-800">Office of the Headmaster &amp; Academic Board</span>
            <span>&bull;</span>
            <span>{currentYear?.year_name} Academic Session</span>
            <span>&bull;</span>
            <span className="font-medium text-slate-700">{currentTerm?.term_name}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 font-serif tracking-tight">
            Academic Administration &amp; Examinations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Central repository for Nkroful Agric Senior High School: manage student records, review terminal continuous assessments, certify transcripts, and enforce WAEC curriculum standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('students')}
            className="bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-semibold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Enroll Student</span>
          </button>
          <button
            onClick={() => onNavigate('results_approval')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-emerald-800" />
            <span>Approval Queue ({resultsSubmitted})</span>
          </button>
          <button
            onClick={() => onNavigate('transcripts')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span>Issue Transcript</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">Total Enrolled Students</span>
            <GraduationCap className="w-4 h-4 text-emerald-800" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalStudents}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span className="font-semibold text-slate-700">{maleStudents} Boys</span> ({malePercent}%) &bull; <span>{femaleStudents} Girls</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">Academic Faculty</span>
            <Users className="w-4 h-4 text-blue-800" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{teachers.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Active subject tutors &amp; heads of department
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">Results Awaiting Review</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{resultsSubmitted}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Pending Headmaster certification
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">WASSCE Candidates (SHS 3)</span>
            <Award className="w-4 h-4 text-purple-800" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{graduatingStudents}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Final year graduating candidates
          </div>
        </div>
      </div>

      {/* Grid: Grade Distribution & Programme Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Grade Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-sm text-slate-900">WAEC / SHS Terminal Grade Distribution</h2>
                <p className="text-xs text-slate-500">Distribution of certified examination marks (A1 to F9 scale)</p>
              </div>
              <span className="text-xs font-semibold text-slate-600 tabular-nums">
                {results.length} total grades recorded
              </span>
            </div>

            <div className="grid grid-cols-9 gap-2 pt-2">
              {Object.entries(gradeCounts).map(([grd, cnt]) => {
                const max = Math.max(...Object.values(gradeCounts), 1);
                const heightPct = Math.round((cnt / max) * 100);
                const isPass = !['F9', 'E8'].includes(grd);

                return (
                  <div key={grd} className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-600 mb-1 tabular-nums">{cnt}</span>
                    <div className="w-full bg-slate-100 rounded-t h-28 flex items-end p-1">
                      <div
                        style={{ height: `${Math.max(heightPct, 8)}%` }}
                        className={`w-full rounded-t transition-all duration-300 ${
                          grd === 'A1'
                            ? 'bg-[#0f3d24]'
                            : grd.startsWith('B')
                            ? 'bg-blue-700'
                            : isPass
                            ? 'bg-emerald-600'
                            : 'bg-rose-600'
                        }`}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 mt-2">{grd}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0f3d24]"></span> A1 (Distinction)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-700"></span> B2-B3 (Very Good)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600"></span> C4-D7 (Credit/Pass)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-600"></span> F9 (Fail)
              </span>
            </div>
          </div>

          {/* Enrollment by Academic Programme */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="font-bold text-sm text-slate-900 mb-3">Enrollment by Academic Programme</h2>
            <div className="space-y-3">
              {Object.entries(progCounts).map(([prog, count]) => {
                const pct = Math.round((count / totalStudents) * 100);
                return (
                  <div key={prog}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700">{prog}</span>
                      <span className="font-bold text-slate-900 tabular-nums">{count} students ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="bg-[#0f3d24] h-full rounded-full transition-all duration-300"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Results Queue & Institutional Info */}
        <div className="space-y-6">
          {/* Approval Queue Status */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h2 className="font-bold text-sm text-slate-900 mb-3">Examination Processing Queue</h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="font-medium text-slate-700">Submitted (Pending Review)</span>
                </div>
                <span className="font-bold text-amber-800 tabular-nums">
                  {resultsSubmitted}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span className="font-medium text-slate-700">Approved &amp; Certified</span>
                </div>
                <span className="font-bold text-emerald-800 tabular-nums">
                  {resultsApproved}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                  <span className="font-medium text-slate-700">Faculty Draft Marksheets</span>
                </div>
                <span className="font-bold text-slate-700 tabular-nums">
                  {resultsDraft}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('results_approval')}
              className="w-full mt-4 bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-semibold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Process Results Queue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* School Directory Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm pb-2 border-b border-slate-100">
              <School className="w-4 h-4 text-amber-700" />
              <span>School Administration Directory</span>
            </div>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Headmaster:</span>
                <span className="font-semibold text-slate-900">Mr. Emmanuel J. Armah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asst. Head (Academic):</span>
                <span className="text-slate-800">Mrs. Rebecca Mensah-Bonsu</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">District:</span>
                <span className="text-slate-800">Ellembelle, Western Region</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Class Streams:</span>
                <span className="font-medium text-slate-900 tabular-nums">{classes.length} Streams</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Registered Subjects:</span>
                <span className="font-medium text-slate-900 tabular-nums">{subjects.length} Subjects</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-amber-800 font-medium">
              Official Motto: &ldquo;Knowledge, Integrity, Service&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
