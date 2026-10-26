/**
 * Utility for client-side image compression using HTMLCanvasElement.
 * Resizes high-resolution camera / smartphone photos (often 5-15MB)
 * down to web-optimized dimensions (default max 1600px) and compresses to WebP or JPEG.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.82)
  outputFormat?: "image/webp" | "image/jpeg" | "image/png";
}

export interface CompressionResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number; // percentage saved, e.g. 85.5
  width: number;
  height: number;
  fileName: string;
  mimeType: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    outputFormat = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (event) => {
      const img = new Image();

      img.onerror = () => reject(new Error("Failed to load image into element"));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate aspect ratio scaling
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D canvas context"));
          return;
        }

        // Better interpolation on downscale
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Export as compressed data URL
        // Fallback to image/jpeg if webp isn't fully supported
        let dataUrl: string;
        try {
          dataUrl = canvas.toDataURL(outputFormat, quality);
          // If browser doesn't support webp dataURL export, it returns image/png
          if (outputFormat === "image/webp" && !dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
        } catch {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        // Calculate size from base64 string
        // base64 length * 3/4 - padding
        const base64Data = dataUrl.split(",")[1] || "";
        const compressedSize = Math.round((base64Data.length * 3) / 4);
        const originalSize = file.size;
        const savedPercent =
          originalSize > 0
            ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
            : 0;

        resolve({
          dataUrl,
          originalSize,
          compressedSize,
          compressionRatio: savedPercent,
          width,
          height,
          fileName: file.name,
          mimeType: dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";")),
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
