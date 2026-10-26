"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building,
  QrCode,
  IndianRupee,
  Lock,
  ArrowRight,
  Maximize2,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CreditCard,
  Eye,
  BadgePercent,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { useSiteContent, DEFAULT_DONATE_CONTENT } from "@/lib/data/siteContentStore";

export default function DonatePage() {
  const { content: donateContent } = useSiteContent("donate");
  const content = donateContent || DEFAULT_DONATE_CONTENT;

  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCause, setSelectedCause] = useState("Scholarship Fund");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activePaymentTab, setActivePaymentTab] = useState<"qr" | "bank" | "passbook">("qr");

  // Modal zoom states
  const [isQrZoomOpen, setIsQrZoomOpen] = useState(false);
  const [isPassbookZoomOpen, setIsPassbookZoomOpen] = useState(false);

  const amountPresets = [1000, 2500, 5000, 10000, 25000];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const taxBenefit = Math.round(currentAmount * 0.5); // 50% deduction under Section 80G

  const copyToClipboard = (text: string, field: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Support KMEW Initiatives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {content.title || "Invest in Education, Transform Lives"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {content.subtitle ||
              "All donations to KMEW are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act. 100% transparent and digitally audited."}
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Donation Calculation and Cause Selector */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                1. Select Program to Support
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  "Scholarship Fund",
                  "Evening Tuition Centers",
                  "Women Vocational Kits",
                  "Swasthya Kalyan Health",
                ].map((cause) => (
                  <button
                    key={cause}
                    type="button"
                    onClick={() => setSelectedCause(cause)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedCause === cause
                        ? "bg-[#0e705b] text-white border-[#0e705b] shadow-xs"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    {cause}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Presets */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                2. Choose Support Amount (INR)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {amountPresets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? "bg-amber-400 text-slate-950 border-amber-400 shadow-xs"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="mt-3 relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Or enter custom amount in Rupees"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0e705b] focus:ring-1 focus:ring-[#0e705b] outline-hidden"
                />
              </div>
            </div>

            {/* 80G Tax Benefit Summary Box */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-950">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Section 80G Tax Benefit (50% Deduction):</span>
                </span>
                <span className="text-base text-emerald-700 font-extrabold">
                  {formatCurrency(taxBenefit)}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-tight">
                {content.taxExemptionNote ||
                  `For an Indian taxpayer in the 30% tax slab, a contribution of ${formatCurrency(
                    currentAmount
                  )} lowers taxable income by ${formatCurrency(taxBenefit)}.`}
              </p>
            </div>

            {/* Impact Promise */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <BadgePercent className="w-3.5 h-3.5 text-[#0e705b]" />
                Your {formatCurrency(currentAmount)} Impact:
              </h4>
              <p>
                • Directly funds educational fees, books, tuition materials, or health aid for
                underprivileged beneficiaries under <strong>{selectedCause}</strong>.
              </p>
              <p>
                • You will receive an official digitally signed <strong>Section 80G Tax Exemption Certificate</strong>{" "}
                dispatched to your email after transfer confirmation.
              </p>
            </div>

            {/* Quick verification trust badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 text-[11px] text-slate-600">
              <Building className="w-4 h-4 text-slate-700 shrink-0" />
              <div>
                <span className="font-bold text-slate-800">Verified NGO Account: </span>
                <span>{content.bankName} • Asansol Branch</span>
              </div>
            </div>
          </div>

          {/* Right: Payment Channels (QR Code, Bank Details, Passbook Proof) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Payment Method Selector Tabs */}
            <div className="bg-slate-200/80 p-1 rounded-2xl grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => setActivePaymentTab("qr")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === "qr"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>UPI QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePaymentTab("bank")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === "bank"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePaymentTab("passbook")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === "passbook"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Passbook Proof</span>
              </button>
            </div>

            {/* TAB 1: UPI QR CODE */}
            {activePaymentTab === "qr" && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Instant Zero-Fee Transfer
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      Scan & Pay via any UPI App
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    Direct Official QR
                  </span>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="relative group shrink-0">
                    <div className="w-48 h-48 sm:w-44 sm:h-44 bg-white p-2 rounded-xl border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-md">
                      {content.qrCodeImage ? (
                        <img
                          src={content.qrCodeImage}
                          alt="Official UPI QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-3 text-slate-400 text-xs">
                          <QrCode className="w-10 h-10 mx-auto text-slate-500 mb-1" />
                          <span>QR Code Not Set</span>
                        </div>
                      )}
                    </div>
                    {content.qrCodeImage && (
                      <button
                        type="button"
                        onClick={() => setIsQrZoomOpen(true)}
                        className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center gap-1 text-white text-xs font-bold"
                      >
                        <Maximize2 className="w-5 h-5 text-amber-400" />
                        <span>Enlarge QR</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 text-left w-full">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Account / Beneficiary Name
                      </span>
                      <p className="text-xs font-bold text-white leading-snug">
                        {content.accountName}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div className="overflow-hidden pr-2">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          Official UPI Handle
                        </span>
                        <span className="font-mono font-bold text-amber-400 text-xs sm:text-sm truncate block">
                          {content.upiId}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(content.upiId, "upi_tab")}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
                        title="Copy UPI ID"
                      >
                        {copiedField === "upi_tab" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Compatible with <strong>Google Pay</strong>, <strong>PhonePe</strong>,{" "}
                      <strong>Paytm</strong>, <strong>BHIM</strong>, and <strong>SBI YONO</strong>.
                    </div>
                  </div>
                </div>

                {content.qrCodeImage && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsQrZoomOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to view full screen QR code</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: BANK WIRE / NEFT / IMPS */}
            {activePaymentTab === "bank" && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    Direct Bank Wire / NEFT / IMPS / RTGS
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Official KMEW Bank Account
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* Account Name */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">
                        Account Name
                      </span>
                      <span className="font-semibold text-white text-xs sm:text-sm">
                        {content.accountName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(content.accountName, "name")}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                      title="Copy Name"
                    >
                      {copiedField === "name" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">
                        Account Number
                      </span>
                      <span className="font-mono font-bold text-amber-400 text-sm sm:text-base tracking-wider">
                        {content.accountNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(content.accountNumber, "acc")}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedField === "acc" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* IFSC Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">
                          IFSC Code
                        </span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          {content.ifscCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(content.ifscCode, "ifsc")}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                        title="Copy IFSC"
                      >
                        {copiedField === "ifsc" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">
                          Account Type
                        </span>
                        <span className="font-semibold text-white text-xs">
                          {content.accountType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bank & Branch Details */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Bank & Branch
                    </span>
                    <p className="font-semibold text-white text-xs leading-snug">
                      {content.bankName}
                    </p>
                    <p className="text-[11px] text-slate-400">{content.branch}</p>
                  </div>

                  {/* Additional Verification Codes */}
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {content.cifNumber && (
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 text-[9px] uppercase font-bold block">
                          CIF No.
                        </span>
                        <span className="font-mono text-white text-[11px] font-semibold">
                          {content.cifNumber}
                        </span>
                      </div>
                    )}
                    {content.micrCode && (
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 text-[9px] uppercase font-bold block">
                          MICR Code
                        </span>
                        <span className="font-mono text-white text-[11px] font-semibold">
                          {content.micrCode}
                        </span>
                      </div>
                    )}
                    {content.panNumber && (
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 text-[9px] uppercase font-bold block">
                          Org PAN
                        </span>
                        <span className="font-mono text-amber-400 text-[11px] font-semibold">
                          {content.panNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PASSBOOK PROOF DOCUMENT */}
            {activePaymentTab === "passbook" && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Official Verification Document
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      SBI Bank Passbook Proof
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    Bank Certified
                  </span>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => setIsPassbookZoomOpen(true)}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-950"
                  >
                    {content.passbookImage ? (
                      <img
                        src={content.passbookImage}
                        alt="KMEW SBI Bank Passbook"
                        className="w-full max-h-60 object-contain mx-auto transition-transform group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        <FileText className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                        <span>Passbook document image not uploaded yet.</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                      <Maximize2 className="w-4 h-4 text-emerald-400" />
                      <span>Click to enlarge passbook details</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    This official State Bank of India document validates KMEW’s bank accounts,
                    ensuring that 100% of your contributions directly reach the NGO welfare fund with
                    zero intermediary risk.
                  </p>
                </div>
              </div>
            )}

            {/* Instruction Footer Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Mail className="w-4 h-4 text-[#0e705b]" />
                <span>Next Step for 80G Tax Exemption Receipt:</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {content.instructionsNote ||
                  "After completing your transfer, kindly email your transaction UTR / Reference number & PAN to donate@kmew.org.in or WhatsApp to receive your Section 80G digital receipt."}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                {content.supportEmail && (
                  <a
                    href={`mailto:${content.supportEmail}`}
                    className="inline-flex items-center gap-1 font-bold text-[#0e705b] hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{content.supportEmail}</span>
                  </a>
                )}
                {content.supportPhone && (
                  <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Support: {content.supportPhone}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Enlarge QR Code */}
      <Dialog open={isQrZoomOpen} onOpenChange={setIsQrZoomOpen}>
        <DialogContent className="sm:max-w-md bg-slate-950 text-white border-slate-800 p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-black text-white">
              Scan to Donate via UPI
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Open any UPI application (GPay, PhonePe, Paytm, BHIM, SBI YONO) and scan the code.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl my-2">
            {content.qrCodeImage && (
              <img
                src={content.qrCodeImage}
                alt="Enlarged UPI QR Code"
                className="max-h-72 w-auto object-contain"
              />
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">UPI ID</span>
              <span className="font-mono font-bold text-amber-400">{content.upiId}</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(content.upiId, "modal_upi")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5"
            >
              {copiedField === "modal_upi" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL: Enlarge Passbook Document */}
      <Dialog open={isPassbookZoomOpen} onOpenChange={setIsPassbookZoomOpen}>
        <DialogContent className="sm:max-w-3xl bg-slate-950 text-white border-slate-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-400" />
              <span>Official SBI Bank Passbook Document</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Verified banking identity of Kulti Maharaja Educational Welfare Organization.
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-auto max-h-[75vh]">
            {content.passbookImage && (
              <img
                src={content.passbookImage}
                alt="Enlarged Passbook"
                className="w-full h-auto object-contain rounded-xl"
              />
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
            <div className="p-2 rounded-lg bg-slate-900">
              <span className="text-[10px] text-slate-400 block font-bold">A/C No.</span>
              <span className="font-mono text-amber-400 font-bold">{content.accountNumber}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900">
              <span className="text-[10px] text-slate-400 block font-bold">IFSC</span>
              <span className="font-mono text-emerald-400 font-bold">{content.ifscCode}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900">
              <span className="text-[10px] text-slate-400 block font-bold">Branch</span>
              <span className="text-white truncate block">{content.branch}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900">
              <span className="text-[10px] text-slate-400 block font-bold">Org PAN</span>
              <span className="font-mono text-white font-bold">{content.panNumber}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
