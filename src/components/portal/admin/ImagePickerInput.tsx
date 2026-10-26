"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaLibraryModal } from "./MediaLibraryModal";
import { useMediaLibrary } from "@/lib/data/mediaStore";
import { formatBytes } from "@/lib/media/imageCompressor";
import {
  FolderOpen,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";

interface ImagePickerInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultCategory?: "Programs" | "News" | "Stories" | "Gallery" | "Banners" | "Uploads";
  className?: string;
}

export function ImagePickerInput({
  label = "Image Asset Path / URL",
  value,
  onChange,
  placeholder = "/programs/scholarships.png",
  defaultCategory = "Uploads",
  className = "",
}: ImagePickerInputProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [compressionBadge, setCompressionBadge] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImage, isUploading } = useMediaLibrary();

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const res = await uploadImage(file, undefined, defaultCategory);

    if (res.success && res.item) {
      onChange(res.item.url);
      if (res.compression) {
        setCompressionBadge(
          `Compressed ${formatBytes(res.compression.originalSize)} → ${formatBytes(
            res.compression.compressedSize
          )} (-${res.compression.compressionRatio}%)`
        );
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#0e705b]" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2">
          {/* Hidden File Input for Direct Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleQuickUpload}
            className="hidden"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLibraryOpen(true)}
            className="h-7 text-xs font-semibold gap-1.5 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#0e705b]" />
            <span>Choose from Library</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="h-7 text-xs font-semibold gap-1.5 border-emerald-300 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/70"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Compressing...</span>
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 text-emerald-700" />
                <span>Upload & Compress</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preview Box & Input Row */}
      <div className="flex items-start gap-3">
        {/* Thumbnail Preview */}
        <div className="w-16 h-12 rounded-lg border border-slate-200 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback to icon if image fails to load
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-400 stroke-[1.5]" />
          )}
        </div>

        {/* Text Input with Clear Button */}
        <div className="flex-1 min-w-0 relative">
          <Input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setCompressionBadge(null);
            }}
            placeholder={placeholder}
            className="pr-8 text-xs font-mono h-12"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setCompressionBadge(null);
              }}
              className="absolute right-2.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded"
              title="Clear image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Smart Compression Badge if triggered */}
      {compressionBadge && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-200 animate-in fade-in duration-200">
          <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>{compressionBadge}</span>
          <button
            type="button"
            onClick={() => setCompressionBadge(null)}
            className="ml-auto text-emerald-600 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Full Media Library Modal Dialog */}
      <MediaLibraryModal
        open={isLibraryOpen}
        onOpenChange={setIsLibraryOpen}
        currentValue={value}
        onSelectImage={(newUrl) => {
          onChange(newUrl);
          setCompressionBadge(null);
        }}
        defaultCategory={defaultCategory}
      />
    </div>
  );
}
