"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import {
  Panel,
} from "@/components/rentease/DashboardShell";

import {
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import {
  Disclaimer,
} from "@/components/rentease/Section";

import {
  formatINR,
  priceVerdict,
} from "@/lib/rentease-data";

interface Assessment {
  score: number;

  signals: {
    label: string;
    score: number;
  }[];

  issues: string[];

  estimate: {
    low: number;
    high: number;
    mid: number;
  };

  listed: number;
}

interface AssessmentPanelProps {
  assessment: Assessment;
}

export function AssessmentPanel({
  assessment,
}: AssessmentPanelProps) {
  const verdict = priceVerdict(
    assessment.listed,
    assessment.estimate,
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Panel
        title="Listing Trust Assessment"
        description="Generated from your submission."
      >
        {/* Trust Score */}
        <div className="flex justify-center">
          <TrustScoreRing
            score={assessment.score}
            size={168}
          />
        </div>

        {/* Signals */}
        <ul className="mt-6 space-y-2.5">
          {assessment.signals.map(
            (signal) => (
              <li
                key={signal.label}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">
                    {signal.label}
                  </span>

                  <span className="tabular-nums text-muted-foreground">
                    {signal.score}
                  </span>
                </div>

                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${signal.score}%`,
                    }}
                  />
                </div>
              </li>
            ),
          )}
        </ul>

        {/* Rent Estimate */}
        <div className="mt-6 rounded-xl border border-border bg-surface p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
            Rent estimate
          </p>

          <p className="mt-1.5 font-display text-lg font-semibold">
            {formatINR(
              assessment.estimate.low,
            )}{" "}
            –{" "}
            {formatINR(
              assessment.estimate.high,
            )}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            You listed{" "}
            {formatINR(
              assessment.listed,
            )}{" "}
            —{" "}
            {verdict.label.toLowerCase()}.
          </p>
        </div>

        {/* Issues */}
        {assessment.issues.length > 0 ? (
          <div className="mt-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-warm">
              <AlertTriangle className="size-3.5" />
              Needs attention
            </p>

            <ul className="mt-3 space-y-2">
              {assessment.issues.map(
                (issue) => (
                  <li
                    key={issue}
                    className="rounded-lg border border-warm/35 bg-warm-soft px-3 py-2 text-xs"
                  >
                    {issue}
                  </li>
                ),
              )}
            </ul>
          </div>
        ) : (
          <p className="mt-5 rounded-lg border border-primary/25 bg-accent px-3 py-2 text-xs">
            No outstanding issues detected
            in this listing.
          </p>
        )}

        {/* Disclaimer */}
        <div className="mt-5">
          <Disclaimer>
            Trust Score is an AI-assisted risk
            indicator, not proof of ownership.
            Listings with elevated risk are
            routed to the RentEase review queue.
          </Disclaimer>
        </div>
      </Panel>
    </motion.div>
  );
}