# SETUP GUIDE — Melive Creator Lab NYC
**Thời gian cần thiết:** ~45 phút  
**Độ khó:** Không cần biết code  
**Kết quả:** Website live tại `creatorlab.melive.co`, form gửi data thật vào Google Sheets + email

---

## Tổng quan các bước

```
Bước 1 → Tạo Google Service Account (lấy JSON key)
Bước 2 → Share Google Sheets cho Service Account
Bước 3 → Cài đặt Resend (email)
Bước 4 → Cài đặt reCAPTCHA v3
Bước 5 → Deploy lên Vercel
Bước 6 → Trỏ domain
Bước 7 → Test toàn bộ
```

---

## Bước 1 — Tạo Google Service Account

Service Account là một "tài khoản robot" để code của bạn đọc/ghi Google Sheets mà không cần login thủ công.

### 1.1 Tạo Google Cloud Project

1. Mở [console.cloud.google.com](https://console.cloud.google.com)
2. Đăng nhập bằng Google account của bạn
3. Nhấn vào dropdown project ở thanh trên cùng → **New Project**
4. Đặt tên: `melive-creator-lab` → **Create**
5. Chờ ~10 giây, đảm bảo project mới được chọn ở thanh trên cùng

### 1.2 Bật Google Sheets API

1. Vào menu bên trái: **APIs & Services → Library**
2. Tìm kiếm: `Google Sheets API`
3. Click vào kết quả → **Enable**
4. Chờ ~5 giây cho đến khi hiện "API Enabled"

### 1.3 Tạo Service Account

1. Vào menu bên trái: **IAM & Admin → Service Accounts**
2. Nhấn **+ Create Service Account**
3. Điền:
   - **Service account name:** `melive-sheets`
   - **Service account ID:** tự điền thành `melive-sheets` (để mặc định)
   - **Description:** `Melive Creator Lab Sheets access`
4. Nhấn **Create and Continue**
5. Bước "Grant this service account access" → bỏ qua, nhấn **Continue**
6. Bước "Grant users access" → bỏ qua, nhấn **Done**

Bạn sẽ thấy service account vừa tạo trong danh sách, email có dạng:
```
melive-sheets@melive-creator-lab.iam.gserviceaccount.com
```
⚠️ **Copy email này lại** — bạn cần dùng ở Bước 2.

### 1.4 Tạo và tải JSON Key

1. Click vào tên service account vừa tạo
2. Chuyển sang tab **Keys**
3. Nhấn **Add Key → Create new key**
4. Chọn **JSON** → **Create**
5. File JSON tự động tải về máy tính (tên kiểu `melive-creator-lab-xxxx.json`)
6. **Giữ file này an toàn** — đây là "mật khẩu" để truy cập Sheets

**🔗 Link trực tiếp tạo key** (thay `YOUR_PROJECT_ID` bằng project ID thật của bạn):
```
https://console.cloud.google.com/iam-admin/serviceaccounts?project=YOUR_PROJECT_ID
```

### 1.5 Chuyển JSON thành một dòng

Mở file JSON vừa tải, nội dung trông như thế này:
```json
{
  "type": "service_account",
  "project_id": "melive-creator-lab",
  "private_key_id": "abc123...",
  ...
}
```

Bạn cần chuyển toàn bộ nội dung thành **một dòng duy nhất** để đưa vào biến môi trường.

**Cách nhanh nhất — dùng terminal/command prompt:**

Mac/Linux:
```bash
cat /path/to/melive-creator-lab-xxxx.json | tr -d '\n'
```

Windows (PowerShell):
```powershell
(Get-Content 'C:\path\to\melive-creator-lab-xxxx.json') -join '' | Write-Output
```

Copy toàn bộ output → đây là giá trị cho `GOOGLE_SERVICE_ACCOUNT_JSON`.

---

## Bước 2 — Share Google Sheets cho Service Account

1. Mở Google Sheets của bạn:  
   [https://docs.google.com/spreadsheets/d/1_WwDO5vVmxbwn_wLM0o13c8k8nNUveiVYjGUsuqJ7bs/edit](https://docs.google.com/spreadsheets/d/1_WwDO5vVmxbwn_wLM0o13c8k8nNUveiVYjGUsuqJ7bs/edit)

2. Nhấn nút **Share** (góc trên phải)

3. Paste email service account vào ô "Add people and groups":
   ```
   melive-sheets@melive-creator-lab.iam.gserviceaccount.com
   ```
   *(thay bằng email thật từ Bước 1.3)*

4. Chọn quyền: **Editor**

5. **Bỏ chọn** "Notify people" (service account không đọc email)

6. Nhấn **Share**

✅ Xong — code giờ có thể đọc/ghi vào Sheets này.

---

## Bước 3 — Cài đặt Resend (Email)

### 3.1 Tạo tài khoản Resend

1. Mở [resend.com](https://resend.com) → **Sign up**
2. Xác nhận email

### 3.2 Thêm và verify domain

1. Vào **Domains** → **Add Domain**
2. Nhập: `melive.co`
3. Resend sẽ cho bạn 3 DNS records cần thêm:
   - **SPF** record (TXT)
   - **DKIM** record (TXT hoặc CNAME)  
   - **DMARC** record (TXT)
4. Đăng nhập vào DNS provider của `melive.co` (GoDaddy, Cloudflare, Namecheap, v.v.)
5. Thêm 3 records đó vào DNS
6. Quay lại Resend → nhấn **Verify DNS Records**
7. Chờ tối đa 24h (thường chỉ vài phút với Cloudflare)

### 3.3 Tạo API Key

1. Vào **API Keys** → **Create API Key**
2. Đặt tên: `melive-production`
3. Permission: **Full access**
4. **Copy API key ngay** — chỉ hiện một lần

Giá trị cho `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

> **Chưa có domain `melive.co`?** Resend cho phép test với địa chỉ `onboarding@resend.dev` miễn phí. Tạm thời set `RESEND_FROM_CREATOR=onboarding@resend.dev` để test, thay lại sau khi verify domain.

---

## Bước 4 — Cài đặt reCAPTCHA v3

### 4.1 Tạo reCAPTCHA site

1. Mở [google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Điền:
   - **Label:** `Melive Creator Lab`
   - **reCAPTCHA type:** chọn **reCAPTCHA v3**
   - **Domains:** thêm 2 dòng:
     ```
     creatorlab.melive.co
     localhost
     ```
3. Nhấn **Submit**

### 4.2 Lấy keys

Sau khi tạo, bạn thấy 2 keys:
- **Site Key** (public) → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key** (private) → `RECAPTCHA_SECRET_KEY`

### 4.3 Thêm script vào layout

Mở file `app/layout.tsx`, trong `<head>`, thêm sau dòng favicon:

```tsx
{/* reCAPTCHA v3 */}
<script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
  async
/>
```

> **Bỏ qua bước này nếu chưa có key** — code đã có fallback, form vẫn hoạt động mà không có reCAPTCHA.

---

## Bước 5 — Deploy lên Vercel

### 5.1 Push code lên GitHub

```bash
# Trong thư mục melive/
git init
git add .
git commit -m "feat: initial production build"

# Tạo repo mới trên github.com rồi:
git remote add origin https://github.com/YOUR_USERNAME/melive-creator-lab.git
git push -u origin main
```

### 5.2 Import vào Vercel

1. Mở [vercel.com](https://vercel.com) → đăng nhập bằng GitHub
2. Nhấn **Add New Project**
3. Chọn repo `melive-creator-lab` → **Import**
4. Framework: **Next.js** (tự detect)
5. **Chưa nhấn Deploy** — cần thêm env vars trước

### 5.3 Thêm Environment Variables

Trong Vercel dashboard → **Environment Variables**, thêm từng biến:

| Variable | Giá trị | Môi trường |
|----------|---------|-----------|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | `1_WwDO5vVmxbwn_wLM0o13c8k8nNUveiVYjGUsuqJ7bs` | Production, Preview |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Nội dung JSON 1 dòng từ Bước 1.5 | Production, Preview |
| `RESEND_API_KEY` | `re_xxxx...` | Production, Preview |
| `RESEND_FROM_CREATOR` | `Melive Creator Lab <creators@melive.co>` | Production, Preview |
| `RESEND_FROM_SYSTEM` | `Melive System <system@melive.co>` | Production, Preview |
| `ADMIN_NOTIFY_EMAIL` | `creators@melive.co` | Production, Preview |
| `ADMIN_PASSWORD` | mật khẩu mạnh tự đặt | Production, Preview |
| `NEXT_PUBLIC_APPLICATION_DEADLINE` | `2026-05-31T23:59:59-05:00` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://creatorlab.melive.co` | Production |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | site key từ Bước 4 | Production, Preview |
| `RECAPTCHA_SECRET_KEY` | secret key từ Bước 4 | Production, Preview |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` (nếu có) | Production |

### 5.4 Deploy

Nhấn **Deploy** → đợi ~2 phút → website live tại `xxx.vercel.app`.

---

## Bước 6 — Trỏ Domain

### 6.1 Thêm domain vào Vercel

1. Vercel dashboard → **Settings → Domains**
2. Nhấn **Add Domain**
3. Nhập: `creatorlab.melive.co`
4. Vercel sẽ cho bạn DNS record cần thêm (dạng CNAME)

### 6.2 Thêm CNAME vào DNS

Đăng nhập DNS provider của `melive.co`, thêm record:

| Type | Name | Value |
|------|------|-------|
| CNAME | `creatorlab` | `cname.vercel-dns.com` |

Chờ 5–30 phút → Vercel tự cấp SSL certificate → website live tại `https://creatorlab.melive.co`.

---

## Bước 7 — Test toàn bộ

Chạy theo checklist này sau khi deploy:

### Form submission
- [ ] Mở `creatorlab.melive.co` trên Chrome mobile
- [ ] Điền form với email thật của bạn → Submit
- [ ] ✅ Success modal hiện ra
- [ ] ✅ Email confirm nhận được trong inbox
- [ ] ✅ Email admin notify gửi đến `creators@melive.co`
- [ ] ✅ Row mới xuất hiện trong Google Sheets tab `applications`

### Validation
- [ ] Submit form trống → tất cả field đỏ
- [ ] Chọn TikTok → nhập link YouTube vào handle → báo lỗi đúng platform
- [ ] Submit cùng email lần 2 → hiện "email already submitted"

### Admin dashboard
- [ ] Mở `creatorlab.melive.co/admin`
- [ ] Nhập `ADMIN_PASSWORD` → vào được dashboard
- [ ] Application vừa submit hiện trong bảng
- [ ] Click vào row → xem detail đầy đủ
- [ ] Đổi status → Reviewing → nhấn "Update Status"
- [ ] ✅ Status cập nhật trong Sheets cột Q
- [ ] Nhấn "Export CSV" → file tải về đúng

### SEO
- [ ] Paste URL vào [opengraph.xyz](https://opengraph.xyz) → hiện đúng title + description
- [ ] Mở `creatorlab.melive.co/sitemap.xml` → valid XML
- [ ] Mở `creatorlab.melive.co/robots.txt` → đúng nội dung

---

## Vận hành hàng ngày

### Xem đơn đăng ký mới
→ Mở `creatorlab.melive.co/admin` → đăng nhập → xem bảng

### Cập nhật status creator
→ Admin dashboard → click vào tên → đổi status dropdown → Update Status

### Export danh sách để review
→ Admin dashboard → set filter muốn → nhấn "↓ Export CSV"

### Sửa nội dung website (text, FAQ, ngày tháng)
→ Mở file `lib/config.ts` trong repo → sửa → commit + push → Vercel tự deploy trong ~30 giây

### Đóng form sau deadline (May 31)
→ Tự động — code đọc `NEXT_PUBLIC_APPLICATION_DEADLINE`, khi qua ngày đó form tự chuyển sang "Applications Closed" + waitlist

---

## Xử lý sự cố thường gặp

### Form submit → "Something went wrong"
1. Kiểm tra Vercel → **Functions** tab → xem log lỗi
2. Nguyên nhân thường gặp: `GOOGLE_SERVICE_ACCOUNT_JSON` bị lỗi format (phải là 1 dòng, không xuống hàng)
3. Fix: copy lại JSON, dùng lệnh `tr -d '\n'` để chuyển thành 1 dòng, update lại env var

### Email không gửi được
1. Kiểm tra Resend dashboard → **Logs** → xem lỗi
2. Nguyên nhân thường gặp: domain chưa verify, hoặc `RESEND_FROM_CREATOR` dùng domain chưa verify
3. Fix tạm: đổi `RESEND_FROM_CREATOR=onboarding@resend.dev`

### Admin dashboard không load được data
1. Kiểm tra Service Account có quyền Editor trên Sheets chưa
2. Kiểm tra `GOOGLE_SHEETS_SPREADSHEET_ID` đúng chưa (lấy từ URL)
3. Kiểm tra tab trong Sheets tên đúng chính xác: `applications` (không phải `Applications`)

### Vercel build lỗi
```bash
# Chạy local để kiểm tra trước khi push:
npm run build
```
Đọc error message → thường là TypeScript type error → fix rồi push lại.

---

## Nâng cấp tương lai (Phase 2+)

| Khi nào | Nâng cấp gì | Làm thế nào |
|---------|------------|------------|
| >500 applications | Migrate sang Supabase | Thay `lib/sheets.ts` bằng `lib/supabase.ts` |
| Team cần sửa content không qua code | Thêm Sanity CMS | Swap data source trong `lib/config.ts` |
| Rate limit bị reset khi cold start | Thêm Upstash Redis | Thay `lib/ratelimit.ts` |
| Cần OAuth login cho admin | Thêm NextAuth | Thay cookie-based auth trong `middleware.ts` |

---

## Danh sách tất cả Environment Variables

```bash
# ============ BẮT BUỘC ============

# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=1_WwDO5vVmxbwn_wLM0o13c8k8nNUveiVYjGUsuqJ7bs
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}  # JSON 1 dòng

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_CREATOR=Melive Creator Lab <creators@melive.co>
RESEND_FROM_SYSTEM=Melive System <system@melive.co>
ADMIN_NOTIFY_EMAIL=creators@melive.co

# Admin
ADMIN_PASSWORD=your-strong-password-here

# App config
NEXT_PUBLIC_APPLICATION_DEADLINE=2026-05-31T23:59:59-05:00
NEXT_PUBLIC_SITE_URL=https://creatorlab.melive.co

# ============ TUỲ CHỌN ============
# (không có vẫn hoạt động bình thường)

NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

---

*SETUP_GUIDE v1.0 · Melive Creator Lab NYC · April 2026*  
*Câu hỏi: creators@melive.co*
