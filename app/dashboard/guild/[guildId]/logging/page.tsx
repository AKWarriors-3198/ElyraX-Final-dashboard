import React from "react";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const LoggingForm = dynamic(
  () => import("@/components/dashboard/logging-form").then((mod) => mod.LoggingForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function LoggingPage({ params }: { params: { guildId: string } }) {
  const [config, channels] = await Promise.all([
    api.getLogging(params.guildId),
    api.getChannels(params.guildId),
  ]);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Event Logging"
        description="Track and log server events for moderation and audit purposes."
        icon={FileText}
      />
      <LoggingForm initialConfig={config} channels={channels} guildId={params.guildId} />
    </div>
  );
}
