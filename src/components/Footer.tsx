import Link from "next/link";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{site.description}</p>
        </div>
        <div>
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-links">
            {site.services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link href="/services">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Visit</h2>
          <p>
            <strong>{site.businessName}</strong>
            <br />
            {site.detailedAddress}
          </p>
          <p>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p className="footer-hours">{site.hoursSummary}</p>
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
      </div>
      <div className="shell footer-bottom">
        <p>
          © {year} {site.businessName}. Pasadena, CA.
        </p>
      </div>
    </footer>
  );
}
