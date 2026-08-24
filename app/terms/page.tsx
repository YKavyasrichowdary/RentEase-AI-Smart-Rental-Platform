import type { Metadata } from "next";

import {
  Disclaimer,
  Section,
  SectionHeading,
} from "@/components/rentease/Section";

export const metadata: Metadata = {
  title:
    "Terms of Use — RentEase rental platform",

  description:
    "Terms governing use of RentEase, including the limits of AI-assisted Trust Scores and rent estimates.",

  openGraph: {
    title: "RentEase Terms of Use",
    description:
      "Platform terms and the limits of AI-assisted scoring.",
  },
};

const SECTIONS = [
  {
    title: "Use of the platform",
    body: "RentEase connects tenants and landlords. Listings are submitted by landlords, who are responsible for the accuracy of the information they publish.",
  },
  {
    title: "Limits of Trust Score",
    body: "Trust Score is an AI-assisted risk indicator. It is not proof of ownership, legal title, tenancy eligibility, or an assertion that a listing is fraudulent. Tenants should carry out their own verification before any payment.",
  },
  {
    title: "Limits of rent estimates",
    body: "Rent estimates are indicative model outputs derived from comparable listings. They are not a valuation, an offer, or advice on what rent to accept or charge.",
  },
  {
    title: "Review decisions",
    body: "RentEase may flag, pause or remove listings that fail review, or request further verification from a landlord before a listing is published.",
  },
];

export default function TermsPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Terms"
        title="Terms of Use"
        description="Last updated August 2026."
      />

      <div className="mt-10 space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="surface-panel p-6"
          >
            <h2 className="font-display text-base font-semibold">
              {section.title}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}

        <Disclaimer>
          Payments, deposits and rental agreements are
          arranged directly between tenant and landlord.
          RentEase is not a party to the tenancy contract.
        </Disclaimer>
      </div>
    </Section>
  );
}