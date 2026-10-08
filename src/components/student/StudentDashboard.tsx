import React from 'react';
import { Student, SchoolClass, ResultRecord, Subject, AcademicYear, Term } from '../../types';
import { Award, BookOpen, GraduationCap, FileText, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { gradePointToGPA, computeOverallDivision } from '../../utils/gradeCalculator';

interface StudentDashboardProps {
  currentStudent: Student;
  classes: SchoolClass[];
  results: ResultRecord[];
  subjects: Subject[];
  years: AcademicYear[];
  terms: Term[];
  onNavigate: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentStudent,
  classes,
  results,
  subjects,
  years,
  terms,
  onNavigate,
}) => {
  const studentClass = classes.find(c => c.id === currentStudent.class_id);
  const approvedResults = results.filter(
    r => r.student_id === currentStudent.id && (r.status === 'approved' || r.status === 'published')
  );

  let totalPoints = 0;
  let count = 0;
  approvedResults.forEach(r => {
    totalPoints += gradePointToGPA(r.grade);
    count++;
  });
  const gpa = count > 0 ? (totalPoints / count).toFixed(2) : '0.00';
  const division = computeOverallDivision(Number(gpa));

  // Current term latest results
  const latestResults = approvedResults.slice(-5);

  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-emerald-900 text-amber-300 font-bold text-lg flex items-center justify-center border-2 border-emerald-950 shrink-0">
            {currentStudent.first_name[0]}{currentStudent.last_name[0]}
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-0.5">
              <span>Candidate ID: </span>
              <strong className="font-mono text-emerald-900">{currentStudent.student_id}</strong>
              <span className="mx-1">&bull;</span>
              <span>Admission: {currentStudent.admission_number}</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 font-serif">
              {currentStudent.first_name} {currentStudent.middle_name ? currentStudent.middle_name + ' ' : ''}{currentStudent.last_name}
            </h1>
            <div className="text-xs text-slate-600 mt-1">
              {currentStudent.programme} &bull; {studentClass?.class_name} ({currentStudent.year_group})
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => onNavigate('student_transcript')}
            className="bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Official Academic Transcript</span>
          </button>
          <button
            onClick={() => onNavigate('student_results')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-600" />
            <span>Terminal Results</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Cumulative GPA</div>
          <div className="text-2xl font-black text-emerald-900 font-mono tabular-nums">{gpa} / 4.00</div>
          <div className="text-[11px] text-amber-800 font-medium mt-1 truncate">{division}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Graded Courses</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{approvedResults.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Terminal assessments certified</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Class Stream</div>
          <div className="text-xl font-bold text-slate-900">{studentClass?.class_name || 'SHS'}</div>
          <div className="text-[11px] text-slate-400 mt-1">{currentStudent.programme}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Academic Status</div>
          <div className="text-base font-bold text-emerald-800">Regular Candidate</div>
          <div className="text-[11px] text-slate-400 mt-1">Good Academic Standing</div>
        </div>
      </div>

      {/* Recent Certified Results */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-sm text-slate-900">Recent Certified Terminal Examination Marks</h2>
            <p className="text-xs text-slate-500">Official marks approved by the Headmaster and Examinations Secretariat</p>
          </div>
          <button
            onClick={() => onNavigate('student_results')}
            className="text-xs text-emerald-900 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Term Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {latestResults.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No approved examination marks published yet.</p>
          ) : (
            latestResults.map(r => {
              const sub = subjects.find(s => s.id === r.subject_id);
              return (
                <div key={r.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{sub?.subject_name}</span>
                    <span className="text-[11px] text-slate-500 block">
                      Class Assessment: {r.assessment_score} &bull; Exam: {r.exam_score} &bull; Total: {r.total_score}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xs text-slate-900">
                      Grade: <span className="text-emerald-900 font-extrabold">{r.grade}</span> ({r.grade_point})
                    </span>
                    <span className="text-slate-500 text-xs font-medium">{r.remarks}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
