"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { LogoMark } from "@/components/auth/Logo";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Trust-scored listings",
    body: "Risk signals surfaced before you commit.",
  },
  {
    icon: TrendingUp,
    title: "Fair-rent checks",
    body: "Compare asking rent with an expected range.",
  },
  {
    icon: Sparkles,
    title: "One account, three roles",
    body: "Tenant, landlord and admin workspaces.",
  },
];

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
      {/* Branding / Benefits */}
      <motion.aside
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mesh-lavender order-2 rounded-3xl border border-border bg-card p-8 shadow-card lg:order-1 lg:p-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
        >
          <LogoMark />

          <span className="font-display text-base font-semibold">
            Rent
            <span className="text-primary">
              Ease
            </span>
          </span>
        </Link>

        <h2 className="mt-8 font-display text-2xl font-semibold leading-snug">
          Rental discovery, listing trust
          assessment and rent intelligence —
          in one account.
        </h2>

        <ul className="mt-8 space-y-5">
          {POINTS.map((point) => {
            const Icon = point.icon;

            return (
              <li
                key={point.title}
                className="flex gap-3.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-card">
                  <Icon className="size-4" />
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    {point.title}
                  </p>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {point.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.aside>

      {/* Auth Form */}
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
        className="surface-panel order-1 p-7 sm:p-9 lg:order-2"
      >
        <h1 className="font-display text-2xl font-semibold">
          {title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>

        <div className="mt-7">
          {children}
        </div>

        <div className="mt-7 border-t border-border pt-5 text-sm text-muted-foreground">
          {footer}
        </div>
      </motion.div>
    </div>
  );
}

type Role = "tenant" | "landlord";

interface RoleToggleProps {
  value: Role;
  onChange: (value: Role) => void;
}

const ROLES: {
  key: Role;
  label: string;
  body: string;
}[] = [
  {
    key: "tenant",
    label: "I'm a Tenant",
    body: "Search, save and request rentals.",
  },
  {
    key: "landlord",
    label: "I'm a Landlord",
    body: "List properties and review requests.",
  },
];

export function RoleToggle({
  value,
  onChange,
}: RoleToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ROLES.map((role) => {
        const selected = value === role.key;

        return (
          <button
            key={role.key}
            type="button"
            onClick={() => onChange(role.key)}
            aria-pressed={selected}
            className={
              "rounded-xl border p-4 text-left transition-colors " +
              (selected
                ? "border-primary bg-accent"
                : "border-border bg-card hover:border-primary/40")
            }
          >
            <p className="text-sm font-semibold">
              {role.label}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {role.body}
            </p>
          </button>
        );
      })}
    </div>
  );
}