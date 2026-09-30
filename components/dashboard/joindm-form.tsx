"use client";

import React, { useState } from "react";
import { Mail, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface JoinDMFormProps {
  initialConfig: any;
  guildId: string;
}

export function JoinDMForm({ initialConfig, guildId }: JoinDMFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateJoinDM(guildId, config);
    toast.promise(promise, {
      loading: "Saving Join DM configuration...",
      success: "Join DM settings saved!",
      error: "Failed to save Join DM settings",
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
            <Mail className="h-4 w-4 text-zinc-400" />
            Join DM Configuration
          </CardTitle>
          <CardDescription>Send a direct message to new members when they join</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">DM Message</label>
            <Textarea
              placeholder="Enter the message to send to new members..."
              value={config?.message || ""}
              onChange={(e) => setConfig({ ...config, message: e.target.value })}
              className="min-h-[120px]"
            />
          </div>

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
