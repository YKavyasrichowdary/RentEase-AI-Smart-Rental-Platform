import { MapPin } from "lucide-react";

import type { Property } from "@/lib/rentease-data";
import { formatINR } from "@/lib/rentease-data";

export function PropertyInfo({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="mt-8">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {property.type} · {property.status}
      </span>

      <h1 className="mt-2 font-display text-2xl font-semibold sm:text-[1.75rem]">
        {property.name}
      </h1>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {property.locality}, {property.city}
      </p>

      <p className="mt-4 font-display text-2xl font-semibold">
        {formatINR(property.rent)}

        <span className="ml-1.5 text-sm font-normal text-muted-foreground">
          / month
        </span>
      </p>
    </div>
  );
}