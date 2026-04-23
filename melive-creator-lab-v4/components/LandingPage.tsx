"use client";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import WhySection from "./WhySection";
import BenefitsSection from "./BenefitsSection";
import RoadmapSection from "./RoadmapSection";
import RequirementsSection from "./RequirementsSection";
import ApplicationForm from "./ApplicationForm";
import FaqSection from "./FaqSection";
import Footer from "./Footer";

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
