import { StickyRail, HeroMosaic } from "@/components/HeroMosaic";
import { HoursRibbon, BentoServices } from "@/components/HomeSections";
import {
  AboutBand,
  RequestBand,
  MapContactBand,
} from "@/components/ContentBands";

export default function HomePage() {
  return (
    <div className="shell page-shell">
      <StickyRail />
      <div className="main-column">
        <HeroMosaic />
        <HoursRibbon />
        <BentoServices />
        <AboutBand />
        <RequestBand />
        <MapContactBand />
      </div>
    </div>
  );
}
