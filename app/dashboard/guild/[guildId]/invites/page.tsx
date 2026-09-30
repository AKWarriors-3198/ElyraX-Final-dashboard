import React from "react";
import { Link as LinkIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const InvitesForm = dynamic(
  () => import("@/components/dashboard/invites-form").then((mod) => mod.InvitesForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function InvitesPage({ params }: { params: { guildId: string } }) {
  const config = await api.getInvites(params.guildId);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Invite Tracking"
        description="Track and manage server invites."
        icon={LinkIcon}
      />
      <InvitesForm initialConfig={config} guildId={params.guildId} />
    </div>
  );
}
