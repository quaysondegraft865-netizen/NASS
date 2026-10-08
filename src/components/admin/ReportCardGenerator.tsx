import React, { useState } from 'react';
import {
  Student,
  ResultRecord,
  Subject,
  SchoolClass,
  AcademicYear,
  Term,
  SchoolSettings
} from '../../types';
import { FileText, Download, Printer, User, Award, CheckCircle } from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { generateReportCardPDF } from '../../utils/pdfGenerator';

interface ReportCardGeneratorProps {
  students: Student[];
  results: ResultRecord[];
  subjects: Subject[];
  classes: SchoolClass[];
  years: AcademicYear[];
  terms: Term[];
  settings: SchoolSettings;
}

export const ReportCardGenerator: React.FC<ReportCardGeneratorProps> = ({
  students,
  results,
  subjects,
  classes,
  years,
  terms,
  settings,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[0]?.id || 1);
  const [selectedYearId, setSelectedYearId] = useState<number>(years.find(y => y.is_current)?.id || 3);
  const [selectedTermId, setSelectedTermId] = useState<number>(terms.find(t => t.is_current)?.id || 7);

  const [attendance, setAttendance] = useState('58 / 60 days');
  const [teacherRemark, setTeacherRemark] = useState('Satisfactory academic focus and good classroom demeanor.');
  const [headmasterRemark, setHeadmasterRemark] = useState('Promoted with good standing. Maintain this diligence.');

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentClass = classes.find(c => c.id === selectedStudent?.class_id);
  const selectedYear = years.find(y => y.id === selectedYearId);
  const selectedTerm = terms.find(t => t.id === selectedTermId);

  // Term results for student
  const termResults = results.filter(
    r => r.student_id === selectedStudentId &&
         r.academic_year_id === selectedYearId &&
         r.term_id === selectedTermId
  );

  const totalScore = termResults.reduce((acc, r) => acc + r.total_score, 0);
  const averageScore = termResults.length > 0 ? (totalScore / termResults.length).toFixed(1) : '0.0';

  const handleDownloadPDF = () => {
    if (!selectedStudent) return;
    generateReportCardPDF(
      selectedStudent,
      settings,
      studentClass,
      selectedTerm,
      selectedYear,
      termResults,
      subjects,
      teacherRemark,
      headmasterRemark,
      attendance
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <span>Terminal Student Report Cards</span>
          </h2>
          <p className="text-xs text-slate-500">
            Generate continuous terminal reports with teacher remarks, headmaster approvals, and attendance records.
          </p>
        </div>

        {selectedStudent && (
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
              <span>Print</span>
            </button>
          </div>
        )}
      </div>

      {/* Selector Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.last_name} ({s.student_id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
          <select
            value={selectedYearId}
            onChange={(e) => setSelectedYearId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {years.map(y => (
              <option key={y.id} value={y.id}>{y.year_name} {y.is_current ? '(Current)' : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Academic Term</label>
          <select
            value={selectedTermId}
            onChange={(e) => setSelectedTermId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {terms
              .filter(t => t.academic_year_id === selectedYearId)
              .map(t => (
                <option key={t.id} value={t.id}>{t.term_name} {t.is_current ? '(Current)' : ''}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Editable Report Details */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Terminal Attendance</label>
          <input
            type="text"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            placeholder="e.g. 58 / 60 days"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Class Teacher Remark</label>
          <input
            type="text"
            value={teacherRemark}
            onChange={(e) => setTeacherRemark(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Headmaster Remark</label>
          <input
            type="text"
            value={headmasterRemark}
            onChange={(e) => setHeadmasterRemark(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Terminal Report Card Preview */}
      {selectedStudent && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto print:border-none print:shadow-none">
          {/* Header */}
          <div className="flex flex-col items-center text-center pb-4 border-b-2 border-emerald-900">
            <div className="mb-2">
              <SchoolCrest size="lg" showText={false} />
            </div>
            <div className="text-amber-800 font-bold text-[11px] tracking-widest uppercase mb-0.5">
              GHANA EDUCATION SERVICE &bull; WESTERN REGION
            </div>
            <h1 className="text-xl font-black text-[#0f3d24] font-serif tracking-tight">
              {settings.school_name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{settings.address} &bull; {settings.phone}</p>
            <div className="mt-2.5 inline-block bg-[#0f3d24] text-white font-serif font-bold text-xs px-4 py-1 rounded">
              TERMINAL REPORT CARD &bull; {selectedYear?.year_name} &bull; {selectedTerm?.term_name}
            </div>
          </div>

          {/* Student Info */}
          <div className="my-4 p-3 bg-slate-50 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
              <span className="font-bold text-slate-900">{selectedStudent.first_name} {selectedStudent.last_name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Student ID</span>
              <span className="font-mono font-medium text-emerald-800">{selectedStudent.student_id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Stream</span>
              <span className="font-medium text-slate-800">{studentClass?.class_name || 'Class'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance</span>
              <span className="font-medium text-slate-800">{attendance}</span>
            </div>
          </div>

          {/* Marks Table */}
          <table className="w-full text-left text-xs border border-slate-200 mt-4">
            <thead>
              <tr className="bg-emerald-900 text-white font-semibold">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3 text-center">Class Score (30)</th>
                <th className="py-2.5 px-3 text-center">Exam Score (70)</th>
                <th className="py-2.5 px-3 text-center">Total (100)</th>
                <th className="py-2.5 px-3 text-center">Grade</th>
                <th className="py-2.5 px-3">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {termResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                    No approved examination marks recorded for this student in {selectedTerm?.term_name} {selectedYear?.year_name}.
                  </td>
                </tr>
              ) : (
                termResults.map(r => {
                  const sub = subjects.find(s => s.id === r.subject_id);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-900">{sub?.subject_name}</td>
                      <td className="py-2 px-3 text-center">{r.assessment_score.toFixed(1)}</td>
                      <td className="py-2 px-3 text-center">{r.exam_score.toFixed(1)}</td>
                      <td className="py-2 px-3 text-center font-bold text-slate-900">{r.total_score.toFixed(1)}</td>
                      <td className="py-2 px-3 text-center font-bold text-emerald-800">{r.grade}</td>
                      <td className="py-2 px-3 text-slate-600">{r.remarks}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Average & Remarks */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-700">TERMINAL AVERAGE SCORE:</span>
              <span className="text-base font-extrabold text-emerald-800">{averageScore}%</span>
            </div>

            <div>
              <span className="font-bold text-slate-700 block">Class Teacher's Remarks:</span>
              <p className="text-slate-600 italic">"{teacherRemark}"</p>
            </div>

            <div>
              <span className="font-bold text-emerald-900 block">Headmaster's General Remarks:</span>
              <p className="text-slate-600 italic">"{headmasterRemark}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
