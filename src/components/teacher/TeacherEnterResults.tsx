import React, { useState, useEffect } from 'react';
import {
  Teacher,
  TeacherAssignment,
  Subject,
  SchoolClass,
  Student,
  ResultRecord,
  AcademicYear,
  Term,
  SchoolSettings,
  User
} from '../../types';
import { Edit3, Check, Save, Send, AlertCircle } from 'lucide-react';
import { calculateGrade, calculateTotalScore } from '../../utils/gradeCalculator';

interface TeacherEnterResultsProps {
  currentTeacher: Teacher;
  assignments: TeacherAssignment[];
  subjects: Subject[];
  classes: SchoolClass[];
  students: Student[];
  results: ResultRecord[];
  years: AcademicYear[];
  terms: Term[];
  settings: SchoolSettings;
  currentUser: User;
  onSaveResults: (results: (Omit<ResultRecord, 'id'> & { id?: number })[]) => void;
}

interface MarksEntryRow {
  student_id: number;
  student_number: string;
  student_name: string;
  result_id?: number;
  assessment: number;
  exam: number;
  total: number;
  grade: string;
  grade_point: number;
  remarks: string;
  status: ResultRecord['status'];
}

export const TeacherEnterResults: React.FC<TeacherEnterResultsProps> = ({
  currentTeacher,
  assignments,
  subjects,
  classes,
  students,
  results,
  years,
  terms,
  settings,
  currentUser,
  onSaveResults,
}) => {
  const teacherAssignments = assignments.filter(a => a.teacher_id === currentTeacher.id);

  // Selection states
  const [selectedYearId, setSelectedYearId] = useState<number>(years.find(y => y.is_current)?.id || 3);
  const [selectedTermId, setSelectedTermId] = useState<number>(terms.find(t => t.is_current)?.id || 7);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number>(teacherAssignments[0]?.id || 1);

  const selectedAssignment = teacherAssignments.find(a => a.id === selectedAssignmentId) || teacherAssignments[0];
  const targetClass = classes.find(c => c.id === selectedAssignment?.class_id);
  const targetSubject = subjects.find(s => s.id === selectedAssignment?.subject_id);

  // Rows of marks for this class & subject
  const [marksRows, setMarksRows] = useState<MarksEntryRow[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Populate students for selected class & load existing results
  useEffect(() => {
    if (!targetClass || !targetSubject) return;

    const classStudents = students.filter(s => s.class_id === targetClass.id);

    const rows: MarksEntryRow[] = classStudents.map(stu => {
      // Find existing record
      const existing = results.find(
        r => r.student_id === stu.id &&
             r.subject_id === targetSubject.id &&
             r.class_id === targetClass.id &&
             r.academic_year_id === selectedYearId &&
             r.term_id === selectedTermId
      );

      const assess = existing ? existing.assessment_score : 0;
      const ex = existing ? existing.exam_score : 0;
      const tot = existing ? existing.total_score : calculateTotalScore(assess, ex);
      const gradeObj = calculateGrade(tot, settings.grading_rules);

      return {
        student_id: stu.id,
        student_number: stu.student_id,
        student_name: `${stu.first_name} ${stu.last_name}`,
        result_id: existing?.id,
        assessment: assess,
        exam: ex,
        total: tot,
        grade: existing ? existing.grade : gradeObj.grade,
        grade_point: existing ? existing.grade_point : gradeObj.gradePoint,
        remarks: existing ? existing.remarks : gradeObj.remark,
        status: existing ? existing.status : 'draft'
      };
    });

    setMarksRows(rows);
  }, [selectedAssignmentId, selectedYearId, selectedTermId, students, results]);

  const handleScoreChange = (
    studentId: number,
    field: 'assessment' | 'exam',
    value: string
  ) => {
    const num = Math.max(0, parseFloat(value) || 0);

    // Validation
    const maxVal = field === 'assessment' ? settings.assessment_max_score : settings.exam_max_score;
    const clamped = Math.min(num, maxVal);

    setMarksRows(prev =>
      prev.map(row => {
        if (row.student_id !== studentId) return row;

        const newAssess = field === 'assessment' ? clamped : row.assessment;
        const newExam = field === 'exam' ? clamped : row.exam;
        const newTotal = calculateTotalScore(newAssess, newExam);
        const gradeObj = calculateGrade(newTotal, settings.grading_rules);

        return {
          ...row,
          assessment: newAssess,
          exam: newExam,
          total: newTotal,
          grade: gradeObj.grade,
          grade_point: gradeObj.gradePoint,
          remarks: gradeObj.remark
        };
      })
    );
  };

  const handleSave = (submitForApproval: boolean = false) => {
    if (!targetClass || !targetSubject) return;

    const payload = marksRows.map(row => ({
      id: row.result_id,
      student_id: row.student_id,
      subject_id: targetSubject.id,
      class_id: targetClass.id,
      academic_year_id: selectedYearId,
      term_id: selectedTermId,
      assessment_score: row.assessment,
      exam_score: row.exam,
      total_score: row.total,
      grade: row.grade,
      grade_point: row.grade_point,
      remarks: row.remarks,
      teacher_id: currentTeacher.id,
      status: submitForApproval ? ('submitted' as const) : ('draft' as const),
      submitted_at: submitForApproval ? new Date().toISOString().replace('T', ' ').slice(0, 19) : undefined,
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      updated_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }));

    onSaveResults(payload);

    setToastMessage(
      submitForApproval
        ? `Successfully submitted marksheet for ${targetSubject.subject_name} to Headmaster for approval!`
        : `Draft marks saved successfully.`
    );

    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-800" />
            <span>Terminal Examination Marksheet Entry</span>
          </h2>
          <p className="text-xs text-slate-500">
            Enter Continuous Assessment (Max: {settings.assessment_max_score}%) and Terminal Exam (Max: {settings.exam_max_score}%).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleSave(false)}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={() => handleSave(true)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>Submit for Approval</span>
          </button>
        </div>
      </div>

      {/* Course & Term Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">My Assigned Class & Subject *</label>
          <select
            value={selectedAssignmentId}
            onChange={(e) => setSelectedAssignmentId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium"
          >
            {teacherAssignments.map(a => {
              const sub = subjects.find(s => s.id === a.subject_id);
              const cls = classes.find(c => c.id === a.class_id);
              return (
                <option key={a.id} value={a.id}>
                  {sub?.subject_name} &bull; {cls?.class_name}
                </option>
              );
            })}
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
              <option key={y.id} value={y.id}>{y.year_name} {y.is_current ? '(Active)' : ''}</option>
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
                <option key={t.id} value={t.id}>{t.term_name} {t.is_current ? '(Active)' : ''}</option>
              ))}
          </select>
        </div>
      </div>

      {/* Interactive Marksheet Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between text-xs">
          <div>
            <span className="font-bold">{targetSubject?.subject_name}</span> &bull;{' '}
            <span className="text-amber-300 font-medium">{targetClass?.class_name}</span>
          </div>
          <div className="text-[11px] text-emerald-200">
            Total Students: <strong className="text-white">{marksRows.length}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Student Full Name</th>
                <th className="py-3 px-4 text-center">Class Wk ({settings.assessment_max_score}%)</th>
                <th className="py-3 px-4 text-center">Exam ({settings.exam_max_score}%)</th>
                <th className="py-3 px-4 text-center">Total (100%)</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Grade Pt</th>
                <th className="py-3 px-4">Remark</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {marksRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 italic">
                    No students currently enrolled in {targetClass?.class_name}.
                  </td>
                </tr>
              ) : (
                marksRows.map(row => (
                  <tr key={row.student_id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-4 font-mono font-medium text-emerald-900">
                      {row.student_number}
                    </td>

                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      {row.student_name}
                    </td>

                    {/* Assessment input */}
                    <td className="py-2.5 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={settings.assessment_max_score}
                        step="0.5"
                        value={row.assessment === 0 ? '' : row.assessment}
                        placeholder="0.0"
                        onChange={(e) => handleScoreChange(row.student_id, 'assessment', e.target.value)}
                        className="w-20 text-center py-1 px-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-700 font-bold text-slate-800"
                      />
                    </td>

                    {/* Exam input */}
                    <td className="py-2.5 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max={settings.exam_max_score}
                        step="0.5"
                        value={row.exam === 0 ? '' : row.exam}
                        placeholder="0.0"
                        onChange={(e) => handleScoreChange(row.student_id, 'exam', e.target.value)}
                        className="w-20 text-center py-1 px-2 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-700 font-bold text-slate-800"
                      />
                    </td>

                    {/* Computed Total */}
                    <td className="py-2.5 px-4 text-center font-extrabold text-sm text-slate-900">
                      {row.total.toFixed(1)}
                    </td>

                    {/* Computed Grade */}
                    <td className="py-2.5 px-4 text-center">
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        row.grade === 'A1'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.grade.startsWith('B')
                          ? 'bg-blue-100 text-blue-800'
                          : row.grade === 'F9'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {row.grade}
                      </span>
                    </td>

                    <td className="py-2.5 px-4 text-center font-bold text-slate-700">
                      {row.grade_point}
                    </td>

                    <td className="py-2.5 px-4 text-slate-600">
                      {row.remarks}
                    </td>

                    <td className="py-2.5 px-4 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        row.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.status === 'submitted'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
