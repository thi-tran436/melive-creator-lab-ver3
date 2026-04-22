/**
 * Google reCAPTCHA v3 server-side verification
 */

export async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Graceful degradation: if no key configured, allow all (dev mode)
  if (!secret || secret === "RECAPTCHA_SECRET_KEY") {
    console.warn("[reCAPTCHA] No secret key configured — skipping verification.");
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, score: 0 };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
      }
    );

    const data = (await response.json()) as {
      success: boolean;
      score: number;
      action: string;
      "error-codes"?: string[];
    };

    return {
      success: data.success && data.score >= 0.5,
      score: data.score ?? 0,
    };
  } catch (err) {
    console.error("[reCAPTCHA] Verification failed:", err);
    return { success: false, score: 0 };
  }
}
