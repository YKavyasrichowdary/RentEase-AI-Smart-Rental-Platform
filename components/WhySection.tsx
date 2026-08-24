"use client";

import { Reveal, Section, SectionHeading } from "@/components/rentease/Section";

const WHY = [
  {
    n: "01",
    title: "Trust-Aware Listings",
    body: "Identify potentially risky listings using multiple signals.",
  },
  {
    n: "02",
    title: "AI Rent Estimation",
    body: "Understand whether a property's asking rent is reasonable.",
  },
  {
    n: "03",
    title: "Transparent Information",
    body: "Present important property information clearly.",
  },
  {
    n: "04",
    title: "Direct Connections",
    body: "Connect tenants and landlords without unnecessary complexity.",
  },
];

export function WhySection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why RentEase"
        title="Rental intelligence, built into the journey."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY.map((item, index) => (
          <Reveal key={item.n} delay={index * 0.07}>
            <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="inline-flex rounded-lg bg-accent px-2.5 py-1 text-[0.6875rem] font-semibold tracking-widest text-accent-foreground">
                {item.n}
              </span>

              <h3 className="mt-4 font-display text-base font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
