import type { Metadata } from "next";

import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title:
    "Contact RentEase — support for tenants and landlords",

  description:
    "Reach the RentEase team about listings, trust assessments, rent estimates or account support.",

  openGraph: {
    title: "Contact RentEase",
    description:
      "Support for tenants, landlords and reviewers.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}