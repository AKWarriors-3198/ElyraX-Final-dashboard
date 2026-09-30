"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  UserPlus,
  ShieldAlert,
  Mic,
  Settings,
  Hash,
  BellRing,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LoggingConfig, DiscordChannel } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LOG_CATEGORIES = [
  { id: "message_events", name: "Message Events", icon: MessageSquare, description: "Log message deletions, edits, and bulk removals." },
  { id: "join_leave_events", name: "Join & Leave Events", icon: UserPlus, description: "Track when members join or leave the server." },
  { id: "member_moderation", name: "Moderation Events", icon: ShieldAlert, description: "Log kicks, bans, and timeout updates." },
  { id: "voice_events", name: "Voice Events", icon: Mic, description: "Track members joining, leaving, or moving voice channels." },
  { id: "role_events", name: "Role Changes", icon: Settings, description: "Log role creation, deletion, and permission updates." },
  { id: "channel_events", name: "Channel Changes", icon: Hash, description: "Track channel creation, deletion, and settings updates." },
];

interface LoggingFormProps {
  initialConfig: LoggingConfig;
  channels: DiscordChannel[];
  guildId: string;
}

export function LoggingForm({ initialConfig, channels, guildId }: LoggingFormProps) {
  const [config, setConfig] = useState<LoggingConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleToggle = async (categoryId: string, enabled: boolean) => {
    const newLogEnabled = { ...config.log_enabled, [categoryId]: enabled };
    setConfig({ ...config, log_enabled: newLogEnabled });

    try {
      await api.updateLogging(guildId, {
        log_enabled: { [categoryId]: enabled },
      });
      toast.success(`${enabled ? "Enabled" : "Disabled"} ${categoryId.replace("_", " ")} logging`);
    } catch (err: any) {
      setConfig(config);
      toast.error("Failed to update logging setting.");
    }
  };

  const handleChannelChange = async (categoryId: string, channelId: string) => {
    const newLogChannels = { ...config.log_channels, [categoryId]: parseInt(channelId) };
    setConfig({ ...config, log_channels: newLogChannels });

    setSaving(true);
    const promise = api.updateLogging(guildId, {
      log_channels: { [categoryId]: parseInt(channelId) },
    });

    toast.promise(promise, {
      loading: "Updating log channel...",
      success: "Log channel updated successfully",
      error: "Failed to update log channel",
    });

    try {
      await promise;
    } catch (err: any) {
      setConfig(config);
    } finally {
      setSaving(false);
    }
  };

  const channelOptions = channels.map((c) => ({
    value: c.id.toString(),
    label: `#${c.name}`,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-3">
        {LOG_CATEGORIES.map((cat) => (
          <Card key={cat.id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <cat.icon className="h-4 w-4 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{cat.name}</h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{cat.description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-full sm:w-44">
                  <Select
                    value={config.log_channels[cat.id]?.toString() || ""}
                    onValueChange={(val) => handleChannelChange(cat.id, val)}
                    options={channelOptions}
                    placeholder="Select channel..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      config.log_enabled[cat.id] ? "text-emerald-400" : "text-zinc-600"
                    )}
                  >
                    {config.log_enabled[cat.id] ? "Active" : "Silent"}
                  </span>
                  <Switch
                    checked={!!config.log_enabled[cat.id]}
                    onCheckedChange={(val) => handleToggle(cat.id, val)}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-zinc-400" />
              Logging Engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5">
              <p className="text-[11px] font-medium text-zinc-500">Intelligent Routing</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Assign specific channels to different event types for better organization.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5">
              <p className="text-[11px] font-medium text-zinc-500">Webhooks</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Coming soon: Export audit logs to external webhooks and elastic systems.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              Audit Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-xs text-zinc-500">Protected Roles</span>
                <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                  {config.ignore_roles.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-xs text-zinc-500">Secure Channels</span>
                <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded">
                  {config.ignore_channels.length}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-600 mt-3 text-center">
              Events from these entities are currently bypassed by the audit logger.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
