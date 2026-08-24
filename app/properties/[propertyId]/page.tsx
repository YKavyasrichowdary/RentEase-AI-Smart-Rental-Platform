import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProperty, formatINR } from "@/lib/rentease-data";

import PropertyDetailClient from "@/app/properties/[propertyId]/PropertyDetailClient";

interface PropertyPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
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

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { propertyId } = await params;

  const property = getProperty(propertyId);

  if (!property) {
    notFound();
  }

  return (
    <PropertyDetailClient property={property} />
  );
}