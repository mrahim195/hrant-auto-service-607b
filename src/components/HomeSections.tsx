"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function HoursRibbon() {
  const reduce = useReducedMotion();

  return (
    <Reveal variant="left" className="hours-ribbon-wrap">
      <div className="hours-ribbon" role="region" aria-label="Shop hours">
        <p className="hours-ribbon__label">Weekday hours</p>
        <div className="hours-ribbon__track">
          {site.hours.map((h, i) => (
            <motion.div
              key={h.day}
              className={`hours-chip ${h.time === "Closed" ? "is-closed" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i }}
            >
              <span>{h.day.slice(0, 3)}</span>
              <strong>{h.time}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function BentoServices() {
  const reduce = useReducedMotion();

  return (
    <section className="section bento-section" aria-labelledby="services-heading">
      <div className="section-head">
        <Reveal variant="up">
          <p className="eyebrow">What we handle</p>
          <h2 id="services-heading">Shop services</h2>
          <p className="section-intro">
            Brake-focused work and everyday auto repair for drivers around
            Pasadena.
          </p>
        </Reveal>
      </div>
      <div className="bento-grid">
        {site.services.map((item, i) => (
          <motion.article
            key={item.id}
            className={`bento-tile bento-tile--${item.span || "normal"}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.06 * i, duration: 0.45 }}
            whileHover={reduce ? undefined : { y: -3 }}
          >
            <span className="bento-tick" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
      <Reveal variant="up" delay={0.1}>
        <Link className="text-link" href="/services">
          See all services
        </Link>
      </Reveal>
    </section>
  );
}
