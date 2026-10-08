import React, { useState } from 'react';
import { AcademicYear, Term, User } from '../../types';
import { Calendar, Plus, CheckCircle2, Clock, X } from 'lucide-react';

interface AcademicYearsManagerProps {
  years: AcademicYear[];
  terms: Term[];
  currentUser: User;
  onSaveYears: (years: AcademicYear[]) => void;
  onSaveTerms: (terms: Term[]) => void;
}

export const AcademicYearsManager: React.FC<AcademicYearsManagerProps> = ({
  years,
  terms,
  currentUser,
  onSaveYears,
  onSaveTerms,
}) => {
  const [isAddYearOpen, setIsAddYearOpen] = useState(false);
  const [newYearName, setNewYearName] = useState('2026/2027');

  const handleSetActiveYear = (yearId: number) => {
    const updated = years.map(y => ({
      ...y,
      is_current: y.id === yearId,
      status: (y.id === yearId ? 'active' : 'closed') as 'active' | 'closed'
    }));
    onSaveYears(updated);
  };

  const handleSetActiveTerm = (termId: number) => {
    const updated = terms.map(t => ({
      ...t,
      is_current: t.id === termId,
      status: (t.id === termId ? 'active' : 'closed') as 'active' | 'closed'
    }));
    onSaveTerms(updated);
  };

  const handleAddYear = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...years.map(y => y.id), 0) + 1;
    const newYear: AcademicYear = {
      id: newId,
      year_name: newYearName,
      start_date: '2026-09-10',
      end_date: '2027-07-30',
      is_current: false,
      status: 'active'
    };

    onSaveYears([...years, newYear]);

    // create 3 terms for this year
    let maxTermId = Math.max(...terms.map(t => t.id), 0);
    const newTerms: Term[] = [
      { id: ++maxTermId, academic_year_id: newId, term_name: 'Term 1', start_date: '2026-09-10', end_date: '2026-12-18', is_current: false, status: 'active' },
      { id: ++maxTermId, academic_year_id: newId, term_name: 'Term 2', start_date: '2027-01-08', end_date: '2027-04-10', is_current: false, status: 'active' },
      { id: ++maxTermId, academic_year_id: newId, term_name: 'Term 3', start_date: '2027-05-04', end_date: '2027-07-30', is_current: false, status: 'active' },
    ];
    onSaveTerms([...terms, ...newTerms]);

    setIsAddYearOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <span>Academic Calendars & Term Cycles</span>
          </h2>
          <p className="text-xs text-slate-500">
            Configure active academic years, 3-term cycles (Term 1, Term 2, Term 3), and examination sessions.
          </p>
        </div>

        <button
          onClick={() => setIsAddYearOpen(true)}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Academic Year</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {years.map(year => {
          const yearTerms = terms.filter(t => t.academic_year_id === year.id);

          return (
            <div
              key={year.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between ${
                year.is_current ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    year.is_current ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {year.is_current ? 'CURRENT ACTIVE YEAR' : year.status.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {year.start_date} to {year.end_date}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{year.year_name}</h3>

                {/* Terms inside this year */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Three-Term Academic Calendar:
                  </span>
                  {yearTerms.map(t => (
                    <div
                      key={t.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        t.is_current ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>
                        <span>{t.term_name}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {t.start_date} &bull; {t.end_date}
                        </span>
                      </div>

                      {t.is_current ? (
                        <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Active Term
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSetActiveTerm(t.id)}
                          className="text-[10px] text-slate-500 hover:text-emerald-800 underline cursor-pointer"
                        >
                          Set Active
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100">
                {!year.is_current && (
                  <button
                    onClick={() => handleSetActiveYear(year.id)}
                    className="w-full py-2 bg-slate-100 hover:bg-emerald-800 hover:text-white rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Set as Current Academic Year
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isAddYearOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Add Academic Calendar</h3>
              <button onClick={() => setIsAddYearOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddYear} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Year Name *</label>
                <input
                  type="text"
                  required
                  value={newYearName}
                  onChange={(e) => setNewYearName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g. 2026/2027"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                This will automatically generate Term 1, Term 2, and Term 3 sessions for the new calendar.
              </p>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddYearOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Create Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
