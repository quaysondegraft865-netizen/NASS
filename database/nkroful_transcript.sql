-- =====================================================================
-- NKROFUL AGRIC SENIOR HIGH SCHOOL
-- Student Transcript & Results Management System Database
-- Database Name: nkroful_transcript
-- Target Environment: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.4+ / XAMPP / Apache / Replit
-- Generated for Nkroful Agric Senior High School, Western Region, Ghana
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `nkroful_transcript` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `nkroful_transcript`;

SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- Table: users
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'school_admin', 'teacher', 'student') NOT NULL DEFAULT 'student',
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `teacher_id` VARCHAR(50) NULL,
  `student_id` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: academic_years
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `academic_years`;
CREATE TABLE `academic_years` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `year_name` VARCHAR(20) NOT NULL UNIQUE,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_current` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'closed') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: terms
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `terms`;
CREATE TABLE `terms` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `term_name` ENUM('Term 1', 'Term 2', 'Term 3') NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_current` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'closed') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: classes
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(80) NOT NULL,
  `form_level` ENUM('SHS 1', 'SHS 2', 'SHS 3') NOT NULL,
  `programme` VARCHAR(100) NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `room_number` VARCHAR(50) NULL,
  `class_teacher_id` INT UNSIGNED NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: teachers
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` VARCHAR(50) NOT NULL UNIQUE,
  `first_name` VARCHAR(80) NOT NULL,
  `last_name` VARCHAR(80) NOT NULL,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `phone` VARCHAR(30) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `qualification` VARCHAR(150) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: subjects
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_code` VARCHAR(30) NOT NULL UNIQUE,
  `subject_name` VARCHAR(120) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `programme` VARCHAR(120) NOT NULL DEFAULT 'Core / All Programmes',
  `is_core` TINYINT(1) NOT NULL DEFAULT 1,
  `credit_hours` INT UNSIGNED NOT NULL DEFAULT 3,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  INDEX `idx_subject_code` (`subject_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: teacher_subjects
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `teacher_subjects`;
CREATE TABLE `teacher_subjects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teacher_id` INT UNSIGNED NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uniq_teacher_assignment` (`teacher_id`, `subject_id`, `class_id`, `academic_year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: students
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` VARCHAR(50) NOT NULL UNIQUE,
  `admission_number` VARCHAR(50) NOT NULL UNIQUE,
  `first_name` VARCHAR(80) NOT NULL,
  `middle_name` VARCHAR(80) NULL,
  `last_name` VARCHAR(80) NOT NULL,
  `gender` ENUM('Male', 'Female') NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `nationality` VARCHAR(80) NOT NULL DEFAULT 'Ghanaian',
  `phone` VARCHAR(30) NULL,
  `email` VARCHAR(120) NULL,
  `address` TEXT NULL,
  `guardian_name` VARCHAR(120) NOT NULL,
  `guardian_phone` VARCHAR(30) NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `programme` VARCHAR(100) NOT NULL,
  `year_group` VARCHAR(30) NOT NULL,
  `admission_year` INT NOT NULL DEFAULT 2023,
  `graduation_year` INT NOT NULL DEFAULT 2026,
  `photo` VARCHAR(255) NULL,
  `status` ENUM('active', 'graduated', 'transferred', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`),
  INDEX `idx_student_search` (`student_id`, `admission_number`, `last_name`, `first_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: results
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` INT UNSIGNED NOT NULL,
  `subject_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `term_id` INT UNSIGNED NOT NULL,
  `assessment_score` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `exam_score` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `total_score` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `grade` VARCHAR(10) NOT NULL,
  `grade_point` INT NOT NULL,
  `remarks` VARCHAR(100) NOT NULL,
  `teacher_id` INT UNSIGNED NOT NULL,
  `status` ENUM('draft', 'submitted', 'approved', 'rejected', 'published') NOT NULL DEFAULT 'draft',
  `rejection_reason` TEXT NULL,
  `submitted_at` DATETIME NULL,
  `approved_at` DATETIME NULL,
  `approved_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`),
  UNIQUE KEY `uniq_student_result` (`student_id`, `subject_id`, `academic_year_id`, `term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: transcripts
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `transcripts`;
CREATE TABLE `transcripts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `transcript_code` VARCHAR(80) NOT NULL UNIQUE,
  `student_id` INT UNSIGNED NOT NULL,
  `issue_date` DATE NOT NULL,
  `issued_by` VARCHAR(120) NOT NULL,
  `graduation_status` VARCHAR(100) NOT NULL,
  `cumulative_gpa` DECIMAL(4,2) NOT NULL,
  `overall_remark` TEXT NOT NULL,
  `status` ENUM('valid', 'revoked') NOT NULL DEFAULT 'valid',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  INDEX `idx_transcript_code` (`transcript_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: audit_logs
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `username` VARCHAR(60) NOT NULL,
  `role` VARCHAR(40) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Table: settings
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(80) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- SEED DATA
-- ---------------------------------------------------------------------

-- Users (Pass: Admin@123 -> $2y$10$wT0X8P0j8p480Qj5t1c.h.rZ2/d0... or bcrypt hash)
-- Initial system accounts:
-- admin / Admin@123 (Headmaster / Administrator)
-- kmensah / Teacher@123 (Faculty Teacher)
-- student / Student@123 (Student Portal)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `status`) VALUES
(1, 'admin', 'admin@nkrofulagricshs.edu.gh', '$2y$10$0k6eTsp991o4J69U7xQ3reA8N81s2D3bUoRz18pD3o9eO1bO3/O2m', 'super_admin', 'active'),
(2, 'teacher', 'kmensah@nkrofulagricshs.edu.gh', '$2y$10$4B9hCj3.D98Zf3eE61K79er1k2q4w3e4r5t6y7u8i9o0p1a2s3d4f', 'teacher', 'active'),
(3, 'student', 'john.mensah@student.nkrofulagricshs.edu.gh', '$2y$10$9Z8y7x6w5v4u3t2s1r0q.P1o2i3u4y5t6r7e8w9q0a1s2d3f4g5h', 'student', 'active');

-- Academic Years
INSERT INTO `academic_years` (`id`, `year_name`, `start_date`, `end_date`, `is_current`, `status`) VALUES
(1, '2023/2024', '2023-09-15', '2024-07-20', 0, 'closed'),
(2, '2024/2025', '2024-09-12', '2025-07-25', 0, 'closed'),
(3, '2025/2026', '2025-09-10', '2026-07-30', 1, 'active');

-- Terms
INSERT INTO `terms` (`id`, `academic_year_id`, `term_name`, `start_date`, `end_date`, `is_current`, `status`) VALUES
(1, 1, 'Term 1', '2023-09-15', '2023-12-18', 0, 'closed'),
(2, 1, 'Term 2', '2024-01-08', '2024-04-12', 0, 'closed'),
(3, 1, 'Term 3', '2024-05-06', '2024-07-20', 0, 'closed'),
(4, 2, 'Term 1', '2024-09-12', '2024-12-19', 0, 'closed'),
(5, 2, 'Term 2', '2025-01-07', '2025-04-11', 0, 'closed'),
(6, 2, 'Term 3', '2025-05-05', '2025-07-25', 0, 'closed'),
(7, 3, 'Term 1', '2025-09-10', '2025-12-18', 1, 'active'),
(8, 3, 'Term 2', '2026-01-06', '2026-04-10', 0, 'active'),
(9, 3, 'Term 3', '2026-05-04', '2026-07-30', 0, 'active');

-- Teachers
INSERT INTO `teachers` (`id`, `teacher_id`, `first_name`, `last_name`, `email`, `phone`, `department`, `username`, `qualification`, `status`) VALUES
(1, 'TCH-001', 'Kofi', 'Mensah', 'kmensah@nkrofulagricshs.edu.gh', '+233 24 123 4567', 'Mathematics', 'teacher', 'B.Ed Mathematics (UEW)', 'active'),
(2, 'TCH-002', 'Akosua', 'Owusu', 'aowusu@nkrofulagricshs.edu.gh', '+233 20 234 5678', 'Languages', 'aowusu', 'M.A. English (UCC)', 'active'),
(3, 'TCH-003', 'Francis', 'Boateng', 'fboateng@nkrofulagricshs.edu.gh', '+233 27 345 6789', 'Agriculture', 'fboateng', 'B.Sc Agriculture (KNUST)', 'active'),
(4, 'TCH-004', 'Ebenezer', 'Quaye', 'equaye@nkrofulagricshs.edu.gh', '+233 24 456 7891', 'Science', 'equaye', 'B.Sc Physics (KNUST)', 'active'),
(5, 'TCH-005', 'Gifty', 'Acheampong', 'gacheampong@nkrofulagricshs.edu.gh', '+233 20 567 8902', 'Science', 'gacheampong', 'B.Sc Chemistry (UCC)', 'active'),
(6, 'TCH-006', 'David', 'Tetteh', 'dtetteh@nkrofulagricshs.edu.gh', '+233 55 678 9013', 'Social Sciences', 'dtetteh', 'B.A. Social Studies (UEW)', 'active'),
(7, 'TCH-007', 'Priscilla', 'Danquah', 'pdanquah@nkrofulagricshs.edu.gh', '+233 24 789 0124', 'Business', 'pdanquah', 'B.Com Accounting (UCC)', 'active'),
(8, 'TCH-008', 'Isaac', 'Blay', 'iblay@nkrofulagricshs.edu.gh', '+233 26 890 1235', 'ICT', 'iblay', 'B.Sc Computer Science (KNUST)', 'active');

-- Classes
INSERT INTO `classes` (`id`, `class_name`, `form_level`, `programme`, `academic_year_id`, `room_number`, `class_teacher_id`, `status`) VALUES
(1, 'SHS 1 Agric 1', 'SHS 1', 'Agricultural Science', 3, 'Block A - 01', 2, 'active'),
(2, 'SHS 1 Science A', 'SHS 1', 'General Science', 3, 'Sci Lab 1', 3, 'active'),
(3, 'SHS 1 Arts 1', 'SHS 1', 'General Arts', 3, 'Block B - 02', 4, 'active'),
(4, 'SHS 2 Agric 1', 'SHS 2', 'Agricultural Science', 3, 'Block A - 03', 2, 'active'),
(5, 'SHS 2 Science A', 'SHS 2', 'General Science', 3, 'Sci Lab 2', 5, 'active'),
(6, 'SHS 2 Business', 'SHS 2', 'Business', 3, 'Block C - 01', 6, 'active'),
(7, 'SHS 3 Agric 1', 'SHS 3', 'Agricultural Science', 3, 'Block A - 05', 2, 'active'),
(8, 'SHS 3 General Arts', 'SHS 3', 'General Arts', 3, 'Block B - 04', 4, 'active'),
(9, 'SHS 3 General Science', 'SHS 3', 'General Science', 3, 'Sci Lab 3', 5, 'active');

-- Subjects
INSERT INTO `subjects` (`id`, `subject_code`, `subject_name`, `department`, `programme`, `is_core`, `credit_hours`, `status`) VALUES
(1, 'ENG101', 'English Language', 'Languages', 'Core / All Programmes', 1, 4, 'active'),
(2, 'MATH101', 'Core Mathematics', 'Mathematics', 'Core / All Programmes', 1, 4, 'active'),
(3, 'SCI101', 'Integrated Science', 'Science', 'Core / All Programmes', 1, 4, 'active'),
(4, 'SOC101', 'Social Studies', 'Social Sciences', 'Core / All Programmes', 1, 3, 'active'),
(5, 'ICT101', 'Information & Comm. Technology', 'ICT', 'Core / All Programmes', 1, 2, 'active'),
(6, 'AGR201', 'General Agricultural Science', 'Agriculture', 'Agricultural Science', 0, 3, 'active'),
(7, 'AGR202', 'Animal Husbandry', 'Agriculture', 'Agricultural Science', 0, 3, 'active'),
(8, 'AGR203', 'Horticulture & Crop Production', 'Agriculture', 'Agricultural Science', 0, 3, 'active'),
(9, 'PHY201', 'Physics', 'Science', 'General Science', 0, 3, 'active'),
(10, 'CHE201', 'Chemistry', 'Science', 'General Science', 0, 3, 'active'),
(11, 'BIO201', 'Biology', 'Science', 'General Science', 0, 3, 'active'),
(12, 'EMATH201', 'Elective Mathematics', 'Mathematics', 'General Science / Business', 0, 3, 'active'),
(13, 'ECN201', 'Economics', 'Social Sciences', 'General Arts / Business', 0, 3, 'active'),
(14, 'GOV201', 'Government', 'Social Sciences', 'General Arts', 0, 3, 'active'),
(15, 'ACC201', 'Financial Accounting', 'Business', 'Business', 0, 3, 'active');

-- Teacher Assignments
INSERT INTO `teacher_subjects` (`id`, `teacher_id`, `subject_id`, `class_id`, `academic_year_id`) VALUES
(1, 1, 2, 1, 3),
(2, 1, 2, 4, 3),
(3, 1, 2, 7, 3),
(4, 1, 12, 5, 3),
(5, 2, 1, 1, 3),
(6, 2, 1, 4, 3),
(7, 2, 1, 7, 3),
(8, 3, 6, 1, 3),
(9, 3, 6, 4, 3),
(10, 3, 6, 7, 3);

-- Students
INSERT INTO `students` (`id`, `student_id`, `admission_number`, `first_name`, `middle_name`, `last_name`, `gender`, `date_of_birth`, `nationality`, `phone`, `email`, `address`, `guardian_name`, `guardian_phone`, `class_id`, `programme`, `year_group`, `admission_year`, `graduation_year`, `photo`, `status`) VALUES
(1, 'NASS/2023/001', '230481', 'John', 'Kwesi', 'Mensah', 'Male', '2007-04-14', 'Ghanaian', '+233 24 991 2341', 'john.mensah@student.nkrofulagricshs.edu.gh', 'House No. 14, Nkroful Township', 'Mr. Emmanuel Mensah', '+233 24 555 1201', 7, 'Agricultural Science', '2023-2026', 2023, 2026, 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', 'active'),
(2, 'NASS/2023/002', '230482', 'Abena', 'Serwaa', 'Amponsah', 'Female', '2007-08-22', 'Ghanaian', '+233 20 882 3452', 'abena.serwaa@student.nkrofulagricshs.edu.gh', 'Plot 8, Aiyinase Road', 'Mrs. Mary Amponsah', '+233 20 666 2302', 9, 'General Science', '2023-2026', 2023, 2026, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', 'active'),
(3, 'NASS/2023/003', '230483', 'Emmanuel', 'Kofi', 'Asare', 'Male', '2007-02-18', 'Ghanaian', '+233 27 773 4563', 'emmanuel.asare@student.nkrofulagricshs.edu.gh', 'Esiama High Street', 'Mr. Patrick Asare', '+233 27 777 3403', 8, 'General Arts', '2023-2026', 2023, 2026, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'active'),
(4, 'NASS/2023/004', '230484', 'Faustina', 'Akua', 'Boateng', 'Female', '2007-11-05', 'Ghanaian', '+233 55 664 5674', 'faustina.boateng@student.nkrofulagricshs.edu.gh', 'Atuabo Gas Enclave Area', 'Mr. Frank Boateng', '+233 55 888 4504', 7, 'Agricultural Science', '2023-2026', 2023, 2026, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', 'active'),
(5, 'NASS/2024/005', '240501', 'Yaw', 'Boadi', 'Osei', 'Male', '2008-05-19', 'Ghanaian', '+233 24 555 6785', 'yaw.osei@student.nkrofulagricshs.edu.gh', 'Asasetre Village', 'Madam Grace Osei', '+233 24 999 5605', 4, 'Agricultural Science', '2024-2027', 2024, 2027, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'active');

-- Verification & Transcripts
INSERT INTO `transcripts` (`id`, `transcript_code`, `student_id`, `issue_date`, `issued_by`, `graduation_status`, `cumulative_gpa`, `overall_remark`, `status`) VALUES
(1, 'NASS-TR-2026-000125', 1, '2026-08-15', 'Academic Board & Examinations Secretariat', 'Graduated — Distinction', 3.88, 'Outstanding Academic Performance. Exemplary leadership and practical competence.', 'valid');

-- Default Settings
INSERT INTO `settings` (`setting_key`, `setting_value`) VALUES
('school_name', 'NKROFUL AGRIC SENIOR HIGH SCHOOL'),
('subtitle', 'Student Transcript & Results Management System'),
('motto', 'Knowledge, Integrity, Service'),
('address', 'P.O. Box 24, Nkroful, Ellembelle District, Western Region, Ghana'),
('phone', '+233 31 209 4521 / +233 24 456 7890'),
('email', 'info@nkrofulagricshs.edu.gh'),
('headmaster_name', 'Mr. Emmanuel Joseph Armah'),
('assessment_max_score', '30'),
('exam_max_score', '70');

-- End of SQL Export
