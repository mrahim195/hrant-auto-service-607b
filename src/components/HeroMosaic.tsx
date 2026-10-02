"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function StickyRail() {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      className="sticky-rail"
      aria-label="Quick contact"
      initial={reduce ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="sticky-rail__eyebrow">Pasadena shop</p>
      <p className="sticky-rail__phone">
        <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
      </p>
      <p className="sticky-rail__hours">{site.workdayTiming} weekdays</p>
      <ul className="sticky-rail__list">
        <li>Mon–Thu open to 5:30 PM</li>
        <li>Friday open to 5:00 PM</li>
        <li>Weekend closed</li>
      </ul>
      {site.rating && site.reviews && site.reviewsLink ? (
        <a
          className="sticky-rail__rating"
          href={site.reviewsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">★</span> {site.rating} · {site.reviews} Google
          reviews
        </a>
      ) : null}
      <div className="sticky-rail__actions">
        <motion.a
          className="btn btn-primary btn-block"
          href={`tel:${site.phoneTel}`}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          Call now
        </motion.a>
        <Link className="btn btn-ghost btn-block" href="/contact">
          Request service
        </Link>
      </div>
      <a
        className="sticky-rail__map"
        href={site.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {site.detailedAddress}
      </a>
    </motion.aside>
  );
}

export function HeroMosaic() {
  const reduce = useReducedMotion();

  return (
    <section className="hero-mosaic">
      <div className="hero-mosaic__copy">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {site.categories.join(" · ")}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
        >
          <span className="hero-brand">{site.businessName}</span>
          <span className="hero-line">Solid repairs. Clear answers.</span>
        </motion.h1>
        <motion.p
          className="lede"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          Neighborhood auto repair and brake work on East Washington Boulevard.
          Call ahead or send a service request for weekday hours.
        </motion.p>
        <motion.div
          className="actions"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            className="btn btn-primary"
            href={`tel:${site.phoneTel}`}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            Call {site.phone}
          </motion.a>
          <Link className="btn btn-ghost" href="/contact">
            Request service
          </Link>
        </motion.div>
      </div>

      <div className="hero-mosaic__frames" aria-hidden={false}>
        <motion.div
          className="frame frame--primary"
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.65 }}
        >
          <Image
            src={site.featuredImage}
            alt="Hrant Auto Service shop"
            width={960}
            height={720}
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <span className="frame-accent" aria-hidden="true" />
        </motion.div>
        <motion.div
          className="frame frame--secondary"
          initial={reduce ? false : { opacity: 0, scale: 0.9, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.34, duration: 0.6 }}
        >
          <Image
            src={site.images[0].src}
            alt={site.images[0].alt}
            width={640}
            height={480}
            sizes="(max-width: 900px) 70vw, 28vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
