import {Hero} from "@/components/sections/Hero";
import {Problem} from "@/components/sections/Problem";
import {Services} from "@/components/sections/Services";
import {Showcase} from "@/components/sections/Showcase";
import {LeadMagnet} from "@/components/sections/LeadMagnet";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <Showcase />
      <LeadMagnet />
    </>
  );
}
