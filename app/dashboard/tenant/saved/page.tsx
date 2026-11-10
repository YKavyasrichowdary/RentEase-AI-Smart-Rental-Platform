
import type { Metadata } from "next";
import SavedPropertiesClient from "./SavedPropertiesClient";

export const metadata: Metadata = {
  title: "Saved Properties | RentEase",
  description: "View and manage your saved rental properties.",
};

export default function SavedPropertiesPage() {
  return <SavedPropertiesClient />;
}
