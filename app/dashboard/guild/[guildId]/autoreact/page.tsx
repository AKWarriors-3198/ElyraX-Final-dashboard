import React from "react";
import { Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const AutoReactForm = dynamic(
  () => import("@/components/dashboard/autoreact-form").then((mod) => mod.AutoReactForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function AutoReactPage({ params }: { params: { guildId: string } }) {
  const config = await api.getAutoReact(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Auto React"
        description="Automatically react to messages with specific emojis."
        icon={Zap}
      />
      <AutoReactForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
