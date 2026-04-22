"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, type WaitlistFormValues } from "@/lib/validations";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok || res.status === 409) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
        <p style={{ color: "#FBF7F0", fontSize: 18, fontWeight: 600 }}>
          You&apos;re on the list!
        </p>
        <p style={{ color: "#aaa", fontSize: 14, marginTop: 6 }}>
          We&apos;ll email you when applications open for the next cohort.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
      noValidate
    >
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          aria-label="Email address for waitlist"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "waitlist-error" : undefined}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            padding: "14px 20px",
            border: errors.email ? "2px solid #FF2E63" : "2px solid rgba(255,255,255,0.2)",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            color: "#FBF7F0",
            outline: "none",
            width: 280,
          }}
        />
        {errors.email && (
          <p id="waitlist-error" style={{ color: "#FF2E63", fontSize: 12, marginTop: 4 }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          background: "#FFD369",
          color: "#0F0F12",
          padding: "14px 28px",
          borderRadius: 999,
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          fontWeight: 700,
          fontSize: 15,
          opacity: isSubmitting ? 0.7 : 1,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {isSubmitting ? "Joining..." : "Notify me for Class of 2027"}
      </button>

      {error && (
        <p style={{ color: "#FF2E63", fontSize: 13, width: "100%", textAlign: "center" }}>
          {error}
        </p>
      )}
    </form>
  );
}
