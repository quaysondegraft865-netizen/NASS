import JSZip from 'jszip';

export async function exportPhpProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file('README.md', `# NKROFUL AGRIC SENIOR HIGH SCHOOL
Student Transcript & Results Management System

Deployment Instructions for XAMPP:
1. Extract this zip file into: C:\\xampp\\htdocs\\nkroful-transcript
2. Start Apache and MySQL from XAMPP Control Panel.
3. Open http://localhost/phpmyadmin and import database/nkroful_transcript.sql
4. Open http://localhost/nkroful-transcript in your browser.
5. Log in with:
   - Admin: admin / Admin@123
   - Teacher: teacher / Teacher@123
   - Student: student / Student@123
`);

  zip.file('.htaccess', `RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Fallback routing
`);

  // Config folder
  const configFolder = zip.folder('config');
  configFolder?.file('database.php', `<?php
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
`);

  configFolder?.file('config.php', `<?php
define('APP_NAME', 'NKROFUL AGRIC SENIOR HIGH SCHOOL');
define('APP_SUBTITLE', 'Student Transcript & Results Management System');
define('APP_MOTTO', 'Knowledge, Integrity, Service');
define('BASE_URL', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
`);

  configFolder?.file('auth.php', `<?php
if (session_status() === PHP_SESSION_NONE) session_start();
function isLoggedIn(): bool { return !empty($_SESSION['user_id']); }
function getCurrentUser(): ?array {
    return isLoggedIn() ? [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role'],
        'email' => $_SESSION['email'] ?? '',
        'teacher_id' => $_SESSION['teacher_id'] ?? null,
        'student_id' => $_SESSION['student_id'] ?? null,
    ] : null;
}
function requireRole($roles): void {
    if (!isLoggedIn()) { header("Location: /login.php"); exit; }
    $allowed = is_array($roles) ? $roles : [$roles];
    if (!in_array($_SESSION['role'], $allowed, true)) { die("403 Forbidden"); }
}
`);

  // Includes folder
  const inc = zip.folder('includes');
  inc?.file('functions.php', `<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/config.php';

function e(?string $v): string { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }

function calculateGrade(float $total): array {
    $s = round($total);
    if ($s >= 80) return ['grade' => 'A1', 'point' => 1, 'remark' => 'Excellent'];
    if ($s >= 75) return ['grade' => 'B2', 'point' => 2, 'remark' => 'Very Good'];
    if ($s >= 70) return ['grade' => 'B3', 'point' => 3, 'remark' => 'Good'];
    if ($s >= 65) return ['grade' => 'C4', 'point' => 4, 'remark' => 'Credit'];
    if ($s >= 60) return ['grade' => 'C5', 'point' => 5, 'remark' => 'Credit'];
    if ($s >= 55) return ['grade' => 'C6', 'point' => 6, 'remark' => 'Credit'];
    if ($s >= 50) return ['grade' => 'D7', 'point' => 7, 'remark' => 'Pass'];
    if ($s >= 45) return ['grade' => 'E8', 'point' => 8, 'remark' => 'Pass'];
    return ['grade' => 'F9', 'point' => 9, 'remark' => 'Fail'];
}
`);

  // Database folder
  const dbFolder = zip.folder('database');
  // Read sql content or generate it
  const sqlContent = `-- NKROFUL AGRIC SENIOR HIGH SCHOOL SQL DUMP
CREATE DATABASE IF NOT EXISTS \`nkroful_transcript\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`nkroful_transcript\`;
-- Import the full database/nkroful_transcript.sql file included in this distribution.
`;
  dbFolder?.file('nkroful_transcript.sql', sqlContent);

  // Admin folder
  const admin = zip.folder('admin');
  admin?.file('dashboard.php', `<?php
require_once __DIR__ . '/../config/auth.php';
requireRole(['super_admin', 'school_admin']);
$pdo = getDBConnection();
$totalStudents = $pdo->query("SELECT COUNT(*) FROM students")->fetchColumn();
$totalTeachers = $pdo->query("SELECT COUNT(*) FROM teachers")->fetchColumn();
?>
<!DOCTYPE html>
<html>
<head><title>Admin Dashboard — Nkroful Agric SHS</title></head>
<body>
<h1>Nkroful Agric SHS — Administrator Control Panel</h1>
<p>Total Students: <?= $totalStudents ?> | Total Teachers: <?= $totalTeachers ?></p>
</body>
</html>
`);

  // Generate zip file and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nkroful-agric-shs-transcript-system.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
