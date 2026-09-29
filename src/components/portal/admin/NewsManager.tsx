"use client";

import { useState } from "react";
import {
  NewsEventItem,
  useNewsEvents,
  DEFAULT_NEWS_IMAGES,
  NEWS_CATEGORIES,
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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  Search,
  Filter,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

interface NewsManagerProps {
  onAuditLog?: (action: string, target: string) => void;
}

export function NewsManager({ onAuditLog }: NewsManagerProps) {
  const { news, addNews, updateNews, deleteNews, resetNewsToDefault } = useNewsEvents();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsEventItem | null>(null);

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<NewsEventItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: NEWS_CATEGORIES[0],
    date: "",
    location: "KMEW Central Auditorium, Kulti",
    image: DEFAULT_NEWS_IMAGES[0].value,
    summary: "",
    isUpcoming: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filtered News List
  const filteredNews = news.filter((item) => {
    if (selectedCategory !== "ALL" && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchLocation = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchLocation) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setFormData({
      title: "",
      category: NEWS_CATEGORIES[0],
      date: today,
      location: "KMEW Central Auditorium, Kulti",
      image: DEFAULT_NEWS_IMAGES[0].value,
      summary: "",
      isUpcoming: true,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (item: NewsEventItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      location: item.location,
      image: item.image,
      summary: item.summary,
      isUpcoming: item.isUpcoming,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.date.trim()) errors.date = "Date is required";
    if (!formData.summary.trim()) errors.summary = "Summary is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingItem) {
      updateNews(editingItem.id, formData);
      if (onAuditLog) {
        onAuditLog("UPDATE_NEWS", `Updated News Announcement "${formData.title}"`);
      }
    } else {
      addNews(formData);
      if (onAuditLog) {
        onAuditLog("CREATE_NEWS", `Published News Announcement "${formData.title}"`);
      }
    }

    setModalOpen(false);
  };

  const handleOpenDelete = (item: NewsEventItem) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteNews(itemToDelete.id);
      if (onAuditLog) {
        onAuditLog("DELETE_NEWS", `Deleted News Announcement "${itemToDelete.title}"`);
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
                <Newspaper className="w-4 h-4 text-emerald-700" />
                <span>News & Announcements Management</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Publish press releases, announce scholarship assemblies, or edit and remove upcoming events.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetNewsToDefault}
                className="text-xs text-slate-600 gap-1.5"
                title="Reset to default official notices"
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
                <span>New Announcement</span>
              </Button>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <Input
                placeholder="Search articles by title, location, or summary..."
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
                <option value="ALL">All Categories ({news.length})</option>
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase">
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title & Details</TableHead>
                  <TableHead className="w-36">Category</TableHead>
                  <TableHead className="w-36">Date & Venue</TableHead>
                  <TableHead className="w-28 text-center">Status</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-slate-500 text-xs">
                      No news announcements found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Image Thumbnail */}
                      <TableCell className="align-middle">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/news/scholarship.png";
                            }}
                          />
                        </div>
                      </TableCell>

                      {/* Title & Summary */}
                      <TableCell className="align-middle max-w-md">
                        <div className="font-bold text-slate-900 text-xs leading-snug line-clamp-1">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="align-middle">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border-emerald-200 px-2 py-0.5 whitespace-nowrap"
                        >
                          {item.category}
                        </Badge>
                      </TableCell>

                      {/* Date & Location */}
                      <TableCell className="align-middle text-xs text-slate-600">
                        <div className="flex items-center gap-1 font-medium text-slate-800">
                          <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate mt-0.5">
                          <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="align-middle text-center">
                        {item.isUpcoming ? (
                          <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold px-2 py-0.5">
                            Upcoming
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] font-medium text-slate-600 px-2 py-0.5">
                            Past Event
                          </Badge>
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="align-middle text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(item)}
                            className="h-8 w-8 p-0 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                            title="Edit announcement"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDelete(item)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete announcement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit News Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-700" />
              <span>{editingItem ? "Edit News Announcement" : "Publish New Announcement"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Fill in the notice details. Updates will immediately reflect on the public News & Events page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Notice Title <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. Annual Merit-Cum-Means Higher Education Scholarship Drive"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-xs"
              />
              {formErrors.title && <p className="text-[11px] text-rose-500">{formErrors.title}</p>}
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-9 text-xs px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {NEWS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Event Nature</label>
                <div className="flex items-center gap-3 h-9">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUpcoming}
                      onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="font-semibold">Mark as Upcoming Event</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Event / Notice Date <span className="text-rose-500">*</span>
                </label>
                <Input
                  placeholder="e.g. October 15, 2026"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="text-xs"
                />
                {formErrors.date && <p className="text-[11px] text-rose-500">{formErrors.date}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Venue / Location</label>
                <Input
                  placeholder="e.g. Barakar Municipal Hall"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Image Selection with Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Banner Image</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/news/scholarship.png";
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
                    {DEFAULT_NEWS_IMAGES.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.value })}
                        className={`text-[10px] px-2 py-0.5 rounded-md border font-medium transition-colors ${
                          formData.image === preset.value
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold"
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

            {/* Detailed Summary */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Notice Summary / Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Provide a concise briefing of the announcement, application instructions, or contact guidelines..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.summary && <p className="text-[11px] text-rose-500">{formErrors.summary}</p>}
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
                {editingItem ? "Save Changes" : "Publish Announcement"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Confirm Announcement Deletion</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Are you sure you want to delete this notice? This action will permanently remove it from the public website.
            </DialogDescription>
          </DialogHeader>

          {itemToDelete && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900">{itemToDelete.title}</div>
              <div className="text-slate-500 text-[11px]">
                {itemToDelete.category} • {itemToDelete.date}
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
              Delete Permanently
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
