import { jsPDF } from 'jspdf';
import { Student, SchoolSettings, ResultRecord, Subject, SchoolClass, AcademicYear, Term } from '../types';
import { gradePointToGPA, computeOverallDivision } from './gradeCalculator';

/**
 * Draws the authentic Nkroful Agric Senior High School heraldic crest
 * onto the jsPDF document instance.
 */
function drawOfficialCrestEmblem(doc: jsPDF, cx: number, cy: number, scale: number = 1.0): void {
  // Shield dimensions
  const sw = 16 * scale;
  const sh = 19 * scale;

  // 1. Gold Shield Field
  doc.setFillColor(254, 240, 138); // #fef08a
  doc.setDrawColor(11, 51, 31);    // #0b331f forest green
  doc.setLineWidth(0.4 * scale);

  // Approximate shield contour
  doc.roundedRect(cx - sw / 2, cy - sh / 2, sw, sh * 0.85, 1 * scale, 1 * scale, 'FD');
  doc.triangle(
    cx - sw / 2, cy + sh * 0.35,
    cx + sw / 2, cy + sh * 0.35,
    cx, cy + sh * 0.55,
    'FD'
  );

  // Inner green hairline
  doc.setDrawColor(21, 128, 61);
  doc.setLineWidth(0.2 * scale);
  doc.roundedRect(cx - sw / 2 + 0.8 * scale, cy - sh / 2 + 0.8 * scale, sw - 1.6 * scale, sh * 0.75, 0.5 * scale, 0.5 * scale, 'D');

  // 2. Open Book of Knowledge (Top)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.15 * scale);
  doc.rect(cx - 4.5 * scale, cy - 6 * scale, 9 * scale, 3.5 * scale, 'FD');
  doc.setDrawColor(100, 116, 139);
  doc.line(cx - 3.5 * scale, cy - 4.8 * scale, cx - 0.8 * scale, cy - 4.8 * scale);
  doc.line(cx - 3.5 * scale, cy - 3.8 * scale, cx - 0.8 * scale, cy - 3.8 * scale);
  doc.line(cx + 0.8 * scale, cy - 4.8 * scale, cx + 3.5 * scale, cy - 4.8 * scale);
  doc.line(cx + 0.8 * scale, cy - 3.8 * scale, cx + 3.5 * scale, cy - 3.8 * scale);

  // 3. Laurel Wreath / Foliage
  doc.setFillColor(21, 128, 61);
  doc.circle(cx - 4 * scale, cy, 1.2 * scale, 'F');
  doc.circle(cx + 4 * scale, cy, 1.2 * scale, 'F');
  doc.circle(cx - 3.2 * scale, cy + 2.5 * scale, 1.1 * scale, 'F');
  doc.circle(cx + 3.2 * scale, cy + 2.5 * scale, 1.1 * scale, 'F');

  // 4. Crossed Agricultural Tools
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.4 * scale);
  doc.line(cx - 3.5 * scale, cy - 1 * scale, cx + 3.5 * scale, cy + 3.5 * scale);
  doc.line(cx + 3.5 * scale, cy - 1 * scale, cx - 3.5 * scale, cy + 3.5 * scale);

  // 5. Official Pink/Magenta Motto Scroll Banner
  doc.setFillColor(219, 39, 119); // #db2777
  doc.setDrawColor(131, 24, 67);   // #831843
  doc.setLineWidth(0.25 * scale);
  doc.roundedRect(cx - 9 * scale, cy + sh * 0.45, 18 * scale, 3.2 * scale, 0.4 * scale, 0.4 * scale, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(3.8 * scale);
  doc.setTextColor(255, 255, 255);
  doc.text('KNOWLEDGE • INTEGRITY • SERVICE', cx, cy + sh * 0.45 + 2.3 * scale, { align: 'center' });
}

