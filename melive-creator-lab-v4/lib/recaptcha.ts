export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return { success: true, score: 1.0 }; // graceful fallback
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const data = await res.json() as { success: boolean; score: number };
    return { success: data.success && data.score >= 0.5, score: data.score ?? 0 };
  } catch {
    return { success: false, score: 0 };
  }
}
