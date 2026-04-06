"use client";

import { ArrowDownToLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionIntro } from "@/components/SectionIntro";
import { resourceDownloadRows } from "@/lib/site-content";

export function DownloadSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function handleComingSoon(columnLabel: string, category: string) {
    setToastMessage(`${columnLabel} for ${category} is coming soon.`);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => setToastMessage(null), 1800);
  }

  return (
    <section id="download" className="section-space bg-white/65">
      <div id="resources" aria-hidden="true" className="pointer-events-none relative -top-24" />
      <div className="section-shell">
        <SectionIntro
          eyebrow="Dataset Access"
          title="Download"
          description="Category-level release access for PKU-GS raw videos, Colmap outputs, and reconstruction results, presented as a primary section rather than a secondary resources card."
        />

        <article className="resource-module surface-card relative overflow-hidden">
          <div className="resource-header grid gap-4 border-b border-border/80 px-6 py-4 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:px-7 md:py-[1.05rem]">
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-muted">
                Dataset Downloads
              </p>
              <h3 className="mt-2 font-serif text-[1.8rem] leading-[1.04] text-foreground md:text-[2.02rem]">
                Category-wise Access
              </h3>
            </div>
            <p className="resource-header-copy max-w-[31rem] text-[0.97rem] leading-[1.72] text-muted md:justify-self-end md:self-center">
              Raw videos are available now. Colmap results and reconstruction results remain
              clickable placeholders so the final release slots stay stable.
            </p>
          </div>

          <div className="resource-table-wrap overflow-x-auto px-4 pt-3 pb-2 md:px-6 md:pt-3.5 md:pb-2.5">
            <div className="resource-table-shell">
              <table className="resource-table min-w-[760px] w-full table-fixed border-separate border-spacing-0">
                <caption className="sr-only">
                  Dataset download links by category, including raw videos, Colmap results, and
                  reconstruction results.
                </caption>
                <colgroup>
                  <col className="w-[46%]" />
                  <col className="w-[18%]" />
                  <col className="w-[18%]" />
                  <col className="w-[18%]" />
                </colgroup>
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">raw videos</th>
                  <th scope="col">Colmap results</th>
                  <th scope="col">reconstruction results</th>
                </tr>
              </thead>
              <tbody>
                {resourceDownloadRows.map((row) => (
                  <tr key={row.category}>
                    <th scope="row">{row.category}</th>
                    <td className="resource-action-cell">
                      <a
                        href={row.rawVideosHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open raw videos for ${row.category}`}
                        className="resource-icon-button"
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </a>
                    </td>
                    <td className="resource-action-cell">
                      <button
                        type="button"
                        aria-label={`Colmap results for ${row.category} are coming soon`}
                        className="resource-icon-button resource-icon-button-unavailable"
                        onClick={() => handleComingSoon("Colmap results", row.category)}
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="resource-action-cell">
                      <button
                        type="button"
                        aria-label={`Reconstruction results for ${row.category} are coming soon`}
                        className="resource-icon-button resource-icon-button-unavailable"
                        onClick={() => handleComingSoon("Reconstruction results", row.category)}
                      >
                        <ArrowDownToLine className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>

          <div
            aria-live="polite"
            role="status"
            className={`pointer-events-none absolute right-6 top-6 transition-all duration-200 md:right-8 md:top-6 ${
              toastMessage ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            <div className="resource-toast">{toastMessage ?? "Coming soon."}</div>
          </div>
        </article>
      </div>
    </section>
  );
}