export function generateTranscriptPDF(
  student: Student,
  settings: SchoolSettings,
  results: ResultRecord[],
  subjects: Subject[],
  classes: SchoolClass[],
  years: AcademicYear[],
  terms: Term[],
  verificationCode: string
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Outer decorative border (Ghana academic style)
  doc.setDrawColor(15, 61, 36); // Deep Green
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(196, 138, 18); // Gold inner hairline
  doc.setLineWidth(0.4);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Draw official heraldic crest on both sides of institutional header
  drawOfficialCrestEmblem(doc, 24, 23, 0.95);
  drawOfficialCrestEmblem(doc, pageWidth - 24, 23, 0.95);

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 61, 36);
  doc.text(settings.school_name, pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 90, 20);
  doc.text(`"${settings.motto}"`, pageWidth / 2, 25, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text(`${settings.address} | Tel: ${settings.phone}`, pageWidth / 2, 30, { align: 'center' });
  doc.text(`Email: ${settings.email} | Web: ${settings.website}`, pageWidth / 2, 34, { align: 'center' });

  // Divider line
  doc.setDrawColor(15, 61, 36);
  doc.setLineWidth(0.8);
  doc.line(14, 38, pageWidth - 14, 38);

  // Document Title Badge
  doc.setFillColor(15, 61, 36);
  doc.rect(pageWidth / 2 - 45, 42, 90, 7.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL ACADEMIC TRANSCRIPT', pageWidth / 2, 47, { align: 'center' });

  // Student Bio Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 53, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);

  const col1 = 18;
  const col2 = 105;
  let yBio = 59;

  doc.text('STUDENT NAME:', col1, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.first_name} ${student.middle_name ? student.middle_name + ' ' : ''}${student.last_name}`, col1 + 30, yBio);

  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT ID:', col2, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(student.student_id, col2 + 25, yBio);

  yBio += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('ADMISSION NO:', col1, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(student.admission_number, col1 + 30, yBio);

  doc.setFont('helvetica', 'bold');
  doc.text('PROGRAMME:', col2, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(student.programme, col2 + 25, yBio);

  yBio += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('DATE OF BIRTH:', col1, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.date_of_birth} (${student.gender})`, col1 + 30, yBio);

  doc.setFont('helvetica', 'bold');
  doc.text('PERIOD OF STUDY:', col2, yBio);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.admission_year} - ${student.graduation_year} (${student.year_group})`, col2 + 25, yBio);

  yBio += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS:', col1, yBio);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 61, 36);
  doc.text(student.status.toUpperCase(), col1 + 30, yBio);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('TRANSCRIPT CODE:', col2, yBio);
  doc.setFont('courier', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(verificationCode, col2 + 34, yBio);

  // Results Table Section
  let currentY = 88;

  // Filter approved or published results for this student
  const studentResults = results.filter(
    r => r.student_id === student.id && (r.status === 'approved' || r.status === 'published')
  );

  // Group by academic year
  const groupedYears = years.filter(y => studentResults.some(r => r.academic_year_id === y.id));

  let totalPoints = 0;
  let totalSubjectsCount = 0;

  if (groupedYears.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('No approved examination records found for this student.', pageWidth / 2, currentY + 10, { align: 'center' });
    currentY += 25;
  } else {
    groupedYears.forEach(year => {
      const yearResults = studentResults.filter(r => r.academic_year_id === year.id);
      if (yearResults.length === 0) return;

      // Check page overflow
      if (currentY > 230) {
        doc.addPage();
        currentY = 20;
      }

      // Year Header bar
      doc.setFillColor(220, 235, 226);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 61, 36);
      doc.text(`ACADEMIC YEAR: ${year.year_name}`, 18, currentY + 4.2);

      currentY += 6;

      // Table Header
      doc.setFillColor(241, 245, 249);
      doc.rect(14, currentY, pageWidth - 28, 5.5, 'F');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text('SUBJECT', 18, currentY + 3.8);
      doc.text('TERM', 95, currentY + 3.8);
      doc.text('CLASS WK (30%)', 115, currentY + 3.8);
      doc.text('EXAM (70%)', 142, currentY + 3.8);
      doc.text('TOTAL', 165, currentY + 3.8);
      doc.text('GRADE', 180, currentY + 3.8);
      doc.text('GP', 193, currentY + 3.8);

      currentY += 5.5;

      // Rows
      yearResults.forEach((r, idx) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }

        const sub = subjects.find(s => s.id === r.subject_id);
        const term = terms.find(t => t.id === r.term_id);

        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, currentY, pageWidth - 28, 5, 'F');
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(15, 23, 42);

        doc.text(sub ? `${sub.subject_code} - ${sub.subject_name}` : 'Subject', 18, currentY + 3.5);
        doc.text(term ? term.term_name : '-', 95, currentY + 3.5);
        doc.text(r.assessment_score.toFixed(1), 122, currentY + 3.5);
        doc.text(r.exam_score.toFixed(1), 148, currentY + 3.5);
        doc.text(r.total_score.toFixed(1), 168, currentY + 3.5);

        doc.setFont('helvetica', 'bold');
        if (r.grade === 'A1') doc.setTextColor(21, 128, 61);
        else if (r.grade.startsWith('B')) doc.setTextColor(30, 64, 175);
        else if (r.grade === 'F9') doc.setTextColor(185, 28, 28);
        else doc.setTextColor(15, 23, 42);

        doc.text(r.grade, 182, currentY + 3.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        doc.text(String(r.grade_point), 194, currentY + 3.5);

        totalPoints += gradePointToGPA(r.grade);
        totalSubjectsCount++;

        currentY += 5;
      });

      currentY += 2;
    });
  }

  // Summary Performance
  const gpa = totalSubjectsCount > 0 ? (totalPoints / totalSubjectsCount) : 0;
  const division = computeOverallDivision(gpa);

  currentY = Math.max(currentY + 2, 210);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, currentY, pageWidth - 28, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 61, 36);
  doc.text('CUMULATIVE PERFORMANCE SUMMARY:', 18, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`Total Courses Recorded: ${totalSubjectsCount}`, 18, currentY + 11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Cumulative GPA: ${gpa.toFixed(2)} / 4.00`, 80, currentY + 11);
  doc.setTextColor(180, 83, 9);
  doc.text(`Classification: ${division}`, 130, currentY + 11);

  // Signatures & Stamp
  const sigY = currentY + 24;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  // Left: Assistant Head Academic
  doc.line(18, sigY + 12, 70, sigY + 12);
  doc.text(settings.assistant_head_academic, 18, sigY + 16);
  doc.text('Assistant Headmaster (Academic)', 18, sigY + 20);

  // Middle: Official School Seal
  doc.setDrawColor(196, 138, 18);
  doc.setLineWidth(0.6);
  doc.circle(pageWidth / 2, sigY + 12, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(196, 138, 18);
  doc.text('OFFICIAL SEAL', pageWidth / 2, sigY + 9, { align: 'center' });
  doc.text('N.A.S.H.S', pageWidth / 2, sigY + 12.5, { align: 'center' });
  doc.setFontSize(4.5);
  doc.text('KNOWLEDGE, INTEGRITY, SERVICE', pageWidth / 2, sigY + 15.5, { align: 'center' });

  // Right: Headmaster
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.line(pageWidth - 70, sigY + 12, pageWidth - 18, sigY + 12);
  doc.text(settings.headmaster_name, pageWidth - 70, sigY + 16);
  doc.text('Headmaster / Chairperson Academic Board', pageWidth - 70, sigY + 20);

  // Footer Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(settings.transcript_footer, pageWidth / 2, pageHeight - 12, { align: 'center' });
  doc.text(`Verify online at: ${settings.website}/verify.php?code=${verificationCode}`, pageWidth / 2, pageHeight - 9, { align: 'center' });

  // Save / trigger download
  doc.save(`Transcript_${student.student_id.replace(/\//g, '_')}_${student.last_name}.pdf`);
}

