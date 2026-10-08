import React from 'react';
import { Teacher, TeacherAssignment, Subject, SchoolClass, Student, ResultRecord } from '../../types';
import {
  ClipboardList,
  Edit3,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface TeacherDashboardProps {
  currentTeacher: Teacher;
  assignments: TeacherAssignment[];
  subjects: Subject[];
  classes: SchoolClass[];
  students: Student[];
  results: ResultRecord[];
  onNavigate: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentTeacher,
  assignments,
  subjects,
  classes,
  students,
  results,
  onNavigate,
}) => {
  const teacherAssignments = assignments.filter(a => a.teacher_id === currentTeacher.id);
  const teacherResults = results.filter(r => r.teacher_id === currentTeacher.id);

  const pendingCount = teacherResults.filter(r => r.status === 'submitted').length;
  const approvedCount = teacherResults.filter(r => r.status === 'approved' || r.status === 'published').length;
  const draftCount = teacherResults.filter(r => r.status === 'draft').length;

  return (
    <div className="space-y-6">
      {/* Faculty Profile Card */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
            <span className="font-semibold text-emerald-800">Academic Faculty &amp; Teaching Staff</span>
            <span>&bull;</span>
            <span>Staff ID: {currentTeacher.teacher_id}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 font-serif">
            {currentTeacher.first_name} {currentTeacher.last_name}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Department of {currentTeacher.department} &bull; {currentTeacher.qualification || 'B.Ed Degree'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('enter_results')}
          className="bg-[#0f3d24] hover:bg-[#0c2f1c] text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto shadow-xs"
        >
          <Edit3 className="w-4 h-4 text-amber-300" />
          <span>Enter Terminal Marks</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">My Assigned Course Streams</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{teacherAssignments.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Class subjects allocated by Admin</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Marks Pending Certification</div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{pendingCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Submitted for Headmaster approval</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-slate-500 text-xs font-semibold mb-1">Certified Marks Records</div>
          <div className="text-2xl font-bold text-emerald-800 tabular-nums">{approvedCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Approved for official transcripts</div>
        </div>
      </div>

      {/* Allocated Classes List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-sm text-slate-900">Current Teaching Allocations</h2>
            <p className="text-xs text-slate-500">Classes and subjects assigned for continuous assessment entry</p>
          </div>
          <span className="text-xs text-slate-600 font-medium">
            2025/2026 Academic Session
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teacherAssignments.map(a => {
            const sub = subjects.find(s => s.id === a.subject_id);
            const cls = classes.find(c => c.id === a.class_id);
            const classStudents = students.filter(s => s.class_id === a.class_id);

            return (
              <div key={a.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{sub?.subject_name}</div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">{cls?.class_name} ({cls?.form_level})</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {classStudents.length} Students Registered &bull; Code: {sub?.subject_code}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('enter_results')}
                  className="px-3 py-2 bg-[#0f3d24] text-white rounded-lg hover:bg-[#0c2f1c] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Enter Marks</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
