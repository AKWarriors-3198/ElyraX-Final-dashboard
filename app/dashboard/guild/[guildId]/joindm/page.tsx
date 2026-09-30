import React from "react";
import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const JoinDMForm = dynamic(
  () => import("@/components/dashboard/joindm-form").then((mod) => mod.JoinDMForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function JoinDMPage({ params }: { params: { guildId: string } }) {
  const config = await api.getJoinDM(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Join DM"
        description="Send a direct message to new members when they join."
        icon={Mail}
      />
      <JoinDMForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
