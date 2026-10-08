import { GradeRule, SchoolSettings } from '../types';

export function calculateGrade(
  totalScore: number,
  rules: GradeRule[]
): { grade: string; gradePoint: number; remark: string } {
  // Clamp score
  const score = Math.max(0, Math.min(100, Math.round(totalScore)));

  for (const rule of rules) {
    if (score >= rule.min_score && score <= rule.max_score) {
      return {
        grade: rule.grade,
        gradePoint: rule.grade_point,
        remark: rule.remark,
      };
    }
  }

  // Fallback
  return {
    grade: 'F9',
    gradePoint: 9,
    remark: 'Fail',
  };
}

export function calculateTotalScore(assessment: number, exam: number): number {
  const a = isNaN(assessment) ? 0 : assessment;
  const e = isNaN(exam) ? 0 : exam;
  return Math.min(100, Math.max(0, a + e));
}

// Convert WAEC Grade Point (1-9) to 4.0 GPA scale
export function gradePointToGPA(grade: string): number {
  switch (grade.toUpperCase()) {
    case 'A1': return 4.0;
    case 'B2': return 3.6;
    case 'B3': return 3.2;
    case 'C4': return 2.8;
    case 'C5': return 2.4;
    case 'C6': return 2.0;
    case 'D7': return 1.5;
    case 'E8': return 1.0;
    case 'F9': return 0.0;
    default: return 0.0;
  }
}

export function computeOverallDivision(gpa: number): string {
  if (gpa >= 3.6) return 'Distinction (First Class Standing)';
  if (gpa >= 3.2) return 'Merit (Upper Division)';
  if (gpa >= 2.5) return 'Credit (Middle Division)';
  if (gpa >= 2.0) return 'Pass';
  return 'Sub-Pass / Below Standard';
}

export function generateTranscriptCode(studentId: string, year: number = 2026): string {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const cleanId = studentId.replace(/[^a-zA-Z0-9]/g, '').slice(-3);
  return `NASS-TR-${year}-${cleanId}${randNum}`;
}
