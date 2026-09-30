"use client";

import React, { useState } from "react";
import { ShieldCheck, RefreshCcw, Save, Hash, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VerificationConfig, DiscordChannel } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VerificationFormProps {
  initialConfig: VerificationConfig;
  channels: DiscordChannel[];
  roles: any[];
  guildId: string;
}

export function VerificationForm({ initialConfig, channels, roles, guildId }: VerificationFormProps) {
  const [config, setConfig] = useState<VerificationConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const textChannels = channels.filter((c) => c.type === "0");

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateVerification(guildId, config);
    toast.promise(promise, {
      loading: "Saving Verification configuration...",
      success: "Verification settings saved successfully!",
      error: "Failed to update Verification config",
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
                  <ShieldCheck className="h-4 w-4 text-zinc-400" />
                  Verification System
                </CardTitle>
                <CardDescription>Enable or disable server verification</CardDescription>
              </div>
              <Switch
                checked={config.enabled}
                onCheckedChange={(val) => setConfig({ ...config, enabled: val })}
              />
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 transition-all duration-200 ${!config.enabled && "opacity-50 pointer-events-none"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Hash className="h-3 w-3" />
                  Verification Channel
                </label>
                <Select
                  value={config.verification_channel_id || "none"}
                  onValueChange={(val) => setConfig({ ...config, verification_channel_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not Set</SelectItem>
                    {textChannels.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        # {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-zinc-600">The channel where verifying users will use the command/buttons.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Hash className="h-3 w-3" />
                  Log Channel
                </label>
                <Select
                  value={config.log_channel_id || "none"}
                  onValueChange={(val) => setConfig({ ...config, log_channel_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select log channel..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not Set</SelectItem>
                    {textChannels.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        # {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-zinc-600">Channel to send verification success/fail logs.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <User className="h-3 w-3" />
                  Verified Role
                </label>
                <Select
                  value={config.verified_role_id || "none"}
                  onValueChange={(val) => setConfig({ ...config, verified_role_id: val === "none" ? null : val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select verified role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not Set</SelectItem>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={r.id.toString()}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: `#${r.color.toString(16).padStart(6, "0")}` }}
                          />
                          {r.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-zinc-600">The role given upon successful verification.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Settings className="h-3 w-3" />
                  Verification Method
                </label>
                <Select
                  value={config.verification_method || "both"}
                  onValueChange={(val) => setConfig({ ...config, verification_method: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="captcha">CAPTCHA Only</SelectItem>
                    <SelectItem value="button">Button Click Only</SelectItem>
                    <SelectItem value="both">Both Choices Setup</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-zinc-600">Select how users will be verified.</p>
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full h-11">
              {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Configuration
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
              ElyraX Verification ensures that no unauthorized bots or malicious users enter your server unverified.
            </p>
            <ul className="text-[11px] text-zinc-600 space-y-1.5">
              <li>• The bot will create a panel in your Verification Channel.</li>
              <li>• Unverified members must click &quot;Verify&quot;.</li>
              <li>• Captcha presents a unique image sequence.</li>
              <li>• Upon success, role is assigned.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
