import { z } from "zod";
import type { Platform } from "@/types";

const handleValidators: Record<Platform, (h: string) => boolean> = {
  TikTok: (h) => /^@?[a-zA-Z0-9_.]{1,24}$/.test(h),
  Instagram: (h) => /^@?[a-zA-Z0-9_.]{1,30}$/.test(h),
  YouTube: (h) => /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|c\/|@)?[\w-]{3,}/.test(h) || /^@[\w-]{3,30}$/.test(h),
  "Twitch/Kick": (h) => /^[a-zA-Z0-9_]{4,25}$/.test(h),
};

const handleErrors: Record<Platform, string> = {
  TikTok: "Enter a valid TikTok username (e.g. @yourname).",
  Instagram: "Enter a valid Instagram handle (e.g. @yourname).",
  YouTube: "Enter a valid YouTube channel URL or @handle.",
  "Twitch/Kick": "Enter a valid Twitch or Kick username (4–25 chars).",
};

export function validateHandle(platform: Platform, handle: string): true | string {
  if (!handle) return "Please enter your handle.";
  return handleValidators[platform]?.(handle) ? true : (handleErrors[platform] ?? "Invalid handle.");
}

export const applicationSchema = z.object({
  firstName: z.string().min(2, "Enter your first name.").max(50),
  lastName: z.string().min(2, "Enter your last name.").max(50),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional().refine(v => !v || /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v), "Enter a valid US phone number."),
  cityState: z.string().min(2, "Enter your city and state."),
  platform: z.enum(["TikTok", "Instagram", "YouTube", "Twitch/Kick"], { required_error: "Select your platform." }),
  handle: z.string().min(1, "Enter your handle."),
  followers: z.enum(["50K–100K", "100K–250K", "250K–500K", "500K–1M", "1M+"], { required_error: "Select follower count." }),
  categories: z.array(z.string()).min(1, "Select at least one category."),
  currentGmv: z.string().optional(),
  fulltime: z.string().min(1, "Select your commitment level."),
  pitch: z.string().min(100, "Write at least 100 characters.").max(1000),
  links: z.string().min(1, "Include at least one link.").refine(v => /https?:\/\//.test(v), "Include a valid link starting with https://."),
  recaptchaToken: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
}).superRefine((data, ctx) => {
  const result = validateHandle(data.platform, data.handle);
  if (result !== true) ctx.addIssue({ code: z.ZodIssueCode.custom, message: result, path: ["handle"] });
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const waitlistSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});
export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
