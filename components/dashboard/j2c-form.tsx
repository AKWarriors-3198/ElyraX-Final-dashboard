"use client";

import React, { useState } from "react";
import { Mic, Save, RefreshCcw, Settings2, Headset, Power } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface J2CFormProps {
  initialConfig: any;
  channels: any[];
  guildId: string;
}

export function J2CForm({ initialConfig, channels, guildId }: J2CFormProps) {
  const [config, setConfig] = useState<any>(initialConfig);
  const [isEnabled, setIsEnabled] = useState<boolean>(initialConfig.join_channel_id !== null);
  const [saving, setSaving] = useState(false);

  const voiceChannels = channels.filter((c) => ["2", "13", 2, 13].includes(c.type));
  const textChannels = channels.filter((c) => ["0", "5", 0, 5].includes(c.type));
  const categoryChannels = channels.filter((c) => ["4", 4].includes(c.type));

  const handleSave = async () => {
    setSaving(true);
    const payload = isEnabled
      ? {
          join_channel_id: config.join_channel_id,
          control_channel_id: config.control_channel_id,
          category_id: config.category_id,
        }
      : {
          join_channel_id: null,
          control_channel_id: null,
          category_id: null,
        };

    const promise = api.updateJ2C(guildId, payload);

    toast.promise(promise, {
      loading: "Saving Join to Create configuration...",
      success: "Join to Create settings saved successfully!",
      error: "Failed to update Join to Create config",
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Power className="h-4 w-4 text-zinc-400" />
                  System Status
                </CardTitle>
                <CardDescription>Enable or disable the Join to Create module</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isEnabled ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                    )}
                  />
                  <span className="text-[11px] font-medium text-zinc-400">
                    {isEnabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={cn(
                  "p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3 transition-all duration-200",
                  !isEnabled && "opacity-50 pointer-events-none"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <Mic className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Join Channel</h4>
                    <p className="text-[11px] text-zinc-500">Voice channel users join to trigger creation</p>
                  </div>
                </div>

                <Select
                  value={config.join_channel_id ? config.join_channel_id : "none"}
                  onValueChange={(val) => setConfig({ ...config, join_channel_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice channel..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="none">Not Set</SelectItem>
                    {voiceChannels.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className={cn(
                  "p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3 transition-all duration-200",
                  !isEnabled && "opacity-50 pointer-events-none"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <Headset className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Control Panel Channel</h4>
                    <p className="text-[11px] text-zinc-500">Channel where users manage their private VCs</p>
                  </div>
                </div>

                <Select
                  value={config.control_channel_id ? config.control_channel_id : "none"}
                  onValueChange={(val) => setConfig({ ...config, control_channel_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a text channel..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="none">Not Set</SelectItem>
                    {textChannels.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className={cn(
                  "p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3 transition-all duration-200",
                  !isEnabled && "opacity-50 pointer-events-none"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <Settings2 className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Target Category</h4>
                    <p className="text-[11px] text-zinc-500">Category where temporary voice channels are created</p>
                  </div>
                </div>

                <Select
                  value={config.category_id ? config.category_id : "none"}
                  onValueChange={(val) => setConfig({ ...config, category_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Automatic (Same as Join Channel)..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="none">Automatic (Same as Join Channel)</SelectItem>
                    {categoryChannels.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving || (isEnabled && !config.join_channel_id)}
              className="w-full h-11 gap-2"
            >
              {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isEnabled && !config.join_channel_id ? "Select a channel to save" : "Save Configuration"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Join to Create instantly creates a private, temporary voice channel for any user who connects to the master
              Join Channel.
            </p>
            <ul className="text-[11px] text-zinc-600 space-y-1.5">
              <li>• The voice channel is owned by the creator.</li>
              <li>• When the last person leaves, the channel is automatically deleted.</li>
              <li>• The Control Panel allows owners to lock, unlock, limit members, and kick users.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
