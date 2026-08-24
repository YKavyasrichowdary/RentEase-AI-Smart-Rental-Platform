import type { StaticImageData } from "next/image";

import urbanNest from "@/assets/prop-urbannest.jpg";
import lakeview from "@/assets/prop-lakeview.jpg";
import habitat from "@/assets/prop-habitat.jpg";
import cityHyderabad from "@/assets/city-hyderabad.jpg";
import cityBengaluru from "@/assets/city-bengaluru.jpg";
import cityMumbai from "@/assets/city-mumbai.jpg";
import cityPune from "@/assets/city-pune.jpg";
import cityDelhi from "@/assets/city-delhi.jpg";
import skyline from "@/assets/prop-skyline.jpg";

export type RiskBand = "low" | "moderate" | "elevated";

export type TrustSignal = {
  label: string;
  score: number;
  note: string;
};

export type Property = {
  id: string;
  name: string;
  type: string;
  city: string;
  locality: string;
  rent: number;
  beds: number;
  baths: number;
  area: number;
  furnishing: "Unfurnished" | "Semi-furnished" | "Fully furnished";
  trustScore: number;
  images: (string | StaticImageData)[];
  amenities: string[];
  description: string;
  landlord: { name: string; since: string; verifiedContact: boolean; responseTime: string };
  estimate: { low: number; high: number };
  signals: TrustSignal[];
  status: "Active" | "Pending review" | "Needs verification";
};

export const CITIES = ["Hyderabad", "Bengaluru", "Mumbai", "Pune", "Delhi"] as const;

export const PROPERTY_TYPES = [
  "Apartment",
  "Independent House",
  "Villa",
  "Studio",
  "Builder Floor",
] as const;

export const FURNISHING = ["Unfurnished", "Semi-furnished", "Fully furnished"] as const;

export const AMENITIES = [
  "Lift",
  "Power backup",
  "Covered parking",
  "Gym",
  "Security",
  "Clubhouse",
  "Water supply 24x7",
  "Play area",
] as const;

const baseSignals = (a: number, b: number, c: number, d: number, e: number): TrustSignal[] => [
  { label: "Listing completeness", score: a, note: "All mandatory fields and media present" },
  { label: "Price consistency", score: b, note: "Rent compared with locality distribution" },
  { label: "Image similarity", score: c, note: "Photos checked against known listing images" },
  { label: "Location consistency", score: d, note: "Address, locality and pincode agree" },
  { label: "Listing information quality", score: e, note: "Description clarity and specificity" },
];

export const PROPERTIES: Property[] = [
  {
    id: "skyline-residency",
    name: "Skyline Residency",
    type: "Apartment",
    city: "Hyderabad",
    locality: "Gachibowli",
    rent: 24000,
    beds: 2,
    baths: 2,
    area: 1250,
    furnishing: "Semi-furnished",
    trustScore: 92,
    images: [skyline, urbanNest, habitat],
    amenities: ["Lift", "Power backup", "Covered parking", "Security", "Gym"],
    description:
      "A bright 2 BHK in a well-maintained gated tower, ten minutes from the financial district. Two balconies, modular kitchen and dedicated covered parking.",
    landlord: {
      name: "Ravi Prakash",
      since: "2021",
      verifiedContact: true,
      responseTime: "Usually replies within 3 hours",
    },
    estimate: { low: 22500, high: 25000 },
    signals: baseSignals(95, 93, 90, 94, 88),
    status: "Active",
  },
  {
    id: "urban-nest",
    name: "Urban Nest",
    type: "Apartment",
    city: "Bengaluru",
    locality: "Indiranagar",
    rent: 31000,
    beds: 3,
    baths: 2,
    area: 1480,
    furnishing: "Fully furnished",
    trustScore: 87,
    images: [urbanNest, habitat, skyline],
    amenities: ["Lift", "Security", "Clubhouse", "Water supply 24x7", "Covered parking"],
    description:
      "Fully furnished 3 BHK on a quiet tree-lined street. Walking distance to cafes and the metro, with a large living area and full-height windows.",
    landlord: {
      name: "Meera Iyer",
      since: "2019",
      verifiedContact: true,
      responseTime: "Usually replies within a day",
    },
    estimate: { low: 29000, high: 33500 },
    signals: baseSignals(90, 84, 88, 89, 84),
    status: "Active",
  },
  {
    id: "lakeview-heights",
    name: "Lakeview Heights",
    type: "Apartment",
    city: "Pune",
    locality: "Baner",
    rent: 22500,
    beds: 2,
    baths: 2,
    area: 1120,
    furnishing: "Semi-furnished",
    trustScore: 74,
    images: [lakeview, skyline, urbanNest],
    amenities: ["Lift", "Power backup", "Play area", "Security"],
    description:
      "Lake-facing 2 BHK with a wide balcony and good ventilation. Society has a play area and round-the-clock security.",
    landlord: {
      name: "Sandeep Kulkarni",
      since: "2023",
      verifiedContact: false,
      responseTime: "Usually replies within 2 days",
    },
    estimate: { low: 24000, high: 27500 },
    signals: baseSignals(78, 62, 80, 76, 72),
    status: "Needs verification",
  },
  {
    id: "modern-habitat",
    name: "Modern Habitat",
    type: "Studio",
    city: "Mumbai",
    locality: "Powai",
    rent: 42000,
    beds: 1,
    baths: 1,
    area: 720,
    furnishing: "Fully furnished",
    trustScore: 81,
    images: [habitat, lakeview, skyline],
    amenities: ["Lift", "Gym", "Security", "Power backup", "Clubhouse"],
    description:
      "Compact, design-forward studio in a high-rise with skyline views. Ideal for a working professional, with all fittings and appliances included.",
    landlord: {
      name: "Anita Shah",
      since: "2020",
      verifiedContact: true,
      responseTime: "Usually replies within 6 hours",
    },
    estimate: { low: 38000, high: 44000 },
    signals: baseSignals(86, 79, 84, 82, 76),
    status: "Active",
  },
  {
    id: "greenfield-court",
    name: "Greenfield Court",
    type: "Builder Floor",
    city: "Delhi",
    locality: "Saket",
    rent: 28000,
    beds: 2,
    baths: 2,
    area: 1050,
    furnishing: "Unfurnished",
    trustScore: 68,
    images: [skyline, lakeview],
    amenities: ["Covered parking", "Water supply 24x7", "Security"],
    description:
      "Independent builder floor with a private entrance and terrace access. Unfurnished, suited to a long-term family tenancy.",
    landlord: {
      name: "Harish Malhotra",
      since: "2024",
      verifiedContact: false,
      responseTime: "Response time not established",
    },
    estimate: { low: 32000, high: 37000 },
    signals: baseSignals(64, 55, 72, 70, 66),
    status: "Pending review",
  },
  {
    id: "orchid-enclave",
    name: "Orchid Enclave",
    type: "Villa",
    city: "Hyderabad",
    locality: "Kokapet",
    rent: 55000,
    beds: 4,
    baths: 4,
    area: 2400,
    furnishing: "Semi-furnished",
    trustScore: 94,
    images: [urbanNest, skyline, habitat],
    amenities: ["Covered parking", "Clubhouse", "Gym", "Security", "Play area", "Power backup"],
    description:
      "Four-bedroom villa in a gated community with a private garden, staff room and two-car parking. Managed by a resident owner.",
    landlord: {
      name: "Lakshmi Rao",
      since: "2018",
      verifiedContact: true,
      responseTime: "Usually replies within 2 hours",
    },
    estimate: { low: 52000, high: 58000 },
    signals: baseSignals(97, 95, 92, 96, 91),
    status: "Active",
  },
];

