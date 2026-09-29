import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    // Query Supabase Postgres via Prisma
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: cleanInput, mode: "insensitive" } },
          { phone: { equals: cleanInput } },
        ],
      },
    });

    if (!user || user.password !== cleanPass) {
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
