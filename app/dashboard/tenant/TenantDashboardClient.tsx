"use client";

import Link from "next/link";

import {
  Clock,
  Heart,
  MapPin,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DashboardShell,
  EmptyState,
  Panel,
  StatCard,
} from "@/components/rentease/DashboardShell";

import { PropertyCard } from "@/components/rentease/PropertyCard";

import {
  RiskChip,
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import {
  PROPERTIES,
  formatINR,
} from "@/lib/rentease-data";

const SAVED = [
  PROPERTIES[0]!,
  PROPERTIES[1]!,
];

const RECOMMENDED = [
  PROPERTIES[2]!,
  PROPERTIES[3]!,
  PROPERTIES[5]!,
];

const SEARCHES = [
  {
    query:
      "2 BHK · Gachibowli, Hyderabad",
    filters:
      "₹18k–₹26k · Trust 80+",
    when: "Today",
  },
  {
    query:
      "3 BHK · Indiranagar, Bengaluru",
    filters:
      "₹28k–₹36k · Furnished",
    when: "Yesterday",
  },
  {
    query:
      "Studio · Powai, Mumbai",
    filters:
      "₹35k–₹45k",
    when: "3 days ago",
  },
];

const REQUESTS = [
  {
    property: "Skyline Residency",
    status: "Accepted",
    date: "12 Aug",
    tone:
      "bg-accent text-accent-foreground",
  },
  {
    property: "Urban Nest",
    status:
      "Awaiting landlord",
    date: "16 Aug",
    tone: "bg-warm-soft",
  },
];

export default function TenantDashboardClient() {
  const avgTrust = Math.round(
    SAVED.reduce(
      (sum, property) =>
        sum + property.trustScore,
      0,
    ) / SAVED.length,
  );

  return (
    <DashboardShell
      role="Tenant"
      title="Welcome back, Aarav"
      subtitle="Your saved listings, recent activity and recommendations — with trust and rent signals attached."
      nav={[
        {
          label: "Overview",
          href: "/dashboard/tenant",
        },
        {
          label: "Search",
          href: "/search",
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
          <Link href="/search">
            <Search className="size-4" />
            New search
          </Link>
        </Button>
      }
    >
      {/* ========================= */}
      {/* SUMMARY STATS */}
      {/* ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Saved properties"
          value={SAVED.length}
          hint="Across 2 cities"
        />

        <StatCard
          label="Recent searches"
          value={SEARCHES.length}
          hint="Last 7 days"
        />

        <StatCard
          label="Rental requests"
          value={REQUESTS.length}
          hint="1 accepted"
          tone="primary"
        />

        <StatCard
          label="Avg. Trust Score"
          value={`${avgTrust}/100`}
          hint="Saved listings"
        />
      </div>

      {/* ========================= */}
      {/* SAVED + TRUST SCORE */}
      {/* ========================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Saved Properties"
          description="Listings you've shortlisted."
          action={
            <Button
              
              variant="ghost"
              size="sm"
            >
              <Link href="/properties">
                Browse more
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {SAVED.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/30"
              >
                <img
                  src={typeof property.images[0] === "string" ? property.images[0] : property.images[0]?.src}
                  alt={property.name}
                  loading="lazy"
                  className="size-16 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {property.name}
                  </p>

                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {property.locality},{" "}
                    {property.city}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatINR(
                      property.rent,
                    )}
                  </p>

                  <RiskChip
                    score={
                      property.trustScore
                    }
                    className="mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel
          title="Trust Score Summary"
          description="How safe your shortlist looks."
        >
          <div className="flex flex-col items-center">
            <TrustScoreRing
              score={avgTrust}
              size={150}
            />

            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              Average across saved listings.
              Trust Score is an AI-assisted
              risk indicator and not proof of
              ownership.
            </p>
          </div>
        </Panel>
      </div>

      {/* ========================= */}
      {/* SEARCHES + REQUESTS */}
      {/* ========================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent Searches">
          <ul className="space-y-3">
            {SEARCHES.map((search) => (
              <li
                key={search.query}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {search.query}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {search.filters}
                  </p>
                </div>

                <span className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {search.when}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Rental Requests">
          {REQUESTS.length === 0 ? (
            <EmptyState
              title="No requests yet"
              body="When you request a rental, its status will appear here."
              action={
                <Button
                  
                  size="sm"
                >
                  <Link href="/properties">
                    Find a property
                  </Link>
                </Button>
              }
            />
          ) : (
            <ul className="space-y-3">
              {REQUESTS.map((request) => (
                <li
                  key={request.property}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {request.property}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Requested{" "}
                      {request.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${request.tone}`}
                  >
                    {request.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* ========================= */}
      {/* RECOMMENDATIONS */}
      {/* ========================= */}

      <Panel
        className="mt-6"
        title="For You"
        description="Recommended from your searches, weighted towards lower-risk listings."
        action={
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="size-3.5" />
            Based on 3 recent searches
          </span>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDED.map(
            (property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ),
          )}
        </div>
      </Panel>
    </DashboardShell>
  );
}