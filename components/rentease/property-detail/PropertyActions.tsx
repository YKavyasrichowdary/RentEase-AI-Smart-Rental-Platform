"use client";

import { MessageSquare, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { Property } from "@/lib/rentease-data";

export function PropertyActions({
  property,
}: {
  property: Property;
}) {
  const handleRentalRequest = () => {
    toast.success("Rental request sent", {
      description: `${property.landlord.name} will be notified about ${property.name}.`,
    });
  };

  const handleContact = () => {
    toast("Message thread opened", {
      description:
        "Your enquiry has been shared with the landlord.",
    });
  };

  return (
    <div className="surface-panel space-y-3 p-6">
      <Button
        size="lg"
        className="w-full"
        onClick={handleRentalRequest}
      >
        <ShieldCheck className="size-4" />
        Request Rental
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={handleContact}
      >
        <MessageSquare className="size-4" />
        Contact Landlord
      </Button>
    </div>
  );
}