"use client";

import React, { useState } from "react";
import { Save, RefreshCcw, Command, Info } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsFormProps {
  initialPrefix: string;
  guildId: string;
}

export function SettingsForm({ initialPrefix, guildId }: SettingsFormProps) {
  const [prefix, setPrefix] = useState(initialPrefix);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefix || prefix.length > 10) {
      toast.error("Prefix must be between 1 and 10 characters.");
      return;
    }

    setSaving(true);
    const promise = api.updatePrefix(guildId, prefix);

    toast.promise(promise, {
      loading: "Updating prefix...",
      success: "Prefix updated successfully!",
      error: (err) => err.message || "Failed to update prefix",
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Command className="h-4 w-4 text-zinc-400" />
              Command Prefix
            </CardTitle>
            <CardDescription>Configure the bot command prefix for your server</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                  Prefix
                </label>
                <div className="relative">
                  <Input
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="e.g. !, ?, >>"
                    maxLength={10}
                    className="text-base font-medium pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-600">
                    {prefix.length}/10
                  </div>
                </div>
                <p className="text-[11px] text-zinc-600">
                  This character triggers bot commands (e.g. {prefix || ">"}help)
                </p>
              </div>

              <Button type="submit" disabled={saving || !prefix} className="w-full h-11 gap-2">
                {saving ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving Changes..." : "Save Configuration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-b from-white/[0.02] to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4 text-zinc-400" />
              Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500 leading-relaxed">
              The <span className="text-zinc-300 font-medium">Prefix</span> is a unique identifier that tells the bot to
              process text as a command.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
