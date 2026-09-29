"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowRight,
  Briefcase,
  MapPin,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { validatePhoneNumber } from "@/lib/utils";

export default function AssociateRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    streetAddress: "",
    city: "Kulti",
    state: "West Bengal",
    pincode: "713343",
    occupation: "Community Educator",
    yearsOfExperience: "3-5 years",
    serviceArea: "Kulti Municipal Area",
    motivation: "",
    docUploaded: false,
    docFileName: "",
    consentTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.mobileNumber.trim() || !validatePhoneNumber(formData.mobileNumber)) {
      errs.mobileNumber = "Enter a valid 10-digit mobile number.";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    if (!formData.streetAddress.trim()) errs.streetAddress = "Street address is required.";
    if (!formData.serviceArea.trim()) errs.serviceArea = "Target service area is required.";
    if (!formData.docUploaded) errs.docUploaded = "Please upload an identity or experience document.";
    if (!formData.consentTerms) errs.consentTerms = "You must agree to the Associate code of conduct.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `KMEW-ASC-2026-${randomCode}`;
    setApplicationRef(ref);
    setSubmitted(true);
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        docUploaded: true,
        docFileName: file.name
      });
      setErrors((prev) => ({ ...prev, docUploaded: "" }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Associate Application: UNDER_REVIEW
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Associate Application Submitted!
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your application to join KMEW as a verified Associate has been logged.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Associate Reference ID
            </span>
            <div className="text-2xl font-mono font-black text-blue-900">
              {applicationRef}
            </div>
            <p className="text-[11px] text-slate-500">
              Assigned Region: {formData.serviceArea}
            </p>
          </div>

          <div className="text-left bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-xs text-blue-950 space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-blue-900">
              Associate Onboarding Procedure (PRD Section 11):
            </h4>
            <div className="space-y-1.5">
              <p>• KMEW Central Administration will verify your community service background and credentials.</p>
              <p>• Once approved, you will receive an orientation kit and access to the dedicated Associate Field Portal.</p>
              <p>• You will be empowered to accept member mentorship assignments and conduct ground verifications.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white shadow-md transition-colors"
            >
              Go to Portal Login
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-700" />
            <span>Community Field Network (PRD Section 11)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Register as a KMEW Associate
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Associates are mentors and field representatives who guide members, formulate transparent payment plans, and perform on-the-ground verifications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-900" />
              <span>Personal & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Bikram Das"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "") })}
                  placeholder="10-digit mobile"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                {errors.mobileNumber && <p className="text-xs text-rose-500">{errors.mobileNumber}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="associate@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Password (Min 8 chars) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-rose-500">{errors.password}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                {errors.confirmPassword && <p className="text-xs text-rose-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Professional Background & Service Area */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-900" />
              <span>Service Area & Professional Experience</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Proposed Service Area / Ward <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.serviceArea}
                  onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Kulti Municipal Area">Kulti Municipal Area</option>
                  <option value="Barakar & Border Belt">Barakar & Border Belt</option>
                  <option value="Sitarampur & Neamatpur">Sitarampur & Neamatpur</option>
                  <option value="Asansol Central">Asansol Central</option>
                  <option value="Salanpur Rural Block">Salanpur Rural Block</option>
                  <option value="Raniganj / Durgapur Region">Raniganj / Durgapur Region</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Current Occupation</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. Teacher, Social Worker, Retired Officer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Residential Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  placeholder="Full local address"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
                {errors.streetAddress && <p className="text-xs text-rose-500">{errors.streetAddress}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Relevant Experience / Motivation to Serve
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Briefly describe your community involvement or previous social work..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700">
                Upload Identity / Address Proof (Aadhaar / Voter ID / Utility Bill) <span className="text-rose-500">*</span>
              </label>
              <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
                <Upload className="w-8 h-8 text-blue-900 mb-2" />
                <span className="text-xs font-bold text-slate-800">
                  {formData.docUploaded ? `Selected: ${formData.docFileName}` : "Click to select or drag & drop document"}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  PDF, JPG, or PNG (Max 5MB)
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocUpload}
                  className="hidden"
                />
              </label>
              {errors.docUploaded && <p className="text-xs text-rose-500">{errors.docUploaded}</p>}
            </div>
          </div>

          {/* Consent */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consentTerms}
                onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                className="w-4 h-4 rounded text-blue-900 mt-0.5"
              />
              <span className="text-xs text-slate-700">
                I agree to the KMEW Associate Code of Conduct, confirm that all information is accurate, and pledge to uphold financial honesty and member privacy.
              </span>
            </label>
            {errors.consentTerms && <p className="text-xs text-rose-500 ml-7">{errors.consentTerms}</p>}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Submit Associate Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
