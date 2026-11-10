
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  Heart,
  Info,
  Loader2,
  MapPin,
  MessageSquare,
  Ruler,
  ShieldCheck,
  Sofa,
} from "lucide-react";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Section,
  Disclaimer,
} from "@/components/rentease/Section";

import {
  TrustScoreRing,
} from "@/components/rentease/TrustScore";

import {
  formatINR,
  priceVerdict,
  type Property,
} from "@/lib/rentease-data";

import { PropertyGallery } from "@/components/rentease/property/PropertyGallery";
import { PropertyOverview } from "@/components/rentease/property/PropertyOverview";
import {
  AmenitiesBlock,
  LandlordBlock,
  LocationBlock,
} from "@/components/rentease/property/PropertyInfoBlocks";
import { PropertySidebar } from "@/components/rentease/property/PropertySidebar";

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({
  property,
}: PropertyDetailClientProps) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(true);

  const fetchSavedStatus = useCallback(async () => {
    try {
      const userResponse = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (!userResponse.ok) {
        return;
      }

      const userData = await userResponse.json();
      const role = userData.user?.role ?? null;

      setUserRole(role);

      if (role !== "TENANT") {
        setSaved(false);
        return;
      }

      const response = await fetch("/api/saved-properties", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to check saved property status");
      }

      const data = await response.json();

      const isSaved = (data.savedProperties ?? []).some(
        (item: { property: { id: string } }) =>
          item.property.id === property.id
      );

      setSaved(isSaved);
    } catch (error) {
      console.error("Fetch saved property status error:", error);
    } finally {
      setCheckingSaved(false);
    }
  }, [property.id]);

  useEffect(() => {
    fetchSavedStatus();
  }, [fetchSavedStatus]);

  async function handleSaveToggle() {
    if (userRole !== "TENANT" || saving) return;

    const wasSaved = saved;

    try {
      setSaving(true);

      const response = await fetch(
        `/api/saved-properties/${property.id}`,
        {
          method: wasSaved ? "DELETE" : "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to update saved property"
        );
      }

      setSaved(!wasSaved);

      toast.success(
        wasSaved
          ? "Property removed from saved properties"
          : "Property saved successfully"
      );
    } catch (error) {
      console.error("Save property error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update saved property"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Section className="pt-8">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        All properties
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Main content */}
        <div>
          <PropertyGallery
            images={property.images}
            name={property.name}
          />

          {/* Save Property */}
          {userRole === "TENANT" && (
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveToggle}
                disabled={saving || checkingSaved}
                className="w-full sm:w-auto"
              >
                {saving || checkingSaved ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Heart
                    className={`mr-2 size-4 ${
                      saved ? "fill-current text-primary" : ""
                    }`}
                  />
                )}

                {checkingSaved
                  ? "Checking saved status..."
                  : saving
                    ? "Updating..."
                    : saved
                      ? "Remove from Saved Properties"
                      : "Save Property"}
              </Button>
            </div>
          )}

          <PropertyOverview
            property={property}
          />

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec
              icon={<BedDouble className="size-4" />}
              label="Bedrooms"
              value={property.beds}
            />

            <Spec
              icon={<Bath className="size-4" />}
              label="Bathrooms"
              value={property.baths}
            />

            <Spec
              icon={<Ruler className="size-4" />}
              label="Area"
              value={`${property.area} sqft`}
            />

            <Spec
              icon={<Sofa className="size-4" />}
              label="Furnishing"
              value={property.furnishing}
            />
          </div>

          <Block title="Description">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </Block>

          <AmenitiesBlock
            amenities={property.amenities}
          />

          <LandlordBlock
            landlord={property.landlord}
          />

          <LocationBlock
            locality={property.locality}
            city={property.city}
          />
        </div>

        {/* Sidebar */}
        <PropertySidebar
          property={property}
        />
      </div>
    </Section>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <span className="text-muted-foreground">
        {icon}
      </span>

      <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-base font-semibold">
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}
