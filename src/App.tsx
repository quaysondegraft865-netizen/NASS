import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import {
  User,
  UserRole,
  Student,
  Teacher,
  SchoolClass,
  Subject,
  TeacherAssignment,
  ResultRecord,
  AcademicYear,
  Term,
  SchoolSettings,
  TranscriptVerification,
  AuditLog
} from './types';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { SchoolCrest } from './components/common/SchoolCrest';
import { LandingPage } from './components/public/LandingPage';
import { LoginPage } from './components/public/LoginPage';
import { VerificationPage } from './components/public/VerificationPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentManagement } from './components/admin/StudentManagement';
import { TeacherManagement } from './components/admin/TeacherManagement';
import { ClassManagement } from './components/admin/ClassManagement';
import { SubjectManagement } from './components/admin/SubjectManagement';
import { TeacherAssignments } from './components/admin/TeacherAssignments';
import { ResultsApproval } from './components/admin/ResultsApproval';
import { TranscriptManagement } from './components/admin/TranscriptManagement';
import { ReportCardGenerator } from './components/admin/ReportCardGenerator';
import { ReportsAnalytics } from './components/admin/ReportsAnalytics';
import { SettingsManager } from './components/admin/SettingsManager';
import { AuditLogsPage } from './components/admin/AuditLogsPage';
import { UsersManagement } from './components/admin/UsersManagement';
import { AcademicYearsManager } from './components/admin/AcademicYearsManager';
import { PhpSourceExplorer } from './components/admin/PhpSourceExplorer';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherEnterResults } from './components/teacher/TeacherEnterResults';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentResultsView } from './components/student/StudentResultsView';
import { StudentTranscriptView } from './components/student/StudentTranscriptView';

