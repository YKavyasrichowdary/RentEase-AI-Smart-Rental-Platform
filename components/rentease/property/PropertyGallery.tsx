"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: (string | StaticImageData)[];
  name: string;
}

const getImageSrc = (img?: string | StaticImageData): string => {
  if (!img) return "";
  return typeof img === "string" ? img : img.src;
};

export function PropertyGallery({
  images,
  name,
}: PropertyGalleryProps) {
  const [active, setActive] = useState(0);

  const activeSrc = getImageSrc(images[active]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <motion.img
        key={active}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        src={activeSrc}
        alt={`${name} — photo ${active + 1}`}
        width={1200}
        height={800}
        className="h-64 w-full object-cover sm:h-96"
      />

      <div className="flex gap-3 overflow-x-auto p-3">
        {images.map((image, index) => {
          const imgSrc = getImageSrc(image);
          return (
            <button
              key={`${imgSrc}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View photo ${index + 1}`}
              className={cn(
                "shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === index
                  ? "border-primary"
                  : "border-transparent",
              )}
            >
              <img
                src={imgSrc}
                alt=""
                loading="lazy"
                className="h-16 w-24 object-cover sm:w-28"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}