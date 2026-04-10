---
selector_convention: data-testid
default_navigate_to: /dashboard
login_config: storage-state
---

# RecordLoop Landing Site

Next.js 16 app router. Marketing landing page at `/`, docs at `/docs`, protected dashboard at `/dashboard`.

The dashboard is behind cookie-based auth (middleware.ts checks `rl_session` cookie). The browser is already authenticated via storage-state — navigate directly to /dashboard, do NOT interact with the login form.

Components use `data-testid` attributes for stable selectors. The dashboard has stats cards (`stat-recordings`, `stat-prs`, `stat-cost`) and a recent recordings list (`recording-42`, `recording-41`, etc.).
