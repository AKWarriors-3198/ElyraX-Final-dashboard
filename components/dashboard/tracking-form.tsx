"use client";

import React, { useState } from "react";
import { Activity, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleSwitch } from "./form-elements";

interface TrackingFormProps {
  initialConfig: any;
  guildId: string;
}

export function TrackingForm({ initialConfig, guildId }: TrackingFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateTracking(guildId, config);
    toast.promise(promise, {
      loading: "Saving Tracking configuration...",
      success: "Tracking settings saved!",
      error: "Failed to save Tracking settings",
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
            <Activity className="h-4 w-4 text-zinc-400" />
            Tracking Configuration
          </CardTitle>
          <CardDescription>Track user activity and server metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ToggleSwitch
            label="Enable Tracking"
            description="Track user joins, leaves, and messages"
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
