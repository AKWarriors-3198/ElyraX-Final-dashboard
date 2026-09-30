"use client";

import React, { useState } from "react";
import {
  Zap,
  Type,
  Link as LinkIcon,
  MessageSquare,
  UserMinus,
  ShieldAlert,
  Gavel,
  RefreshCcw,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AutomodConfig } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PUNISHMENT_OPTIONS = [
  { value: "delete", label: "Delete Message" },
  { value: "warn", label: "Warn User" },
  { value: "mute", label: "Mute User" },
  { value: "kick", label: "Kick User" },
  { value: "ban", label: "Ban User" },
];

const RULES = [
  { id: "anti_spam", name: "Anti Spam", desc: "Detects and removes repetitive messages or rapid firing.", icon: Zap },
  { id: "anti_caps", name: "Anti Caps", desc: "Prevents excessive use of uppercase letters.", icon: Type },
  { id: "anti_links", name: "Anti Links", desc: "Blocks unauthorized external links in channels.", icon: LinkIcon },
  { id: "anti_invites", name: "Anti Invites", desc: "Automatically removes Discord server invite links.", icon: MessageSquare },
  { id: "anti_mentions", name: "Anti Mass Mention", desc: "Protects against mentioned spam (@everyone, @here).", icon: UserMinus },
];

interface AutomodFormProps {
  initialConfig: AutomodConfig;
  guildId: string;
}

export function AutomodForm({ initialConfig, guildId }: AutomodFormProps) {
  const [config, setConfig] = useState<AutomodConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const handlePunishmentChange = (ruleId: string, value: string) => {
    const newPunishments = { ...config.punishments };
    newPunishments[ruleId] = value;
    setConfig({ ...config, punishments: newPunishments });
  };

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateAutomod(guildId, {
      enabled: config.enabled,
      punishments: config.punishments,
    });
    toast.promise(promise, {
      loading: "Saving configuration...",
      success: "Configuration saved successfully!",
      error: (err) => err.message || "Failed to update settings",
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
                  <ShieldAlert className="h-4 w-4 text-zinc-400" />
                  Moderation Rules
                </CardTitle>
                <CardDescription>Configure automated moderation for your server</CardDescription>
              </div>
              <Switch
                checked={config.enabled}
                onCheckedChange={(val) => setConfig({ ...config, enabled: val })}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {RULES.map((rule) => {
              const isEnabled = config.enabled && config.punishments?.[rule.id] !== undefined;
              return (
                <div
                  key={rule.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all duration-200",
                    config.enabled
                      ? "bg-white/[0.02] border-white/[0.06]"
                      : "bg-white/[0.01] border-white/[0.03] opacity-50"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                          isEnabled
                            ? "bg-white/[0.04] text-zinc-300"
                            : "bg-white/[0.02] text-zinc-600"
                        )}
                      >
                        <rule.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{rule.name}</h3>
                        <p className="text-[11px] text-zinc-500">{rule.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isEnabled && (
                        <div className="flex items-center gap-2">
                          <Gavel className="h-3.5 w-3.5 text-zinc-500" />
                          <Select
                            value={config.punishments[rule.id] || "delete"}
                            onValueChange={(val) => handlePunishmentChange(rule.id, val)}
                            options={PUNISHMENT_OPTIONS}
                            className="w-36"
                          />
                        </div>
                      )}
                      <Switch
                        disabled={!config.enabled}
                        checked={config.punishments?.[rule.id] !== undefined}
                        onCheckedChange={() => {
                          const newPunishments = { ...config.punishments };
                          if (newPunishments[rule.id]) {
                            delete newPunishments[rule.id];
                          } else {
                            newPunishments[rule.id] = "delete";
                          }
                          setConfig({ ...config, punishments: newPunishments });
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="w-full h-11">
          {saving ? (
            <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Moderation Rules
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Logging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-zinc-500">Log Channel</span>
                <span className="text-[11px] font-mono text-zinc-400">
                  #{config.logging_channel || "None"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 text-center">
                Mod logs are automatically sent to the configured channel.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">Automod AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Our neural network analyzes message context to prevent false positives.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-emerald-400">V2 Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
