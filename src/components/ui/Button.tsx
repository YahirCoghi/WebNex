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
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border border-[#5c88f6] bg-[#5c88f6] text-white shadow-[0_18px_40px_rgba(92,136,246,0.24)] hover:-translate-y-0.5 hover:bg-[#2f68ee] hover:border-[#2f68ee]",
  outline:
    "border border-slate-300 bg-white/72 text-slate-900 hover:-translate-y-0.5 hover:border-[#8eb3ff] hover:bg-[#eef4ff]",
  ghost: "text-slate-600 hover:text-slate-900",
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
