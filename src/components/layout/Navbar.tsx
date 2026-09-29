"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Briefcase,
  Heart,
  Info,
  TrendingUp,
  UserPlus,
  HeartHandshake,
  Newspaper,
  Images,
  Sparkles,
  Check
} from "lucide-react";
import { KmewLogo } from "@/components/common/KmewLogo";
import { applyLanguage } from "@/components/common/GoogleTranslate";

interface NavSubItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavSubItem[];
  columns?: 1 | 2;
  widthClass?: string;
}

const languages = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", label: "Bangla", nativeName: "বাংলা" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      widthClass: "w-72",
      columns: 1,
      children: [
        {
          label: "Who We Are",
          href: "/about",
          description: "Our mission, history, and vision",
          icon: <Info className="w-4 h-4 text-emerald-700" />,
          iconBg: "bg-emerald-50",
        },
        {
          label: "Our Impact",
          href: "/impact",
          description: "Grassroots reach and verified stats",
          icon: <TrendingUp className="w-4 h-4 text-blue-700" />,
          iconBg: "bg-blue-50",
        },
        {
          label: "Leadership & Team",
          href: "/about#team",
          description: "Trustees, advisors, and executive team",
          icon: <Users className="w-4 h-4 text-purple-700" />,
          iconBg: "bg-purple-50",
        },
      ],
    },
    {
      label: "Our Programs",
      widthClass: "w-[560px]",
      columns: 2,
      children: [
        {
          label: "All Programs",
          href: "/programs",
          description: "Explore all 6 flagship initiatives",
          icon: <Sparkles className="w-4 h-4 text-emerald-700" />,
          iconBg: "bg-emerald-50",
        },
        {
          label: "Scholarships",
          href: "/programs#scholarships",
          description: "Higher education financial aid",
          icon: <GraduationCap className="w-4 h-4 text-amber-700" />,
          iconBg: "bg-amber-50",
        },
        {
          label: "Education Centers",
          href: "/programs#education",
          description: "Remedial evening tuition centers",
          icon: <BookOpen className="w-4 h-4 text-blue-700" />,
          iconBg: "bg-blue-50",
        },
        {
          label: "Community Classes",
          href: "/programs#community-classes",
          description: "Grassroots workshops & literacy",
          icon: <Users className="w-4 h-4 text-teal-700" />,
          iconBg: "bg-teal-50",
        },
        {
          label: "School Support",
          href: "/programs#school-support",
          description: "Uniforms, books & learning kits",
          icon: <Building2 className="w-4 h-4 text-cyan-700" />,
          iconBg: "bg-cyan-50",
        },
        {
          label: "Skill Development",
          href: "/programs#skill-development",
          description: "Vocational & digital skills",
          icon: <Briefcase className="w-4 h-4 text-orange-700" />,
          iconBg: "bg-orange-50",
        },
        {
          label: "Health & Welfare",
          href: "/programs#health-welfare",
          description: "Medical diagnostic camps",
          icon: <Heart className="w-4 h-4 text-rose-600" />,
          iconBg: "bg-rose-50",
        },
      ],
    },
    {
      label: "Membership",
      widthClass: "w-80",
      columns: 1,
      children: [
        {
          label: "Become a Member",
          href: "/register/member",
          description: "Register for scholarships & welfare support",
          icon: <UserPlus className="w-4 h-4 text-emerald-700" />,
          iconBg: "bg-emerald-50",
        },
        {
          label: "Become an Associate",
          href: "/register/associate",
          description: "Volunteer and lead in your community",
          icon: <Users className="w-4 h-4 text-blue-700" />,
          iconBg: "bg-blue-50",
        },
        {
          label: "Support & Donate",
          href: "/donate",
          description: "Tax-exempt donation under Section 80G",
          icon: <HeartHandshake className="w-4 h-4 text-rose-600" />,
          iconBg: "bg-rose-50",
        },
      ],
    },
    {
      label: "News & Media",
      widthClass: "w-72",
      columns: 1,
      children: [
        {
          label: "News & Events",
          href: "/news",
          description: "Announcements & press releases",
          icon: <Newspaper className="w-4 h-4 text-blue-700" />,
          iconBg: "bg-blue-50",
        },
        {
          label: "Photo Gallery",
          href: "/gallery",
          description: "Moments & life at KMEW",
          icon: <Images className="w-4 h-4 text-emerald-700" />,
          iconBg: "bg-emerald-50",
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync selected language on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("kmew_selected_lang");
        const cookieMatch = document.cookie.match(/googtrans=\/[^/]+\/([a-z]{2})/);
        const code = stored || (cookieMatch && cookieMatch[1]);
        if (code) {
          const found = languages.find((l) => l.code === code);
          if (found) {
            setSelectedLang(found);
          }
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectLanguage = (lang: (typeof languages)[0]) => {
    setSelectedLang(lang);
    setLangDropdownOpen(false);
    applyLanguage(lang.code);
  };

  const isItemActive = (item: NavItem) => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.children) {
      return item.children.some((child) => pathname === child.href || pathname.startsWith(child.href.split("#")[0]));
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* Top Info Bar */}
      <div className="bg-[#073531] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-[#0b4742]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-emerald-100/90 font-medium text-center sm:text-left">
            <span>Kulti Maharaja Educational Welfare Organization (KMEW)</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100/90 text-xs">
            <a href="tel:+918972285850" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>+91-8972285850</span>
            </a>
            <span className="text-emerald-700">|</span>
            <a href="mailto:info@kmew.org" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>info@kmew.org</span>
            </a>
            <span className="text-emerald-700 hidden md:inline">|</span>

            {/* Language Selector Dropdown */}
            <div className="relative hidden md:block notranslate" translate="no" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 cursor-pointer text-emerald-100/90 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-white/10"
                aria-label="Select language"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-medium">{selectedLang.label}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-100 py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Language / भाषा / ভাষা
                  </div>
                  {languages.map((lang) => {
                    const isSelected = selectedLang.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguage(lang)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${isSelected
                          ? "bg-emerald-50 text-[#0e705b] font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                          }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs leading-tight">{lang.label}</span>
                          <span className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {lang.nativeName}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#0e705b]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-100" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="shrink-0 mr-4 xl:mr-6">
              <KmewLogo />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => {
                const active = isItemActive(item);
                const hasDropdown = Boolean(item.children && item.children.length > 0);
                const isOpen = activeDropdown === item.label;

                if (!hasDropdown && item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`relative py-2 text-[13.5px] font-semibold whitespace-nowrap transition-colors ${active
                        ? "text-[#0e705b] font-bold"
                        : "text-slate-700 hover:text-[#0e705b]"
                        }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0e705b] rounded-full" />
                      )}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                      className={`relative py-2 text-[13.5px] font-semibold whitespace-nowrap flex items-center gap-1 transition-colors ${active || isOpen
                        ? "text-[#0e705b] font-bold"
                        : "text-slate-700 hover:text-[#0e705b]"
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#0e705b]" : "text-slate-400"
                          }`}
                      />
                      {active && (
                        <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0e705b] rounded-full" />
                      )}
                    </button>

                    {/* Animated Dropdown Menu Panel */}
                    {isOpen && item.children && (
                      <div
                        className={`absolute top-full left-0 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 ${item.widthClass || "w-72"
                          }`}
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 overflow-hidden">
                          {item.columns === 2 ? (
                            <div className="grid grid-cols-2 gap-1.5">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${child.iconBg}`}>
                                    {child.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#0e705b] transition-colors leading-tight">
                                      {child.label}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {child.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${child.iconBg}`}>
                                    {child.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#0e705b] transition-colors leading-tight">
                                      {child.label}
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                      {child.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5 xl:gap-3 shrink-0">
              {/* Login Button */}
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition-colors whitespace-nowrap"
              >
                Login
              </Link>

              {/* Donate Button */}
              <Link
                href="/donate"
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0e705b] hover:bg-[#0a544b] shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap tracking-wide"
              >
                <span>DONATE US</span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/donate"
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#0e705b] rounded-lg whitespace-nowrap"
              >
                Donate
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isItemActive(item);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isSubmenuOpen = openMobileSubmenu === item.label;

                if (!hasChildren && item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${active
                        ? "text-[#0e705b] bg-[#f0faf7] font-bold"
                        : "text-slate-800 hover:bg-slate-50"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setOpenMobileSubmenu(isSubmenuOpen ? null : item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${active || isSubmenuOpen
                        ? "text-[#0e705b] bg-slate-50 font-bold"
                        : "text-slate-800 hover:bg-slate-50"
                        }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? "rotate-180 text-[#0e705b]" : "text-slate-400"
                          }`}
                      />
                    </button>

                    {isSubmenuOpen && item.children && (
                      <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-emerald-100 ml-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenMobileSubmenu(null);
                            }}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-[#0e705b] hover:bg-emerald-50/50"
                          >
                            <span className="shrink-0">{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0e705b] tracking-wide"
              >
                <span>DONATE US</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100"
              >
                <span>Portal Login</span>
              </Link>
            </div>

            {/* Mobile Language Selector */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between notranslate" translate="no">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Language</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      handleSelectLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${selectedLang.code === lang.code
                      ? "bg-white text-[#0e705b] shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
