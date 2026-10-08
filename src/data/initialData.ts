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
  school_name: 'NKROFUL AGRIC SENIOR HIGH SCHOOL',
  subtitle: 'Student Transcript & Results Management System',
  motto: 'Knowledge, Integrity, Service',
  established_year: 1973,
  address: 'P.O. Box 24, Nkroful, Ellembelle District, Western Region, Ghana',
  region: 'Western Region',
  district: 'Ellembelle District',
  phone: '+233 31 209 4521 / +233 24 456 7890',
  email: 'info@nkrofulagricshs.edu.gh',
  website: 'www.nkrofulagricshs.edu.gh',
  headmaster_name: 'Mr. Emmanuel Joseph Armah',
  assistant_head_academic: 'Mrs. Rebecca Mensah-Bonsu',
  current_academic_year_id: 3, // 2025/2026
  current_term_id: 7, // Term 1 of 2025/2026
  assessment_max_score: 30,
  exam_max_score: 70,
  transcript_footer: 'Official Academic Transcript issued under the authority of the Academic Board of Nkroful Agric Senior High School. Alterations render this document void.',
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

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@nkrofulagricshs.edu.gh',
    role: 'super_admin',
    status: 'active',
    created_at: '2023-09-01 08:00:00',
    full_name: 'Dr. Joseph E. Armah (Headmaster / Administrator)',
  },
  {
    id: 2,
    username: 'kmensah',
    email: 'kmensah@nkrofulagricshs.edu.gh',
    role: 'teacher',
    status: 'active',
    created_at: '2023-09-01 09:30:00',
    teacher_id: 'TCH-001',
    full_name: 'Mr. Kofi Mensah',
  },
  {
    id: 3,
    username: 'aowusu',
    email: 'aowusu@nkrofulagricshs.edu.gh',
    role: 'teacher',
    status: 'active',
    created_at: '2023-09-01 11:00:00',
    teacher_id: 'TCH-002',
    full_name: 'Madam Akosua Owusu',
  },
  {
    id: 4,
    username: 'fboateng',
    email: 'fboateng@nkrofulagricshs.edu.gh',
    role: 'teacher',
    status: 'active',
    created_at: '2023-09-02 08:45:00',
    teacher_id: 'TCH-003',
    full_name: 'Mr. Francis Boateng',
  },
];

export const INITIAL_ACADEMIC_YEARS: AcademicYear[] = [
  { id: 1, year_name: '2023/2024', start_date: '2023-09-15', end_date: '2024-07-20', is_current: false, status: 'closed' },
  { id: 2, year_name: '2024/2025', start_date: '2024-09-12', end_date: '2025-07-25', is_current: false, status: 'closed' },
  { id: 3, year_name: '2025/2026', start_date: '2025-09-10', end_date: '2026-07-30', is_current: true, status: 'active' },
];

export const INITIAL_TERMS: Term[] = [
  // 2023/2024
  { id: 1, academic_year_id: 1, term_name: 'Term 1', start_date: '2023-09-15', end_date: '2023-12-18', is_current: false, status: 'closed' },
  { id: 2, academic_year_id: 1, term_name: 'Term 2', start_date: '2024-01-08', end_date: '2024-04-12', is_current: false, status: 'closed' },
  { id: 3, academic_year_id: 1, term_name: 'Term 3', start_date: '2024-05-06', end_date: '2024-07-20', is_current: false, status: 'closed' },
  // 2024/2025
  { id: 4, academic_year_id: 2, term_name: 'Term 1', start_date: '2024-09-12', end_date: '2024-12-19', is_current: false, status: 'closed' },
  { id: 5, academic_year_id: 2, term_name: 'Term 2', start_date: '2025-01-07', end_date: '2025-04-11', is_current: false, status: 'closed' },
  { id: 6, academic_year_id: 2, term_name: 'Term 3', start_date: '2025-05-05', end_date: '2025-07-25', is_current: false, status: 'closed' },
  // 2025/2026
  { id: 7, academic_year_id: 3, term_name: 'Term 1', start_date: '2025-09-10', end_date: '2025-12-18', is_current: true, status: 'active' },
  { id: 8, academic_year_id: 3, term_name: 'Term 2', start_date: '2026-01-06', end_date: '2026-04-10', is_current: false, status: 'active' },
  { id: 9, academic_year_id: 3, term_name: 'Term 3', start_date: '2026-05-04', end_date: '2026-07-30', is_current: false, status: 'active' },
];

