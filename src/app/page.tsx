import { HeroSection } from "@/components/home/HeroSection";
import { QuickActionCards } from "@/components/home/QuickActionCards";
import { AboutSection } from "@/components/home/AboutSection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { RegistrationCards } from "@/components/home/RegistrationCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBanner } from "@/components/home/StatsBanner";
import { SuccessStories } from "@/components/home/SuccessStories";
import { NewsEventsPreview } from "@/components/home/NewsEventsPreview";
import { LifeAtKmew } from "@/components/home/LifeAtKmew";
import { CallToAction } from "@/components/home/CallToAction";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. 4 Quick Action Cards */}
      <QuickActionCards />

      {/* 3. About KMEW */}
      <AboutSection />

      {/* 4. Our Programs (6 Initiatives) */}
      <ProgramsPreview />

      {/* 5. Dual Registration Cards (Member & Associate) */}
      <RegistrationCards />

      {/* 6. How It Works (6 Step Circles) */}
      <HowItWorks />

      {/* 7. Our Impact (Full-Width Dark Teal Banner) */}
      <StatsBanner />

      {/* 8. Success Stories (Rina, Amit, Shabana) */}
      <SuccessStories />

      {/* 9. Latest News & Events */}
      <NewsEventsPreview />

      {/* 10. Life at KMEW (7 Photo Strip) */}
      <LifeAtKmew />

      {/* 11. Support Banner (Sunset Photo with Dual Buttons) */}
      <CallToAction />

      {/* 12. Frequently Asked Questions (2 Columns) */}
      <FaqSection />
    </div>
  );
}
