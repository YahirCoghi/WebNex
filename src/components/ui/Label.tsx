import {ReactNode} from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({children, className = ""}: LabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#cfe0ff] bg-[#eef4ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3a63d5] ${className}`}
    >
      {children}
    </span>
  );
}
