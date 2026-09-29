"use client";

import { useEffect } from "react";
import Script from "next/script";

export function applyLanguage(langCode: string) {
  if (typeof window === "undefined") return;

  const hostname = window.location.hostname;
  
  if (langCode === "en") {
    // Clear cookies for all domain levels to restore default English
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostname}; path=/;`;
    
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
    setTimeout(() => {
      window.location.reload();
    }, 150);
  } else {
    const val = `/en/${langCode}`;
    document.cookie = `googtrans=${val}; path=/;`;
    document.cookie = `googtrans=${val}; domain=${hostname}; path=/;`;
    document.cookie = `googtrans=${val}; domain=.${hostname}; path=/;`;

    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    // Suppress Google Translate top banner iframe and force body top back to 0px
    const fixBodyTopAndHideBanner = () => {
      if (document.body && document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
      if (document.documentElement && document.documentElement.style.top && document.documentElement.style.top !== "0px") {
        document.documentElement.style.top = "0px";
      }

      const elementsToHide = document.querySelectorAll(
        "iframe.goog-te-banner-frame, body > .skiptranslate, iframe[id*='container'], .goog-te-banner-frame"
      );
      elementsToHide.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty("display", "none", "important");
        htmlEl.style.setProperty("visibility", "hidden", "important");
        htmlEl.style.setProperty("height", "0", "important");
        htmlEl.style.setProperty("max-height", "0", "important");
        htmlEl.style.setProperty("opacity", "0", "important");
        htmlEl.style.setProperty("pointer-events", "none", "important");
      });
    };

    fixBodyTopAndHideBanner();

    const observer = new MutationObserver(() => {
      fixBodyTopAndHideBanner();
    });

    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
        childList: true,
      });
    }

    if (document.documentElement) {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    const interval = setInterval(fixBodyTopAndHideBanner, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Inline styles to guarantee immediate banner eradication */}
      <style>{`
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        iframe.skiptranslate,
        body > .skiptranslate,
        iframe[id*=":1.container"],
        iframe[id*=":2.container"],
        iframe[class*="goog-te-banner"],
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
          opacity: 0 !important;
          pointer-events: none !important;
          max-height: 0 !important;
          overflow: hidden !important;
        }

        html, body {
          top: 0px !important;
          position: static !important;
        }

        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }

        .VIpgJd-ZVi9od-ORHb-OEVmcb,
        .VIpgJd-ZVi9od-l4eHX-hSRLGd,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf {
          display: none !important;
        }
      `}</style>

      <div id="google_translate_element" aria-hidden="true" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function() {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn',
                autoDisplay: false
              }, 'google_translate_element');
            }
          };
        `}
      </Script>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
