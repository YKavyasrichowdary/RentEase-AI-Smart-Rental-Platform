
import { verifySession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("rentease_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }

    if (user.role !== "TENANT") {
      return NextResponse.json(
        { error: "Only tenants can access saved properties" },
        { status: 403 }
      );
    }

    const savedProperties = await prisma.savedProperty.findMany({
      where: {
        userId: session.userId,
        property: {
          status: "PUBLISHED",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        property: {
          include: {
            images: {
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { savedProperties },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch saved properties error:", error);

    return NextResponse.json(
      { error: "Unable to fetch saved properties" },
      { status: 500 }
    );
  }
}
