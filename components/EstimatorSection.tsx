import {
  Section,
  SectionHeading,
} from "@/components/rentease/Section";
import { RentEstimator } from "@/components/rentease/RentEstimator";

export function EstimatorSection() {
  return (
    <Section className="border-y border-border bg-card">
      <SectionHeading
        eyebrow="AI rent price estimator"
        title="What should this property cost?"
        description="Get a data-driven estimate before you decide."
      />

      <div className="mt-10">
        <RentEstimator />
      </div>
    </Section>
  );
}
