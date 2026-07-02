# Txlemetry — Landing

Marketing landing for **Txlemetry**, the AI-native product analytics platform
(a PostHog-based SaaS running on Oracle Cloud). Static site — no build server
required at runtime — with authentication wired to Supabase.

## Layout

```
index.html      entry point (all routes fall back to it — SPA)
v2/             compiled page bundles (*.js) + stylesheets
src/            JSX sources (source of truth for v2/*.js)
assets/txl/     images
scripts/        build tooling
server.cjs      zero-dependency static server with SPA fallback
```

## Develop

```bash
npm install          # esbuild (build-time only)
npm run build        # src/*.jsx  ->  v2/*.js
npm start            # serve on http://localhost:8080
```

## Auth wiring

- Supabase project: `cxtcoqbxswftlmsolwmw` (eu-west-3).
- The bootstrap in `index.html` bakes in the Supabase URL + **anon** key
  (public by design) and lazy-loads `supabase-js` only on auth routes
  (`/signin`, `/signup`, `/reset-password`, `/demo`).
- Sign in / sign up / password reset / MFA live in `src/auth.jsx` and talk to
  Supabase directly. After auth the user is redirected to **`/app`**.
- The `/demo` form inserts into the `leads` table (RLS: anonymous
  insert-only).

## Production (Oracle Cloud)

nginx serves this repo as the web root and proxies the SaaS:

```
location /app  { proxy_pass http://127.0.0.1:8000; }   # Txlemetry (PostHog) SaaS
location /     { try_files $uri /index.html; }          # this landing
```

Any static host works the same way: serve the repo root, rewrite
extensionless routes to `index.html`, and route `/app` to the SaaS.
