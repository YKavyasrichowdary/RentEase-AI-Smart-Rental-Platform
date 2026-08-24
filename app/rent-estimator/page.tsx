import type { Metadata } from "next";

import {
  Reveal,
  Section,
  SectionHeading,
} from "@/components/rentease/Section";
import { RentEstimator } from "@/components/rentease/RentEstimator";

export const metadata: Metadata = {
  title:
    "AI Rent Estimator — What should this property cost? | RentEase",

  description:
    "Estimate a fair monthly rent from location, property type, size, furnishing and amenities, then compare it with the listed rent.",

  openGraph: {
    title: "AI Rent Estimator — RentEase",
    description:
      "Get a data-driven monthly rent range before you decide.",
  },
};

const FACTORS = [
  {
    title: "Locality rate",
    body: "Median per-square-foot rent observed in the selected city.",
  },
  {
    title: "Configuration",
    body: "Bedrooms, bathrooms and carpet area of the unit.",
  },
  {
    title: "Furnishing",
    body: "Unfurnished, semi-furnished or fully furnished inventory.",
  },
  {
    title: "Amenities",
    body: "Building services that measurably shift achievable rent.",
  },
];

export default function RentEstimatorPage() {
  return (
    <>
      {/* Estimator */}
      <Section className="border-b border-border pb-10">
        <SectionHeading
          eyebrow="AI rent price estimator"
          title="What should this property cost?"
          description="Get a data-driven estimate before you decide."
        />

        <div className="mt-10">
          <RentEstimator />
        </div>
      </Section>

      {/* Model Inputs */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Model inputs"
          title="What goes into an estimate."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACTORS.map((factor, index) => (
            <Reveal
              key={factor.title}
              delay={index * 0.06}
            >
              <div className="h-full rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-display text-sm font-semibold">
                  {factor.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {factor.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}