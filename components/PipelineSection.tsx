import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { pipelineSteps } from "@/lib/site-content";

export function PipelineSection() {
  return (
    <section id="pipeline" className="section-space bg-white/65">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Capture & Processing Pipeline"
          title="A Clear Pipeline from Aerial Acquisition to Compression Evaluation"
          description="The processing flow is presented as a compact research pipeline, emphasizing the transition from real UAV capture to benchmark-oriented Gaussian Splatting analysis."
        />

        <div className="grid gap-5 xl:grid-cols-5">
          {pipelineSteps.map((step, index) => (
            <article key={step.title} className="relative surface-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[rgba(47,128,237,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Step {index + 1}
                </span>
                {index < pipelineSteps.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 text-muted xl:block" />
                ) : null}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
