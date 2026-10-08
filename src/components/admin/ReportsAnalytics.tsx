import React, { useState } from 'react';
import { Student, Teacher, Subject, SchoolClass, ResultRecord, AcademicYear, Term } from '../../types';
import { BarChart3, Download, FileSpreadsheet, Users, GraduationCap, Award } from 'lucide-react';

interface ReportsAnalyticsProps {
  students: Student[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: SchoolClass[];
  results: ResultRecord[];
  years: AcademicYear[];
  terms: Term[];
}

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  students,
  teachers,
  subjects,
  classes,
  results,
  years,
  terms,
}) => {
  const [reportType, setReportType] = useState<'enrollment' | 'grades' | 'graduating'>('enrollment');

  // Export CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (reportType === 'enrollment') {
      csvContent += 'Student ID,Admission Number,First Name,Last Name,Gender,Class,Programme,Status\n';
      students.forEach(s => {
        const cls = classes.find(c => c.id === s.class_id)?.class_name || 'N/A';
        csvContent += `"${s.student_id}","${s.admission_number}","${s.first_name}","${s.last_name}","${s.gender}","${cls}","${s.programme}","${s.status}"\n`;
      });
    } else if (reportType === 'grades') {
      csvContent += 'Student ID,Student Name,Subject,Class Score,Exam Score,Total Score,Grade,Grade Point,Status\n';
      results.forEach(r => {
        const stu = students.find(s => s.id === r.student_id);
        const sub = subjects.find(s => s.id === r.subject_id);
        csvContent += `"${stu?.student_id}","${stu?.first_name} ${stu?.last_name}","${sub?.subject_name}","${r.assessment_score}","${r.exam_score}","${r.total_score}","${r.grade}","${r.grade_point}","${r.status}"\n`;
      });
    } else {
      csvContent += 'Student ID,Admission Number,Full Name,Programme,Graduation Year,Status\n';
      const grads = students.filter(s => {
        const cls = classes.find(c => c.id === s.class_id);
        return cls?.form_level === 'SHS 3';
      });
      grads.forEach(s => {
        csvContent += `"${s.student_id}","${s.admission_number}","${s.first_name} ${s.last_name}","${s.programme}","${s.graduation_year}","${s.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NASS_${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-800" />
            <span>Academic Reports & Data Analytics</span>
          </h2>
          <p className="text-xs text-slate-500">
            Generate and export institutional statistical records for Ghana Education Service (GES) and school board meetings.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Export Excel-Compatible CSV</span>
        </button>
      </div>

      {/* Report Type Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setReportType('enrollment')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            reportType === 'enrollment' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Enrollment Summary</span>
        </button>
        <button
          onClick={() => setReportType('grades')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            reportType === 'grades' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Grades & Performance</span>
        </button>
        <button
          onClick={() => setReportType('graduating')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            reportType === 'graduating' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Graduating Candidates (SHS 3)</span>
        </button>
      </div>

      {/* Report Data Preview Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          {reportType === 'enrollment' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Gender</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Programme</th>
                  <th className="py-3 px-4">Year Group</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(s => {
                  const cls = classes.find(c => c.id === s.class_id)?.class_name || 'N/A';
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-mono font-medium text-emerald-800">{s.student_id}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800">{s.first_name} {s.last_name}</td>
                      <td className="py-2.5 px-4">{s.gender}</td>
                      <td className="py-2.5 px-4">{cls}</td>
                      <td className="py-2.5 px-4">{s.programme}</td>
                      <td className="py-2.5 px-4">{s.year_group}</td>
                      <td className="py-2.5 px-4 font-bold uppercase text-[10px] text-emerald-700">{s.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {reportType === 'grades' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 text-center">Class (30%)</th>
                  <th className="py-3 px-4 text-center">Exam (70%)</th>
                  <th className="py-3 px-4 text-center">Total (100%)</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4 text-center">GP</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.slice(0, 30).map(r => {
                  const stu = students.find(s => s.id === r.student_id);
                  const sub = subjects.find(s => s.id === r.subject_id);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80">
                      <td className="py-2 px-4 font-bold text-slate-800">{stu?.first_name} {stu?.last_name}</td>
                      <td className="py-2 px-4">{sub?.subject_name}</td>
                      <td className="py-2 px-4 text-center">{r.assessment_score.toFixed(1)}</td>
                      <td className="py-2 px-4 text-center">{r.exam_score.toFixed(1)}</td>
                      <td className="py-2 px-4 text-center font-bold text-slate-900">{r.total_score.toFixed(1)}</td>
                      <td className="py-2 px-4 text-center font-bold text-emerald-800">{r.grade}</td>
                      <td className="py-2 px-4 text-center">{r.grade_point}</td>
                      <td className="py-2 px-4 font-semibold text-[10px] uppercase text-emerald-700">{r.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {reportType === 'graduating' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate ID</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Programme</th>
                  <th className="py-3 px-4">Graduation Target</th>
                  <th className="py-3 px-4">WASSCE Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students
                  .filter(s => {
                    const cls = classes.find(c => c.id === s.class_id);
                    return cls?.form_level === 'SHS 3';
                  })
                  .map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-mono font-medium text-emerald-800">{s.student_id}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800">{s.first_name} {s.last_name}</td>
                      <td className="py-2.5 px-4">{s.programme}</td>
                      <td className="py-2.5 px-4 font-medium">{s.graduation_year} (Class of 2026)</td>
                      <td className="py-2.5 px-4">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          REGISTERED CANDIDATE
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
