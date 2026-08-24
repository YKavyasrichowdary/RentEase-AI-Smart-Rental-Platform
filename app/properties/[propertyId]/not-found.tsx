import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Section } from "@/components/rentease/Section";

export default function PropertyNotFound() {
  return (
    <Section>
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <h1 className="font-display text-xl font-semibold">
          Listing not found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          This listing may have been removed or is awaiting review.
        </p>

        <Button
          
          className="mt-6"
        >
          <Link href="/properties">
            Back to properties
          </Link>
        </Button>
      </div>
    </Section>
  );
}