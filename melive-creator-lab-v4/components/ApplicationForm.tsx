"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationFormValues } from "@/lib/validations";
import { CONTENT_CATEGORIES, PLATFORMS, FOLLOWER_RANGES, HANDLE_PLACEHOLDER, type Platform } from "@/types";
import SuccessModal from "./SuccessModal";
import WaitlistForm from "./WaitlistForm";

const DEADLINE = process.env.NEXT_PUBLIC_APPLICATION_DEADLINE ?? "2026-05-31T23:59:59-05:00";

function Field({ label, id, error, required, children }: { label: string; id: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, letterSpacing: "0.02em" }}>
        {label}{required && <span aria-hidden="true" style={{ color: "#FF2E63" }}> *</span>}
      </label>
      {children}
      {error && <p role="alert" style={{ color: "#FF2E63", fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function inp(hasError: boolean, isOk?: boolean): React.CSSProperties {
  return { fontFamily: "'Inter',sans-serif", fontSize: 15, padding: "14px 16px", border: `2px solid ${hasError ? "#FF2E63" : isOk ? "#08D9D6" : "rgba(0,0,0,0.1)"}`, borderRadius: 12, background: "#fff", outline: "none", width: "100%", color: "#0F0F12", transition: "border-color 0.2s" };
}

export default function ApplicationForm() {
  const [modal, setModal] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [closed] = useState(() => new Date() > new Date(DEADLINE));

  const { register, handleSubmit, control, watch, trigger, reset, setValue, formState: { errors, isSubmitting, touchedFields } } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
  });

  const platform = watch("platform");
  const pitch = watch("pitch") ?? "";

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("utm_source")) setValue("utmSource", p.get("utm_source")!);
    if (p.get("utm_medium")) setValue("utmMedium", p.get("utm_medium")!);
    if (p.get("utm_campaign")) setValue("utmCampaign", p.get("utm_campaign")!);
  }, [setValue]);

  useEffect(() => {
    if (touchedFields.handle) trigger("handle");
  }, [platform, trigger, touchedFields.handle]);

  const onSubmit = async (data: ApplicationFormValues) => {
    setApiError(null);
    try {
      const res = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.status === 201 && json.success) { setModal(true); reset(); return; }
      if (res.status === 409) { setApiError("This email has already submitted an application."); return; }
      if (res.status === 429) { setApiError("Too many submissions. Please try again in an hour."); return; }
      if (res.status === 410) { setApiError("Applications are now closed."); return; }
      setApiError(json.message ?? "Something went wrong. Please try again.");
    } catch { setApiError("Network error. Please check your connection and try again."); }
  };

  if (closed) {
    return (
      <section id="apply" style={{ padding: "0 0 80px" }}>
        <div className="signup-wrap" style={{ background: "#0F0F12", borderRadius: 40, margin: "0 40px", padding: "90px 60px", textAlign: "center" }}>
          <div style={{ color: "#FFD369", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Applications Closed</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,56px)", color: "#FBF7F0", marginBottom: 20 }}>Applications for Class of 2026 are now closed.</h2>
          <p style={{ color: "#bbb", fontSize: 18, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>Shortlisting begins June 1. Join the waitlist for Class of 2027.</p>
          <WaitlistForm />
        </div>
      </section>
    );
  }

  return (
    <>
      <SuccessModal isOpen={modal} onClose={() => setModal(false)} />
      <section id="apply" style={{ padding: "0 0 80px" }}>
        <div className="signup-wrap" style={{ background: "#0F0F12", color: "#FBF7F0", borderRadius: 40, margin: "0 40px", padding: "90px 60px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#FFD369", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Apply Now</div>
            <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", color: "#FBF7F0", marginBottom: 16 }}>Ready to get signed?</h2>
            <p style={{ color: "#bbb", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
              Applications close <strong style={{ color: "#FFD369" }}>May 31, 2026</strong>. Shortlist announced <strong style={{ color: "#FFD369" }}>June 15</strong>. Class of 2026 kicks off <strong style={{ color: "#FFD369" }}>July 1</strong>. Takes ~5 minutes.
            </p>
          </div>

          <form id="signupForm" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Creator Lab application form"
            style={{ maxWidth: 720, margin: "50px auto 0", background: "#FBF7F0", color: "#0F0F12", borderRadius: 28, padding: 50 }}>

            {apiError && <div role="alert" style={{ background: "#fff5f8", border: "2px solid #FF2E63", borderRadius: 12, padding: "14px 18px", marginBottom: 24, color: "#FF2E63", fontSize: 14, fontWeight: 600 }}>{apiError}</div>}

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="First name" id="firstName" error={errors.firstName?.message} required>
                <input id="firstName" type="text" autoComplete="given-name" {...register("firstName")} style={inp(!!errors.firstName, touchedFields.firstName && !errors.firstName)} />
              </Field>
              <Field label="Last name" id="lastName" error={errors.lastName?.message} required>
                <input id="lastName" type="text" autoComplete="family-name" {...register("lastName")} style={inp(!!errors.lastName, touchedFields.lastName && !errors.lastName)} />
              </Field>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Email" id="email" error={errors.email?.message} required>
                <input id="email" type="email" autoComplete="email" {...register("email")} style={inp(!!errors.email, touchedFields.email && !errors.email)} />
              </Field>
              <Field label="Phone" id="phone" error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" placeholder="(555) 555-5555" {...register("phone")} style={inp(!!errors.phone, touchedFields.phone && !errors.phone)} />
              </Field>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="City / State" id="cityState" error={errors.cityState?.message} required>
                <input id="cityState" type="text" placeholder="e.g., Brooklyn, NY" {...register("cityState")} style={inp(!!errors.cityState, touchedFields.cityState && !errors.cityState)} />
              </Field>
              <Field label="Primary platform" id="platform" error={errors.platform?.message} required>
                <select id="platform" {...register("platform")} style={{ ...inp(!!errors.platform, touchedFields.platform && !errors.platform), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Primary @handle" id="handle" error={errors.handle?.message} required>
                <input id="handle" type="text" placeholder={platform ? HANDLE_PLACEHOLDER[platform as Platform] : "@yourhandle"} {...register("handle")} style={inp(!!errors.handle, touchedFields.handle && !errors.handle)} />
              </Field>
              <Field label="Follower count" id="followers" error={errors.followers?.message} required>
                <select id="followers" {...register("followers")} style={{ ...inp(!!errors.followers, touchedFields.followers && !errors.followers), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select range...</option>
                  {FOLLOWER_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>

            <div style={{ marginBottom: 18 }}>
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, letterSpacing: "0.02em", color: "#0F0F12" }}>
                  Content categories (pick all that apply) <span aria-hidden="true" style={{ color: "#FF2E63" }}>*</span>
                </legend>
                <Controller control={control} name="categories" defaultValue={[]} render={({ field }) => (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                    {CONTENT_CATEGORIES.map(cat => {
                      const checked = field.value.includes(cat);
                      return (
                        <label key={cat} style={{ display: "flex", alignItems: "center", gap: 10, background: checked ? "#fff5f8" : "#fff", padding: "12px 14px", borderRadius: 12, border: `2px solid ${checked ? "#FF2E63" : "rgba(0,0,0,0.1)"}`, cursor: "pointer", fontWeight: 500, fontSize: 14, transition: "border-color 0.2s" }}>
                          <input type="checkbox" value={cat} checked={checked} onChange={e => field.onChange(e.target.checked ? [...field.value, cat] : field.value.filter(v => v !== cat))} style={{ accentColor: "#FF2E63", width: 18, height: 18, flexShrink: 0 }} />
                          {cat}
                        </label>
                      );
                    })}
                  </div>
                )} />
                {errors.categories && <p role="alert" style={{ color: "#FF2E63", fontSize: 12, marginTop: 6 }}>{errors.categories.message}</p>}
              </fieldset>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Current monthly GMV (TikTok Shop)" id="currentGmv" error={errors.currentGmv?.message}>
                <select id="currentGmv" {...register("currentGmv")} style={{ ...inp(false), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {["$0 — haven't started yet", "$1 – $5K", "$5K – $15K", "$15K – $50K", "$50K+"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Full-time creator?" id="fulltime" error={errors.fulltime?.message} required>
                <select id="fulltime" {...register("fulltime")} style={{ ...inp(!!errors.fulltime, touchedFields.fulltime && !errors.fulltime), appearance: "none", cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {["Yes, full-time", "Part-time, transitioning", "Side hustle"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <div style={{ marginBottom: 18 }}>
              <Field label="Why you? Tell us in 3–5 sentences what makes you the right fit." id="pitch" error={errors.pitch?.message} required>
                <textarea id="pitch" placeholder="What's your unique voice? Who's your audience? Why do you want to build a live commerce business?" {...register("pitch")} style={{ ...inp(!!errors.pitch, touchedFields.pitch && !errors.pitch && pitch.length >= 100), resize: "vertical", minHeight: 110 }} />
              </Field>
              <div style={{ fontSize: 12, textAlign: "right", marginTop: 4, color: pitch.length < 100 ? "#FF2E63" : pitch.length > 900 ? "#F59E0B" : "#666" }} aria-live="polite">
                {pitch.length} / 1000{pitch.length < 100 ? ` — ${100 - pitch.length} more needed` : ""}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <Field label="Drop your best 3 links — video, live replay, portfolio" id="links" error={errors.links?.message} required>
                <textarea id="links" placeholder={"1. https://...\n2. https://...\n3. https://..."} {...register("links")} style={{ ...inp(!!errors.links, touchedFields.links && !errors.links), resize: "vertical", minHeight: 90 }} />
              </Field>
            </div>

            <input type="hidden" {...register("utmSource")} />
            <input type="hidden" {...register("utmMedium")} />
            <input type="hidden" {...register("utmCampaign")} />

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? "Submitting…" : "Submit Application →"}
            </button>

            <p style={{ fontSize: 12, color: "#666", marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
              By applying you agree to Melive&apos;s <a href="/terms" style={{ color: "#FF2E63" }}>partnership terms</a> and <a href="/privacy" style={{ color: "#FF2E63" }}>privacy policy</a>. We review every application and respond within 14 days of the deadline.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
