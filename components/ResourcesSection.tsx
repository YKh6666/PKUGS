"use client";

import { Check, Copy, ExternalLink, Quote } from "lucide-react";
import { useState } from "react";
import { ActionLink } from "@/components/ActionLink";
import { SectionIntro } from "@/components/SectionIntro";
import { citation, resourceCards } from "@/lib/site-content";

export function ResourcesSection() {
  const [copied, setCopied] = useState(false);

  async function handleCopyCitation() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="resources" className="section-space bg-white/65">
      <div className="section-shell">
        <SectionIntro
          eyebrow="Download · Code · Citation"
          title="Project Resources"
          description="Resource entry points are grouped for quick access. Placeholder states remain explicit until final release links are ready."
        />

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {resourceCards.map((card) => {
            const isCitation = card.title === "Citation";

            return (
              <article key={card.title} className="surface-card flex h-full flex-col p-7">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(33,199,168,0.1)] text-secondary">
                  {isCitation ? <Quote className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{card.description}</p>

                {isCitation ? (
                  <>
                    <pre className="mt-6 overflow-auto rounded-[20px] border border-border bg-surface-muted p-4 text-xs leading-6 text-foreground">
                      <code>{citation}</code>
                    </pre>
                    <button
                      type="button"
                      onClick={handleCopyCitation}
                      className="action-link action-link-ghost mt-6"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy BibTeX
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="mt-auto pt-8">
                    <ActionLink
                      label={card.actionLabel ?? "Open"}
                      href={card.href}
                      external={card.external}
                      disabled={card.comingSoon}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
