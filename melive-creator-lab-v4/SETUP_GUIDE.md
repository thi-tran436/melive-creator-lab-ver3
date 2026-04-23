# SETUP GUIDE — Melive Creator Lab NYC

## Quick Start

```bash
git clone <your-repo>
cd melive
npm install
cp .env.example .env.local
# Fill in .env.local values (see below)
npm run dev
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | ✅ | Sheet ID from URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | ✅ | Full JSON as one line (no newlines) |
| `RESEND_API_KEY` | ✅ | From resend.com |
| `RESEND_FROM_CREATOR` | ✅ | e.g. `Melive <creators@melive.co>` |
| `RESEND_FROM_SYSTEM` | ✅ | e.g. `Melive System <system@melive.co>` |
| `ADMIN_NOTIFY_EMAIL` | ✅ | Where new-application emails go |
| `ADMIN_PASSWORD` | ✅ | Password for /admin dashboard |
| `NEXT_PUBLIC_APPLICATION_DEADLINE` | ✅ | e.g. `2026-05-31T23:59:59-05:00` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | e.g. `https://creatorlab.melive.co` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ⚪ | Optional — site works without it |
| `RECAPTCHA_SECRET_KEY` | ⚪ | Optional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚪ | Optional GA4 ID |

## Google Sheets Setup

1. Create Spreadsheet with 3 tabs: `applications`, `waitlist`, `settings`
2. Tab `applications` Row 1 headers:
   `id,created_at,updated_at,first_name,last_name,email,phone,city_state,platform,handle,followers,categories,gmv,fulltime,pitch,links,status,notes,utm_source,utm_medium,utm_campaign,ip_address,recaptcha_score`
3. Tab `waitlist` Row 1 headers:
   `id,email,created_at,source`
4. Create Service Account → enable Sheets API → download JSON key
5. Share spreadsheet with service account email (Editor)
6. Convert JSON to single line: `cat key.json | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin)))"`

## Deploy to Vercel

```bash
# Push to GitHub first, then:
vercel --prod
# OR connect GitHub repo in vercel.com dashboard
```

Add all env vars in Vercel → Settings → Environment Variables.

## Admin Dashboard

URL: `https://your-domain.com/admin`
Password: value of `ADMIN_PASSWORD`

## Content Updates

All copy, FAQ, dates → edit `lib/config.ts` → commit → Vercel auto-deploys.

Wait — there is no `lib/config.ts` in this version. Content is inline in components.
To update content: edit the relevant component file directly.
- Hero text → `components/Hero.tsx`
- FAQ → `components/FaqSection.tsx`
- Benefits → `components/BenefitsSection.tsx`
- Roadmap → `components/RoadmapSection.tsx`
- Program dates → `components/ApplicationForm.tsx` + `app/layout.tsx`
