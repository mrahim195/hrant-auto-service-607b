"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type LogoProps = {
  compact?: boolean;
  href?: string;
  className?: string;
};

export function Logo({ compact = false, href = "/", className = "" }: LogoProps) {
  const reduce = useReducedMotion();

  const mark = (
    <motion.span
      className={`logo ${compact ? "logo--compact" : ""} ${className}`.trim()}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="40" height="40" role="img">
          <circle cx="24" cy="24" r="22" fill="#0B1C2C" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#C8E03A"
            strokeWidth="2"
          />
          <text
            x="24"
            y="28"
            textAnchor="middle"
            fill="#F4F6F8"
            fontFamily="Syne, sans-serif"
            fontWeight="700"
            fontSize="16"
            letterSpacing="-0.5"
          >
            HA
          </text>
        </svg>
      </span>
      {!compact ? (
        <span className="logo-word">
          <span className="logo-word__primary">Hrant</span>
          <span className="logo-word__secondary">Auto Service</span>
        </span>
      ) : null}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="logo-link" aria-label="Hrant Auto Service home">
        {mark}
      </Link>
    );
  }

  return mark;
}
