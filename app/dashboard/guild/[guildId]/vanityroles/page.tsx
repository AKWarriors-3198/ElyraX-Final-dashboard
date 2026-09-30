import React from "react";
import { Link2 } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const VanityRoleForm = dynamic(
  () => import("@/components/dashboard/vanityrole-form").then((mod) => mod.VanityRoleForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function VanityRolesPage({ params }: { params: { guildId: string } }) {
  const [setups, channels, roles] = await Promise.all([
    api.getVanityRoles(params.guildId),
    api.getChannels(params.guildId),
    api.getRoles(params.guildId),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Vanity Roles"
        description="Create custom vanity roles for your server."
        icon={Link2}
      />
      <VanityRoleForm
        initialSetups={setups}
        channels={channels}
        roles={roles}
        guildId={params.guildId}
      />
    </div>
  );
}
