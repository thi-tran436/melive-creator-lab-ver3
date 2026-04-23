"use client";
import { useState } from "react";

const faqs = [
  { q: "Is this really free? What's the catch?", a: "Yes, free. Zero upfront cost, zero monthly fee. Melive earns 20% of your TikTok Shop affiliate commissions for 24 months. You keep 80%. We only earn if you earn." },
  { q: "Why 20 creators if you say only 10 will hit $100K?", a: "Live commerce is part talent, part product-fit, part timing. By signing 20, we over-invest so the top 10 reliably scale past $100K — and the bottom 10 still graduate with a working channel, real revenue, and the playbook." },
  { q: "Do I need a studio? Will I have to come to NYC every week?", a: "No studio needed. We help you build a studio-grade setup at home — equipment ships to you. The whole program runs remote: weekly 1:1s, virtual bootcamp, online workshops. Optional NYC meetups 2x during the program." },
  { q: "Do I give up ownership of my channel or content?", a: "Never. Your channel is yours. Your content is yours. Your followers are yours. We don't touch ownership. We're a partner, not an acquirer." },
  { q: "Can I still do brand deals outside Melive?", a: "For non-TikTok Shop content (Instagram posts, YouTube videos, brand sponsorships outside live commerce) — yes, 100% your call. For TikTok Shop live commerce specifically, you partner with us exclusively during the 24 months." },
  { q: "What if I don't hit $100K GMV by month 6?", a: "$100K is the goal. Based on our programs across Southeast Asia cohorts, about half hit it inside 6 months. If you're tracking well at month 6 but not yet there, we extend support 3 months at no cost." },
  { q: "Who's behind Melive?", a: "Melive is the US live commerce arm of The Metub Company — Vietnam's largest MCN with 300+ creators and $40M+ in group revenue. We've been running creator-led live commerce in Southeast Asia since 2021." },
  { q: "When do applications close?", a: "May 31, 2026. Shortlist interviews: June 1–10. Final 20 announced: June 15. Class of 2026 starts July 1. We review on a rolling basis — earlier is better." },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "100px 40px", background: "#F3EEE5" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#FF2E63", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>FAQ</div>
        <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", marginBottom: 50 }}>Frequently asked.</h2>
        {faqs.map((f, i) => (
          <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
            <button
              aria-expanded={open === i}
              aria-controls={`faq-a-${i}`}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: 17, textAlign: "left", color: "#0F0F12", fontFamily: "'Inter',sans-serif", gap: 16 }}>
              <span>{f.q}</span>
              <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>+</span>
            </button>
            <div id={`faq-a-${i}`} role="region" className={`faq-answer${open === i ? " open" : ""}`}>
              <p style={{ color: "#444", fontSize: 15, lineHeight: 1.7 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
