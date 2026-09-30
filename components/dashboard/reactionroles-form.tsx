"use client";

import React, { useState } from "react";
import { MousePointer2, Save, RefreshCcw, Plus, Trash2, BellRing, Settings } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReactionRolesFormProps {
  initialConfig: any;
  roles: any[];
  guildId: string;
}

export function ReactionRolesForm({ initialConfig, roles, guildId }: ReactionRolesFormProps) {
  const [config, setConfig] = useState<any>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const [newRR, setNewRR] = useState({
    message_id: "",
    emoji: "",
    role_id: "",
  });

  const filteredRoles = roles.filter((r) => r.name !== "@everyone");

  const toggleDM = async (val: boolean) => {
    try {
      await api.updateRR(guildId, { dm_enabled: val });
      setConfig({ ...config, dm_enabled: val });
      toast.success(`DM notifications ${val ? "enabled" : "disabled"}`);
    } catch (error) {
      toast.error("Failed to update DM setting");
    }
  };

  const handleAdd = async () => {
    if (!newRR.message_id || !newRR.emoji || !newRR.role_id) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoadingAction(true);
      await api.updateRR(guildId, {
        add_role: {
          message_id: parseInt(newRR.message_id),
          emoji: newRR.emoji,
          role_id: parseInt(newRR.role_id),
        },
      });
      setConfig({
        ...config,
        roles: [...config.roles, { message_id: newRR.message_id, emoji: newRR.emoji, role_id: newRR.role_id }],
      });
      toast.success("Reaction role added");
      setNewRR({ message_id: "", emoji: "", role_id: "" });
    } catch (error) {
      toast.error("Failed to add reaction role");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (messageId: number, emoji: string) => {
    try {
      setLoadingAction(true);
      await api.updateRR(guildId, {
        remove_role_message_id: messageId,
        remove_role_emoji: emoji,
      });
      setConfig({
        ...config,
        roles: config.roles.filter((r: any) => !(r.message_id === messageId && r.emoji === emoji)),
      });
      toast.success("Reaction role removed");
    } catch (error) {
      toast.error("Failed to remove reaction role");
    } finally {
      setLoadingAction(false);
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
                  <BellRing className="h-4 w-4 text-zinc-400" />
                  DM Notifications
                </CardTitle>
                <CardDescription>Send a direct message when a user gets/loses a role</CardDescription>
              </div>
              <Switch checked={config.dm_enabled} onCheckedChange={toggleDM} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="pt-4 border-t border-white/[0.06]">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Plus className="h-4 w-4 text-zinc-400" />
                Create New Reaction Role
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-zinc-500">Message ID</label>
                  <Input
                    placeholder="e.g. 1234567890"
                    value={newRR.message_id}
                    onChange={(e) => setNewRR({ ...newRR, message_id: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-zinc-500">Emoji</label>
                  <Input
                    placeholder="e.g. ✅"
                    value={newRR.emoji}
                    onChange={(e) => setNewRR({ ...newRR, emoji: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-zinc-500">Role to Assign</label>
                  <Select
                    value={newRR.role_id ? newRR.role_id.toString() : ""}
                    onValueChange={(val) => setNewRR({ ...newRR, role_id: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[250px]">
                      {filteredRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAdd} disabled={loadingAction} className="w-full gap-2" variant="secondary">
                {loadingAction ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add to Active Listeners
              </Button>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <MousePointer2 className="h-4 w-4 text-zinc-400" />
                Active Reaction Roles
              </h4>

              <div className="space-y-2">
                {config.roles.length === 0 ? (
                  <div className="text-center p-6 bg-white/[0.01] rounded-lg border border-dashed border-white/[0.08]">
                    <p className="text-xs text-zinc-600">No reaction roles currently configured.</p>
                  </div>
                ) : (
                  config.roles.map((rr: any, idx: number) => {
                    const roleName = roles.find((r) => r.id === rr.role_id.toString())?.name || "Unknown Role";

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-zinc-600">Message ID</span>
                            <span className="text-xs font-mono text-zinc-400">{rr.message_id}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-medium text-zinc-600">Emoji</span>
                            <span className="text-sm">{rr.emoji}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-zinc-600">Role</span>
                            <span className="text-xs font-medium text-white">{roleName}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(rr.message_id, rr.emoji)}
                          disabled={loadingAction}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="text-sm">Usage Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Reaction Roles allow members to self-assign their own roles with a single click.
            </p>
            <ul className="text-[11px] text-zinc-600 space-y-1.5">
              <li>• The bot must have access to see the message you specify.</li>
              <li>• Make sure the bot role is HIGHER than the role you are attempting to assign.</li>
              <li>• The bot will automatically react to the message once you click &quot;Add to Active Listeners&quot;.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
