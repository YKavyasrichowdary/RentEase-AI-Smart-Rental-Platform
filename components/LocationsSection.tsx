"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Reveal,
  Section,
  SectionHeading,
} from "@/components/rentease/Section";
import { LOCATIONS, formatINR } from "@/lib/rentease-data";

export function LocationsSection() {
  return (
    <Section className="border-y border-border bg-card">
      <SectionHeading
        eyebrow="Popular locations"
        title="Where RentEase is active."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LOCATIONS.map((location, index) => (
          <Reveal key={location.city} delay={index * 0.06}>
            <Link
              href={`/search?city=${encodeURIComponent(location.city)}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={location.image}
                  alt={`${location.city} rental market`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>

              <div className="p-4">
                <p className="font-display text-sm font-semibold">
                  {location.city}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {location.listings.toLocaleString("en-IN")} listings · median{" "}
                  {formatINR(location.medianRent)}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
