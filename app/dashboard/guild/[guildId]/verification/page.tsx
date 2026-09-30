import React from "react";
import { CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/page-header";

const VerificationForm = dynamic(
  () => import("@/components/dashboard/verification-form").then((mod) => mod.VerificationForm),
  {
    loading: () => (
      <div className="h-96 w-full rounded-xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
    ),
  }
);

export default async function VerificationPage({ params }: { params: { guildId: string } }) {
  const [config, channels, roles] = await Promise.all([
    api.getVerification(params.guildId),
    api.getChannels(params.guildId),
    api.getRoles(params.guildId),
  ]);

  if (!config) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <PageHeader
        title="Verification"
        description="Set up member verification to keep your server safe from bots."
        icon={CheckCircle2}
      />
      <VerificationForm
        initialConfig={config}
        channels={channels}
        roles={roles}
        guildId={params.guildId}
      />
    </div>
  );
}
