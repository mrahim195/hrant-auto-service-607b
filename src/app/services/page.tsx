import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { StickyRail } from "@/components/HeroMosaic";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: `Brake service, diagnostics, and auto repair at ${site.businessName} in Pasadena.`,
};

export default function ServicesPage() {
  return (
    <div className="shell page-shell">
      <StickyRail />
      <div className="main-column stack-page">
        <Reveal variant="up" className="page-hero">
          <p className="eyebrow">Services</p>
          <h1>Auto repair and brake work</h1>
          <p className="lede">
            Core shop services for drivers in Pasadena. Call if you are unsure
            what you need — we can help sort it out.
          </p>
        </Reveal>

        <div className="service-list">
          {site.services.map((item, i) => (
            <Reveal key={item.id} variant={i % 2 ? "right" : "left"} delay={0.04 * i}>
              <article className="service-row">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale">
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
            Prefer to talk it through? Call the shop during weekday hours or
            send a service request.
          </p>
          <a className="btn btn-primary" href={`tel:${site.phoneTel}`}>
            Call {site.phone}
          </a>{" "}
          <Link className="btn btn-ghost" href="/contact">
            Request service
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
