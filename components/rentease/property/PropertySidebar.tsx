"use client";

import {
  Info,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Disclaimer,
} from "@/components/rentease/Section";

import {
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import {
  formatINR,
  priceVerdict,
  type Property,
} from "@/lib/rentease-data";

import { cn } from "@/lib/utils";

interface PropertySidebarProps {
  property: Property;
}

export function PropertySidebar({
  property,
}: PropertySidebarProps) {
  const verdict = priceVerdict(
    property.rent,
    property.estimate,
  );

  const requestRental = () => {
    toast.success(
      "Rental request sent",
      {
        description: `${property.landlord.name} will be notified about ${property.name}.`,
      },
    );
  };

  const contactLandlord = () => {
    toast(
      "Message thread opened",
      {
        description:
          "Your enquiry has been shared with the landlord.",
      },
    );
  };

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Trust Score */}
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
          {property.signals.map(
            (signal) => (
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
            ),
          )}
        </ul>

        <div className="mt-5">
          <Disclaimer>
            <span className="inline-flex items-start gap-1.5">
              <Info className="mt-0.5 size-3.5 shrink-0" />

              Trust Score is an AI-assisted risk
              indicator. It is not proof of
              ownership, legal title or tenancy
              eligibility. Listings with elevated
              risk can be flagged for further
              verification.
            </span>
          </Disclaimer>
        </div>
      </div>

      {/* Rent Estimate */}
      <div className="surface-panel p-6">
        <p className="label-eyebrow">
          AI rent estimate
        </p>

        <p className="mt-3 font-display text-xl font-semibold">
          {formatINR(
            property.estimate.low,
          )}{" "}
          –{" "}
          {formatINR(
            property.estimate.high,
          )}
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
                : verdict.tone ===
                    "moderate"
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

      {/* Actions */}
      <div className="surface-panel space-y-3 p-6">
        <Button
          size="lg"
          className="w-full"
          onClick={requestRental}
        >
          <ShieldCheck className="size-4" />
          Request Rental
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={contactLandlord}
        >
          <MessageSquare className="size-4" />
          Contact Landlord
        </Button>
      </div>
    </aside>
  );
}