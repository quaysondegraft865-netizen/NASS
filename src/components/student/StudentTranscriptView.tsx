import React from 'react';
import {
  Student,
  ResultRecord,
  Subject,
  SchoolClass,
  AcademicYear,
  Term,
  SchoolSettings,
  TranscriptVerification
} from '../../types';
import { Award, Download, Printer, ShieldCheck, Calendar } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { generateTranscriptPDF } from '../../utils/pdfGenerator';
import { gradePointToGPA, computeOverallDivision, generateTranscriptCode } from '../../utils/gradeCalculator';

interface StudentTranscriptViewProps {
  currentStudent: Student;
  results: ResultRecord[];
  subjects: Subject[];
  classes: SchoolClass[];
  years: AcademicYear[];
  terms: Term[];
  settings: SchoolSettings;
  transcripts: TranscriptVerification[];
  onNavigateVerify: (code: string) => void;
}

export const StudentTranscriptView: React.FC<StudentTranscriptViewProps> = ({
  currentStudent,
  results,
  subjects,
  classes,
  years,
  terms,
  settings,
  transcripts,
  onNavigateVerify,
}) => {
  const studentClass = classes.find(c => c.id === currentStudent.class_id);
  const studentResults = results.filter(
    r => r.student_id === currentStudent.id && (r.status === 'approved' || r.status === 'published')
  );

  const activeYears = years.filter(y =>
    studentResults.some(r => r.academic_year_id === y.id)
  );

  let totalPoints = 0;
  let count = 0;
  studentResults.forEach(r => {
    totalPoints += gradePointToGPA(r.grade);
    count++;
  });
  const gpa = count > 0 ? totalPoints / count : 0;
  const division = computeOverallDivision(gpa);

  const existingTranscript = transcripts.find(t => t.student_id === currentStudent.id);
  const code = existingTranscript ? existingTranscript.transcript_code : generateTranscriptCode(currentStudent.student_id);

  const handleDownloadPDF = () => {
    generateTranscriptPDF(
      currentStudent,
      settings,
      results,
      subjects,
      classes,
      years,
      terms,
      code
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-800" />
            <span>Official Senior High School Transcript</span>
          </h2>
          <p className="text-xs text-slate-500">
            Cumulative certified academic record across Form 1, Form 2, and Form 3.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleDownloadPDF}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download Official Transcript PDF</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container */}
      <div className="bg-white rounded-2xl border-2 border-emerald-900/40 p-8 shadow-md max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        <div className="flex flex-col items-center text-center pb-6 border-b-2 border-emerald-900">
          <div className="mb-2">
            <SchoolCrest size="xl" showText={false} />
          </div>
          <div className="text-amber-800 font-bold text-xs tracking-widest uppercase mb-1">
            REPUBLIC OF GHANA &bull; GHANA EDUCATION SERVICE
          </div>
          <h1 className="text-2xl font-black text-[#0f3d24] font-serif tracking-tight">
            {settings.school_name}
          </h1>
          <p className="text-xs italic text-amber-900 font-semibold mt-0.5">"{settings.motto}"</p>
          <div className="text-[11px] text-slate-500 mt-1">
            {settings.address} &bull; Tel: {settings.phone} &bull; {settings.email}
          </div>
          <div className="mt-3 inline-block bg-[#0f3d24] text-white font-serif font-bold text-xs px-6 py-1.5 rounded-md uppercase tracking-wider shadow-xs">
            OFFICIAL ACADEMIC TRANSCRIPT
          </div>
        </div>

        {/* Student Info Card */}
        <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center text-xs">
          <div className="flex items-center gap-3 sm:col-span-2">
            <img
              src={currentStudent.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentStudent.first_name}
              className="w-14 h-14 rounded-lg object-cover border border-slate-300"
            />
            <div>
              <div className="font-bold text-sm text-slate-900">
                {currentStudent.first_name} {currentStudent.middle_name ? currentStudent.middle_name + ' ' : ''}{currentStudent.last_name}
              </div>
              <div className="font-mono text-emerald-800 font-bold">
                {currentStudent.student_id} &bull; Adm: {currentStudent.admission_number}
              </div>
              <div className="text-slate-500 text-[11px]">
                Programme: <strong>{currentStudent.programme}</strong>
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Study Period</span>
            <span className="font-semibold text-slate-800">
              {currentStudent.admission_year} - {currentStudent.graduation_year} ({currentStudent.year_group})
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Verification Ref</span>
            <span className="font-mono font-bold text-amber-700 text-xs block">
              {code}
            </span>
            <button
              onClick={() => onNavigateVerify(code)}
              className="inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold mt-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verify Online</span>
            </button>
          </div>
        </div>

        {/* Results Tables */}
        <div className="space-y-6">
          {activeYears.map(year => {
            const yearResults = studentResults.filter(r => r.academic_year_id === year.id);

            return (
              <div key={year.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-emerald-950 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>ACADEMIC YEAR: {year.year_name}</span>
                  </div>
                  <span className="text-[11px] text-emerald-200 font-normal">
                    {yearResults.length} Courses Certified
                  </span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <th className="py-2 px-4">Subject</th>
                      <th className="py-2 px-4">Term</th>
                      <th className="py-2 px-4 text-center">Class Wk (30%)</th>
                      <th className="py-2 px-4 text-center">Exam (70%)</th>
                      <th className="py-2 px-4 text-center">Total (100)</th>
                      <th className="py-2 px-4 text-center">Grade</th>
                      <th className="py-2 px-4 text-center">Grade Point</th>
                      <th className="py-2 px-4">Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {yearResults.map(r => {
                      const sub = subjects.find(s => s.id === r.subject_id);
                      const term = terms.find(t => t.id === r.term_id);

                      return (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="py-2 px-4 font-semibold text-slate-900">{sub?.subject_name}</td>
                          <td className="py-2 px-4 text-slate-600">{term?.term_name}</td>
                          <td className="py-2 px-4 text-center">{r.assessment_score.toFixed(1)}</td>
                          <td className="py-2 px-4 text-center">{r.exam_score.toFixed(1)}</td>
                          <td className="py-2 px-4 text-center font-bold text-slate-900">{r.total_score.toFixed(1)}</td>
                          <td className="py-2 px-4 text-center font-bold text-emerald-800">{r.grade}</td>
                          <td className="py-2 px-4 text-center font-semibold">{r.grade_point}</td>
                          <td className="py-2 px-4 text-slate-700">{r.remarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        {/* Cumulative Summary */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Courses</span>
            <span className="text-base font-bold text-slate-900">{count} Courses</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Cumulative GPA</span>
            <span className="text-base font-extrabold text-emerald-800 font-mono">
              {gpa.toFixed(2)} / 4.00
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Academic Standing</span>
            <span className="text-sm font-bold text-amber-800">{division}</span>
          </div>
        </div>

        {/* Seal */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-800 block">{settings.headmaster_name}</span>
            <span>Headmaster / Chairman, Academic Board</span>
          </div>
          <div className="text-center font-bold text-amber-700 font-mono text-[11px]">
            &bull; CERTIFIED OFFICIAL DOCUMENT &bull;
          </div>
        </div>
      </div>
    </div>
  );
};
