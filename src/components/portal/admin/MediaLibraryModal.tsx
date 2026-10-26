"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMediaLibrary, type MediaItem } from "@/lib/data/mediaStore";
import { formatBytes } from "@/lib/media/imageCompressor";
import {
  Upload,
  Search,
  CheckCircle2,
  Image as ImageIcon,
  Check,
  Sparkles,
  Trash2,
  Filter,
  Loader2,
  FolderOpen,
} from "lucide-react";

interface MediaLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (url: string, item?: MediaItem) => void;
  currentValue?: string;
  defaultCategory?: "Programs" | "News" | "Stories" | "Gallery" | "Banners" | "Uploads";
}

export function MediaLibraryModal({
  open,
  onOpenChange,
  onSelectImage,
  currentValue = "",
  defaultCategory = "Uploads",
}: MediaLibraryModalProps) {
  const {
    mediaItems,
    isLoading,
    isUploading,
    uploadProgress,
    uploadImage,
    deleteMedia,
  } = useMediaLibrary();

  const [selectedUrl, setSelectedUrl] = useState<string>(currentValue);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lastCompressionStat, setLastCompressionStat] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", "Uploads", "Programs", "News", "Stories", "Gallery", "Banners"];

  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const res = await uploadImage(file, undefined, defaultCategory);

    if (res.success && res.item) {
      setSelectedUrl(res.item.url);
      setSelectedItem(res.item);
      if (res.compression) {
        setLastCompressionStat(
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

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl, selectedItem || undefined);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl lg:max-w-5xl w-[95vw] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-[#0e705b]" />
                  <span>Media Library & Image Chooser</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 mt-0.5">
                  Choose from existing site assets or upload high-resolution images with automatic client-side compression.
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Direct Upload Button */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs gap-1.5 shadow-xs"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Compressing & Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Compress Image</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Compression notice banner if just uploaded */}
          {lastCompressionStat && (
            <div className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Smart Compression Active: {lastCompressionStat}</span>
              </div>
              <button
                type="button"
                onClick={() => setLastCompressionStat(null)}
                className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Search & Filter Toolbar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images by name or path..."
                className="pl-8 text-xs h-8"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#0e705b] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredMedia.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-600">No media found matching your filter.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs"
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {filteredMedia.map((item) => {
                const isSelected = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedUrl(item.url);
                      setSelectedItem(item);
                    }}
                    className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col bg-slate-50 ${
                      isSelected
                        ? "border-[#0e705b] shadow-md ring-2 ring-[#0e705b]/20 scale-[1.02]"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="aspect-4/3 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Selected checkmark badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0e705b] text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-900/75 backdrop-blur-xs text-white">
                        {item.category}
                      </span>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-2 bg-white flex flex-col justify-between flex-1">
                      <p className="text-xs font-semibold text-slate-800 truncate" title={item.title}>
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span>{item.sizeBytes ? formatBytes(item.sizeBytes) : "Optimized"}</span>
                        {!item.isDefault && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete "${item.title}" from library?`)) {
                                deleteMedia(item.id);
                              }
                            }}
                            className="text-red-400 hover:text-red-600 p-0.5 rounded"
                            title="Delete image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 flex items-center gap-2 truncate max-w-md">
            {selectedUrl ? (
              <>
                <span className="font-bold text-slate-900">Selected:</span>
                <span className="truncate font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {selectedUrl.startsWith("data:") ? "Uploaded & Compressed Image" : selectedUrl}
                </span>
              </>
            ) : (
              <span className="text-slate-400 italic">Select an image from the library above</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmSelect}
              disabled={!selectedUrl}
              className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs font-bold gap-1.5 shadow-xs disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Use Selected Image</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
