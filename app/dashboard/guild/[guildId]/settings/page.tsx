import React from "react";
import { Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const SettingsForm = dynamic(
  () => import("@/components/dashboard/settings-form").then((mod) => mod.SettingsForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function SettingsPage({ params }: { params: { guildId: string } }) {
  const prefixConfig = await api.getPrefix(params.guildId);

  if (!prefixConfig) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Server Settings"
        description="Configure your server's ElyraX preferences."
        icon={Settings}
      />
      <SettingsForm initialPrefix={prefixConfig.prefix} guildId={params.guildId} />
    </div>
  );
}
