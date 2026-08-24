"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  RISK_LABEL,
  riskBand,
  type RiskBand,
} from "@/lib/rentease-data";

const TONE: Record<
  RiskBand,
  {
    text: string;
    ring: string;
    chip: string;
  }
> = {
  low: {
    text: "text-primary",
    ring: "var(--primary)",
    chip: "bg-accent text-accent-foreground",
  },

  moderate: {
    text: "text-warm",
    ring: "var(--warm)",
    chip: "bg-warm-soft text-foreground",
  },

  elevated: {
    text: "text-destructive",
    ring: "var(--destructive)",
    chip: "bg-destructive/10 text-destructive",
  },
};

export function useCountUp(
  target: number,
  active: boolean,
  duration = 900,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(
        (now - start) / duration,
        1,
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setValue(
        Math.round(target * easedProgress),
      );

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

interface TrustScoreRingProps {
  score: number;
  size?: number;
  className?: string;
}

export function TrustScoreRing({
  score,
  size = 168,
  className,
}: TrustScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  const band = riskBand(score);
  const tone = TONE[band];

  const value = useCountUp(
    score,
    inView,
  );

  const stroke = size / 14;
  const radius = (size - stroke) / 2;
  const circumference =
    2 * Math.PI * radius;

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-strong)"
          strokeWidth={stroke}
        />

        {/* Animated Score Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: inView
              ? circumference *
                (1 - score / 100)
              : circumference,
          }}
          transition={{
            duration: 1.1,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </svg>

      {/* Score Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-display text-3xl font-semibold tabular-nums",
            tone.text,
          )}
        >
          {value}
        </span>

        <span className="text-xs text-muted-foreground">
          / 100
        </span>

        <span
          className={cn(
            "mt-2 rounded-full px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-widest",
            tone.chip,
          )}
        >
          {RISK_LABEL[band]}
        </span>
      </div>
    </div>
  );
}

interface TrustBadgeProps {
  score: number;
  className?: string;
}

export function TrustBadge({
  score,
  className,
}: TrustBadgeProps) {
  const band = riskBand(score);
  const tone = TONE[band];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/95 px-2.5 py-1 text-xs font-semibold shadow-card backdrop-blur",
        tone.text,
        className,
      )}
    >
      <ShieldCheck className="size-3.5" />

      {score}

      <span className="font-medium text-muted-foreground">
        Trust
      </span>
    </span>
  );
}

interface RiskChipProps {
  score: number;
  className?: string;
}

export function RiskChip({
  score,
  className,
}: RiskChipProps) {
  const band = riskBand(score);

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-widest",
        TONE[band].chip,
        className,
      )}
    >
      {RISK_LABEL[band]}
    </span>
  );
}