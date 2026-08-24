"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ImagePlus,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DashboardShell,
  Panel,
} from "@/components/rentease/DashboardShell";

import { Disclaimer } from "@/components/rentease/Section";

import { cn } from "@/lib/utils";

import {
  AMENITIES,
  CITIES,
  FURNISHING,
  PROPERTY_TYPES,
  estimateRent,
  priceVerdict,
} from "@/lib/rentease-data";

import {
  AssessmentPanel,
} from "@/components/rentease/landlord/AssessmentPanel";

import {
  FormField,
} from "@/components/rentease/landlord/FormField";

type Assessment = {
  score: number;
  signals: {
    label: string;
    score: number;
  }[];
  issues: string[];
  estimate: {
    low: number;
    high: number;
    mid: number;
  };
  listed: number;
};

type PropertyForm = {
  title: string;
  type: string;
  city: string;
  locality: string;
  rent: string;
  area: string;
  beds: string;
  baths: string;
  furnishing: string;
  description: string;
};

export default function AddPropertyClient() {
  const [form, setForm] =
    useState<PropertyForm>({
      title: "",
      type: "Apartment",
      city: "Hyderabad",
      locality: "",
      rent: "",
      area: "",
      beds: "2",
      baths: "2",
      furnishing: "Semi-furnished",
      description: "",
    });

  const [amenities, setAmenities] =
    useState<string[]>([]);

  const [images, setImages] =
    useState<string[]>([]);

  const [errors, setErrors] =
    useState<Record<string, string | undefined>>({});

  const [loading, setLoading] =
    useState(false);

  const [assessment, setAssessment] =
    useState<Assessment | null>(null);

  const set = (
    key: keyof PropertyForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  };

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const next: Record<string, string> = {};

    if (form.title.trim().length < 5) {
      next.title =
        "Give the listing a descriptive title.";
    }

    if (form.locality.trim().length < 3) {
      next.locality =
        "Add the locality or neighbourhood.";
    }

    if (
      !form.rent ||
      Number(form.rent) < 1000
    ) {
      next.rent =
        "Enter a monthly rent in rupees.";
    }

    if (
      !form.area ||
      Number(form.area) < 150
    ) {
      next.area =
        "Enter the carpet area in sq ft.";
    }

    if (
      form.description.trim().length < 40
    ) {
      next.description =
        "Write at least 40 characters so tenants know what to expect.";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setLoading(true);
    setAssessment(null);

    window.setTimeout(() => {
      const estimate = estimateRent({
        city: form.city,
        type: form.type,
        beds: Number(form.beds),
        baths: Number(form.baths),
        area: Number(form.area),
        furnishing: form.furnishing,
        amenities,
      });

      const listed = Number(form.rent);

      const verdict = priceVerdict(
        listed,
        estimate,
      );

      const completeness = Math.min(
        100,
        55 +
          images.length * 9 +
          amenities.length * 3 +
          (form.description.length > 120
            ? 12
            : 4),
      );

      const priceConsistency =
        verdict.tone === "low"
          ? 92
          : verdict.tone === "moderate"
            ? 74
            : 52;

      const imageSimilarity =
        images.length >= 3
          ? 90
          : images.length > 0
            ? 76
            : 60;

      const locationConsistency =
        form.locality.length > 4
          ? 90
          : 72;

      const infoQuality = Math.min(
        96,
        50 +
          Math.round(
            form.description.length / 6,
          ),
      );

      const signals = [
        {
          label: "Listing completeness",
          score: completeness,
        },
        {
          label: "Price consistency",
          score: priceConsistency,
        },
        {
          label: "Image similarity",
          score: imageSimilarity,
        },
        {
          label: "Location consistency",
          score: locationConsistency,
        },
        {
          label:
            "Listing information quality",
          score: infoQuality,
        },
      ];

      const score = Math.round(
        signals.reduce(
          (sum, signal) =>
            sum + signal.score,
          0,
        ) / signals.length,
      );

      const issues: string[] = [];

      if (images.length < 3) {
        issues.push(
          "Add at least three photos, including one exterior shot.",
        );
      }

      if (verdict.tone !== "low") {
        issues.push(
          `Listed rent is ${verdict.label.toLowerCase()} for this configuration.`,
        );
      }

      if (amenities.length < 3) {
        issues.push(
          "List the building amenities tenants filter by.",
        );
      }

      if (form.description.length < 140) {
        issues.push(
          "Expand the description with floor, facing and nearby landmarks.",
        );
      }

      setAssessment({
        score,
        signals,
        issues,
        estimate,
        listed,
      });

      setLoading(false);

      toast.success(
        "Listing submitted for review",
        {
          description: `Trust assessment generated — score ${score}/100.`,
        },
      );
    }, 1000);
  };

  const toggleAmenity = (
    amenity: string,
  ) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter(
            (item) => item !== amenity,
          )
        : [...current, amenity],
    );
  };

  const addImage = () => {
    setImages((current) => [
      ...current,
      `IMG ${current.length + 1}`,
    ]);
  };

  return (
    <DashboardShell
      role="Landlord"
      title="Add a property"
      subtitle="Publish a listing and RentEase generates a trust assessment and rent estimate before it goes live."
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
        <Button
          
          variant="outline"
        >
          <Link href="/dashboard/landlord">
            Back to overview
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        {/* Form */}
        <form
          onSubmit={submit}
          className="surface-panel space-y-5 p-6 sm:p-7"
        >
          <FormField
            label="Property title"
            error={errors.title}
          >
            <Input
              value={form.title}
              onChange={(event) =>
                set(
                  "title",
                  event.target.value,
                )
              }
              placeholder="Spacious 2 BHK with balcony"
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Property type">
              <Select
                value={form.type}
                onValueChange={(value) =>
                  value && set("type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {PROPERTY_TYPES.map(
                    (type) => (
                      <SelectItem
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="City">
              <Select
                value={form.city}
                onValueChange={(value) =>
                  value && set("city", value)
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
            </FormField>

            <FormField
              label="Locality"
              error={errors.locality}
            >
              <Input
                value={form.locality}
                onChange={(event) =>
                  set(
                    "locality",
                    event.target.value,
                  )
                }
                placeholder="Gachibowli"
              />
            </FormField>

            <FormField
              label="Monthly rent (₹)"
              error={errors.rent}
            >
              <Input
                inputMode="numeric"
                value={form.rent}
                onChange={(event) =>
                  set(
                    "rent",
                    event.target.value.replace(
                      /[^0-9]/g,
                      "",
                    ),
                  )
                }
                placeholder="24000"
              />
            </FormField>

            <FormField
              label="Area (sq ft)"
              error={errors.area}
            >
              <Input
                inputMode="numeric"
                value={form.area}
                onChange={(event) =>
                  set(
                    "area",
                    event.target.value.replace(
                      /[^0-9]/g,
                      "",
                    ),
                  )
                }
                placeholder="1250"
              />
            </FormField>

            <FormField label="Furnishing">
              <Select
                value={form.furnishing}
                onValueChange={(value) =>
                  value &&
                  set(
                    "furnishing",
                    value,
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {FURNISHING.map(
                    (furnishing) => (
                      <SelectItem
                        key={furnishing}
                        value={furnishing}
                      >
                        {furnishing}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Bedrooms">
              <Select
                value={form.beds}
                onValueChange={(value) =>
                  value && set("beds", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ].map((number) => (
                    <SelectItem
                      key={number}
                      value={number}
                    >
                      {number} BHK
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Bathrooms">
              <Select
                value={form.baths}
                onValueChange={(value) =>
                  value && set("baths", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                  ].map((number) => (
                    <SelectItem
                      key={number}
                      value={number}
                    >
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Amenities */}
          <FormField label="Amenities">
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => {
                const active =
                  amenities.includes(
                    amenity,
                  );

                return (
                  <label
                    key={amenity}
                    className={
                      cn(
                        "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-primary/40 bg-accent text-accent-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30",
                      )
                    }
                  >
                    <Checkbox
                      checked={active}
                      onCheckedChange={() =>
                        toggleAmenity(
                          amenity,
                        )
                      }
                      className="size-3.5"
                    />

                    {amenity}
                  </label>
                );
              })}
            </div>
          </FormField>

          {/* Description */}
          <FormField
            label="Description"
            error={errors.description}
          >
            <Textarea
              rows={5}
              value={form.description}
              onChange={(event) =>
                set(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Describe the layout, floor, facing, nearby landmarks and what is included in the rent."
            />
          </FormField>

          {/* Images */}
          <FormField label="Property images">
            <div className="flex flex-wrap items-center gap-3">
              {images.map(
                (image, index) => (
                  <span
                    key={`${image}-${index}`}
                    className="grid size-16 place-items-center rounded-lg border border-border bg-surface text-xs text-muted-foreground"
                  >
                    {image}
                  </span>
                ),
              )}

              <button
                type="button"
                onClick={addImage}
                className="grid size-16 place-items-center rounded-lg border border-dashed border-border bg-surface text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Add image"
              >
                <ImagePlus className="size-5" />
              </button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Three or more photos measurably
              improve listing completeness.
            </p>
          </FormField>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ShieldCheck className="size-4" />
            )}

            {loading
              ? "Generating trust assessment…"
              : "Submit & Generate Listing Trust Assessment"}
          </Button>
        </form>

        {/* Assessment */}
        <div className="lg:sticky lg:top-24">
          {loading ? (
            <Panel
              title="Listing Trust Assessment"
              description="Reviewing your listing…"
            >
              <div className="space-y-4">
                <div className="mx-auto size-36 animate-pulse rounded-full bg-surface-strong" />

                <div className="h-3 w-full animate-pulse rounded bg-surface-strong" />

                <div className="h-3 w-4/5 animate-pulse rounded bg-surface-strong" />

                <div className="h-20 w-full animate-pulse rounded-xl bg-surface-strong" />
              </div>
            </Panel>
          ) : assessment ? (
            <AssessmentPanel
              assessment={assessment}
            />
          ) : (
            <Panel
              title="Listing Trust Assessment"
              description="Submit the form to generate a trust assessment, risk indicators and a rent estimate."
            >
              <Disclaimer>
                RentEase assesses listing risk
                from completeness, price
                consistency, image similarity,
                location consistency and
                information quality. It does
                not verify ownership or legal
                title.
              </Disclaimer>
            </Panel>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}