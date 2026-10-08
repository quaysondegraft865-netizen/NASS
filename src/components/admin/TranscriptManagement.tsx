import React, { useState } from 'react';
import {
  Student,
  ResultRecord,
  Subject,
  SchoolClass,
  AcademicYear,
  Term,
  SchoolSettings,
  TranscriptVerification,
  User
} from '../../types';
import {
  Award,
  Search,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { SchoolCrest } from '../common/SchoolCrest';
import { generateTranscriptPDF } from '../../utils/pdfGenerator';
import { gradePointToGPA, computeOverallDivision, generateTranscriptCode } from '../../utils/gradeCalculator';

interface TranscriptManagementProps {
  students: Student[];
  results: ResultRecord[];
  subjects: Subject[];
  classes: SchoolClass[];
  years: AcademicYear[];
  terms: Term[];
  settings: SchoolSettings;
  transcripts: TranscriptVerification[];
  currentUser: User;
  onSaveTranscript: (transcript: Omit<TranscriptVerification, 'id'> & { id?: number }) => void;
  onNavigateVerify: (code: string) => void;
}

export const TranscriptManagement: React.FC<TranscriptManagementProps> = ({
  students,
  results,
  subjects,
  classes,
  years,
  terms,
  settings,
  transcripts,
  currentUser,
  onSaveTranscript,
  onNavigateVerify,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[0]?.id || 1);

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentClass = classes.find(c => c.id === selectedStudent?.class_id);

  // Search filtered student selector
  const searchedStudents = students.filter(s =>
    s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admission_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Results for this student (approved or published)
  const studentResults = results.filter(
    r => r.student_id === selectedStudentId && (r.status === 'approved' || r.status === 'published')
  );

  // Group by academic year
  const activeYearsForStudent = years.filter(y =>
    studentResults.some(r => r.academic_year_id === y.id)
  );

  // GPA calculation
  let totalPoints = 0;
  let totalCourses = 0;
  studentResults.forEach(r => {
    totalPoints += gradePointToGPA(r.grade);
    totalCourses++;
  });
  const gpa = totalCourses > 0 ? totalPoints / totalCourses : 0;
  const division = computeOverallDivision(gpa);

  // Existing transcript verification record
  const existingTranscript = transcripts.find(t => t.student_id === selectedStudentId);

  const handleIssueTranscript = () => {
    if (!selectedStudent) return;
    const code = existingTranscript ? existingTranscript.transcript_code : generateTranscriptCode(selectedStudent.student_id);

    onSaveTranscript({
      transcript_code: code,
      student_id: selectedStudent.id,
      issue_date: new Date().toISOString().split('T')[0],
      issued_by: 'Academic Board & Examinations Secretariat',
      graduation_status: division,
      cumulative_gpa: Number(gpa.toFixed(2)),
      overall_remark: `Official Academic Transcript issued under authority of Nkroful Agric SHS. Overall Class Standing: ${division}`,
      status: 'valid'
    });

    // Generate & download PDF
    generateTranscriptPDF(
      selectedStudent,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-800" />
            <span>Official Academic Transcripts Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Generate, certify, and download sealed multi-year academic transcripts with unique verification codes.
          </p>
        </div>

        {selectedStudent && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleIssueTranscript}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Generate Official PDF</span>
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

      {/* Student Selector Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Type student name, student ID, or admission number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <div className="w-full md:w-80">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(Number(e.target.value))}
            className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white font-medium"
          >
            {searchedStudents.map(s => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.last_name} ({s.student_id} - {s.programme})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transcript Document Preview Paper */}
      {selectedStudent && (
        <div className="bg-white rounded-2xl border-2 border-emerald-900/40 p-8 shadow-lg max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
          {/* Official Crest & Header */}
          <div className="flex flex-col items-center text-center pb-6 border-b-2 border-emerald-900 relative">
            <div className="mb-2">
              <SchoolCrest size="xl" showText={false} />
            </div>
            <div className="text-amber-800 font-bold text-xs tracking-widest uppercase mb-1">
              REPUBLIC OF GHANA &bull; MINISTRY OF EDUCATION &bull; GHANA EDUCATION SERVICE
            </div>
            <h1 className="text-2xl font-black text-[#0f3d24] font-serif tracking-tight">
              {settings.school_name}
            </h1>
            <p className="text-xs italic text-amber-900 font-semibold mt-0.5">"{settings.motto}"</p>
            <p className="text-[11px] text-slate-500 mt-1">
              {settings.address} &bull; Tel: {settings.phone} &bull; {settings.email}
            </p>

            <div className="mt-3.5 inline-block bg-[#0f3d24] text-white font-serif font-bold text-xs px-6 py-1.5 rounded-md tracking-wider uppercase shadow-xs">
              OFFICIAL ACADEMIC TRANSCRIPT
            </div>
          </div>

          {/* Student Profile & Verification Code Header */}
          <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-xs">
            <div className="flex items-center gap-3 md:col-span-2">
              <img
                src={selectedStudent.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={selectedStudent.first_name}
                className="w-14 h-14 rounded-lg object-cover border border-slate-300"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {selectedStudent.first_name} {selectedStudent.middle_name ? selectedStudent.middle_name + ' ' : ''}{selectedStudent.last_name}
                </h3>
                <div className="font-mono text-emerald-800 font-bold">
                  {selectedStudent.student_id} &bull; Adm: {selectedStudent.admission_number}
                </div>
                <div className="text-slate-500 text-[11px]">
                  Programme: <strong className="text-slate-700">{selectedStudent.programme}</strong>
                </div>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration of Study</span>
              <span className="font-semibold text-slate-800">
                {selectedStudent.admission_year} - {selectedStudent.graduation_year} ({selectedStudent.year_group})
              </span>
              <span className="block text-slate-500 text-[11px] mt-0.5">Gender: {selectedStudent.gender}</span>
            </div>

            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Verification Ref Code</span>
              <span className="font-mono font-bold text-amber-700 text-xs block">
                {existingTranscript ? existingTranscript.transcript_code : 'Not Issued Yet'}
              </span>
              {existingTranscript && (
                <button
                  onClick={() => onNavigateVerify(existingTranscript.transcript_code)}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold mt-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verify Online</span>
                </button>
              )}
            </div>
          </div>

          {/* Academic Records Breakdown by Form Level & Academic Year */}
          <div className="space-y-6">
            {activeYearsForStudent.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-400 italic text-xs">
                No approved or published examination marks are currently recorded for this student.
              </div>
            ) : (
              activeYearsForStudent.map(year => {
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
                          <th className="py-2.5 px-4">Subject</th>
                          <th className="py-2.5 px-4">Term</th>
                          <th className="py-2.5 px-4 text-center">Class Wk (30%)</th>
                          <th className="py-2.5 px-4 text-center">Exam (70%)</th>
                          <th className="py-2.5 px-4 text-center">Total (100)</th>
                          <th className="py-2.5 px-4 text-center">Grade</th>
                          <th className="py-2.5 px-4 text-center">Grade Point</th>
                          <th className="py-2.5 px-4">Remark</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {yearResults.map(r => {
                          const sub = subjects.find(s => s.id === r.subject_id);
                          const term = terms.find(t => t.id === r.term_id);

                          return (
                            <tr key={r.id} className="hover:bg-slate-50">
                              <td className="py-2 px-4 font-medium text-slate-900">
                                {sub ? `${sub.subject_code} - ${sub.subject_name}` : 'Subject'}
                              </td>
                              <td className="py-2 px-4 text-slate-600">{term ? term.term_name : '-'}</td>
                              <td className="py-2 px-4 text-center">{r.assessment_score.toFixed(1)}</td>
                              <td className="py-2 px-4 text-center">{r.exam_score.toFixed(1)}</td>
                              <td className="py-2 px-4 text-center font-bold text-slate-900">{r.total_score.toFixed(1)}</td>
                              <td className="py-2 px-4 text-center">
                                <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                                  r.grade === 'A1' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-800'
                                }`}>
                                  {r.grade}
                                </span>
                              </td>
                              <td className="py-2 px-4 text-center font-semibold">{r.grade_point}</td>
                              <td className="py-2 px-4 text-slate-700">{r.remarks}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })
            )}
          </div>

          {/* Cumulative Performance Summary Box */}
          <div className="mt-8 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Courses Evaluated</span>
              <span className="text-base font-bold text-slate-900">{totalCourses} Subjects</span>
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

          {/* Signatures & Seal Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-center text-xs">
            <div>
              <div className="w-36 border-b border-slate-800 mx-auto mb-2"></div>
              <div className="font-bold text-slate-800">{settings.assistant_head_academic}</div>
              <div className="text-[10px] text-slate-500">Assistant Headmaster (Academic)</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-amber-600 flex flex-col items-center justify-center text-amber-700 font-bold text-[9px] shadow-xs">
                <span>OFFICIAL SEAL</span>
                <span className="text-[7px]">N.A.S.H.S</span>
                <span className="text-[7px]">EST. 1973</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Official Embossed Seal</span>
            </div>

            <div>
              <div className="w-36 border-b border-slate-800 mx-auto mb-2"></div>
              <div className="font-bold text-slate-800">{settings.headmaster_name}</div>
              <div className="text-[10px] text-slate-500">Headmaster / Chairman, Academic Board</div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 italic">
            {settings.transcript_footer}
          </div>
        </div>
      )}
    </div>
  );
};
