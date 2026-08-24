import type { Metadata } from "next";

import {
  Section,
  SectionHeading,
  Reveal,
} from "@/components/rentease/Section";

export const metadata: Metadata = {
  title:
    "About RentEase — rental discovery with trust and price intelligence",

  description:
    "RentEase is a secure rental property management system combining discovery, AI-assisted listing trust assessment and rent price intelligence.",

  openGraph: {
    title: "About RentEase",
    description:
      "Why RentEase pairs rental listings with risk and price intelligence.",
  },
};

const PILLARS = [
  {
    title: "Rental discovery",
    body: "A clean browsing and search experience across five metros, with filters that reflect how tenants actually decide.",
  },
  {
    title: "Listing trust assessment",
    body: "Multiple signals combined into an AI-assisted risk indicator, surfaced beside every listing rather than hidden away.",
  },
  {
    title: "Rent price intelligence",
    body: "A modelled rent range for each property so tenants and landlords negotiate from shared information.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-border">
        <SectionHeading
          eyebrow="About RentEase"
          title="A rental platform that shows its reasoning."
          description="RentEase is a secure rental property management system built for tenants, landlords and platform administrators. It is not simply another website to rent houses — the intelligence sits inside the rental journey, not beside it."
        />
      </Section>

      <Section className="bg-card">
        <div className="grid gap-6 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={index * 0.07}
            >
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-base font-semibold">
                  {pillar.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}