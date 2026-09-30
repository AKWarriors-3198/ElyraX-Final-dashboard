import React from "react";
import { Volume2 } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const InvcRoleForm = dynamic(
  () => import("@/components/dashboard/invcrole-form").then((mod) => mod.InvcRoleForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function InvcRolePage({ params }: { params: { guildId: string } }) {
  const config = await api.getInvcRole(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Voice Role"
        description="Assign roles based on voice channel activity."
        icon={Volume2}
      />
      <InvcRoleForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
