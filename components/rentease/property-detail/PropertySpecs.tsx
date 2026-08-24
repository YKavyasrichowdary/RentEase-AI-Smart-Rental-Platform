import {
  Bath,
  BedDouble,
  Ruler,
  Sofa,
} from "lucide-react";

import type { Property } from "@/lib/rentease-data";

export function PropertySpecs({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Spec
        icon={<BedDouble className="size-4" />}
        label="Bedrooms"
        value={property.beds}
      />

      <Spec
        icon={<Bath className="size-4" />}
        label="Bathrooms"
        value={property.baths}
      />

      <Spec
        icon={<Ruler className="size-4" />}
        label="Area"
        value={`${property.area} sqft`}
      />

      <Spec
        icon={<Sofa className="size-4" />}
        label="Furnishing"
        value={property.furnishing}
      />
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <span className="text-muted-foreground">
        {icon}
      </span>

      <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}