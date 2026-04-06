import Image from "next/image";
import { Compass, Map, MoveDiagonal, Route } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { stats } from "@/lib/site-content";

const icons = {
  map: Map,
  frames: Compass,
  route: Route,
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
          className="mb-6 md:mb-8"
        />

        <div className="grid items-start gap-y-7 md:grid-cols-[minmax(320px,0.97fr)_minmax(320px,1.03fr)] md:items-stretch md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
          <div className="self-start md:h-full">
            <figure className="mx-auto flex h-full w-full max-w-[442px] flex-col rounded-[30px] border border-[rgba(230,236,242,0.84)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(249,251,253,0.96))] px-5 py-5 shadow-[0_14px_34px_rgba(25,52,84,0.045)] md:mx-0 md:min-h-[492px] md:px-6 md:py-6 lg:min-h-[516px]">
              <div className="relative flex flex-1 items-center justify-center px-1 pb-1 pt-1 md:px-2">
                <div className="absolute inset-x-5 inset-y-8 rounded-full bg-[radial-gradient(circle,rgba(47,128,237,0.1),transparent_68%)] blur-3xl" />
                <Image
                  src="/images/article/circle.png"
                  alt="Donut chart visualizing the dataset composition summary."
                  width={1248}
                  height={1044}
                  sizes="(max-width: 767px) 80vw, (max-width: 1279px) 34vw, 420px"
                  className="relative h-auto w-full max-w-[348px] object-contain md:max-w-[372px]"
                />
              </div>

              <figcaption className="mt-2 text-xs leading-6 text-muted md:mt-3">
                Distribution of representative PKU-GS scene categories.
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-full md:min-h-[492px] md:grid-cols-2 md:grid-rows-2 md:gap-5 lg:min-h-[516px]">
            {stats.map((item) => {
              const Icon = icons[item.icon];

              return (
                <article
                  key={item.title}
                  className="surface-card surface-card-hover flex h-full min-h-[170px] flex-col justify-between p-5 md:min-h-0 md:p-6"
                >
                  <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(47,128,237,0.08)] text-primary md:mb-9 md:h-11 md:w-11">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="metric-value text-[2.45rem] md:text-[3rem]">{item.value}</div>
                    <h3 className="mt-2.5 max-w-[11ch] text-[0.98rem] font-semibold leading-6 tracking-[-0.02em] text-foreground md:text-[1.02rem]">
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
