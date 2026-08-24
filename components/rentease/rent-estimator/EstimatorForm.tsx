"use client";

import {
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import {
  AMENITIES,
  CITIES,
  FURNISHING,
  PROPERTY_TYPES,
} from "@/lib/rentease-data";

import type {
  RentEstimatorValues,
} from "../RentEstimator";

interface EstimatorFormProps {
  values: RentEstimatorValues;
  loading: boolean;
  error: string | null;
  onChange: <
    K extends keyof RentEstimatorValues,
  >(
    key: K,
    value: RentEstimatorValues[K],
  ) => void;
  onToggleAmenity: (amenity: string) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => void;
}

export function EstimatorForm({
  values,
  loading,
  error,
  onChange,
  onToggleAmenity,
  onSubmit,
}: EstimatorFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="surface-panel p-6 sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location">
          <Select
            value={values.city}
            onValueChange={(value) =>
              onChange("city", value as string)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
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

        <Field label="Property Type">
          <Select
            value={values.type}
            onValueChange={(value) =>
              onChange("type", value as string)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
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

        <Field label="Bedrooms">
          <Select
            value={values.beds}
            onValueChange={(value) =>
              onChange("beds", value as string)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {["1", "2", "3", "4", "5"].map(
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

        <Field label="Bathrooms">
          <Select
            value={values.baths}
            onValueChange={(value) =>
              onChange("baths", value as string)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {["1", "2", "3", "4"].map(
                (number) => (
                  <SelectItem
                    key={number}
                    value={number}
                  >
                    {number}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Area (sq ft)">
          <Input
            inputMode="numeric"
            value={values.area}
            onChange={(event) =>
              onChange(
                "area",
                event.target.value.replace(
                  /[^0-9]/g,
                  "",
                ),
              )
            }
            placeholder="1250"
          />
        </Field>

        <Field label="Furnishing">
          <Select
            value={values.furnishing}
            onValueChange={(value) =>
              onChange("furnishing", value as string)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
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

        <Field
          label="Listed rent (optional)"
          className="sm:col-span-2"
        >
          <Input
            inputMode="numeric"
            value={values.listedRent}
            onChange={(event) =>
              onChange(
                "listedRent",
                event.target.value.replace(
                  /[^0-9]/g,
                  "",
                ),
              )
            }
            placeholder="18000"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Amenities
        </Label>

        <div className="mt-3 flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => {
            const active =
              values.amenities.includes(amenity);

            return (
              <label
                key={amenity}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-primary/40 bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30",
                )}
              >
                <Checkbox
                  checked={active}
                  onCheckedChange={() =>
                    onToggleAmenity(amenity)
                  }
                  className="size-3.5"
                />

                {amenity}
              </label>
            );
          })}
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Sparkles className="size-4" />
        )}

        {loading
          ? "Analysing comparable listings…"
          : "Estimate Rent"}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-2",
        className,
      )}
    >
      <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>

      {children}
    </div>
  );
}