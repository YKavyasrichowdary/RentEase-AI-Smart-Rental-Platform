import { cn } from "@/lib/utils";

import {
  formatINR,
  priceVerdict,
  type Property,
} from "@/lib/rentease-data";

export function RentAnalysis({
  property,
}: {
  property: Property;
}) {
  const verdict = priceVerdict(
    property.rent,
    property.estimate,
  );

  return (
    <div className="surface-panel p-6">
      <p className="label-eyebrow">
        AI rent estimate
      </p>

      <p className="mt-3 font-display text-xl font-semibold">
        {formatINR(property.estimate.low)} –{" "}
        {formatINR(property.estimate.high)}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Expected market range
      </p>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
          <span className="text-muted-foreground">
            Listed rent
          </span>

          <span className="font-semibold">
            {formatINR(property.rent)}
          </span>
        </div>

        <div
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2",
            verdict.tone === "low"
              ? "bg-accent text-accent-foreground"
              : verdict.tone === "moderate"
                ? "bg-warm-soft"
                : "bg-destructive/10 text-destructive",
          )}
        >
          <span>Difference</span>

          <span className="font-semibold">
            {verdict.label}
          </span>
        </div>
      </div>
    </div>
  );
}