export const INITIAL_CLASSES: SchoolClass[] = [
  { id: 1, class_name: 'SHS 1 Agric 1', form_level: 'SHS 1', programme: 'Agricultural Science', academic_year_id: 3, room_number: 'Block A - 01', class_teacher_id: 2, status: 'active' },
  { id: 2, class_name: 'SHS 1 Science A', form_level: 'SHS 1', programme: 'General Science', academic_year_id: 3, room_number: 'Sci Lab 1', class_teacher_id: 3, status: 'active' },
  { id: 3, class_name: 'SHS 1 Arts 1', form_level: 'SHS 1', programme: 'General Arts', academic_year_id: 3, room_number: 'Block B - 02', class_teacher_id: 4, status: 'active' },
  { id: 4, class_name: 'SHS 2 Agric 1', form_level: 'SHS 2', programme: 'Agricultural Science', academic_year_id: 3, room_number: 'Block A - 03', class_teacher_id: 2, status: 'active' },
  { id: 5, class_name: 'SHS 2 Science A', form_level: 'SHS 2', programme: 'General Science', academic_year_id: 3, room_number: 'Sci Lab 2', class_teacher_id: 5, status: 'active' },
  { id: 6, class_name: 'SHS 2 Business', form_level: 'SHS 2', programme: 'Business', academic_year_id: 3, room_number: 'Block C - 01', class_teacher_id: 6, status: 'active' },
  { id: 7, class_name: 'SHS 3 Agric 1', form_level: 'SHS 3', programme: 'Agricultural Science', academic_year_id: 3, room_number: 'Block A - 05', class_teacher_id: 2, status: 'active' },
  { id: 8, class_name: 'SHS 3 General Arts', form_level: 'SHS 3', programme: 'General Arts', academic_year_id: 3, room_number: 'Block B - 04', class_teacher_id: 4, status: 'active' },
  { id: 9, class_name: 'SHS 3 General Science', form_level: 'SHS 3', programme: 'General Science', academic_year_id: 3, room_number: 'Sci Lab 3', class_teacher_id: 5, status: 'active' },
];

