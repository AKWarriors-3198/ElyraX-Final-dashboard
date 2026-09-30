import React from "react";
import { Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const AutoRoleForm = dynamic(
  () => import("@/components/dashboard/autorole-form").then((mod) => mod.AutoRoleForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function AutoRolePage({ params }: { params: { guildId: string } }) {
  const [config, roles] = await Promise.all([
    api.getAutoRole(params.guildId),
    api.getRoles(params.guildId),
  ]);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Auto Role"
        description="Automatically assign roles to new members and bots."
        icon={Bot}
      />
      <AutoRoleForm initialConfig={config} roles={roles} guildId={params.guildId} />
    </div>
  );
}
