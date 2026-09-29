"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Building,
  GraduationCap,
  FileText,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  CreditCard
} from "lucide-react";
import { validateIFSC, validatePhoneNumber } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

export default function MemberRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal & Account
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "male",
    streetAddress: "",
    city: "Kulti",
    state: "West Bengal",
    pincode: "713343",

    // Step 2: Identification & Student Status (PRD Section 9)
    govIdType: "Aadhaar Card",
    govIdNumber: "",
    isStudent: "yes", // "yes" or "no"
    studentId: "",
    institutionName: "",
    courseName: "",

    // Step 3: Bank Details (PRD Section 9)
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",

    // Step 4: Photo & Declarations
    photoUploaded: false,
    photoFileName: "",
    govDocUploaded: false,
    govDocFileName: "",
    consentTerms: false,
    consentTruthful: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full legal name is required.";
    if (!formData.phoneNumber.trim() || !validatePhoneNumber(formData.phoneNumber)) {
      errs.phoneNumber = "Enter a valid 10-digit mobile number.";
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
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
      errs.pincode = "Enter a valid 6-digit PIN code.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.govIdNumber.trim()) {
      errs.govIdNumber = `${formData.govIdType} number is required.`;
    }
    if (formData.isStudent === "yes") {
      if (!formData.studentId.trim()) {
        errs.studentId = "Student ID or Roll Number is mandatory for student members.";
      }
      if (!formData.institutionName.trim()) {
        errs.institutionName = "School, College, or University name is required.";
      }
    }
    if (!formData.govDocUploaded) {
      errs.govDocUploaded = "Please upload supporting document for government ID.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.accountHolderName.trim()) {
      errs.accountHolderName = "Account holder name as per bank records is required.";
    }
    if (!formData.accountNumber.trim() || formData.accountNumber.length < 9) {
      errs.accountNumber = "Enter a valid bank account number.";
    }
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      errs.confirmAccountNumber = "Bank account numbers do not match.";
    }
    if (!formData.ifscCode.trim() || !validateIFSC(formData.ifscCode)) {
      errs.ifscCode = "Invalid IFSC Code. Must be 11 characters (e.g. SBIN0001234).";
    }
    if (!formData.bankName.trim()) {
      errs.bankName = "Bank name & branch are required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!formData.photoUploaded) {
      errs.photoUploaded = "Passport-size photograph is mandatory (PRD Section 9).";
    }
    if (!formData.consentTerms) {
      errs.consentTerms = "You must agree to KMEW Terms & Privacy Policy.";
    }
    if (!formData.consentTruthful) {
      errs.consentTruthful = "You must declare that all submitted information is accurate.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3 && validateStep3()) setCurrentStep(4);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    // Generate reference code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `KMEW-MBR-2026-${randomCode}`;
    setApplicationRef(ref);
    setSubmitted(true);
  };

  // Mock File Upload Handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        photoUploaded: true,
        photoFileName: file.name
      });
      setErrors((prev) => ({ ...prev, photoUploaded: "" }));
    }
  };

  const handleGovDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        govDocUploaded: true,
        govDocFileName: file.name
      });
      setErrors((prev) => ({ ...prev, govDocUploaded: "" }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Application Status: PENDING_REVIEW
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Registration Successfully Submitted!
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your Member application has been registered in the KMEW digital management system.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Application Reference Number
            </span>
            <div className="text-2xl font-mono font-black text-blue-950">
              {applicationRef}
            </div>
            <p className="text-[11px] text-blue-700">
              Please save this reference number for all future inquiries.
            </p>
          </div>

          {/* Next Steps per PRD Section 10 */}
          <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              What happens next? (PRD Section 10 Workflow)
            </h4>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>KMEW Administration will review your submitted documents within 2-3 working days.</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                <span>Upon approval, a dedicated local Associate will be assigned to your profile.</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                <span>Your assigned Associate will coordinate with you to create your scholarship or installment plan.</span>
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white shadow-md transition-colors"
            >
              Go to Member Portal Login
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>KMEW Member Enrollment (PRD Section 9)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Apply to Become a Member
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Register to access higher education scholarships, tuition center support, vocational training, and transparent installment aid.
          </p>
        </div>

        {/* Progress Tracker (4 Steps) */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { step: 1, label: "Personal" },
              { step: 2, label: "Identification" },
              { step: 3, label: "Bank Info" },
              { step: 4, label: "Photo & Consent" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${currentStep === s.step
                      ? "bg-blue-900 text-white shadow-md ring-4 ring-blue-100"
                      : currentStep > s.step
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                >
                  {currentStep > s.step ? <CheckCircle2 className="w-5 h-5" /> : `0${s.step}`}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 mt-2 truncate w-full">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
          {/* STEP 1: Personal & Account */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-900" />
                  <span>Step 1: Personal & Account Details</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provide your official identification details and create secure portal credentials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Legal Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Full Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name as per Government ID"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                  {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-semibold">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                      placeholder="9876543210"
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-xs text-rose-500">{errors.phoneNumber}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="member@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Password (Min 8 Characters) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-rose-500">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                  {errors.confirmPassword && <p className="text-xs text-rose-500">{errors.confirmPassword}</p>}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Street Address & Locality <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    placeholder="House/Plot No., Street, Landmark, Ward"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden"
                  />
                  {errors.streetAddress && <p className="text-xs text-rose-500">{errors.streetAddress}</p>}
                </div>

                {/* City, State, PIN */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">City / Municipality</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">PIN Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.pincode && <p className="text-xs text-rose-500">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Identification & Student Status */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-900" />
                  <span>Step 2: Government ID & Student Status</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  As required by KMEW PRD Section 9: Government ID and conditional Student verification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Government ID Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Government ID Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.govIdType}
                      onChange={(e) => setFormData({ ...formData, govIdType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="Voter ID">Voter ID (EPIC)</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>

                  {/* Government ID Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {formData.govIdType} Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.govIdNumber}
                      onChange={(e) => setFormData({ ...formData, govIdNumber: e.target.value.toUpperCase() })}
                      placeholder="e.g. 1234 5678 9012"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-hidden font-mono"
                    />
                    {errors.govIdNumber && <p className="text-xs text-rose-500">{errors.govIdNumber}</p>}
                  </div>
                </div>

                {/* Government ID Document Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Upload Government ID Proof (PDF / JPG / PNG) <span className="text-rose-500">*</span>
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
                    <Upload className="w-8 h-8 text-blue-900 mb-2" />
                    <span className="text-xs font-bold text-slate-800">
                      {formData.govDocUploaded ? `Uploaded: ${formData.govDocFileName}` : "Click to select or drag & drop document"}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Max file size 5MB • Stored securely in private encrypted storage
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleGovDocUpload}
                      className="hidden"
                    />
                  </label>
                  {errors.govDocUploaded && <p className="text-xs text-rose-500">{errors.govDocUploaded}</p>}
                </div>

                {/* Conditional Student Status Toggle (PRD Section 9.1) */}
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-blue-950 block">
                      Are you a Student? (PRD Requirement) <span className="text-rose-500">*</span>
                    </label>
                    <p className="text-xs text-blue-900 mt-0.5">
                      Students are eligible for higher education scholarships and tuition fee waivers.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="radio"
                        name="isStudent"
                        value="yes"
                        checked={formData.isStudent === "yes"}
                        onChange={() => setFormData({ ...formData, isStudent: "yes" })}
                        className="w-4 h-4 text-blue-900"
                      />
                      <span>Yes, I am a student</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="radio"
                        name="isStudent"
                        value="no"
                        checked={formData.isStudent === "no"}
                        onChange={() => setFormData({ ...formData, isStudent: "no" })}
                        className="w-4 h-4 text-blue-900"
                      />
                      <span>No, I am not a student</span>
                    </label>
                  </div>

                  {/* If Yes: Student ID is MANDATORY (PRD Section 9.1) */}
                  {formData.isStudent === "yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-blue-200/60 animate-in fade-in duration-150">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">
                          Student ID / Roll Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          placeholder="e.g. STU-2024-8841"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        />
                        {errors.studentId && <p className="text-xs text-rose-500">{errors.studentId}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">
                          School / College / University Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.institutionName}
                          onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                          placeholder="e.g. Kulti Degree College"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                        />
                        {errors.institutionName && <p className="text-xs text-rose-500">{errors.institutionName}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bank Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-900" />
                  <span>Step 3: Bank Account Information</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Required for direct scholarship disbursements, installment payouts, and transparent audit records.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Account Holder Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Account Holder Name (as per Bank Passbook) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    placeholder="Name exactly as printed on passbook"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.accountHolderName && <p className="text-xs text-rose-500">{errors.accountHolderName}</p>}
                </div>

                {/* Account Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Bank Account Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="e.g. 10293847561"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                  {errors.accountNumber && <p className="text-xs text-rose-500">{errors.accountNumber}</p>}
                </div>

                {/* Confirm Account Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Confirm Account Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.confirmAccountNumber}
                    onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="Re-enter bank account number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                  {errors.confirmAccountNumber && <p className="text-xs text-rose-500">{errors.confirmAccountNumber}</p>}
                </div>

                {/* IFSC Code with RBI Validation */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Bank IFSC Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={11}
                    required
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. SBIN0000123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase"
                  />
                  <span className="text-[10px] text-slate-400">11 characters (First 4 letters, 0, then 6 alphanumeric)</span>
                  {errors.ifscCode && <p className="text-xs text-rose-500">{errors.ifscCode}</p>}
                </div>

                {/* Bank & Branch Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Bank Name & Branch <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="e.g. State Bank of India, Kulti Branch"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  {errors.bankName && <p className="text-xs text-rose-500">{errors.bankName}</p>}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Banking identifiers are securely encrypted and protected against Insecure Direct Object References (IDOR). Only assigned Associates and Central Administration can verify payout transactions.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Photo & Declarations */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-900" />
                  <span>Step 4: Passport Photo & Member Declarations</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Finalize your application by uploading your passport photograph and accepting organizational policies.
                </p>
              </div>

              {/* Passport Photo Upload (PRD Section 9.1 mandatory) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Passport-size Photograph <span className="text-rose-500">* (Mandatory per PRD)</span>
                </label>
                <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50">
                  <Upload className="w-8 h-8 text-blue-900 mb-2" />
                  <span className="text-xs font-bold text-slate-800">
                    {formData.photoUploaded ? `Selected: ${formData.photoFileName}` : "Click to select or upload passport photo"}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Clear front-facing photo • JPG or PNG • Max 2MB
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {errors.photoUploaded && <p className="text-xs text-rose-500">{errors.photoUploaded}</p>}
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentTerms}
                    onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-900 mt-0.5"
                  />
                  <span className="text-xs text-slate-700">
                    I agree to the <Link href="/about#legal" className="text-blue-900 font-bold underline">KMEW Terms of Service</Link> and acknowledge the <Link href="/about#legal" className="text-blue-900 font-bold underline">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.consentTerms && <p className="text-xs text-rose-500 ml-7">{errors.consentTerms}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentTruthful}
                    onChange={(e) => setFormData({ ...formData, consentTruthful: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-900 mt-0.5"
                  />
                  <span className="text-xs text-slate-700">
                    I hereby declare that all details, Government ID documents, and bank details provided are true and accurate to the best of my knowledge.
                  </span>
                </label>
                {errors.consentTruthful && <p className="text-xs text-rose-500 ml-7">{errors.consentTruthful}</p>}
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>Continue to Step 0{currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Member Registration</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