export const INITIAL_SUBJECTS: Subject[] = [
  // Core Subjects
  { id: 1, subject_code: 'ENG101', subject_name: 'English Language', department: 'Languages', programme: 'Core / All Programmes', is_core: true, credit_hours: 4, status: 'active' },
  { id: 2, subject_code: 'MATH101', subject_name: 'Core Mathematics', department: 'Mathematics', programme: 'Core / All Programmes', is_core: true, credit_hours: 4, status: 'active' },
  { id: 3, subject_code: 'SCI101', subject_name: 'Integrated Science', department: 'Science', programme: 'Core / All Programmes', is_core: true, credit_hours: 4, status: 'active' },
  { id: 4, subject_code: 'SOC101', subject_name: 'Social Studies', department: 'Social Sciences', programme: 'Core / All Programmes', is_core: true, credit_hours: 3, status: 'active' },
  { id: 5, subject_code: 'ICT101', subject_name: 'Information & Comm. Technology', department: 'ICT', programme: 'Core / All Programmes', is_core: true, credit_hours: 2, status: 'active' },
  // Agriculture Electives
  { id: 6, subject_code: 'AGR201', subject_name: 'General Agricultural Science', department: 'Agriculture', programme: 'Agricultural Science', is_core: false, credit_hours: 3, status: 'active' },
  { id: 7, subject_code: 'AGR202', subject_name: 'Animal Husbandry', department: 'Agriculture', programme: 'Agricultural Science', is_core: false, credit_hours: 3, status: 'active' },
  { id: 8, subject_code: 'AGR203', subject_name: 'Horticulture & Crop Production', department: 'Agriculture', programme: 'Agricultural Science', is_core: false, credit_hours: 3, status: 'active' },
  // Science Electives
  { id: 9, subject_code: 'PHY201', subject_name: 'Physics', department: 'Science', programme: 'General Science', is_core: false, credit_hours: 3, status: 'active' },
  { id: 10, subject_code: 'CHE201', subject_name: 'Chemistry', department: 'Science', programme: 'General Science', is_core: false, credit_hours: 3, status: 'active' },
  { id: 11, subject_code: 'BIO201', subject_name: 'Biology', department: 'Science', programme: 'General Science', is_core: false, credit_hours: 3, status: 'active' },
  { id: 12, subject_code: 'EMATH201', subject_name: 'Elective Mathematics', department: 'Mathematics', programme: 'General Science / Business', is_core: false, credit_hours: 3, status: 'active' },
  // Arts & Business Electives
  { id: 13, subject_code: 'ECN201', subject_name: 'Economics', department: 'Social Sciences', programme: 'General Arts / Business', is_core: false, credit_hours: 3, status: 'active' },
  { id: 14, subject_code: 'GOV201', subject_name: 'Government', department: 'Social Sciences', programme: 'General Arts', is_core: false, credit_hours: 3, status: 'active' },
  { id: 15, subject_code: 'ACC201', subject_name: 'Financial Accounting', department: 'Business', programme: 'Business', is_core: false, credit_hours: 3, status: 'active' },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 1, teacher_id: 'TCH-001', first_name: 'Kofi', last_name: 'Mensah', email: 'kmensah@nkrofulagricshs.edu.gh', phone: '+233 24 123 4567', department: 'Mathematics', username: 'kmensah', status: 'active', qualification: 'B.Ed Mathematics (UEW)', created_at: '2023-09-01' },
  { id: 2, teacher_id: 'TCH-002', first_name: 'Akosua', last_name: 'Owusu', email: 'aowusu@nkrofulagricshs.edu.gh', phone: '+233 20 234 5678', department: 'Languages', username: 'aowusu', status: 'active', qualification: 'M.A. English (UCC)', created_at: '2023-09-01' },
  { id: 3, teacher_id: 'TCH-003', first_name: 'Francis', last_name: 'Boateng', email: 'fboateng@nkrofulagricshs.edu.gh', phone: '+233 27 345 6789', department: 'Agriculture', username: 'fboateng', status: 'active', qualification: 'B.Sc Agriculture (KNUST)', created_at: '2023-09-02' },
  { id: 4, teacher_id: 'TCH-004', first_name: 'Ebenezer', last_name: 'Quaye', email: 'equaye@nkrofulagricshs.edu.gh', phone: '+233 24 456 7891', department: 'Science', username: 'equaye', status: 'active', qualification: 'B.Sc Physics (KNUST)', created_at: '2023-09-02' },
  { id: 5, teacher_id: 'TCH-005', first_name: 'Gifty', last_name: 'Acheampong', email: 'gacheampong@nkrofulagricshs.edu.gh', phone: '+233 20 567 8902', department: 'Science', username: 'gacheampong', status: 'active', qualification: 'B.Sc Chemistry (UCC)', created_at: '2023-09-03' },
  { id: 6, teacher_id: 'TCH-006', first_name: 'David', last_name: 'Tetteh', email: 'dtetteh@nkrofulagricshs.edu.gh', phone: '+233 55 678 9013', department: 'Social Sciences', username: 'dtetteh', status: 'active', qualification: 'B.A. Social Studies (UEW)', created_at: '2023-09-03' },
  { id: 7, teacher_id: 'TCH-007', first_name: 'Priscilla', last_name: 'Danquah', email: 'pdanquah@nkrofulagricshs.edu.gh', phone: '+233 24 789 0124', department: 'Business', username: 'pdanquah', status: 'active', qualification: 'B.Com Accounting (UCC)', created_at: '2023-09-04' },
  { id: 8, teacher_id: 'TCH-008', first_name: 'Isaac', last_name: 'Blay', email: 'iblay@nkrofulagricshs.edu.gh', phone: '+233 26 890 1235', department: 'ICT', username: 'iblay', status: 'active', qualification: 'B.Sc Computer Science (KNUST)', created_at: '2023-09-05' },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    student_id: 'NASS/2023/001',
    admission_number: '230481',
    first_name: 'John',
    middle_name: 'Kwesi',
    last_name: 'Mensah',
    gender: 'Male',
    date_of_birth: '2007-04-14',
    nationality: 'Ghanaian',
    phone: '+233 24 991 2341',
    email: 'john.mensah@student.nkrofulagricshs.edu.gh',
    address: 'House No. 14, Nkroful Township, Western Region',
    guardian_name: 'Mr. Emmanuel Mensah',
    guardian_phone: '+233 24 555 1201',
    class_id: 7, // SHS 3 Agric 1
    programme: 'Agricultural Science',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 10:15:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 2,
    student_id: 'NASS/2023/002',
    admission_number: '230482',
    first_name: 'Abena',
    middle_name: 'Serwaa',
    last_name: 'Amponsah',
    gender: 'Female',
    date_of_birth: '2007-08-22',
    nationality: 'Ghanaian',
    phone: '+233 20 882 3452',
    email: 'abena.serwaa@student.nkrofulagricshs.edu.gh',
    address: 'Plot 8, Aiyinase Road, Ellembelle',
    guardian_name: 'Mrs. Mary Amponsah',
    guardian_phone: '+233 20 666 2302',
    class_id: 9, // SHS 3 Science
    programme: 'General Science',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 10:20:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 3,
    student_id: 'NASS/2023/003',
    admission_number: '230483',
    first_name: 'Emmanuel',
    middle_name: 'Kofi',
    last_name: 'Asare',
    gender: 'Male',
    date_of_birth: '2007-02-18',
    nationality: 'Ghanaian',
    phone: '+233 27 773 4563',
    email: 'emmanuel.asare@student.nkrofulagricshs.edu.gh',
    address: 'Esiama High Street, Western Region',
    guardian_name: 'Mr. Patrick Asare',
    guardian_phone: '+233 27 777 3403',
    class_id: 8, // SHS 3 Arts
    programme: 'General Arts',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 10:30:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 4,
    student_id: 'NASS/2023/004',
    admission_number: '230484',
    first_name: 'Faustina',
    middle_name: 'Akua',
    last_name: 'Boateng',
    gender: 'Female',
    date_of_birth: '2007-11-05',
    nationality: 'Ghanaian',
    phone: '+233 55 664 5674',
    email: 'faustina.boateng@student.nkrofulagricshs.edu.gh',
    address: 'Atuabo Gas Enclave Area, Ellembelle',
    guardian_name: 'Mr. Frank Boateng',
    guardian_phone: '+233 55 888 4504',
    class_id: 7, // SHS 3 Agric 1
    programme: 'Agricultural Science',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 10:45:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 5,
    student_id: 'NASS/2024/005',
    admission_number: '240501',
    first_name: 'Yaw',
    middle_name: 'Boadi',
    last_name: 'Osei',
    gender: 'Male',
    date_of_birth: '2008-05-19',
    nationality: 'Ghanaian',
    phone: '+233 24 555 6785',
    email: 'yaw.osei@student.nkrofulagricshs.edu.gh',
    address: 'Asasetre Village, Ellembelle',
    guardian_name: 'Madam Grace Osei',
    guardian_phone: '+233 24 999 5605',
    class_id: 4, // SHS 2 Agric 1
    programme: 'Agricultural Science',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 09:00:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 6,
    student_id: 'NASS/2024/006',
    admission_number: '240502',
    first_name: 'Gifty',
    middle_name: 'Esi',
    last_name: 'Appiah',
    gender: 'Female',
    date_of_birth: '2008-01-30',
    nationality: 'Ghanaian',
    phone: '+233 20 444 7896',
    email: 'gifty.appiah@student.nkrofulagricshs.edu.gh',
    address: 'Kikam Town, Ellembelle',
    guardian_name: 'Mr. Joseph Appiah',
    guardian_phone: '+233 20 111 6706',
    class_id: 5, // SHS 2 Science A
    programme: 'General Science',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 09:15:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 7,
    student_id: 'NASS/2024/007',
    admission_number: '240503',
    first_name: 'Samuel',
    middle_name: 'Kweku',
    last_name: 'Frimpong',
    gender: 'Male',
    date_of_birth: '2008-09-11',
    nationality: 'Ghanaian',
    phone: '+233 27 333 8907',
    email: 'samuel.frimpong@student.nkrofulagricshs.edu.gh',
    address: 'Salman Mining Residential, Ellembelle',
    guardian_name: 'Mr. Daniel Frimpong',
    guardian_phone: '+233 27 222 7807',
    class_id: 6, // SHS 2 Business
    programme: 'Business',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 09:30:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 8,
    student_id: 'NASS/2024/008',
    admission_number: '240504',
    first_name: 'Akua',
    middle_name: 'Afriyie',
    last_name: 'Konadu',
    gender: 'Female',
    date_of_birth: '2008-07-16',
    nationality: 'Ghanaian',
    phone: '+233 55 222 9018',
    email: 'akua.konadu@student.nkrofulagricshs.edu.gh',
    address: 'Teleku Bokazo, Ellembelle',
    guardian_name: 'Mrs. Esther Konadu',
    guardian_phone: '+233 55 333 8908',
    class_id: 4, // SHS 2 Agric 1
    programme: 'Agricultural Science',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 09:45:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 9,
    student_id: 'NASS/2025/009',
    admission_number: '250601',
    first_name: 'Peter',
    middle_name: 'Kwame',
    last_name: 'Danso',
    gender: 'Male',
    date_of_birth: '2009-03-25',
    nationality: 'Ghanaian',
    phone: '+233 24 111 0129',
    email: 'peter.danso@student.nkrofulagricshs.edu.gh',
    address: 'Nkroful Memorial Rd, Block D',
    guardian_name: 'Mr. George Danso',
    guardian_phone: '+233 24 444 9019',
    class_id: 1, // SHS 1 Agric 1
    programme: 'Agricultural Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 08:30:00',
    updated_at: '2025-09-10 08:30:00'
  },
  {
    id: 10,
    student_id: 'NASS/2025/010',
    admission_number: '250602',
    first_name: 'Beatrice',
    middle_name: 'Manso',
    last_name: 'Kusi',
    gender: 'Female',
    date_of_birth: '2009-06-12',
    nationality: 'Ghanaian',
    phone: '+233 20 000 1230',
    email: 'beatrice.kusi@student.nkrofulagricshs.edu.gh',
    address: 'Awebo Community, Ellembelle',
    guardian_name: 'Mrs. Janet Kusi',
    guardian_phone: '+233 20 555 0120',
    class_id: 2, // SHS 1 Science A
    programme: 'General Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 08:45:00',
    updated_at: '2025-09-10 08:45:00'
  },
  {
    id: 11,
    student_id: 'NASS/2025/011',
    admission_number: '250603',
    first_name: 'Isaac',
    middle_name: 'Panyin',
    last_name: 'Agyei',
    gender: 'Male',
    date_of_birth: '2009-10-04',
    nationality: 'Ghanaian',
    phone: '+233 27 999 2341',
    email: 'isaac.agyei@student.nkrofulagricshs.edu.gh',
    address: 'Essiama Teachers Quarters',
    guardian_name: 'Mr. Paul Agyei',
    guardian_phone: '+233 27 666 1231',
    class_id: 3, // SHS 1 Arts 1
    programme: 'General Arts',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 09:00:00',
    updated_at: '2025-09-10 09:00:00'
  },
  {
    id: 12,
    student_id: 'NASS/2025/012',
    admission_number: '250604',
    first_name: 'Comfort',
    middle_name: 'Yaa',
    last_name: 'Darko',
    gender: 'Female',
    date_of_birth: '2009-12-08',
    nationality: 'Ghanaian',
    phone: '+233 55 888 3452',
    email: 'comfort.darko@student.nkrofulagricshs.edu.gh',
    address: 'Ampain Refugee Camp Settlement Area',
    guardian_name: 'Mrs. Rebecca Darko',
    guardian_phone: '+233 55 777 2342',
    class_id: 1, // SHS 1 Agric 1
    programme: 'Agricultural Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 09:15:00',
    updated_at: '2025-09-10 09:15:00'
  },
  {
    id: 13,
    student_id: 'NASS/2023/013',
    admission_number: '230495',
    first_name: 'Daniel',
    middle_name: 'Kakra',
    last_name: 'Boakye',
    gender: 'Male',
    date_of_birth: '2007-06-14',
    nationality: 'Ghanaian',
    phone: '+233 24 777 4563',
    email: 'daniel.boakye@student.nkrofulagricshs.edu.gh',
    address: 'Eikwe Hospital Road',
    guardian_name: 'Dr. Joseph Boakye',
    guardian_phone: '+233 24 888 3453',
    class_id: 9, // SHS 3 Science
    programme: 'General Science',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 11:00:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 14,
    student_id: 'NASS/2023/014',
    admission_number: '230496',
    first_name: 'Grace',
    middle_name: 'Adjoa',
    last_name: 'Badu',
    gender: 'Female',
    date_of_birth: '2007-03-29',
    nationality: 'Ghanaian',
    phone: '+233 20 666 5674',
    email: 'grace.badu@student.nkrofulagricshs.edu.gh',
    address: 'Anokyi Beach Road, Ellembelle',
    guardian_name: 'Mrs. Cynthia Badu',
    guardian_phone: '+233 20 999 4564',
    class_id: 8, // SHS 3 Arts
    programme: 'General Arts',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 11:15:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 15,
    student_id: 'NASS/2024/015',
    admission_number: '240515',
    first_name: 'Kofi',
    middle_name: 'Annan',
    last_name: 'Nyame',
    gender: 'Male',
    date_of_birth: '2008-04-08',
    nationality: 'Ghanaian',
    phone: '+233 27 555 6785',
    email: 'kofi.nyame@student.nkrofulagricshs.edu.gh',
    address: 'Nkroful Post Office Sq',
    guardian_name: 'Mr. Kwesi Nyame',
    guardian_phone: '+233 27 000 5675',
    class_id: 4, // SHS 2 Agric 1
    programme: 'Agricultural Science',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 10:00:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 16,
    student_id: 'NASS/2024/016',
    admission_number: '240516',
    first_name: 'Doris',
    middle_name: 'Aba',
    last_name: 'Mensah',
    gender: 'Female',
    date_of_birth: '2008-10-17',
    nationality: 'Ghanaian',
    phone: '+233 55 444 7896',
    email: 'doris.mensah@student.nkrofulagricshs.edu.gh',
    address: 'Bakanta Fishing Village',
    guardian_name: 'Mr. Stephen Mensah',
    guardian_phone: '+233 55 111 6786',
    class_id: 5, // SHS 2 Science A
    programme: 'General Science',
    year_group: '2024-2027',
    admission_year: 2024,
    graduation_year: 2027,
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2024-09-12 10:15:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 17,
    student_id: 'NASS/2025/017',
    admission_number: '250617',
    first_name: 'Prince',
    middle_name: 'Nana',
    last_name: 'Opoku',
    gender: 'Male',
    date_of_birth: '2009-08-01',
    nationality: 'Ghanaian',
    phone: '+233 24 333 8907',
    email: 'prince.opoku@student.nkrofulagricshs.edu.gh',
    address: 'Asasetre New Town',
    guardian_name: 'Nana Opoku Ware II',
    guardian_phone: '+233 24 222 7897',
    class_id: 1, // SHS 1 Agric 1
    programme: 'Agricultural Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 09:30:00',
    updated_at: '2025-09-10 09:30:00'
  },
  {
    id: 18,
    student_id: 'NASS/2025/018',
    admission_number: '250618',
    first_name: 'Eunice',
    middle_name: 'Akosua',
    last_name: 'Frempong',
    gender: 'Female',
    date_of_birth: '2009-02-14',
    nationality: 'Ghanaian',
    phone: '+233 20 222 9018',
    email: 'eunice.frempong@student.nkrofulagricshs.edu.gh',
    address: 'Sanzule Gas Processing Camp Road',
    guardian_name: 'Mrs. Victoria Frempong',
    guardian_phone: '+233 20 333 8908',
    class_id: 2, // SHS 1 Science A
    programme: 'General Science',
    year_group: '2025-2028',
    admission_year: 2025,
    graduation_year: 2028,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2025-09-10 09:45:00',
    updated_at: '2025-09-10 09:45:00'
  },
  {
    id: 19,
    student_id: 'NASS/2023/019',
    admission_number: '230499',
    first_name: 'Philip',
    middle_name: 'Kwaku',
    last_name: 'Arthur',
    gender: 'Male',
    date_of_birth: '2007-07-07',
    nationality: 'Ghanaian',
    phone: '+233 27 111 0129',
    email: 'philip.arthur@student.nkrofulagricshs.edu.gh',
    address: 'Nkroful Health Centre Quarters',
    guardian_name: 'Mr. Isaac Arthur',
    guardian_phone: '+233 27 444 9019',
    class_id: 7, // SHS 3 Agric 1
    programme: 'Agricultural Science',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 11:30:00',
    updated_at: '2025-09-10 12:00:00'
  },
  {
    id: 20,
    student_id: 'NASS/2023/020',
    admission_number: '230500',
    first_name: 'Rita',
    middle_name: 'Mansah',
    last_name: 'Quansah',
    gender: 'Female',
    date_of_birth: '2007-09-20',
    nationality: 'Ghanaian',
    phone: '+233 55 000 1230',
    email: 'rita.quansah@student.nkrofulagricshs.edu.gh',
    address: 'Kikam Vocational Junction',
    guardian_name: 'Mrs. Beatrice Quansah',
    guardian_phone: '+233 55 555 0120',
    class_id: 8, // SHS 3 Arts
    programme: 'General Arts',
    year_group: '2023-2026',
    admission_year: 2023,
    graduation_year: 2026,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    created_at: '2023-09-15 11:45:00',
    updated_at: '2025-09-10 12:00:00'
  }
];

