"use client";

import {
  RotateCcw,
  Search as SearchIcon,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CITIES,
  FURNISHING,
  PROPERTY_TYPES,
} from "@/lib/rentease-data";

import type { SearchFiltersState } from "@/components/SearchClient";

import { AdvancedFilters } from "./AdvancedFilters";

interface SearchFiltersProps {
  filters: SearchFiltersState;
  showAdvanced: boolean;

  onToggleAdvanced: () => void;

  onUpdateFilter: <
    K extends keyof SearchFiltersState,
  >(
    key: K,
    value: SearchFiltersState[K],
  ) => void;

  onToggleAmenity: (
    amenity: string,
  ) => void;

  onReset: () => void;

  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => void;
}

export function SearchFilters({
  filters,
  showAdvanced,
  onToggleAdvanced,
  onUpdateFilter,
  onToggleAmenity,
  onReset,
  onSubmit,
}: SearchFiltersProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="surface-panel h-fit space-y-5 p-6 lg:sticky lg:top-24"
    >
      <Field label="Location">
        <Select
          value={filters.city}
          onValueChange={(value) =>
            value && onUpdateFilter("city", value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Any">
              Any city
            </SelectItem>

            {CITIES.map((city) => (
              <SelectItem
                key={city}
                value={city}
              >
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Min rent">
          <Input
            inputMode="numeric"
            placeholder="15000"
            value={filters.minRent}
            onChange={(event) =>
              onUpdateFilter(
                "minRent",
                event.target.value.replace(
                  /[^0-9]/g,
                  "",
                ),
              )
            }
          />
        </Field>

        <Field label="Max rent">
          <Input
            inputMode="numeric"
            placeholder="45000"
            value={filters.maxRent}
            onChange={(event) =>
              onUpdateFilter(
                "maxRent",
                event.target.value.replace(
                  /[^0-9]/g,
                  "",
                ),
              )
            }
          />
        </Field>
      </div>

      <Field label="Property type">
        <Select
          value={filters.type}
          onValueChange={(value) =>
            value && onUpdateFilter("type", value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Any">
              Any type
            </SelectItem>

            {PROPERTY_TYPES.map((type) => (
              <SelectItem
                key={type}
                value={type}
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Bedrooms">
          <Select
            value={filters.beds}
            onValueChange={(value) =>
              value && onUpdateFilter("beds", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Any">
                Any
              </SelectItem>

              {["1", "2", "3", "4"].map(
                (number) => (
                  <SelectItem
                    key={number}
                    value={number}
                  >
                    {number} BHK
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Furnishing">
          <Select
            value={filters.furnishing}
            onValueChange={(value) =>
              value &&
              onUpdateFilter("furnishing", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Any">
                Any
              </SelectItem>

              {FURNISHING.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Lower-risk filter */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
        <div>
          <p className="text-sm font-medium">
            Show lower-risk listings
          </p>

          <p className="text-xs text-muted-foreground">
            Trust Score 85 and above
          </p>
        </div>

        <Switch
          checked={filters.lowerRisk}
          onCheckedChange={(checked) =>
            onUpdateFilter(
              "lowerRisk",
              checked,
            )
          }
        />
      </div>

      {/* Advanced filters */}
      <button
        type="button"
        onClick={onToggleAdvanced}
        suppressHydrationWarning
        className="flex w-full items-center gap-2 text-sm font-medium text-primary"
      >
        <SlidersHorizontal className="size-4" />

        {showAdvanced
          ? "Hide advanced filters"
          : "Advanced filters"}
      </button>

      {showAdvanced ? (
        <AdvancedFilters
          filters={filters}
          onUpdateFilter={onUpdateFilter}
          onToggleAmenity={onToggleAmenity}
        />
      ) : null}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          type="submit"
          className="flex-1"
        >
          <SearchIcon className="size-4" />
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          aria-label="Reset filters"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>

      {children}
    </div>
  );
}