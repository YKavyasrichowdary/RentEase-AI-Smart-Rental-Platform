import type { Metadata } from "next";

import LandlordDashboardClient from "@/app/dashboard/landlord/LandlordDashboardClient";

export const metadata: Metadata = {
  title:
    "Landlord Dashboard — listings, requests and trust reports | RentEase",

  description:
    "Manage your rental listings, review tenant requests, and read Trust Score and rent-estimate reports for every property.",

  openGraph: {
    title: "Landlord dashboard — RentEase",
    description:
      "Listings, rental requests, trust assessments and rent estimates in one place.",
  },
};

export default function LandlordDashboardPage() {
  return <LandlordDashboardClient />;
}