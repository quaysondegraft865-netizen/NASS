import React, { useState } from 'react';
import { SchoolClass, Teacher, AcademicYear, User } from '../../types';
import { Layers, Plus, Edit2, Trash2, X } from 'lucide-react';

interface ClassManagementProps {
  classes: SchoolClass[];
  teachers: Teacher[];
  years: AcademicYear[];
  currentUser: User;
  onSaveClass: (c: Omit<SchoolClass, 'id'> & { id?: number }) => void;
  onDeleteClass: (id: number) => void;
}

export const ClassManagement: React.FC<ClassManagementProps> = ({
  classes,
  teachers,
  years,
  currentUser,
  onSaveClass,
  onDeleteClass
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);

  const initialForm = {
    class_name: '',
    form_level: 'SHS 1' as const,
    programme: 'Agricultural Science',
    academic_year_id: years[0]?.id || 1,
    room_number: '',
    class_teacher_id: teachers[0]?.id,
    status: 'active' as const,
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingClass(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (c: SchoolClass) => {
    setEditingClass(c);
    setFormData({
      class_name: c.class_name,
      form_level: c.form_level,
      programme: c.programme,
      academic_year_id: c.academic_year_id,
      room_number: c.room_number || '',
      class_teacher_id: c.class_teacher_id,
      status: c.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class_name) return;
    onSaveClass({
      ...formData,
      id: editingClass ? editingClass.id : undefined,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-800" />
            <span>Class & Stream Structure</span>
          </h2>
          <p className="text-xs text-slate-500">
            Define Form levels (SHS 1, SHS 2, SHS 3), assigned class tutors, and rooms.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map(c => {
          const tutor = teachers.find(t => t.id === c.class_teacher_id);
          return (
            <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {c.form_level}
                  </span>
                  <span className="text-xs text-slate-400">{c.room_number || 'Room unassigned'}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{c.class_name}</h3>
                <p className="text-xs text-amber-700 font-medium">{c.programme}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Tutor:</span>
                  <span className="font-medium text-slate-800">
                    {tutor ? `${tutor.first_name} ${tutor.last_name} (${tutor.department})` : 'None assigned'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-1">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-50 cursor-pointer"
                  title="Edit Class"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove class ${c.class_name}?`)) {
                      onDeleteClass(c.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                  title="Delete Class"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingClass ? 'Edit Class Stream' : 'Add New Class Stream'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class Name *</label>
                <input
                  type="text"
                  required
                  value={formData.class_name}
                  onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. SHS 1 Agric 1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Form Level *</label>
                  <select
                    value={formData.form_level}
                    onChange={(e) => setFormData({ ...formData, form_level: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="SHS 1">SHS 1</option>
                    <option value="SHS 2">SHS 2</option>
                    <option value="SHS 3">SHS 3</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room / Hall</label>
                  <input
                    type="text"
                    value={formData.room_number}
                    onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Block A - 02"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Programme *</label>
                <select
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Agricultural Science">Agricultural Science</option>
                  <option value="General Science">General Science</option>
                  <option value="General Arts">General Arts</option>
                  <option value="Business">Business</option>
                  <option value="Home Economics">Home Economics</option>
                  <option value="Visual Arts">Visual Arts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Class Tutor</label>
                <select
                  value={formData.class_teacher_id || ''}
                  onChange={(e) => setFormData({ ...formData, class_teacher_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.first_name} {t.last_name} ({t.department})</option>
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
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
