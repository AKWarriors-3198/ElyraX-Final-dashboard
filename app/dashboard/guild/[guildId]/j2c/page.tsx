import React from "react";
import { Mic } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const J2CForm = dynamic(
  () => import("@/components/dashboard/j2c-form").then((mod) => mod.J2CForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function J2CPage({ params }: { params: { guildId: string } }) {
  const [config, channels] = await Promise.all([
    api.getJ2C(params.guildId),
    api.getChannels(params.guildId),
  ]);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Join to Create"
        description="Create dynamic voice channels when users join."
        icon={Mic}
      />
      <J2CForm initialConfig={config} channels={channels} guildId={params.guildId} />
    </div>
  );
}
