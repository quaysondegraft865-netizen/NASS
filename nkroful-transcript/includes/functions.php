<?php
/**
 * Nkroful Agric Senior High School
 * Helper Functions (Escaping, Grading, Logging, CSRF)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/config.php';

function e(?string $string): string {
    return htmlspecialchars((string)$string, ENT_QUOTES, 'UTF-8');
}

function calculateGrade(float|int $totalScore): array {
    $score = round($totalScore);
    foreach (DEFAULT_GRADING_SCALE as $item) {
        if ($score >= $item['min'] && $score <= $item['max']) {
            return [
                'grade' => $item['grade'],
                'point' => $item['point'],
                'remark' => $item['remark'],
            ];
        }
    }
    return ['grade' => 'F9', 'point' => 9, 'remark' => 'Fail'];
}

function logAudit(string $action, string $description, ?int $userId = null, string $username = 'system', string $role = 'system'): void {
    try {
        $pdo = getDBConnection();
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $stmt = $pdo->prepare("INSERT INTO audit_logs (user_id, username, role, action, description, ip_address) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $username, $role, $action, $description, $ip]);
    } catch (Exception $e) {
        error_log("Audit log failed: " . $e->getMessage());
    }
}

function generateCSRFToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCSRFToken(?string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}
