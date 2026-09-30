"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleSwitch } from "./form-elements";

interface InvitesFormProps {
  initialConfig: any;
  guildId: string;
}

export function InvitesForm({ initialConfig, guildId }: InvitesFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateInvites(guildId, config);
    toast.promise(promise, {
      loading: "Saving Invite configuration...",
      success: "Invite settings saved!",
      error: "Failed to save Invite settings",
    });
    try {
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-zinc-400" />
            Invite Tracking Configuration
          </CardTitle>
          <CardDescription>Track and manage server invites</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleSwitch
            label="Enable Invite Tracking"
            description="Track who invited new members"
            checked={config?.enabled || false}
            onCheckedChange={(val) => setConfig({ ...config, enabled: val })}
          />

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
