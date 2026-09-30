"use client";

import React, { useState } from "react";
import { Link2, Trash2, Plus, RefreshCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VanityRoleSetup, DiscordChannel } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VanityRoleFormProps {
  initialSetups: VanityRoleSetup[];
  channels: DiscordChannel[];
  roles: any[];
  guildId: string;
}

export function VanityRoleForm({ initialSetups, channels, roles, guildId }: VanityRoleFormProps) {
  const [setups, setSetups] = useState<VanityRoleSetup[]>(initialSetups);
  const [saving, setSaving] = useState(false);

  const textChannels = channels.filter((c) => c.type === "0" || c.type === "text" || !c.type);

  const [newVanity, setNewVanity] = useState("");
  const [newRole, setNewRole] = useState<string | null>(null);
  const [newChannel, setNewChannel] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newVanity || !newRole || !newChannel) {
      toast.error("Please fill in all fields (vanity, role, channel).");
      return;
    }

    setSaving(true);
    try {
      await api.addVanityRole(guildId, {
        vanity: newVanity,
        role_id: newRole,
        log_channel_id: newChannel,
      });
      setSetups([...setups, { vanity: newVanity, role_id: newRole, log_channel_id: newChannel }]);
      setNewVanity("");
      setNewRole(null);
      setNewChannel(null);
      toast.success("Vanity role setup added!");
    } catch (err) {
      toast.error("Failed to add vanity role setup.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (vanity: string) => {
    setSaving(true);
    try {
      await api.deleteVanityRole(guildId, vanity);
      setSetups(setups.filter((s) => s.vanity !== vanity));
      toast.success("Vanity role setup deleted.");
    } catch (err) {
      toast.error("Failed to delete vanity role setup.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* List Existing Ones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-zinc-400" />
            Active Vanity Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {setups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-zinc-600">
              <Link2 className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">No vanity roles configured yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {setups.map((setup, idx) => {
                const r = roles.find((ro) => ro.id.toString() === setup.role_id?.toString());
                const c = channels.find((ch) => ch.id.toString() === setup.log_channel_id?.toString());
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] relative group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">{setup.vanity}</h4>
                      <Button
                        variant="danger"
                        size="icon"
                        onClick={() => handleDelete(setup.vanity)}
                        disabled={saving}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Role:</span>
                        <span className="text-zinc-300 font-medium">{r ? r.name : setup.role_id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">Log Channel:</span>
                        <span className="text-zinc-300 font-medium">{c ? `#${c.name}` : setup.log_channel_id}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Vanity Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-500">Vanity Code</label>
              <Input
                value={newVanity}
                onChange={(e) => setNewVanity(e.target.value)}
                placeholder="e.g. zyx"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-500">Reward Role</label>
              <Select value={newRole || ""} onValueChange={(val) => setNewRole(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.id.toString()}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-500">Log Channel</label>
              <Select value={newChannel || ""} onValueChange={(val) => setNewChannel(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select log channel..." />
                </SelectTrigger>
                <SelectContent>
                  {textChannels.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      # {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCreate} disabled={saving} className="w-full h-11 mt-6 gap-2">
            {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add Vanity Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
