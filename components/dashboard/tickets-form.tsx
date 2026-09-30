"use client";

import React, { useState } from "react";
import {
  Plus,
  Mail,
  Zap,
  Tag,
  X,
  Save,
  Trash2,
  Settings2,
  Edit3,
  RefreshCcw,
  MessageSquare,
  Hash,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TicketConfig, TicketCategory, TicketEmbed } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TicketsFormProps {
  initialConfig: TicketConfig;
  guildId: string;
}

export function TicketsForm({ initialConfig, guildId }: TicketsFormProps) {
  const [config, setConfig] = useState<TicketConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ index: number; data: TicketCategory } | null>(null);
  const [editingEmbed, setEditingEmbed] = useState<TicketEmbed | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function fetchUpdatedConfig() {
    try {
      const data = await api.getTickets(guildId);
      setConfig(data);
    } catch (err) {
      console.error("Failed to fetch ticket config:", err);
    }
  }

  const handleUpdate = async (updateData: any) => {
    setSaving(true);
    const promise = api.updateTickets(guildId, updateData);
    toast.promise(promise, {
      loading: "Updating ticket settings...",
      success: "Settings updated successfully",
      error: "Failed to update settings",
    });
    try {
      await promise;
      await fetchUpdatedConfig();
      setIsAdding(false);
      setEditingCategory(null);
      setEditingEmbed(null);
    } catch (err) {
      console.error("Failed to update settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory({
      index: -1,
      data: { name: "", emoji: "📩", staff_roles: [], button_style: 2, discord_category_id: "" },
    });
    setIsAdding(true);
  };

  const handleRemoveCategory = (index: number) => {
    const newCategories = [...config.categories];
    newCategories.splice(index, 1);
    handleUpdate({ categories: newCategories });
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    const newCategories = [...config.categories];
    if (isAdding) {
      newCategories.push(editingCategory.data);
    } else {
      newCategories[editingCategory.index] = editingCategory.data;
    }
    handleUpdate({ categories: newCategories });
  };

  const handleSaveEmbed = () => {
    if (!editingEmbed) return;
    handleUpdate({
      embed_title: editingEmbed.title,
      embed_description: editingEmbed.description,
      embed_color: editingEmbed.color,
      embed_image_url: editingEmbed.image_url,
      embed_thumbnail_url: editingEmbed.thumbnail_url,
    });
  };

  const handleSaveGlobal = () => {
    handleUpdate({
      panel_channel: config.panel_channel,
      logging_channel: config.logging_channel,
      closed_category: config.closed_category,
      panel_type: config.panel_type,
      staff_roles: config.staff_roles,
    });
  };

  return (
    <>
      {/* Category Editor Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                {isAdding ? <Plus className="h-4 w-4 text-zinc-400" /> : <Edit3 className="h-4 w-4 text-zinc-400" />}
                {isAdding ? "Add Category" : "Edit Category"}
              </h3>
              <button onClick={() => setEditingCategory(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Category Name</label>
                <Input
                  value={editingCategory.data.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, data: { ...editingCategory.data, name: e.target.value } })}
                  placeholder="e.g. Bug Reports"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Emoji Icon</label>
                  <Input
                    value={editingCategory.data.emoji || ""}
                    onChange={(e) => setEditingCategory({ ...editingCategory, data: { ...editingCategory.data, emoji: e.target.value } })}
                    placeholder="e.g. 🐛"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Staff Roles (IDs)</label>
                  <Input
                    value={editingCategory.data.staff_roles.join(", ")}
                    onChange={(e) => {
                      const roles = e.target.value.split(",").map((id) => id.trim()).filter((id) => id && !isNaN(Number(id))).map(Number);
                      setEditingCategory({ ...editingCategory, data: { ...editingCategory.data, staff_roles: roles } });
                    }}
                    placeholder="ID1, ID2..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Button Style</label>
                  <Select
                    value={String(editingCategory.data.button_style || 2)}
                    onValueChange={(val) =>
                      setEditingCategory({ ...editingCategory, data: { ...editingCategory.data, button_style: parseInt(val) } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Blurple</SelectItem>
                      <SelectItem value="1">Grey</SelectItem>
                      <SelectItem value="3">Green</SelectItem>
                      <SelectItem value="4">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Discord Category ID</label>
                  <Input
                    value={editingCategory.data.discord_category_id || ""}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, data: { ...editingCategory.data, discord_category_id: e.target.value } })
                    }
                    placeholder="Created tickets go here"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setEditingCategory(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSaveCategory} disabled={saving || !editingCategory.data.name}>
                  {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Category
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embed Appearance Editor Modal */}
      {editingEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-zinc-400" />
                Customize Panel Appearance
              </h3>
              <button onClick={() => setEditingEmbed(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Embed Title</label>
                <Input
                  value={editingEmbed.title || ""}
                  onChange={(e) => setEditingEmbed({ ...editingEmbed, title: e.target.value })}
                  placeholder="e.g. Support Department"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Embed Description</label>
                <Textarea
                  value={editingEmbed.description || ""}
                  onChange={(e) => setEditingEmbed({ ...editingEmbed, description: e.target.value })}
                  placeholder="Open a ticket below to talk to our staff..."
                  className="h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Color (Decimal)</label>
                  <Input
                    value={editingEmbed.color || ""}
                    onChange={(e) => setEditingEmbed({ ...editingEmbed, color: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="e.g. 16711680 for Red"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Thumbnail URL</label>
                  <Input
                    value={editingEmbed.thumbnail_url || ""}
                    onChange={(e) => setEditingEmbed({ ...editingEmbed, thumbnail_url: e.target.value })}
                    placeholder="Small top-right image"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Main Image URL</label>
                <Input
                  value={editingEmbed.image_url || ""}
                  onChange={(e) => setEditingEmbed({ ...editingEmbed, image_url: e.target.value })}
                  placeholder="Large bottom image"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setEditingEmbed(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSaveEmbed} disabled={saving}>
                  {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Appearance
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Setup */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-zinc-400" />
                Global Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Panel Channel ID</label>
                  <Input
                    value={config.panel_channel || ""}
                    onChange={(e) => setConfig({ ...config, panel_channel: e.target.value })}
                    placeholder="Where the ticket panel lives"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Logging Channel ID</label>
                  <Input
                    value={config.logging_channel || ""}
                    onChange={(e) => setConfig({ ...config, logging_channel: e.target.value })}
                    placeholder="Where transcripts go"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Closed Tickets Category ID</label>
                  <Input
                    value={config.closed_category || ""}
                    onChange={(e) => setConfig({ ...config, closed_category: e.target.value })}
                    placeholder="Archive closed tickets here"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Panel Interaction Type</label>
                  <Select value={config.panel_type || "button"} onValueChange={(val) => setConfig({ ...config, panel_type: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="button">Buttons</SelectItem>
                      <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Global Staff Role IDs</label>
                  <Input
                    value={config.staff_roles.join(", ")}
                    onChange={(e) => {
                      const roles = e.target.value.split(",").map((id) => id.trim()).filter((id) => id && !isNaN(Number(id))).map(Number);
                      setConfig({ ...config, staff_roles: roles });
                    }}
                    placeholder="ID1, ID2... These roles can see all tickets"
                  />
                </div>
              </div>

              <Button onClick={handleSaveGlobal} disabled={saving} variant="secondary" className="w-full">
                {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Core Settings
              </Button>
            </CardContent>
          </Card>

          {/* Categories Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-zinc-400" />
                  Ticket Categories
                </CardTitle>
                <Button size="sm" variant="outline" onClick={handleAddCategory}>
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.categories.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-sm">
                        {cat.emoji || "📩"}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">{cat.name}</span>
                        <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                          <Shield className="h-2.5 w-2.5" />
                          {cat.staff_roles && cat.staff_roles.length > 0 ? `${cat.staff_roles.length} Staff Roles` : "Global Staff"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingCategory({ index: i, data: { ...cat } });
                          setIsAdding(false);
                        }}
                        className="p-1.5 hover:bg-white/5 rounded-md text-zinc-500 hover:text-white transition-colors"
                      >
                        <Settings2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemoveCategory(i)}
                        className="p-1.5 hover:bg-red-500/10 rounded-md text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats & Configuration */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <MessageSquare className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-zinc-500">Currently Open</p>
              <h3 className="text-2xl font-display font-bold text-white mt-0.5">{config.open_ticket_count} Tickets</h3>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-zinc-400" />
                Panel Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[10px] font-medium text-zinc-600 mb-0.5">Title</p>
                <p className="text-sm text-zinc-300 font-medium truncate">{config.embed.title || "Support Department"}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <p className="text-[10px] font-medium text-zinc-600 mb-0.5">Description</p>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {config.embed.description || "Open a ticket below to talk to our staff."}
                </p>
              </div>
            </CardContent>
            <CardContent>
              <Button variant="secondary" className="w-full" onClick={() => setEditingEmbed({ ...config.embed })}>
                Edit Appearance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
