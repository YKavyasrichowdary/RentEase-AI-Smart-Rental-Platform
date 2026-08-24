"use client";

import { useMemo, useState } from "react";

import {
  Section,
  SectionHeading,
} from "@/components/rentease/Section";
import { PropertyCard } from "@/components/rentease/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  CITIES,
  PROPERTIES,
} from "@/lib/rentease-data";
import { cn } from "@/lib/utils";

const SORTS = [
  "Recommended",
  "Rent: low to high",
  "Rent: high to low",
  "Trust Score",
] as const;

type SortOption = (typeof SORTS)[number];

export default function PropertiesPage() {
  const [city, setCity] =
    useState<string>("All");

  const [sort, setSort] =
    useState<SortOption>("Recommended");

  const results = useMemo(() => {
    const list = PROPERTIES.filter(
      (property) =>
        city === "All" ||
        property.city === city,
    );

    switch (sort) {
      case "Rent: low to high":
        return [...list].sort(
          (a, b) => a.rent - b.rent,
        );

      case "Rent: high to low":
        return [...list].sort(
          (a, b) => b.rent - a.rent,
        );

      case "Trust Score":
        return [...list].sort(
          (a, b) =>
            b.trustScore - a.trustScore,
        );

      default:
        return list;
    }
  }, [city, sort]);

  return (
    <Section>
      <SectionHeading
        eyebrow="Property discovery"
        title="Properties worth looking at."
        description="Every listing carries an AI-assisted Trust Score and an expected rent range, so you can compare quality as well as price."
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {["All", ...CITIES].map(
          (cityName) => (
            <button
              key={cityName}
              type="button"
              onClick={() =>
                setCity(cityName)
              }
              suppressHydrationWarning
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                city === cityName
                  ? "border-primary/40 bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30",
              )}
            >
              {cityName}
            </button>
          ),
        )}

        {/* Sorting */}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {SORTS.map((sortOption) => (
            <button
              key={sortOption}
              type="button"
              onClick={() =>
                setSort(sortOption)
              }
              suppressHydrationWarning
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                sort === sortOption
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {sortOption}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-5 text-sm text-muted-foreground">
        {results.length}{" "}
        {results.length === 1
          ? "property"
          : "properties"}{" "}
        available
        {city !== "All"
          ? ` in ${city}`
          : ""}
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <EmptyState
          onReset={() => setCity("All")}
        />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(
            (property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ),
          )}
        </div>
      )}
    </Section>
  );
}

function EmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <h3 className="font-display text-lg font-semibold">
        No listings in this city yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        RentEase is expanding city by
        city. Try another location or
        widen your search.
      </p>

      <Button
        className="mt-6"
        onClick={onReset}
      >
        Show all cities
      </Button>
    </div>
  );
}