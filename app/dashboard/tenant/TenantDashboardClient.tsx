
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Heart,
  MapPin,
  Search,
  Building2,
  RefreshCw,
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
  formatINR,
  type Property,
  type TrustSignal,
} from "@/lib/rentease-data";

// --------------------------------------------------
// API TYPES
// --------------------------------------------------

type TenantUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Assessment = {
  trustScore: number;
  signals: unknown;
  estimatedRentLow: number | string;
  estimatedRentMid: number | string;
  estimatedRentHigh: number | string;
  propertyUpdatedAt: string;
};

type ApiImage = {
  id: string;
  url: string;
  sortOrder: number;
};

type ApiProperty = {
  id: string;
  title: string;
  description: string;
  type: string;
  city: string;
  locality: string;
  rent: number | string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  amenities: string[];
  status: string;
  images: ApiImage[];
  owner: {
    id: string;
    name: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  latestAssessment?: Assessment | null;
  assessments?: Assessment[];
};

type SavedPropertyRecord = {
  id: string;
  createdAt: string;
  property: ApiProperty;
};

type DashboardData = {
  user: TenantUser | null;
  savedProperties: SavedPropertyRecord[];
  properties: ApiProperty[];
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function getLatestAssessment(
  property: ApiProperty,
): Assessment | null {
  const assessment =
    property.latestAssessment ??
    property.assessments?.[0] ??
    null;

  if (!assessment) return null;

  const assessmentDate = new Date(
    assessment.propertyUpdatedAt,
  ).getTime();

  const propertyDate = new Date(
    property.updatedAt,
  ).getTime();

  if (
    !Number.isFinite(assessmentDate) ||
    !Number.isFinite(propertyDate) ||
    assessmentDate !== propertyDate
  ) {
    return null;
  }

  return assessment;
}

function toCardProperty(
  property: ApiProperty,
  assessment: Assessment,
): Property {
  const signals = Array.isArray(assessment.signals)
    ? (assessment.signals as TrustSignal[])
    : [];

  const rent = Number(property.rent);

  return {
    id: property.id,
    name: property.title,
    type: property.type,
    city: property.city,
    locality: property.locality,
    rent,
    beds: property.bedrooms,
    baths: property.bathrooms,
    area: property.area,
    furnishing:
      property.furnishing as Property["furnishing"],
    trustScore: assessment.trustScore,
    images: property.images.map((image) => image.url),
    amenities: property.amenities ?? [],
    description: property.description,
    landlord: {
      name: property.owner.name,
      since: new Date(
        property.owner.createdAt,
      ).getFullYear().toString(),
      verifiedContact: false,
      responseTime: "Not established",
    },
    estimate: {
      low: Number(assessment.estimatedRentLow),
      high: Number(assessment.estimatedRentHigh),
    },
    signals,
    status: "Active",
  };
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function TenantDashboardClient() {
  const [user, setUser] = useState<TenantUser | null>(null);

  const [savedProperties, setSavedProperties] = useState<
    SavedPropertyRecord[]
  >([]);

  const [properties, setProperties] = useState<ApiProperty[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------------------------
  // FETCH REAL DASHBOARD DATA
  // -----------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const userResponse = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!userResponse.ok) {
          throw new Error("Unable to verify your account.");
        }

        const userData = await userResponse.json();

        if (!userData.user) {
          if (!cancelled) {
            setUser(null);
            setSavedProperties([]);
            setProperties([]);
            setError("Please sign in to access your tenant dashboard.");
          }
          return;
        }

        if (userData.user.role !== "TENANT") {
          throw new Error(
            "This dashboard is available only to tenant accounts.",
          );
        }

        const [savedResponse, propertiesResponse] =
          await Promise.all([
            fetch("/api/saved-properties", {
              cache: "no-store",
            }),
            fetch("/api/properties", {
              cache: "no-store",
            }),
          ]);

        if (!savedResponse.ok) {
          throw new Error("Unable to load your saved properties.");
        }

        if (!propertiesResponse.ok) {
          throw new Error("Unable to load available properties.");
        }

        const savedData = await savedResponse.json();
        const propertiesData = await propertiesResponse.json();

        if (!cancelled) {
          setUser(userData.user);
          setSavedProperties(
            savedData.savedProperties ?? [],
          );
          setProperties(
            propertiesData.properties ?? [],
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading your dashboard.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  // -----------------------------------------------
  // CURRENT TRUST ASSESSMENTS
  // -----------------------------------------------

  const assessedSavedProperties = useMemo(() => {
    return savedProperties
      .map((record) => {
        const assessment = getLatestAssessment(
          record.property,
        );

        return {
          ...record,
          assessment,
        };
      });
  }, [savedProperties]);

  const validScores = assessedSavedProperties
    .map((record) => record.assessment?.trustScore)
    .filter(
      (score): score is number =>
        typeof score === "number" &&
        Number.isFinite(score),
    );

  const averageTrustScore =
    validScores.length > 0
      ? Math.round(
          validScores.reduce(
            (sum, score) => sum + score,
            0,
          ) / validScores.length,
        )
      : null;

  // -----------------------------------------------
  // PUBLISHED PROPERTY RECOMMENDATIONS
  // -----------------------------------------------

  const availableProperties = useMemo(() => {
    return properties
      .filter((property) => {
        const assessment =
          getLatestAssessment(property);

        return (
          assessment !== null &&
          !savedProperties.some(
            (saved) =>
              saved.property.id === property.id,
          )
        );
      })
      .sort((a, b) => {
        const scoreA =
          getLatestAssessment(a)?.trustScore ?? 0;

        const scoreB =
          getLatestAssessment(b)?.trustScore ?? 0;

        return scoreB - scoreA;
      })
      .slice(0, 3);
  }, [properties, savedProperties]);

  // -----------------------------------------------
  // LOADING STATE
  // -----------------------------------------------

  if (loading) {
    return (
      <DashboardShell
        role="Tenant"
        title="Your Dashboard"
        subtitle="Loading your rental activity..."
        nav={[]}
      >
        <div className="flex min-h-64 items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <RefreshCw className="size-5 animate-spin" />
            Loading your dashboard...
          </div>
        </div>
      </DashboardShell>
    );
  }

  // -----------------------------------------------
  // ERROR / AUTHENTICATION STATE
  // -----------------------------------------------

  if (error || !user) {
    return (
      <DashboardShell
        role="Tenant"
        title="Tenant Dashboard"
        subtitle="Access your saved properties and rental information."
        nav={[]}
      >
        <EmptyState
          title="Unable to load your dashboard"
          body={
            error ||
            "Please sign in with your tenant account."
          }
          action={
            <Button size="sm">
              <Link href="/auth/signin">
                Sign in
              </Link>
            </Button>
          }
        />
      </DashboardShell>
    );
  }

  // -----------------------------------------------
  // MAIN DASHBOARD
  // -----------------------------------------------

  return (
    <DashboardShell
      role="Tenant"
      title={`Welcome back, ${user.name}`}
      subtitle="Your saved properties, rental listings and trust information."
      nav={[
        {
          label: "Overview",
          href: "/dashboard/tenant",
        },
        {
          label: "Browse Properties",
          href: "/properties",
        },
        {
          label: "Saved Properties",
          href: "/dashboard/tenant/saved",
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
      {/* SUMMARY STATS */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Saved properties"
          value={savedProperties.length}
          hint="Your shortlisted listings"
        />

        <StatCard
          label="Available properties"
          value={properties.length}
          hint="Published listings"
        />

        <StatCard
          label="Assessed saved listings"
          value={validScores.length}
          hint="With current assessments"
        />

        <StatCard
          label="Avg. Trust Score"
          value={
            averageTrustScore !== null
              ? `${averageTrustScore}/100`
              : "—"
          }
          hint="Current saved assessments"
          tone="primary"
        />
      </div>

      {/* SAVED PROPERTIES + TRUST SUMMARY */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Saved Properties"
          description="Properties you have shortlisted."
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
          {savedProperties.length === 0 ? (
            <EmptyState
              title="No saved properties yet"
              body="Browse published properties and use the heart icon to save listings here."
              action={
                <Button size="sm">
                  <Link href="/properties">
                    Browse properties
                  </Link>
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {assessedSavedProperties.map((record) => {
                const property = record.property;
                const assessment = record.assessment;

                return (
                  <Link
                    key={record.id}
                    href={`/properties/${property.id}`}
                    className="flex items-center gap-4 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/30"
                  >
                    {property.images[0]?.url ? (
                      <img
                        src={property.images[0].url}
                        alt={property.title}
                        loading="lazy"
                        className="size-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Building2 className="size-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {property.title}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {property.locality}, {property.city}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">
                        {formatINR(Number(property.rent))}
                      </p>

                      {assessment ? (
                        <RiskChip
                          score={assessment.trustScore}
                          className="mt-1"
                        />
                      ) : (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Not assessed
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Panel>

        <Panel
          title="Trust Score Summary"
          description="Current assessments of your saved properties."
        >
          <div className="flex min-h-52 flex-col items-center justify-center">
            {averageTrustScore !== null ? (
              <>
                <TrustScoreRing
                  score={averageTrustScore}
                  size={150}
                />

                <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                  Average across {validScores.length} saved
                  {validScores.length === 1
                    ? " listing"
                    : " listings"}{" "}
                  with current assessments.
                </p>
              </>
            ) : (
              <div className="text-center">
                <Building2 className="mx-auto size-9 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  No current assessments
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Trust Scores will appear when saved listings
                  have valid assessments.
                </p>
              </div>
            )}

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Trust Score is an AI-assisted risk indicator,
              not proof of property ownership.
            </p>
          </div>
        </Panel>
      </div>

      {/* ACTIVITY STATUS */}

      <div className="mt-6">
        <Panel
          title="Rental Activity"
          description="Your search history and rental request tracking."
        >
          <div className="rounded-xl border border-dashed border-border p-5 text-center">
            <Search className="mx-auto size-7 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">
              Activity tracking is not available yet
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Search history and rental request tracking
              will appear here once those features are implemented.
            </p>
          </div>
        </Panel>
      </div>

      {/* AVAILABLE PROPERTIES */}

      <Panel
        className="mt-6"
        title="Available Properties"
        description="Published listings with current Trust Score assessments."
        action={
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="size-3.5" />
            Not yet personalized
          </span>
        }
      >
        {availableProperties.length === 0 ? (
          <EmptyState
            title="No additional assessed listings"
            body="New published properties with current assessments will appear here."
            action={
              <Button size="sm">
                <Link href="/properties">
                  Browse all properties
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableProperties.map((property, index) => {
              const assessment =
                getLatestAssessment(property);

              if (!assessment) return null;

              return (
                <PropertyCard
                  key={property.id}
                  property={toCardProperty(
                    property,
                    assessment,
                  )}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </Panel>
    </DashboardShell>
  );
}
