import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/rentease/Section";
import { getProperty, formatINR } from "@/lib/rentease-data";

import { PropertyGallery } from "@/components/rentease/property-detail/PropertyGallery";
import { PropertyInfo } from "@/components/rentease/property-detail/PropertyInfo";
import { PropertySpecs } from "@/components/rentease/property-detail/PropertySpecs";
import { PropertySection } from "@/components/rentease/property-detail/PropertySection";
import { LandlordInfo } from "@/components/rentease/property-detail/LandlordInfo";
import { PropertyLocation } from "@/components/rentease/property-detail/PropertyLocation";
import { TrustScorePanel } from "@/components/rentease/property-detail/TrustScorePanel";
import { RentAnalysis } from "@/components/rentease/property-detail/RentAnalysis";
import { PropertyActions } from "@/components/rentease/property-detail/PropertyActions";

interface PropertyDetailPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { propertyId } = await params;
  const property = getProperty(propertyId);

  if (!property) {
    return {
      title: "Listing unavailable — RentEase",
      robots: {
        index: false,
      },
    };
  }

  const title = `${property.name}, ${property.locality} — ${formatINR(
    property.rent,
  )}/month | RentEase`;

  const description = `${property.beds} BHK ${property.type.toLowerCase()} in ${
    property.locality
  }, ${property.city}. Trust Score ${
    property.trustScore
  }/100 with an AI rent estimate of ${formatINR(
    property.estimate.low,
  )}–${formatINR(property.estimate.high)}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { propertyId } = await params;

  const property = getProperty(propertyId);

  if (!property) {
    notFound();
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
        <div>
          <PropertyGallery property={property} />

          <PropertyInfo property={property} />

          <PropertySpecs property={property} />

          <PropertySection title="Description">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </PropertySection>

          <PropertySection title="Amenities">
            <ul className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium"
                >
                  <span className="text-primary">✓</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </PropertySection>

          <PropertySection title="Landlord information">
            <LandlordInfo landlord={property.landlord} />
          </PropertySection>

          <PropertySection title="Location">
            <PropertyLocation property={property} />
          </PropertySection>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TrustScorePanel property={property} />

          <RentAnalysis property={property} />

          <PropertyActions property={property} />
        </aside>
      </div>
    </Section>
  );
}