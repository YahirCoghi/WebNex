import {ReactNode} from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({children, className = ""}: LabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#c9d7eb] bg-white/84 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3359a5] shadow-[0_10px_24px_rgba(133,160,210,0.08)] ${className}`}
    >
      {children}
    </span>
  );
}
