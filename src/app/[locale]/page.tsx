import {Hero} from "@/components/sections/Hero";
import {Problem} from "@/components/sections/Problem";
import {Process} from "@/components/sections/Process";
import {Services} from "@/components/sections/Services";
import {Solutions} from "@/components/sections/Solutions";
import {Showcase} from "@/components/sections/Showcase";
import {LeadMagnet} from "@/components/sections/LeadMagnet";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <Solutions />
      <Process />
      <Showcase />
      <LeadMagnet />
    </>
  );
}
