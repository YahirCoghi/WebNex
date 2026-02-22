import {ReactNode} from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({children, className = ""}: LabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-brand-accent/35 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-light ${className}`}
    >
      {children}
    </span>
  );
}
