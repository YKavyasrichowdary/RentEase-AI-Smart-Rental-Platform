import type { Metadata } from "next";

import {
  Section,
  SectionHeading,
} from "@/components/rentease/Section";

export const metadata: Metadata = {
  title:
    "Privacy Policy — how RentEase handles your data",

  description:
    "What data RentEase collects from tenants and landlords, how listing risk signals are computed, and how information is retained.",

  openGraph: {
    title: "RentEase Privacy Policy",
    description:
      "Data collection, risk signals and retention.",
  },
};

const SECTIONS = [
  {
    title: "Information we collect",
    body: "Account details (name, email, mobile), listing information submitted by landlords, saved searches, and interaction data used to improve recommendations.",
  },
  {
    title: "How risk signals are computed",
    body: "Trust Scores are derived from listing completeness, price consistency, image similarity, location consistency and information quality. Signals are computed from listing content, not from tenant identity documents.",
  },
  {
    title: "Sharing",
    body: "Landlord contact details are shared with a tenant only after a rental request is accepted. RentEase does not sell personal data.",
  },
  {
    title: "Retention",
    body: "Listing and assessment records are retained while a listing is active and for twelve months afterwards for audit of review decisions.",
  },
];

export default function PrivacyPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy Policy"
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
      </div>
    </Section>
  );
}