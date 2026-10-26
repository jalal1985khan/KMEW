import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const content = await prisma.siteContent.findUnique({
        where: { key },
      });
      return NextResponse.json({
        success: true,
        key,
        data: content ? content.data : null,
      });
    }

    const all = await prisma.siteContent.findMany();
    const contentMap: Record<string, any> = {};
    for (const item of all) {
      contentMap[item.key] = item.data;
    }

    return NextResponse.json({
      success: true,
      content: contentMap,
    });
  } catch (error) {
    console.error("GET /api/content error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch site content from database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, data } = body;

    if (!key || data === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: key and data." },
        { status: 400 }
      );
    }

    const updated = await prisma.siteContent.upsert({
      where: { key },
      update: { data },
      create: { key, data },
    });

    return NextResponse.json({
      success: true,
      key: updated.key,
      data: updated.data,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    console.error("POST /api/content error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save site content to database." },
      { status: 500 }
    );
  }
}
