/**
 * Hrant Auto Service — centralized business content from LEAD_CONTEXT.
 */

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  span?: "wide" | "tall" | "normal";
};

export type SiteContent = {
  businessName: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneTel: string;
  email: string | null;
  address: string;
  detailedAddress: string;
  mapsLink: string;
  coordinates: { lat: number; lng: number };
  categories: string[];
  about: string;
  accessibility: string[];
  hours: { day: string; time: string }[];
  hoursSummary: string;
  workdayTiming: string;
  featuredImage: string;
  images: { src: string; alt: string }[];
  services: ServiceItem[];
  rating: string | null;
  reviews: string | null;
  reviewsLink: string | null;
  placeId: string;
};

const rawEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || "";
const email =
  !rawEmail || rawEmail === "[]" || !rawEmail.includes("@") ? null : rawEmail;

export const site: SiteContent = {
  businessName:
    process.env.NEXT_PUBLIC_BUSINESS_NAME?.trim() || "Hrant Auto Service",
  shortName: "Hrant",
  tagline: "Auto repair and brake service in Pasadena.",
  description:
    "Local auto repair shop and brake shop on E Washington Blvd in Pasadena. Call for diagnostics, brake work, and everyday repairs.",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || "+1 626-798-4064",
  phoneTel: "+16267984064",
  email,
  address:
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS?.trim() ||
    "1477 E Washington Blvd, Pasadena, CA 91104, United States",
  detailedAddress: "1477 E Washington Blvd, Pasadena, California, 91104",
  mapsLink:
    "https://www.google.com/maps/place/Hrant+Auto+Service/@34.1693465,-118.1201031,17z",
  coordinates: { lat: 34.1693465, lng: -118.1201031 },
  categories: ["Auto repair shop", "Brake shop"],
  about:
    "Hrant Auto Service is a neighborhood auto repair and brake shop on East Washington Boulevard in Pasadena. Bring the car in during weekday hours and talk through what you are hearing or feeling on the road.",
  accessibility: [
    "Wheelchair accessible entrance",
    "Wheelchair accessible parking lot",
  ],
  hours: [
    { day: "Monday", time: "7:30 AM – 5:30 PM" },
    { day: "Tuesday", time: "7:30 AM – 5:30 PM" },
    { day: "Wednesday", time: "7:30 AM – 5:30 PM" },
    { day: "Thursday", time: "7:30 AM – 5:30 PM" },
    { day: "Friday", time: "7:30 AM – 5:00 PM" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  hoursSummary: "Mon–Thu 7:30 AM–5:30 PM · Fri 7:30 AM–5:00 PM · Sat–Sun closed",
  workdayTiming: "7:30 AM–5:30 PM",
  featuredImage:
    "https://lh3.googleusercontent.com/grass-cs/AABkmLdiAyn0BvfNU4XjNGXi_dVuQnI2ZGxiyTyswCd2PnuKkwP8bO6xw88i5yr0oT9wuLRP7GvVDirrh8ORDCWioe4bITqzGDy71MSu0GKdyN4C1hBL0g3Azhxa4xy2aEp8tYsELUKq0t1gRYJW=w1920-h1080-k-no",
  images: [
    {
      src: "/images/shop-bay.jpg",
      alt: "Vehicle on a lift inside an auto repair bay",
    },
    {
      src: "/images/brakes-detail.jpg",
      alt: "Brake rotor and caliper on a shop workbench",
    },
    {
      src: "/images/shop-exterior.jpg",
      alt: "Exterior view of an auto repair shop bay",
    },
  ],
  services: [
    {
      id: "brakes",
      title: "Brake service",
      description:
        "Pads, rotors, fluid, and brake feel checks for everyday Pasadena driving.",
      span: "wide",
    },
    {
      id: "repair",
      title: "General auto repair",
      description:
        "Mechanical repairs when something wears out, rattles, or needs attention.",
      span: "normal",
    },
    {
      id: "diagnostics",
      title: "Diagnostics",
      description:
        "Check-engine lights and driveability concerns reviewed before parts go on.",
      span: "normal",
    },
    {
      id: "maintenance",
      title: "Maintenance",
      description:
        "Fluids, filters, and routine service so small jobs stay small.",
      span: "tall",
    },
    {
      id: "inspection",
      title: "Inspection & advice",
      description:
        "Straightforward talk about what needs work now versus what can wait.",
      span: "normal",
    },
  ],
  rating: "4.9",
  reviews: "262",
  reviewsLink:
    "https://search.google.com/local/reviews?placeid=ChIJ4fDwxjHDwoARP99zHNBszY0&q=Hrant+Auto+Service&authuser=0&hl=en",
  placeId: "ChIJ4fDwxjHDwoARP99zHNBszY0",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceOptions = [
  "Brake service",
  "General auto repair",
  "Diagnostics",
  "Maintenance",
  "Inspection & advice",
  "Other / not sure",
] as const;
