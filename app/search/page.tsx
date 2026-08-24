import type { Metadata } from "next";
import { Suspense } from "react";

import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title:
    "Search Rentals — filter by rent, trust score and amenities | RentEase",

  description:
    "Search rental listings by location, rent range, property type, bedrooms, furnishing, amenities and minimum Trust Score.",

  openGraph: {
    title: "Search rentals on RentEase",
    description:
      "Filter listings by rent, configuration, amenities and listing risk.",
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchClient />
    </Suspense>
  );
}