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
  "inline-flex items-center justify-center rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fa6ff]/60 focus-visible:ring-offset-2";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-[#1e4fbf] bg-[linear-gradient(135deg,#2258ff_0%,#103b8d_100%)] text-white shadow-[0_18px_38px_rgba(22,58,130,0.22)] hover:-translate-y-0.5 hover:border-[#163f97] hover:shadow-[0_24px_48px_rgba(22,58,130,0.28)]",
  outline:
    "border-[#c8d6ec] bg-white/82 text-slate-950 shadow-[0_12px_32px_rgba(140,162,199,0.08)] hover:-translate-y-0.5 hover:border-[#90aff5] hover:bg-[#f4f8ff]",
  ghost: "border-transparent bg-transparent text-slate-600 hover:text-slate-950",
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
