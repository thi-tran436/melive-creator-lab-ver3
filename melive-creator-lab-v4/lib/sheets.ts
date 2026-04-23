import { google } from "googleapis";
import type { Application, ApplicationStatus } from "@/types";

function getSheets() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set.");
  const credentials = JSON.parse(raw);
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  return google.sheets({ version: "v4", auth });
}

const SHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function appendApplication(data: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">): Promise<string> {
  const sheets = getSheets();
  const id = makeId("app");
  const now = new Date().toISOString();
  const row = [
    id, now, now,
    data.firstName, data.lastName, data.email, data.phone ?? "",
    data.cityState, data.platform, data.handle, data.followers,
    Array.isArray(data.categories) ? data.categories.join(", ") : "",
    data.currentGmv ?? "", data.fulltime, data.pitch, data.links,
    "new", "", // status, notes
    data.utmSource ?? "", data.utmMedium ?? "", data.utmCampaign ?? "",
    data.ipAddress ?? "", String(data.recaptchaScore ?? ""),
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "applications!A:W",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
  return id;
}

export async function checkDuplicateEmail(email: string): Promise<boolean> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "applications!F2:F" });
  const emails = (res.data.values ?? []).map((r: string[]) => r[0]?.toLowerCase());
  return emails.includes(email.toLowerCase());
}

export async function getAllApplications(): Promise<Application[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "applications!A2:W" });
  return (res.data.values ?? []).map(rowToApp).filter(Boolean) as Application[];
}

export async function getApplicationById(id: string): Promise<{ application: Application; rowIndex: number } | null> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "applications!A2:W" });
  const rows = res.data.values ?? [];
  const idx = rows.findIndex((r: string[]) => r[0] === id);
  if (idx === -1) return null;
  const application = rowToApp(rows[idx]);
  if (!application) return null;
  return { application, rowIndex: idx + 2 };
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<boolean> {
  const result = await getApplicationById(id);
  if (!result) return false;
  const sheets = getSheets();
  const { rowIndex } = result;
  const now = new Date().toISOString();
  const updates: { range: string; values: string[][] }[] = [
    { range: `applications!C${rowIndex}`, values: [[now]] },
    { range: `applications!Q${rowIndex}`, values: [[status]] },
  ];
  if (notes !== undefined) updates.push({ range: `applications!R${rowIndex}`, values: [[notes]] });
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { valueInputOption: "RAW", data: updates },
  });
  return true;
}

export async function appendWaitlist(email: string, source?: string): Promise<string> {
  const sheets = getSheets();
  const id = makeId("wl");
  const now = new Date().toISOString();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "waitlist!A:D",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[id, email, now, source ?? ""]] },
  });
  return id;
}

export async function checkDuplicateWaitlist(email: string): Promise<boolean> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: "waitlist!B2:B" });
  const emails = (res.data.values ?? []).map((r: string[]) => r[0]?.toLowerCase());
  return emails.includes(email.toLowerCase());
}

function rowToApp(row: string[]): Application | null {
  if (!row?.[0]) return null;
  return {
    id: row[0] ?? "", createdAt: row[1] ?? "", updatedAt: row[2] ?? "",
    firstName: row[3] ?? "", lastName: row[4] ?? "", email: row[5] ?? "",
    phone: row[6] || undefined, cityState: row[7] ?? "",
    platform: (row[8] as Application["platform"]) ?? "TikTok",
    handle: row[9] ?? "", followers: (row[10] as Application["followers"]) ?? "50K–100K",
    categories: row[11] ? row[11].split(", ") : [],
    currentGmv: row[12] || undefined, fulltime: row[13] ?? "",
    pitch: row[14] ?? "", links: row[15] ?? "",
    status: (row[16] as ApplicationStatus) ?? "new",
    notes: row[17] || undefined, utmSource: row[18] || undefined,
    utmMedium: row[19] || undefined, utmCampaign: row[20] || undefined,
    ipAddress: row[21] || undefined,
    recaptchaScore: row[22] ? parseFloat(row[22]) : undefined,
  };
}
