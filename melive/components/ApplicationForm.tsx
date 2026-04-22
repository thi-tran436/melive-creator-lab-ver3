"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationFormValues, validateHandle } from "@/lib/validations";
import {
  CONTENT_CATEGORIES,
  PLATFORMS,
  FOLLOWER_RANGES,
  HANDLE_PLACEHOLDER,
  type Platform,
} from "@/types";
import SuccessModal from "./SuccessModal";
import WaitlistForm from "./WaitlistForm";
import { siteConfig } from "@/lib/config";

// ---- Field wrapper for consistent styling ----
function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 6,
          letterSpacing: "0.02em",
          color: "#0F0F12",
        }}
      >
        {label} {required && <span aria-hidden="true" style={{ color: "#FF2E63" }}>*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" style={{ color: "#FF2E63", fontSize: 12, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean, isValid?: boolean): React.CSSProperties => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  padding: "14px 16px",
  border: `2px solid ${hasError ? "#FF2E63" : isValid ? "#08D9D6" : "rgba(0,0,0,0.1)"}`,
  borderRadius: 12,
  background: "#fff",
  transition: "border-color 0.2s",
  width: "100%",
  outline: "none",
  color: "#0F0F12",
});

// ---- Check if deadline has passed ----
function isDeadlinePassed(): boolean {
  const deadline = process.env.NEXT_PUBLIC_APPLICATION_DEADLINE;
  if (!deadline) return false;
  return new Date() > new Date(deadline);
}

