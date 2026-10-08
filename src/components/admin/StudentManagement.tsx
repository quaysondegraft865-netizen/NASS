import React, { useState, useMemo } from 'react';
import { Student, SchoolClass, User } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Printer,
  X,
  UserCheck,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface StudentManagementProps {
  students: Student[];
  classes: SchoolClass[];
  currentUser: User;
  onSaveStudent: (student: Omit<Student, 'id'> & { id?: number }) => void;
  onDeleteStudent: (id: number) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  classes,
  currentUser,
  onSaveStudent,
  onDeleteStudent,
}) => {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedProgramme, setSelectedProgramme] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Form State
  const initialFormState = {
    student_id: '',
    admission_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: 'Male' as 'Male' | 'Female',
    date_of_birth: '2008-01-01',
    nationality: 'Ghanaian',
    phone: '',
    email: '',
    address: '',
    guardian_name: '',
    guardian_phone: '',
    class_id: classes[0]?.id || 1,
    programme: 'Agricultural Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'active' as const,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admission_number.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClass = selectedClass === 'all' || s.class_id === Number(selectedClass);
      const matchProgramme = selectedProgramme === 'all' || s.programme === selectedProgramme;
      const matchStatus = selectedStatus === 'all' || s.status === selectedStatus;

      return matchSearch && matchClass && matchProgramme && matchStatus;
    });
  }, [students, searchTerm, selectedClass, selectedProgramme, selectedStatus]);

  // Paginated students
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    const nextNum = Math.floor(100 + Math.random() * 900);
    setFormData({
      ...initialFormState,
      student_id: `NASS/2025/${nextNum}`,
      admission_number: `250${nextNum}`,
      class_id: classes[0]?.id || 1
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      student_id: student.student_id,
      admission_number: student.admission_number,
      first_name: student.first_name,
      middle_name: student.middle_name || '',
      last_name: student.last_name,
      gender: student.gender,
      date_of_birth: student.date_of_birth,
      nationality: student.nationality,
      phone: student.phone || '',
      email: student.email || '',
      address: student.address || '',
      guardian_name: student.guardian_name,
      guardian_phone: student.guardian_phone,
      class_id: student.class_id,
      programme: student.programme,
      year_group: student.year_group,
      admission_year: student.admission_year,
      graduation_year: student.graduation_year,
      photo: student.photo || '',
      status: student.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.student_id) {
      alert('Please fill in required fields (Name and Student ID)');
      return;
    }

    onSaveStudent({
      ...formData,
      id: editingStudent ? editingStudent.id : undefined,
    });

    setIsFormOpen(false);
  };

  const programmesList = [
    'Agricultural Science',
    'General Science',
    'General Arts',
    'Business',
    'Home Economics',
    'Visual Arts',
  ];

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-800" />
            <span>Student Information Directory</span>
          </h2>
          <p className="text-xs text-slate-500">
            Total of {students.length} students enrolled across SHS 1 to SHS 3 programmes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, ID, admission..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {/* Class Filter */}
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
        >
          <option value="all">All Classes & Streams</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.class_name}</option>
          ))}
        </select>

        {/* Programme Filter */}
        <select
          value={selectedProgramme}
          onChange={(e) => {
            setSelectedProgramme(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
        >
          <option value="all">All Academic Programmes</option>
          {programmesList.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active Enrolled</option>
          <option value="graduated">Graduated Alumni</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID / Adm. No</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 italic">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map(student => {
                  const classObj = classes.find(c => c.id === student.class_id);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-[#0f3d24] text-amber-300 font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-950">
                            {student.first_name[0]}{student.last_name[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {student.first_name} {student.middle_name ? student.middle_name + ' ' : ''}{student.last_name}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {student.gender} &bull; DOB: {student.date_of_birth}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono font-medium text-emerald-900">{student.student_id}</div>
                        <div className="text-[10px] text-slate-400">Adm: {student.admission_number}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium">{classObj ? classObj.class_name : 'N/A'}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-slate-700">{student.programme}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-slate-800">{student.guardian_name}</div>
                        <div className="text-[10px] text-slate-500">{student.guardian_phone}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : student.status === 'graduated'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {student.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingStudent(student)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100 cursor-pointer"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(student)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-100 cursor-pointer"
                            title="Edit Student"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete student ${student.first_name} ${student.last_name}?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                            title="Delete Student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold">{filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of{' '}
            <span className="font-semibold">{filteredStudents.length}</span> students
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 disabled:opacity-40 hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded border border-slate-200 disabled:opacity-40 hover:bg-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-800" />
                <span>{editingStudent ? 'Edit Student Record' : 'Enroll New Student'}</span>
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.student_id}
                    onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    placeholder="e.g. NASS/2025/001"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admission Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.admission_number}
                    onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    placeholder="e.g. 250601"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middle_name}
                    onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Class *</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">Academic Programme *</label>
                  <select
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {programmesList.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardian_name}
                    onChange={(e) => setFormData({ ...formData, guardian_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Mr. Emmanuel Mensah"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardian_phone}
                    onChange={(e) => setFormData({ ...formData, guardian_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="+233 24 555 1201"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. House No. 14, Nkroful Township, Western Region"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Enrollment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="active">Active Enrolled</option>
                    <option value="graduated">Graduated Alumni</option>
                    <option value="transferred">Transferred</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  {editingStudent ? 'Update Student Record' : 'Save & Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Full Student Profile Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 relative">
            <button
              onClick={() => setViewingStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <SchoolCrest size="sm" showText={false} />
                <div>
                  <div className="font-serif font-black text-xs text-[#0f3d24] leading-tight">
                    NKROFUL AGRIC SENIOR HIGH SCHOOL
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Student Academic Profile Dossier &bull; Ghana Education Service
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-md bg-[#0f3d24] text-amber-300 font-bold text-base flex items-center justify-center border-2 border-emerald-950 shadow-xs shrink-0">
                {viewingStudent.first_name[0]}{viewingStudent.last_name[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  {viewingStudent.first_name} {viewingStudent.middle_name ? viewingStudent.middle_name + ' ' : ''}{viewingStudent.last_name}
                </h3>
                <div className="font-mono text-xs font-semibold text-emerald-800">
                  {viewingStudent.student_id} &bull; Adm: {viewingStudent.admission_number}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {viewingStudent.programme} &bull; Group {viewingStudent.year_group}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Gender & Age</span>
                <span className="font-semibold text-slate-800">{viewingStudent.gender} &bull; {viewingStudent.date_of_birth}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Stream</span>
                <span className="font-semibold text-slate-800">
                  {classes.find(c => c.id === viewingStudent.class_id)?.class_name || 'N/A'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian Details</span>
                <span className="font-semibold text-slate-800">{viewingStudent.guardian_name}</span>
                <span className="block text-slate-600 text-[11px]">{viewingStudent.guardian_phone}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                <span className="font-semibold text-emerald-800 uppercase">{viewingStudent.status}</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Residential Address</span>
              <span className="text-slate-700">{viewingStudent.address || 'Nkroful, Western Region'}</span>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Profile Card</span>
              </button>
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
