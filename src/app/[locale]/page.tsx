import {Hero} from "@/components/sections/Hero";
import {Problem} from "@/components/sections/Problem";
import {Services} from "@/components/sections/Services";
import {Showcase} from "@/components/sections/Showcase";
import {StatsStrip} from "@/components/sections/StatsStrip";
import {LeadMagnet} from "@/components/sections/LeadMagnet";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Problem />
      <Services />
      <Showcase />
      <LeadMagnet />
    </>
  );
}
