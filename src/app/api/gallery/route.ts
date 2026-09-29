import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ success: false, items: [], error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, item, id, updates } = body;

    if (action === "create" && item) {
      const created = await prisma.galleryItem.create({
        data: {
          id: item.id || `g-${Date.now()}`,
          title: item.title,
          category: item.category,
          image: item.image,
          description: item.description,
          date: item.date,
        },
      });
      return NextResponse.json({ success: true, item: created });
    }

    if (action === "update" && id && updates) {
      const updated = await prisma.galleryItem.update({
        where: { id },
        data: updates,
      });
      return NextResponse.json({ success: true, item: updated });
    }

    if (action === "delete" && id) {
      await prisma.galleryItem.delete({
        where: { id },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Gallery mutation error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
