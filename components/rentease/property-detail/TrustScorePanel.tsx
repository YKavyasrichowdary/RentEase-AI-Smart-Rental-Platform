import { Info } from "lucide-react";

import {
  Disclaimer,
} from "@/components/rentease/Section";

import {
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import type { Property } from "@/lib/rentease-data";

export function TrustScorePanel({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="surface-panel p-6">
      <p className="label-eyebrow">
        Trust Score
      </p>

      <div className="mt-4 flex justify-center">
        <TrustScoreRing
          score={property.trustScore}
          size={168}
        />
      </div>

      <ul className="mt-6 space-y-2.5">
        {property.signals.map((signal) => (
          <li
            key={signal.label}
            className="flex items-start justify-between gap-3 text-xs"
          >
            <span className="font-medium">
              {signal.label}
            </span>

            <span className="tabular-nums text-muted-foreground">
              {signal.score}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Disclaimer>
          <span className="inline-flex items-start gap-1.5">
            <Info className="mt-0.5 size-3.5 shrink-0" />

            Trust Score is an AI-assisted risk
            indicator. It is not proof of ownership,
            legal title or tenancy eligibility.
            Listings with elevated risk can be
            flagged for further verification.
          </span>
        </Disclaimer>
      </div>
    </div>
  );
}