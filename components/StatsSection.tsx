import Image from "next/image";
import { Compass, Database, Layers3, Map, MoveDiagonal, Route } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { stats } from "@/lib/site-content";

const icons = {
  map: Map,
  frames: Compass,
  route: Route,
  poi: Layers3,
  storage: Database,
  coverage: MoveDiagonal,
};

export function StatsSection() {
  return (
    <section id="overview" className="section-space">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Dataset Overview"
          title="Dataset at a Glance"
          description="PKU-GS combines key quantitative indicators with a compact visual summary to present dataset scale, coverage, and collection characteristics in a concise academic format."
          className="mb-10 md:mb-12"
        />

        <div className="grid items-start gap-y-8 md:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
          <div className="self-start">
            <figure className="mx-auto w-full max-w-[430px] rounded-[30px] border border-[rgba(230,236,242,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(249,251,253,0.94))] p-6 shadow-[0_18px_44px_rgba(25,52,84,0.05)] md:mx-0 md:p-7">
              <div className="inline-flex rounded-full border border-[rgba(47,128,237,0.12)] bg-white/78 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted">
                Visual Summary
              </div>
              <div className="mt-5 rounded-[24px] border border-[rgba(230,236,242,0.72)] bg-white/72 px-4 py-5 md:px-5 md:py-6">
                <div className="relative flex justify-center">
                  <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(47,128,237,0.1),transparent_70%)] blur-3xl" />
                  <Image
                    src="/images/article/circle.png"
                    alt="Donut chart visualizing the dataset composition summary."
                    width={1248}
                    height={1044}
                    sizes="(max-width: 767px) 80vw, (max-width: 1279px) 34vw, 420px"
                    className="relative h-auto w-full max-w-[320px] object-contain md:max-w-[340px]"
                  />
                </div>
              </div>
              <figcaption className="mt-5 max-w-[35ch] text-sm leading-7 text-muted">
                A compact distribution view presented alongside the core dataset statistics for quick structural reference.
              </figcaption>
            </figure>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2 xl:gap-5">
            {stats.map((item) => {
              const Icon = icons[item.icon];

              return (
                <article
                  key={item.title}
                  className="surface-card surface-card-hover flex h-full min-h-[190px] flex-col justify-between p-6 md:min-h-[210px] md:p-7"
                >
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(47,128,237,0.08)] text-primary md:mb-12">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value text-[2.55rem] md:text-[3.15rem]">{item.value}</div>
                    <h3 className="mt-3 max-w-[14ch] text-base font-semibold leading-6 text-foreground md:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
