type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={["mb-12 md:mb-14", className].filter(Boolean).join(" ")}>
      <div className="section-kicker">{eyebrow}</div>
      <h2 className="section-title max-w-3xl">{title}</h2>
      <p className="section-copy mt-5">{description}</p>
    </div>
  );
}
