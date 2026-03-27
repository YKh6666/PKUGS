type ActionLinkProps = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  disabled?: boolean;
  className?: string;
};

export function ActionLink({
  label,
  href,
  variant = "ghost",
  external = false,
  disabled = false,
  className,
}: ActionLinkProps) {
  const variantClass =
    variant === "primary"
      ? "action-link-primary"
      : variant === "secondary"
        ? "action-link-secondary"
        : "action-link-ghost";

  const classes = ["action-link", variantClass, disabled ? "action-link-disabled" : "", className]
    .filter(Boolean)
    .join(" ");

  if (disabled || !href) {
    return (
      <span aria-disabled="true" className={classes}>
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
