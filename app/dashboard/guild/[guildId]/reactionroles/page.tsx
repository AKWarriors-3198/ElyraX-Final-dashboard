import React from "react";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const ReactionRolesForm = dynamic(
  () => import("@/components/dashboard/reactionroles-form").then((mod) => mod.ReactionRolesForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function ReactionRolesPage({ params }: { params: { guildId: string } }) {
  const [config, roles] = await Promise.all([
    api.getRR(params.guildId),
    api.getRoles(params.guildId),
  ]);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Reaction Roles"
        description="Let users assign roles by reacting to messages."
        icon={Activity}
      />
      <ReactionRolesForm initialConfig={config} roles={roles} guildId={params.guildId} />
    </div>
  );
}
