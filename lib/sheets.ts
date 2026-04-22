/**
 * Google Sheets — Primary Database Layer
 *
 * Tabs:
 *   1. applications — creator applications
 *   2. waitlist     — post-deadline email capture
 *   3. settings     — runtime config (future use)
 *
 * Auth: Google Service Account JSON
 */

import { google } from "googleapis";
import type { Application, ApplicationStatus } from "@/types";

// ---- Column order for "applications" tab ----
// MUST match the header row in the spreadsheet exactly
const APPLICATION_COLUMNS = [
  "id",
  "created_at",
  "updated_at",
  "first_name",
  "last_name",
  "email",
  "phone",
  "city_state",
  "platform",
  "handle",
  "followers",
  "categories",
  "gmv",
  "fulltime",
  "pitch",
  "links",
  "status",
  "notes",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "ip_address",
  "recaptcha_score",
] as const;

const WAITLIST_COLUMNS = ["id", "email", "created_at", "source"] as const;

// ---- Sheets client singleton ----
function getAuthClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON is not set. Please add your service account credentials."
    );
  }
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetsClient() {
  const auth = getAuthClient();
  return google.sheets({ version: "v4", auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

// ---- Generate a simple unique ID ----
function generateId(): string {
  return `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---- Initialize sheet headers (run once on first deploy) ----
export async function initializeSheets(): Promise<void> {
  const sheets = getSheetsClient();

  // applications tab
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "applications!A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [APPLICATION_COLUMNS as unknown as string[]],
    },
  });

  // waitlist tab
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "waitlist!A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [WAITLIST_COLUMNS as unknown as string[]],
    },
  });
}

// ---- Append a new application row ----
export async function appendApplication(
  data: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">
): Promise<string> {
  const sheets = getSheetsClient();
  const id = generateId();
  const now = new Date().toISOString();

  const row: string[] = [
    id,
    now, // created_at
    now, // updated_at
    data.firstName,
    data.lastName,
    data.email,
    data.phone ?? "",
    data.cityState,
    data.platform,
    data.handle,
    data.followers,
    Array.isArray(data.categories) ? data.categories.join(", ") : "",
    data.currentGmv ?? "",
    data.fulltime,
    data.pitch,
    data.links,
    "new", // initial status
    "", // notes
    data.utmSource ?? "",
    data.utmMedium ?? "",
    data.utmCampaign ?? "",
    data.ipAddress ?? "",
    data.recaptchaScore?.toString() ?? "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "applications!A:W",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  return id;
}

// ---- Check for duplicate email ----
export async function checkDuplicateEmail(email: string): Promise<boolean> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "applications!F2:F", // email is column F (index 5)
  });

  const emails = (res.data.values ?? []).map((row) => row[0]?.toLowerCase());
  return emails.includes(email.toLowerCase());
}

// ---- Get all applications (for admin) ----
export async function getAllApplications(): Promise<Application[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "applications!A2:W", // skip header row
  });

  const rows = res.data.values ?? [];
  return rows.map(rowToApplication).filter(Boolean) as Application[];
}

// ---- Get single application by ID ----
export async function getApplicationById(id: string): Promise<{ application: Application; rowIndex: number } | null> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "applications!A2:W",
  });

  const rows = res.data.values ?? [];
  const idx = rows.findIndex((row) => row[0] === id);
  if (idx === -1) return null;

  const application = rowToApplication(rows[idx]);
  if (!application) return null;

  return { application, rowIndex: idx + 2 }; // +2 because data starts at row 2
}

// ---- Update application status and notes ----
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<boolean> {
  const result = await getApplicationById(id);
  if (!result) return false;

  const sheets = getSheetsClient();
  const { rowIndex } = result;
  const now = new Date().toISOString();

  // Update updated_at (col C = index 3), status (col Q = index 17), notes (col R = index 18)
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      valueInputOption: "RAW",
      data: [
        {
          range: `applications!C${rowIndex}`,
          values: [[now]],
        },
        {
          range: `applications!Q${rowIndex}`,
          values: [[status]],
        },
        ...(notes !== undefined
          ? [{ range: `applications!R${rowIndex}`, values: [[notes]] }]
          : []),
      ],
    },
  });

  return true;
}

// ---- Add to waitlist ----
export async function appendWaitlist(email: string, source?: string): Promise<string> {
  const sheets = getSheetsClient();
  const id = `wl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "waitlist!A:D",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[id, email, now, source ?? ""]] },
  });

  return id;
}

// ---- Check duplicate waitlist email ----
export async function checkDuplicateWaitlist(email: string): Promise<boolean> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "waitlist!B2:B",
  });

  const emails = (res.data.values ?? []).map((row) => row[0]?.toLowerCase());
  return emails.includes(email.toLowerCase());
}

// ---- Helper: map a sheet row array → Application object ----
function rowToApplication(row: string[]): Application | null {
  if (!row || !row[0]) return null;

  return {
    id: row[0] ?? "",
    createdAt: row[1] ?? "",
    updatedAt: row[2] ?? "",
    firstName: row[3] ?? "",
    lastName: row[4] ?? "",
    email: row[5] ?? "",
    phone: row[6] || undefined,
    cityState: row[7] ?? "",
    platform: (row[8] as Application["platform"]) ?? "TikTok",
    handle: row[9] ?? "",
    followers: (row[10] as Application["followers"]) ?? "50K–100K",
    categories: row[11] ? row[11].split(", ") : [],
    currentGmv: row[12] || undefined,
    fulltime: (row[13] as Application["fulltime"]) ?? "Yes, full-time",
    pitch: row[14] ?? "",
    links: row[15] ?? "",
    status: (row[16] as ApplicationStatus) ?? "new",
    notes: row[17] || undefined,
    utmSource: row[18] || undefined,
    utmMedium: row[19] || undefined,
    utmCampaign: row[20] || undefined,
    ipAddress: row[21] || undefined,
    recaptchaScore: row[22] ? parseFloat(row[22]) : undefined,
  };
}
