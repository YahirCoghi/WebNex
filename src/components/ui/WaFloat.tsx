"use client";

import {Button} from "./Button";

const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

export function WaFloat() {
  const href = `https://wa.me/${waNumber}`;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        href={href}
        className="h-14 rounded-full bg-[#25D366] px-5 py-0 text-sm tracking-[0.12em] text-white shadow-[0_20px_45px_rgba(37,211,102,0.32)] animate-pulseSoft hover:brightness-110"
        aria-label="WhatsApp"
      >
        WhatsApp
      </Button>
    </div>
  );
}
