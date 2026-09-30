"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Server,
  User,
  Settings,
  RefreshCcw,
  Save,
  MessageSquare,
  Plus,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AntiNukeConfig } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  { id: "anti_ban_kick", name: "Anti Ban & Kick", desc: "Auto bans rogue admins", icon: User },
  { id: "anti_server_edit", name: "Anti Server Edit", desc: "Secures icon, name & regions", icon: Server },
  { id: "anti_role_modifier", name: "Anti Role Modifier", desc: "Protects all roles & perms", icon: Settings },
  { id: "anti_channel_nukes", name: "Anti Channel Nukes", desc: "Prevents channel wipes", icon: MessageSquare },
];

interface AntiNukeFormProps {
  initialConfig: AntiNukeConfig;
  guildId: string;
}

export function AntiNukeForm({ initialConfig, guildId }: AntiNukeFormProps) {
  const [config, setConfig] = useState<AntiNukeConfig>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [wlInput, setWlInput] = useState("");
  const [whitelistedUsers, setWhitelistedUsers] = useState<string[]>(initialConfig.whitelisted_users || []);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateAntiNuke(guildId, config);
    toast.promise(promise, {
      loading: "Saving Anti-Nuke configuration...",
      success: "Anti-Nuke settings saved!",
      error: "Failed to update Anti-Nuke settings",
    });
    try {
      await promise;
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddWhitelist = async () => {
    if (!wlInput.trim() || isNaN(Number(wlInput))) {
      toast.error("Please enter a valid User ID");
      return;
    }
    if (whitelistedUsers.includes(wlInput.trim())) {
      toast.error("User is already whitelisted");
      return;
    }
    setSaving(true);
    try {
      await api.updateAntiNuke(guildId, { status: config.status, add_whitelist: wlInput.trim() });
      setWhitelistedUsers([...whitelistedUsers, wlInput.trim()]);
      setWlInput("");
      toast.success("User whitelisted successfully");
    } catch (err: any) {
      toast.error("Failed to whitelist user");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveWhitelist = async (userId: string) => {
    setSaving(true);
    try {
      await api.updateAntiNuke(guildId, { status: config.status, remove_whitelist: userId });
      setWhitelistedUsers(whitelistedUsers.filter((id) => id !== userId));
      toast.success("User removed from whitelist");
    } catch (err: any) {
      toast.error("Failed to remove user from whitelist");
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
                  Protection Modules
                </CardTitle>
                <CardDescription>Configure anti-nuke protection for your server</CardDescription>
              </div>
              <Switch
                checked={config.status}
                onCheckedChange={(val) => setConfig({ ...config, status: val })}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  config.status
                    ? "bg-white/[0.02] border-white/[0.06]"
                    : "bg-white/[0.01] border-white/[0.03] opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                        config.status
                          ? "bg-white/[0.04] text-zinc-300"
                          : "bg-white/[0.02] text-zinc-600"
                      )}
                    >
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{feature.name}</h3>
                      <p className="text-[11px] text-zinc-500">{feature.desc}</p>
                    </div>
                  </div>
                  {config.status && (
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[11px] font-medium text-emerald-400">Protected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Whitelisted Users
            </CardTitle>
            <CardDescription>Users who are exempt from anti-nuke actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="User ID..."
                value={wlInput}
                onChange={(e) => setWlInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddWhitelist} disabled={saving} variant="secondary" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {whitelistedUsers.length === 0 ? (
                <p className="text-xs text-zinc-600 text-center py-4">No users whitelisted.</p>
              ) : (
                whitelistedUsers.map((userId) => (
                  <div
                    key={userId}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-white/[0.03] flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-zinc-500" />
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{userId}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveWhitelist(userId)}
                      disabled={saving}
                      className="h-7 w-7 p-0 text-zinc-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="w-full h-11">
          {saving ? (
            <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Configuration
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">Maximum Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Anti-Nuke is fixed to instantly ban malicious actors. Ensure that ElyraX&apos;s role
              is at the TOP of the role hierarchy for it to be able to ban admins.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-400">Fixed Punishments</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
