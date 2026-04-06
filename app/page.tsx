import { BenchmarkSection } from "@/components/BenchmarkSection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PipelineSection } from "@/components/PipelineSection";
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
      <DownloadSection />
      <Footer />
    </main>
  );
}
