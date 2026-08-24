"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AMENITIES,
} from "@/lib/rentease-data";

import type {
  SearchFiltersState,
} from "@/components/SearchClient";

interface AdvancedFiltersProps {
  filters: SearchFiltersState;

  onUpdateFilter: <
    K extends keyof SearchFiltersState,
  >(
    key: K,
    value: SearchFiltersState[K],
  ) => void;

  onToggleAmenity: (
    amenity: string,
  ) => void;
}

export function AdvancedFilters({
  filters,
  onUpdateFilter,
  onToggleAmenity,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-5 border-t border-border pt-5">
      {/* Trust Score */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Minimum Trust Score
          </Label>

          <span className="text-xs font-semibold tabular-nums">
            {filters.minTrust}
          </span>
        </div>

        <Slider
          value={[filters.minTrust]}
          onValueChange={(val) => {
            const num = typeof val === "number" ? val : val[0];
            if (num != null) {
              onUpdateFilter("minTrust", num);
            }
          }}
          min={0}
          max={100}
          step={5}
          className="mt-3"
        />
      </div>

      {/* Area */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Minimum area
          </Label>

          <span className="text-xs font-semibold tabular-nums">
            {filters.minArea} sqft
          </span>
        </div>

        <Slider
          value={[filters.minArea]}
          onValueChange={(val) => {
            const num = typeof val === "number" ? val : val[0];
            if (num != null) {
              onUpdateFilter("minArea", num);
            }
          }}
          min={300}
          max={2500}
          step={50}
          className="mt-3"
        />
      </div>

      {/* Amenities */}
      <div>
        <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Amenities
        </Label>

        <div className="mt-3 grid gap-2">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                checked={filters.amenities.includes(
                  amenity,
                )}
                onCheckedChange={() =>
                  onToggleAmenity(amenity)
                }
              />

              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}