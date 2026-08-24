"use client";

import { Button } from "@/components/ui/button";

import {
  PropertyCard,
  PropertyCardSkeleton,
} from "@/components/rentease/PropertyCard";

import {
  formatINR,
  type Property,
} from "@/lib/rentease-data";

interface SearchResultsProps {
  results: Property[];
  searching: boolean;
  onReset: () => void;
}

export function SearchResults({
  results,
  searching,
  onReset,
}: SearchResultsProps) {
  const minimumRent =
    results.length > 0
      ? Math.min(
          ...results.map(
            (property) => property.rent,
          ),
        )
      : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {searching
            ? "Searching listings…"
            : `${results.length} matching listings`}
        </p>

        <p className="text-xs text-muted-foreground">
          Rent range shown per month{" "}
          {minimumRent !== null
            ? `· from ${formatINR(
                minimumRent,
              )}`
            : ""}
        </p>
      </div>

      {/* Loading */}
      {searching ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map(
            (index) => (
              <PropertyCardSkeleton
                key={index}
              />
            ),
          )}
        </div>
      ) : results.length === 0 ? (
        <EmptyResults onReset={onReset} />
      ) : (
        <div className="mt-6 grid gap-6">
          {results.map(
            (property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                variant="wide"
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function EmptyResults({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <h3 className="font-display text-lg font-semibold">
        No listings match these filters
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Try widening the rent range,
        lowering the minimum Trust Score,
        or removing a few amenities.
      </p>

      <Button
        className="mt-6"
        onClick={onReset}
      >
        Clear all filters
      </Button>
    </div>
  );
}