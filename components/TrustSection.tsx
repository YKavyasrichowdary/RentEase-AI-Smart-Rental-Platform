"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

import {
  Disclaimer,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/rentease/Section";
import { TrustScoreRing } from "@/components/rentease/TrustScore";
import { PROPERTIES } from "@/lib/rentease-data";

const SIGNALS = [
  "Listing completeness",
  "Price consistency",
  "Image similarity",
  "Location consistency",
  "Listing information quality",
];

export function TrustSection() {
  const property = PROPERTIES[0];

  return (
    <Section id="trust">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Listing trust assessment"
            title="Before you trust a listing, let RentEase evaluate it."
            description="RentEase does not claim to prove ownership or declare a property fraudulent. It performs AI-assisted rental listing risk assessment by combining several independent signals into one readable score."
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {SIGNALS.map((signal, index) => (
              <Reveal key={signal} delay={index * 0.05}>
                <li className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-card">
                  <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-3" />
                  </span>
                  {signal}
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6">
            <Disclaimer>
              Trust Score is an AI-assisted risk indicator. Suspicious listings
              can be flagged for further verification.
            </Disclaimer>
          </div>
        </div>

        <Reveal className="surface-panel p-7 sm:p-9">
          <div className="flex flex-col items-center text-center">
            <p className="label-eyebrow">Trust Score</p>
            <TrustScoreRing
              score={property.trustScore}
              size={196}
              className="mt-5"
            />
            <p className="mt-6 font-display text-base font-semibold">
              {property.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {property.locality}, {property.city}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {property.signals.map((signal) => (
              <div key={signal.label}>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>{signal.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {signal.score}
                  </span>
                </div>

                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${signal.score}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
