import {
  User,
  Student,
  Teacher,
  SchoolClass,
  Subject,
  AcademicYear,
  Term,
  TeacherAssignment,
  ResultRecord,
  SchoolSettings,
  AuditLog,
  TranscriptVerification
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_USERS,
  INITIAL_ACADEMIC_YEARS,
  INITIAL_TERMS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_TEACHER_ASSIGNMENTS,
  INITIAL_TRANSCRIPTS,
  INITIAL_AUDIT_LOGS,
  generateInitialResults,
} from '../data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'nass_settings_v1',
  USERS: 'nass_users_v1',
  YEARS: 'nass_years_v1',
  TERMS: 'nass_terms_v1',
  CLASSES: 'nass_classes_v1',
  SUBJECTS: 'nass_subjects_v1',
  TEACHERS: 'nass_teachers_v1',
  STUDENTS: 'nass_students_v1',
  ASSIGNMENTS: 'nass_assignments_v1',
  RESULTS: 'nass_results_v1',
  TRANSCRIPTS: 'nass_transcripts_v1',
  AUDIT_LOGS: 'nass_audit_logs_v1',
  CURRENT_USER: 'nass_current_user_v1',
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading storage key ${key}:`, e);
    return fallback;
  }
}

function setItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error writing storage key ${key}:`, e);
  }
}

