
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/authorization";
import prisma from "@/lib/prisma";
import { calculatePropertyAssessment } from "@/lib/properties/assessment";

type RouteContext = {
  params: Promise<{
    propertyId: string;
  }>;
};

export async function POST(
  _request: Request,
  context: RouteContext,
) {
  try {
    const { user, error } = await requireRole(["LANDLORD"]);

    if (error === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    if (error === "FORBIDDEN" || !user) {
      return NextResponse.json(
        { error: "Only landlords can assess properties." },
        { status: 403 },
      );
    }

    const { propertyId } = await context.params;

    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
        ownerId: user.id,
      },
      include: {
        images: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );
    }

    if (property.status !== "DRAFT") {
      return NextResponse.json(
        { error: "Only draft properties can be assessed." },
        { status: 409 },
      );
    }

    const assessment = calculatePropertyAssessment({
      title: property.title,
      description: property.description,
      city: property.city,
      type: property.type,
      locality: property.locality,
      rent: Number(property.rent),
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      furnishing: property.furnishing,
      amenities: property.amenities,
      imageCount: property.images.length,
    });

    const savedAssessment =
      await prisma.propertyAssessment.create({
        data: {
          propertyId: property.id,
          propertyUpdatedAt: property.updatedAt,
          trustScore: assessment.trustScore,
          signals: assessment.signals,
          estimatedRentLow: assessment.estimate.low,
          estimatedRentMid: assessment.estimate.mid,
          estimatedRentHigh: assessment.estimate.high,
          listedRentOutsideRange:
            assessment.listedRentOutsideRange,
        },
      });

    return NextResponse.json({
      message: "Property assessment completed.",
      assessment: {
        id: savedAssessment.id,
        trustScore: assessment.trustScore,
        signals: assessment.signals,
        estimate: assessment.estimate,
        listedRentOutsideRange:
          assessment.listedRentOutsideRange,
        rentVerdict: assessment.rentVerdict,
        eligibleForSubmission:
          assessment.eligibleForSubmission,
        threshold: 75,
      },
    });
  } catch (error) {
    console.error("Property assessment error:", error);

    return NextResponse.json(
      { error: "Unable to assess property." },
      { status: 500 },
    );
  }
}
