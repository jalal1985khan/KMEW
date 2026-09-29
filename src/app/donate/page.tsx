"use client";

import { useState } from "react";
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
  ArrowRight
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCause, setSelectedCause] = useState("Scholarship Fund");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const amountPresets = [1000, 2500, 5000, 10000, 25000];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const taxBenefit = Math.round(currentAmount * 0.5); // 50% deduction under Section 80G

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Support KMEW Initiatives</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Invest in Education, Transform Lives
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            All donations to KMEW are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act. 100% transparent and digitally audited.
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Donation Calculation and Cause Selector */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
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
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${selectedCause === cause
                        ? "bg-blue-900 text-white border-blue-900 shadow-xs"
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
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${selectedAmount === amt && !customAmount
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
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Or enter custom amount in Rupees"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
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
                <span className="text-base text-emerald-700">
                  {formatCurrency(taxBenefit)}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-tight">
                For an Indian taxpayer in the 30% tax slab, a contribution of {formatCurrency(currentAmount)} lowers taxable income by {formatCurrency(taxBenefit)}, saving up to {formatCurrency(Math.round(taxBenefit * 0.312))} in taxes.
              </p>
            </div>

            {/* Impact Promise */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Your {formatCurrency(currentAmount)} Impact:
              </h4>
              <p>
                • Directly funds educational fees, books, or coaching materials for deserving students.
              </p>
              <p>
                • You will receive an official digitally signed 80G Tax Exemption Certificate via email within 24 hours of transfer receipt.
              </p>
            </div>
          </div>

          {/* Right: Bank Transfer & UPI Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Bank Wire / NEFT / IMPS
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Official KMEW Bank Account
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Account Name */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Name</span>
                    <span className="font-semibold text-white">Kulti Maharaja Educational Welfare Org</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("Kulti Maharaja Educational Welfare Org", "name")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy Name"
                  >
                    {copiedField === "name" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Account Number */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Account Number</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">38491029384</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("38491029384", "acc")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy Account Number"
                  >
                    {copiedField === "acc" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* IFSC Code */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">IFSC Code</span>
                    <span className="font-mono font-bold text-white text-sm">SBIN0000123</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("SBIN0000123", "ifsc")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy IFSC"
                  >
                    {copiedField === "ifsc" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bank Name */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Bank & Branch</span>
                  <span className="font-semibold text-white">State Bank of India, Kulti Station Branch</span>
                </div>

                {/* UPI ID */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Official UPI Handle</span>
                    <span className="font-mono font-bold text-emerald-400">kmew@sbi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("kmew@sbi", "upi")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy UPI"
                  >
                    {copiedField === "upi" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 text-center">
                After completing transfer, kindly email transaction UTR & PAN to <strong>donate@kmew.org.in</strong> for formal 80G tax receipt dispatch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
