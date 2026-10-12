@import "tailwindcss";

@layer base {
  :root {
    --school-primary: #0f172a;
    --school-primary-2: #0f766e;
    --school-accent: #fbbf24;
    --school-soft: #ecfeff;
    --school-ink: #111827;
    --school-muted: #475569;
    --school-panel: rgba(15, 23, 42, 0.78);
    --school-border: rgba(148, 163, 184, 0.35);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--school-ink);
    background:
      radial-gradient(circle at top, rgba(20, 184, 166, 0.12), transparent 30%),
      linear-gradient(180deg, #f8fafc 0%, #eef7f6 100%);
  }

  button,
  input,
  select {
    font: inherit;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/70 backdrop-blur-xl border border-slate-200/70 shadow-[0_20px_50px_rgba(15,23,42,0.08)];
  }

  .nav-pill {
    @apply inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-teal-200 hover:bg-teal-50;
  }

  .section-shell {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

.font-crest {
  font-family: 'Cinzel', serif;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

@media print {
  body {
    background: white !important;
    color: black !important;
  }

  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .page-break {
    page-break-before: always;
  }
}
