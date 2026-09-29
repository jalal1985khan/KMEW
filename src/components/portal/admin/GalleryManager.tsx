"use client";

import { useState } from "react";
import {
  GalleryItem,
  useGalleryItems,
  DEFAULT_GALLERY_IMAGES,
  GALLERY_CATEGORIES,
} from "@/lib/data/contentStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

interface GalleryManagerProps {
  onAuditLog?: (action: string, target: string) => void;
}

export function GalleryManager({ onAuditLog }: GalleryManagerProps) {
  const { gallery, addGallery, updateGallery, deleteGallery, resetGalleryToDefault } = useGalleryItems();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: GALLERY_CATEGORIES[0],
    image: DEFAULT_GALLERY_IMAGES[0].value,
    description: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filtered Gallery List
  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory !== "ALL" && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: GALLERY_CATEGORIES[0],
      image: DEFAULT_GALLERY_IMAGES[0].value,
      description: "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingItem) {
      updateGallery(editingItem.id, formData);
      if (onAuditLog) {
        onAuditLog("UPDATE_GALLERY", `Updated Gallery Item "${formData.title}"`);
      }
    } else {
      addGallery(formData);
      if (onAuditLog) {
        onAuditLog("CREATE_GALLERY", `Added Gallery Item "${formData.title}"`);
      }
    }

    setModalOpen(false);
  };

  const handleOpenDelete = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteGallery(itemToDelete.id);
      if (onAuditLog) {
        onAuditLog("DELETE_GALLERY", `Deleted Gallery Item "${itemToDelete.title}"`);
      }
      setItemToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-xs">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-700" />
                <span>Photo Gallery Section Management</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Upload empowerment moments, categorize activity photos, or edit and remove showcase cards.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetGalleryToDefault}
                className="text-xs text-slate-600 gap-1.5"
                title="Reset to default gallery photos"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Demo</span>
              </Button>

              <Button
                size="sm"
                onClick={handleOpenAdd}
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs font-bold gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </Button>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <Input
                placeholder="Search photos by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-9 text-xs px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="ALL">All Categories ({gallery.length})</option>
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {filteredGallery.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No gallery items found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/gallery/g1.png";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-slate-900/80 backdrop-blur-xs text-white border-0 text-[10px] font-bold px-2 py-0.5">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">ID: {item.id}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(item)}
                          className="h-7 px-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg gap-1"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDelete(item)}
                          className="h-7 px-2 text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Gallery Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-700" />
              <span>{editingItem ? "Edit Gallery Photo" : "Add New Gallery Photo"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Update the photo title, category, and visual assets for the public gallery showcase.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Photo Title / Event Name <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. Interactive Classroom at Evening Learning Center"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-xs"
              />
              {formErrors.title && <p className="text-[11px] text-rose-500">{formErrors.title}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Program Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-9 text-xs px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Selection with Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Photo URL & Presets</label>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/gallery/g1.png";
                    }}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Input
                    placeholder="Enter image URL or select from presets below"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="text-xs"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {DEFAULT_GALLERY_IMAGES.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.value })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border font-medium transition-colors ${
                          formData.image === preset.value
                            ? "bg-blue-100 text-blue-900 border-blue-300 font-bold"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Caption / Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Brief caption describing the students, activities, or location..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.description && (
                <p className="text-[11px] text-rose-500">{formErrors.description}</p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-[#0e705b] hover:bg-[#0a544b] text-white text-xs font-bold shadow-xs"
              >
                {editingItem ? "Save Photo" : "Add to Gallery"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Confirm Photo Deletion</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Are you sure you want to delete this photo? This will remove it from the public Photo Gallery.
            </DialogDescription>
          </DialogHeader>

          {itemToDelete && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={itemToDelete.image}
                  alt={itemToDelete.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-slate-900">{itemToDelete.title}</div>
                <div className="text-slate-500 text-[11px]">{itemToDelete.category}</div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
            >
              Delete Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
