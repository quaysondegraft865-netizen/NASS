import React, { useState } from 'react';
import { Code2, Download, FileText, Database, Copy, Check, ExternalLink } from 'lucide-react';
import { exportPhpProjectZip } from '../../utils/phpExporter';

export const PhpSourceExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('database/nkroful_transcript.sql');
  const [copied, setCopied] = useState(false);

  const fileContents: Record<string, string> = {
    'database/nkroful_transcript.sql': `-- =====================================================================
-- NKROFUL AGRIC SENIOR HIGH SCHOOL - MySQL Database Schema
-- Database Name: nkroful_transcript
-- Target Environment: MySQL 5.7+ / 8.0+ / MariaDB / XAMPP / Replit
-- =====================================================================

CREATE DATABASE IF NOT EXISTS \`nkroful_transcript\` DEFAULT CHARACTER SET utf8mb4;
USE \`nkroful_transcript\`;

CREATE TABLE \`users\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(60) NOT NULL UNIQUE,
  \`email\` VARCHAR(120) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('super_admin', 'school_admin', 'teacher', 'student') NOT NULL,
  \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active'
);

CREATE TABLE \`students\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`student_id\` VARCHAR(50) NOT NULL UNIQUE,
  \`admission_number\` VARCHAR(50) NOT NULL UNIQUE,
  \`first_name\` VARCHAR(80) NOT NULL,
  \`last_name\` VARCHAR(80) NOT NULL,
  \`gender\` ENUM('Male', 'Female') NOT NULL,
  \`class_id\` INT UNSIGNED NOT NULL,
  \`programme\` VARCHAR(100) NOT NULL,
  \`admission_year\` INT NOT NULL,
  \`graduation_year\` INT NOT NULL
);

CREATE TABLE \`results\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`student_id\` INT UNSIGNED NOT NULL,
  \`subject_id\` INT UNSIGNED NOT NULL,
  \`class_id\` INT UNSIGNED NOT NULL,
  \`academic_year_id\` INT UNSIGNED NOT NULL,
  \`term_id\` INT UNSIGNED NOT NULL,
  \`assessment_score\` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  \`exam_score\` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  \`total_score\` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  \`grade\` VARCHAR(10) NOT NULL,
  \`grade_point\` INT NOT NULL,
  \`remarks\` VARCHAR(100) NOT NULL,
  \`teacher_id\` INT UNSIGNED NOT NULL,
  \`status\` ENUM('draft', 'submitted', 'approved', 'rejected', 'published') NOT NULL DEFAULT 'draft'
);

CREATE TABLE \`transcripts\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`transcript_code\` VARCHAR(80) NOT NULL UNIQUE,
  \`student_id\` INT UNSIGNED NOT NULL,
  \`issue_date\` DATE NOT NULL,
  \`graduation_status\` VARCHAR(100) NOT NULL,
  \`cumulative_gpa\` DECIMAL(4,2) NOT NULL,
  \`status\` ENUM('valid', 'revoked') NOT NULL DEFAULT 'valid'
);
`,

    'config/database.php': `<?php
declare(strict_types=1);

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'nkroful_transcript');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_CHARSET', 'utf8mb4');

function getDBConnection(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}
`,

    'config/auth.php': `<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isLoggedIn(): bool {
    return !empty($_SESSION['user_id']);
}

function requireRole(array|string $roles): void {
    if (!isLoggedIn()) {
        header("Location: /login.php");
        exit;
    }
    $allowed = is_array($roles) ? $roles : [$roles];
    if (!in_array($_SESSION['role'] ?? '', $allowed, true)) {
        http_response_code(403);
        die("403 Forbidden - Unauthorized Role Access");
    }
}
`,

    'verify.php': `<?php
require_once __DIR__ . '/config/database.php';
$code = trim($_GET['code'] ?? '');
if (!empty($code)) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("
        SELECT t.*, s.first_name, s.last_name, s.student_id as stu_id, s.programme 
        FROM transcripts t 
        JOIN students s ON t.student_id = s.id 
        WHERE t.transcript_code = ?
    ");
    $stmt->execute([$code]);
    $transcript = $stmt->fetch();
}
// Displays VALID DOCUMENT or INVALID / NOT FOUND
?>
`,

    'README.md': `# Nkroful Agric Senior High School
Student Transcript & Results Management System

1. Install XAMPP.
2. Start Apache and MySQL.
3. Import database/nkroful_transcript.sql via phpMyAdmin.
4. Extract files to htdocs/nkroful-transcript.
5. Log in with:
   - Admin: admin / Admin@123
   - Teacher: teacher / Teacher@123
   - Student: student / Student@123
`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContents[selectedFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-800" />
            <span>PHP & MySQL Deployment Architecture</span>
          </h2>
          <p className="text-xs text-slate-500">
            Inspect source files and download complete production-ready bundle for XAMPP, Apache, and Replit hosting.
          </p>
        </div>

        <button
          onClick={() => exportPhpProjectZip()}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Download Complete Project (.ZIP)</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-4 overflow-hidden">
        {/* Left: File Tree */}
        <div className="bg-slate-50 border-r border-slate-200 p-4 space-y-1 text-xs">
          <div className="font-bold text-[11px] text-slate-400 uppercase tracking-wider mb-2">
            Project Files
          </div>
          {Object.keys(fileContents).map(filename => (
            <button
              key={filename}
              onClick={() => setSelectedFile(filename)}
              className={`w-full text-left px-3 py-2 rounded-lg font-mono flex items-center gap-2 cursor-pointer transition-colors ${
                selectedFile === filename
                  ? 'bg-emerald-800 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filename.endsWith('.sql') ? (
                <Database className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              )}
              <span className="truncate">{filename}</span>
            </button>
          ))}
        </div>

        {/* Right: Code Viewer */}
        <div className="md:col-span-3 p-4 flex flex-col bg-slate-950 text-slate-200 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-emerald-400 font-bold">{selectedFile}</span>
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="overflow-x-auto flex-1 text-[11px] leading-relaxed text-slate-300 max-h-96">
            <code>{fileContents[selectedFile]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
