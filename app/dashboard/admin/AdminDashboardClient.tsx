"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  CheckCircle2,
  Eye,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Panel,
  StatCard,
} from "@/components/rentease/DashboardShell";

import {
  RiskChip,
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import { Disclaimer } from "@/components/rentease/Section";

import {
  PROPERTIES,
  formatINR,
  riskBand,
  type Property,
} from "@/lib/rentease-data";

type Decision =
  | "approved"
  | "rejected"
  | "verification";

export default function AdminDashboardClient() {
  const [decisions, setDecisions] =
    useState<Record<string, Decision>>(
      {},
    );

  const [open, setOpen] =
    useState<Property | null>(null);

  const pending = useMemo(
    () =>
      PROPERTIES.filter(
        (property) =>
          property.status !== "Active",
      ),
    [],
  );

  const highRisk = useMemo(
    () =>
      PROPERTIES.filter(
        (property) =>
          riskBand(
            property.trustScore,
          ) === "elevated",
      ),
    [],
  );

  const needsReview = useMemo(
    () =>
      PROPERTIES.filter(
        (property) =>
          riskBand(
            property.trustScore,
          ) !== "low",
      ),
    [],
  );

  const sortedProperties = useMemo(
    () =>
      [...PROPERTIES].sort(
        (a, b) =>
          a.trustScore - b.trustScore,
      ),
    [],
  );

  const decide = (
    property: Property,
    decision: Decision,
  ) => {
    setDecisions((current) => ({
      ...current,
      [property.id]: decision,
    }));

    setOpen(null);

    const copy: Record<
      Decision,
      string
    > = {
      approved:
        "Listing approved and published.",
      rejected:
        "Listing rejected and the landlord notified.",
      verification:
        "Verification requested from the landlord.",
    };

    toast.success(property.name, {
      description: copy[decision],
    });
  };

  return (
    <></>
  );
}

function getDecisionLabel(
  property: Property,
  decisions: Record<string, Decision>,
) {
  const decision =
    decisions[property.id];

  if (!decision) {
    return property.status;
  }

  if (decision === "approved") {
    return "Approved";
  }

  if (decision === "rejected") {
    return "Rejected";
  }

  return "Verification requested";
}