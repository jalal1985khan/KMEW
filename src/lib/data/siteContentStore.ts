"use client";

import { useState, useEffect } from "react";
import {
  PROGRAMS_DATA,
  IMPACT_METRICS,
  SUCCESS_STORIES,
  LEADERSHIP_TEAM,
  type ProgramItem,
} from "./kmewData";

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  statCardValue: string;
  statCardLabel: string;
  missionHighlight: string;
  impactMetrics: Array<{
    label: string;
    value: string;
    description: string;
    icon: string;
  }>;
  successStories: Array<{
    name: string;
    role: string;
    location: string;
    quote: string;
    image: string;
    course: string;
  }>;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  journeyTag: string;
  journeyHeading: string;
  historyParagraph1: string;
  historyParagraph2: string;
  historyImage: string;
  registrationBadge: string;
  taxExemptionBadge: string;
  missionStatement: string;
  visionStatement: string;
  valuesStatement: string;
  leadershipTeam: Array<{
    name: string;
    role: string;
    bio: string;
    image: string;
  }>;
}

export interface ProgramsContent {
  pageTitle: string;
  pageSubtitle: string;
  programsList: ProgramItem[];
}

export interface DonateContent {
  title: string;
  subtitle: string;
  taxExemptionNote: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  branch: string;
  cifNumber: string;
  micrCode: string;
  panNumber: string;
  address: string;
  upiId: string;
  passbookImage: string;
  qrCodeImage: string;
  instructionsNote: string;
  supportEmail: string;
  supportPhone: string;
  showPassbook: boolean;
  showQrCode: boolean;
}

export interface FullSiteContent {
  homepage: HomepageContent;
  about: AboutContent;
  programs: ProgramsContent;
  donate: DonateContent;
}

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroTitle: "Empowering Communities Through Education, Welfare & Development",
  heroSubtitle:
    "KMEW works to create a brighter future for children, families and communities through education, welfare initiatives, financial support and grassroots development.",
  heroBgImage: "/homepage-hero-banner.png",
  primaryCtaText: "Become a Member",
  primaryCtaLink: "/register/member",
  secondaryCtaText: "Explore Our Programs",
  secondaryCtaLink: "/programs",
  statCardValue: "25+",
  statCardLabel: "Active Programs",
  missionHighlight:
    "Dedicated to uplifting communities with transparency, equity, and direct mentorship.",
  impactMetrics: IMPACT_METRICS,
  successStories: SUCCESS_STORIES,
};

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  title: "About KMEW",
  subtitle:
    "Kulti Maharaja Educational Welfare Organization (KMEW) is an independent non-profit institution founded to build equitable educational pathways, foster vocational self-reliance, and provide transparent welfare assistance.",
  journeyTag: "Our Journey Since 2012",
  journeyHeading:
    "Rooted in the Industrial Heart of Bengal, Committed to Generational Change",
  historyParagraph1:
    "KMEW was established in 2012 by a collective of veteran educators, community elders, and social workers in Kulti (Paschim Bardhaman). Witnessing bright students from foundry worker and marginalized families discontinue their education after secondary school due to economic strain, our founders resolved to create a sustainable safety net.",
  historyParagraph2:
    "What began as a single evening coaching shelter with 25 students has today evolved into a comprehensive digital welfare network spanning over 45 learning centers, thousands of annual scholarship recipients, and hundreds of verified community Associates.",
  historyImage: "/news/scholarship.png",
  registrationBadge: "Govt. Regd. Society S/1L/89241",
  taxExemptionBadge: "80G & 12A Certified",
  missionStatement:
    "To ensure every underprivileged student and family in industrial and rural Bengal has access to quality education, career mentoring, and emergency welfare assistance with zero friction.",
  visionStatement:
    "A self-reliant, literate society where economic background never stands as an impediment to higher learning, dignified livelihoods, and generational progress.",
  valuesStatement:
    "Radical financial transparency, grassroots associate integrity, student-first allocation, and gender-inclusive empowerment.",
  leadershipTeam: LEADERSHIP_TEAM,
};

