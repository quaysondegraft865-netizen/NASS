import React, { useState } from 'react';
import { AuditLog } from '../../types';
import { History, Shield, Search, Calendar, UserCheck, Terminal } from 'lucide-react';

interface AuditLogsPageProps {
  logs: AuditLog[];
}

export const AuditLogsPage: React.FC<AuditLogsPageProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(l =>
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.ip_address.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-800" />
            <span>Security & System Activity Audit Trail</span>
          </h2>
          <p className="text-xs text-slate-500">
            Immutable log of student modifications, marks submissions, headmaster approvals, and sealed credentials.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter audit logs by action, username, description, IP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs outline-none"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action Event</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 font-mono">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500">
                  {log.created_at}
                </td>

                <td className="py-2.5 px-4">
                  <span className="font-bold text-slate-900">{log.username}</span>
                  <span className="text-[10px] text-slate-400 block capitalize">{log.role.replace('_', ' ')}</span>
                </td>

                <td className="py-2.5 px-4">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {log.action}
                  </span>
                </td>

                <td className="py-2.5 px-4 text-slate-700">
                  {log.description}
                </td>

                <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                  {log.ip_address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
