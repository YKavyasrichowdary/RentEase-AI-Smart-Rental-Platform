import {
  Check,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AmenitiesBlockProps {
  amenities: string[];
}

export function AmenitiesBlock({
  amenities,
}: AmenitiesBlockProps) {
  return (
    <InfoBlock title="Amenities">
      <ul className="flex flex-wrap gap-2">
        {amenities.map((amenity) => (
          <li
            key={amenity}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium"
          >
            <Check className="size-3 text-primary" />
            {amenity}
          </li>
        ))}
      </ul>
    </InfoBlock>
  );
}

interface LandlordBlockProps {
  landlord: {
    name: string;
    since: number | string;
    responseTime: string;
    verifiedContact: boolean;
  };
}

export function LandlordBlock({
  landlord,
}: LandlordBlockProps) {
  return (
    <InfoBlock title="Landlord information">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
        <div>
          <p className="font-display text-base font-semibold">
            {landlord.name}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            On RentEase since{" "}
            {landlord.since} ·{" "}
            {landlord.responseTime}
          </p>
        </div>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            landlord.verifiedContact
              ? "bg-accent text-accent-foreground"
              : "bg-warm-soft text-foreground",
          )}
        >
          {landlord.verifiedContact
            ? "Contact verified"
            : "Contact unverified"}
        </span>
      </div>
    </InfoBlock>
  );
}

interface LocationBlockProps {
  locality: string;
  city: string;
}

export function LocationBlock({
  locality,
  city,
}: LocationBlockProps) {
  return (
    <InfoBlock title="Location">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface-strong">
        <div className="mesh-lavender grid h-52 place-items-center">
          <div className="text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="size-5" />
            </span>

            <p className="mt-3 font-display text-sm font-semibold">
              {locality}, {city}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Approximate location shown until a
              rental request is accepted.
            </p>
          </div>
        </div>
      </div>
    </InfoBlock>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-base font-semibold">
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}