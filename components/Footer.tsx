import { footerContent } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[rgba(255,255,255,0.88)] py-10">
      <div className="section-shell">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Authors</p>
            <p className="mt-3 text-sm leading-7 text-foreground">{footerContent.authors}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Affiliations
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground">{footerContent.affiliations}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
            <a
              href={`mailto:${footerContent.contact}`}
              className="mt-3 inline-block text-sm leading-7 text-foreground transition-colors hover:text-primary"
            >
              {footerContent.contact}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-lg text-foreground">PKU-GS</p>
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