export const LOCATIONS = [
  { city: "Hyderabad", image: cityHyderabad, listings: 1840, medianRent: 24500 },
  { city: "Bengaluru", image: cityBengaluru, listings: 2310, medianRent: 31000 },
  { city: "Mumbai", image: cityMumbai, listings: 1975, medianRent: 42000 },
  { city: "Pune", image: cityPune, listings: 1420, medianRent: 22500 },
  { city: "Delhi", image: cityDelhi, listings: 1660, medianRent: 28000 },
];

export function formatINR(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

export function riskBand(score: number): RiskBand {
  if (score >= 85) return "low";
  if (score >= 70) return "moderate";
  return "elevated";
}

export const RISK_LABEL: Record<RiskBand, string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  elevated: "Elevated risk",
};

export function getProperty(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id);
}

/** Deterministic, explainable rent model used for the estimator demo. */
export type EstimatorInput = {
  city: string;
  type: string;
  beds: number;
  baths: number;
  area: number;
  furnishing: string;
  amenities: string[];
};

const CITY_RATE: Record<string, number> = {
  Hyderabad: 18,
  Bengaluru: 22,
  Mumbai: 38,
  Pune: 17,
  Delhi: 21,
};

const TYPE_FACTOR: Record<string, number> = {
  Apartment: 1,
  "Independent House": 1.05,
  Villa: 1.28,
  Studio: 0.92,
  "Builder Floor": 0.98,
};

const FURNISHING_FACTOR: Record<string, number> = {
  Unfurnished: 0.9,
  "Semi-furnished": 1,
  "Fully furnished": 1.15,
};

export function estimateRent(input: EstimatorInput): { low: number; high: number; mid: number } {
  const rate = CITY_RATE[input.city] ?? 19;
  const base = input.area * rate;
  const rooms = 1 + (input.beds - 1) * 0.06 + (input.baths - 1) * 0.03;
  const amenity = 1 + Math.min(input.amenities.length, 6) * 0.018;
  const mid =
    base * rooms * amenity * (TYPE_FACTOR[input.type] ?? 1) * (FURNISHING_FACTOR[input.furnishing] ?? 1);
  const round = (n: number) => Math.round(n / 500) * 500;
  return { low: round(mid * 0.93), high: round(mid * 1.08), mid: round(mid) };
}

export function priceVerdict(
  listed: number,
  range: { low: number; high: number },
): { label: string; tone: "low" | "moderate" | "elevated" } {
  if (listed < range.low * 0.85) return { label: "Well below expected range", tone: "elevated" };
  if (listed < range.low) return { label: "Below expected range", tone: "moderate" };
  if (listed > range.high * 1.15) return { label: "Well above expected range", tone: "elevated" };
  if (listed > range.high) return { label: "Above expected range", tone: "moderate" };
  return { label: "Within expected range", tone: "low" };
}
