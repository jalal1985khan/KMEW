"use client";

import { useState, useEffect } from "react";
import {
  NEWS_EVENTS,
  GALLERY_ITEMS,
  type NewsEventItem,
  type GalleryItem,
} from "./kmewData";

export type { NewsEventItem, GalleryItem };

const NEWS_STORAGE_KEY = "kmew_news_events";
const GALLERY_STORAGE_KEY = "kmew_gallery_items";

export const DEFAULT_NEWS_IMAGES = [
  { label: "Scholarship Drive", value: "/news/scholarship.png" },
  { label: "Health Camp", value: "/news/health.png" },
  { label: "Education Showcase", value: "/news/edu.png" },
  { label: "Skill Center", value: "/programs/skill-development.png" },
  { label: "School Readiness", value: "/programs/school-support.png" },
];

export const DEFAULT_GALLERY_IMAGES = [
  { label: "Scholarship Ceremony", value: "/gallery/g1.png" },
  { label: "Evening Tuition Classroom", value: "/gallery/g2.png" },
  { label: "Women Tailoring Training", value: "/gallery/g3.png" },
  { label: "Eye & Diagnostic Camp", value: "/gallery/g4.png" },
  { label: "School Kits & Bags", value: "/gallery/g5.png" },
  { label: "Youth Coding Lab", value: "/gallery/g6.png" },
];

export const NEWS_CATEGORIES = [
  "Scholarship Announcement",
  "Health & Welfare",
  "Education Showcase",
  "Community Welfare",
  "Press Release",
  "General Notice",
];

export const GALLERY_CATEGORIES = [
  "Scholarships",
  "Education",
  "Skill Development",
  "Health & Welfare",
  "School Support",
  "Community",
];

// Helper functions for raw storage operations
export function getStoredNewsEvents(): NewsEventItem[] {
  if (typeof window === "undefined") return NEWS_EVENTS;
  try {
    const raw = localStorage.getItem(NEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading news from localStorage:", e);
  }
  return NEWS_EVENTS;
}

export function saveStoredNewsEvents(items: NewsEventItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("kmew-news-updated", { detail: items }));
  } catch (e) {
    console.error("Error saving news to localStorage:", e);
  }
}

export function getStoredGalleryItems(): GalleryItem[] {
  if (typeof window === "undefined") return GALLERY_ITEMS;
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading gallery from localStorage:", e);
  }
  return GALLERY_ITEMS;
}

export function saveStoredGalleryItems(items: GalleryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("kmew-gallery-updated", { detail: items }));
  } catch (e) {
    console.error("Error saving gallery to localStorage:", e);
  }
}

// React Hook for News & Events
export function useNewsEvents() {
  const [news, setNews] = useState<NewsEventItem[]>(NEWS_EVENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setNews(getStoredNewsEvents());
    setIsLoaded(true);

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<NewsEventItem[]>;
      if (custom.detail) {
        setNews(custom.detail);
      } else {
        setNews(getStoredNewsEvents());
      }
    };

    window.addEventListener("kmew-news-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("kmew-news-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addNews = (item: Omit<NewsEventItem, "id"> & { id?: string }) => {
    const newItem: NewsEventItem = {
      ...item,
      id: item.id || `news-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    const updated = [newItem, ...news];
    setNews(updated);
    saveStoredNewsEvents(updated);
    return newItem;
  };

  const updateNews = (id: string, updates: Partial<NewsEventItem>) => {
    const updated = news.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setNews(updated);
    saveStoredNewsEvents(updated);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((item) => item.id !== id);
    setNews(updated);
    saveStoredNewsEvents(updated);
  };

  const resetNewsToDefault = () => {
    setNews(NEWS_EVENTS);
    saveStoredNewsEvents(NEWS_EVENTS);
  };

  return {
    news,
    isLoaded,
    addNews,
    updateNews,
    deleteNews,
    resetNewsToDefault,
  };
}

// React Hook for Gallery Items
export function useGalleryItems() {
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setGallery(getStoredGalleryItems());
    setIsLoaded(true);

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<GalleryItem[]>;
      if (custom.detail) {
        setGallery(custom.detail);
      } else {
        setGallery(getStoredGalleryItems());
      }
    };

    window.addEventListener("kmew-gallery-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("kmew-gallery-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addGallery = (item: Omit<GalleryItem, "id"> & { id?: string }) => {
    const newItem: GalleryItem = {
      ...item,
      id: item.id || `g-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStoredGalleryItems(updated);
    return newItem;
  };

  const updateGallery = (id: string, updates: Partial<GalleryItem>) => {
    const updated = gallery.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setGallery(updated);
    saveStoredGalleryItems(updated);
  };

  const deleteGallery = (id: string) => {
    const updated = gallery.filter((item) => item.id !== id);
    setGallery(updated);
    saveStoredGalleryItems(updated);
  };

  const resetGalleryToDefault = () => {
    setGallery(GALLERY_ITEMS);
    saveStoredGalleryItems(GALLERY_ITEMS);
  };

  return {
    gallery,
    isLoaded,
    addGallery,
    updateGallery,
    deleteGallery,
    resetGalleryToDefault,
  };
}
