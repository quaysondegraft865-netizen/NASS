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

export const INITIAL_SETTINGS: SchoolSettings = {
  school_name: 'School Management System',
  subtitle: 'Academic Records Portal',
  motto: 'Knowledge and Integrity',
  established_year: 0,
  address: '',
  region: '',
  district: '',
  phone: '',
  email: '',
  website: '',
  headmaster_name: '',
  assistant_head_academic: '',
  current_academic_year_id: 0,
  current_term_id: 0,
  assessment_max_score: 30,
  exam_max_score: 70,
  transcript_footer: '',
  grading_rules: [
    { grade: 'A1', min_score: 80, max_score: 100, grade_point: 1, remark: 'Excellent' },
    { grade: 'B2', min_score: 75, max_score: 79, grade_point: 2, remark: 'Very Good' },
    { grade: 'B3', min_score: 70, max_score: 74, grade_point: 3, remark: 'Good' },
    { grade: 'C4', min_score: 65, max_score: 69, grade_point: 4, remark: 'Credit' },
    { grade: 'C5', min_score: 60, max_score: 64, grade_point: 5, remark: 'Credit' },
    { grade: 'C6', min_score: 55, max_score: 59, grade_point: 6, remark: 'Credit' },
    { grade: 'D7', min_score: 50, max_score: 54, grade_point: 7, remark: 'Pass' },
    { grade: 'E8', min_score: 45, max_score: 49, grade_point: 8, remark: 'Pass' },
    { grade: 'F9', min_score: 0, max_score: 44, grade_point: 9, remark: 'Fail' },
  ],
};

export const INITIAL_USERS: User[] = [];

export const INITIAL_ACADEMIC_YEARS: AcademicYear[] = [];

export const INITIAL_TERMS: Term[] = [];

export const INITIAL_CLASSES: SchoolClass[] = [];

export const INITIAL_SUBJECTS: Subject[] = [];

export const INITIAL_TEACHERS: Teacher[] = [];

export const INITIAL_STUDENTS: Student[] = [];

export const INITIAL_TEACHER_ASSIGNMENTS: TeacherAssignment[] = [];

export function generateInitialResults(): ResultRecord[] {
  return [];
}

export const INITIAL_TRANSCRIPTS: TranscriptVerification[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];
