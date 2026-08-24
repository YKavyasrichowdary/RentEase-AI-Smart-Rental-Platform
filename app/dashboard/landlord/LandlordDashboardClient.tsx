"use client";

import Link from "next/link";

import {
  Bell,
  Plus,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  DashboardShell,
  Panel,
  StatCard,
} from "@/components/rentease/DashboardShell";

import {
  RiskChip,
} from "@/components/rentease/TrustScore";

import {
  PROPERTIES,
  formatINR,
  priceVerdict,
} from "@/lib/rentease-data";

const MINE = [
  PROPERTIES[0]!,
  PROPERTIES[1]!,
  PROPERTIES[4]!,
];

const REQUESTS = [
  {
    tenant: "Aarav Sharma",
    property: "Skyline Residency",
    when: "16 Aug",
    status: "New",
  },
  {
    tenant: "Neha Verma",
    property: "Urban Nest",
    when: "14 Aug",
    status: "Visit scheduled",
  },
  {
    tenant: "Imran Qureshi",
    property: "Skyline Residency",
    when: "11 Aug",
    status: "Declined",
  },
];

const NOTIFICATIONS = [
  {
    title: "Trust assessment updated",
    body: "Greenfield Court dropped to 68 — price consistency fell.",
  },
  {
    title: "New rental request",
    body: "Aarav Sharma requested Skyline Residency.",
  },
  {
    title: "Rent estimate refreshed",
    body: "Urban Nest range moved to ₹29,000–₹33,500.",
  },
];

export default function LandlordDashboardClient() {
  const monthly = MINE.reduce(
    (sum, property) =>
      sum + property.rent,
    0,
  );

  const averageTrustScore =
    Math.round(
      MINE.reduce(
        (sum, property) =>
          sum + property.trustScore,
        0,
      ) / MINE.length,
    );

  return (
    <DashboardShell
      role="Landlord"
      title="Your portfolio at a glance"
      subtitle="Listings, tenant requests and the intelligence RentEase generates for each property."
      nav={[
        {
          label: "Overview",
          href: "/dashboard/landlord",
        },
        {
          label: "Add Property",
          href: "/dashboard/landlord/add",
        },
        {
          label: "Properties",
          href: "/properties",
        },
        {
          label: "Rent Estimator",
          href: "/rent-estimator",
        },
      ]}
      actions={
        <Button >
          <Link href="/dashboard/landlord/add">
            <Plus className="size-4" />
            Add Property
          </Link>
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="My properties"
          value={MINE.length}
          hint="2 active, 1 pending"
        />

        <StatCard
          label="Monthly rent listed"
          value={formatINR(monthly)}
          tone="primary"
        />

        <StatCard
          label="Open requests"
          value={2}
          hint="1 new today"
          tone="warm"
        />

        <StatCard
          label="Avg. Trust Score"
          value={averageTrustScore}
        />
      </div>

      {/* Dashboard Tabs */}
      <Tabs
        defaultValue="properties"
        className="mt-8"
      >
        <TabsList className="flex-wrap">
          <TabsTrigger value="properties">
            My Properties
          </TabsTrigger>

          <TabsTrigger value="requests">
            Rental Requests
          </TabsTrigger>

          <TabsTrigger value="trust">
            Trust Scores
          </TabsTrigger>

          <TabsTrigger value="estimates">
            AI Rent Estimates
          </TabsTrigger>

          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>

          <TabsTrigger value="profile">
            Profile
          </TabsTrigger>
        </TabsList>

        {/* ==================== */}
        {/* MY PROPERTIES */}
        {/* ==================== */}
        <TabsContent
          value="properties"
          className="mt-6"
        >
          <Panel
            title="My Properties"
            description="Everything you have listed on RentEase."
          >
            <div className="space-y-3">
              {MINE.map((property) => (
                <div
                  key={property.id}
                  className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-3"
                >
                  <img
                    src={typeof property.images[0] === "string" ? property.images[0] : property.images[0]?.src}
                    alt={property.name}
                    loading="lazy"
                    className="size-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      {property.name}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {property.locality},{" "}
                      {property.city} ·{" "}
                      {property.beds} BHK ·{" "}
                      {property.area} sqft
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatINR(
                        property.rent,
                      )}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {property.status}
                    </p>
                  </div>

                  <RiskChip
                    score={
                      property.trustScore
                    }
                  />

                  <Button
                    
                    size="sm"
                    variant="outline"
                  >
                    <Link
                      href={`/properties/${property.id}`}
                    >
                      View
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        {/* ==================== */}
        {/* RENTAL REQUESTS */}
        {/* ==================== */}
        <TabsContent
          value="requests"
          className="mt-6"
        >
          <Panel
            title="Rental Requests"
            description="Tenant enquiries awaiting your response."
          >
            <ul className="space-y-3">
              {REQUESTS.map((request) => (
                <li
                  key={`${request.tenant}-${request.property}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {request.tenant}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {request.property} ·{" "}
                      {request.when}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {request.status}
                    </span>

                    <Button
                      size="sm"
                      variant="outline"
                    >
                      Respond
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </TabsContent>

        {/* ==================== */}
        {/* TRUST SCORES */}
        {/* ==================== */}
        <TabsContent
          value="trust"
          className="mt-6"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINE.map((property) => (
              <Panel
                key={property.id}
                title={property.name}
                description={`Trust Score ${property.trustScore}/100`}
              >
                <ul className="space-y-2.5">
                  {property.signals.map(
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

                        <div className="mt-1.5 h-1.5 rounded-full bg-surface-strong">
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

                <p className="mt-4 text-xs text-muted-foreground">
                  AI-assisted risk indicator.
                  Improve the weakest signals
                  to raise the score.
                </p>
              </Panel>
            ))}
          </div>
        </TabsContent>

        {/* ==================== */}
        {/* RENT ESTIMATES */}
        {/* ==================== */}
        <TabsContent
          value="estimates"
          className="mt-6"
        >
          <Panel
            title="AI Rent Estimates"
            description="Listed rent compared with the modelled range."
          >
            <div className="space-y-3">
              {MINE.map((property) => {
                const verdict =
                  priceVerdict(
                    property.rent,
                    property.estimate,
                  );

                return (
                  <div
                    key={property.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {property.name}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Expected{" "}
                        {formatINR(
                          property.estimate
                            .low,
                        )}{" "}
                        –{" "}
                        {formatINR(
                          property.estimate
                            .high,
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {formatINR(
                          property.rent,
                        )}{" "}
                        listed
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {verdict.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </TabsContent>

        {/* ==================== */}
        {/* NOTIFICATIONS */}
        {/* ==================== */}
        <TabsContent
          value="notifications"
          className="mt-6"
        >
          <Panel title="Notifications">
            <ul className="space-y-3">
              {NOTIFICATIONS.map(
                (notification) => (
                  <li
                    key={notification.title}
                    className="flex gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Bell className="size-4" />
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {notification.body}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ul>
          </Panel>
        </TabsContent>

        {/* ==================== */}
        {/* PROFILE */}
        {/* ==================== */}
        <TabsContent
          value="profile"
          className="mt-6"
        >
          <Panel
            title="Profile"
            description="Details shown to tenants on your listings."
          >
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-5">
              <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <User className="size-5" />
              </span>

              <div className="flex-1">
                <p className="font-display text-base font-semibold">
                  Ravi Prakash
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Landlord since 2021 · Contact
                  verified · Usually replies
                  within 3 hours
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
              >
                Edit profile
              </Button>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}