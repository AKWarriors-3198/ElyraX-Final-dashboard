"use client";

import React, { useState } from "react";
import { UserPlus, Save, RefreshCcw, User, Bot, Trash2, ShieldCheck, Info } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AutoRoleConfig, DiscordRole } from "@/types/api";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AutoRoleFormProps {
  initialConfig: AutoRoleConfig;
  roles: DiscordRole[];
  guildId: string;
}

export function AutoRoleForm({ initialConfig, roles, guildId }: AutoRoleFormProps) {
  const [config, setConfig] = useState<AutoRoleConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      bots: config.bots,
      humans: config.humans,
    };
    const promise = api.updateAutoRole(guildId, data);
    toast.promise(promise, {
      loading: "Saving AutoRole configuration...",
      success: "Settings saved successfully!",
      error: "Failed to update AutoRole config",
    });
    try {
      await promise;
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addRole = (type: "humans" | "bots", roleId: string) => {
    if (config[type].includes(roleId)) return;
    if (config[type].length >= 10) {
      toast.error(`You can only add up to 10 roles for ${type === "humans" ? "Members" : "Bots"}.`);
      return;
    }
    setConfig({ ...config, [type]: [...config[type], roleId] });
  };

  const removeRole = (type: "humans" | "bots", roleId: string) => {
    setConfig({ ...config, [type]: config[type].filter((r) => r !== roleId) });
  };

  const formatColor = (decimal: number) => {
    if (!decimal || decimal === 0) return "#94a3b8";
    return `#${decimal.toString(16).padStart(6, "0")}`;
  };

  const renderRoleList = (type: "humans" | "bots") => {
    const title = type === "humans" ? "Member Roles" : "Bot Roles";
    const Icon = type === "humans" ? User : Bot;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Icon className="h-4 w-4 text-zinc-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">{title}</h4>
            <p className="text-[11px] text-zinc-500">Roles given to newly joined {type}.</p>
          </div>
        </div>

        <Select value="" onValueChange={(val) => addRole(type, val)}>
          <SelectTrigger>
            <SelectValue placeholder={`Add a ${type === "humans" ? "member" : "bot"} role...`} />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {roles
              .filter((r) => !config[type].includes(r.id))
              .sort((a, b) => (b.position || 0) - (a.position || 0))
              .map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: formatColor(r.color) }} />
                    <span>{r.name}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="grid grid-cols-1 gap-2 min-h-[80px] p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          {config[type].length === 0 ? (
            <div className="flex flex-col items-center justify-center opacity-30 py-4">
              <ShieldCheck className="h-6 w-6 mb-1.5" />
              <span className="text-[11px]">No roles selected</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {config[type].map((roleId) => {
                const role = roles.find((r) => r.id === roleId);
                const color = role ? formatColor(role.color) : "#94a3b8";
                return (
                  <div
                    key={roleId}
                    className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md text-xs group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-zinc-300">{role ? role.name : `Unknown (${roleId})`}</span>
                    <button
                      onClick={() => removeRole(type, roleId)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-0.5 rounded hover:bg-red-400/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-zinc-400" />
              AutoRole Configuration
            </CardTitle>
            <CardDescription>Automatically assign roles to new members and bots</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderRoleList("humans")}
              {renderRoleList("bots")}
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Button onClick={handleSave} disabled={saving} className="w-full h-11">
                {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save AutoRole Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4 text-zinc-400" />
              Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              AutoRole ensures every new member is welcomed with the right sets of roles immediately upon joining.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <div className="h-1 w-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Hierarchy Matter:</span> Ensure ElyraX&apos;s top role is{" "}
                  <span className="text-zinc-300">higher</span> than any role you select here.
                </p>
              </div>
              <div className="flex gap-2.5">
                <div className="h-1 w-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Bot Detection:</span> We automatically separate bots from
                  human members for precise role assignment.
                </p>
              </div>
              <div className="flex gap-2.5">
                <div className="h-1 w-1 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  <span className="text-zinc-300 font-medium">Limits:</span> We support up to 10 roles per category for
                  stability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
