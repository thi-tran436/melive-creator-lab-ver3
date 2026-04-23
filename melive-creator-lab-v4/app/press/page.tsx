import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
export const metadata: Metadata = { title: "Press — Melive" };
export default function PressPage() {
  return <ComingSoon title="Press & Media" description="Media inquiries and press kit coming soon. Email creators@melive.co in the meantime." />;
}
