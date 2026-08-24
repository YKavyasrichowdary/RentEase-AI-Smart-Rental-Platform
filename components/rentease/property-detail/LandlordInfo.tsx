import { cn } from "@/lib/utils";

import type { Property } from "@/lib/rentease-data";

type Landlord = Property["landlord"];

export function LandlordInfo({
  landlord,
}: {
  landlord: Landlord;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5">
      <div>
        <p className="font-display text-base font-semibold">
          {landlord.name}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          On RentEase since {landlord.since} ·{" "}
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
  );
}