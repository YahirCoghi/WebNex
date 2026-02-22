import {Hero} from "@/components/sections/Hero";
import {StatsStrip} from "@/components/sections/StatsStrip";
import {Problem} from "@/components/sections/Problem";
import {Services} from "@/components/sections/Services";
import {Why} from "@/components/sections/Why";
import {Process} from "@/components/sections/Process";
import {LeadMagnet} from "@/components/sections/LeadMagnet";
import {CtaFinal} from "@/components/sections/CtaFinal";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Problem />
      <Services />
      <Why />
      <Process />
      <LeadMagnet />
      <CtaFinal />
    </>
  );
}
