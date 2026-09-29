import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.newsEvent.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Fetch news error:", error);
    return NextResponse.json({ success: false, items: [], error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, item, id, updates } = body;

    if (action === "create" && item) {
      const created = await prisma.newsEvent.create({
        data: {
          id: item.id || `news-${Date.now()}`,
          title: item.title,
          date: item.date,
          category: item.category,
          summary: item.summary,
          image: item.image,
          location: item.location,
          isUpcoming: Boolean(item.isUpcoming),
        },
      });
      return NextResponse.json({ success: true, item: created });
    }

    if (action === "update" && id && updates) {
      const updated = await prisma.newsEvent.update({
        where: { id },
        data: updates,
      });
      return NextResponse.json({ success: true, item: updated });
    }

    if (action === "delete" && id) {
      await prisma.newsEvent.delete({
        where: { id },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("News mutation error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
