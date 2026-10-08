<?php
/**
 * Nkroful Agric Senior High School
 * Global System Configuration & Constants
 */

declare(strict_types=1);

define('APP_NAME', 'NKROFUL AGRIC SENIOR HIGH SCHOOL');
define('APP_SUBTITLE', 'Student Transcript & Results Management System');
define('APP_MOTTO', 'Knowledge, Integrity, Service');
define('APP_YEAR_EST', 1973);
define('APP_VERSION', '1.0.0');

// Base URL detection
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
define('BASE_URL', $protocol . $host);

// Grading scale definition (WAEC / Ghana SHS standard)
const DEFAULT_GRADING_SCALE = [
    ['grade' => 'A1', 'min' => 80, 'max' => 100, 'point' => 1, 'remark' => 'Excellent'],
    ['grade' => 'B2', 'min' => 75, 'max' => 79,  'point' => 2, 'remark' => 'Very Good'],
    ['grade' => 'B3', 'min' => 70, 'max' => 74,  'point' => 3, 'remark' => 'Good'],
    ['grade' => 'C4', 'min' => 65, 'max' => 69,  'point' => 4, 'remark' => 'Credit'],
    ['grade' => 'C5', 'min' => 60, 'max' => 64,  'point' => 5, 'remark' => 'Credit'],
    ['grade' => 'C6', 'min' => 55, 'max' => 59,  'point' => 6, 'remark' => 'Credit'],
    ['grade' => 'D7', 'min' => 50, 'max' => 54,  'point' => 7, 'remark' => 'Pass'],
    ['grade' => 'E8', 'min' => 45, 'max' => 49,  'point' => 8, 'remark' => 'Pass'],
    ['grade' => 'F9', 'min' => 0,  'max' => 44,  'point' => 9, 'remark' => 'Fail'],
];
