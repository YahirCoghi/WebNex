"use client";

import {Button} from "./Button";

const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "50600000000";

export function WaFloat() {
  const href = `https://wa.me/${waNumber}`;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        href={href}
        className="h-14 w-14 rounded-full bg-[#25D366] p-0 text-xl text-white animate-pulseSoft hover:brightness-110"
        aria-label="WhatsApp"
      >
        WA
      </Button>
    </div>
  );
}
