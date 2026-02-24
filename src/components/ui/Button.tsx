"use client";

import Link from "next/link";
import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border border-white/50 bg-white/10 text-brand-white backdrop-blur hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black",
  outline:
    "border border-white/35 text-brand-white hover:border-white hover:bg-white/10",
  ghost: "text-brand-light hover:text-brand-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
