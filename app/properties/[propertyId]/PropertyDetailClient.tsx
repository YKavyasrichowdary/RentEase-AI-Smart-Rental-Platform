"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  Info,
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

          <PropertyOverview
            property={property}
          />

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Spec
              icon={
                <BedDouble className="size-4" />
              }
              label="Bedrooms"
              value={property.beds}
            />

            <Spec
              icon={
                <Bath className="size-4" />
              }
              label="Bathrooms"
              value={property.baths}
            />

            <Spec
              icon={
                <Ruler className="size-4" />
              }
              label="Area"
              value={`${property.area} sqft`}
            />

            <Spec
              icon={
                <Sofa className="size-4" />
              }
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