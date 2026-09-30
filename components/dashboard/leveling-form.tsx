"use client";

import React, { useState } from "react";
import {
  Save,
  RefreshCcw,
  Zap,
  Clock,
  Hash,
  Palette,
  Layout,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LevelingConfig } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LevelingFormProps {
  initialConfig: LevelingConfig;
  guildId: string;
}

export function LevelingForm({ initialConfig, guildId }: LevelingFormProps) {
  const [config, setConfig] = useState<LevelingConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const promise = api.updateLeveling(guildId, {
      enabled: config.enabled,
      xp_per_message: config.xp_per_message,
      cooldown: config.cooldown,
      level_up_channel: config.level_up_channel,
      embed_color: config.embed_style.color,
    });

    toast.promise(promise, {
      loading: "Saving leveling settings...",
      success: "Leveling settings updated successfully!",
      error: "Failed to update leveling settings",
    });

    try {
      await promise;
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-16">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-zinc-400" />
                  Leveling Engine
                </CardTitle>
                <CardDescription>Configure XP and leveling for your server</CardDescription>
              </div>
              <Switch
                checked={config.enabled}
                onCheckedChange={() => setConfig({ ...config, enabled: !config.enabled })}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5 flex items-center gap-1.5">
                  <Zap className="h-3 w-3" />
                  XP Per Message
                </label>
                <Input
                  type="number"
                  value={config.xp_per_message}
                  onChange={(e) =>
                    setConfig({ ...config, xp_per_message: parseInt(e.target.value) || 0 })
                  }
                  placeholder="20"
                  disabled={!config.enabled}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Cooldown (seconds)
                </label>
                <Input
                  type="number"
                  value={config.cooldown}
                  onChange={(e) =>
                    setConfig({ ...config, cooldown: parseInt(e.target.value) || 0 })
                  }
                  placeholder="60"
                  disabled={!config.enabled}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5 flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                Level Up Channel ID
              </label>
              <Input
                value={config.level_up_channel || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    level_up_channel: e.target.value
                      ? parseInt(e.target.value.replace(/\D/g, ""))
                      : null,
                  })
                }
                placeholder="Discord Channel ID"
                disabled={!config.enabled}
                className="font-mono"
              />
            </div>

            <Button type="submit" disabled={saving} className="w-full h-11">
              {saving ? (
                <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Updating..." : "Update Leveling Engine"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-zinc-400" />
              Rank Card Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-zinc-500 pl-0.5">
                  Card Color
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-lg border border-white/[0.08] shadow-inner"
                    style={{ backgroundColor: config.embed_style.color }}
                  />
                  <Input
                    value={config.embed_style.color}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        embed_style: { ...config.embed_style, color: e.target.value },
                      })
                    }
                    className="font-mono"
                    disabled={!config.enabled}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Layout className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-300">Thumbnail</span>
                </div>
                <Switch
                  checked={config.embed_style.thumbnail}
                  onCheckedChange={(val) =>
                    setConfig({
                      ...config,
                      embed_style: { ...config.embed_style, thumbnail: val },
                    })
                  }
                  disabled={!config.enabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">Leveling Logic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
              <p>
                Members earn <span className="text-white font-medium">XP</span> by chatting.
              </p>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] font-mono text-zinc-500">
                5 * (level ^ 2) + (50 * level) + 100
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