export const INITIAL_TEACHER_ASSIGNMENTS: TeacherAssignment[] = [
  // Mr Kofi Mensah (Teacher 1 / TCH-001) - Core Math
  { id: 1, teacher_id: 1, subject_id: 2, class_id: 1, academic_year_id: 3 }, // SHS 1 Agric 1
  { id: 2, teacher_id: 1, subject_id: 2, class_id: 4, academic_year_id: 3 }, // SHS 2 Agric 1
  { id: 3, teacher_id: 1, subject_id: 2, class_id: 7, academic_year_id: 3 }, // SHS 3 Agric 1
  { id: 4, teacher_id: 1, subject_id: 12, class_id: 5, academic_year_id: 3 }, // Elective Math to SHS 2 Science A
  // Madam Akosua Owusu (Teacher 2 / TCH-002) - English
  { id: 5, teacher_id: 2, subject_id: 1, class_id: 1, academic_year_id: 3 },
  { id: 6, teacher_id: 2, subject_id: 1, class_id: 4, academic_year_id: 3 },
  { id: 7, teacher_id: 2, subject_id: 1, class_id: 7, academic_year_id: 3 },
  // Mr Francis Boateng (Teacher 3 / TCH-003) - General Agric & Animal Husbandry
  { id: 8, teacher_id: 3, subject_id: 6, class_id: 1, academic_year_id: 3 },
  { id: 9, teacher_id: 3, subject_id: 6, class_id: 4, academic_year_id: 3 },
  { id: 10, teacher_id: 3, subject_id: 6, class_id: 7, academic_year_id: 3 },
  { id: 11, teacher_id: 3, subject_id: 7, class_id: 7, academic_year_id: 3 },
  // Mr Ebenezer Quaye (Teacher 4 / TCH-004) - Physics & Integrated Science
  { id: 12, teacher_id: 4, subject_id: 3, class_id: 1, academic_year_id: 3 },
  { id: 13, teacher_id: 4, subject_id: 3, class_id: 7, academic_year_id: 3 },
  { id: 14, teacher_id: 4, subject_id: 9, class_id: 9, academic_year_id: 3 },
  // Madam Gifty Acheampong (Teacher 5 / TCH-005) - Chemistry & Integrated Sci
  { id: 15, teacher_id: 5, subject_id: 10, class_id: 9, academic_year_id: 3 },
  { id: 16, teacher_id: 5, subject_id: 3, class_id: 4, academic_year_id: 3 },
  // Mr David Tetteh (Teacher 6 / TCH-006) - Social Studies & Government
  { id: 17, teacher_id: 6, subject_id: 4, class_id: 1, academic_year_id: 3 },
  { id: 18, teacher_id: 6, subject_id: 4, class_id: 7, academic_year_id: 3 },
  { id: 19, teacher_id: 6, subject_id: 14, class_id: 8, academic_year_id: 3 },
  // Madam Priscilla Danquah (Teacher 7 / TCH-007) - Business / Accounting
  { id: 20, teacher_id: 7, subject_id: 15, class_id: 6, academic_year_id: 3 },
  // Mr Isaac Blay (Teacher 8 / TCH-008) - ICT
  { id: 21, teacher_id: 8, subject_id: 5, class_id: 1, academic_year_id: 3 },
  { id: 22, teacher_id: 8, subject_id: 5, class_id: 4, academic_year_id: 3 },
  { id: 23, teacher_id: 8, subject_id: 5, class_id: 7, academic_year_id: 3 },
];

