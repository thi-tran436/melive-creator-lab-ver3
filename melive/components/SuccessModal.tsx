"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus close button when modal opens
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(15,15,18,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-pop"
        style={{
          background: "#FBF7F0",
          borderRadius: 28,
          padding: 50,
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Close X */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: "#666",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: 72, marginBottom: 20 }} aria-hidden="true">
          🎬
        </div>

        <h3
          id="success-title"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 32,
            marginBottom: 14,
            color: "#0F0F12",
          }}
        >
          Application received!
        </h3>

        <p style={{ color: "#444", marginBottom: 14, lineHeight: 1.7, fontSize: 15 }}>
          Thanks for applying to Melive Creator Lab NYC — Class of{" "}
          {siteConfig.cohort.year}. We review every application personally and
          will get back to you within 14 days. Watch your inbox at the email
          you provided.
        </p>

        <p style={{ color: "#666", fontSize: 13, marginBottom: 28 }}>
          <strong>What&apos;s next:</strong> Shortlist interviews Jun 1–10 ·
          Final 20 announced Jun 15 · Class starts Jul 1
        </p>

        <button
          onClick={onClose}
          style={{
            display: "inline-block",
            background: "#FF2E63",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 15,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