export function App() {
  // Initialize storage
  useEffect(() => {
    StorageService.init();
  }, []);

  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const [currentView, setCurrentView] = useState<'portal' | 'landing' | 'login' | 'verify'>(() => {
    return StorageService.getCurrentUser() ? 'portal' : 'landing';
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [verificationCode, setVerificationCode] = useState<string>('NASS-TR-2026-000125');
  const [prefilledLoginRole, setPrefilledLoginRole] = useState<'super_admin' | 'teacher' | 'student'>('super_admin');

  // Reactive DB records state
  const [settings, setSettings] = useState<SchoolSettings>(() => StorageService.getSettings());
  const [students, setStudents] = useState<Student[]>(() => StorageService.getStudents());
  const [teachers, setTeachers] = useState<Teacher[]>(() => StorageService.getTeachers());
  const [classes, setClasses] = useState<SchoolClass[]>(() => StorageService.getClasses());
  const [subjects, setSubjects] = useState<Subject[]>(() => StorageService.getSubjects());
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(() => StorageService.getTeacherAssignments());
  const [results, setResults] = useState<ResultRecord[]>(() => StorageService.getResults());
  const [years, setYears] = useState<AcademicYear[]>(() => StorageService.getAcademicYears());
  const [terms, setTerms] = useState<Term[]>(() => StorageService.getTerms());
  const [transcripts, setTranscripts] = useState<TranscriptVerification[]>(() => StorageService.getTranscripts());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => StorageService.getAuditLogs());
  const [users, setUsers] = useState<User[]>(() => StorageService.getUsers());

  // Check URL query parameters for verify.php?code=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      setVerificationCode(code);
      setCurrentView('verify');
    }
  }, []);

  // Sync current tab when role changes
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === 'teacher') {
      setActiveTab('teacher_dashboard');
    } else if (currentUser.role === 'student') {
      setActiveTab('student_dashboard');
    } else {
      setActiveTab('dashboard');
    }
  }, [currentUser?.role]);

  // Auth Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    StorageService.addAuditLog(user, 'User Logged In', `Session initialized for ${user.username} (${user.role})`);
    setAuditLogs(StorageService.getAuditLogs());
    setCurrentView('portal');
  };

  const handleLogout = () => {
    if (currentUser) {
      StorageService.addAuditLog(currentUser, 'User Logged Out', `User ${currentUser.username} closed session.`);
    }
    setCurrentUser(null);
    StorageService.setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleSwitchRole = (role: 'super_admin' | 'teacher' | 'student') => {
    const target = users.find(u => u.role === role) || users[0];
    handleLogin(target);
  };

  const handleResetData = () => {
    if (confirm('Restore school database, examination marks, and records to system factory installation defaults?')) {
      StorageService.resetAllToDefaults();
      setSettings(StorageService.getSettings());
      setStudents(StorageService.getStudents());
      setTeachers(StorageService.getTeachers());
      setClasses(StorageService.getClasses());
      setSubjects(StorageService.getSubjects());
      setAssignments(StorageService.getTeacherAssignments());
      setResults(StorageService.getResults());
      setYears(StorageService.getAcademicYears());
      setTerms(StorageService.getTerms());
      setTranscripts(StorageService.getTranscripts());
      setAuditLogs(StorageService.getAuditLogs());
      setUsers(StorageService.getUsers());
      setCurrentUser(null);
      setCurrentView('landing');
      alert('School system records and database successfully restored to factory defaults.');
    }
  };

  // Student CRUD
  const handleSaveStudent = (stu: Omit<Student, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveStudent(stu, currentUser);
    setStudents(StorageService.getStudents());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleDeleteStudent = (id: number) => {
    if (!currentUser) return;
    StorageService.deleteStudent(id, currentUser);
    setStudents(StorageService.getStudents());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Teacher CRUD
  const handleSaveTeacher = (teacher: Omit<Teacher, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveTeacher(teacher, currentUser);
    setTeachers(StorageService.getTeachers());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Class CRUD
  const handleSaveClass = (c: Omit<SchoolClass, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveClass(c, currentUser);
    setClasses(StorageService.getClasses());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleDeleteClass = (id: number) => {
    if (!currentUser) return;
    StorageService.deleteClass(id, currentUser);
    setClasses(StorageService.getClasses());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Subject CRUD
  const handleSaveSubject = (sub: Omit<Subject, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveSubject(sub, currentUser);
    setSubjects(StorageService.getSubjects());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleDeleteSubject = (id: number) => {
    if (!currentUser) return;
    StorageService.deleteSubject(id, currentUser);
    setSubjects(StorageService.getSubjects());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Teacher Assignment
  const handleSaveAssignment = (assign: Omit<TeacherAssignment, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveTeacherAssignment(assign, currentUser);
    setAssignments(StorageService.getTeacherAssignments());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleDeleteAssignment = (id: number) => {
    if (!currentUser) return;
    StorageService.deleteTeacherAssignment(id, currentUser);
    setAssignments(StorageService.getTeacherAssignments());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Results
  const handleSaveResultsBatch = (batch: (Omit<ResultRecord, 'id'> & { id?: number })[]) => {
    if (!currentUser) return;
    StorageService.saveResultsBatch(batch, currentUser);
    setResults(StorageService.getResults());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleUpdateResultStatus = (
    ids: number[],
    status: ResultRecord['status'],
    rejectionReason?: string
  ) => {
    if (!currentUser) return;
    StorageService.updateResultStatus(ids, status, currentUser, rejectionReason);
    setResults(StorageService.getResults());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Transcript Save
  const handleSaveTranscript = (trans: Omit<TranscriptVerification, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveTranscript(trans, currentUser);
    setTranscripts(StorageService.getTranscripts());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Settings Save
  const handleSaveSettings = (newSettings: SchoolSettings) => {
    if (!currentUser) return;
    StorageService.saveSettings(newSettings, currentUser);
    setSettings(StorageService.getSettings());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Users Save
  const handleSaveUser = (userData: Omit<User, 'id'> & { id?: number }) => {
    if (!currentUser) return;
    StorageService.saveUser(userData, currentUser);
    setUsers(StorageService.getUsers());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Academic Years & Terms
  const handleSaveYears = (newYears: AcademicYear[]) => {
    StorageService.saveAcademicYears(newYears);
    setYears(newYears);
  };

  const handleSaveTerms = (newTerms: Term[]) => {
    StorageService.saveTerms(newTerms);
    setTerms(newTerms);
  };

  // Active Teacher / Student records for portals
  const currentTeacher = teachers.find(t => t.username === currentUser?.username) || teachers[0];
  const currentStudent = students.find(s => s.id === 1) || students[0];

  const pendingResultsCount = results.filter(r => r.status === 'submitted').length;

  // View: Landing Page
  if (currentView === 'landing') {
    return (
      <LandingPage
        settings={settings}
        onOpenLogin={(role) => {
          if (role) setPrefilledLoginRole(role);
          setCurrentView('login');
        }}
        onOpenVerify={(code) => {
          if (code) setVerificationCode(code);
          setCurrentView('verify');
        }}
      />
    );
  }

  // View: Login Page
  if (currentView === 'login') {
    return (
      <LoginPage
        users={users}
        settings={settings}
        prefilledRole={prefilledLoginRole}
        onLogin={handleLogin}
        onBackToHome={() => setCurrentView('landing')}
      />
    );
  }

  // View: Public Verification Page
  if (currentView === 'verify') {
    return (
      <VerificationPage
        settings={settings}
        transcripts={transcripts}
        students={students}
        initialCode={verificationCode}
        onBackToHome={() => {
          if (currentUser) setCurrentView('portal');
          else setCurrentView('landing');
        }}
      />
    );
  }

  // View: Main Portal (Admin / Teacher / Student)
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar
        currentUser={currentUser}
        settings={settings}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        onNavigateVerify={() => setCurrentView('verify')}
        onNavigateLanding={() => setCurrentView('landing')}
        onResetData={handleResetData}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        {currentUser && (
          <Sidebar
            role={currentUser.role}
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            pendingCount={pendingResultsCount}
          />
        )}

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* ADMINISTRATOR VIEWS */}
          {currentUser?.role.includes('admin') && (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboard
                  students={students}
                  teachers={teachers}
                  classes={classes}
                  subjects={subjects}
                  results={results}
                  years={years}
                  terms={terms}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'students' && (
                <StudentManagement
                  students={students}
                  classes={classes}
                  currentUser={currentUser}
                  onSaveStudent={handleSaveStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              )}
              {activeTab === 'teachers' && (
                <TeacherManagement
                  teachers={teachers}
                  assignments={assignments}
                  subjects={subjects}
                  classes={classes}
                  currentUser={currentUser}
                  onSaveTeacher={handleSaveTeacher}
                />
              )}
              {activeTab === 'classes' && (
                <ClassManagement
                  classes={classes}
                  teachers={teachers}
                  years={years}
                  currentUser={currentUser}
                  onSaveClass={handleSaveClass}
                  onDeleteClass={handleDeleteClass}
                />
              )}
              {activeTab === 'subjects' && (
                <SubjectManagement
                  subjects={subjects}
                  currentUser={currentUser}
                  onSaveSubject={handleSaveSubject}
                  onDeleteSubject={handleDeleteSubject}
                />
              )}
              {activeTab === 'academic_years' && (
                <AcademicYearsManager
                  years={years}
                  terms={terms}
                  currentUser={currentUser}
                  onSaveYears={handleSaveYears}
                  onSaveTerms={handleSaveTerms}
                />
              )}
              {activeTab === 'teacher_assignments' && (
                <TeacherAssignments
                  assignments={assignments}
                  teachers={teachers}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  currentUser={currentUser}
                  onSaveAssignment={handleSaveAssignment}
                  onDeleteAssignment={handleDeleteAssignment}
                />
              )}
              {activeTab === 'results_approval' && (
                <ResultsApproval
                  results={results}
                  students={students}
                  subjects={subjects}
                  classes={classes}
                  teachers={teachers}
                  terms={terms}
                  years={years}
                  currentUser={currentUser}
                  onUpdateStatus={handleUpdateResultStatus}
                />
              )}
              {activeTab === 'transcripts' && (
                <TranscriptManagement
                  students={students}
                  results={results}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  terms={terms}
                  settings={settings}
                  transcripts={transcripts}
                  currentUser={currentUser}
                  onSaveTranscript={handleSaveTranscript}
                  onNavigateVerify={(code) => {
                    setVerificationCode(code);
                    setCurrentView('verify');
                  }}
                />
              )}
              {activeTab === 'report_cards' && (
                <ReportCardGenerator
                  students={students}
                  results={results}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  terms={terms}
                  settings={settings}
                />
              )}
              {activeTab === 'reports' && (
                <ReportsAnalytics
                  students={students}
                  teachers={teachers}
                  subjects={subjects}
                  classes={classes}
                  results={results}
                  years={years}
                  terms={terms}
                />
              )}
              {activeTab === 'users' && (
                <UsersManagement
                  users={users}
                  currentUser={currentUser}
                  onSaveUser={handleSaveUser}
                />
              )}
              {activeTab === 'settings' && (
                <SettingsManager
                  settings={settings}
                  currentUser={currentUser}
                  onSaveSettings={handleSaveSettings}
                />
              )}
              {activeTab === 'audit_logs' && (
                <AuditLogsPage logs={auditLogs} />
              )}
              {activeTab === 'php_explorer' && (
                <PhpSourceExplorer />
              )}
            </>
          )}

          {/* TEACHER VIEWS */}
          {currentUser?.role === 'teacher' && (
            <>
              {activeTab === 'teacher_dashboard' && (
                <TeacherDashboard
                  currentTeacher={currentTeacher}
                  assignments={assignments}
                  subjects={subjects}
                  classes={classes}
                  students={students}
                  results={results}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'enter_results' && (
                <TeacherEnterResults
                  currentTeacher={currentTeacher}
                  assignments={assignments}
                  subjects={subjects}
                  classes={classes}
                  students={students}
                  results={results}
                  years={years}
                  terms={terms}
                  settings={settings}
                  currentUser={currentUser}
                  onSaveResults={handleSaveResultsBatch}
                />
              )}
              {activeTab === 'submitted_results' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Submitted Results History</h2>
                  <ResultsApproval
                    results={results.filter(r => r.teacher_id === currentTeacher.id)}
                    students={students}
                    subjects={subjects}
                    classes={classes}
                    teachers={teachers}
                    terms={terms}
                    years={years}
                    currentUser={currentUser}
                    onUpdateStatus={handleUpdateResultStatus}
                  />
                </div>
              )}
              {activeTab === 'my_classes' && (
                <TeacherAssignments
                  assignments={assignments.filter(a => a.teacher_id === currentTeacher.id)}
                  teachers={teachers}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  currentUser={currentUser}
                  onSaveAssignment={handleSaveAssignment}
                  onDeleteAssignment={handleDeleteAssignment}
                />
              )}
            </>
          )}

          {/* STUDENT VIEWS */}
          {currentUser?.role === 'student' && (
            <>
              {activeTab === 'student_dashboard' && (
                <StudentDashboard
                  currentStudent={currentStudent}
                  classes={classes}
                  results={results}
                  subjects={subjects}
                  years={years}
                  terms={terms}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'student_profile' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <SchoolCrest size="sm" showText={false} />
                      <div>
                        <div className="font-serif font-black text-xs text-[#0f3d24]">
                          NKROFUL AGRIC SENIOR HIGH SCHOOL
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          Official Student Portal Dossier &bull; Republic of Ghana
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <img
                      src={currentStudent.photo}
                      alt={currentStudent.first_name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-800"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-serif">{currentStudent.first_name} {currentStudent.last_name}</h3>
                      <div className="font-mono text-emerald-800 text-xs font-semibold">{currentStudent.student_id}</div>
                      <div className="text-xs text-slate-500">{currentStudent.programme}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px] uppercase font-bold">Admission Number</span><span className="font-bold text-slate-800">{currentStudent.admission_number}</span></div>
                    <div className="p-2.5 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px] uppercase font-bold">Gender & DOB</span><span className="font-bold text-slate-800">{currentStudent.gender} &bull; {currentStudent.date_of_birth}</span></div>
                    <div className="p-2.5 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian</span><span className="font-bold text-slate-800">{currentStudent.guardian_name}</span></div>
                    <div className="p-2.5 bg-slate-50 rounded-lg"><span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian Phone</span><span className="font-bold text-slate-800">{currentStudent.guardian_phone}</span></div>
                  </div>
                </div>
              )}
              {activeTab === 'student_results' && (
                <StudentResultsView
                  currentStudent={currentStudent}
                  results={results}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  terms={terms}
                  settings={settings}
                />
              )}
              {activeTab === 'student_transcript' && (
                <StudentTranscriptView
                  currentStudent={currentStudent}
                  results={results}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  terms={terms}
                  settings={settings}
                  transcripts={transcripts}
                  onNavigateVerify={(code) => {
                    setVerificationCode(code);
                    setCurrentView('verify');
                  }}
                />
              )}
              {activeTab === 'student_report_card' && (
                <ReportCardGenerator
                  students={students.filter(s => s.id === currentStudent.id)}
                  results={results}
                  subjects={subjects}
                  classes={classes}
                  years={years}
                  terms={terms}
                  settings={settings}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
