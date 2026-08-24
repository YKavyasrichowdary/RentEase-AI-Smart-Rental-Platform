"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  href: string;
};

interface DashboardShellProps {
  role: string;
  title: string;
  subtitle: string;
  nav: NavItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  role,
  title,
  subtitle,
  nav,
  actions,
  children,
}: DashboardShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="label-eyebrow">
            {role} workspace
          </p>

          <h1 className="mt-3 font-display text-2xl font-semibold sm:text-[1.875rem]">
            {title}
          </h1>

          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {actions}
      </div>

      <nav className="mt-8 flex gap-1 overflow-x-auto border-b border-border pb-px">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="whitespace-nowrap rounded-t-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

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
          duration: 0.4,
        }}
        className="mt-8"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?:
    | "default"
    | "primary"
    | "warm"
    | "destructive";
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-card",
        tone === "primary"
          ? "border-primary/25 bg-accent"
          : tone === "warm"
            ? "border-warm/35 bg-warm-soft"
            : tone === "destructive"
              ? "border-destructive/25 bg-destructive/10"
              : "border-border bg-card",
      )}
    >
      <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-display text-2xl font-semibold tabular-nums">
        {value}
      </p>

      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface PanelProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: PanelProps) {
  return (
    <section
      className={cn(
        "surface-panel p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold">
            {title}
          </h2>

          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {action}
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

interface EmptyStateProps {
  title: string;
  body: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  body,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
      <p className="font-display text-sm font-semibold">
        {title}
      </p>

      <p className="mx-auto mt-1.5 max-w-xs text-sm text-muted-foreground">
        {body}
      </p>

      {action ? (
        <div className="mt-5">
          {action}
        </div>
      ) : null}
    </div>
  );
}