"use client";

import type { PaymentStatus } from "@/lib/data/portalData";
import { Clock } from "lucide-react";

interface StatusBadgeProps {
  status: PaymentStatus | string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  switch (status) {
    case "MEMBER_PAID":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${pad}`}
          title="Payment submitted by member; awaiting field associate verification"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Member Paid</span>
        </span>
      );

    case "ASSOCIATE_VERIFIED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-blue-50 text-blue-800 border border-blue-300 ${pad}`}
          title="Physically verified by assigned Field Associate"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Associate Verified</span>
        </span>
      );

    case "MEMBER_APPROVED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 ${pad}`}
          title="Two-party verification handshake completed"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Member Approved</span>
        </span>
      );

    case "ADMIN_CONFIRMED":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-300 ${pad}`}
          title="Final Administrative Confirmation & Ledger Lock"
        >
          <span className="w-2 h-2 rounded-full bg-rose-600" />
          <span>Admin Confirmed</span>
        </span>
      );

    case "PENDING":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${pad}`}
        >
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Pending Due</span>
        </span>
      );
  }
}
