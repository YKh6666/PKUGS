import {
  Camera,
  Compass,
  FolderCheck,
  Map,
  Mountain,
  Route,
} from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { stats } from "@/lib/site-content";

const icons = {
  map: Map,
  frames: Compass,
  route: Route,
  capture: Camera,
  terrain: Mountain,
  badge: FolderCheck,
};

export function StatsSection() {
  return (
    <section id="overview" className="section-space">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Dataset Overview"
          title="Dataset at a Glance"
          description="PKU-GS is organized for large-scene aerial reconstruction research, with emphasis on scale, protocol consistency, and compression-oriented benchmarking."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => {
            const Icon = icons[item.icon];

            return (
              <article key={item.title} className="surface-card surface-card-hover p-7 md:p-8">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(47,128,237,0.08)] text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                {item.value ? (
                  <>
                    <div className="metric-value">{item.value}</div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                  </>
                ) : (
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                )}
                <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
