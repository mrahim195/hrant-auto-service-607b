import type { Metadata } from "next";
import { site } from "@/lib/site";
import { StickyRail } from "@/components/HeroMosaic";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { MapContactBand } from "@/components/ContentBands";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or request service at ${site.businessName}, ${site.detailedAddress}.`,
};

export default function ContactPage() {
  return (
    <div className="shell page-shell">
      <StickyRail />
      <div className="main-column stack-page">
        <Reveal variant="up" className="page-hero">
          <p className="eyebrow">Contact</p>
          <h1>Request service or call the shop</h1>
          <p className="lede">
            Reach us at {site.phone}. Weekday hours start at 7:30 AM. Use the
            form for a callback request — it is not a confirmed appointment.
          </p>
        </Reveal>

        <div className="contact-layout">
          <Reveal variant="left">
            <ServiceRequestForm />
          </Reveal>
          <Reveal variant="right" className="contact-aside">
            <div>
              <p className="label">Phone</p>
              <p>
                <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
              </p>
            </div>
            <div>
              <p className="label">Address</p>
              <p>{site.detailedAddress}</p>
            </div>
            <div>
              <p className="label">Hours</p>
              <ul style={{ listStyle: "none", display: "grid", gap: "0.25rem" }}>
                {site.hours.map((h) => (
                  <li key={h.day}>
                    {h.day}: {h.time}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Map</p>
              <p>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <MapContactBand />
      </div>
    </div>
  );
}
