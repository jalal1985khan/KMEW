import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: "Programs" | "News" | "Stories" | "Gallery" | "Banners" | "Uploads";
  sizeBytes?: number;
  width?: number;
  height?: number;
  uploadedAt: string;
  isDefault?: boolean;
}

// Built-in site assets always available in the media library
export const DEFAULT_MEDIA_ASSETS: MediaItem[] = [
  // Programs
  {
    id: "asset-prog-scholarships",
    title: "Higher Education Scholarships",
    url: "/programs/scholarships.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-prog-education",
    title: "Learning & Evening Tuition",
    url: "/programs/education.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-prog-classes",
    title: "Community Literacy & Digital Classes",
    url: "/programs/community-classes.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-prog-school",
    title: "School Readiness Kits & Uniforms",
    url: "/programs/school-support.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-prog-skill",
    title: "Women Vocational & Tailoring",
    url: "/programs/skill-development.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-prog-health",
    title: "Community Health & Eye Checkup Camp",
    url: "/programs/health.png",
    category: "Programs",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  // News & Press
  {
    id: "asset-news-edu",
    title: "Education Drive Announcement",
    url: "/news/edu.png",
    category: "News",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-news-health",
    title: "Health Camp Bulletin",
    url: "/news/health.png",
    category: "News",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-news-scholarship",
    title: "Scholarship Assembly Ceremony",
    url: "/news/scholarship.png",
    category: "News",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  // Stories & Testimonials
  {
    id: "asset-story-rina",
    title: "Rina - Member Profile",
    url: "/stories/rina.png",
    category: "Stories",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-story-amit",
    title: "Amit - Student Profile",
    url: "/stories/amit.png",
    category: "Stories",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-story-shabana",
    title: "Shabana - Associate Profile",
    url: "/stories/shabana.png",
    category: "Stories",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  // Gallery
  {
    id: "asset-gallery-1",
    title: "Classroom Study Session",
    url: "/gallery/g1.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-2",
    title: "Smiling Children at School",
    url: "/gallery/g2.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-3",
    title: "Community Assembly Discussion",
    url: "/gallery/g3.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-4",
    title: "Health Diagnostic & Checkup",
    url: "/gallery/g4.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-5",
    title: "Young Scholar in Classroom",
    url: "/gallery/g5.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-6",
    title: "Outdoor Sports & Youth Activity",
    url: "/gallery/g6.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-gallery-7",
    title: "Tree Planting Initiative",
    url: "/gallery/g7.png",
    category: "Gallery",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  // Banners & Backgrounds
  {
    id: "asset-banner-hero",
    title: "Homepage Hero Banner",
    url: "/homepage-hero-banner.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-banner-impact",
    title: "Our Impact Dark Green Banner",
    url: "/our-impact.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-banner-support",
    title: "Support KMEW Sunset Banner",
    url: "/support-banner.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-banner-community",
    title: "Community Welfare Banner",
    url: "/community-banner.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-bank-passbook",
    title: "Official SBI Bank Passbook",
    url: "/bank-passbook.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
  {
    id: "asset-bank-qr",
    title: "Official SBI UPI QR Code",
    url: "/bank-qr-code.png",
    category: "Banners",
    uploadedAt: "Default Asset",
    isDefault: true,
  },
];

const MEDIA_CONTENT_KEY = "media_library";

export async function GET() {
  try {
    const record = await prisma.siteContent.findUnique({
      where: { key: MEDIA_CONTENT_KEY },
    });

    const userUploads: MediaItem[] =
      record && Array.isArray(record.data) ? (record.data as unknown as MediaItem[]) : [];

    // Combine default pre-indexed assets with user-uploaded images
    const allMedia = [...userUploads, ...DEFAULT_MEDIA_ASSETS];

    return NextResponse.json({
      success: true,
      data: allMedia,
      uploadsCount: userUploads.length,
      totalCount: allMedia.length,
    });
  } catch (error) {
    console.error("Failed to fetch media library:", error);
    // Fallback to defaults
    return NextResponse.json({
      success: true,
      data: DEFAULT_MEDIA_ASSETS,
      uploadsCount: 0,
      totalCount: DEFAULT_MEDIA_ASSETS.length,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, url, category = "Uploads", sizeBytes, width, height } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Image URL or dataUrl is required" },
        { status: 400 }
      );
    }

    const newItem: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: title || `Upload ${new Date().toLocaleDateString()}`,
      url,
      category: category as any,
      sizeBytes,
      width,
      height,
      uploadedAt: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      isDefault: false,
    };

    // Retrieve current uploads
    const existing = await prisma.siteContent.findUnique({
      where: { key: MEDIA_CONTENT_KEY },
    });

    const currentUploads: MediaItem[] =
      existing && Array.isArray(existing.data) ? (existing.data as unknown as MediaItem[]) : [];

    const updatedUploads = [newItem, ...currentUploads];

    // Persist to database
    await prisma.siteContent.upsert({
      where: { key: MEDIA_CONTENT_KEY },
      update: { data: updatedUploads as any },
      create: { key: MEDIA_CONTENT_KEY, data: updatedUploads as any },
    });

    return NextResponse.json({
      success: true,
      data: newItem,
      message: "Media item uploaded and compressed successfully",
    });
  } catch (error) {
    console.error("Failed to upload media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save media item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Media id is required" }, { status: 400 });
    }

    const existing = await prisma.siteContent.findUnique({
      where: { key: MEDIA_CONTENT_KEY },
    });

    if (!existing || !Array.isArray(existing.data)) {
      return NextResponse.json({ success: true, message: "Nothing to delete" });
    }

    const currentUploads = existing.data as unknown as MediaItem[];
    const filtered = currentUploads.filter((m) => m.id !== id);

    await prisma.siteContent.update({
      where: { key: MEDIA_CONTENT_KEY },
      data: { data: filtered as any },
    });

    return NextResponse.json({ success: true, message: "Media item removed" });
  } catch (error) {
    console.error("Failed to delete media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete media item" },
      { status: 500 }
    );
  }
}
