import { MapPin } from "lucide-react";

import type { Property } from "@/lib/rentease-data";

export function PropertyLocation({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-strong">
      <div className="mesh-lavender grid h-52 place-items-center">
        <div className="text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="size-5" />
          </span>

          <p className="mt-3 font-display text-sm font-semibold">
            {property.locality}, {property.city}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Approximate location shown until a rental
            request is accepted.
          </p>
        </div>
      </div>
    </div>
  );
}