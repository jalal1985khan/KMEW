"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { KMEW_TRANSLATIONS } from "@/lib/i18n/translations";

declare global {
  interface Node {
    __kmewOriginal?: string;
  }
}

const STORAGE_KEY = "kmew_selected_lang";
const IGNORED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "SVG",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "NOSCRIPT"
]);

// Sorted phrase keys by length descending to match longer phrases first
const SORTED_KEYS = Object.keys(KMEW_TRANSLATIONS).sort(
  (a, b) => b.length - a.length
);

export function getCurrentLanguage(): "en" | "hi" | "bn" {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "bn") return stored;

    const cookieMatch = document.cookie.match(/googtrans=\/[^/]+\/([a-z]{2})/);
    if (cookieMatch && (cookieMatch[1] === "hi" || cookieMatch[1] === "bn")) {
      return cookieMatch[1] as "hi" | "bn";
    }
  } catch {
    // Ignore storage/cookie errors
  }
  return "en";
}

function translateText(text: string, targetLang: "hi" | "bn"): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  // Direct exact match
  const directMatch = KMEW_TRANSLATIONS[trimmed]?.[targetLang];
  if (directMatch) {
    const leadingWs = text.match(/^\s*/)?.[0] || "";
    const trailingWs = text.match(/\s*$/)?.[0] || "";
    return leadingWs + directMatch + trailingWs;
  }

  // Multi-phrase or sentence match
  let result = text;
  let hasReplacement = false;

  for (const phrase of SORTED_KEYS) {
    if (result.includes(phrase)) {
      const translation = KMEW_TRANSLATIONS[phrase]?.[targetLang];
      if (translation) {
        result = result.split(phrase).join(translation);
        hasReplacement = true;
      }
    }
  }

  return hasReplacement ? result : text;
}

function processNode(node: Node, targetLang: "en" | "hi" | "bn") {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (parent) {
      if (IGNORED_TAGS.has(parent.tagName)) return;
      if (parent.closest(".notranslate") || parent.getAttribute("translate") === "no") {
        return;
      }
    }

    const currentVal = node.nodeValue || "";
    if (!currentVal.trim()) return;

    if (node.__kmewOriginal === undefined) {
      node.__kmewOriginal = currentVal;
    }

    if (targetLang === "en") {
      if (node.nodeValue !== node.__kmewOriginal) {
        node.nodeValue = node.__kmewOriginal;
      }
    } else {
      const original = node.__kmewOriginal;
      const translated = translateText(original, targetLang);
      if (node.nodeValue !== translated) {
        node.nodeValue = translated;
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    if (IGNORED_TAGS.has(el.tagName)) return;
    if (el.classList?.contains("notranslate") || el.getAttribute("translate") === "no") {
      return;
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      processNode(node.childNodes[i], targetLang);
    }
  }
}

export function translateDOM(targetLang: "en" | "hi" | "bn") {
  if (typeof document === "undefined" || !document.body) return;
  document.documentElement.lang = targetLang;
  processNode(document.body, targetLang);
}

export function applyLanguage(langCode: string) {
  if (typeof window === "undefined") return;

  const validLang: "en" | "hi" | "bn" =
    langCode === "hi" || langCode === "bn" ? langCode : "en";

  try {
    localStorage.setItem(STORAGE_KEY, validLang);
    if (validLang === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
      document.cookie = `googtrans=/en/${validLang}; path=/; max-age=31536000;`;
    }
  } catch {
    // Ignore storage errors
  }

  // Update DOM translation
  translateDOM(validLang);

  // Dispatch event for any reactive listener components
  window.dispatchEvent(
    new CustomEvent("kmew-lang-change", { detail: { lang: validLang } })
  );
}

export function GoogleTranslate() {
  const pathname = usePathname();
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const currentLang = getCurrentLanguage();

    // Initial translation on mount if non-English
    if (currentLang !== "en") {
      translateDOM(currentLang);
    }

    // Handle language change events
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: "en" | "hi" | "bn" }>;
      const lang = customEvent.detail?.lang || getCurrentLanguage();
      translateDOM(lang);
    };

    window.addEventListener("kmew-lang-change", handleLangChange);

    // MutationObserver to automatically translate newly added DOM nodes (modals, client renders)
    let timeoutId: NodeJS.Timeout | null = null;
    observerRef.current = new MutationObserver(() => {
      const activeLang = getCurrentLanguage();
      if (activeLang === "en") return;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        translateDOM(activeLang);
      }, 50);
    });

    if (document.body) {
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("kmew-lang-change", handleLangChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Re-run translation on route change
  useEffect(() => {
    const activeLang = getCurrentLanguage();
    if (activeLang !== "en") {
      const timer = setTimeout(() => {
        translateDOM(activeLang);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
