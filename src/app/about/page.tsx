import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { StickyRail } from "@/components/HeroMosaic";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.businessName} — auto repair and brake shop in Pasadena, CA.`,
};

export default function AboutPage() {
  return (
    <div className="shell page-shell">
      <StickyRail />
      <div className="main-column stack-page">
        <Reveal variant="up" className="page-hero">
          <p className="eyebrow">About</p>
          <h1>{site.businessName}</h1>
          <p className="lede">{site.about}</p>
        </Reveal>

        <Reveal variant="clip">
          <Image
            src={site.images[2].src}
            alt={site.images[2].alt}
            width={1200}
            height={675}
            sizes="(max-width: 900px) 100vw, 70vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "14px",
              objectFit: "cover",
            }}
          />
        </Reveal>

        <Reveal variant="left">
          <h2>Access</h2>
          <ul className="access-list" style={{ marginTop: "0.75rem" }}>
            {site.accessibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up">
          <h2>Hours</h2>
          <table className="hours-table" style={{ marginTop: "0.75rem" }}>
            <tbody>
              {site.hours.map((h) => (
                <tr key={h.day}>
                  <th scope="row">{h.day}</th>
                  <td>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal variant="right">
          <h2>Location</h2>
          <p style={{ marginTop: "0.5rem", color: "var(--muted)" }}>
            {site.detailedAddress}
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <a className="btn btn-primary" href={`tel:${site.phoneTel}`}>
              Call {site.phone}
            </a>{" "}
            <Link className="btn btn-ghost" href="/contact">
              Request service
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
