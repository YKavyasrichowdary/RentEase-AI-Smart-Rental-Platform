"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal, Section } from "@/components/rentease/Section";

export function ClosingCta() {
  return (
    <Section>
      <Reveal className="mesh-lavender overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-14">
        <p className="label-eyebrow">
          Rental discovery + trust assessment + rent intelligence
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold sm:text-[2rem]">
          Rent with information, not guesswork.
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            <Link href="/signup">Create your account</Link>
          </Button>

          <Button size="lg" variant="outline">
            <Link href="/dashboard/landlord">List a property</Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
