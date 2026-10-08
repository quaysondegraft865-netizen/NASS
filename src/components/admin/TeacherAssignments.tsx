import React, { useState } from 'react';
import { TeacherAssignment, Teacher, Subject, SchoolClass, AcademicYear, User } from '../../types';
import { UserCheck, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';

interface TeacherAssignmentsProps {
  assignments: TeacherAssignment[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: SchoolClass[];
  years: AcademicYear[];
  currentUser: User;
  onSaveAssignment: (assignment: Omit<TeacherAssignment, 'id'> & { id?: number }) => void;
  onDeleteAssignment: (id: number) => void;
}

export const TeacherAssignments: React.FC<TeacherAssignmentsProps> = ({
  assignments,
  teachers,
  subjects,
  classes,
  years,
  currentUser,
  onSaveAssignment,
  onDeleteAssignment
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState('all');

  const currentYear = years.find(y => y.is_current) || years[0];

  const initialForm = {
    teacher_id: teachers[0]?.id || 1,
    subject_id: subjects[0]?.id || 1,
    class_id: classes[0]?.id || 1,
    academic_year_id: currentYear?.id || 1,
  };

  const [formData, setFormData] = useState(initialForm);

  const filtered = assignments.filter(a => {
    return selectedTeacherFilter === 'all' || a.teacher_id === Number(selectedTeacherFilter);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAssignment(formData);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-800" />
            <span>Teacher Course & Class Allocations</span>
          </h2>
          <p className="text-xs text-slate-500">
            Assign Teacher &rarr; Subject &rarr; Class Stream &rarr; Academic Year.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(initialForm);
            setIsFormOpen(true);
          }}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Course Assignment</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <label className="text-xs font-semibold text-slate-700">Filter by Teacher:</label>
        <select
          value={selectedTeacherFilter}
          onChange={(e) => setSelectedTeacherFilter(e.target.value)}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white"
        >
          <option value="all">All Faculty Members ({assignments.length} assignments)</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.first_name} {t.last_name} ({t.department})</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Faculty Member</th>
              <th className="py-3 px-4">Subject Assigned</th>
              <th className="py-3 px-4">Target Class</th>
              <th className="py-3 px-4">Academic Year</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(assign => {
              const teacher = teachers.find(t => t.id === assign.teacher_id);
              const subject = subjects.find(s => s.id === assign.subject_id);
              const schoolClass = classes.find(c => c.id === assign.class_id);
              const year = years.find(y => y.id === assign.academic_year_id);

              return (
                <tr key={assign.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">
                      {teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unknown'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {teacher?.teacher_id} &bull; {teacher?.department}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">
                      {subject ? `${subject.subject_code} - ${subject.subject_name}` : 'Unknown'}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {subject?.is_core ? 'Core Subject' : 'Elective'}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                      {schoolClass ? schoolClass.class_name : 'Class'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    {year ? year.year_name : 'Current'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm('Delete this course assignment?')) {
                          onDeleteAssignment(assign.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                      title="Remove Assignment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Assign Teacher to Subject & Class</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teacher *</label>
                <select
                  value={formData.teacher_id}
                  onChange={(e) => setFormData({ ...formData, teacher_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.first_name} {t.last_name} ({t.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject *</label>
                <select
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.subject_code} - {s.subject_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Class *</label>
                <select
                  value={formData.class_id}
                  onChange={(e) => setFormData({ ...formData, class_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.class_name} ({c.form_level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Year *</label>
                <select
                  value={formData.academic_year_id}
                  onChange={(e) => setFormData({ ...formData, academic_year_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {years.map(y => (
                    <option key={y.id} value={y.id}>{y.year_name} {y.is_current ? '(Active)' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
