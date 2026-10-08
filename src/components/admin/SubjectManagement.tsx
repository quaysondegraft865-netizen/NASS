import React, { useState } from 'react';
import { Subject, User } from '../../types';
import { BookOpen, Plus, Edit2, Trash2, X } from 'lucide-react';

interface SubjectManagementProps {
  subjects: Subject[];
  currentUser: User;
  onSaveSubject: (sub: Omit<Subject, 'id'> & { id?: number }) => void;
  onDeleteSubject: (id: number) => void;
}

export const SubjectManagement: React.FC<SubjectManagementProps> = ({
  subjects,
  currentUser,
  onSaveSubject,
  onDeleteSubject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subject | null>(null);

  const initialForm = {
    subject_code: '',
    subject_name: '',
    department: 'Science',
    programme: 'Core / All Programmes',
    is_core: true,
    credit_hours: 3,
    status: 'active' as const
  };

  const [formData, setFormData] = useState(initialForm);

  const filtered = subjects.filter(s => {
    const matchSearch =
      s.subject_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'all' || s.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleOpenAdd = () => {
    setEditingSub(null);
    setFormData(initialForm);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (s: Subject) => {
    setEditingSub(s);
    setFormData({
      subject_code: s.subject_code,
      subject_name: s.subject_name,
      department: s.department,
      programme: s.programme,
      is_core: s.is_core,
      credit_hours: s.credit_hours || 3,
      status: s.status
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject_code || !formData.subject_name) return;
    onSaveSubject({
      ...formData,
      id: editingSub ? editingSub.id : undefined
    });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <span>Curriculum & Subject Catalog</span>
          </h2>
          <p className="text-xs text-slate-500">
            Official WAEC syllabus courses, core subjects, and elective tracks.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by subject code or name..."
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
          <option value="Languages">Languages</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Social Sciences">Social Sciences</option>
          <option value="Business">Business</option>
          <option value="ICT">ICT</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Subject Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Target Programme</th>
              <th className="py-3 px-4 text-center">Credit Hours</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-mono font-bold text-emerald-800">{sub.subject_code}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{sub.subject_name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sub.is_core ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                  }`}>
                    {sub.is_core ? 'CORE' : 'ELECTIVE'}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{sub.department}</td>
                <td className="py-3 px-4 text-slate-600">{sub.programme}</td>
                <td className="py-3 px-4 text-center font-medium">{sub.credit_hours || 3} hrs/wk</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleOpenEdit(sub)}
                      className="p-1.5 text-slate-500 hover:text-blue-700 rounded hover:bg-slate-50 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete subject ${sub.subject_name}?`)) {
                          onDeleteSubject(sub.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingSub ? 'Edit Subject' : 'Add Subject'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject_code}
                    onChange={(e) => setFormData({ ...formData, subject_code: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg uppercase"
                    placeholder="e.g. AGR204"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Type</label>
                  <select
                    value={formData.is_core ? 'core' : 'elective'}
                    onChange={(e) => setFormData({ ...formData, is_core: e.target.value === 'core' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="core">Core Subject</option>
                    <option value="elective">Elective Subject</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  value={formData.subject_name}
                  onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Fisheries & Aquaculture"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Business">Business</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Credit Hours / Wk</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.credit_hours}
                    onChange={(e) => setFormData({ ...formData, credit_hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Programme</label>
                <input
                  type="text"
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Core / All Programmes"
                />
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
