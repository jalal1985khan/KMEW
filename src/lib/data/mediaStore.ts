"use client";

import { useState, useEffect } from "react";
import { compressImage, type CompressionOptions, type CompressionResult } from "../media/imageCompressor";
import { type MediaItem, DEFAULT_MEDIA_ASSETS } from "@/app/api/media/route";

export type { MediaItem };

const MEDIA_STORAGE_CACHE = "kmew_media_library_cache";

export function useMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    if (typeof window === "undefined") return DEFAULT_MEDIA_ASSETS;
    try {
      const raw = localStorage.getItem(MEDIA_STORAGE_CACHE);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return DEFAULT_MEDIA_ASSETS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMediaItems(json.data);
        localStorage.setItem(MEDIA_STORAGE_CACHE, JSON.stringify(json.data));
      }
    } catch (err) {
      console.warn("Failed to fetch media library:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();

    const handleUpdate = () => {
      fetchMedia();
    };

    window.addEventListener("kmew-media-updated", handleUpdate);
    return () => {
      window.removeEventListener("kmew-media-updated", handleUpdate);
    };
  }, []);

  /**
   * Upload an image file with automatic client-side compression
   */
  const uploadImage = async (
    file: File,
    title?: string,
    category: "Programs" | "News" | "Stories" | "Gallery" | "Banners" | "Uploads" = "Uploads",
    compressionOpts?: CompressionOptions
  ): Promise<{ success: boolean; item?: MediaItem; compression?: CompressionResult; error?: string }> => {
    setIsUploading(true);
    setUploadProgress("Compressing image...");

    try {
      // 1. Client-side compression
      const result = await compressImage(file, compressionOpts);
      setUploadProgress(
        `Saving compressed image (saved ${result.compressionRatio}%)...`
      );

      // 2. Persist to API
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || file.name.replace(/\.[^/.]+$/, ""),
          url: result.dataUrl,
          category,
          sizeBytes: result.compressedSize,
          width: result.width,
          height: result.height,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        // Optimistically update
        setMediaItems((prev) => [json.data, ...prev.filter((m) => m.id !== json.data.id)]);
        window.dispatchEvent(new CustomEvent("kmew-media-updated"));

        return {
          success: true,
          item: json.data,
          compression: result,
        };
      } else {
        return {
          success: false,
          error: json.error || "Failed to upload image",
        };
      }
    } catch (err: any) {
      console.error("Compression / upload error:", err);
      return {
        success: false,
        error: err?.message || "Failed to process image",
      };
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const deleteMedia = async (id: string) => {
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMediaItems((prev) => prev.filter((m) => m.id !== id));
        window.dispatchEvent(new CustomEvent("kmew-media-updated"));
        return true;
      }
    } catch (err) {
      console.error("Failed to delete media:", err);
    }
    return false;
  };

  return {
    mediaItems,
    isLoading,
    isUploading,
    uploadProgress,
    uploadImage,
    deleteMedia,
    refreshMedia: fetchMedia,
  };
}
