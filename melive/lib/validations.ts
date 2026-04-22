import { z } from "zod";
import type { Platform } from "@/types";

// ---- Platform-handle validation regexes ----
const handleValidators: Record<Platform, (h: string) => boolean> = {
  TikTok: (h) => /^@?[a-zA-Z0-9_.]{1,24}$/.test(h),
  Instagram: (h) => /^@?[a-zA-Z0-9_.]{1,30}$/.test(h),
  YouTube: (h) =>
    /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/UC[\w-]{22}|c\/[\w-]+|@[\w-]{3,})/.test(h) ||
    /^@[\w-]{3,30}$/.test(h),
  "Twitch/Kick": (h) => /^[a-zA-Z0-9_]{4,25}$/.test(h),
};

const handleErrorMessages: Record<Platform, string> = {
  TikTok: "Enter a valid TikTok username (e.g., @yourname).",
  Instagram: "Enter a valid Instagram handle (e.g., @yourname).",
  YouTube: "Enter a valid YouTube channel URL or @handle.",
  "Twitch/Kick": "Enter a valid Twitch or Kick username (4–25 characters).",
};

export function validateHandle(platform: Platform, handle: string): true | string {
  if (!handle) return "Please enter your handle.";
  const isValid = handleValidators[platform]?.(handle);
  return isValid ? true : (handleErrorMessages[platform] ?? "Invalid handle format.");
}

// ---- Main application schema ----
export const applicationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Please enter your first name.")
      .max(50, "First name too long."),
    lastName: z
      .string()
      .min(2, "Please enter your last name.")
      .max(50, "Last name too long."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          /^\+?1?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(val),
        "Please enter a valid US phone number."
      ),
    cityState: z.string().min(2, "Please enter your city and state."),
    platform: z.enum(["TikTok", "Instagram", "YouTube", "Twitch/Kick"], {
      required_error: "Please select your primary platform.",
    }),
    handle: z.string().min(1, "Please enter your handle."),
    followers: z.enum(
      ["50K–100K", "100K–250K", "250K–500K", "500K–1M", "1M+"],
      { required_error: "Please select your follower count." }
    ),
    categories: z
      .array(z.string())
      .min(1, "Please select at least one content category."),
    currentGmv: z.string().optional(),
    fulltime: z.string().min(1, "Please indicate your creator commitment."),
    pitch: z
      .string()
      .min(100, "Please write at least 100 characters.")
      .max(1000, "Maximum 1,000 characters."),
    links: z
      .string()
      .min(1, "Please include at least one link.")
      .refine(
        (val) => /https?:\/\//.test(val),
        "Please include at least one valid link starting with https://."
      ),
    recaptchaToken: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Cross-validate handle against selected platform
    const result = validateHandle(data.platform, data.handle);
    if (result !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result,
        path: ["handle"],
      });
    }
  });

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

// ---- Waitlist schema ----
export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