export const DEFAULT_PROGRAMS_CONTENT: ProgramsContent = {
  pageTitle: "KMEW Programs & Welfare Initiatives",
  pageSubtitle:
    "Explore our educational grants, vocational empowerment tracks, and community health camps. Members can apply directly online through our transparent portal.",
  programsList: PROGRAMS_DATA,
};

export const DEFAULT_DONATE_CONTENT: DonateContent = {
  title: "Invest in Education, Transform Lives",
  subtitle:
    "All donations to KMEW are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act. 100% transparent and digitally audited.",
  taxExemptionNote:
    "Eligible for 50% deduction under Section 80G of the Income Tax Act. Official digitally-signed 80G Tax Exemption Certificate emailed within 24 hours.",
  bankName: "State Bank of India (SBI)",
  accountName: "KULTI MAHARAJA EDUCATIONAL WELFARE ORGANIZATION",
  accountNumber: "44527300306",
  ifscCode: "SBIN0000011",
  accountType: "Regular Savings Bank Account",
  branch: "Asansol Branch (Code: 11), Bijoy Pal Sarani, Asansol",
  cifNumber: "92261766245",
  micrCode: "713002100",
  panNumber: "AACAK8634P",
  address: "Gandhi Nagar, Near Railway Station, PO Sitarampur, PS Kulti, Asansol 713359",
  upiId: "kmew@sbi",
  passbookImage: "/bank-passbook.png",
  qrCodeImage: "/bank-qr-code.png",
  instructionsNote:
    "After completing transfer, kindly email transaction UTR & PAN to donate@kmew.org.in or WhatsApp for your 80G Tax Exemption receipt.",
  supportEmail: "donate@kmew.org.in",
  supportPhone: "2250385",
  showPassbook: true,
  showQrCode: true,
};

export const DEFAULT_SITE_CONTENT: FullSiteContent = {
  homepage: DEFAULT_HOMEPAGE_CONTENT,
  about: DEFAULT_ABOUT_CONTENT,
  programs: DEFAULT_PROGRAMS_CONTENT,
  donate: DEFAULT_DONATE_CONTENT,
};

const STORAGE_KEY = "kmew_site_content_cache";

export function getCachedContent<K extends keyof FullSiteContent>(
  key: K
): FullSiteContent[K] {
  if (typeof window === "undefined") return DEFAULT_SITE_CONTENT[key];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) return parsed;
    }
  } catch (err) {
    console.warn("Local storage cache read failed:", err);
  }
  return DEFAULT_SITE_CONTENT[key];
}

export function saveCachedContent<K extends keyof FullSiteContent>(
  key: K,
  data: FullSiteContent[K]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(data));
    window.dispatchEvent(
      new CustomEvent("kmew-site-content-updated", {
        detail: { key, data },
      })
    );
  } catch (err) {
    console.warn("Local storage cache save failed:", err);
  }
}

export function useSiteContent<K extends keyof FullSiteContent>(key: K) {
  const [content, setContent] = useState<FullSiteContent[K]>(() =>
    getCachedContent(key)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Initial cached value
    setContent(getCachedContent(key));
    setIsLoaded(true);

    // 2. Fetch latest from database API
    fetch(`/api/content?key=${key}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setContent(res.data);
          saveCachedContent(key, res.data);
        }
      })
      .catch((err) => console.warn(`Live content fetch fallback for ${key}:`, err));

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<{ key: string; data: any }>;
      if (custom.detail && custom.detail.key === key) {
        setContent(custom.detail.data);
      }
    };

    window.addEventListener("kmew-site-content-updated", handleUpdate);
    return () => {
      window.removeEventListener("kmew-site-content-updated", handleUpdate);
    };
  }, [key]);

  const updateContent = async (newData: FullSiteContent[K]) => {
    setContent(newData);
    saveCachedContent(key, newData);

    // Persist to Database via API
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, data: newData }),
      });
      return await res.json();
    } catch (err) {
      console.error(`Failed to persist ${key} content to database:`, err);
      return { success: false, error: err };
    }
  };

  const resetContent = async () => {
    return updateContent(DEFAULT_SITE_CONTENT[key]);
  };

  return {
    content,
    isLoaded,
    updateContent,
    resetContent,
  };
}
