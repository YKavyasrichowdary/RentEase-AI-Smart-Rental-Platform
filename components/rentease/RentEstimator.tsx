"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { estimateRent } from "@/lib/rentease-data";

import { EstimatorForm } from "./rent-estimator/EstimatorForm";
import { EstimateResult } from "./rent-estimator/EstimateResult";

export type RentEstimateResult = {
  low: number;
  high: number;
  mid: number;
};

export interface RentEstimatorValues {
  city: string;
  type: string;
  beds: string;
  baths: string;
  area: string;
  furnishing: string;
  amenities: string[];
  listedRent: string;
}

export function RentEstimator({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [values, setValues] =
    useState<RentEstimatorValues>({
      city: "Hyderabad",
      type: "Apartment",
      beds: "2",
      baths: "2",
      area: "1250",
      furnishing: "Semi-furnished",
      amenities: ["Lift", "Security"],
      listedRent: "18000",
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);
  const [result, setResult] =
    useState<RentEstimateResult | null>(null);

  const updateValue = <
    K extends keyof RentEstimatorValues,
  >(
    key: K,
    value: RentEstimatorValues[K],
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setValues((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter(
            (item) => item !== amenity,
          )
        : [...current.amenities, amenity],
    }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const areaNum = Number(values.area);

    if (!areaNum || areaNum < 150) {
      setError(
        "Enter a carpet area of at least 150 sq ft.",
      );
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    window.setTimeout(() => {
      const estimated = estimateRent({
        city: values.city,
        type: values.type,
        beds: Number(values.beds),
        baths: Number(values.baths),
        area: areaNum,
        furnishing: values.furnishing,
        amenities: values.amenities,
      });

      setResult(estimated);
      setLoading(false);
    }, 850);
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        !compact &&
          "lg:grid-cols-[1.15fr_1fr] lg:gap-8",
      )}
    >
      <EstimatorForm
        values={values}
        loading={loading}
        error={error}
        onChange={updateValue}
        onToggleAmenity={toggleAmenity}
        onSubmit={submit}
      />

      <EstimateResult
        result={result}
        loading={loading}
        listedRent={
          Number(values.listedRent) || 0
        }
      />
    </div>
  );
}