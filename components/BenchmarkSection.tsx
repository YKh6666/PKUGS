import { BarChart3, DatabaseZap, Microscope, Scale } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { benchmarkItems } from "@/lib/site-content";

const icons = [BarChart3, Microscope, DatabaseZap, Scale];

export function BenchmarkSection() {
  return (
    <section id="benchmark" className="section-space">
      <div className="section-shell">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,380px)_1fr] xl:items-start">
          <SectionIntro
            eyebrow="Benchmark"
            title="A Formal Space for Compression-Oriented Evaluation"
            description="The benchmark block is intentionally restrained: it previews the evaluation structure without adopting a dashboard visual language or overstating incomplete results."
            className="mb-0"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {benchmarkItems.map((item, index) => {
              const Icon = icons[index];

              return (
                <article key={item.title} className="surface-card p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(47,128,237,0.08)] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
