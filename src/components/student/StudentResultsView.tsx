import React, { useState } from 'react';
import { Student, ResultRecord, Subject, SchoolClass, AcademicYear, Term, SchoolSettings } from '../../types';
import { FileText, Download, Printer, Calendar } from 'lucide-react';
import { generateReportCardPDF } from '../../utils/pdfGenerator';

interface StudentResultsViewProps {
  currentStudent: Student;
  results: ResultRecord[];
  subjects: Subject[];
  classes: SchoolClass[];
  years: AcademicYear[];
  terms: Term[];
  settings: SchoolSettings;
}

export const StudentResultsView: React.FC<StudentResultsViewProps> = ({
  currentStudent,
  results,
  subjects,
  classes,
  years,
  terms,
  settings,
}) => {
  const [selectedYearId, setSelectedYearId] = useState<number>(years.find(y => y.is_current)?.id || 3);
  const [selectedTermId, setSelectedTermId] = useState<number>(terms.find(t => t.is_current)?.id || 7);

  const studentClass = classes.find(c => c.id === currentStudent.class_id);
  const currentYearObj = years.find(y => y.id === selectedYearId);
  const currentTermObj = terms.find(t => t.id === selectedTermId);

  // Student approved results for chosen term
  const termResults = results.filter(
    r => r.student_id === currentStudent.id &&
         r.academic_year_id === selectedYearId &&
         r.term_id === selectedTermId &&
         (r.status === 'approved' || r.status === 'published')
  );

  const totalScore = termResults.reduce((acc, r) => acc + r.total_score, 0);
  const averageScore = termResults.length > 0 ? (totalScore / termResults.length).toFixed(1) : '0.0';

  const handleDownloadPDF = () => {
    generateReportCardPDF(
      currentStudent,
      settings,
      studentClass,
      currentTermObj,
      currentYearObj,
      termResults,
      subjects,
      'Satisfactory academic progress and disciplined behavior.',
      'Promoted in good standing.',
      '58 / 60 days'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <span>My Terminal Examination Results</span>
          </h2>
          <p className="text-xs text-slate-500">
            View verified continuous assessment marks and terminal examination breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleDownloadPDF}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download Report Card PDF</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Results</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 text-xs">
        <div className="flex-1">
          <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
          <select
            value={selectedYearId}
            onChange={(e) => setSelectedYearId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {years.map(y => (
              <option key={y.id} value={y.id}>{y.year_name} {y.is_current ? '(Active)' : ''}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-slate-700 mb-1">Term</label>
          <select
            value={selectedTermId}
            onChange={(e) => setSelectedTermId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {terms
              .filter(t => t.academic_year_id === selectedYearId)
              .map(t => (
                <option key={t.id} value={t.id}>{t.term_name} {t.is_current ? '(Active)' : ''}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Results Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between text-xs">
          <div className="font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{currentYearObj?.year_name} &bull; {currentTermObj?.term_name}</span>
          </div>
          <div className="text-amber-300 font-bold">
            Average Score: {averageScore}%
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 text-center">Class Score (30%)</th>
                <th className="py-3 px-4 text-center">Exam Score (70%)</th>
                <th className="py-3 px-4 text-center">Total (100%)</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Grade Point</th>
                <th className="py-3 px-4">Performance Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {termResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    No approved terminal marks published for this term yet.
                  </td>
                </tr>
              ) : (
                termResults.map(r => {
                  const sub = subjects.find(s => s.id === r.subject_id);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {sub?.subject_name}
                      </td>
                      <td className="py-3 px-4 text-center">{r.assessment_score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center">{r.exam_score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center font-extrabold text-slate-900">{r.total_score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                          r.grade === 'A1' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {r.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-700">{r.grade_point}</td>
                      <td className="py-3 px-4 text-slate-700">{r.remarks}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
