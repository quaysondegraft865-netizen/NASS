# NKROFUL AGRIC SENIOR HIGH SCHOOL
## Student Transcript & Results Management System

Official, production-ready transcript, terminal report card, continuous assessment, and examinations management system for **Nkroful Agric Senior High School** (Ellembelle District, Western Region, Ghana).

---

## 1. Quick Installation on XAMPP (Local Development)

1. **Install XAMPP**: Ensure Apache and MySQL are installed and operational.
2. **Copy Project Folder**:
   Copy the `nkroful-transcript` folder into your XAMPP web root:
   - Windows: `C:\xampp\htdocs\nkroful-transcript`
   - Linux: `/opt/lampp/htdocs/nkroful-transcript`
   - macOS: `/Applications/XAMPP/htdocs/nkroful-transcript`
3. **Start Apache & MySQL**: Open the XAMPP Control Panel and start both modules.
4. **Import Database**:
   - Open your browser and navigate to: `http://localhost/phpmyadmin`
   - Create a new database named `nkroful_transcript` with collation `utf8mb4_unicode_ci`.
   - Click the **Import** tab.
   - Choose the file: `database/nkroful_transcript.sql` and click **Import / Go**.
5. **Configure Database Credentials (if changed)**:
   - Check `config/database.php`. By default, host is `localhost`, user is `root`, password is empty `''`.
6. **Open Application**:
   - Navigate to: `http://localhost/nkroful-transcript`

---

## 2. Default Administrative & Staff Accounts

| Role | Username | Password | Notes |
|---|---|---|---|
| **Super Administrator** | `admin` | `Admin@123` | Full access to students, teachers, results, transcripts, audit logs |
| **Teacher** | `teacher` | `Teacher@123` | Enters scores for assigned classes & subjects |
| **Student** | `student` | `Student@123` | Views terminal results, GPA, downloads official transcript |

---

## 3. Deployment on Replit / Standard PHP Hosting

- **Replit**:
  Set environment variables in Replit Secrets:
  - `DB_HOST`: your remote MySQL host (e.g. Supabase, PlanetScale, Aiven, or local)
  - `DB_NAME`: `nkroful_transcript`
  - `DB_USER`: your MySQL user
  - `DB_PASS`: your MySQL password
  - `DB_PORT`: `3306`
  Start command: `php -S 0.0.0.0:3000 -t .`

- **cPanel / Apache VirtualHost**:
  Point document root to the project directory, import `database/nkroful_transcript.sql`, and update `config/database.php`.

---

## 4. Key Modules & Features
- **Administrator Portal**: Student registration & profile management, Teacher allocations, Subject coding, Terminal results approval & rejection workflow, Transcript verification generation, Report cards, Analytics, System settings, Real-time audit logs.
- **Teacher Portal**: Continuous assessment (0-30) and Exam (0-70) marksheets, live calculation of totals, WAEC/Ghana SHS grades (A1 to F9) and remarks, batch submission.
- **Student Portal**: Term results summary, Cumulative GPA tracker, Report card download, Official Transcript download.
- **Transcript Verification**: Public document verification URL (`/verify.php?code=NASS-TR-2026-000125`) showing official seal status.
