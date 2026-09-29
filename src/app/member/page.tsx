"use client";

import { useState } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  INITIAL_MEMBERS,
  PaymentInstallment,
  PaymentStatus,
} from "@/lib/data/portalData";
import { usePortalData } from "@/lib/data/portalStore";
import {
  User,
  CreditCard,
  CheckCircle2,
  Phone,
  Building,
  UploadCloud,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

export default function MemberPortalPage() {
  const { currentUser } = useAuth();
  const { members, installments: allInstallments, submitPayment, approveReceipt } = usePortalData();

  // Strict Account Isolation: Match member by authenticated user id or email
  const member =
    members.find(
      (m) => m.id === currentUser?.id || m.email.toLowerCase() === currentUser?.email?.toLowerCase()
    ) || members[0] || INITIAL_MEMBERS[0];

  const installments = allInstallments.filter((i) => i.memberId === member.id);

  // Pay Modal State
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<PaymentInstallment | null>(null);
  const [utrInput, setUtrInput] = useState("");
  const [payMode, setPayMode] = useState<"UPI" | "BANK_TRANSFER">("UPI");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenPay = (inst: PaymentInstallment) => {
    setSelectedInstallment(inst);
    setUtrInput("");
    setSubmitSuccess(false);
    setPayModalOpen(true);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstallment) return;

    submitPayment(
      selectedInstallment.id,
      payMode,
      utrInput || `UPI/${Date.now().toString().slice(-8)}/SBI`,
      `Submitted by member via ${payMode}. Awaiting associate verification.`
    );

    setSubmitSuccess(true);
    setTimeout(() => {
      setPayModalOpen(false);
      setSubmitSuccess(false);
    }, 1500);
  };

  const handleApproveReceipt = (id: string) => {
    approveReceipt(id);
  };

  return (
    <PortalShell currentRole="MEMBER">
      <div className="flex flex-col gap-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#073531] to-[#0e705b] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
            <ShieldCheck className="size-64 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-emerald-200 border-emerald-400/40 bg-emerald-400/20 text-[11px] font-bold">
                  {member.category} Program
                </Badge>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-100">
                  <CheckCircle2 className="size-3.5 text-emerald-300" />
                  KYC Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {member.name}
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-2xl font-mono">
                Member ID: <strong className="text-white">{member.id}</strong> • {member.ward}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 text-right">
              <div className="text-[11px] text-emerald-200 uppercase font-semibold">Total Approved Aid</div>
              <div className="text-2xl font-black text-white">₹{member.aidAmount.toLocaleString("en-IN")}</div>
              <div className="text-[11px] text-emerald-300 mt-0.5">
                ₹{member.disbursedAmount.toLocaleString("en-IN")} disbursed to date
              </div>
            </div>
          </div>
        </div>

        {/* PRD Color System Explainer Strip */}
        <Card className="p-3.5 border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs bg-white rounded-2xl">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-600" />
            Installment Status Pipeline:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
            <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-300 font-semibold gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Member Paid
            </Badge>
            <span className="text-slate-300">→</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-300 font-semibold gap-1.5">
              <span className="size-1.5 rounded-full bg-blue-600" />
              Associate Verified
            </Badge>
            <span className="text-slate-300">→</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              Member Approved
            </Badge>
            <span className="text-slate-300">→</span>
            <Badge variant="outline" className="bg-rose-50 text-rose-900 border-rose-300 font-semibold gap-1.5">
              <span className="size-1.5 rounded-full bg-rose-600" />
              Admin Confirmed
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left: Installments Table (Using shadcn UI Table) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">Installment Schedule & Payments</CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Track each tranche, submit payment details, and review verifications
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="font-mono text-xs font-bold">
                  {installments.filter((i) => i.status === "ADMIN_CONFIRMED").length} / {installments.length} Completed
                </Badge>
              </CardHeader>

              <CardContent className="p-0">
                <Table className="text-xs">
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <TableHead className="pl-6">Installment</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {installments.map((inst) => {
                      const isUpcoming = inst.status === "PENDING";
                      const isNeedsApproval = inst.status === "ASSOCIATE_VERIFIED";

                      return (
                        <TableRow key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                          <TableCell className="pl-6 font-medium">
                            <div className="font-bold text-slate-900">Installment #{inst.installmentNo}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{inst.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-700">{inst.dueDate}</div>
                            {inst.paidDate && (
                              <div className="text-[10px] text-emerald-600 font-semibold">Paid: {inst.paidDate}</div>
                            )}
                          </TableCell>
                          <TableCell className="font-bold text-slate-900">
                            ₹{inst.amount.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={inst.status} size="sm" />
                            {inst.utrReference && (
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[140px]">
                                {inst.utrReference}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            {isUpcoming && (
                              <Button
                                size="sm"
                                onClick={() => handleOpenPay(inst)}
                                className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs font-bold rounded-lg shadow-xs"
                              >
                                Submit Payment
                              </Button>
                            )}

                            {isNeedsApproval && (
                              <Button
                                size="sm"
                                onClick={() => handleApproveReceipt(inst.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                              >
                                Approve Receipt
                              </Button>
                            )}

                            {inst.status === "MEMBER_PAID" && (
                              <span className="text-[11px] text-amber-700 font-medium">Awaiting Associate</span>
                            )}

                            {inst.status === "MEMBER_APPROVED" && (
                              <span className="text-[11px] text-emerald-700 font-medium">Awaiting Admin</span>
                            )}

                            {inst.status === "ADMIN_CONFIRMED" && (
                              <span className="text-[11px] text-rose-700 font-bold inline-flex items-center gap-1">
                                <CheckCircle2 className="size-3.5" />
                                Sealed
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Direct Bank Account Card */}
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building className="size-4 text-emerald-600" />
                  Registered Bank Account (DBT Disbursement)
                </CardTitle>
                <Badge variant="outline" className="text-[11px] text-emerald-700 bg-emerald-50 border-emerald-200">
                  Active & Verified
                </Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Bank Name</span>
                  <p className="font-bold text-slate-800 mt-0.5">{member.bankAccount.bankName}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Account Number</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{member.bankAccount.accountNumber}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">IFSC Code</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{member.bankAccount.ifsc}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar: Assigned Associate Card & Profile Details */}
          <div className="flex flex-col gap-6">
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-900">Assigned Field Associate</CardTitle>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {member.assignedAssociateId}
                </Badge>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-3.5">
                  <Avatar size="lg" className="ring-2 ring-blue-500/20">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-sm">
                      BD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{member.assignedAssociateName}</h4>
                    <p className="text-[11px] text-slate-500">Official Field Officer • Kulti Region</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">● On-duty for physical verification</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2 text-xs">
                  <a
                    href="tel:+918972285850"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="size-3.5 text-emerald-600" />
                      <span>+91 89722 85850</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Call</span>
                  </a>

                  <a
                    href="https://wa.me/918972285850"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-800 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="size-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </span>
                    <ExternalLink className="size-3.5 text-emerald-600" />
                  </a>
                </div>

                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
                  <strong>Need help with your installment?</strong> Bikram Das visits your ward weekly to collect physical proofs or assist with payment documentation.
                </div>
              </CardContent>
            </Card>

            {/* Quick Profile Snapshot */}
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-900">Guardian & Address Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Guardian</span>
                  <p className="font-bold text-slate-800">{member.guardianName} ({member.guardianPhone})</p>
                </div>
                <Separator />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Registered Address</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{member.address}</p>
                </div>
                <Separator />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Registered Contact</span>
                  <p className="text-slate-600 font-mono">{member.phone} • {member.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      {/* Submit Payment Dialog (Using shadcn UI Dialog) */}
      <Dialog open={payModalOpen} onOpenChange={setPayModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">
              Submit Installment #{selectedInstallment?.installmentNo}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Amount Due: <strong className="text-slate-900">₹{selectedInstallment?.amount.toLocaleString("en-IN")}</strong>
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Payment Submitted!</h4>
              <p className="text-xs text-slate-600">
                Status set to 🟡 <strong>Member Paid</strong>. Your assigned associate ({member.assignedAssociateName}) has been notified.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitPayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Payment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={payMode === "UPI" ? "default" : "outline"}
                    onClick={() => setPayMode("UPI")}
                    className={payMode === "UPI" ? "bg-[#0e705b] hover:bg-[#0a544b] text-white" : ""}
                  >
                    UPI / QR Code
                  </Button>
                  <Button
                    type="button"
                    variant={payMode === "BANK_TRANSFER" ? "default" : "outline"}
                    onClick={() => setPayMode("BANK_TRANSFER")}
                    className={payMode === "BANK_TRANSFER" ? "bg-[#0e705b] hover:bg-[#0a544b] text-white" : ""}
                  >
                    Bank Transfer / NEFT
                  </Button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Enter Transaction UTR / Ref Number <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="e.g. 392817492810 or Bank Ref"
                  className="font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Attach Payment Screenshot / Receipt (Optional)
                </span>
                <span className="text-[10px] text-slate-400">JPG, PNG or PDF up to 5MB</span>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPayModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold"
                >
                  Confirm & Submit
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
