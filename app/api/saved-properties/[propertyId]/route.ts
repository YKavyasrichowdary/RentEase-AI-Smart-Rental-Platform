
import { verifySession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ propertyId: string }>;
};

async function getTenantSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("rentease_session")?.value;

  if (!token) {
    return { error: "Authentication required", status: 401 as const };
  }

  const session = await verifySession(token);

  if (!session) {
    return { error: "Invalid or expired session", status: 401 as const };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });

  if (!user) {
    return { error: "User not found", status: 401 as const };
  }

  if (user.role !== "TENANT") {
    return {
      error: "Only tenants can manage saved properties",
      status: 403 as const,
    };
  }

  return { userId: session.userId };
}

export async function POST(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const auth = await getTenantSession();

    if ("error" in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const { propertyId } = await params;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        id: true,
        status: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "Only published properties can be saved" },
        { status: 400 }
      );
    }

    const savedProperty = await prisma.savedProperty.upsert({
      where: {
        userId_propertyId: {
          userId: auth.userId,
          propertyId,
        },
      },
      update: {},
      create: {
        userId: auth.userId,
        propertyId,
      },
    });

    return NextResponse.json(
      {
        message: "Property saved successfully",
        savedProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save property error:", error);

    return NextResponse.json(
      { error: "Unable to save property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const auth = await getTenantSession();

    if ("error" in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const { propertyId } = await params;

    const result = await prisma.savedProperty.deleteMany({
      where: {
        userId: auth.userId,
        propertyId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Property was not saved" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Property removed from saved properties" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Remove saved property error:", error);

    return NextResponse.json(
      { error: "Unable to remove saved property" },
      { status: 500 }
    );
  }
}
