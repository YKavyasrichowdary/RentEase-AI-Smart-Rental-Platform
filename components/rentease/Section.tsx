"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="label-eyebrow text-xs sm:text-sm font-bold tracking-[0.2em]">{eyebrow}</p> : null}

      <h2 className="mt-3.5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.6rem] leading-[1.14] tracking-tight">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 py-20 sm:px-10 sm:py-24 lg:px-12",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {children}
      </div>
    </section>
  );
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DisclaimerProps {
  children: ReactNode;
}

export function Disclaimer({ children }: DisclaimerProps) {
  return (
    <p className="rounded-2xl border border-border bg-surface px-5 py-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}