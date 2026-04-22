# Melive Creator Lab NYC

Production-ready landing page + creator application system.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Google Sheets · Resend · Vercel

---

## Quick Start (Development)

```bash
# 1. Clone and install
git clone <repo-url>
cd melive
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in all values (see Setup Guide below)

# 3. Run locally
npm run dev
# Open http://localhost:3000
```

---

## Setup Guide

### Step 1 — Google Sheets Database

1. Create a new Google Spreadsheet
2. Create **3 tabs** (exact names required):
   - `applications`
   - `waitlist`
   - `settings`
3. In the `applications` tab, add headers in row 1:
   ```
   id | created_at | updated_at | first_name | last_name | email | phone | city_state | platform | handle | followers | categories | gmv | fulltime | pitch | links | status | notes | utm_source | utm_medium | utm_campaign | ip_address | recaptcha_score
   ```
4. In the `waitlist` tab, add headers:
   ```
   id | email | created_at | source
   ```
5. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

### Step 2 — Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable **Google Sheets API**
4. Go to **IAM & Admin → Service Accounts**
5. Create a service account (name it `melive-sheets`)
6. Click on the service account → **Keys → Add Key → JSON**
7. Download the JSON file
8. **Share your Google Spreadsheet** with the service account email (Editor access)
9. In `.env.local`, paste the entire JSON as one line:
   ```
   GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}
   ```

### Step 3 — Resend (Email)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (`melive.co`)
   - Add SPF, DKIM, DMARC records to your DNS
3. Create an API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxx
   RESEND_FROM_CREATOR="Melive Creator Lab <creators@melive.co>"
   RESEND_FROM_SYSTEM="Melive System <system@melive.co>"
   ADMIN_NOTIFY_EMAIL=creators@melive.co
   ```

### Step 4 — Google reCAPTCHA v3

1. Go to [google.com/recaptcha](https://www.google.com/recaptcha/admin/create)
2. Choose **reCAPTCHA v3**
3. Add your domain (`creatorlab.melive.co` + `localhost` for dev)
4. Copy **Site Key** and **Secret Key**:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
   RECAPTCHA_SECRET_KEY=6Lc...
   ```

### Step 5 — Admin Password

Set a strong password:
```
ADMIN_PASSWORD=your-very-strong-password-here
```

Access admin at `/admin` — sign in with this password.

### Step 6 — Application Deadline

```
NEXT_PUBLIC_APPLICATION_DEADLINE=2026-05-31T23:59:59-05:00
NEXT_PUBLIC_SITE_URL=https://creatorlab.melive.co
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project Settings → Environment Variables
# Add all variables from .env.example
```

### DNS Setup (after Vercel deploy)

Add CNAME record:
```
creatorlab.melive.co → cname.vercel-dns.com
```

---

## Content Updates

All copy, FAQs, and configuration live in:
```
lib/config.ts
```

Edit this file and push to `main` — Vercel auto-deploys in ~30 seconds.

**Key sections in config.ts:**
- `siteConfig` — site name, URL, emails, dates
- `heroContent` — headline, lede, CTA text
- `faqItems` — FAQ questions and answers
- `benefitCards` — the 9 benefit cards
- `roadmapMonths` — the 6-month program timeline
- `footerLinks` — all footer navigation

---

## Admin Dashboard

URL: `https://creatorlab.melive.co/admin`

**Features:**
- View all applications with status badges
- Filter by: status, platform, follower range
- Search by: name, email, handle
- Export filtered results to CSV
- Click any row → view full application + update status
- Optional: send email notification on status change

**Status pipeline:**
`new` → `reviewing` → `shortlisted` → `approved` / `rejected` / `contacted`

---

## File Structure

```
melive/
├── app/
│   ├── page.tsx                    ← Main landing page
│   ├── layout.tsx                  ← Root layout + SEO meta
│   ├── globals.css                 ← CSS variables + animations
│   ├── admin/
│   │   ├── page.tsx               ← Application list dashboard
│   │   ├── login/page.tsx         ← Admin login
│   │   └── applications/[id]/     ← Application detail + update
│   ├── api/
│   │   ├── applications/route.ts  ← POST: submit application
│   │   ├── waitlist/route.ts      ← POST: waitlist signup
│   │   └── admin/
│   │       ├── login/route.ts     ← Admin auth
│   │       └── applications/      ← List, filter, CSV, status update
│   ├── privacy/page.tsx           ← Privacy Policy
│   ├── terms/page.tsx             ← Program Terms
│   └── [brands|press|careers]/    ← Coming soon pages
├── components/
│   ├── Nav.tsx                    ← Sticky nav + mobile hamburger
│   ├── Hero.tsx                   ← Hero section
│   ├── ApplicationForm.tsx        ← Full application form
│   ├── SuccessModal.tsx           ← Post-submit modal
│   └── [other sections...]
├── lib/
│   ├── config.ts                  ← ALL content/copy (edit here)
│   ├── sheets.ts                  ← Google Sheets database layer
│   ├── emails.ts                  ← Email templates + sending
│   ├── validations.ts             ← Zod schemas (shared client/server)
│   ├── ratelimit.ts               ← In-memory rate limiter
│   └── recaptcha.ts               ← reCAPTCHA verification
├── types/index.ts                 ← Shared TypeScript types
└── middleware.ts                  ← Admin route protection
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | ✅ | Sheets ID from URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | ✅ | Full service account JSON |
| `RESEND_API_KEY` | ✅ | Resend API key |
| `RESEND_FROM_CREATOR` | ✅ | Sender email for creators |
| `RESEND_FROM_SYSTEM` | ✅ | Sender email for admin notifs |
| `ADMIN_NOTIFY_EMAIL` | ✅ | Where admin notifs go |
| `ADMIN_PASSWORD` | ✅ | Dashboard password |
| `NEXT_PUBLIC_APPLICATION_DEADLINE` | ✅ | ISO date when form closes |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Full site URL |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ⚪ | reCAPTCHA public key |
| `RECAPTCHA_SECRET_KEY` | ⚪ | reCAPTCHA server key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚪ | GA4 tracking ID |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | ⚪ | TikTok Pixel ID |

⚪ = Optional, won't break if missing

---

## Upgrade Path (Phase 2)

When you outgrow Google Sheets:
1. Replace `lib/sheets.ts` with `lib/supabase.ts` — all API routes stay identical
2. Add Sanity CMS by swapping `lib/config.ts` data source
3. Add Upstash Redis to `lib/ratelimit.ts` for persistent rate limiting

---

*Melive Creator Lab NYC · Built for The Metub Company · April 2026*
