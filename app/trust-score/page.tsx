import type { Metadata } from "next";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import {
  Section,
  SectionHeading,
  Reveal,
  Disclaimer,
} from "@/components/rentease/Section";

import {
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import {
  PROPERTIES,
} from "@/lib/rentease-data";

export const metadata: Metadata = {
  title:
    "Listing Trust Score — AI-assisted risk assessment | RentEase",

  description:
    "How RentEase builds a listing Trust Score from completeness, price consistency, image similarity, location consistency and information quality.",

  openGraph: {
    title:
      "Listing Trust Score — RentEase",

    description:
      "An AI-assisted risk indicator for rental listings, explained signal by signal.",
  },
};

export default function TrustScorePage() {
  const property = PROPERTIES[0]!;

  return (
    <>
      {/* Hero */}
      <Section className="border-b border-border">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Listing trust assessment"
              title="Before you trust a listing, let RentEase evaluate it."
              description="RentEase does not claim to automatically prove ownership or declare a property fraudulent. It performs AI-assisted rental listing risk assessment using multiple independent signals, then surfaces the result as a single readable score."
            />

            <div className="mt-6">
              <Disclaimer>
                Trust Score is an AI-assisted risk
                indicator. Suspicious listings can
                be flagged for further verification
                by the RentEase review team.
              </Disclaimer>
            </div>
          </div>

          <Reveal className="surface-panel flex flex-col items-center p-9 text-center">
            <p className="label-eyebrow">
              Trust Score
            </p>

            <TrustScoreRing
              score={property.trustScore}
              size={210}
              className="mt-6"
            />
          </Reveal>
        </div>
      </Section>

      {/* Signals */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Contributing signals"
          title="Five signals, one score."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {property.signals.map(
            (signal, index) => (
              <Reveal
                key={signal.label}
                delay={index * 0.06}
              >
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
                      <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Check className="size-3" />
                      </span>

                      {signal.label}
                    </h3>

                    <span className="font-display text-sm font-semibold tabular-nums text-primary">
                      {signal.score}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {signal.note}
                  </p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: `${signal.score}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </Section>
    </>
  );
}