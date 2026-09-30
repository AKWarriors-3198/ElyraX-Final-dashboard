"use client";

import React, { useState } from "react";
import { Volume2, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleSwitch } from "./form-elements";

interface InvcRoleFormProps {
  initialConfig: any;
  guildId: string;
}

export function InvcRoleForm({ initialConfig, guildId }: InvcRoleFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateInvcRole(guildId, config);
    toast.promise(promise, {
      loading: "Saving Voice Role configuration...",
      success: "Voice Role settings saved!",
      error: "Failed to save Voice Role settings",
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
            <Volume2 className="h-4 w-4 text-zinc-400" />
            Voice Role Configuration
          </CardTitle>
          <CardDescription>Assign roles based on voice channel activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleSwitch
            label="Enable Voice Roles"
            description="Automatically assign roles when users join voice channels"
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