export const StorageService = {
  // Initialization
  init(): void {
    const storedStudents = getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    const hasDemoRecords = storedStudents.some((student) => String(student.student_id).startsWith('NASS/'));

    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS) || hasDemoRecords) {
      this.resetAllToDefaults();
    } else {
      const current = this.getSettings();
      if (current.motto !== INITIAL_SETTINGS.motto) {
        current.motto = INITIAL_SETTINGS.motto;
        setItem(STORAGE_KEYS.SETTINGS, current);
      }
    }
  },

  resetAllToDefaults(): void {
    setItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setItem(STORAGE_KEYS.USERS, INITIAL_USERS.slice(0, 1));
    setItem(STORAGE_KEYS.YEARS, []);
    setItem(STORAGE_KEYS.TERMS, []);
    setItem(STORAGE_KEYS.CLASSES, []);
    setItem(STORAGE_KEYS.SUBJECTS, []);
    setItem(STORAGE_KEYS.TEACHERS, []);
    setItem(STORAGE_KEYS.STUDENTS, []);
    setItem(STORAGE_KEYS.ASSIGNMENTS, []);
    setItem(STORAGE_KEYS.RESULTS, []);
    setItem(STORAGE_KEYS.TRANSCRIPTS, []);
    setItem(STORAGE_KEYS.AUDIT_LOGS, []);
    setItem(STORAGE_KEYS.CURRENT_USER, null);
  },

  // Current User / Session
  getCurrentUser(): User | null {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  // Settings
  getSettings(): SchoolSettings {
    return getItem<SchoolSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  saveSettings(settings: SchoolSettings, user: User): void {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    this.addAuditLog(user, 'Settings Updated', 'Modified school system configuration and grading rules');
  },

  // Academic Years & Terms
  getAcademicYears(): AcademicYear[] {
    return getItem<AcademicYear[]>(STORAGE_KEYS.YEARS, INITIAL_ACADEMIC_YEARS);
  },

  saveAcademicYears(years: AcademicYear[]): void {
    setItem(STORAGE_KEYS.YEARS, years);
  },

  getTerms(): Term[] {
    return getItem<Term[]>(STORAGE_KEYS.TERMS, INITIAL_TERMS);
  },

  saveTerms(terms: Term[]): void {
    setItem(STORAGE_KEYS.TERMS, terms);
  },

  // Classes
  getClasses(): SchoolClass[] {
    return getItem<SchoolClass[]>(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
  },

  saveClass(schoolClass: Omit<SchoolClass, 'id'> & { id?: number }, user: User): SchoolClass {
    const classes = this.getClasses();
    if (schoolClass.id) {
      const idx = classes.findIndex(c => c.id === schoolClass.id);
      if (idx !== -1) {
        classes[idx] = { ...classes[idx], ...schoolClass } as SchoolClass;
        setItem(STORAGE_KEYS.CLASSES, classes);
        this.addAuditLog(user, 'Class Updated', `Updated class ${schoolClass.class_name}`);
        return classes[idx];
      }
    }
    const newId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
    const newClass: SchoolClass = { ...schoolClass, id: newId } as SchoolClass;
    classes.push(newClass);
    setItem(STORAGE_KEYS.CLASSES, classes);
    this.addAuditLog(user, 'Class Created', `Added new class ${newClass.class_name}`);
    return newClass;
  },

  deleteClass(id: number, user: User): boolean {
    const classes = this.getClasses();
    const target = classes.find(c => c.id === id);
    if (!target) return false;
    const updated = classes.filter(c => c.id !== id);
    setItem(STORAGE_KEYS.CLASSES, updated);
    this.addAuditLog(user, 'Class Deleted', `Removed class ${target.class_name}`);
    return true;
  },

  // Subjects
  getSubjects(): Subject[] {
    return getItem<Subject[]>(STORAGE_KEYS.SUBJECTS, INITIAL_SUBJECTS);
  },

  saveSubject(subject: Omit<Subject, 'id'> & { id?: number }, user: User): Subject {
    const subjects = this.getSubjects();
    if (subject.id) {
      const idx = subjects.findIndex(s => s.id === subject.id);
      if (idx !== -1) {
        subjects[idx] = { ...subjects[idx], ...subject } as Subject;
        setItem(STORAGE_KEYS.SUBJECTS, subjects);
        this.addAuditLog(user, 'Subject Updated', `Updated subject ${subject.subject_name} (${subject.subject_code})`);
        return subjects[idx];
      }
    }
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    const newSub: Subject = { ...subject, id: newId } as Subject;
    subjects.push(newSub);
    setItem(STORAGE_KEYS.SUBJECTS, subjects);
    this.addAuditLog(user, 'Subject Created', `Added new subject ${newSub.subject_name} (${newSub.subject_code})`);
    return newSub;
  },

  deleteSubject(id: number, user: User): boolean {
    const subjects = this.getSubjects();
    const target = subjects.find(s => s.id === id);
    if (!target) return false;
    const updated = subjects.filter(s => s.id !== id);
    setItem(STORAGE_KEYS.SUBJECTS, updated);
    this.addAuditLog(user, 'Subject Deleted', `Removed subject ${target.subject_name}`);
    return true;
  },

  // Teachers
  getTeachers(): Teacher[] {
    return getItem<Teacher[]>(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
  },

  saveTeacher(teacher: Omit<Teacher, 'id'> & { id?: number }, user: User): Teacher {
    const teachers = this.getTeachers();
    if (teacher.id) {
      const idx = teachers.findIndex(t => t.id === teacher.id);
      if (idx !== -1) {
        teachers[idx] = { ...teachers[idx], ...teacher } as Teacher;
        setItem(STORAGE_KEYS.TEACHERS, teachers);
        this.addAuditLog(user, 'Teacher Updated', `Updated profile of ${teacher.first_name} ${teacher.last_name}`);
        return teachers[idx];
      }
    }
    const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    const newTeacher: Teacher = {
      ...teacher,
      id: newId,
      created_at: new Date().toISOString().split('T')[0]
    } as Teacher;
    teachers.push(newTeacher);
    setItem(STORAGE_KEYS.TEACHERS, teachers);
    this.addAuditLog(user, 'Teacher Added', `Created teacher account for ${newTeacher.first_name} ${newTeacher.last_name} (${newTeacher.teacher_id})`);
    return newTeacher;
  },

  // Students
  getStudents(): Student[] {
    return getItem<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  },

  saveStudent(student: Omit<Student, 'id'> & { id?: number }, user: User): Student {
    const students = this.getStudents();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    if (student.id) {
      const idx = students.findIndex(s => s.id === student.id);
      if (idx !== -1) {
        students[idx] = {
          ...students[idx],
          ...student,
          updated_at: now
        } as Student;
        setItem(STORAGE_KEYS.STUDENTS, students);
        this.addAuditLog(user, 'Student Record Updated', `Updated student ${student.first_name} ${student.last_name} (${student.student_id})`);
        return students[idx];
      }
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: Student = {
      ...student,
      id: newId,
      created_at: now,
      updated_at: now
    } as Student;
    students.push(newStudent);
    setItem(STORAGE_KEYS.STUDENTS, students);
    this.addAuditLog(user, 'Student Enrolled', `Enrolled new student ${newStudent.first_name} ${newStudent.last_name} (${newStudent.student_id})`);
    return newStudent;
  },

  deleteStudent(id: number, user: User): boolean {
    const students = this.getStudents();
    const target = students.find(s => s.id === id);
    if (!target) return false;
    const updated = students.filter(s => s.id !== id);
    setItem(STORAGE_KEYS.STUDENTS, updated);
    this.addAuditLog(user, 'Student Deleted', `Deleted student record for ${target.first_name} ${target.last_name} (${target.student_id})`);
    return true;
  },

  // Teacher Assignments
  getTeacherAssignments(): TeacherAssignment[] {
    return getItem<TeacherAssignment[]>(STORAGE_KEYS.ASSIGNMENTS, INITIAL_TEACHER_ASSIGNMENTS);
  },

  saveTeacherAssignment(assignment: Omit<TeacherAssignment, 'id'> & { id?: number }, user: User): TeacherAssignment {
    const list = this.getTeacherAssignments();
    if (assignment.id) {
      const idx = list.findIndex(a => a.id === assignment.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...assignment } as TeacherAssignment;
        setItem(STORAGE_KEYS.ASSIGNMENTS, list);
        this.addAuditLog(user, 'Assignment Updated', `Modified teacher subject assignment`);
        return list[idx];
      }
    }
    const newId = list.length > 0 ? Math.max(...list.map(a => a.id)) + 1 : 1;
    const newAssignment: TeacherAssignment = { ...assignment, id: newId } as TeacherAssignment;
    list.push(newAssignment);
    setItem(STORAGE_KEYS.ASSIGNMENTS, list);
    this.addAuditLog(user, 'Teacher Assigned', `Assigned teacher to subject and class`);
    return newAssignment;
  },

  deleteTeacherAssignment(id: number, user: User): boolean {
    const list = this.getTeacherAssignments();
    const updated = list.filter(a => a.id !== id);
    setItem(STORAGE_KEYS.ASSIGNMENTS, updated);
    this.addAuditLog(user, 'Assignment Removed', `Unassigned teacher from class subject`);
    return true;
  },

  // Results
  getResults(): ResultRecord[] {
    return getItem<ResultRecord[]>(STORAGE_KEYS.RESULTS, generateInitialResults());
  },

  saveResultsBatch(resultsToSave: (Omit<ResultRecord, 'id'> & { id?: number })[], user: User): void {
    const existing = this.getResults();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    let maxId = existing.length > 0 ? Math.max(...existing.map(r => r.id)) : 0;

    resultsToSave.forEach(record => {
      if (record.id) {
        const idx = existing.findIndex(r => r.id === record.id);
        if (idx !== -1) {
          existing[idx] = {
            ...existing[idx],
            ...record,
            updated_at: now
          } as ResultRecord;
          return;
        }
      }
      // Check if match already exists by student + subject + term + class
      const matchIdx = existing.findIndex(
        r => r.student_id === record.student_id &&
             r.subject_id === record.subject_id &&
             r.term_id === record.term_id &&
             r.class_id === record.class_id
      );

      if (matchIdx !== -1) {
        existing[matchIdx] = {
          ...existing[matchIdx],
          ...record,
          id: existing[matchIdx].id,
          updated_at: now
        } as ResultRecord;
      } else {
        maxId++;
        existing.push({
          ...record,
          id: maxId,
          created_at: now,
          updated_at: now
        } as ResultRecord);
      }
    });

    setItem(STORAGE_KEYS.RESULTS, existing);
    this.addAuditLog(user, 'Results Batch Saved', `Saved/Updated ${resultsToSave.length} examination marks entries`);
  },

  updateResultStatus(
    ids: number[],
    status: ResultRecord['status'],
    user: User,
    rejectionReason?: string
  ): void {
    const existing = this.getResults();
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    existing.forEach(r => {
      if (ids.includes(r.id)) {
        r.status = status;
        r.updated_at = now;
        if (status === 'approved' || status === 'published') {
          r.approved_at = now;
          r.approved_by = user.id;
        }
        if (status === 'rejected' && rejectionReason) {
          r.rejection_reason = rejectionReason;
        }
      }
    });

    setItem(STORAGE_KEYS.RESULTS, existing);
    this.addAuditLog(user, `Results ${status.toUpperCase()}`, `Updated status of ${ids.length} marks records to ${status}`);
  },

  // Transcripts
  getTranscripts(): TranscriptVerification[] {
    return getItem<TranscriptVerification[]>(STORAGE_KEYS.TRANSCRIPTS, INITIAL_TRANSCRIPTS);
  },

  saveTranscript(item: Omit<TranscriptVerification, 'id'> & { id?: number }, user: User): TranscriptVerification {
    const list = this.getTranscripts();
    if (item.id) {
      const idx = list.findIndex(t => t.id === item.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...item } as TranscriptVerification;
        setItem(STORAGE_KEYS.TRANSCRIPTS, list);
        this.addAuditLog(user, 'Transcript Updated', `Updated verification record for ${item.transcript_code}`);
        return list[idx];
      }
    }
    const newId = list.length > 0 ? Math.max(...list.map(t => t.id)) + 1 : 1;
    const newTrans: TranscriptVerification = { ...item, id: newId } as TranscriptVerification;
    list.push(newTrans);
    setItem(STORAGE_KEYS.TRANSCRIPTS, list);
    this.addAuditLog(user, 'Transcript Verification Created', `Issued verification record ${newTrans.transcript_code}`);
    return newTrans;
  },

  getTranscriptByCode(code: string): TranscriptVerification | undefined {
    const list = this.getTranscripts();
    const clean = code.trim().toUpperCase();
    return list.find(t => t.transcript_code.toUpperCase() === clean);
  },

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return getItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(user: User, action: string, description: string): void {
    const logs = this.getAuditLogs();
    const newId = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newLog: AuditLog = {
      id: newId,
      user_id: user.id,
      username: user.username,
      role: user.role,
      action,
      description,
      ip_address: '192.168.1.' + Math.floor(10 + Math.random() * 80),
      created_at: now
    };

    logs.unshift(newLog); // newest first
    // keep max 500
    if (logs.length > 500) logs.pop();
    setItem(STORAGE_KEYS.AUDIT_LOGS, logs);
  },

  // Users
  getUsers(): User[] {
    return getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  saveUser(userData: Omit<User, 'id'> & { id?: number }, currentUser: User): User {
    const users = this.getUsers();
    if (userData.id) {
      const idx = users.findIndex(u => u.id === userData.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...userData } as User;
        setItem(STORAGE_KEYS.USERS, users);
        this.addAuditLog(currentUser, 'User Updated', `Updated account for ${userData.username}`);
        return users[idx];
      }
    }
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
      ...userData,
      id: newId,
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    } as User;
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    this.addAuditLog(currentUser, 'User Created', `Created account ${newUser.username} (${newUser.role})`);
    return newUser;
  }
};
