import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [members, associates, installments, auditLogs] = await Promise.all([
      prisma.member.findMany({ orderBy: { joinedDate: "desc" } }),
      prisma.associate.findMany({ orderBy: { joinedDate: "desc" } }),
      prisma.paymentInstallment.findMany({ orderBy: { installmentNo: "asc" } }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    ]);

    return NextResponse.json({
      success: true,
      members,
      associates,
      installments,
      auditLogs,
    });
  } catch (error) {
    console.error("Fetch portal data error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load portal data from database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Submit payment by member
    if (action === "submit_payment") {
      const { installmentId, paymentMode, utrReference, remarks, paidDate } = body;
      const updated = await prisma.paymentInstallment.update({
        where: { id: installmentId },
        data: {
          status: "MEMBER_PAID",
          paymentMode,
          utrReference,
          remarks,
          paidDate: paidDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        },
      });

      // Add audit log
      await prisma.auditLog.create({
        data: {
          id: `AUD-${Date.now()}`,
          timestamp: "Just now",
          action: "Payment Submitted via " + (paymentMode || "Digital"),
          performedBy: `${updated.memberName} (Member)`,
          target: `Installment #${updated.installmentNo} (₹${updated.amount.toLocaleString("en-IN")})`,
          statusBadge: "MEMBER_PAID",
        },
      });

      return NextResponse.json({ success: true, installment: updated });
    }

    // 2. Associate verification
    if (action === "verify_payment") {
      const { installmentId, associateName, remarks } = body;
      const updated = await prisma.paymentInstallment.update({
        where: { id: installmentId },
        data: {
          status: "ASSOCIATE_VERIFIED",
          associateVerifiedAt: `${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} by ${associateName}`,
          remarks: remarks || undefined,
        },
      });

      // Add audit log
      await prisma.auditLog.create({
        data: {
          id: `AUD-${Date.now()}`,
          timestamp: "Just now",
          action: "Associate Verification Approved",
          performedBy: `${associateName} (Associate)`,
          target: `Installment #${updated.installmentNo} for ${updated.memberName}`,
          statusBadge: "ASSOCIATE_VERIFIED",
        },
      });

      return NextResponse.json({ success: true, installment: updated });
    }

    // 3. Admin confirmation
    if (action === "confirm_payment") {
      const { installmentId, adminName } = body;
      const updated = await prisma.paymentInstallment.update({
        where: { id: installmentId },
        data: {
          status: "ADMIN_CONFIRMED",
          adminConfirmedAt: `${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} by ${adminName || "Central Admin"}`,
        },
      });

      // Add audit log
      await prisma.auditLog.create({
        data: {
          id: `AUD-${Date.now()}`,
          timestamp: "Just now",
          action: "Admin Final Confirmation",
          performedBy: `${adminName || "Admin"}`,
          target: `Installment #${updated.installmentNo} for ${updated.memberName}`,
          statusBadge: "ADMIN_CONFIRMED",
        },
      });

      return NextResponse.json({ success: true, installment: updated });
    }

    // 4. Assign Associate
    if (action === "assign_associate") {
      const { memberId, associateId, associateName } = body;
      const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: {
          assignedAssociateId: associateId,
          assignedAssociateName: associateName,
        },
      });

      // Update associate's assigned member count
      await prisma.associate.update({
        where: { id: associateId },
        data: {
          assignedMembersCount: { increment: 1 },
        },
      });

      // Add audit log
      await prisma.auditLog.create({
        data: {
          id: `AUD-${Date.now()}`,
          timestamp: "Just now",
          action: "Associate Assigned",
          performedBy: "Admin Portal",
          target: `${updatedMember.name} assigned to ${associateName}`,
          statusBadge: "SUCCESS",
        },
      });

      return NextResponse.json({ success: true, member: updatedMember });
    }

    // 5. Add custom audit log
    if (action === "add_audit_log") {
      const { action: logAction, performedBy, target, statusBadge } = body;
      const createdLog = await prisma.auditLog.create({
        data: {
          id: `AUD-${Date.now()}`,
          timestamp: "Just now",
          action: logAction,
          performedBy,
          target,
          statusBadge: statusBadge || "INFO",
        },
      });
      return NextResponse.json({ success: true, log: createdLog });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Portal mutation error:", error);
    return NextResponse.json({ success: false, error: "Database operation failed" }, { status: 500 });
  }
}
