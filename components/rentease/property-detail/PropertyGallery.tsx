"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

import type { Property } from "@/lib/rentease-data";

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({
  property,
}: PropertyGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <motion.div
        key={active}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Image
          src={property.images[active]}
          alt={`${property.name} — photo ${active + 1}`}
          width={1200}
          height={800}
          priority
          className="h-64 w-full object-cover sm:h-96"
        />
      </motion.div>

      <div className="flex gap-3 overflow-x-auto p-3">
        {property.images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View photo ${index + 1}`}
            aria-pressed={active === index}
            className={cn(
              "shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
              active === index
                ? "border-primary"
                : "border-transparent",
            )}
          >
            <Image
              src={image}
              alt=""
              width={112}
              height={64}
              loading="lazy"
              className="h-16 w-24 object-cover sm:w-28"
            />
          </button>
        ))}
      </div>
    </div>
  );
}