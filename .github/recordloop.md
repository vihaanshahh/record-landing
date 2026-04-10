---
selector_convention: data-testid
default_navigate_to: /dashboard
login_config: storage-state
---

# RecordLoop Landing Site

Next.js 16 app router. Marketing landing page at `/`, docs at `/docs`, protected dashboard at `/dashboard`.

The dashboard is behind cookie-based auth (middleware.ts checks `rl_session` cookie). Use the storage-state secret to bypass the login page when recording.

Components use `data-testid` attributes for stable selectors. The dashboard has stats cards (`stat-recordings`, `stat-prs`, `stat-cost`) and a recent recordings list (`recording-42`, `recording-41`, etc.).
