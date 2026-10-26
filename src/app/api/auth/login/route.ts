import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate } from "@/lib/auth/authStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { emailOrPhone, password } = body;

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter your email/phone and password." },
        { status: 400 }
      );
    }

    const cleanInput = String(emailOrPhone).trim().toLowerCase();
    const cleanPass = String(password).trim();
    const phoneDigits = cleanInput.replace(/\D/g, "");

    let user: any = null;

    try {
      // Query Postgres via Prisma with multi-field matching
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: { equals: cleanInput, mode: "insensitive" } },
            { id: { equals: cleanInput, mode: "insensitive" } },
            { phone: { equals: cleanInput } },
            ...(phoneDigits.length >= 10
              ? [{ phone: { contains: phoneDigits.slice(-10) } }]
              : []),
          ],
        },
      });
    } catch (dbError) {
      console.warn("Prisma user query failed, falling back to static auth store:", dbError);
      const fallbackUser = authenticate(cleanInput, cleanPass);
      if (fallbackUser) {
        const { password: _, ...safeFallbackUser } = fallbackUser;
        return NextResponse.json({
          success: true,
          user: safeFallbackUser,
        });
      }
      return NextResponse.json(
        { success: false, error: "Database connection error during login." },
        { status: 500 }
      );
    }

    if (!user || user.password !== cleanPass) {
      // Check fallback store in case test credentials differ
      const fallbackUser = authenticate(cleanInput, cleanPass);
      if (fallbackUser) {
        const { password: _, ...safeFallbackUser } = fallbackUser;
        return NextResponse.json({
          success: true,
          user: safeFallbackUser,
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid email, phone or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    // Return safe user object (excluding password)
    const { password: _, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Database connection error during login." },
      { status: 500 }
    );
  }
}
