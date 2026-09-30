"use client";

import React, { useState } from "react";
import { Zap, Plus, Trash2, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AutoReactFormProps {
  initialConfig: any;
  guildId: string;
}

export function AutoReactForm({ initialConfig, guildId }: AutoReactFormProps) {
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);
  const [newEmoji, setNewEmoji] = useState("");

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateAutoReact(guildId, config);
    toast.promise(promise, {
      loading: "Saving Auto React configuration...",
      success: "Auto React settings saved!",
      error: "Failed to save Auto React settings",
    });
    try {
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addEmoji = () => {
    if (!newEmoji.trim()) return;
    if (!config.emojis) config.emojis = [];
    if (config.emojis.includes(newEmoji.trim())) {
      toast.error("Emoji already added");
      return;
    }
    setConfig({ ...config, emojis: [...config.emojis, newEmoji.trim()] });
    setNewEmoji("");
  };

  const removeEmoji = (emoji: string) => {
    setConfig({ ...config, emojis: config.emojis.filter((e: string) => e !== emoji) });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-zinc-400" />
            Auto React Configuration
          </CardTitle>
          <CardDescription>Automatically react to messages with specific emojis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400">Emoji to react with</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter emoji..."
                value={newEmoji}
                onChange={(e) => setNewEmoji(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addEmoji()}
                className="flex-1"
              />
              <Button onClick={addEmoji} variant="secondary" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {config.emojis && config.emojis.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {config.emojis.map((emoji: string) => (
                <div
                  key={emoji}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-sm">{emoji}</span>
                  <button
                    onClick={() => removeEmoji(emoji)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

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
