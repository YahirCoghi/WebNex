import {Hero} from "@/components/sections/Hero";
import {Services} from "@/components/sections/Services";
import {Showcase} from "@/components/sections/Showcase";
import {LeadMagnet} from "@/components/sections/LeadMagnet";
import {CtaFinal} from "@/components/sections/CtaFinal";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <LeadMagnet />
      <CtaFinal />
    </>
  );
}
