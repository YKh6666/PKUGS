import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { representativeScenes } from "@/lib/site-content";

export function ScenesGallery() {
  return (
    <section id="scenes" className="section-space">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Representative Scenes"
          title="A Curated Glimpse into the Visual Diversity of PKU-GS"
          description="Representative scene cards are curated through manual metadata so titles, tags, and categories remain presentation-grade while the underlying media can be replaced later with final assets."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {representativeScenes.map((scene) => (
            <article key={scene.id} className="surface-card overflow-hidden">
              <div className="group relative aspect-[16/9] overflow-hidden">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,29,46,0.75)] via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[rgba(255,255,255,0.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/88">
                  {scene.category}
                </div>
                <div className="absolute inset-x-4 bottom-4 hidden rounded-2xl border border-white/12 bg-[rgba(17,31,48,0.54)] p-4 text-white/82 backdrop-blur-sm transition duration-300 group-hover:block md:block md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-6">{scene.description}</p>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      {scene.id}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{scene.title}</h3>
                  </div>
                  <span className="rounded-full bg-[rgba(47,128,237,0.07)] px-3 py-1 text-xs font-semibold text-primary">
                    {scene.category}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {scene.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
