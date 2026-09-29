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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  INITIAL_ASSOCIATES,
  INITIAL_MEMBERS,
  PaymentInstallment,
  PaymentStatus,
  MemberRecord,
} from "@/lib/data/portalData";
import { usePortalData } from "@/lib/data/portalStore";
import {
  Users,
  CreditCard,
  CheckCircle2,
  Phone,
  Search,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  MapPin,
  PlusCircle,
} from "lucide-react";

export default function AssociatePortalPage() {
  const { currentUser } = useAuth();
  const {
    members: allMembers,
    associates,
    installments,
    verifyPayment,
    recordCashCollection,
  } = usePortalData();

  // Strict Account Isolation: Match associate by authenticated user id or email
  const associate =
    associates.find(
      (a) => a.id === currentUser?.id || a.email.toLowerCase() === currentUser?.email?.toLowerCase()
    ) || associates[0] || INITIAL_ASSOCIATES[0];

  // Strictly isolate members and installments assigned to this associate
  const members = allMembers.filter((m) => m.assignedAssociateId === associate.id);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("verifications");

  // Verify Modal
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState<PaymentInstallment | null>(null);
  const [verifyNotes, setVerifyNotes] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  // Record Collection Form State
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || "");
  const [collectionAmount, setCollectionAmount] = useState("4000");
  const [collectionReceipt, setCollectionReceipt] = useState("CSH-REC-8924");
  const [collectionSuccess, setCollectionSuccess] = useState(false);

  // Filter pending verifications strictly for this associate (status: MEMBER_PAID)
  const pendingVerifications = installments.filter(
    (i) => i.associateId === associate.id && i.status === "MEMBER_PAID"
  );

  const handleOpenVerify = (inst: PaymentInstallment) => {
    setSelectedInst(inst);
    setVerifyNotes("Physical verification confirmed at ward camp. Bank UTR checked.");
    setReceiptNumber(inst.utrReference || `REC-${(installments.length + 100).toString()}`);
    setVerifyModalOpen(true);
  };

  const handleConfirmVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInst) return;

    verifyPayment(selectedInst.id, associate.name, verifyNotes);
    setVerifyModalOpen(false);
  };

  const handleRecordCashCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMember = members.find((m) => m.id === selectedMemberId);
    if (!targetMember) return;

    const newInst: PaymentInstallment = {
      id: `PAY-FLD-${(installments.length + 1).toString().padStart(4, "0")}`,
      memberId: targetMember.id,
      memberName: targetMember.name,
      associateId: associate.id,
      associateName: associate.name,
      installmentNo: targetMember.completedInstallments + 1,
      totalInstallments: targetMember.installmentsCount,
      amount: Number(collectionAmount),
      dueDate: "Field Collection",
      paidDate: "Today",
      status: "ASSOCIATE_VERIFIED" as PaymentStatus, // 🔵 Blue
      paymentMode: "CASH",
      utrReference: collectionReceipt,
      associateVerifiedAt: `Today by ${associate.name} in field`,
      remarks: `Field cash receipt ${collectionReceipt} issued. Member approval pending.`,
    };

    recordCashCollection(newInst);
    setCollectionSuccess(true);
    setTimeout(() => {
      setCollectionSuccess(false);
      setActiveTab("verifications");
    }, 1500);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalShell currentRole="ASSOCIATE">
      <div className="flex flex-col gap-6">
        {/* Associate Profile & Metrics Header */}
        <div className="bg-gradient-to-r from-[#042421] via-[#073531] to-[#0a4d44] rounded-3xl p-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-blue-200 border-blue-400/30 bg-blue-500/20 text-[11px] font-bold">
                  Badge {associate.badgeNumber}
                </Badge>
                <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="size-3.5" />
                  Active Field Officer
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Associate Portal: {associate.name}
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 flex items-center gap-1.5 flex-wrap">
                <MapPin className="size-3.5 text-emerald-400" />
                <span>Assigned Coverage: {associate.assignedWards.join(" • ")}</span>
              </p>
            </div>

            <Button
              onClick={() => setActiveTab("collection")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="size-4" />
              <span>Record Field Collection</span>
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-800/80">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Assigned Ward Members</div>
              <div className="text-xl font-black text-white mt-0.5">{associate.assignedMembersCount}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-amber-200 uppercase font-semibold">Pending Verifications</div>
              <div className="text-xl font-black text-amber-300 mt-0.5">{pendingVerifications.length}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Total Collections</div>
              <div className="text-xl font-black text-white mt-0.5">₹{associate.totalCollections.toLocaleString("en-IN")}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Field Compliance</div>
              <div className="text-xl font-black text-emerald-300 mt-0.5">{associate.rating} ★ (98%)</div>
            </div>
          </div>
        </div>

        {/* Shadcn UI Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-4">
          <TabsList className="bg-slate-200/80 p-1 rounded-xl">
            <TabsTrigger value="verifications" className="text-xs font-bold gap-2">
              <FileCheck2 className="size-3.5" />
              <span>Verification Queue</span>
              {pendingVerifications.length > 0 && (
                <Badge variant="destructive" className="py-0 px-1 text-[10px] h-4">
                  {pendingVerifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs font-bold gap-2">
              <Users className="size-3.5" />
              <span>Assigned Members ({members.length})</span>
            </TabsTrigger>
            <TabsTrigger value="collection" className="text-xs font-bold gap-2">
              <CreditCard className="size-3.5" />
              <span>Record Cash Collection</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Verification Queue */}
          <TabsContent value="verifications" className="flex flex-col gap-4">
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900">
                  Member Payments Awaiting Field Verification
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Review member payment proofs and transition items from 🟡 <strong>Member Paid</strong> to 🔵 <strong>Associate Verified</strong>.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                {pendingVerifications.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-2">
                    <CheckCircle2 className="size-10 text-emerald-500" />
                    <p className="text-sm font-bold text-slate-800">All verifications up to date!</p>
                    <p className="text-xs text-slate-400">No pending member payments in your assigned wards right now.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {pendingVerifications.map((inst) => (
                      <div key={inst.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{inst.memberName}</span>
                            <span className="text-xs text-slate-400 font-mono">({inst.memberId})</span>
                            <StatusBadge status={inst.status} size="sm" />
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            Installment #{inst.installmentNo} of {inst.totalInstallments} • <strong>₹{inst.amount.toLocaleString("en-IN")}</strong> via {inst.paymentMode}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            Ref/UTR: <span className="text-slate-800 font-semibold">{inst.utrReference || "N/A"}</span> • Paid: {inst.paidDate}
                          </div>
                          {inst.remarks && (
                            <div className="text-[11px] text-slate-600 italic mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              Member Note: &ldquo;{inst.remarks}&rdquo;
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={() => handleOpenVerify(inst)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0"
                        >
                          <ShieldCheck className="size-4" />
                          <span>Verify & Approve</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recently Verified Log */}
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 tracking-tight">
                  Recently Verified by Associate {associate.badgeNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 text-xs pt-2">
                {installments
                  .filter((i) => i.status !== "MEMBER_PAID" && i.associateId === associate.id)
                  .map((inst) => (
                    <div key={inst.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{inst.memberName}</span>
                        <span className="text-slate-400 text-[11px] ml-2">Installment #{inst.installmentNo} • ₹{inst.amount.toLocaleString("en-IN")}</span>
                        <div className="text-[10px] text-slate-400">{inst.associateVerifiedAt || "Verified"}</div>
                      </div>
                      <StatusBadge status={inst.status} size="sm" />
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: Assigned Members */}
          <TabsContent value="members">
            <Card className="rounded-2xl border-slate-200 shadow-xs bg-white">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Assigned Ward Members</CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Beneficiaries allocated strictly to your field supervision
                  </CardDescription>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="size-4 text-slate-400 absolute left-3 top-2.5" />
                  <Input
                    type="text"
                    placeholder="Search name, ID or ward..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table className="text-xs">
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <TableHead className="pl-6">Beneficiary</TableHead>
                      <TableHead>Program & Ward</TableHead>
                      <TableHead>Aid Progress</TableHead>
                      <TableHead>Guardian Contact</TableHead>
                      <TableHead className="text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((m) => (
                      <TableRow key={m.id} className="hover:bg-slate-50/70 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar size="sm">
                              <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-xs">
                                {m.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-slate-900">{m.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{m.id}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="font-medium text-slate-700 block">{m.category}</span>
                          <span className="text-[11px] text-slate-500">{m.ward}</span>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-slate-900">
                            ₹{m.disbursedAmount.toLocaleString("en-IN")} / ₹{m.aidAmount.toLocaleString("en-IN")}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            {m.completedInstallments} of {m.installmentsCount} Tranches Completed
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-800">{m.guardianName}</div>
                          <div className="text-[11px] text-slate-500">{m.guardianPhone}</div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <a
                            href={`tel:${m.phone}`}
                            className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
                          >
                            <Phone className="w-3 h-3 text-emerald-600 mr-1" />
                            <span>Call</span>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: Record Field Cash Collection */}
          <TabsContent value="collection">
            <Card className="rounded-2xl border-slate-200 shadow-xs max-w-xl mx-auto bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900">
                  Record Field Collection (Cash / Offline)
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Log cash received from a member in the field. This marks the tranche as 🔵 <strong>Associate Verified</strong> and alerts the member for digital handshake.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                {collectionSuccess ? (
                  <div className="py-8 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">Field Collection Logged!</h4>
                    <p className="text-xs text-slate-600">
                      Receipt registered with status 🔵 <strong>Associate Verified</strong>. Returning to dashboard...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRecordCashCollection} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Select Member</label>
                      <select
                        value={selectedMemberId}
                        onChange={(e) => setSelectedMemberId(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#0e705b] bg-white"
                      >
                        {members.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.id}) • {m.ward}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Amount Collected (₹)</label>
                        <Input
                          type="number"
                          required
                          value={collectionAmount}
                          onChange={(e) => setCollectionAmount(e.target.value)}
                          className="font-mono font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Receipt Booklet Number</label>
                        <Input
                          type="text"
                          required
                          value={collectionReceipt}
                          onChange={(e) => setCollectionReceipt(e.target.value)}
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        By submitting, you certify that physical cash was received and an official paper receipt was handed to the member or guardian.
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-3 bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs shadow-xs"
                    >
                      Submit Field Collection Record
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Field Verification Approval Dialog (Using shadcn UI Dialog) */}
      <Dialog open={verifyModalOpen} onOpenChange={setVerifyModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">
              Field Verification Approval
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Beneficiary: <strong>{selectedInst?.memberName}</strong>
            </DialogDescription>
          </DialogHeader>

          {selectedInst && (
            <form onSubmit={handleConfirmVerification} className="space-y-4 text-xs">
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-blue-900 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Tranche #{selectedInst.installmentNo}</span>
                  <span>₹{selectedInst.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="text-[11px] text-blue-700">Mode: {selectedInst.paymentMode}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Confirmed Bank Reference / UTR
                </label>
                <Input
                  type="text"
                  required
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Field Verification Notes / Remarks
                </label>
                <textarea
                  rows={2}
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVerifyModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Confirm (🔵 Blue)
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
