export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  created_at: string;
  teacher_id?: string;
  student_id?: string;
  full_name?: string;
}

export interface Student {
  id: number;
  student_id: string; // e.g. NASS/2023/001
  admission_number: string; // e.g. 230481
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender: 'Male' | 'Female';
  date_of_birth: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  guardian_name: string;
  guardian_phone: string;
  class_id: number;
  programme: string; // General Science, General Arts, Agricultural Science, Business, Home Economics, Visual Arts
  year_group: string; // e.g. 2023-2026
  admission_year: number; // 2023
  graduation_year: number; // 2026
  photo: string;
  status: 'active' | 'graduated' | 'transferred' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  teacher_id: string; // e.g. TCH-001
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  username: string;
  status: 'active' | 'inactive';
  qualification: string;
  created_at: string;
}

export interface SchoolClass {
  id: number;
  class_name: string; // e.g. "SHS 1 Science A", "SHS 2 Agric", "SHS 3 Arts 1"
  form_level: 'SHS 1' | 'SHS 2' | 'SHS 3';
  programme: string;
  academic_year_id: number;
  room_number?: string;
  class_teacher_id?: number;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: number;
  subject_code: string; // e.g. ENG101, CORE_MATH, AGRIC201
  subject_name: string;
  department: string;
  programme: string; // "Core / All Programmes" or specific programme
  is_core: boolean;
  credit_hours?: number;
  status: 'active' | 'inactive';
}

export interface AcademicYear {
  id: number;
  year_name: string; // e.g. "2025/2026"
  start_date: string;
  end_date: string;
  is_current: boolean;
  status: 'active' | 'closed';
}

export interface Term {
  id: number;
  academic_year_id: number;
  term_name: 'Term 1' | 'Term 2' | 'Term 3';
  start_date: string;
  end_date: string;
  is_current: boolean;
  status: 'active' | 'closed';
}

export interface TeacherAssignment {
  id: number;
  teacher_id: number;
  subject_id: number;
  class_id: number;
  academic_year_id: number;
}

export type ResultStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'published';

export interface ResultRecord {
  id: number;
  student_id: number; // references students.id
  subject_id: number;
  class_id: number;
  academic_year_id: number;
  term_id: number;
  assessment_score: number; // Continuous assessment (0-30 or 0-40)
  exam_score: number; // Terminal examination (0-70 or 0-60)
  total_score: number; // 0-100
  grade: string; // A1, B2, B3, C4, C5, C6, D7, E8, F9
  grade_point: number; // 1 (best) down to 9 (fail)
  remarks: string; // Excellent, Very Good, Good, Credit, Pass, Fail
  teacher_id: number;
  status: ResultStatus;
  rejection_reason?: string;
  submitted_at?: string;
  approved_at?: string;
  approved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface TranscriptVerification {
  id: number;
  transcript_code: string; // e.g. NASS-TR-2026-000125
  student_id: number;
  issue_date: string;
  issued_by: string;
  graduation_status: string;
  cumulative_gpa: number;
  overall_remark: string;
  status: 'valid' | 'revoked';
}

export interface AuditLog {
  id: number;
  user_id: number;
  username: string;
  role: string;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

export interface GradeRule {
  grade: string;
  min_score: number;
  max_score: number;
  grade_point: number;
  remark: string;
}

export interface SchoolSettings {
  school_name: string;
  subtitle: string;
  motto: string;
  established_year: number;
  address: string;
  region: string;
  district: string;
  phone: string;
  email: string;
  website: string;
  headmaster_name: string;
  assistant_head_academic: string;
  current_academic_year_id: number;
  current_term_id: number;
  assessment_max_score: number; // 30
  exam_max_score: number; // 70
  transcript_footer: string;
  grading_rules: GradeRule[];
}
