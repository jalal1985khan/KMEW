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
  INITIAL_MEMBERS,
  INITIAL_ASSOCIATES,
  INITIAL_INSTALLMENTS,
  INITIAL_AUDIT_LOGS,
  MemberRecord,
  AssociateRecord,
  PaymentInstallment,
  PaymentStatus,
  AuditLogItem,
} from "@/lib/data/portalData";
import { NewsManager } from "@/components/portal/admin/NewsManager";
import { GalleryManager } from "@/components/portal/admin/GalleryManager";
import { useNewsEvents, useGalleryItems } from "@/lib/data/contentStore";
import {
  Shield,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  Search,
  Check,
  UserCheck,
  Building,
  FileCheck2,
  AlertCircle,
  TrendingUp,
  History,
  Lock,
  ArrowRight,
  Filter,
  PlusCircle,
  FileSpreadsheet,
  BadgeCheck,
  Newspaper,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminPortalPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("payments");

  const { news } = useNewsEvents();
  const { gallery } = useGalleryItems();

  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [associates, setAssociates] = useState<AssociateRecord[]>(INITIAL_ASSOCIATES);
  const [installments, setInstallments] = useState<PaymentInstallment[]>(INITIAL_INSTALLMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const [searchQuery, setSearchQuery] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState<string>("ALL");

  // Assign Associate Modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);
  const [chosenAssociateId, setChosenAssociateId] = useState(associates[0]?.id || "");

  // 1-Click Admin Final Confirmation (🔴 RED)
  const handleAdminConfirmPayment = (instId: string) => {
    const targetInst = installments.find((i) => i.id === instId);
    if (!targetInst) return;

    const adminName = currentUser?.name || "Rajeshwar Sharma";

    setInstallments((prev) =>
      prev.map((inst) =>
        inst.id === instId
          ? {
            ...inst,
            status: "ADMIN_CONFIRMED" as PaymentStatus, // 🔴 Red
            adminConfirmedAt: `Today by Central Accounts (${adminName})`,
            remarks: "Final administrative verification sealed and recorded into general ledger.",
          }
          : inst
      )
    );

    // Append to audit log
    const newAudit: AuditLogItem = {
      id: `AUD-${(auditLogs.length + 1).toString().padStart(4, "0")}`,
      timestamp: "Just now",
      action: "Admin Final Confirmation",
      performedBy: `${adminName} (Admin)`,
      target: `Installment #${targetInst.installmentNo} for ${targetInst.memberName} (₹${targetInst.amount.toLocaleString("en-IN")})`,
      statusBadge: "ADMIN_CONFIRMED",
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Open Assign Associate Modal
  const handleOpenAssign = (mem: MemberRecord) => {
    setSelectedMember(mem);
    setChosenAssociateId(mem.assignedAssociateId || associates[0]?.id || "");
    setAssignModalOpen(true);
  };

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    const targetAssociate = associates.find((a) => a.id === chosenAssociateId);
    if (!targetAssociate) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === selectedMember.id
          ? {
            ...m,
            assignedAssociateId: targetAssociate.id,
            assignedAssociateName: targetAssociate.name,
          }
          : m
      )
    );

    const newAudit: AuditLogItem = {
      id: `AUD-${(auditLogs.length + 2).toString().padStart(4, "0")}`,
      timestamp: "Just now",
      action: "Associate Assigned",
      performedBy: `${currentUser?.name || "Admin"} (Admin Portal)`,
      target: `${selectedMember.name} allocated to ${targetAssociate.name} (${targetAssociate.badgeNumber})`,
      statusBadge: "SUCCESS",
    };
    setAuditLogs((prev) => [newAudit, ...prev]);

    setAssignModalOpen(false);
  };

  const handleContentAuditLog = (action: string, target: string) => {
    const adminName = currentUser?.name || "Rajeshwar Sharma";
    const newAudit: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-6)}`,
      timestamp: "Just now",
      action: action,
      performedBy: `${adminName} (ADMIN)`,
      target: target,
      statusBadge: "SUCCESS",
    };
    setAuditLogs((prev) => [newAudit, ...prev]);
  };

  // Filtered lists
  const filteredInstallments = installments.filter((i) => {
    if (pipelineFilter !== "ALL" && i.status !== pipelineFilter) return false;
    if (
      searchQuery &&
      !i.memberName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !i.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !i.utrReference?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pendingAdminActionCount = installments.filter(
    (i) => i.status === "ASSOCIATE_VERIFIED" || i.status === "MEMBER_APPROVED"
  ).length;

  return (
    <PortalShell currentRole="ADMIN">
      <div className="flex flex-col gap-6">
        {/* Executive Overview Banner */}
        <div className="bg-gradient-to-r from-[#042421] via-[#073531] to-[#0e705b] rounded-3xl p-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-purple-200 border-purple-400/30 bg-purple-500/20 text-[11px] font-bold">
                  Super Admin Console
                </Badge>
                <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                  <Shield className="size-3.5" />
                  KMEW Central Governance
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Administrative Control Center
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm mt-1">
                Operational overview, 4-tier financial audit pipeline, member allocation, and field associate supervision.
              </p>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary" className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white border-white/20 text-xs font-semibold gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Ledger Synchronized
              </Badge>
            </div>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-800/80">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Registered Members</div>
              <div className="text-2xl font-black text-white mt-0.5">{members.length > 0 ? "1,248" : "0"}</div>
              <div className="text-[10px] text-emerald-300">+24 this month</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Active Field Officers</div>
              <div className="text-2xl font-black text-white mt-0.5">{associates.length}</div>
              <div className="text-[10px] text-blue-300">Across 16 Wards</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-amber-200 uppercase font-semibold">Awaiting Final Red Lock</div>
              <div className="text-2xl font-black text-amber-300 mt-0.5">{pendingAdminActionCount}</div>
              <div className="text-[10px] text-amber-200">Requires Admin Confirmation</div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Aid Managed & Sealed</div>
              <div className="text-2xl font-black text-white mt-0.5">₹48.6 L</div>
              <div className="text-[10px] text-emerald-300">100% Audit Tracked</div>
            </div>
          </div>
        </div>

        {/* Shadcn UI Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-4">
          <TabsList className="bg-slate-200/80 p-1 rounded-xl flex-wrap h-auto gap-1">
            <TabsTrigger value="payments" className="text-xs font-bold gap-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>4-Tier Financial Pipeline</span>
              {pendingAdminActionCount > 0 && (
                <Badge variant="destructive" className="h-5 px-1.5 text-[10px] font-extrabold rounded-full">
                  {pendingAdminActionCount}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="members" className="text-xs font-bold gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>Member Directory</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold rounded-full">
                {members.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="associates" className="text-xs font-bold gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Associate Network</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold rounded-full">
                {associates.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="news" className="text-xs font-bold gap-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>News & Events</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold rounded-full">
                {news.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="gallery" className="text-xs font-bold gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold rounded-full">
                {gallery.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger value="audit" className="text-xs font-bold gap-2">
              <History className="w-3.5 h-3.5" />
              <span>Audit Ledger</span>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold rounded-full">
                {auditLogs.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: 4-Tier Financial Pipeline */}
          <TabsContent value="payments" className="space-y-4">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900 tracking-tight">
                      Financial Verification Pipeline (PRD Section 15)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Manage the 4-tier lifecycle: 🟡 Member Paid → 🔵 Associate Verified → 🟢 Member Approved → 🔴 Admin Confirmed.
                    </CardDescription>
                  </div>

                  {/* Status Filter Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {[
                      { label: "All", value: "ALL", color: "" },
                      { label: "Member Paid", value: "MEMBER_PAID", color: "bg-amber-500" },
                      { label: "Associate Verified", value: "ASSOCIATE_VERIFIED", color: "bg-blue-600" },
                      { label: "Member Approved", value: "MEMBER_APPROVED", color: "bg-emerald-600" },
                      { label: "Admin Confirmed", value: "ADMIN_CONFIRMED", color: "bg-rose-600" },
                    ].map((chip) => (
                      <Button
                        key={chip.value}
                        type="button"
                        size="sm"
                        variant={pipelineFilter === chip.value ? "default" : "outline"}
                        onClick={() => setPipelineFilter(chip.value)}
                        className={`h-7 px-2.5 text-xs font-semibold rounded-lg gap-1.5 ${pipelineFilter === chip.value
                          ? "bg-[#0e705b] hover:bg-[#0a544b] text-white"
                          : "text-slate-600 hover:text-slate-900"
                          }`}
                      >
                        {chip.color && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${pipelineFilter === chip.value ? "bg-white" : chip.color
                              }`}
                          />
                        )}
                        {chip.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="text-[11px] font-semibold text-slate-500 uppercase">
                        <TableHead>Beneficiary & ID</TableHead>
                        <TableHead>Tranche & Amount</TableHead>
                        <TableHead>Assigned Associate</TableHead>
                        <TableHead>Payment Lifecycle Status</TableHead>
                        <TableHead className="text-right">Administrative Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                      {filteredInstallments.map((inst) => {
                        const isReadyForAdminConfirm =
                          inst.status === "ASSOCIATE_VERIFIED" || inst.status === "MEMBER_APPROVED";
                        const isConfirmed = inst.status === "ADMIN_CONFIRMED";

                        return (
                          <TableRow key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                            <TableCell className="py-3">
                              <div className="flex items-center gap-3">
                                <Avatar size="sm">
                                  <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-xs">
                                    {inst.memberName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-bold text-slate-900">{inst.memberName}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">{inst.memberId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <div className="font-bold text-slate-900">
                                ₹{inst.amount.toLocaleString("en-IN")}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                Tranche #{inst.installmentNo} of {inst.totalInstallments} • {inst.paymentMode || "UPI"}
                              </div>
                              {inst.utrReference && (
                                <div className="text-[10px] text-slate-400 font-mono">{inst.utrReference}</div>
                              )}
                            </TableCell>
                            <TableCell className="py-3">
                              <span className="font-semibold text-slate-800 block">{inst.associateName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{inst.associateId}</span>
                            </TableCell>
                            <TableCell className="py-3">
                              <StatusBadge status={inst.status} size="sm" />
                              {inst.adminConfirmedAt && (
                                <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                                  {inst.adminConfirmedAt}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="py-3 text-right">
                              {isReadyForAdminConfirm && (
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => handleAdminConfirmPayment(inst.id)}
                                  className="h-8 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs gap-1.5 ml-auto"
                                  title="Perform final administrative check and seal in ledger"
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Admin Confirm</span>
                                </Button>
                              )}

                              {isConfirmed && (
                                <span className="text-xs text-rose-700 font-bold inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Confirmed & Sealed
                                </span>
                              )}

                              {inst.status === "MEMBER_PAID" && (
                                <span className="text-[11px] text-amber-700 font-medium">
                                  Awaiting Associate Field Check
                                </span>
                              )}

                              {inst.status === "PENDING" && (
                                <span className="text-[11px] text-slate-400">Scheduled Due</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: Member Management */}
          <TabsContent value="members" className="space-y-4">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Member Directory & Allocation</CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Review applicant KYC, monitor aid progress, and assign field associates to wards.
                    </CardDescription>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <Input
                      type="text"
                      placeholder="Search beneficiary..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-xs"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50/80">
                      <TableRow className="text-[11px] font-semibold text-slate-500 uppercase">
                        <TableHead>Beneficiary</TableHead>
                        <TableHead>Program & Ward</TableHead>
                        <TableHead>KYC Status</TableHead>
                        <TableHead>Assigned Associate</TableHead>
                        <TableHead>Aid Approved</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-xs">
                      {members.map((m) => (
                        <TableRow key={m.id} className="hover:bg-slate-50/80 transition-colors">
                          <TableCell className="py-3">
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
                          <TableCell className="py-3">
                            <span className="font-semibold text-slate-800 block">{m.category}</span>
                            <span className="text-[11px] text-slate-500">{m.ward}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            {m.kycStatus === "VERIFIED" ? (
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-[10px] font-bold">
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-[10px] font-bold">
                                Pending Review
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-3">
                            {m.assignedAssociateName ? (
                              <div>
                                <span className="font-semibold text-slate-800">{m.assignedAssociateName}</span>
                                <span className="text-[10px] text-slate-400 block font-mono">{m.assignedAssociateId}</span>
                              </div>
                            ) : (
                              <span className="text-rose-600 font-bold text-[11px]">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell className="py-3 font-bold text-slate-900">
                            ₹{m.aidAmount.toLocaleString("en-IN")}
                            <span className="text-[10px] text-slate-400 block font-normal">
                              {m.completedInstallments} / {m.installmentsCount} Tranches
                            </span>
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleOpenAssign(m)}
                              className="h-8 bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs rounded-xl shadow-xs"
                            >
                              {m.assignedAssociateName ? "Reassign" : "Assign Associate"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: Associate Network */}
          <TabsContent value="associates" className="flex flex-col gap-4">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Field Associate Network</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Performance tracking, member assignment distribution, and ward coverage.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {associates.map((asc) => (
                    <Card key={asc.id} className="border-slate-200 bg-slate-50/60 shadow-xs">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar size="default">
                              <AvatarFallback className="bg-blue-100 text-blue-800 font-bold text-xs">
                                {asc.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Badge variant="outline" className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 border-blue-200">
                                {asc.badgeNumber}
                              </Badge>
                              <CardTitle className="text-base font-bold text-slate-900 mt-1">{asc.name}</CardTitle>
                              <p className="text-xs text-slate-500">{asc.phone}</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold hover:bg-emerald-200">
                            {asc.status}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-2 text-xs">
                        <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Assigned Members:</span>
                            <strong className="text-slate-800">{asc.assignedMembersCount}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Total Collections:</span>
                            <strong className="text-slate-800">₹{asc.totalCollections.toLocaleString("en-IN")}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Field Rating:</span>
                            <strong className="text-emerald-700">{asc.rating} ★</strong>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                          <span className="text-slate-400 block uppercase font-semibold text-[9px]">Coverage Wards:</span>
                          {asc.assignedWards.join(", ")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: Audit & Activity Ledger */}
          <TabsContent value="audit" className="flex flex-col gap-4">
            <Card className="border-slate-200 shadow-xs">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Immutable Audit Ledger</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Certified audit trail recording every state change, associate verification, and administrative confirmation.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.action}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({log.id})</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{log.target}</p>
                        <span className="text-[10px] text-slate-400">By {log.performedBy} • {log.timestamp}</span>
                      </div>

                      <StatusBadge status={log.statusBadge} size="sm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: News & Events Management */}
          <TabsContent value="news" className="flex flex-col gap-4">
            <NewsManager onAuditLog={handleContentAuditLog} />
          </TabsContent>

          {/* TAB 6: Photo Gallery Management */}
          <TabsContent value="gallery" className="flex flex-col gap-4">
            <GalleryManager onAuditLog={handleContentAuditLog} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Assign Associate Dialog */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">Assign Field Associate</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Beneficiary: <strong>{selectedMember?.name}</strong> ({selectedMember?.ward})
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveAssignment} className="space-y-4 text-xs mt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-2">Select Field Associate</label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {associates.map((asc) => (
                  <label
                    key={asc.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${chosenAssociateId === asc.id
                      ? "border-[#0e705b] bg-emerald-50/70"
                      : "border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="associate"
                      value={asc.id}
                      checked={chosenAssociateId === asc.id}
                      onChange={() => setChosenAssociateId(asc.id)}
                      className="mt-1 accent-[#0e705b]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{asc.name}</span>
                        <span className="text-[10px] text-blue-700 font-mono">{asc.badgeNumber}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Coverage: {asc.assignedWards.join(", ")}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        {asc.assignedMembersCount} active members assigned
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAssignModalOpen(false)}
                className="flex-1 rounded-xl font-bold text-slate-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl font-bold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-xs"
              >
                Confirm Allocation
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
