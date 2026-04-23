export type Platform = "TikTok" | "Instagram" | "YouTube" | "Twitch/Kick";
export type ApplicationStatus = "new" | "reviewing" | "shortlisted" | "approved" | "rejected" | "contacted";
export type FollowerRange = "50K–100K" | "100K–250K" | "250K–500K" | "500K–1M" | "1M+";

export interface Application {
  id: string;
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
  currentGmv?: string;
  fulltime: string;
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

export const PLATFORMS: Platform[] = ["TikTok", "Instagram", "YouTube", "Twitch/Kick"];
export const FOLLOWER_RANGES: FollowerRange[] = ["50K–100K", "100K–250K", "250K–500K", "500K–1M", "1M+"];
export const CONTENT_CATEGORIES = [
  "Beauty & Makeup", "Skincare", "Personal Care / Hygiene",
  "Home Appliance / Gadgets", "Home & Living", "Wellness / Supplements",
  "Lifestyle / Vlog", "Fashion / Accessories",
] as const;
export const APPLICATION_STATUSES = [
  { value: "new" as const, label: "New" },
  { value: "reviewing" as const, label: "Reviewing" },
  { value: "shortlisted" as const, label: "Shortlisted" },
  { value: "approved" as const, label: "Approved" },
  { value: "rejected" as const, label: "Rejected" },
  { value: "contacted" as const, label: "Contacted" },
];
export const HANDLE_PLACEHOLDER: Record<Platform, string> = {
  TikTok: "@yourtiktokhandle",
  Instagram: "@yourinstagram",
  YouTube: "https://youtube.com/@yourchannel",
  "Twitch/Kick": "yourtwitchname",
};
