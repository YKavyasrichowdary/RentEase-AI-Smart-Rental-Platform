import type { Metadata } from "next";

import TenantDashboardClient from "./TenantDashboardClient";

export const metadata: Metadata = {
  title:
    "Tenant Dashboard — saved rentals and requests | RentEase",

  description:
    "Track saved properties, recent searches, rental requests and recommended listings in your RentEase tenant workspace.",

  openGraph: {
    title: "Tenant dashboard — RentEase",
    description:
      "Saved rentals, requests and personalised recommendations.",
  },
};

export default function TenantDashboardPage() {
  return <TenantDashboardClient />;
}