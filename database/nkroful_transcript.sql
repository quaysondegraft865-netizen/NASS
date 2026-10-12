-- =====================================================================
-- NKROFUL AGRIC SENIOR HIGH SCHOOL
-- Student Transcript & Results Management System Database
-- Database Name: nkroful_transcript
-- Target Environment: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.4+ / XAMPP / Apache / Replit
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
-- Demo seed data removed.
-- Add real records only after the system is configured for production use.
-- ---------------------------------------------------------------------
