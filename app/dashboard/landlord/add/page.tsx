import type { Metadata } from "next";

import AddPropertyClient from "@/app/dashboard/landlord/add/AddPropertyClient";

export const metadata: Metadata = {
  title:
    "Add a Property — generate a listing trust assessment | RentEase",

  description:
    "Publish a rental listing on RentEase and instantly generate a listing trust assessment with risk indicators and a rent estimate.",

  openGraph: {
    title: "Add a property — RentEase",
    description:
      "List a rental and receive a trust assessment plus rent estimate on submission.",
  },
};

export default function AddPropertyPage() {
  return <AddPropertyClient />;
}