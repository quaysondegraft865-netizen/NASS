<?php
/**
 * Nkroful Agric Senior High School
 * Public Transcript Verification Page
 */
declare(strict_types=1);
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/functions.php';

$code = trim($_GET['code'] ?? '');
$transcript = null;
$student = null;
$searched = !empty($code);

if ($searched) {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("
            SELECT t.*, s.first_name, s.middle_name, s.last_name, s.student_id as stu_id, s.programme, s.graduation_year, s.status as stu_status
            FROM transcripts t
            JOIN students s ON t.student_id = s.id
            WHERE t.transcript_code = ?
            LIMIT 1
        ");
        $stmt->execute([$code]);
        $row = $stmt->fetch();
        if ($row) {
            $transcript = $row;
        }
    } catch (Exception $e) {
        $error = "System error during verification check.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Transcript Verification — <?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        :root { --primary-green: #0f3d24; --accent-gold: #c48a12; }
        body { background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero-banner { background: linear-gradient(135deg, #0a2918, #0f3d24); color: white; padding: 2.5rem 0; text-align: center; }
        .verify-card { max-width: 680px; margin: -2rem auto 3rem auto; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 2rem; border-top: 5px solid var(--accent-gold); }
        .status-badge { font-size: 1.1rem; padding: 0.5rem 1.2rem; border-radius: 50px; }
    </style>
</head>
<body>

<div class="hero-banner">
    <div class="container">
        <h4 class="text-uppercase tracking-wide text-warning fw-bold mb-1"><?= APP_NAME ?></h4>
        <p class="mb-0 text-white-50"><?= APP_SUBTITLE ?> — Document Verification Portal</p>
    </div>
</div>

<div class="container">
    <div class="verify-card">
        <h5 class="fw-bold mb-3 text-secondary text-center"><i class="bi bi-shield-check text-success me-2"></i>Verify Academic Transcript Credential</h5>
        <form method="GET" action="verify.php" class="mb-4">
            <div class="input-group">
                <input type="text" name="code" class="form-control form-control-lg text-uppercase" placeholder="e.g. NASS-TR-2026-000125" value="<?= e($code) ?>" required>
                <button type="submit" class="btn btn-success px-4 fw-bold">Verify Document</button>
            </div>
            <small class="text-muted d-block mt-2">Enter the reference code stamped at the bottom of the official transcript.</small>
        </form>

        <?php if ($searched): ?>
            <?php if ($transcript && $transcript['status'] === 'valid'): ?>
                <div class="alert alert-success border-success text-center py-3 mb-4">
                    <span class="badge bg-success status-badge mb-2"><i class="bi bi-patch-check-fill me-1"></i> VALID & AUTHENTIC DOCUMENT</span>
                    <h5 class="fw-bold text-success mb-1">Official Academic Record Confirmed</h5>
                    <p class="small text-muted mb-0">This document is certified by the Academic Secretariat of Nkroful Agric Senior High School.</p>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody>
                            <tr><th class="w-40 text-muted">Transcript Code</th><td class="fw-bold text-primary font-monospace"><?= e($transcript['transcript_code']) ?></td></tr>
                            <tr><th class="text-muted">Student Name</th><td class="fw-bold"><?= e($transcript['first_name'] . ' ' . ($transcript['middle_name'] ? $transcript['middle_name'] . ' ' : '') . $transcript['last_name']) ?></td></tr>
                            <tr><th class="text-muted">Student ID</th><td><?= e($transcript['stu_id']) ?></td></tr>
                            <tr><th class="text-muted">Programme of Study</th><td><?= e($transcript['programme']) ?></td></tr>
                            <tr><th class="text-muted">Graduation / Completion Year</th><td><?= e((string)$transcript['graduation_year']) ?></td></tr>
                            <tr><th class="text-muted">Academic Standing</th><td><span class="badge bg-primary"><?= e($transcript['graduation_status']) ?></span></td></tr>
                            <tr><th class="text-muted">Cumulative GPA</th><td class="fw-bold text-success"><?= number_format((float)$transcript['cumulative_gpa'], 2) ?> / 4.00</td></tr>
                            <tr><th class="text-muted">Date Certified</th><td><?= e($transcript['issue_date']) ?></td></tr>
                            <tr><th class="text-muted">Issuing Authority</th><td><?= e($transcript['issued_by']) ?></td></tr>
                        </tbody>
                    </table>
                </div>
            <?php else: ?>
                <div class="alert alert-danger text-center py-4">
                    <span class="badge bg-danger status-badge mb-2"><i class="bi bi-x-circle-fill me-1"></i> INVALID / RECORD NOT FOUND</span>
                    <h5 class="fw-bold text-danger mb-1">Verification Failed</h5>
                    <p class="mb-0 text-muted">No authentic transcript matches the code <strong><?= e($code) ?></strong> in the school repository. Please verify the code or contact the school administration.</p>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <div class="text-center mt-4">
            <a href="index.php" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-left me-1"></i> Return to Main Portal</a>
        </div>
    </div>
</div>

<footer class="text-center py-4 text-muted small">
    &copy; <?= date('Y') ?> <?= APP_NAME ?>. All rights reserved.
</footer>

</body>
</html>
