import React from "react";
import { ShieldAlert } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const AntiNukeForm = dynamic(
  () => import("@/components/dashboard/antinuke-form").then((mod) => mod.AntiNukeForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function AntiNukePage({ params }: { params: { guildId: string } }) {
  const config = await api.getAntiNuke(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Anti-Nuke Protection"
        description="Protect your server from malicious mass-deletion, mass-banning, and other destructive actions."
        icon={ShieldAlert}
      />
      <AntiNukeForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
