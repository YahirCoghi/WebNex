"use client";

import Link from "next/link";
import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from "react";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

type LinkButtonProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type NativeButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClasses =
  "inline-flex items-center justify-center rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-[transform,background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fa6ff]/60 focus-visible:ring-offset-2";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-[#1e4fbf] bg-[linear-gradient(135deg,#2258ff_0%,#103b8d_100%)] text-white shadow-[0_18px_38px_rgba(22,58,130,0.22)] hover:-translate-y-0.5 hover:border-[#163f97] hover:shadow-[0_24px_48px_rgba(22,58,130,0.28)]",
  outline:
    "border-[#c8d6ec] bg-white/82 text-slate-950 shadow-[0_12px_32px_rgba(140,162,199,0.08)] hover:-translate-y-0.5 hover:border-[#90aff5] hover:bg-[#f4f8ff]",
  ghost: "border-transparent bg-transparent text-slate-600 hover:text-slate-950",
};

function isLinkButtonProps(props: ButtonProps): props is LinkButtonProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const {children, variant = "primary", className = ""} = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (isLinkButtonProps(props)) {
    const {href, target, rel, children: _children, variant: _variant, className: _className, ...linkProps} = props;
    const external = href.startsWith("http");
    return (
      <Link
        {...linkProps}
        className={classes}
        href={href}
        target={external ? target ?? "_blank" : target}
        rel={external ? rel ?? "noopener noreferrer" : rel}
      >
        {children}
      </Link>
    );
  }

  const {children: _children, variant: _variant, className: _className, href: _href, ...buttonProps} = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
