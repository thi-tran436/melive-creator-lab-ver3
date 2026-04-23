"use client";
import { useEffect, useRef } from "react";

export default function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) { btnRef.current?.focus(); document.body.style.overflow = "hidden"; }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="success-title"
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,15,18,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-pop" style={{ background: "#FBF7F0", borderRadius: 28, padding: 50, maxWidth: 480, width: "100%", textAlign: "center", position: "relative" }}>
        <button ref={btnRef} onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#666" }}>✕</button>
        <div style={{ fontSize: 72, marginBottom: 20 }} aria-hidden="true">🎬</div>
        <h3 id="success-title" style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, marginBottom: 14, color: "#0F0F12" }}>Application received!</h3>
        <p style={{ color: "#444", marginBottom: 14, lineHeight: 1.7, fontSize: 15 }}>
          Thanks for applying to Melive Creator Lab NYC — Class of 2026. We review every application personally and will get back to you within 14 days. Watch your inbox.
        </p>
        <p style={{ color: "#666", fontSize: 13, marginBottom: 28 }}>
          <strong>Next:</strong> Shortlist interviews Jun 1–10 · Final 20 announced Jun 15 · Class starts Jul 1
        </p>
        <button onClick={onClose} className="btn-primary" style={{ border: "none" }}>Close</button>
      </div>
    </div>
  );
}