// Helper to seed multi-year results for students so transcripts have complete historical records
export function generateInitialResults(): ResultRecord[] {
  const results: ResultRecord[] = [];
  let recordId = 1;

  // Let's create realistic past results for Student 1 (John Mensah - Agric):
  // SHS 1 (2023/2024) Terms 1, 2, 3
  // SHS 2 (2024/2025) Terms 1, 2, 3
  // SHS 3 (2025/2026) Term 1 (approved)
  const student1Subjects = [
    { subId: 1, tchId: 2 }, // English
    { subId: 2, tchId: 1 }, // Core Math
    { subId: 3, tchId: 4 }, // Integrated Science
    { subId: 4, tchId: 6 }, // Social Studies
    { subId: 5, tchId: 8 }, // ICT
    { subId: 6, tchId: 3 }, // Gen Agric
    { subId: 7, tchId: 3 }, // Animal Husbandry
    { subId: 8, tchId: 3 }, // Horticulture
  ];

  // John Mensah results
  const jmTerms = [
    { termId: 1, classId: 1, yearId: 1, label: 'SHS 1 Term 1' },
    { termId: 2, classId: 1, yearId: 1, label: 'SHS 1 Term 2' },
    { termId: 3, classId: 1, yearId: 1, label: 'SHS 1 Term 3' },
    { termId: 4, classId: 4, yearId: 2, label: 'SHS 2 Term 1' },
    { termId: 5, classId: 4, yearId: 2, label: 'SHS 2 Term 2' },
    { termId: 6, classId: 4, yearId: 2, label: 'SHS 2 Term 3' },
    { termId: 7, classId: 7, yearId: 3, label: 'SHS 3 Term 1' },
  ];

  const scoresDistribution: Record<number, { a: number; e: number }[]> = {
    1: [ // English
      { a: 24, e: 58 }, { a: 25, e: 60 }, { a: 26, e: 61 },
      { a: 26, e: 62 }, { a: 27, e: 60 }, { a: 28, e: 63 },
      { a: 27, e: 62 }
    ],
    2: [ // Core Math
      { a: 27, e: 63 }, { a: 28, e: 65 }, { a: 29, e: 66 },
      { a: 28, e: 64 }, { a: 29, e: 67 }, { a: 30, e: 68 },
      { a: 29, e: 66 }
    ],
    3: [ // Integrated Science
      { a: 26, e: 59 }, { a: 27, e: 61 }, { a: 28, e: 62 },
      { a: 27, e: 63 }, { a: 28, e: 64 }, { a: 29, e: 65 },
      { a: 28, e: 63 }
    ],
    4: [ // Social Studies
      { a: 25, e: 57 }, { a: 26, e: 58 }, { a: 27, e: 60 },
      { a: 27, e: 59 }, { a: 28, e: 61 }, { a: 28, e: 62 },
      { a: 28, e: 60 }
    ],
    5: [ // ICT
      { a: 28, e: 65 }, { a: 28, e: 66 }, { a: 29, e: 67 },
      { a: 29, e: 68 }, { a: 29, e: 68 }, { a: 30, e: 69 },
      { a: 29, e: 67 }
    ],
    6: [ // Gen Agric
      { a: 29, e: 66 }, { a: 29, e: 68 }, { a: 30, e: 67 },
      { a: 29, e: 68 }, { a: 30, e: 69 }, { a: 30, e: 69 },
      { a: 30, e: 68 }
    ],
    7: [ // Animal Husbandry
      { a: 27, e: 62 }, { a: 28, e: 63 }, { a: 28, e: 64 },
      { a: 28, e: 65 }, { a: 29, e: 66 }, { a: 29, e: 67 },
      { a: 29, e: 65 }
    ],
    8: [ // Horticulture
      { a: 26, e: 61 }, { a: 27, e: 63 }, { a: 28, e: 64 },
      { a: 28, e: 65 }, { a: 29, e: 66 }, { a: 29, e: 67 },
      { a: 29, e: 66 }
    ],
  };

  jmTerms.forEach((term, tIdx) => {
    student1Subjects.forEach((sub) => {
      const scorePair = scoresDistribution[sub.subId]?.[tIdx] || { a: 25, e: 55 };
      const total = scorePair.a + scorePair.e;
      let grade = 'A1';
      let gp = 1;
      let remarks = 'Excellent';

      if (total >= 80) { grade = 'A1'; gp = 1; remarks = 'Excellent'; }
      else if (total >= 75) { grade = 'B2'; gp = 2; remarks = 'Very Good'; }
      else if (total >= 70) { grade = 'B3'; gp = 3; remarks = 'Good'; }
      else if (total >= 65) { grade = 'C4'; gp = 4; remarks = 'Credit'; }
      else if (total >= 60) { grade = 'C5'; gp = 5; remarks = 'Credit'; }
      else if (total >= 55) { grade = 'C6'; gp = 6; remarks = 'Credit'; }
      else if (total >= 50) { grade = 'D7'; gp = 7; remarks = 'Pass'; }
      else if (total >= 45) { grade = 'E8'; gp = 8; remarks = 'Pass'; }
      else { grade = 'F9'; gp = 9; remarks = 'Fail'; }

      results.push({
        id: recordId++,
        student_id: 1, // John Mensah
        subject_id: sub.subId,
        class_id: term.classId,
        academic_year_id: term.yearId,
        term_id: term.termId,
        assessment_score: scorePair.a,
        exam_score: scorePair.e,
        total_score: total,
        grade,
        grade_point: gp,
        remarks,
        teacher_id: sub.tchId,
        status: 'published',
        approved_at: '2024-07-21 10:00:00',
        approved_by: 1,
        created_at: '2024-07-18 14:00:00',
        updated_at: '2024-07-21 10:00:00'
      });
    });
  });

  // Seed sample results for Student 2 (Abena Serwaa - Science)
  const student2Subjects = [
    { subId: 1, tchId: 2, a: 28, e: 65 }, // English
    { subId: 2, tchId: 1, a: 29, e: 68 }, // Core Math
    { subId: 3, tchId: 4, a: 29, e: 67 }, // Int Science
    { subId: 4, tchId: 6, a: 27, e: 60 }, // Social Studies
    { subId: 5, tchId: 8, a: 28, e: 64 }, // ICT
    { subId: 9, tchId: 4, a: 28, e: 65 }, // Physics
    { subId: 10, tchId: 5, a: 29, e: 66 }, // Chemistry
    { subId: 11, tchId: 5, a: 28, e: 64 }, // Biology
    { subId: 12, tchId: 1, a: 29, e: 68 }, // Elective Math
  ];

  student2Subjects.forEach((sub) => {
    const total = sub.a + sub.e;
    results.push({
      id: recordId++,
      student_id: 2,
      subject_id: sub.subId,
      class_id: 9,
      academic_year_id: 3,
      term_id: 7,
      assessment_score: sub.a,
      exam_score: sub.e,
      total_score: total,
      grade: total >= 80 ? 'A1' : 'B2',
      grade_point: total >= 80 ? 1 : 2,
      remarks: total >= 80 ? 'Excellent' : 'Very Good',
      teacher_id: sub.tchId,
      status: 'approved',
      approved_at: '2025-12-19 11:30:00',
      approved_by: 1,
      created_at: '2025-12-18 15:00:00',
      updated_at: '2025-12-19 11:30:00'
    });
  });

  // Seed some pending/submitted results for SHS 1 Agric 1 (Teacher Kofi Mensah entry in progress)
  // Students 9, 12, 17 in Class 1 (SHS 1 Agric 1)
  const draftClassStudents = [9, 12, 17];
  draftClassStudents.forEach((stuId, idx) => {
    const a = 23 + idx * 2;
    const e = 52 + idx * 4;
    const tot = a + e;
    results.push({
      id: recordId++,
      student_id: stuId,
      subject_id: 2, // Core Math
      class_id: 1,
      academic_year_id: 3,
      term_id: 7,
      assessment_score: a,
      exam_score: e,
      total_score: tot,
      grade: tot >= 80 ? 'A1' : tot >= 75 ? 'B2' : 'B3',
      grade_point: tot >= 80 ? 1 : tot >= 75 ? 2 : 3,
      remarks: tot >= 80 ? 'Excellent' : 'Very Good',
      teacher_id: 1, // Kofi Mensah
      status: 'submitted', // submitted awaiting Admin approval!
      submitted_at: '2025-12-19 16:20:00',
      created_at: '2025-12-19 14:10:00',
      updated_at: '2025-12-19 16:20:00'
    });
  });

  return results;
}

