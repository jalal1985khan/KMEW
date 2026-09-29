"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MemberRecord,
  AssociateRecord,
  PaymentInstallment,
  AuditLogItem,
  INITIAL_MEMBERS,
  INITIAL_ASSOCIATES,
  INITIAL_INSTALLMENTS,
  INITIAL_AUDIT_LOGS,
} from "./portalData";

export function usePortalData() {
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [associates, setAssociates] = useState<AssociateRecord[]>(INITIAL_ASSOCIATES);
  const [installments, setInstallments] = useState<PaymentInstallment[]>(INITIAL_INSTALLMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchPortalData = useCallback(async () => {
    try {
      const res = await fetch("/api/portal");
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.members) && data.members.length > 0) setMembers(data.members);
        if (Array.isArray(data.associates) && data.associates.length > 0) setAssociates(data.associates);
        if (Array.isArray(data.installments) && data.installments.length > 0) setInstallments(data.installments);
        if (Array.isArray(data.auditLogs) && data.auditLogs.length > 0) setAuditLogs(data.auditLogs);
      }
    } catch (e) {
      console.warn("Failed to fetch portal data from Supabase:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchPortalData();

    const handleSync = () => {
      fetchPortalData();
    };

    window.addEventListener("kmew-portal-updated", handleSync);
    return () => {
      window.removeEventListener("kmew-portal-updated", handleSync);
    };
  }, [fetchPortalData]);

  // Submit payment by member
  const submitPayment = async (
    installmentId: string,
    paymentMode: "UPI" | "CASH" | "BANK_TRANSFER",
    utrReference: string,
    remarks?: string
  ) => {
    // Optimistic UI update
    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === installmentId
          ? {
              ...inst,
              status: "MEMBER_PAID",
              paymentMode,
              utrReference,
              remarks: remarks || inst.remarks,
              paidDate: new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            }
          : inst
      )
    );

    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_payment",
          installmentId,
          paymentMode,
          utrReference,
          remarks,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Submit payment error:", e);
      return { success: false };
    }
  };

  // Verify payment by associate
  const verifyPayment = async (
    installmentId: string,
    associateName: string,
    remarks?: string
  ) => {
    // Optimistic UI update
    const verifiedTimestamp = `${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })} by ${associateName}`;

    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === installmentId
          ? {
              ...inst,
              status: "ASSOCIATE_VERIFIED",
              associateVerifiedAt: verifiedTimestamp,
              remarks: remarks || inst.remarks,
            }
          : inst
      )
    );

    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_payment",
          installmentId,
          associateName,
          remarks,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Verify payment error:", e);
      return { success: false };
    }
  };

  // Confirm payment by admin
  const confirmPayment = async (installmentId: string, adminName: string) => {
    const confirmedTimestamp = `${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })} by ${adminName}`;

    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === installmentId
          ? {
              ...inst,
              status: "ADMIN_CONFIRMED",
              adminConfirmedAt: confirmedTimestamp,
            }
          : inst
      )
    );

    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm_payment",
          installmentId,
          adminName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Confirm payment error:", e);
      return { success: false };
    }
  };

  // Assign associate by admin
  const assignAssociate = async (
    memberId: string,
    associateId: string,
    associateName: string
  ) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, assignedAssociateId: associateId, assignedAssociateName: associateName }
          : m
      )
    );

    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assign_associate",
          memberId,
          associateId,
          associateName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Assign associate error:", e);
      return { success: false };
    }
  };

  // Add audit log
  const addAuditLog = async (
    action: string,
    performedBy: string,
    target: string,
    statusBadge?: any
  ) => {
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_audit_log",
          actionText: action,
          performedBy,
          target,
          statusBadge,
        }),
      });
      const data = await res.json();
    } catch (e) {
      console.error("Add audit log error:", e);
    }
  };

  // Member approves receipt (🟢 Green)
  const approveReceipt = async (installmentId: string) => {
    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === installmentId
          ? {
              ...inst,
              status: "MEMBER_APPROVED",
              remarks: "Member verified and approved receipt handed over by associate.",
            }
          : inst
      )
    );

    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve_receipt", installmentId }),
      });
      const data = await res.json();
      if (data.success) {
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Approve receipt error:", e);
      return { success: false };
    }
  };

  // Associate records field cash collection
  const recordCashCollection = async (installment: Partial<PaymentInstallment>) => {
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "record_cash", installment }),
      });
      const data = await res.json();
      if (data.success && data.installment) {
        setInstallments((prev) => [data.installment, ...prev]);
        window.dispatchEvent(new Event("kmew-portal-updated"));
      }
      return data;
    } catch (e) {
      console.error("Record cash collection error:", e);
      return { success: false };
    }
  };

  return {
    members,
    associates,
    installments,
    auditLogs,
    isLoaded,
    fetchPortalData,
    submitPayment,
    verifyPayment,
    confirmPayment,
    assignAssociate,
    approveReceipt,
    recordCashCollection,
    addAuditLog,
    setMembers,
    setAssociates,
    setInstallments,
    setAuditLogs,
  };
}
