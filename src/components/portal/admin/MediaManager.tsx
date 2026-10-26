"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMediaLibrary, type MediaItem } from "@/lib/data/mediaStore";
import { formatBytes } from "@/lib/media/imageCompressor";
import {
  FolderOpen,
  Upload,
  Search,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  HardDrive,
} from "lucide-react";

export function MediaManager() {
  const {
    mediaItems,
    isLoading,
    isUploading,
    uploadProgress,
    uploadImage,
    deleteMedia,
    refreshMedia,
  } = useMediaLibrary();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastCompression, setLastCompression] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", "Uploads", "Programs", "News", "Stories", "Gallery", "Banners"];

  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await uploadImage(file, undefined, "Uploads");
      if (res.success && res.compression) {
        setLastCompression(
          `Compressed ${file.name}: ${formatBytes(res.compression.originalSize)} → ${formatBytes(
            res.compression.compressedSize
          )} (-${res.compression.compressionRatio}%)`
        );
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const uploadsCount = mediaItems.filter((m) => !m.isDefault).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <Card className="border-slate-200 shadow-2xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-800">
                  <FolderOpen className="w-5 h-5" />
                </span>
                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">
                  Media Library & Asset Manager
                </CardTitle>
                <Badge variant="outline" className="text-amber-800 bg-amber-50 border-amber-200 font-semibold text-xs">
                  {mediaItems.length} Assets ({uploadsCount} Custom Uploads)
                </Badge>
              </div>
              <CardDescription className="text-xs text-slate-500 mt-1">
                Upload images with automatic in-browser compression (resizing high-res camera photos down to optimized WebP).
                Choose from these assets anytime when editing Programs, News, Stories, and Gallery.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white font-bold text-xs gap-1.5 shadow-xs"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{uploadProgress || "Compressing..."}</span>
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

          {/* Compression Alert */}
          {lastCompression && (
            <div className="mt-3 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lastCompression}</span>
              </div>
              <button
                type="button"
                onClick={() => setLastCompression(null)}
                className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Filters & Search Toolbar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media by title or path..."
                className="pl-8 text-xs h-8"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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
        </CardHeader>

        <CardContent className="pt-2">
          {filteredMedia.length === 0 ? (
            <div className="py-20 text-center text-slate-400 space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-600">No media assets match your query.</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-[#0e705b] hover:shadow-md transition-all flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="aspect-4/3 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category pill */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                      {item.category}
                    </span>

                    {/* Quick copy overlay button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item.url, item.id)}
                        className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 text-[11px] font-bold shadow-md hover:bg-white flex items-center gap-1"
                        title="Copy image URL"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-2.5 bg-white flex flex-col justify-between flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate" title={item.title}>
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{item.sizeBytes ? formatBytes(item.sizeBytes) : "Optimized"}</span>
                      {!item.isDefault && (
                        <button
                          type="button"
                          onClick={() => {
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
