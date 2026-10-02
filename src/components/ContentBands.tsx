"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { ServiceRequestForm } from "./ServiceRequestForm";

export function AboutBand() {
  return (
    <section className="section about-band" aria-labelledby="about-heading">
      <Reveal variant="clip" className="about-band__media">
        <Image
          src={site.images[1].src}
          alt={site.images[1].alt}
          width={800}
          height={600}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </Reveal>
      <Reveal variant="right" className="about-band__copy">
        <p className="eyebrow">On Washington Blvd</p>
        <h2 id="about-heading">A Pasadena shop for real road problems</h2>
        <p>{site.about}</p>
        <ul className="access-list">
          {site.accessibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function RequestBand() {
  return (
    <section className="section request-band" aria-labelledby="request-heading">
      <Reveal variant="up" className="request-band__intro">
        <p className="eyebrow">Service request</p>
        <h2 id="request-heading">Tell us what the car is doing</h2>
        <p className="section-intro">
          Share a few details and a callback number. This is a request, not an
          online booking confirmation.
        </p>
      </Reveal>
      <Reveal variant="scale">
        <ServiceRequestForm compact />
      </Reveal>
    </section>
  );
}

export function MapContactBand() {
  const embedSrc = `https://maps.google.com/maps?q=${site.coordinates.lat},${site.coordinates.lng}&z=15&output=embed`;

  return (
    <section className="map-contact" aria-labelledby="visit-heading">
      <Reveal variant="up" className="map-contact__info">
        <p className="eyebrow">Find the shop</p>
        <h2 id="visit-heading">Visit Hrant Auto Service</h2>
        <p>
          <strong>{site.detailedAddress}</strong>
        </p>
        <p>
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
        <p>{site.hoursSummary}</p>
        <a
          className="btn btn-ghost"
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </Reveal>
      <Reveal variant="clip" className="map-contact__frame">
        <iframe
          title="Map showing Hrant Auto Service in Pasadena"
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Reveal>
    </section>
  );
}
