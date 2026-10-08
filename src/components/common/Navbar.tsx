import React from 'react';
import { User, SchoolSettings } from '../../types';
import { SchoolCrest } from './SchoolCrest';
import {
  ShieldCheck,
  LogOut,
  Download,
  Calendar,
  Globe
} from 'lucide-react';
import { exportPhpProjectZip } from '../../utils/phpExporter';

interface NavbarProps {
  currentUser: User | null;
  settings: SchoolSettings;
  onLogout: () => void;
  onSwitchRole: (role: 'super_admin' | 'teacher' | 'student') => void;
  onNavigateVerify: () => void;
  onNavigateLanding?: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  settings,
  onLogout,
  onNavigateVerify,
  onNavigateLanding,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Top Ministerial Bar */}
      <div className="bg-[#0b331f] text-slate-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-[#082617]">
        <div className="flex items-center gap-2 overflow-hidden text-slate-300">
          <span className="font-semibold tracking-wide text-amber-400">
            GHANA EDUCATION SERVICE
          </span>
          <span className="text-slate-500">·</span>
          <span className="truncate">
            Nkroful Agric Senior High School &bull; Ellembelle District, Western Region
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
          {onNavigateLanding && (
            <button
              onClick={onNavigateLanding}
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Portal</span>
            </button>
          )}
          <span className="text-slate-600">|</span>
          <button
            onClick={onNavigateVerify}
            className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Document Verification</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => exportPhpProjectZip()}
            className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer text-slate-300"
            title="Download full project package for Apache / MySQL hosting"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Backup Package (SQL/PHP)</span>
          </button>
        </div>
      </div>

      {/* Primary Institutional Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onNavigateLanding?.()}
          title="Return to School Portal Landing"
        >
          <SchoolCrest size="md" showText={true} />
        </div>

        <div className="flex items-center gap-4">
          {/* Active Academic Calendar Session Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-emerald-800" />
            <span className="font-semibold">2025/2026 Academic Year</span>
            <span className="text-slate-400">·</span>
            <span className="text-emerald-800 font-bold">Term 1 (Active)</span>
          </div>

          {/* User Profile Bar */}
          {currentUser && (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-md bg-[#0b331f] text-amber-400 flex items-center justify-center font-bold text-xs border border-emerald-950">
                {currentUser.username.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.full_name || currentUser.username}
                </div>
                <div className="text-[11px] text-slate-500 capitalize">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-slate-100 rounded-md transition-colors ml-1 cursor-pointer"
                title="Log out of system"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
