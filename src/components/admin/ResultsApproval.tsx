import React, { useState } from 'react';
import { ResultRecord, Student, Subject, SchoolClass, Teacher, Term, AcademicYear, User } from '../../types';
import { FileCheck, Check, X, Clock, AlertTriangle, Lock, Eye, Edit3 } from 'lucide-react';

interface ResultsApprovalProps {
  results: ResultRecord[];
  students: Student[];
  subjects: Subject[];
  classes: SchoolClass[];
  teachers: Teacher[];
  terms: Term[];
  years: AcademicYear[];
  currentUser: User;
  onUpdateStatus: (ids: number[], status: ResultRecord['status'], rejectionReason?: string) => void;
}

export const ResultsApproval: React.FC<ResultsApprovalProps> = ({
  results,
  students,
  subjects,
  classes,
  teachers,
  terms,
  years,
  currentUser,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'approved' | 'draft' | 'rejected'>('submitted');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredResults = results.filter(r => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchClass = selectedClass === 'all' || r.class_id === Number(selectedClass);
    const matchSub = selectedSubject === 'all' || r.subject_id === Number(selectedSubject);
    return matchStatus && matchClass && matchSub;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredResults.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    onUpdateStatus(selectedIds, 'approved');
    setSelectedIds([]);
  };

  const handlePublishSelected = () => {
    if (selectedIds.length === 0) return;
    onUpdateStatus(selectedIds, 'published');
    setSelectedIds([]);
  };

  const handleRejectSelected = () => {
    if (selectedIds.length === 0 || !rejectReason.trim()) return;
    onUpdateStatus(selectedIds, 'rejected', rejectReason);
    setSelectedIds([]);
    setRejectModalOpen(false);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-800" />
            <span>Terminal Examination Results Approval Workflow</span>
          </h2>
          <p className="text-xs text-slate-500">
            Review teacher continuous assessments (30%) & exam marks (70%) prior to official publication.
          </p>
        </div>

        {/* Action Buttons for Selected Batch */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            disabled={selectedIds.length === 0}
            onClick={handleApproveSelected}
            className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Approve ({selectedIds.length})</span>
          </button>
          <button
            disabled={selectedIds.length === 0}
            onClick={handlePublishSelected}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Publish to Transcripts</span>
          </button>
          <button
            disabled={selectedIds.length === 0}
            onClick={() => setRejectModalOpen(true)}
            className="bg-rose-700 hover:bg-rose-800 disabled:opacity-40 text-white font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Reject / Return</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          {[
            { id: 'submitted', label: 'Submitted (Needs Review)', count: results.filter(r => r.status === 'submitted').length },
            { id: 'approved', label: 'Approved', count: results.filter(r => r.status === 'approved').length },
            { id: 'published', label: 'Published (Locked)', count: results.filter(r => r.status === 'published').length },
            { id: 'rejected', label: 'Rejected / Returned', count: results.filter(r => r.status === 'rejected').length },
            { id: 'all', label: 'All Records', count: results.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id as any);
                setSelectedIds([]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                statusFilter === tab.id ? 'bg-emerald-950 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="all">All Class Streams</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.class_name}</option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="all">All Academic Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.subject_code} - {s.subject_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedIds.length > 0 && selectedIds.length === filteredResults.length}
                    className="rounded text-emerald-800 focus:ring-emerald-700"
                  />
                </th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Subject & Class</th>
                <th className="py-3 px-4 text-center">Class Wk (30)</th>
                <th className="py-3 px-4 text-center">Exam (70)</th>
                <th className="py-3 px-4 text-center">Total (100)</th>
                <th className="py-3 px-4 text-center">Grade / GP</th>
                <th className="py-3 px-4">Submitted By</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 italic">
                    No results found in this approval state.
                  </td>
                </tr>
              ) : (
                filteredResults.map(r => {
                  const student = students.find(s => s.id === r.student_id);
                  const subject = subjects.find(s => s.id === r.subject_id);
                  const classObj = classes.find(c => c.id === r.class_id);
                  const teacher = teachers.find(t => t.id === r.teacher_id);
                  const isSelected = selectedIds.includes(r.id);

                  return (
                    <tr key={r.id} className={`hover:bg-slate-50/80 ${isSelected ? 'bg-emerald-50/40' : ''}`}>
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(r.id)}
                          className="rounded text-emerald-800 focus:ring-emerald-700"
                        />
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {student ? `${student.first_name} ${student.last_name}` : 'Student'}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          {student?.student_id}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">
                          {subject ? subject.subject_name : 'Subject'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {classObj?.class_name}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-medium">{r.assessment_score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center font-medium">{r.exam_score.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center font-bold text-slate-900">{r.total_score.toFixed(1)}</td>

                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                          r.grade === 'A1'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.grade.startsWith('B')
                            ? 'bg-blue-100 text-blue-800'
                            : r.grade === 'F9'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {r.grade} ({r.grade_point})
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-slate-700">{teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Tutor'}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'published'
                            ? 'bg-purple-100 text-purple-800'
                            : r.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'submitted'
                            ? 'bg-amber-100 text-amber-800'
                            : r.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {r.status.toUpperCase()}
                        </span>
                        {r.rejection_reason && (
                          <div className="text-[10px] text-rose-600 mt-0.5 italic">
                            Reason: {r.rejection_reason}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {r.status === 'submitted' ? (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onUpdateStatus([r.id], 'approved')}
                              className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('State rejection reason to return to teacher:');
                                if (reason) onUpdateStatus([r.id], 'rejected', reason);
                              }}
                              className="px-2 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Return
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400">Processed</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Return Results to Teacher</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Please provide feedback explaining why this batch of {selectedIds.length} marks entries was returned (e.g. calculation discrepancy, missing student).
            </p>

            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Continuous assessment scores exceed the 30% threshold. Please recheck class work tests."
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
            ></textarea>

            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSelected}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg cursor-pointer"
              >
                Return to Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
