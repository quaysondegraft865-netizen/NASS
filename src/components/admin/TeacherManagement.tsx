import React, { useState } from 'react';
import { Teacher, TeacherAssignment, Subject, SchoolClass, User } from '../../types';
import { Users, Plus, Edit2, Trash2, KeyRound, CheckCircle, XCircle, X } from 'lucide-react';

interface TeacherManagementProps {
  teachers: Teacher[];
  assignments: TeacherAssignment[];
  subjects: Subject[];
  classes: SchoolClass[];
  currentUser: User;
  onSaveTeacher: (teacher: Omit<Teacher, 'id'> & { id?: number }) => void;
}

export const TeacherManagement: React.FC<TeacherManagementProps> = ({
  teachers,
  assignments,
  subjects,
  classes,
  currentUser,
  onSaveTeacher,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const initialForm = {
    teacher_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    username: '',
    qualification: 'B.Ed (Ghana)',
    status: 'active' as const,
  };

  const [formData, setFormData] = useState(initialForm);

  const departments = ['Mathematics', 'Languages', 'Science', 'Agriculture', 'Social Sciences', 'Business', 'ICT'];

  const filteredTeachers = teachers.filter(t => {
    const matchSearch =
      t.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teacher_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'all' || t.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    const rand = Math.floor(100 + Math.random() * 900);
    setFormData({
      ...initialForm,
      teacher_id: `TCH-${rand}`,
      username: `teacher${rand}`
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      teacher_id: teacher.teacher_id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      username: teacher.username,
      qualification: teacher.qualification || '',
      status: teacher.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.teacher_id) {
      alert('Please fill in required fields');
      return;
    }
    onSaveTeacher({
      ...formData,
      id: editingTeacher ? editingTeacher.id : undefined,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-800" />
            <span>Academic Faculty & Teaching Staff</span>
          </h2>
          <p className="text-xs text-slate-500">
            Manage subject teachers, department heads, and course allocations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, teacher ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white"
        >
          <option value="all">All Departments</option>
          {departments.map(d => (
            <option key={d} value={d}>{d} Department</option>
          ))}
        </select>
      </div>

      {/* Teacher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map(teacher => {
          const teacherAssignments = assignments.filter(a => a.teacher_id === teacher.id);

          return (
            <div key={teacher.id} className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 hover:border-emerald-700/50 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-1">
                    {teacher.teacher_id}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {teacher.first_name} {teacher.last_name}
                  </h3>
                  <div className="text-xs text-amber-700 font-semibold">{teacher.department} Department</div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  teacher.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {teacher.status.toUpperCase()}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Username:</span>
                  <span className="font-mono text-slate-800">{teacher.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="truncate max-w-[170px]">{teacher.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qualification:</span>
                  <span className="font-medium text-slate-800">{teacher.qualification || 'B.Ed Degree'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Allocated Courses:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {teacherAssignments.length} Classes Assigned
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => alert(`Password for ${teacher.username} has been reset to: Teacher@123`)}
                  className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                  title="Reset Password"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Reset Pwd</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(teacher)}
                    className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-50 cursor-pointer"
                    title="Edit Teacher"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      const newStatus = teacher.status === 'active' ? 'inactive' : 'active';
                      onSaveTeacher({ ...teacher, status: newStatus });
                    }}
                    className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-50 cursor-pointer"
                    title="Toggle Active Status"
                  >
                    {teacher.status === 'active' ? (
                      <XCircle className="w-3.5 h-3.5 text-amber-600" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingTeacher ? 'Edit Faculty Details' : 'Add New Faculty Member'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teacher ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.teacher_id}
                    onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. B.Sc Agriculture (KNUST)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
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
                  {editingTeacher ? 'Update Teacher' : 'Save Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
