import Link from "next/link";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: ReactNode;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonElProps = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-maroon text-cream-soft hover:bg-maroon-dark shadow-[0_8px_24px_-8px_rgba(107,30,46,0.55)]",
  secondary:
    "bg-gold text-brown hover:bg-gold-soft shadow-[0_8px_24px_-8px_rgba(201,154,61,0.5)]",
  ghost:
    "bg-transparent text-cream-soft border border-cream-soft/50 hover:bg-night-soft/10",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function Button(props: LinkProps | ButtonElProps) {
  const { children, variant = "primary", className = "", icon } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonElProps).type ?? "button"}
      onClick={(props as ButtonElProps).onClick}
      className={classes}
    >
      {children}
      {icon}
    </button>
  );
}
