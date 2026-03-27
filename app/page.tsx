import { BenchmarkSection } from "@/components/BenchmarkSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PipelineSection } from "@/components/PipelineSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ScenesGallery } from "@/components/ScenesGallery";
import { StatsSection } from "@/components/StatsSection";
import { WhySection } from "@/components/WhySection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsSection />
      <WhySection />
      <ScenesGallery />
      <PipelineSection />
      <BenchmarkSection />
      <ResourcesSection />
      <Footer />
    </main>
  );
}
