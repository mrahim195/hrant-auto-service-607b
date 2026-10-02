import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://hrant-auto-service.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.businessName} | Auto Repair & Brakes in Pasadena`,
    template: `%s · ${site.businessName}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.businessName} | Auto Repair & Brakes in Pasadena`,
    description: site.description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: site.featuredImage,
        width: 1920,
        height: 1080,
        alt: site.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.businessName,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: site.businessName,
  description: site.description,
  image: site.featuredImage,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1477 E Washington Blvd",
    addressLocality: "Pasadena",
    addressRegion: "CA",
    postalCode: "91104",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.coordinates.lat,
    longitude: site.coordinates.lng,
  },
  url: siteUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "07:30",
      closes: "17:00",
    },
  ],
  hasMap: site.mapsLink,
  ...(site.rating && site.reviews
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating,
          reviewCount: site.reviews,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <body
        style={
          {
            ["--font"]: "var(--font-manrope), system-ui, sans-serif",
            ["--display"]: "var(--font-syne), system-ui, sans-serif",
          } as CSSProperties
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
