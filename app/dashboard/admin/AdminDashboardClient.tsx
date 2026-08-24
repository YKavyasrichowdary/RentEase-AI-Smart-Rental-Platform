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
  DashboardShell,
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
    <DashboardShell
      role="Admin"
      title="Platform review"
      subtitle="Monitor listing quality, work the risk queue, and act on listings that need verification."
      nav={[
        {
          label: "Overview",
          href: "/dashboard/admin",
        },
        {
          label: "Properties",
          href: "/properties",
        },
        {
          label: "Trust Score",
          href: "/trust-score",
        },
      ]}
    >
      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Total users"
          value="4,182"
          hint="3,410 tenants · 772 landlords"
        />

        <StatCard
          label="Active properties"
          value={PROPERTIES.length * 312}
          hint="Across 5 cities"
        />

        <StatCard
          label="Pending listings"
          value={pending.length}
          tone="warm"
        />

        <StatCard
          label="Requiring review"
          value={needsReview.length}
        />

        <StatCard
          label="High-risk listings"
          value={highRisk.length}
          tone="destructive"
        />
      </div>

      {/* Review Queue */}
      <Panel
        className="mt-6"
        title="Property review queue"
        description="Listings ordered by risk. Open a listing to inspect its contributing signals."
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Property
                </TableHead>

                <TableHead>
                  City
                </TableHead>

                <TableHead>
                  Rent
                </TableHead>

                <TableHead>
                  Trust
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedProperties.map(
                (property) => (
                  <TableRow
                    key={property.id}
                  >
                    <TableCell>
                      <span className="font-medium">
                        {property.name}
                      </span>

                      <span className="block text-xs text-muted-foreground">
                        {property.locality}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {property.city}
                    </TableCell>

                    <TableCell className="tabular-nums">
                      {formatINR(
                        property.rent,
                      )}
                    </TableCell>

                    <TableCell>
                      <RiskChip
                        score={
                          property.trustScore
                        }
                      />
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {getDecisionLabel(
                        property,
                        decisions,
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setOpen(property)
                        }
                      >
                        <Eye className="size-3.5" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-5">
          <Disclaimer>
            Risk signals support human review —
            they never auto-reject a listing. Every
            rejection or verification request is
            recorded against the reviewing admin.
          </Disclaimer>
        </div>
      </Panel>

      {/* High Risk */}
      <Panel
        className="mt-6"
        title="High-risk listings"
        description="Elevated risk needs attention first."
      >
        {highRisk.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            No high-risk listings in the
            queue right now.
          </p>
        ) : (
          <ul className="space-y-3">
            {highRisk.map((property) => (
              <li
                key={property.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-destructive/10 text-destructive">
                    <ShieldAlert className="size-4" />
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      {property.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Trust{" "}
                      {property.trustScore}
                      /100 · weakest signal:
                      price consistency
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  
                >
                  <Link
                    href={`/properties/${property.id}`}
                  >
                    Open listing
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {/* Review Dialog */}
      <Dialog
        open={!!open}
        onOpenChange={(value) => {
          if (!value) {
            setOpen(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          {open ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {open.name}
                </DialogTitle>

                <DialogDescription>
                  {open.locality},{" "}
                  {open.city} ·{" "}
                  {formatINR(open.rent)} /
                  month · {open.beds} BHK
                </DialogDescription>
              </DialogHeader>

              {/* Trust Score */}
              <div className="flex justify-center">
                <TrustScoreRing
                  score={open.trustScore}
                  size={150}
                />
              </div>

              {/* Risk Signals */}
              <ul className="space-y-2.5">
                {open.signals.map(
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

              {/* Decisions */}
              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Button
                  className="flex-1"
                  onClick={() =>
                    decide(
                      open,
                      "approved",
                    )
                  }
                >
                  <CheckCircle2 className="size-4" />
                  Approve
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    decide(
                      open,
                      "verification",
                    )
                  }
                >
                  Request verification
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 text-destructive"
                  onClick={() =>
                    decide(
                      open,
                      "rejected",
                    )
                  }
                >
                  <XCircle className="size-4" />
                  Reject
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </DashboardShell>
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