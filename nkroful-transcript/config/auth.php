<?php
/**
 * Nkroful Agric Senior High School
 * Authentication & Session Management
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isLoggedIn(): bool {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

function getCurrentUser(): ?array {
    if (!isLoggedIn()) return null;
    return [
        'id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role' => $_SESSION['role'],
        'email' => $_SESSION['email'] ?? '',
        'teacher_id' => $_SESSION['teacher_id'] ?? null,
        'student_id' => $_SESSION['student_id'] ?? null
    ];
}

function requireRole(array|string $roles): void {
    if (!isLoggedIn()) {
        header("Location: /login.php?error=unauthorized");
        exit;
    }

    $allowed = is_array($roles) ? $roles : [$roles];
    $currentRole = $_SESSION['role'] ?? '';

    if (!in_array($currentRole, $allowed, true)) {
        http_response_code(403);
        include __DIR__ . '/../includes/403.php';
        exit;
    }
}

function loginUser(array $user): void {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['teacher_id'] = $user['teacher_id'] ?? null;
    $_SESSION['student_id'] = $user['student_id'] ?? null;
    $_SESSION['last_activity'] = time();
}

function logoutUser(): void {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
}
