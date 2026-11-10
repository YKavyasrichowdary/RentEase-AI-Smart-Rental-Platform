
import {
  estimateRent,
  priceVerdict,
} from "@/lib/rentease-data";

type AssessmentInput = {
  title: string;
  description: string;
  city: string;
  type: string;
  locality: string;
  rent: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
  amenities: string[];
  imageCount: number;
};

export function calculatePropertyAssessment(
  property: AssessmentInput,
) {
  const estimate = estimateRent({
    city: property.city,
    type: property.type,
    beds: property.bedrooms,
    baths: property.bathrooms,
    area: property.area,
    furnishing: property.furnishing,
    amenities: property.amenities,
  });

  const verdict = priceVerdict(
    property.rent,
    estimate,
  );

  const completeness = Math.min(
    100,
    55 +
      property.imageCount * 9 +
      property.amenities.length * 3 +
      (property.description.length > 120 ? 12 : 4),
  );

  const priceConsistency =
    verdict.tone === "low"
      ? 92
      : verdict.tone === "moderate"
        ? 74
        : 52;

  const imageSimilarity =
    property.imageCount >= 3
      ? 90
      : property.imageCount > 0
        ? 76
        : 60;

  const locationConsistency =
    property.locality.length > 4 ? 90 : 72;

  const informationQuality = Math.min(
    96,
    50 + Math.round(property.description.length / 6),
  );

  const signals = [
    {
      label: "Listing completeness",
      score: completeness,
    },
    {
      label: "Price consistency",
      score: priceConsistency,
    },
    {
      label: "Image similarity",
      score: imageSimilarity,
    },
    {
      label: "Location consistency",
      score: locationConsistency,
    },
    {
      label: "Listing information quality",
      score: informationQuality,
    },
  ];

  const trustScore = Math.round(
    signals.reduce((sum, signal) => sum + signal.score, 0) /
      signals.length,
  );

  return {
    trustScore,
    signals,
    estimate,
    listedRentOutsideRange:
      property.rent < estimate.low ||
      property.rent > estimate.high,
    rentVerdict: verdict.label,
    eligibleForSubmission: trustScore >= 75,
  };
}
