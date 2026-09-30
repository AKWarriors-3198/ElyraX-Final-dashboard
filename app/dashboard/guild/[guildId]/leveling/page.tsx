import React from "react";
import { BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const LevelingForm = dynamic(
  () => import("@/components/dashboard/leveling-form").then((mod) => mod.LevelingForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function LevelingPage({ params }: { params: { guildId: string } }) {
  const config = await api.getLeveling(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Leveling System"
        description="Gamify your community with XP, levels, and rewards."
        icon={BarChart3}
      />
      <LevelingForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