export const INITIAL_TRANSCRIPTS: TranscriptVerification[] = [
  {
    id: 1,
    transcript_code: 'NASS-TR-2026-000125',
    student_id: 1, // John Kwesi Mensah
    issue_date: '2026-08-15',
    issued_by: 'Academic Board & Examinations Secretariat',
    graduation_status: 'Graduated — Distinction',
    cumulative_gpa: 3.88,
    overall_remark: 'Outstanding Academic Performance. Demonstrates exemplary dedication to Agricultural Science.',
    status: 'valid'
  },
  {
    id: 2,
    transcript_code: 'NASS-TR-2026-000126',
    student_id: 2, // Abena Serwaa Amponsah
    issue_date: '2026-08-15',
    issued_by: 'Academic Board & Examinations Secretariat',
    graduation_status: 'Graduated — Distinction',
    cumulative_gpa: 3.94,
    overall_remark: 'Exceptional Aptitude in Pure Sciences and Mathematics.',
    status: 'valid'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 1,
    user_id: 1,
    username: 'admin',
    role: 'super_admin',
    action: 'System Boot & Configuration',
    description: 'Initialized 2025/2026 academic calendar and curriculum standards.',
    ip_address: '192.168.1.10',
    created_at: '2025-09-01 08:30:12'
  },
  {
    id: 2,
    user_id: 2,
    username: 'teacher',
    role: 'teacher',
    action: 'Result Batch Submitted',
    description: 'Submitted Term 1 marks for Core Mathematics in SHS 1 Agric 1 (3 students).',
    ip_address: '192.168.1.45',
    created_at: '2025-12-19 16:20:00'
  },
  {
    id: 3,
    user_id: 1,
    username: 'admin',
    role: 'super_admin',
    action: 'Result Approved',
    description: 'Approved Science department terminal exam marks for SHS 3 Science A.',
    ip_address: '192.168.1.10',
    created_at: '2025-12-19 17:05:44'
  },
  {
    id: 4,
    user_id: 1,
    username: 'admin',
    role: 'super_admin',
    action: 'Transcript Issued',
    description: 'Generated official sealed transcript NASS-TR-2026-000125 for John Kwesi Mensah.',
    ip_address: '192.168.1.10',
    created_at: '2026-08-15 11:14:02'
  }
];
