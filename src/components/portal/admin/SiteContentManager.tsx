"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { ImagePickerInput } from "./ImagePickerInput";
import {
  useSiteContent,
  type HomepageContent,
  type AboutContent,
  type ProgramsContent,
  type DonateContent,
} from "@/lib/data/siteContentStore";
import { type ProgramItem } from "@/lib/data/kmewData";
import {
  Home,
  BookOpen,
  GraduationCap,
  Save,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  LayoutTemplate,
  Info,
  Users2,
  Building,
  Target,
  Award,
  CreditCard,
  QrCode,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

export function SiteContentManager() {
  const {
    content: homeContent,
    updateContent: updateHome,
    resetContent: resetHome,
  } = useSiteContent("homepage");

  const {
    content: aboutContent,
    updateContent: updateAbout,
    resetContent: resetAbout,
  } = useSiteContent("about");

  const {
    content: programsContent,
    updateContent: updatePrograms,
    resetContent: resetPrograms,
  } = useSiteContent("programs");

  const {
    content: donateContent,
    updateContent: updateDonate,
    resetContent: resetDonate,
  } = useSiteContent("donate");

  const [activeTab, setActiveTab] = useState<"homepage" | "about" | "programs" | "donate">("homepage");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Editable local copies
  const [homeForm, setHomeForm] = useState<HomepageContent>(homeContent);
  const [aboutForm, setAboutForm] = useState<AboutContent>(aboutContent);
  const [programsForm, setProgramsForm] = useState<ProgramsContent>(programsContent);
  const [donateForm, setDonateForm] = useState<DonateContent>(donateContent);

  // Sync when hook finishes initial fetch or updates
  useEffect(() => {
    setHomeForm(homeContent);
    setAboutForm(aboutContent);
    setProgramsForm(programsContent);
    setDonateForm(donateContent);
  }, [homeContent, aboutContent, programsContent, donateContent]);

  // Modal states for Programs
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  // Modal states for Success Stories
  const [editingStoryIndex, setEditingStoryIndex] = useState<number | null>(null);
  const [storyForm, setStoryForm] = useState({
    name: "",
    role: "",
    location: "",
    quote: "",
    image: "",
    course: "",
  });
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  // Modal states for Leadership Team
  const [editingLeaderIndex, setEditingLeaderIndex] = useState<number | null>(null);
  const [leaderForm, setLeaderForm] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
  });
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);

  const handleSaveHomepage = async () => {
    setIsSaving(true);
    const res = await updateHome(homeForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      setSaveStatus("Homepage content successfully saved to live database!");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleSaveAbout = async () => {
    setIsSaving(true);
    const res = await updateAbout(aboutForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      setSaveStatus("About page content successfully saved to live database!");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleSavePrograms = async () => {
    setIsSaving(true);
    const res = await updatePrograms(programsForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      setSaveStatus("Programs directory successfully saved to live database!");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleSaveDonate = async () => {
    setIsSaving(true);
    const res = await updateDonate(donateForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      setSaveStatus("Donation & Bank Details successfully saved and published to live website!");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Program Modal Helpers
  const handleOpenAddProgram = () => {
    setEditingProgram({
      id: `program-${Date.now()}`,
      title: "",
      category: "Education",
      shortDescription: "",
      detailedDescription: "",
      image: "/programs/education.png",
      objectives: [""],
      eligibility: [""],
      impactStats: "0+ Beneficiaries",
      status: "Active",
      color: "from-blue-600 to-indigo-700",
    });
    setIsProgramModalOpen(true);
  };

  const handleSaveProgramModal = () => {
    if (!editingProgram || !editingProgram.title.trim()) return;

    const existingIndex = programsForm.programsList.findIndex(
      (p) => p.id === editingProgram.id
    );

    let updatedList = [...programsForm.programsList];
    if (existingIndex >= 0) {
      updatedList[existingIndex] = editingProgram;
    } else {
      updatedList = [editingProgram, ...updatedList];
    }

    const updated = { ...programsForm, programsList: updatedList };
    setProgramsForm(updated);
    updatePrograms(updated);
    setIsProgramModalOpen(false);
    setSaveStatus(`Program "${editingProgram.title}" updated!`);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteProgram = (id: string) => {
    if (!confirm("Are you sure you want to delete this program from the directory?")) return;
    const updatedList = programsForm.programsList.filter((p) => p.id !== id);
    const updated = { ...programsForm, programsList: updatedList };
    setProgramsForm(updated);
    updatePrograms(updated);
  };

  // Story Helpers
  const handleOpenEditStory = (index: number) => {
    setEditingStoryIndex(index);
    setStoryForm(homeForm.successStories[index]);
    setIsStoryModalOpen(true);
  };

  const handleSaveStoryModal = () => {
    let updatedStories = [...homeForm.successStories];
    if (editingStoryIndex !== null) {
      updatedStories[editingStoryIndex] = storyForm;
    } else {
      updatedStories.push(storyForm);
    }
    const updatedHome = { ...homeForm, successStories: updatedStories };
    setHomeForm(updatedHome);
    updateHome(updatedHome);
    setIsStoryModalOpen(false);
  };

  // Leader Helpers
  const handleOpenEditLeader = (index: number) => {
    setEditingLeaderIndex(index);
    setLeaderForm(aboutForm.leadershipTeam[index]);
    setIsLeaderModalOpen(true);
  };

  const handleSaveLeaderModal = () => {
    let updatedLeaders = [...aboutForm.leadershipTeam];
    if (editingLeaderIndex !== null) {
      updatedLeaders[editingLeaderIndex] = leaderForm;
    } else {
      updatedLeaders.push(leaderForm);
    }
    const updatedAbout = { ...aboutForm, leadershipTeam: updatedLeaders };
    setAboutForm(updatedAbout);
    updateAbout(updatedAbout);
    setIsLeaderModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Quick Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-[#0e705b]">
              <LayoutTemplate className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Website CMS & Page Editor
            </h2>
            <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold text-xs">
              Live Synchronized
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management for Homepage, About Page, Programs, and Public Announcements. Changes are saved directly to your PostgreSQL database.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveStatus}</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSaveStatus(null)}
            className="text-xs text-emerald-700 hover:bg-emerald-100 h-7 px-2"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl h-auto sm:h-11 bg-slate-100 p-1 rounded-xl gap-1">
          <TabsTrigger value="homepage" className="gap-2 text-xs sm:text-sm font-bold">
            <Home className="w-4 h-4" />
            <span>Homepage</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-2 text-xs sm:text-sm font-bold">
            <BookOpen className="w-4 h-4" />
            <span>About Us</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="gap-2 text-xs sm:text-sm font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Programs ({programsForm.programsList.length})</span>
          </TabsTrigger>
          <TabsTrigger value="donate" className="gap-2 text-xs sm:text-sm font-bold">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Donations & Bank</span>
          </TabsTrigger>
        </TabsList>

        {/* ========================================================
            TAB 1: HOMEPAGE CMS
        ======================================================== */}
        <TabsContent value="homepage" className="space-y-6 mt-6">
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Hero Section & Call-to-Actions
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Customize the main headline, subtitle, buttons, and visual banner shown to all visitors.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm("Reset homepage to default template?")) {
                        resetHome();
                        setHomeForm(homeContent);
                      }
                    }}
                    className="text-xs text-slate-600 gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveHomepage}
                    disabled={isSaving}
                    className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs gap-1.5 font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save Homepage"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Hero Main Title (Heading 1)</label>
                <Input
                  value={homeForm.heroTitle}
                  onChange={(e) => setHomeForm({ ...homeForm, heroTitle: e.target.value })}
                  placeholder="e.g. Empowering Communities Through Education, Welfare & Development"
                  className="font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Hero Subtitle / Description</label>
                <Textarea
                  rows={3}
                  value={homeForm.heroSubtitle}
                  onChange={(e) => setHomeForm({ ...homeForm, heroSubtitle: e.target.value })}
                  placeholder="Enter introductory paragraph..."
                  className="text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Primary Button Label</label>
                  <Input
                    value={homeForm.primaryCtaText}
                    onChange={(e) => setHomeForm({ ...homeForm, primaryCtaText: e.target.value })}
                    placeholder="Become a Member"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Primary Button Destination Link</label>
                  <Input
                    value={homeForm.primaryCtaLink}
                    onChange={(e) => setHomeForm({ ...homeForm, primaryCtaLink: e.target.value })}
                    placeholder="/register/member"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Secondary Button Label</label>
                  <Input
                    value={homeForm.secondaryCtaText}
                    onChange={(e) => setHomeForm({ ...homeForm, secondaryCtaText: e.target.value })}
                    placeholder="Explore Our Programs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Secondary Button Destination Link</label>
                  <Input
                    value={homeForm.secondaryCtaLink}
                    onChange={(e) => setHomeForm({ ...homeForm, secondaryCtaLink: e.target.value })}
                    placeholder="/programs"
                  />
                </div>
              </div>

              <ImagePickerInput
                label="Hero Background Banner Image"
                value={homeForm.heroBgImage}
                onChange={(url) => setHomeForm({ ...homeForm, heroBgImage: url })}
                placeholder="/homepage-hero-banner.png"
                defaultCategory="Banners"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Corner Stat Number</label>
                  <Input
                    value={homeForm.statCardValue}
                    onChange={(e) => setHomeForm({ ...homeForm, statCardValue: e.target.value })}
                    placeholder="25+"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Corner Stat Label</label>
                  <Input
                    value={homeForm.statCardLabel}
                    onChange={(e) => setHomeForm({ ...homeForm, statCardLabel: e.target.value })}
                    placeholder="Active Programs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Stories Editor */}
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Featured Success Stories & Testimonials
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Real community member experiences displayed on the homepage.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingStoryIndex(null);
                    setStoryForm({
                      name: "",
                      role: "",
                      location: "",
                      quote: "",
                      image: "/stories/rina.png",
                      course: "",
                    });
                    setIsStoryModalOpen(true);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Story
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {homeForm.successStories.map((story, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{story.name}</span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {story.course}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{story.role}</p>
                      <p className="text-xs text-slate-700 mt-2 italic line-clamp-3 leading-relaxed">
                        &quot;{story.quote}&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-400">{story.location}</span>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenEditStory(idx)}
                          className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm(`Delete story for ${story.name}?`)) {
                              const updated = homeForm.successStories.filter((_, i) => i !== idx);
                              const newHome = { ...homeForm, successStories: updated };
                              setHomeForm(newHome);
                              updateHome(newHome);
                            }
                          }}
                          className="h-7 px-2 text-xs text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================
            TAB 2: ABOUT US CMS
        ======================================================== */}
        <TabsContent value="about" className="space-y-6 mt-6">
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    About Page Story & Foundation
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Manage institutional background, founding narrative, statutory registration badges, and mission.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm("Reset about content to default?")) {
                        resetAbout();
                        setAboutForm(aboutContent);
                      }
                    }}
                    className="text-xs text-slate-600 gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveAbout}
                    disabled={isSaving}
                    className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs gap-1.5 font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save About Us"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Page Main Title</label>
                  <Input
                    value={aboutForm.title}
                    onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                    placeholder="About KMEW"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Journey Tagline</label>
                  <Input
                    value={aboutForm.journeyTag}
                    onChange={(e) => setAboutForm({ ...aboutForm, journeyTag: e.target.value })}
                    placeholder="Our Journey Since 2012"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Top Header Subtitle / Overview</label>
                <Textarea
                  rows={2}
                  value={aboutForm.subtitle}
                  onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                  placeholder="Introduction paragraph..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">History & Origin Heading</label>
                <Input
                  value={aboutForm.journeyHeading}
                  onChange={(e) => setAboutForm({ ...aboutForm, journeyHeading: e.target.value })}
                  placeholder="Rooted in the Industrial Heart of Bengal..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Origin Narrative (Paragraph 1)</label>
                <Textarea
                  rows={3}
                  value={aboutForm.historyParagraph1}
                  onChange={(e) => setAboutForm({ ...aboutForm, historyParagraph1: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Growth & Impact Narrative (Paragraph 2)</label>
                <Textarea
                  rows={3}
                  value={aboutForm.historyParagraph2}
                  onChange={(e) => setAboutForm({ ...aboutForm, historyParagraph2: e.target.value })}
                />
              </div>

              <ImagePickerInput
                label="History Showcase Photo"
                value={aboutForm.historyImage}
                onChange={(url) => setAboutForm({ ...aboutForm, historyImage: url })}
                placeholder="/news/scholarship.png"
                defaultCategory="News"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Society Registration Badge</label>
                  <Input
                    value={aboutForm.registrationBadge}
                    onChange={(e) => setAboutForm({ ...aboutForm, registrationBadge: e.target.value })}
                    placeholder="Govt. Regd. Society S/1L/89241"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tax Exemption Certification Badge</label>
                  <Input
                    value={aboutForm.taxExemptionBadge}
                    onChange={(e) => setAboutForm({ ...aboutForm, taxExemptionBadge: e.target.value })}
                    placeholder="80G & 12A Certified"
                  />
                </div>
              </div>

              <Separator className="my-3" />

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" /> Mission Statement
                  </label>
                  <Textarea
                    rows={4}
                    value={aboutForm.missionStatement}
                    onChange={(e) => setAboutForm({ ...aboutForm, missionStatement: e.target.value })}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" /> Vision Statement
                  </label>
                  <Textarea
                    rows={4}
                    value={aboutForm.visionStatement}
                    onChange={(e) => setAboutForm({ ...aboutForm, visionStatement: e.target.value })}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-emerald-600" /> Core Values
                  </label>
                  <Textarea
                    rows={4}
                    value={aboutForm.valuesStatement}
                    onChange={(e) => setAboutForm({ ...aboutForm, valuesStatement: e.target.value })}
                    className="text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leadership Team Editor */}
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Governance Council & Leadership Team
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Presidents, trustees, and executive directors featured on the About page.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingLeaderIndex(null);
                    setLeaderForm({
                      name: "",
                      role: "",
                      bio: "",
                      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                    });
                    setIsLeaderModalOpen(true);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aboutForm.leadershipTeam.map((leader, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900">{leader.name}</span>
                      <p className="text-xs font-semibold text-[#0e705b] mt-0.5">{leader.role}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-200/60">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenEditLeader(idx)}
                        className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm(`Delete ${leader.name} from leadership?`)) {
                            const updated = aboutForm.leadershipTeam.filter((_, i) => i !== idx);
                            const newAbout = { ...aboutForm, leadershipTeam: updated };
                            setAboutForm(newAbout);
                            updateAbout(newAbout);
                          }
                        }}
                        className="h-7 px-2 text-xs text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================
            TAB 3: PROGRAMS DIRECTORY CMS
        ======================================================== */}
        <TabsContent value="programs" className="space-y-6 mt-6">
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Welfare & Education Programs Directory
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Add, edit, or customize any program featured on <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">/programs</code>.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm("Reset programs list to default?")) {
                        resetPrograms();
                        setProgramsForm(programsContent);
                      }
                    }}
                    className="text-xs text-slate-600 gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleOpenAddProgram}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Program
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePrograms}
                    disabled={isSaving}
                    className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs gap-1.5 font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save All"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-4">
                {programsForm.programsList.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{prog.title}</span>
                        <Badge variant="outline" className="text-xs font-semibold bg-slate-50">
                          {prog.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-bold ${
                            prog.status === "Accepting Applications"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {prog.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {prog.shortDescription}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span>📊 {prog.impactStats}</span>
                        <span>🎯 {prog.objectives.length} Objectives</span>
                        <span>📋 {prog.eligibility.length} Criteria</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProgram(prog);
                          setIsProgramModalOpen(true);
                        }}
                        className="text-xs gap-1 text-slate-700 h-8"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteProgram(prog.id)}
                        className="text-xs text-rose-600 hover:bg-rose-50 h-8 px-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================================================
            TAB 4: DONATIONS & BANK DETAILS CMS
        ======================================================== */}
        <TabsContent value="donate" className="space-y-6 mt-6">
          <Card className="border-slate-200 shadow-2xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>Donations Page & Bank Accounts CMS</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-0.5">
                    Manage bank transfer details, official UPI QR code, passbook proofs, and 80G tax receipt settings displayed live on /donate
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/donate"
                    target="_blank"
                    className="inline-flex items-center text-xs gap-1.5 h-8 px-3 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview /donate</span>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm("Reset donation and bank details back to default values?")) {
                        resetDonate();
                      }
                    }}
                    className="text-xs gap-1.5 h-8 text-slate-600 hover:text-slate-900"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </Button>
                  <Button
                    size="sm"
                    disabled={isSaving}
                    onClick={handleSaveDonate}
                    className="text-xs gap-1.5 h-8 bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "Saving..." : "Save Bank Details"}</span>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              {/* SECTION A: Official Bank Account Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Official Bank Account Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-700">Account Holder Name</label>
                    <Input
                      value={donateForm.accountName}
                      onChange={(e) => setDonateForm({ ...donateForm, accountName: e.target.value })}
                      placeholder="e.g. KULTI MAHARAJA EDUCATIONAL WELFARE ORGANIZATION"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Bank Name</label>
                    <Input
                      value={donateForm.bankName}
                      onChange={(e) => setDonateForm({ ...donateForm, bankName: e.target.value })}
                      placeholder="e.g. State Bank of India (SBI)"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Account Number</label>
                    <Input
                      className="font-mono font-bold text-amber-700"
                      value={donateForm.accountNumber}
                      onChange={(e) => setDonateForm({ ...donateForm, accountNumber: e.target.value })}
                      placeholder="e.g. 44527300306"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">IFSC Code</label>
                    <Input
                      className="font-mono font-bold text-emerald-700"
                      value={donateForm.ifscCode}
                      onChange={(e) => setDonateForm({ ...donateForm, ifscCode: e.target.value })}
                      placeholder="e.g. SBIN0000011"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Account Type</label>
                    <Input
                      value={donateForm.accountType}
                      onChange={(e) => setDonateForm({ ...donateForm, accountType: e.target.value })}
                      placeholder="e.g. Regular Savings Bank Account"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-slate-700">Branch Name & Details</label>
                    <Input
                      value={donateForm.branch}
                      onChange={(e) => setDonateForm({ ...donateForm, branch: e.target.value })}
                      placeholder="e.g. Asansol Branch (Code: 11), Bijoy Pal Sarani, Asansol"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Organization PAN</label>
                    <Input
                      className="font-mono"
                      value={donateForm.panNumber}
                      onChange={(e) => setDonateForm({ ...donateForm, panNumber: e.target.value })}
                      placeholder="e.g. AACAK8634P"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">CIF Number (Optional)</label>
                    <Input
                      className="font-mono"
                      value={donateForm.cifNumber || ""}
                      onChange={(e) => setDonateForm({ ...donateForm, cifNumber: e.target.value })}
                      placeholder="e.g. 92261766245"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">MICR Code (Optional)</label>
                    <Input
                      className="font-mono"
                      value={donateForm.micrCode || ""}
                      onChange={(e) => setDonateForm({ ...donateForm, micrCode: e.target.value })}
                      placeholder="e.g. 713002100"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-3">
                    <label className="font-bold text-slate-700">Bank Registered Address</label>
                    <Input
                      value={donateForm.address || ""}
                      onChange={(e) => setDonateForm({ ...donateForm, address: e.target.value })}
                      placeholder="e.g. Gandhi Nagar, Near Railway Station, PO Sitarampur, PS Kulti, Asansol 713359"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* SECTION B: Digital Payments & Media Assets (QR Code & Passbook) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    UPI Handle & Verification Image Documents
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="max-w-md space-y-1 text-xs">
                    <label className="font-bold text-slate-700">Official UPI Handle / VPA</label>
                    <Input
                      className="font-mono font-bold text-emerald-700"
                      value={donateForm.upiId}
                      onChange={(e) => setDonateForm({ ...donateForm, upiId: e.target.value })}
                      placeholder="e.g. kmew@sbi"
                    />
                    <p className="text-[11px] text-slate-500">
                      Used for quick one-click copy and compatibility with Google Pay, PhonePe, and BHIM.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* QR Code Picker */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-amber-600" />
                          <span>Official UPI QR Code Image</span>
                        </span>
                        <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-800 border-amber-200 font-bold">
                          Scan & Pay
                        </Badge>
                      </div>

                      <ImagePickerInput
                        label=""
                        value={donateForm.qrCodeImage}
                        onChange={(url) => setDonateForm({ ...donateForm, qrCodeImage: url })}
                        defaultCategory="Banners"
                        placeholder="/bank-qr-code.png"
                      />

                      <p className="text-[11px] text-slate-500 leading-tight">
                        Displays prominent QR code on /donate with modal zoom capability for quick smartphone scanning.
                      </p>
                    </div>

                    {/* Passbook Proof Picker */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Official Bank Passbook Document</span>
                        </span>
                        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-800 border-blue-200 font-bold">
                          Proof / Document
                        </Badge>
                      </div>

                      <ImagePickerInput
                        label=""
                        value={donateForm.passbookImage}
                        onChange={(url) => setDonateForm({ ...donateForm, passbookImage: url })}
                        defaultCategory="Banners"
                        placeholder="/bank-passbook.png"
                      />

                      <p className="text-[11px] text-slate-500 leading-tight">
                        Provides donors visual proof of official SBI NGO account ownership with lightbox viewer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* SECTION C: Page Headings & 80G Receipt Instructions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Page Text & 80G Tax Exemption Receipt Guidance
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-bold text-slate-700">Donation Page Headline</label>
                    <Input
                      value={donateForm.title}
                      onChange={(e) => setDonateForm({ ...donateForm, title: e.target.value })}
                      placeholder="e.g. Invest in Education, Transform Lives"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="font-bold text-slate-700">Page Subtitle</label>
                    <Textarea
                      rows={2}
                      value={donateForm.subtitle}
                      onChange={(e) => setDonateForm({ ...donateForm, subtitle: e.target.value })}
                      placeholder="Brief inspiring mission statement on tax deductions..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Section 80G Benefit Explainer</label>
                    <Textarea
                      rows={2}
                      value={donateForm.taxExemptionNote}
                      onChange={(e) => setDonateForm({ ...donateForm, taxExemptionNote: e.target.value })}
                      placeholder="Explanation of tax benefits for Indian taxpayers..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Transfer Instructions & Next Steps</label>
                    <Textarea
                      rows={2}
                      value={donateForm.instructionsNote}
                      onChange={(e) => setDonateForm({ ...donateForm, instructionsNote: e.target.value })}
                      placeholder="Instructions on sharing UTR / PAN for receipt generation..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Donation Support Email</label>
                    <Input
                      value={donateForm.supportEmail}
                      onChange={(e) => setDonateForm({ ...donateForm, supportEmail: e.target.value })}
                      placeholder="e.g. donate@kmew.org.in"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Donation Support Phone / Contact</label>
                    <Input
                      value={donateForm.supportPhone}
                      onChange={(e) => setDonateForm({ ...donateForm, supportPhone: e.target.value })}
                      placeholder="e.g. +91 98321 00000 / 2250385"
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-slate-100 bg-slate-50/70 p-4 px-6 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                All changes reflect immediately on <code className="text-[#0e705b] font-bold">/donate</code> upon saving.
              </span>
              <Button
                size="sm"
                disabled={isSaving}
                onClick={handleSaveDonate}
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Bank Details"}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ========================================================
          MODAL: ADD / EDIT PROGRAM
      ======================================================== */}
      {/* ========================================================
          MODAL: ADD / EDIT PROGRAM
      ======================================================== */}
      {editingProgram && (
        <Dialog open={isProgramModalOpen} onOpenChange={setIsProgramModalOpen}>
          <DialogContent className="sm:max-w-3xl lg:max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
            <div className="p-6 pb-4 border-b border-slate-100 shrink-0">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">
                  {editingProgram.id.startsWith("program-") ? "Add New Program" : "Edit Program"}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 mt-1">
                  Update the program title, category, description, requirements, and metrics.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Program Title</label>
                  <Input
                    value={editingProgram.title}
                    onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    placeholder="e.g. Higher Education Scholarship"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={editingProgram.category}
                    onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value as any })}
                    className="w-full h-8 px-2.5 rounded-lg border border-input bg-transparent text-xs font-medium outline-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Skill Development">Skill Development</option>
                    <option value="Health & Welfare">Health & Welfare</option>
                    <option value="School Support">School Support</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Application Status</label>
                  <select
                    value={editingProgram.status}
                    onChange={(e) => setEditingProgram({ ...editingProgram, status: e.target.value as any })}
                    className="w-full h-8 px-2.5 rounded-lg border border-input bg-transparent text-xs font-medium outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Accepting Applications">Accepting Applications</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Impact Stats Highlight</label>
                  <Input
                    value={editingProgram.impactStats}
                    onChange={(e) => setEditingProgram({ ...editingProgram, impactStats: e.target.value })}
                    placeholder="e.g. 4,200+ Scholars Graduated"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Short Summary</label>
                <Textarea
                  rows={2}
                  value={editingProgram.shortDescription}
                  onChange={(e) => setEditingProgram({ ...editingProgram, shortDescription: e.target.value })}
                  placeholder="One or two sentences for preview cards..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Detailed Description</label>
                <Textarea
                  rows={4}
                  value={editingProgram.detailedDescription}
                  onChange={(e) => setEditingProgram({ ...editingProgram, detailedDescription: e.target.value })}
                  placeholder="Complete program overview and guidance..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Objectives (One per line)</label>
                  <Textarea
                    rows={4}
                    value={editingProgram.objectives.join("\n")}
                    onChange={(e) =>
                      setEditingProgram({
                        ...editingProgram,
                        objectives: e.target.value.split("\n").filter((l) => l.trim()),
                      })
                    }
                    placeholder="Full or partial tuition fee sponsorship&#10;Quarterly mentorship&#10;Stipends for textbooks"
                    className="font-mono text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Eligibility Criteria (One per line)</label>
                  <Textarea
                    rows={4}
                    value={editingProgram.eligibility.join("\n")}
                    onChange={(e) =>
                      setEditingProgram({
                        ...editingProgram,
                        eligibility: e.target.value.split("\n").filter((l) => l.trim()),
                      })
                    }
                    placeholder="Annual family income below ₹2,50,000&#10;Minimum 70% aggregate marks"
                    className="font-mono text-xs"
                  />
                </div>
              </div>

              <ImagePickerInput
                label="Program Cover Image"
                value={editingProgram.image}
                onChange={(url) => setEditingProgram({ ...editingProgram, image: url })}
                placeholder="/programs/scholarships.png"
                defaultCategory="Programs"
              />
            </div>

            <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex justify-end gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProgramModalOpen(false)}
                className="text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveProgramModal}
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs font-bold gap-1 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Save Program
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT SUCCESS STORY
      ======================================================== */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="sm:max-w-xl w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <div className="p-6 pb-3 border-b border-slate-100 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900">
                {editingStoryIndex !== null ? "Edit Success Story" : "Add Success Story"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 mt-0.5">
                Share a member or student testimonial to showcase real community impact.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Beneficiary Name</label>
                <Input
                  value={storyForm.name}
                  onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                  placeholder="e.g. Pooja Banerjee"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Role / Designation</label>
                <Input
                  value={storyForm.role}
                  onChange={(e) => setStoryForm({ ...storyForm, role: e.target.value })}
                  placeholder="e.g. KMEW Scholar • Now Software Engineer at TCS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Course / Program</label>
                <Input
                  value={storyForm.course}
                  onChange={(e) => setStoryForm({ ...storyForm, course: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Location</label>
                <Input
                  value={storyForm.location}
                  onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                  placeholder="e.g. Kulti, Paschim Bardhaman"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Testimonial Quote</label>
              <Textarea
                rows={3}
                value={storyForm.quote}
                onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                placeholder="Their inspiring personal experience with KMEW..."
              />
            </div>

            <ImagePickerInput
              label="Beneficiary Photo"
              value={storyForm.image}
              onChange={(url) => setStoryForm({ ...storyForm, image: url })}
              placeholder="/stories/rina.png"
              defaultCategory="Stories"
            />
          </div>

          <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex justify-end gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setIsStoryModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveStoryModal} className="bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold">
              Save Story
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================
          MODAL: ADD / EDIT LEADER
      ======================================================== */}
      <Dialog open={isLeaderModalOpen} onOpenChange={setIsLeaderModalOpen}>
        <DialogContent className="sm:max-w-xl w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <div className="p-6 pb-3 border-b border-slate-100 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900">
                {editingLeaderIndex !== null ? "Edit Leader Profile" : "Add Leader Profile"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 mt-0.5">
                Profile and credentials for the governance board of trustees.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <Input
                  value={leaderForm.name}
                  onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                  placeholder="e.g. Dr. B. K. Mukherjee"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Role / Designation</label>
                <Input
                  value={leaderForm.role}
                  onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                  placeholder="e.g. President & Founder Trustee"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Bio Summary</label>
              <Textarea
                rows={3}
                value={leaderForm.bio}
                onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                placeholder="Background and experience in educational leadership..."
              />
            </div>

            <ImagePickerInput
              label="Trustee Photo"
              value={leaderForm.image}
              onChange={(url) => setLeaderForm({ ...leaderForm, image: url })}
              placeholder="/team/member.png"
              defaultCategory="Uploads"
            />
          </div>

          <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex justify-end gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setIsLeaderModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveLeaderModal} className="bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold">
              Save Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
