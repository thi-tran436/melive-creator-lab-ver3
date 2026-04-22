"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhySection from "@/components/WhySection";
import BenefitsSection from "@/components/BenefitsSection";
import RoadmapSection from "@/components/RoadmapSection";
import RequirementsSection from "@/components/RequirementsSection";
import ApplicationForm from "@/components/ApplicationForm";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <WhySection />
        <BenefitsSection />
        <RoadmapSection />
        <RequirementsSection />
        <ApplicationForm />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
