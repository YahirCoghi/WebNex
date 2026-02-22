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
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-mid text-brand-white hover:-translate-y-0.5 hover:brightness-110 shadow-soft",
  outline:
    "border border-brand-accent/60 text-brand-white hover:bg-brand-accent/10",
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