export default function ApplicationForm() {
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deadlinePassed] = useState(isDeadlinePassed);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    reset,
    setValue,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur",
  });

  const selectedPlatform = watch("platform");
  const pitchValue = watch("pitch") ?? "";

  // Capture UTM params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_medium = params.get("utm_medium");
    const utm_campaign = params.get("utm_campaign");
    if (utm_source) setValue("utmSource", utm_source);
    if (utm_medium) setValue("utmMedium", utm_medium);
    if (utm_campaign) setValue("utmCampaign", utm_campaign);
  }, [setValue]);

  // Re-validate handle when platform changes
  useEffect(() => {
    if (touchedFields.handle || dirtyFields.handle) {
      trigger("handle");
    }
  }, [selectedPlatform, trigger, touchedFields.handle, dirtyFields.handle]);

  const getRecaptchaToken = useCallback(async (): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === "undefined" || !(window as any).grecaptcha) {
      return "";
    }
    try {
      return await (window as any).grecaptcha.execute(siteKey, {
        action: "submit_application",
      });
    } catch {
      return "";
    }
  }, []);

  const onSubmit = async (data: ApplicationFormValues) => {
    setFormError(null);

    const recaptchaToken = await getRecaptchaToken();

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = await res.json();

      if (res.status === 201 && json.success) {
        setShowModal(true);
        reset();
        return;
      }

      if (res.status === 409) {
        setFormError("This email has already submitted an application. Check your inbox for a confirmation.");
        return;
      }

      if (res.status === 429) {
        setFormError("Too many submissions. Please try again in an hour.");
        return;
      }

      if (res.status === 410) {
        setFormError("Applications are now closed. Thank you for your interest!");
        return;
      }

      setFormError(json.message ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    }
  };

  // ---- Closed state ----
  if (deadlinePassed) {
    return (
      <section id="apply" style={{ padding: "0 0 80px" }}>
        <div
          style={{
            background: "#0F0F12",
            color: "#FBF7F0",
            borderRadius: 40,
            margin: "0 40px",
            padding: "90px 60px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "#FFD369", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>
            Applications Closed
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "#FBF7F0", marginBottom: 20 }}>
            Applications for Class of {siteConfig.cohort.year} are now closed.
          </h2>
          <p style={{ color: "#bbb", fontSize: 18, maxWidth: 560, margin: "0 auto 40px" }}>
            Shortlisting begins {siteConfig.programDates.shortlistStart}. Final 20 announced{" "}
            {siteConfig.programDates.announce}. Join the waitlist to be notified when the next cohort opens.
          </p>
          <WaitlistForm />
        </div>
      </section>
    );
  }

  // ---- Open state ----
  return (
    <>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <section id="apply" style={{ padding: "0 0 80px" }}>
        <div
          className="signup-wrap"
          style={{
            background: "#0F0F12",
            color: "#FBF7F0",
            borderRadius: 40,
            margin: "0 40px",
            padding: "90px 60px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#FFD369", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>
              Apply Now
            </div>
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", color: "#FBF7F0", marginBottom: 16 }}>
              Ready to get signed?
            </h2>
            <p style={{ color: "#bbb", fontSize: 18, maxWidth: 600, margin: "0 auto 0" }}>
              Applications close{" "}
              <strong style={{ color: "#FFD369" }}>
                {siteConfig.programDates.deadline}
              </strong>
              . Shortlist announced{" "}
              <strong style={{ color: "#FFD369" }}>
                {siteConfig.programDates.announce}
              </strong>
              . Class of {siteConfig.cohort.year} kicks off{" "}
              <strong style={{ color: "#FFD369" }}>
                {siteConfig.programDates.start}
              </strong>
              . Takes ~5 minutes.
            </p>
          </div>

          {/* Form card */}
          <form
            id="signupForm"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Creator Lab application form"
            style={{
              maxWidth: 720,
              margin: "50px auto 0",
              background: "#FBF7F0",
              color: "#0F0F12",
              borderRadius: 28,
              padding: 50,
            }}
          >
            {/* Global error */}
            {formError && (
              <div
                role="alert"
                style={{
                  background: "#fff5f8",
                  border: "2px solid #FF2E63",
                  borderRadius: 12,
                  padding: "14px 18px",
                  marginBottom: 24,
                  color: "#FF2E63",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {formError}
              </div>
            )}

            {/* Row: First name + Last name */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="First name" htmlFor="firstName" error={errors.firstName?.message} required>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  {...register("firstName")}
                  style={inputStyle(!!errors.firstName, touchedFields.firstName && !errors.firstName)}
                />
              </Field>
              <Field label="Last name" htmlFor="lastName" error={errors.lastName?.message} required>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                  style={inputStyle(!!errors.lastName, touchedFields.lastName && !errors.lastName)}
                />
              </Field>
            </div>

            {/* Row: Email + Phone */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Email" htmlFor="email" error={errors.email?.message} required>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  style={inputStyle(!!errors.email, touchedFields.email && !errors.email)}
                />
              </Field>
              <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                  style={inputStyle(!!errors.phone, touchedFields.phone && !errors.phone)}
                />
              </Field>
            </div>

            {/* Row: City/State + Platform */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="City / State" htmlFor="cityState" error={errors.cityState?.message} required>
                <input
                  id="cityState"
                  type="text"
                  placeholder="e.g., Brooklyn, NY"
                  aria-invalid={!!errors.cityState}
                  {...register("cityState")}
                  style={inputStyle(!!errors.cityState, touchedFields.cityState && !errors.cityState)}
                />
              </Field>
              <Field label="Primary platform" htmlFor="platform" error={errors.platform?.message} required>
                <select
                  id="platform"
                  aria-invalid={!!errors.platform}
                  {...register("platform")}
                  style={{
                    ...inputStyle(!!errors.platform, touchedFields.platform && !errors.platform),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select...</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Row: Handle + Followers */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Primary @handle" htmlFor="handle" error={errors.handle?.message} required>
                <input
                  id="handle"
                  type="text"
                  placeholder={selectedPlatform ? HANDLE_PLACEHOLDER[selectedPlatform as Platform] : "@yourhandle"}
                  aria-invalid={!!errors.handle}
                  {...register("handle")}
                  style={inputStyle(!!errors.handle, touchedFields.handle && !errors.handle)}
                />
              </Field>
              <Field label="Follower count" htmlFor="followers" error={errors.followers?.message} required>
                <select
                  id="followers"
                  aria-invalid={!!errors.followers}
                  {...register("followers")}
                  style={{
                    ...inputStyle(!!errors.followers, touchedFields.followers && !errors.followers),
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select range...</option>
                  {FOLLOWER_RANGES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: 18 }}>
              <fieldset style={{ border: "none", padding: 0 }}>
                <legend
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 10,
                    letterSpacing: "0.02em",
                    color: "#0F0F12",
                  }}
                >
                  Your content categories (pick all that apply){" "}
                  <span aria-hidden="true" style={{ color: "#FF2E63" }}>*</span>
                </legend>
                <Controller
                  control={control}
                  name="categories"
                  defaultValue={[]}
                  render={({ field }) => (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 10,
                      }}
                    >
                      {CONTENT_CATEGORIES.map((cat) => {
                        const checked = field.value.includes(cat);
                        return (
                          <label
                            key={cat}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              background: checked ? "#fff5f8" : "#fff",
                              padding: "12px 14px",
                              borderRadius: 12,
                              border: `2px solid ${checked ? "#FF2E63" : "rgba(0,0,0,0.1)"}`,
                              cursor: "pointer",
                              fontWeight: 500,
                              fontSize: 14,
                              transition: "border-color 0.2s, background 0.2s",
                            }}
                          >
                            <input
                              type="checkbox"
                              value={cat}
                              checked={checked}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...field.value, cat]
                                  : field.value.filter((v) => v !== cat);
                                field.onChange(next);
                              }}
                              style={{
                                accentColor: "#FF2E63",
                                width: 18,
                                height: 18,
                                flexShrink: 0,
                              }}
                            />
                            {cat}
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.categories && (
                  <p role="alert" style={{ color: "#FF2E63", fontSize: 12, marginTop: 6 }}>
                    {errors.categories.message}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Row: GMV + Full-time */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <Field label="Current monthly GMV (TikTok Shop, if any)" htmlFor="currentGmv" error={errors.currentGmv?.message}>
                <select
                  id="currentGmv"
                  {...register("currentGmv")}
                  style={{ ...inputStyle(false), appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Select...</option>
                  <option>$0 — haven&apos;t started yet</option>
                  <option>$1 – $5K</option>
                  <option>$5K – $15K</option>
                  <option>$15K – $50K</option>
                  <option>$50K+</option>
                </select>
              </Field>
              <Field label="Full-time creator?" htmlFor="fulltime" error={errors.fulltime?.message} required>
                <select
                  id="fulltime"
                  aria-invalid={!!errors.fulltime}
                  {...register("fulltime")}
                  style={{ ...inputStyle(!!errors.fulltime, touchedFields.fulltime && !errors.fulltime), appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Select...</option>
                  <option>Yes, full-time</option>
                  <option>Part-time, transitioning</option>
                  <option>Side hustle</option>
                </select>
              </Field>
            </div>

            {/* Pitch */}
            <div style={{ marginBottom: 18 }}>
              <Field
                label="Why you? Tell us in 3–5 sentences what makes you the right fit."
                htmlFor="pitch"
                error={errors.pitch?.message}
                required
              >
                <textarea
                  id="pitch"
                  aria-invalid={!!errors.pitch}
                  placeholder="What's your unique voice? Who's your audience? Why do you want to build a live commerce business?"
                  {...register("pitch")}
                  style={{
                    ...inputStyle(!!errors.pitch, touchedFields.pitch && !errors.pitch && pitchValue.length >= 100),
                    resize: "vertical",
                    minHeight: 110,
                  }}
                />
              </Field>
              <div
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  marginTop: 4,
                  color: pitchValue.length < 100 ? "#FF2E63" : pitchValue.length > 900 ? "#F59E0B" : "#666",
                }}
                aria-live="polite"
              >
                {pitchValue.length} / 1000 characters
                {pitchValue.length < 100 && ` — ${100 - pitchValue.length} more needed`}
              </div>
            </div>

            {/* Links */}
            <div style={{ marginBottom: 24 }}>
              <Field
                label="Drop your best 3 links — video, live replay, portfolio"
                htmlFor="links"
                error={errors.links?.message}
                required
              >
                <textarea
                  id="links"
                  aria-invalid={!!errors.links}
                  placeholder={"1. https://...\n2. https://...\n3. https://..."}
                  {...register("links")}
                  style={{
                    ...inputStyle(!!errors.links, touchedFields.links && !errors.links),
                    resize: "vertical",
                    minHeight: 90,
                  }}
                />
              </Field>
            </div>

            {/* Hidden UTM fields */}
            <input type="hidden" {...register("utmSource")} />
            <input type="hidden" {...register("utmMedium")} />
            <input type="hidden" {...register("utmCampaign")} />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label="Submit your Creator Lab application"
              style={{
                width: "100%",
                background: isSubmitting ? "#666" : "#0F0F12",
                color: "#FBF7F0",
                padding: 18,
                borderRadius: 14,
                border: "none",
                fontWeight: 700,
                fontSize: 16,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "transform 0.2s, background 0.2s",
                fontFamily: "'Inter', sans-serif",
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.background = "#FF2E63";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  (e.currentTarget as HTMLElement).style.background = "#0F0F12";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }
              }}
            >
              {isSubmitting ? "Submitting…" : "Submit Application →"}
            </button>

            <p style={{ fontSize: 12, color: "#666", marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
              By applying you agree to Melive&apos;s{" "}
              <a href="/terms" style={{ color: "#FF2E63" }}>creator partnership terms</a> and{" "}
              <a href="/privacy" style={{ color: "#FF2E63" }}>privacy policy</a>. We&apos;ll
              review every application and respond within 14 days of the deadline.
            </p>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .signup-wrap {
            margin: 0 16px !important;
            padding: 60px 24px !important;
            border-radius: 24px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .signup-wrap form {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </>
  );
}
