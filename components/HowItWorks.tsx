"use client";

import { Reveal, Section, SectionHeading } from "@/components/rentease/Section";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Find properties matching your requirements.",
  },
  {
    n: "02",
    title: "Evaluate",
    body: "Review property information and Trust Score.",
  },
  {
    n: "03",
    title: "Compare",
    body: "Compare listed rent with AI-estimated rent.",
  },
  {
    n: "04",
    title: "Decide",
    body: "Make a more informed rental decision.",
  },
];

export function HowItWorks() {
  return (
    <Section className="border-y border-border bg-card">
      <SectionHeading
        eyebrow="How RentEase works"
        title="Four steps to a confident decision."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal key={step.n} delay={index * 0.07}>
            <div className="relative h-full rounded-2xl border border-border bg-surface p-6">
              <span className="font-display text-2xl font-semibold text-lavender">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
