"use client";

import { useState } from "react";
import { faqItems } from "@/lib/config";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      style={{ padding: "100px 40px", background: "#F3EEE5" }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            color: "#FF2E63",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          FAQ
        </div>

        <h2 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", marginBottom: 50 }}>
          Frequently asked.
        </h2>

        <div>
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            const questionId = `faq-question-${i}`;

            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "2px solid #0F0F12",
                  borderRadius: 16,
                  padding: "22px 26px",
                  marginBottom: 12,
                  transition: "background 0.2s",
                }}
              >
                <button
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: 17,
                    textAlign: "left",
                    color: "#0F0F12",
                    fontFamily: "'Inter', sans-serif",
                    gap: 16,
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 22,
                      flexShrink: 0,
                      transition: "transform 0.3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`faq-answer${isOpen ? " open" : ""}`}
                >
                  <p
                    style={{
                      color: "#444",
                      fontSize: 15,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        #faq { padding: 100px 40px; }
        @media (max-width: 900px) {
          #faq { padding: 60px 20px !important; }
        }
      `}</style>
    </section>
  );
}
