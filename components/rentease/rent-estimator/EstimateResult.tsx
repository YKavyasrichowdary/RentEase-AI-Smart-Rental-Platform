"use client";

import {
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  cn,
} from "@/lib/utils";

import {
  formatINR,
  priceVerdict,
} from "@/lib/rentease-data";

import {
  Disclaimer,
} from "../Section";

import {
  useCountUp,
} from "../TrustScore";

import type {
  RentEstimateResult,
} from "../RentEstimator";

import { RangeBar } from "./RangeBar";

interface EstimateResultProps {
  result: RentEstimateResult | null;
  loading: boolean;
  listedRent: number;
}

export function EstimateResult({
  result,
  loading,
  listedRent,
}: EstimateResultProps) {
  if (loading) {
    return (
      <div className="surface-panel flex flex-col gap-4 p-6 sm:p-7">
        <div className="h-3 w-32 animate-pulse rounded bg-surface-strong" />
        <div className="h-10 w-56 animate-pulse rounded bg-surface-strong" />
        <div className="h-24 w-full animate-pulse rounded-xl bg-surface-strong" />
        <div className="h-16 w-full animate-pulse rounded-xl bg-surface-strong" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="surface-panel flex flex-col items-start justify-center gap-3 p-6 sm:p-7">
        <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Sparkles className="size-5" />
        </span>

        <h3 className="font-display text-lg font-semibold">
          No estimate yet
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Fill in the property details and
          RentEase will model an expected monthly
          rent range from comparable listings in
          that locality.
        </p>

        <Disclaimer>
          Estimates are indicative. An unusual gap
          between listed rent and the expected range
          is treated as one signal within
          listing-risk assessment — never as a
          conclusion on its own.
        </Disclaimer>
      </div>
    );
  }

  return (
    <EstimateCard
      result={result}
      listedRent={listedRent}
    />
  );
}

function EstimateCard({
  result,
  listedRent,
}: {
  result: RentEstimateResult;
  listedRent: number;
}) {
  const low = useCountUp(
    result.low,
    true,
    700,
  );

  const high = useCountUp(
    result.high,
    true,
    700,
  );

  const verdict = priceVerdict(
    listedRent || result.mid,
    result,
  );

  const below =
    listedRent > 0 &&
    listedRent < result.low;

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
      transition={{
        duration: 0.45,
      }}
      className="surface-panel p-6 sm:p-7"
    >
      <p className="label-eyebrow">
        Estimated monthly rent
      </p>

      <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-foreground sm:text-[2.25rem]">
        {formatINR(low)} – {formatINR(high)}
      </p>

      <p className="mt-1.5 text-sm text-muted-foreground">
        Expected market range
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Listed rent
          </p>

          <p className="mt-2 font-display text-xl font-semibold">
            {listedRent > 0
              ? formatINR(listedRent)
              : "—"}
          </p>
        </div>

        <div
          className={cn(
            "rounded-xl border p-4",
            verdict.tone === "low"
              ? "border-primary/25 bg-accent"
              : verdict.tone === "moderate"
                ? "border-warm/40 bg-warm-soft"
                : "border-destructive/25 bg-destructive/10",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Difference
          </p>

          <p className="mt-2 flex items-center gap-1.5 font-display text-sm font-semibold">
            {below ? (
              <TrendingDown className="size-4" />
            ) : (
              <TrendingUp className="size-4" />
            )}

            {verdict.label}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <RangeBar
          low={result.low}
          high={result.high}
          listed={listedRent}
        />
      </div>

      <div className="mt-6">
        <Disclaimer>
          A rent far outside the expected range
          can indicate an outdated listing, an
          unusual inclusion, or a listing that
          warrants further verification. RentEase
          uses it as one signal among several.
        </Disclaimer>
      </div>
    </motion.div>
  );
}