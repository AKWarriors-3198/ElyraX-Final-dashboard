"use client";

import React, { useState } from "react";
import { Shield, Save, RefreshCcw, Star, Crown, Heart, Ghost, Settings } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomRolesFormProps {
  initialConfig: any;
  roles: any[];
  guildId: string;
}

const ROLE_INPUTS = [
  { label: "Staff Role", key: "staff", icon: Shield, color: "text-blue-400", bg: "bg-blue-400/[0.06]" },
  { label: "Girl Role", key: "girl", icon: Heart, color: "text-pink-400", bg: "bg-pink-400/[0.06]" },
  { label: "VIP Role", key: "vip", icon: Crown, color: "text-amber-400", bg: "bg-amber-400/[0.06]" },
  { label: "Guest Role", key: "guest", icon: Ghost, color: "text-zinc-400", bg: "bg-zinc-400/[0.06]" },
  { label: "Friend Role", key: "frnd", icon: Star, color: "text-emerald-400", bg: "bg-emerald-400/[0.06]" },
];

export function CustomRolesForm({ initialConfig, roles, guildId }: CustomRolesFormProps) {
  const [config, setConfig] = useState<any>(initialConfig);
  const [saving, setSaving] = useState(false);

  const filteredRoles = roles.filter((r) => r.name !== "@everyone");

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateCustomRoles(guildId, config);

    toast.promise(promise, {
      loading: "Saving Custom Roles configuration...",
      success: "Custom Roles settings saved successfully!",
      error: "Failed to update Custom Roles config",
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
                  <Settings className="h-4 w-4 text-zinc-400" />
                  Required Permission Role
                </CardTitle>
                <CardDescription>Users need this role to assign the custom roles below</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full lg:w-64">
              <Select
                value={config.reqrole?.toString() || "none"}
                onValueChange={(val) => setConfig({ ...config, reqrole: val === "none" ? null : parseInt(val) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select required role..." />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="none">None required / Admins only</SelectItem>
                  {filteredRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROLE_INPUTS.map((input) => (
                <div
                  key={input.key}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3 hover:border-white/[0.1] transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn("p-2 rounded-lg", input.bg, input.color)}>
                      <input.icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{input.label}</h4>
                      <p className="text-[11px] text-zinc-500">Role assigned via .{input.key} command</p>
                    </div>
                  </div>

                  <Select
                    value={config[input.key]?.toString() || "none"}
                    onValueChange={(val) => setConfig({ ...config, [input.key]: val === "none" ? null : parseInt(val) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="none">Not Set</SelectItem>
                      {filteredRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full h-11 gap-2">
              {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-blue-400/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">Command Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Allows your trusted server managers to grant specific preset roles with simple prefix commands.
            </p>
            <ul className="text-[11px] text-zinc-600 space-y-1.5">
              <li>
                • <code className="text-zinc-400">.staff @user</code> - Assigns/Removes Staff role
              </li>
              <li>
                • <code className="text-zinc-400">.girl @user</code> - Assigns/Removes Girl role
              </li>
              <li>
                • <code className="text-zinc-400">.vip @user</code> - Assigns/Removes VIP role
              </li>
              <li>• Ensure ElyraX is placed higher than these roles in server settings!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
