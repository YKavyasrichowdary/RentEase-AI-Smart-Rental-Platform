"use client";

import { motion } from "framer-motion";

import { formatINR } from "@/lib/rentease-data";

interface RangeBarProps {
  low: number;
  high: number;
  listed: number;
}

export function RangeBar({
  low,
  high,
  listed,
}: RangeBarProps) {
  const min = Math.min(
    low * 0.75,
    listed || low,
  );

  const max = Math.max(
    high * 1.25,
    listed || high,
  );

  const percentage = (value: number) =>
    ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-2.5 rounded-full bg-surface-strong">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${
              percentage(high) -
              percentage(low)
            }%`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{
            left: `${percentage(low)}%`,
          }}
          className="absolute inset-y-0 rounded-full bg-primary/70"
        />

        {listed > 0 ? (
          <span
            style={{
              left: `${percentage(listed)}%`,
            }}
            className="absolute -top-1 size-4.5 -translate-x-1/2 rounded-full border-2 border-card bg-warm shadow-card"
            aria-label="Listed rent position"
          />
        ) : null}
      </div>

      <div className="mt-2 flex justify-between text-[0.6875rem] text-muted-foreground">
        <span>
          {formatINR(Math.round(min))}
        </span>

        <span>Expected range</span>

        <span>
          {formatINR(Math.round(max))}
        </span>
      </div>
    </div>
  );
}