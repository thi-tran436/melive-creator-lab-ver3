import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Press" };

export default function PressPage() {
  return (
    <ComingSoon
      title="Press & Media"
      description="Media inquiries, press kit, and coverage about Melive Creator Lab NYC. Coming soon — email creators@melive.co in the meantime."
    />
  );
}
