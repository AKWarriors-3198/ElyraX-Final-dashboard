import React from "react";
import { ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const AutomodForm = dynamic(
  () => import("@/components/dashboard/automod-form").then((mod) => mod.AutomodForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function AutomodPage({ params }: { params: { guildId: string } }) {
  const config = await api.getAutomod(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Auto Moderation"
        description="Automatically detect and prevent spam, mentions, links, and bad words."
        icon={ShieldCheck}
      />
      <AutomodForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
