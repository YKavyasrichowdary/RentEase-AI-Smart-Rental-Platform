
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MapPin, BedDouble, Bath, Ruler, Trash2, Search, Loader2 } from "lucide-react";

import {
  DashboardShell,
  EmptyState,
  Panel,
} from "@/components/rentease/DashboardShell";

type SavedPropertyItem = {
  id: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    description: string;
    city: string;
    locality: string;
    rent: string | number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    furnishing: string;
    images: {
      id: string;
      url: string;
      sortOrder: number;
    }[];
  };
};

function formatINR(value: string | number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default function SavedPropertiesClient() {
  const router = useRouter();

  const [savedProperties, setSavedProperties] = useState<SavedPropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchSavedProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/saved-properties", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.replace("/auth/signin");
          return;
        }

        throw new Error(data.error || "Unable to load saved properties");
      }

      setSavedProperties(data.savedProperties ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading saved properties."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSavedProperties();
  }, [fetchSavedProperties]);

  async function removeSavedProperty(propertyId: string) {
    try {
      setRemovingId(propertyId);
      setError("");

      const response = await fetch(
        `/api/saved-properties/${propertyId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to remove property");
      }

      setSavedProperties((current) =>
        current.filter((item) => item.property.id !== propertyId)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove this property."
      );
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <DashboardShell
      role="Tenant"
      title="Saved Properties"
      subtitle="Your shortlisted rental homes, all in one place."
      nav={[
        { label: "Overview", href: "/dashboard/tenant" },
        { label: "Browse Properties", href: "/properties" },
        { label: "Saved Properties", href: "/dashboard/tenant/saved" },
      ]}
    >
      <Panel
        title={`Your shortlist (${savedProperties.length})`}
        description="Properties you've saved for future reference."
      >
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 size-5 animate-spin" />
            Loading your saved properties...
          </div>
        ) : error && savedProperties.length === 0 ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
            {error}
            <button
              onClick={fetchSavedProperties}
              className="ml-2 font-semibold underline"
            >
              Try again
            </button>
          </div>
        ) : savedProperties.length === 0 ? (
          <EmptyState
            title="No saved properties yet"
            body="When you find a rental home you like, save it and it will appear here."
            action={
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Search className="size-4" />
                Browse properties
              </Link>
            }
          />
        ) : (
          <>
            {error && (
              <p className="mb-4 text-sm text-destructive">{error}</p>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((item) => {
                const property = item.property;
                const image = property.images[0]?.url;

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
                  >
                    <Link href={`/properties/${property.id}`}>
                      <div className="relative aspect-[16/10] bg-surface">
                        {image ? (
                          <img
                            src={image}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No property image
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/properties/${property.id}`}
                            className="font-display text-base font-semibold hover:text-primary"
                          >
                            {property.title}
                          </Link>

                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3.5 shrink-0" />
                            {property.locality}, {property.city}
                          </p>
                        </div>

                        <Heart className="size-5 shrink-0 fill-current text-primary" />
                      </div>

                      <p className="mt-4 text-lg font-bold">
                        {formatINR(property.rent)}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          / month
                        </span>
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BedDouble className="size-3.5" />
                          {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="size-3.5" />
                          {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Ruler className="size-3.5" />
                          {property.area} sq.ft.
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSavedProperty(property.id)}
                        disabled={removingId === property.id}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {removingId === property.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                        {removingId === property.id
                          ? "Removing..."
                          : "Remove from saved"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </Panel>
    </DashboardShell>
  );
}
