"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  ExternalLink,
  Eye,
  Search,
  Building,
  Scale,
  Award,
  Heart,
  ArrowRight,
  Maximize2,
  Copy,
  Check,
  BadgeCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useSiteContent,
  DEFAULT_LEGAL_CONTENT,
  type LegalDocument,
} from "@/lib/data/siteContentStore";

export default function LegalPage() {
  const { content: legalContent } = useSiteContent("legal");
  const content = legalContent || DEFAULT_LEGAL_CONTENT;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDoc, setActiveModalDoc] = useState<LegalDocument | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const categories = ["All", "Registration", "Tax Exemption", "Statutory"];

  const filteredDocuments = useMemo(() => {
    const list = content.documents || [];
    return list.filter((doc) => {
      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.documentNumber.toLowerCase().includes(q) ||
        doc.authority.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [content.documents, selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>Institutional Governance & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {content.title || "Legal & Regulatory Compliance Documents"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {content.subtitle ||
              "Kulti Maharaja Educational Welfare Organization operates with radical institutional integrity. Browse certified government society registrations, 12A/80G orders, and statutory tax filings below."}
          </p>
        </div>

        {/* 4 Quick Statutory Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Society Registration */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Society Registration
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(content.societyRegNumber || "S/2L/23211", "soc")
                }
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                title="Copy Registration Number"
              >
                {copiedKey === "soc" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="font-mono font-bold text-slate-900 text-sm">
              {content.societyRegNumber || "S/2L/23211 of 2014-2015"}
            </p>
            <p className="text-[11px] text-slate-500">
              West Bengal Societies Registration Act XXVI of 1961
            </p>
          </div>

          {/* Card 2: 12A / 80G Order */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                Income Tax Exemptions
              </span>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                12A & 80G
              </Badge>
            </div>
            <p className="font-mono font-bold text-emerald-800 text-sm">
              Section 12AA & 80G(5)
            </p>
            <p className="text-[11px] text-slate-500">
              50% Income Tax Deductions for Donors
            </p>
          </div>

          {/* Card 3: PAN Number */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Organization PAN
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(content.panNumber || "AACAK8634P", "pan")
                }
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                title="Copy PAN"
              >
                {copiedKey === "pan" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="font-mono font-bold text-amber-700 text-sm tracking-wider">
              {content.panNumber || "AACAK8634P"}
            </p>
            <p className="text-[11px] text-slate-500">
              Income Tax Department, Govt of India
            </p>
          </div>

          {/* Card 4: Registered Office */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Jurisdiction
            </span>
            <p className="font-semibold text-slate-900 text-xs leading-snug">
              Kulti, Paschim Bardhaman
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {content.registeredAddress || "PO Sitarampur, PS Kulti 713359"}
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#0e705b] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] sm:min-w-[280px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents or reg no..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0e705b] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Document Thumbnail with Hover Zoom */}
              <div
                onClick={() => setActiveModalDoc(doc)}
                className="relative h-56 bg-slate-100 border-b border-slate-100 flex items-center justify-center p-3 cursor-pointer overflow-hidden"
              >
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xs transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center text-slate-400 p-4">
                    <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <span className="text-xs">Document Scan Pending</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>Click to view full scan</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold border-0 shadow-xs">
                    {doc.category}
                  </Badge>
                </div>
              </div>

              {/* Document Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {doc.title}
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
                        Reg / Ref No:
                      </span>
                      <span className="font-mono font-semibold text-emerald-800 text-[11px] truncate">
                        {doc.documentNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
                        Authority:
                      </span>
                      <span className="truncate">{doc.authority}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
                        Date:
                      </span>
                      <span>{doc.issueDate}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 pt-1 border-t border-slate-100">
                    {doc.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>Certified</span>
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveModalDoc(doc)}
                    className="text-xs gap-1.5 h-8 text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Document</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-900 text-sm">No legal documents matched your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try choosing &quot;All&quot; or clearing your search term to see all statutory certificates.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs mt-2"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Bottom Transparency & Donation CTA Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Tax Deductible Contributions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Support KMEW with Complete Transparency & Section 80G Benefit
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every rupee donated is officially receipted with digital audit trails and eligible for 50%
              tax deduction under Section 80G of the Indian Income Tax Act.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm gap-2 transition-colors shadow-sm"
            >
              <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Donate to Welfare Fund</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              <span>Contact Trustees</span>
            </Link>
          </div>
        </div>
      </div>

      {/* DOCUMENT LIGHTBOX MODAL */}
      {activeModalDoc && (
        <Dialog open={!!activeModalDoc} onOpenChange={(open) => !open && setActiveModalDoc(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[92vh] flex flex-col p-0 gap-0 overflow-hidden bg-slate-950 text-white border-slate-800">
            {/* Header */}
            <div className="p-5 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{activeModalDoc.title}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 mt-0.5">
                  Issued by {activeModalDoc.authority} • Date: {activeModalDoc.issueDate}
                </DialogDescription>
              </div>

              {activeModalDoc.image && (
                <a
                  href={activeModalDoc.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size</span>
                </a>
              )}
            </div>

            {/* Document Image View */}
            <div className="p-4 sm:p-6 overflow-auto max-h-[65vh] flex items-center justify-center bg-slate-900/60">
              {activeModalDoc.image ? (
                <img
                  src={activeModalDoc.image}
                  alt={activeModalDoc.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl border border-slate-700 shadow-2xl"
                />
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <FileText className="w-16 h-16 mx-auto mb-2 text-slate-600" />
                  <p>Image scan not available.</p>
                </div>
              )}
            </div>

            {/* Document Details Footer */}
            <div className="p-4 px-6 border-t border-slate-800 bg-slate-950 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
              <div className="p-2 rounded-lg bg-slate-900">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Document ID
                </span>
                <span className="font-mono text-emerald-400 font-bold truncate block">
                  {activeModalDoc.documentNumber}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Category
                </span>
                <span className="text-white font-semibold block">{activeModalDoc.category}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Issue Date
                </span>
                <span className="text-white font-semibold block">{activeModalDoc.issueDate}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Verification
                </span>
                <span className="text-emerald-400 font-bold block">Certified Active</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
