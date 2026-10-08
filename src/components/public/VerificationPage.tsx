import React, { useState } from 'react';
import { SchoolSettings, TranscriptVerification, Student } from '../../types';
import { SchoolCrest } from '../common/SchoolCrest';
import { ShieldCheck, ArrowLeft, CheckCircle2, XCircle, Search, Calendar, Award } from 'lucide-react';

interface VerificationPageProps {
  settings: SchoolSettings;
  transcripts: TranscriptVerification[];
  students: Student[];
  initialCode?: string;
  onBackToHome: () => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  settings,
  transcripts,
  students,
  initialCode = '',
  onBackToHome,
}) => {
  const [inputCode, setInputCode] = useState(initialCode);
  const [searchedCode, setSearchedCode] = useState(initialCode);

  const matchedTranscript = transcripts.find(
    t => t.transcript_code.trim().toUpperCase() === searchedCode.trim().toUpperCase()
  );

  const matchedStudent = matchedTranscript
    ? students.find(s => s.id === matchedTranscript.student_id)
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedCode(inputCode.trim());
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <div className="bg-amber-600 h-1.5 w-full"></div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size="md" />
            <div>
              <div className="font-serif font-black text-sm text-[#0f3d24] leading-tight">
                {settings.school_name}
              </div>
              <div className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
                Official Document Verification Portal
              </div>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to School Portal</span>
          </button>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Verify Official Academic Credential
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter the unique reference code stamped at the bottom of the transcript.
            </p>
          </div>

          <form onSubmit={handleSearch} className="mt-6 flex gap-2">
            <input
              type="text"
              required
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. NASS-TR-2026-000125"
              className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono uppercase"
            />
            <button
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </form>

          {/* Verification Results Box */}
          {searchedCode && (
            <div className="mt-8">
              {matchedTranscript && matchedStudent && matchedTranscript.status === 'valid' ? (
                <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-6 text-xs space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-3 pb-3 border-b border-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700 flex-shrink-0" />
                    <div>
                      <span className="bg-emerald-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                        VALID & AUTHENTIC DOCUMENT
                      </span>
                      <h4 className="font-bold text-sm text-emerald-950 mt-1">
                        Official Record Certified by Nkroful Agric SHS
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Transcript Reference Code:</span>
                      <span className="font-mono font-bold text-emerald-900">{matchedTranscript.transcript_code}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Candidate Name:</span>
                      <span className="font-bold text-slate-900">
                        {matchedStudent.first_name} {matchedStudent.middle_name ? matchedStudent.middle_name + ' ' : ''}{matchedStudent.last_name}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Student ID:</span>
                      <span className="font-mono font-medium">{matchedStudent.student_id}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Academic Programme:</span>
                      <span className="font-medium text-slate-900">{matchedStudent.programme}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Cumulative GPA:</span>
                      <span className="font-bold text-emerald-800">{matchedTranscript.cumulative_gpa.toFixed(2)} / 4.00</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Academic Standing:</span>
                      <span className="font-semibold text-amber-800">{matchedTranscript.graduation_status}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-emerald-100">
                      <span className="text-slate-500 font-medium">Date Certified & Issued:</span>
                      <span>{matchedTranscript.issue_date}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-medium">Issuing Authority:</span>
                      <span className="font-medium">{matchedTranscript.issued_by}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-rose-200 bg-rose-50/60 rounded-2xl p-6 text-xs text-center space-y-2 animate-in fade-in">
                  <XCircle className="w-10 h-10 text-rose-600 mx-auto" />
                  <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    INVALID / RECORD NOT FOUND
                  </span>
                  <h4 className="font-bold text-sm text-rose-950">
                    Verification Unsuccessful
                  </h4>
                  <p className="text-slate-600 max-w-sm mx-auto">
                    No authentic transcript matching the code <strong className="font-mono text-slate-800">{searchedCode}</strong> was found in the official records repository of Nkroful Agric Senior High School.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            For further institutional inquiries, contact the Academic Secretariat at {settings.email}.
          </div>
        </div>
      </main>
    </div>
  );
};
