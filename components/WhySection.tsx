import { Blocks, Orbit, PlaneTakeoff, ScanSearch } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { whyItems } from "@/lib/site-content";

const icons = {
  coverage: Orbit,
  uav: PlaneTakeoff,
  diversity: Blocks,
  benchmark: ScanSearch,
};

export function WhySection() {
  return (
    <section className="section-space bg-white/65">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Why PKU-GS"
          title="Designed for Research on Large-Scene Gaussian Splatting Compression"
          description="The project page foregrounds the dataset properties that matter most for reproducible reconstruction, evaluation, and compression-focused analysis."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whyItems.map((item) => {
            const Icon = icons[item.icon];

            return (
              <article key={item.title} className="surface-card p-7">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(33,199,168,0.1)] text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
