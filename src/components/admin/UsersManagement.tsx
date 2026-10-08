import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { UserCog, Plus, KeyRound, CheckCircle, XCircle, X } from 'lucide-react';

interface UsersManagementProps {
  users: User[];
  currentUser: User;
  onSaveUser: (userData: Omit<User, 'id'> & { id?: number }) => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({
  users,
  currentUser,
  onSaveUser,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const initialForm = {
    username: '',
    email: '',
    role: 'school_admin' as UserRole,
    status: 'active' as const,
    full_name: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email) return;

    onSaveUser({
      ...formData,
      id: editingUser ? editingUser.id : undefined,
    });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-emerald-800" />
            <span>System User Accounts & Role Permissions</span>
          </h2>
          <p className="text-xs text-slate-500">
            Control authentication credentials, administrator privileges, teacher accounts, and student portal access.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setFormData(initialForm);
            setIsFormOpen(true);
          }}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create User Account</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role Permission</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{u.username}</div>
                  <div className="text-[10px] text-slate-500">{u.full_name || 'System User'}</div>
                </td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    u.role.includes('admin')
                      ? 'bg-emerald-100 text-emerald-800'
                      : u.role === 'teacher'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {u.role.replace('_', ' ').toUpperCase()}
                  </span>
                </td>

                <td className="py-3 px-4 text-slate-600">{u.email}</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{u.created_at}</td>

                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {u.status.toUpperCase()}
                  </span>
                </td>

                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => alert(`Password for ${u.username} has been reset.`)}
                    className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 ml-auto cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Reset Password</span>
                  </button>
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
              <h3 className="font-bold text-base text-slate-900">Create New User Account</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. Mr. Samuel Darko"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="school_admin">School Administrator</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
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
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