export function generateReportCardPDF(
  student: Student,
  settings: SchoolSettings,
  classObj: SchoolClass | undefined,
  termObj: Term | undefined,
  yearObj: AcademicYear | undefined,
  results: ResultRecord[],
  subjects: Subject[],
  teacherRemark: string = 'Good conduct and satisfactory academic engagement.',
  headmasterRemark: string = 'Promoted with commendable performance. Keep up the high standard.',
  attendance: string = '58 / 60 days'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Border
  doc.setDrawColor(15, 61, 36);
  doc.setLineWidth(1);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Draw official heraldic crest on report card header
  drawOfficialCrestEmblem(doc, 22, 22, 0.82);
  drawOfficialCrestEmblem(doc, pageWidth - 22, 22, 0.82);

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(15, 61, 36);
  doc.text(settings.school_name, pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(settings.address, pageWidth / 2, 25, { align: 'center' });

  // Title Box
  doc.setFillColor(15, 61, 36);
  doc.rect(pageWidth / 2 - 45, 29, 90, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('TERMINAL REPORT CARD', pageWidth / 2, 33.8, { align: 'center' });

  // Student Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(12, 39, pageWidth - 24, 25, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);

  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT:', 16, 45);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.first_name} ${student.last_name}`, 40, 45);

  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT ID:', 110, 45);
  doc.setFont('helvetica', 'normal');
  doc.text(student.student_id, 140, 45);

  doc.setFont('helvetica', 'bold');
  doc.text('CLASS:', 16, 51);
  doc.setFont('helvetica', 'normal');
  doc.text(classObj ? classObj.class_name : 'SHS Class', 40, 51);

  doc.setFont('helvetica', 'bold');
  doc.text('PROGRAMME:', 110, 51);
  doc.setFont('helvetica', 'normal');
  doc.text(student.programme, 140, 51);

  doc.setFont('helvetica', 'bold');
  doc.text('ACADEMIC YEAR:', 16, 57);
  doc.setFont('helvetica', 'normal');
  doc.text(yearObj ? yearObj.year_name : '2025/2026', 45, 57);

  doc.setFont('helvetica', 'bold');
  doc.text('TERM:', 85, 57);
  doc.setFont('helvetica', 'normal');
  doc.text(termObj ? termObj.term_name : 'Term 1', 100, 57);

  doc.setFont('helvetica', 'bold');
  doc.text('ATTENDANCE:', 135, 57);
  doc.setFont('helvetica', 'normal');
  doc.text(attendance, 162, 57);

  // Table
  let y = 69;
  doc.setFillColor(15, 61, 36);
  doc.rect(12, y, pageWidth - 24, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('SUBJECT', 16, y + 4.5);
  doc.text('CLASS SCORE (30)', 90, y + 4.5);
  doc.text('EXAM SCORE (70)', 125, y + 4.5);
  doc.text('TOTAL (100)', 155, y + 4.5);
  doc.text('GRADE', 178, y + 4.5);
  doc.text('REMARKS', 190, y + 4.5);

  y += 6.5;

  let totalScoreSum = 0;
  let subCount = 0;

  results.forEach((r, idx) => {
    const sub = subjects.find(s => s.id === r.subject_id);
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(12, y, pageWidth - 24, 5.5, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sub ? sub.subject_name : 'Subject', 16, y + 4);
    doc.text(r.assessment_score.toFixed(1), 100, y + 4);
    doc.text(r.exam_score.toFixed(1), 135, y + 4);
    doc.text(r.total_score.toFixed(1), 162, y + 4);

    doc.setFont('helvetica', 'bold');
    doc.text(r.grade, 180, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text(r.remarks, 190, y + 4);

    totalScoreSum += r.total_score;
    subCount++;
    y += 5.5;
  });

  const avg = subCount > 0 ? totalScoreSum / subCount : 0;

  // Remarks Section
  y = Math.max(y + 6, 210);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(12, y, pageWidth - 24, 40, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 61, 36);
  doc.text(`TERMINAL AVERAGE: ${avg.toFixed(1)}%`, 16, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text("CLASS TEACHER'S REMARKS:", 16, y + 14);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 41, 59);
  doc.text(`"${teacherRemark}"`, 16, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 61, 36);
  doc.text("HEADMASTER'S REMARKS:", 16, y + 27);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 41, 59);
  doc.text(`"${headmasterRemark}"`, 16, y + 32);

  // Signatures
  const footerY = pageHeight - 25;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.line(16, footerY, 65, footerY);
  doc.text('Class Teacher Signature', 16, footerY + 4);

  doc.line(pageWidth - 65, footerY, pageWidth - 16, footerY);
  doc.text('Headmaster Signature & Stamp', pageWidth - 65, footerY + 4);

  doc.save(`ReportCard_${student.student_id.replace(/\//g, '_')}_Term.pdf`);
}
