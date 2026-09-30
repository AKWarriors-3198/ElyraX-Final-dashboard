"use client";

import React, { useState } from "react";
import {
  Save,
  MessageSquare,
  Type,
  LayoutTemplate,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WelcomeConfig, DiscordChannel } from "@/types/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeFormProps {
  initialConfig: WelcomeConfig;
  channels: DiscordChannel[];
  guildId: string;
}

export function WelcomeForm({ initialConfig, channels, guildId }: WelcomeFormProps) {
  const [config, setConfig] = useState<WelcomeConfig>(initialConfig);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const promise = api.updateWelcome(guildId, config);
    toast.promise(promise, {
      loading: "Saving welcome configuration...",
      success: "Welcome settings saved successfully!",
      error: "Failed to update welcome settings",
    });
    try {
      await promise;
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const channelOptions = channels.map((c) => ({
    value: c.id.toString(),
    label: `#${c.name}`,
  }));

  const typeOptions = [
    { value: "simple", label: "Simple Text Message" },
    { value: "embed", label: "Rich Embed Message" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-zinc-400" />
              Welcome Configuration
            </CardTitle>
            <CardDescription>Configure welcome messages for new members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                Response Type
              </label>
              <Select
                value={config.welcome_type || "simple"}
                onValueChange={(val) => setConfig({ ...config, welcome_type: val })}
                options={typeOptions}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                Welcome Channel
              </label>
              <Select
                value={config.channel_id || ""}
                onValueChange={(val) => setConfig({ ...config, channel_id: val })}
                options={channelOptions}
                placeholder="Select a channel..."
              />
            </div>

            {config.welcome_type === "simple" && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                  Message Content
                </label>
                <Textarea
                  value={config.welcome_message || ""}
                  onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
                  placeholder="Welcome {user} to {server_name}!"
                  className="min-h-[120px]"
                />
              </div>
            )}

            {config.welcome_type === "embed" && (
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                      Embed Title
                    </label>
                    <Input
                      type="text"
                      value={config.embed_data?.title || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          embed_data: { ...config.embed_data, title: e.target.value },
                        })
                      }
                      placeholder="Welcome to the server!"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                      Embed Color (Hex)
                    </label>
                    <Input
                      type="text"
                      value={config.embed_data?.color || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          embed_data: { ...config.embed_data, color: e.target.value },
                        })
                      }
                      placeholder="#3498db"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                    Embed Description
                  </label>
                  <Textarea
                    value={config.embed_data?.description || ""}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        embed_data: { ...config.embed_data, description: e.target.value },
                      })
                    }
                    placeholder="We're glad to have you here, {user}!"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                      Thumbnail URL
                    </label>
                    <Input
                      type="text"
                      value={config.embed_data?.thumbnail || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          embed_data: { ...config.embed_data, thumbnail: e.target.value },
                        })
                      }
                      placeholder="{user_avatar} or https://..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-0.5">
                      Image URL
                    </label>
                    <Input
                      type="text"
                      value={config.embed_data?.image || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          embed_data: { ...config.embed_data, image: e.target.value },
                        })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleSave} disabled={saving} className="w-full h-11">
              {saving ? (
                <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5 text-xs text-zinc-500 font-mono bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
              <p className="flex justify-between">
                <span>{"{user}"}</span>
                <span className="text-zinc-600">@Username</span>
              </p>
              <p className="flex justify-between">
                <span>{"{user_name}"}</span>
                <span className="text-zinc-600">Username</span>
              </p>
              <p className="flex justify-between">
                <span>{"{server_name}"}</span>
                <span className="text-zinc-600">Server Name</span>
              </p>
              <p className="flex justify-between">
                <span>{"{server_membercount}"}</span>
                <span className="text-zinc-600">Total Members</span>
              </p>
              <p className="border-t border-white/[0.06] my-1.5 pt-1.5 flex justify-between">
                <span>{"{user_avatar}"}</span>
                <span className="text-zinc-600">Avatar Image</span>
              </p>
              <p className="flex justify-between">
                <span>{"{server_icon}"}</span>
                <span className="text-zinc-600">Server Logo</span>
              </p>
            </div>
            <p className="text-[11px] text-zinc-600 text-center mt-3">
              Use these variables in messages and embeds to personalize welcomes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Auto Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                setConfig({
                  ...config,
                  welcome_type: "embed",
                  embed_data: {
                    ...config.embed_data,
                    title: "Welcome to {server_name}!",
                    description:
                      "Hi {user}, we're glad you joined! You are member #{server_membercount}.",
                    color: "2f3136",
                    thumbnail: "{user_avatar}",
                  },
                })
              }
              variant="outline"
              className="w-full"
            >
              <LayoutTemplate className="h-4 w-4 mr-2" />
              Apply Default Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
