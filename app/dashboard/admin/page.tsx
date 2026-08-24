import type { Metadata } from "next";

import AdminDashboardClient from "@/app/dashboard/admin/AdminDashboardClient";

export const metadata: Metadata = {
  title:
    "Admin Dashboard — listing review and risk queue | RentEase",

  description:
    "Review pending rental listings, inspect risk signals, and approve, reject or request verification from the RentEase admin workspace.",

  openGraph: {
    title: "Admin dashboard — RentEase",
    description:
      "Platform overview with a listing review queue and risk signals.",
  },
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}