// ============================================================
// Melive Creator Lab — Shared Types
// ============================================================

export type Platform = "TikTok" | "Instagram" | "YouTube" | "Twitch/Kick";

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "approved"
  | "rejected"
  | "contacted";

export type FollowerRange =
  | "50K–100K"
  | "100K–250K"
  | "250K–500K"
  | "500K–1M"
  | "1M+";

export type GMVRange =
  | "$0 — haven't started yet"
  | "$1 – $5K"
  | "$5K – $15K"
  | "$15K – $50K"
  | "$50K+";

export type FulltimeStatus =
  | "Yes, full-time"
  | "Part-time, transitioning"
  | "Side hustle";

export interface Application {
  id: string; // row index or UUID stored in sheet
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cityState: string;
  platform: Platform;
  handle: string;
  followers: FollowerRange;
  categories: string[];
  currentGmv?: GMVRange;
  fulltime: FulltimeStatus;
  pitch: string;
  links: string;
  status: ApplicationStatus;
  notes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ipAddress?: string;
  recaptchaScore?: number;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cityState: string;
  platform: Platform;
  handle: string;
  followers: FollowerRange;
  categories: string[];
  currentGmv?: string;
  fulltime: string;
  pitch: string;
  links: string;
  recaptchaToken?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ApiSuccessResponse {
  success: true;
  applicationId: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  fields?: Record<string, string>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export const CONTENT_CATEGORIES = [
  "Beauty & Makeup",
  "Skincare",
  "Personal Care / Hygiene",
  "Home Appliance / Gadgets",
  "Home & Living",
  "Wellness / Supplements",
  "Lifestyle / Vlog",
  "Fashion / Accessories",
] as const;

export const PLATFORMS: Platform[] = [
  "TikTok",
  "Instagram",
  "YouTube",
  "Twitch/Kick",
];

export const FOLLOWER_RANGES: FollowerRange[] = [
  "50K–100K",
  "100K–250K",
  "250K–500K",
  "500K–1M",
  "1M+",
];

export const APPLICATION_STATUSES: { value: ApplicationStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-gray-100 text-gray-800" },
  { value: "reviewing", label: "Reviewing", color: "bg-blue-100 text-blue-800" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-yellow-100 text-yellow-800" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  { value: "contacted", label: "Contacted", color: "bg-purple-100 text-purple-800" },
];

export const HANDLE_PLACEHOLDER: Record<Platform, string> = {
  TikTok: "@yourtiktokhandle",
  Instagram: "@yourinstagram",
  YouTube: "https://youtube.com/@yourchannel",
  "Twitch/Kick": "yourtwitchname",
};
