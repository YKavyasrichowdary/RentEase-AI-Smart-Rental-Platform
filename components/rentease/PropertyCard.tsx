
"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Ruler,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatINR, type Property } from "@/lib/rentease-data";
import { TrustBadge } from "@/components/rentease/TrustScore";

interface PropertyCardProps {
  property: Property;
  index?: number;
  variant?: "default" | "wide";
  saved?: boolean;
  canSave?: boolean;
  saving?: boolean;
  onSaveToggle?: (propertyId: string) => void;
}

export function PropertyCard({
  property,
  index = 0,
  variant = "default",
  saved = false,
  canSave = false,
  saving = false,
  onSaveToggle,
}: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.07, 0.35),
      }}
      className={cn(
        "group hover-lift flex overflow-hidden rounded-2xl border border-border bg-card shadow-card",
        variant === "wide"
          ? "flex-col sm:flex-row"
          : "flex-col"
      )}
    >
      {/* Property Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-surface-strong",
          variant === "wide" ? "sm:w-64 sm:shrink-0" : ""
        )}
      >
        <Image
          src={property.images[0]}
          alt={`${property.name}, ${property.locality}`}
          loading="lazy"
          width={1200}
          height={800}
          className={cn(
            "w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
            variant === "wide"
              ? "h-44 sm:h-full"
              : "h-48"
          )}
        />

        {/* Trust Badge */}
        <div className="absolute left-3 top-3">
          <TrustBadge score={property.trustScore} />
        </div>

        {/* Save Property Button */}
        {canSave && (
          <button
            type="button"
            onClick={() => onSaveToggle?.(property.id)}
            disabled={saving}
            aria-label={
              saved
                ? "Remove from saved properties"
                : "Save property"
            }
            aria-pressed={saved}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-border/70 bg-card/95 text-muted-foreground shadow-card transition-colors hover:text-warm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  saved && "fill-warm text-warm"
                )}
              />
            )}
          </button>
        )}
      </div>

      {/* Property Information */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
          {property.type} · {property.furnishing}
        </span>

        <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
          {property.name}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {property.locality}, {property.city}
        </p>

        {/* Rent */}
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-display text-xl font-semibold text-foreground">
            {formatINR(property.rent)}
          </span>

          <span className="text-sm text-muted-foreground">
            / month
          </span>
        </div>

        {/* Property Specifications */}
        <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface px-3 py-2.5 text-sm">
          <Spec
            icon={<BedDouble className="size-3.5" />}
            value={`${property.beds} Beds`}
          />

          <Spec
            icon={<Bath className="size-3.5" />}
            value={`${property.baths} Baths`}
          />

          <Spec
            icon={<Ruler className="size-3.5" />}
            value={`${property.area} sqft`}
          />
        </dl>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3 pt-1">
          <Button size="sm" className="flex-1">
            <Link href={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>

          <span className="text-xs text-muted-foreground">
            Est. {formatINR(property.estimate.low)}–
            {formatINR(property.estimate.high)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* Property Specification */
function Spec({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {icon}

      <span className="text-xs font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}

/* Property Card Loading Skeleton */
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="h-48 animate-pulse bg-surface-strong" />

      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-surface-strong" />

        <div className="h-5 w-40 animate-pulse rounded bg-surface-strong" />

        <div className="h-4 w-28 animate-pulse rounded bg-surface-strong" />

        <div className="h-10 w-full animate-pulse rounded-xl bg-surface-strong" />
      </div>
    </div>
  );
}
