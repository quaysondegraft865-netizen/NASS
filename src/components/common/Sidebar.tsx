import React from 'react';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
  FileCheck2,
  FileText,
  Award,
  BarChart3,
  UserCog,
  Settings,
  History,
  Code2,
  Edit3,
  ListOrdered,
  UserCheck,
  ClipboardList
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  onSelectTab,
  pendingCount = 0
}) => {
  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'classes', label: 'Classes', icon: Layers },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'academic_years', label: 'Academic Years', icon: Calendar },
    { id: 'teacher_assignments', label: 'Teacher Assignments', icon: UserCheck },
    {
      id: 'results_approval',
      label: 'Results Approval',
      icon: FileCheck2,
      badge: pendingCount > 0 ? pendingCount : undefined
    },
    { id: 'transcripts', label: 'Transcripts', icon: Award },
    { id: 'report_cards', label: 'Report Cards', icon: FileText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'users', label: 'User Accounts', icon: UserCog },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit_logs', label: 'Audit Logs', icon: History },
    { id: 'php_explorer', label: 'PHP & MySQL Source', icon: Code2 },
  ];

  const teacherLinks = [
    { id: 'teacher_dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
    { id: 'enter_results', label: 'Enter Terminal Marks', icon: Edit3 },
    { id: 'submitted_results', label: 'Submitted Results', icon: ListOrdered },
    { id: 'my_classes', label: 'My Assigned Classes', icon: ClipboardList },
  ];

  const studentLinks = [
    { id: 'student_dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'student_profile', label: 'My Profile', icon: GraduationCap },
    { id: 'student_results', label: 'My Results', icon: FileText },
    { id: 'student_transcript', label: 'Official Transcript', icon: Award },
    { id: 'student_report_card', label: 'Terminal Report Card', icon: ClipboardList },
  ];

  let links = adminLinks;
  let portalTitle = 'ADMINISTRATOR PORTAL';

  if (role === 'teacher') {
    links = teacherLinks;
    portalTitle = 'TEACHER PORTAL';
  } else if (role === 'student') {
    links = studentLinks;
    portalTitle = 'STUDENT PORTAL';
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <div className="text-[11px] font-bold tracking-wider text-amber-500 uppercase">
          {portalTitle}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          Nkroful Agric Senior High
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeTab === link.id;

          return (
            <button
              key={link.id}
              onClick={() => onSelectTab(link.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="truncate">{link.label}</span>
              </div>

              {link.badge !== undefined && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        <div>System Version 1.0.0</div>
        <div className="text-emerald-500 font-medium mt-0.5">XAMPP & Apache Ready</div>
      </div>
    </aside>
  );
};
